"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  changeEmail: (newEmail: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  adminConfig: {
    loginSalvo: string;
    nome: string;
    atualizadoEm?: string;
  };
  saveAdminConfig: (nome: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const DEFAULT_ADMIN_EMAIL = "persio@lyonsgo.com.br";
export const DEFAULT_ADMIN_PASS = "LyonsGo#2026";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminConfig, setAdminConfig] = useState<{
    loginSalvo: string;
    nome: string;
    atualizadoEm?: string;
  }>({
    loginSalvo: DEFAULT_ADMIN_EMAIL,
    nome: "Pérsio Admin"
  });

  // Carrega configuração de admin do Firestore / localStorage
  const loadAdminConfig = async (currentUser?: User | null) => {
    try {
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("lyonsgo_admin_config");
        if (local) {
          setAdminConfig(JSON.parse(local));
        }
      }

      if (db) {
        const ref = doc(db, "configuracoes", "lyonsgo_admin");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          const cfg = {
            loginSalvo: data.loginSalvo || currentUser?.email || DEFAULT_ADMIN_EMAIL,
            nome: data.nome || "Pérsio Admin",
            atualizadoEm: data.atualizadoEm
          };
          setAdminConfig(cfg);
          if (typeof window !== "undefined") {
            localStorage.setItem("lyonsgo_admin_config", JSON.stringify(cfg));
          }
        }
      }
    } catch (e) {
      console.warn("Aviso ao carregar configuracoes do admin do Firestore:", e);
    }
  };

  useEffect(() => {
    if (!auth || typeof auth.onAuthStateChanged !== "function") {
      setLoading(false);
      return;
    }

    try {
      setPersistence(auth, browserLocalPersistence).catch(() => {});
    } catch {}

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      await loadAdminConfig(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    if (!auth || typeof auth.signInWithEmailAndPassword !== "function") {
      // Fallback local se Firebase não estiver disponível
      if (
        (email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL && pass === DEFAULT_ADMIN_PASS) ||
        (email.trim().toLowerCase() === adminConfig.loginSalvo.toLowerCase() && pass)
      ) {
        setUser({ email, uid: "local-admin-uid" } as any);
        return { success: true };
      }
      return { success: false, error: "Serviço de autenticação offline." };
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
      setUser(res.user);
      await loadAdminConfig(res.user);
      return { success: true };
    } catch (err: any) {
      // Se a conta de login padrão ainda não foi criada no Firebase, cria agora na primeira tentativa válida
      if (
        (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") &&
        email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL &&
        pass === DEFAULT_ADMIN_PASS
      ) {
        try {
          const created = await createUserWithEmailAndPassword(auth, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS);
          setUser(created.user);
          await saveAdminConfig("Pérsio Admin", DEFAULT_ADMIN_EMAIL);
          return { success: true };
        } catch (createErr: any) {
          console.error("Erro ao auto-criar credencial padrão:", createErr);
        }
      }

      let msg = "Credenciais inválidas. Verifique seu e-mail e senha.";
      if (err.code === "auth/too-many-requests") {
        msg = "Muitas tentativas sem sucesso. Aguarde alguns instantes.";
      } else if (err.code === "auth/network-request-failed") {
        msg = "Erro de conexão com o servidor de autenticação.";
      }
      return { success: false, error: msg };
    }
  };

  const loginWithGoogle = async () => {
    if (!auth || typeof auth.signInWithPopup !== "function") {
      return { success: false, error: "Autenticação Google não disponível." };
    }

    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      await loadAdminConfig(res.user);
      return { success: true };
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") {
        return { success: false, error: "Janela de login fechada antes da confirmação." };
      }
      return { success: false, error: `Falha ao autenticar com Google: ${err.message}` };
    }
  };

  const logout = async () => {
    try {
      if (auth && typeof auth.signOut === "function") {
        await signOut(auth);
      }
      setUser(null);
    } catch (e) {
      console.error("Erro ao deslogar:", e);
      setUser(null);
    }
  };

  const changePassword = async (newPassword: string) => {
    if (!user) {
      return { success: false, error: "Nenhum usuário logado." };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "A senha deve ter no mínimo 6 caracteres." };
    }

    try {
      await updatePassword(user, newPassword);
      // Salva no Firestore registro de alteração
      const cfg = {
        ...adminConfig,
        atualizadoEm: new Date().toISOString()
      };
      setAdminConfig(cfg);
      if (typeof window !== "undefined") {
        localStorage.setItem("lyonsgo_admin_config", JSON.stringify(cfg));
      }
      if (db) {
        await setDoc(doc(db, "configuracoes", "lyonsgo_admin"), cfg, { merge: true });
      }
      return { success: true };
    } catch (err: any) {
      if (err.code === "auth/requires-recent-login") {
        return {
          success: false,
          error: "Por segurança, faça logout e login novamente antes de alterar a senha."
        };
      }
      return { success: false, error: `Erro ao alterar senha: ${err.message}` };
    }
  };

  const changeEmail = async (newEmail: string) => {
    if (!user) {
      return { success: false, error: "Nenhum usuário logado." };
    }

    const cleanEmail = newEmail.trim().toLowerCase();
    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return { success: false, error: "Informe um e-mail válido." };
    }

    try {
      await updateEmail(user, cleanEmail);
      await saveAdminConfig(adminConfig.nome, cleanEmail);
      return { success: true };
    } catch (err: any) {
      if (err.code === "auth/requires-recent-login") {
        return {
          success: false,
          error: "Por segurança, faça logout e login novamente antes de alterar o e-mail."
        };
      }
      return { success: false, error: `Erro ao alterar e-mail: ${err.message}` };
    }
  };

  const resetPassword = async (email: string) => {
    if (!auth) return { success: false, error: "Serviço indisponível" };
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (err: any) {
      return { success: false, error: `Falha ao enviar e-mail de recuperação: ${err.message}` };
    }
  };

  const saveAdminConfig = async (nome: string, email: string) => {
    const cfg = {
      loginSalvo: email,
      nome: nome,
      atualizadoEm: new Date().toISOString()
    };
    setAdminConfig(cfg);
    if (typeof window !== "undefined") {
      localStorage.setItem("lyonsgo_admin_config", JSON.stringify(cfg));
    }
    if (db) {
      try {
        await setDoc(doc(db, "configuracoes", "lyonsgo_admin"), cfg, { merge: true });
      } catch (e) {
        console.warn("Aviso ao salvar config no Firestore:", e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        loginWithGoogle,
        logout,
        changePassword,
        changeEmail,
        resetPassword,
        adminConfig,
        saveAdminConfig
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

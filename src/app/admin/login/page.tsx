"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS } from "../../../lib/auth";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  KeyRound,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function LyonsAdminLoginPage() {
  const router = useRouter();
  const { user, loading, loginWithEmail, loginWithGoogle, resetPassword, adminConfig } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modal Esqueci Senha
  const [modalForgot, setModalForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Se já estiver logado, redireciona para o admin
  useEffect(() => {
    if (!loading && user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg("Por favor, preencha o e-mail e a senha.");
      return;
    }

    setSubmitting(true);
    const res = await loginWithEmail(email, password);
    setSubmitting(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setErrorMsg(res.error || "Falha ao entrar no painel.");
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setGoogleSubmitting(true);
    const res = await loginWithGoogle();
    setGoogleSubmitting(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setErrorMsg(res.error || "Falha ao autenticar com Google.");
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setForgotLoading(true);
    const res = await resetPassword(forgotEmail);
    setForgotLoading(false);

    if (res.success) {
      setForgotSuccess(true);
    } else {
      setErrorMsg(res.error || "Falha ao enviar e-mail de recuperação.");
    }
  };

  const preencherPadrao = () => {
    setEmail(DEFAULT_ADMIN_EMAIL);
    setPassword(DEFAULT_ADMIN_PASS);
    setErrorMsg(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 gap-3">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500">
          Carregando LyonsGo Auth...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Background Decorativo */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header com Marca LyonsGo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/20 mb-2 font-black text-2xl">
            🦁
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            LyonsGo <span className="text-amber-400">Admin</span>
          </h1>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto">
            Acesso administrativo ao painel de Minisites, Bio Links e Equipes de Vendas.
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                <span>E-mail do Administrador</span>
                <span className="text-zinc-500 font-normal lowercase">Ex: persio@...</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lyonsgo.com.br"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  Senha de Acesso
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setModalForgot(true);
                  }}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || googleSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-sm rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  Entrar no Painel
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divisor OU */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-zinc-900 px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-bold absolute">
              OU
            </span>
          </div>

          {/* Botão Login com Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting || googleSubmitting}
            className="w-full py-3 px-4 bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold text-xs rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {googleSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                Conectando com o Google...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continuar com a Conta Google
              </>
            )}
          </button>
        </div>

        {/* Bloco Informativo de Credenciais Padrão do Pérsio */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 space-y-2.5">
          <div className="flex items-center justify-between text-zinc-300">
            <span className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-amber-400">
              <KeyRound className="w-3.5 h-3.5" />
              Credenciais Oficiais para o Pérsio
            </span>
            <button
              onClick={preencherPadrao}
              className="text-[10px] text-zinc-400 hover:text-amber-400 underline font-semibold transition-colors cursor-pointer"
            >
              Preencher automático
            </button>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Você pode acessar com o e-mail e senha padrão abaixo ou com a sua mesma conta de Admin do ShopyGo:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
            <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800/60 truncate">
              <span className="text-zinc-500 block text-[9px] uppercase font-sans font-bold">Login:</span>
              <span className="text-zinc-200">{DEFAULT_ADMIN_EMAIL}</span>
            </div>
            <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800/60">
              <span className="text-zinc-500 block text-[9px] uppercase font-sans font-bold">Senha Inicial:</span>
              <span className="text-amber-400 font-bold">{DEFAULT_ADMIN_PASS}</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 italic">
            * O Pérsio poderá alterar o login e a senha a qualquer momento dentro do painel na aba "Segurança & Acesso".
          </p>
        </div>

        {/* Link de Retorno */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>

      {/* Modal de Recuperação de Senha */}
      {modalForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                Recuperação de Senha
              </h3>
              <button
                onClick={() => {
                  setModalForgot(false);
                  setForgotSuccess(false);
                }}
                className="text-zinc-500 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div className="space-y-3 py-2 text-center">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">E-mail Enviado!</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Enviamos as instruções e link de redefinição para <strong>{forgotEmail}</strong>. Verifique sua caixa de entrada e spam.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModalForgot(false);
                    setForgotSuccess(false);
                  }}
                  className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <p className="text-xs text-zinc-400">
                  Informe o e-mail cadastrado. Enviaremos um link seguro pelo Firebase para você redefinir sua senha:
                </p>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@lyonsgo.com.br"
                  required
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setModalForgot(false)}
                    className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                  >
                    {forgotLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Enviar Link"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

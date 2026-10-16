"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  LogOut,
  UserCheck
} from "lucide-react";
import { useAuth } from "../lib/auth";

interface AdminSegurancaModalProps {
  aberto: boolean;
  onFechar: () => void;
}

export default function AdminSegurancaModal({ aberto, onFechar }: AdminSegurancaModalProps) {
  const { user, logout, changePassword, changeEmail, adminConfig } = useAuth();

  const [novoEmail, setNovoEmail] = useState(user?.email || adminConfig.loginSalvo || "");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const [salvando, setSalvando] = useState(false);
  const [sucessoMsg, setSucessoMsg] = useState<string | null>(null);
  const [erroMsg, setErroMsg] = useState<string | null>(null);

  if (!aberto) return null;

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroMsg(null);
    setSucessoMsg(null);

    const emailAlterado = novoEmail.trim().toLowerCase() !== (user?.email || "").toLowerCase();
    const querAlterarSenha = Boolean(novaSenha);

    if (!emailAlterado && !querAlterarSenha) {
      setErroMsg("Nenhuma alteração informada. Digite uma nova senha ou novo e-mail.");
      return;
    }

    if (querAlterarSenha) {
      if (novaSenha.length < 6) {
        setErroMsg("A nova senha deve possuir pelo menos 6 caracteres.");
        return;
      }
      if (novaSenha !== confirmaSenha) {
        setErroMsg("A confirmação de senha não confere com a nova senha digitada.");
        return;
      }
    }

    setSalvando(true);

    try {
      // 1. Atualiza e-mail se foi modificado
      if (emailAlterado) {
        const resEmail = await changeEmail(novoEmail);
        if (!resEmail.success) {
          setErroMsg(resEmail.error || "Falha ao atualizar o e-mail.");
          setSalvando(false);
          return;
        }
      }

      // 2. Atualiza senha se foi preenchida
      if (querAlterarSenha) {
        const resPass = await changePassword(novaSenha);
        if (!resPass.success) {
          setErroMsg(resPass.error || "Falha ao atualizar a senha.");
          setSalvando(false);
          return;
        }
      }

      setSucessoMsg("Credenciais salvas com sucesso! Salvou uma vez, já era. Seus novos dados já estão ativos.");
      setNovaSenha("");
      setConfirmaSenha("");
    } catch (err: any) {
      setErroMsg(`Erro inesperado: ${err.message}`);
    } finally {
      setSalvando(false);
    }
  };

  const handleLogout = async () => {
    if (confirm("Deseja realmente sair do painel administrativo?")) {
      await logout();
      onFechar();
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-zinc-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Segurança & Acesso Admin</h2>
              <p className="text-xs text-zinc-400">Controle do login e senha do Pérsio / SuperAdmin</p>
            </div>
          </div>
          <button
            onClick={onFechar}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Card do Usuário Atual */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center font-bold text-sm shrink-0">
              🦁
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                Conta Ativa no Firebase
              </span>
              <p className="text-sm font-bold text-white truncate">{user?.email || adminConfig.loginSalvo}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair
          </button>
        </div>

        {/* Banners de Sucesso ou Erro */}
        {sucessoMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="font-semibold leading-relaxed">{sucessoMsg}</div>
          </div>
        )}

        {erroMsg && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="font-semibold leading-relaxed">{erroMsg}</div>
          </div>
        )}

        {/* Formulário de Alteração de Credenciais */}
        <form onSubmit={handleSalvar} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              E-mail de Login (Identificador)
            </label>
            <input
              type="email"
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
              placeholder="admin@lyonsgo.com.br"
              required
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2 border-t border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Alterar Senha de Acesso
              </label>
              <button
                type="button"
                onClick={() => setShowSenha(!showSenha)}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {showSenha ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[11px] text-zinc-400">Nova Senha:</span>
                <input
                  type={showSenha ? "text" : "password"}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 6 dígitos"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-zinc-400">Confirmar Nova Senha:</span>
                <input
                  type={showSenha ? "text" : "password"}
                  value={confirmaSenha}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
            <p className="text-[10px] text-zinc-500">
              * Deixe os campos de senha em branco se desejar alterar apenas o e-mail de login.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {salvando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  ShoppingBag,
  Settings,
  BarChart3,
  Copy,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  QrCode,
  Zap,
  ArrowLeft,
  Save,
  RotateCcw,
  MessageCircle,
  Eye,
  CheckCircle2,
  BookOpen,
  Building2,
  ChevronDown,
  ShieldCheck,
  LogOut,
  KeyRound,
  Loader2
} from "lucide-react";
import { MinisiteData, Vendedor, ItemCatalogo, SaasDatabase } from "../../lib/types";
import {
  getSaasDatabase,
  getLojaPorSlug,
  salvarLoja,
  criarNovaLoja,
  excluirLoja,
  SAAS_DEFAULT_DATABASE,
  saveSaasDatabase,
  TEMAS
} from "../../lib/store";
import ManualSaasModal from "../../components/ManualSaasModal";
import AdminSegurancaModal from "../../components/AdminSegurancaModal";
import { useAuth } from "../../lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout, adminConfig } = useAuth();

  const defaultSlug = Object.keys(SAAS_DEFAULT_DATABASE)[0] || "loja-modelo";
  const [db, setDb] = useState<SaasDatabase>(SAAS_DEFAULT_DATABASE);
  const [slugSelecionado, setSlugSelecionado] = useState<string>(defaultSlug);
  const [lojaAtual, setLojaAtual] = useState<MinisiteData>(SAAS_DEFAULT_DATABASE[defaultSlug] || Object.values(SAAS_DEFAULT_DATABASE)[0]);

  const [abaAtiva, setAbaAtiva] = useState<"loja" | "vendedores" | "catalogo" | "auditoria">("loja");
  const [modalSegurancaAberto, setModalSegurancaAberto] = useState(false);
  const [salvoFeedback, setSalvoFeedback] = useState(false);
  const [copiouId, setCopiouId] = useState<string | null>(null);
  const [modalQrVendedor, setModalQrVendedor] = useState<Vendedor | null>(null);

  // Modal de Manual & Instruções
  const [modalManualAberto, setModalManualAberto] = useState(false);

  // Modal para Criar Nova Loja (Tenant)
  const [modalNovaLoja, setModalNovaLoja] = useState(false);
  const [formNovaLoja, setFormNovaLoja] = useState({
    nomeLoja: "",
    slug: "",
    ramoAtividade: "Comércio & Serviços",
    planoAtivo: "Plano Pro",
    whatsappPadrao: ""
  });

  // Novos cadastros locais
  const [novoVendedor, setNovoVendedor] = useState<Partial<Vendedor>>({
    nome: "",
    cargo: "",
    whatsapp: "",
    foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    badge: "Consultor"
  });

  const [novoItem, setNovoItem] = useState<Partial<ItemCatalogo>>({
    titulo: "",
    descricao: "",
    preco: "R$ ",
    tag: "",
    imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
  });

  useEffect(() => {
    const loadedDb = getSaasDatabase();
    setDb(loadedDb);
    const keys = Object.keys(loadedDb);
    if (keys.length > 0) {
      const initialSlug = keys.includes(slugSelecionado) ? slugSelecionado : keys[0];
      setSlugSelecionado(initialSlug);
      setLojaAtual(loadedDb[initialSlug]);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    if (confirm("Deseja realmente sair do painel administrativo?")) {
      await logout();
      router.push("/admin/login");
    }
  };

  const mudarLoja = (slug: string) => {
    setSlugSelecionado(slug);
    const loja = db[slug];
    if (loja) {
      setLojaAtual(loja);
    }
  };

  const atualizarLoja = (novosDados: MinisiteData) => {
    setLojaAtual(novosDados);
    salvarLoja(novosDados);
    const novoDb = { ...db, [novosDados.slug]: novosDados };
    setDb(novoDb);
    setSalvoFeedback(true);
    setTimeout(() => setSalvoFeedback(false), 2000);
  };

  const handleCriarNovaLoja = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNovaLoja.nomeLoja) {
      alert("Informe o nome da empresa.");
      return;
    }

    const criada = criarNovaLoja({
      nomeLoja: formNovaLoja.nomeLoja,
      slug: formNovaLoja.slug,
      ramoAtividade: formNovaLoja.ramoAtividade,
      planoAtivo: formNovaLoja.planoAtivo,
      whatsappPadrao: formNovaLoja.whatsappPadrao || "5511999990000"
    });

    const novoDb = getSaasDatabase();
    setDb(novoDb);
    setSlugSelecionado(criada.slug);
    setLojaAtual(criada);
    setModalNovaLoja(false);
    setFormNovaLoja({
      nomeLoja: "",
      slug: "",
      ramoAtividade: "Comércio & Serviços",
      planoAtivo: "Plano Pro",
      whatsappPadrao: ""
    });
    setSalvoFeedback(true);
    setTimeout(() => setSalvoFeedback(false), 2000);
  };

  const handleExcluirLoja = (slug: string) => {
    const keys = Object.keys(db);
    if (keys.length <= 1) {
      alert("Você deve manter pelo menos uma empresa cadastrada no SaaS.");
      return;
    }
    if (confirm(`Deseja realmente excluir a empresa "${db[slug]?.nomeLoja}"?`)) {
      excluirLoja(slug);
      const novoDb = getSaasDatabase();
      setDb(novoDb);
      const remainingKey = Object.keys(novoDb)[0];
      setSlugSelecionado(remainingKey);
      setLojaAtual(novoDb[remainingKey]);
    }
  };

  const restaurarPadrao = () => {
    if (confirm("Tem certeza que deseja restaurar as empresas de demonstração padrão do SaaS?")) {
      saveSaasDatabase(SAAS_DEFAULT_DATABASE);
      setDb(SAAS_DEFAULT_DATABASE);
      setSlugSelecionado("elite-motors");
      setLojaAtual(SAAS_DEFAULT_DATABASE["elite-motors"]);
    }
  };

  const copiarLinkVendedor = (vendedorId: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://lyonsgo.com.br";
    const url = `${origin}/${lojaAtual.slug}/${vendedorId}`;
    navigator.clipboard.writeText(url);
    setCopiouId(vendedorId);
    setTimeout(() => setCopiouId(null), 2500);
  };

  const adicionarVendedor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoVendedor.nome || !novoVendedor.whatsapp) {
      alert("Preencha ao menos Nome e WhatsApp do vendedor.");
      return;
    }

    const id = novoVendedor.nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 15);

    const codigo = `#VEND-00${lojaAtual.vendedores.length + 1}`;

    const vendedorCompleto: Vendedor = {
      id: id || `vend-${Date.now()}`,
      codigo,
      nome: novoVendedor.nome || "Novo Vendedor",
      cargo: novoVendedor.cargo || "Consultor de Vendas",
      whatsapp: (novoVendedor.whatsapp || "").replace(/\D/g, ""),
      foto: novoVendedor.foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      badge: novoVendedor.badge || "Consultor",
      ativo: true,
      totalCliquesWhatsapp: 0,
      totalVisitas: 0
    };

    const atualizado = {
      ...lojaAtual,
      vendedores: [...lojaAtual.vendedores, vendedorCompleto]
    };

    atualizarLoja(atualizado);
    setNovoVendedor({
      nome: "",
      cargo: "",
      whatsapp: "",
      foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      badge: "Consultor"
    });
  };

  const removerVendedor = (id: string) => {
    if (lojaAtual.vendedores.length <= 1) {
      alert("A loja precisa manter ao menos um vendedor ativo.");
      return;
    }
    if (confirm("Remover este consultor da equipe?")) {
      const atualizado = {
        ...lojaAtual,
        vendedores: lojaAtual.vendedores.filter((v) => v.id !== id)
      };
      atualizarLoja(atualizado);
    }
  };

  const adicionarItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoItem.titulo || !novoItem.preco) {
      alert("Preencha o título e o preço do item.");
      return;
    }

    const itemCompleto: ItemCatalogo = {
      id: `PROD-${Date.now().toString().slice(-4)}`,
      titulo: novoItem.titulo || "",
      descricao: novoItem.descricao || "",
      preco: novoItem.preco || "",
      tag: novoItem.tag || "",
      imagem: novoItem.imagem || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
      destaque: true
    };

    const atualizado = {
      ...lojaAtual,
      catalogo: [...lojaAtual.catalogo, itemCompleto]
    };

    atualizarLoja(atualizado);
    setNovoItem({
      titulo: "",
      descricao: "",
      preco: "R$ ",
      tag: "",
      imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
    });
  };

  const removerItem = (id: string) => {
    if (confirm("Remover este item da vitrine?")) {
      const atualizado = {
        ...lojaAtual,
        catalogo: lojaAtual.catalogo.filter((c) => c.id !== id)
      };
      atualizarLoja(atualizado);
    }
  };

  // Cálculos consolidados da loja atual
  const totalVisitas = lojaAtual.vendedores.reduce((acc, v) => acc + (v.totalVisitas || 0), 0);
  const totalCliques = lojaAtual.vendedores.reduce((acc, v) => acc + (v.totalCliquesWhatsapp || 0), 0);
  const taxaConversaoMedia = totalVisitas > 0 ? ((totalCliques / totalVisitas) * 100).toFixed(1) : "0.0";

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 gap-3">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500">
          Verificando permissões de acesso...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header com Botão de Manual em Destaque */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Voltar à Demonstração"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                  LyonsGo SaaS Engine
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono">
                  Multi-Tenant Ativo
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
                Central de Gestão, Afiliados & Auditoria
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* BOTÃO PRINCIPAL DE INSTRUÇÕES & PODER DO SAAS */}
            <button
              onClick={() => setModalManualAberto(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Como Usar & Potencial do App
            </button>

            {/* BOTÃO DE SEGURANÇA & SENHA DO PÉRSIO */}
            <button
              onClick={() => setModalSegurancaAberto(true)}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-xs font-semibold flex items-center gap-2 transition-all text-amber-400 border border-amber-500/30 hover:border-amber-400 cursor-pointer shadow-sm"
              title="Gerenciar Login, E-mail e Senha do Administrador"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Segurança & Senha</span>
            </button>

            <Link
              href={`/${lojaAtual.slug}`}
              target="_blank"
              className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-all text-zinc-200 border border-zinc-700"
            >
              <ExternalLink className="w-4 h-4" />
              Abrir Minisite
            </Link>

            <button
              onClick={restaurarPadrao}
              className="p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-zinc-700 cursor-pointer"
              title="Restaurar empresas padrão do SaaS"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* BOTÃO DE LOGOUT */}
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
              title={`Sair do painel (${user?.email || adminConfig.loginSalvo})`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* BARRA SELETORA MULTI-TENANT (EMPRESAS CLIENTES DO SAAS) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                Empresa Ativa no SaaS:
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{lojaAtual.nomeLoja}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">
                  /{lojaAtual.slug}
                </span>
                {lojaAtual.ramoAtividade && (
                  <span className="hidden md:inline text-[10px] text-zinc-400">
                    • {lojaAtual.ramoAtividade}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={slugSelecionado}
              onChange={(e) => mudarLoja(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
            >
              {Object.values(db).map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.nomeLoja} ({l.slug})
                </option>
              ))}
            </select>

            <button
              onClick={() => setModalNovaLoja(true)}
              className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              + Nova Empresa
            </button>

            {Object.keys(db).length > 1 && (
              <button
                onClick={() => handleExcluirLoja(lojaAtual.slug)}
                className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Excluir Empresa Atual"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Notificação de Sucesso */}
        {salvoFeedback && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Dados atualizados com sucesso no sistema multi-tenant!
          </div>
        )}

        {/* Abas de Navegação */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <button
            onClick={() => setAbaAtiva("loja")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              abaAtiva === "loja"
                ? "bg-amber-500 text-black shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Settings className="w-4 h-4" />
            Configurações & Minisite
          </button>
          <button
            onClick={() => setAbaAtiva("vendedores")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              abaAtiva === "vendedores"
                ? "bg-amber-500 text-black shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <Users className="w-4 h-4" />
            Equipe & Bio Links ({lojaAtual.vendedores.length})
          </button>
          <button
            onClick={() => setAbaAtiva("catalogo")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              abaAtiva === "catalogo"
                ? "bg-amber-500 text-black shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Produtos & Vitrine ({lojaAtual.catalogo.length})
          </button>
          <button
            onClick={() => setAbaAtiva("auditoria")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              abaAtiva === "auditoria"
                ? "bg-amber-500 text-black shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Métricas de Vendas & Acesso
          </button>
        </div>

        {/* CONTEÚDO DA ABA: AUDITORIA & MÉTRICAS */}
        {abaAtiva === "auditoria" && (
          <div className="space-y-6">
            {/* Cards de Métricas Consolidadas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400 font-medium">Total de Acessos</div>
                  <div className="text-2xl font-bold mt-1 text-white">{totalVisitas}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">Visitas acumuladas nos links</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400 font-medium">Contatos no WhatsApp</div>
                  <div className="text-2xl font-bold mt-1 text-emerald-400">{totalCliques}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">Leads com tag de vendedor</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400 font-medium">Taxa de Conversão</div>
                  <div className="text-2xl font-bold mt-1 text-amber-400">{taxaConversaoMedia}%</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">Visita → Ação de Compra</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Tabela de Desempenho por Vendedor */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                Auditoria de Conversão da Equipe ({lojaAtual.nomeLoja})
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-zinc-800 text-zinc-400 uppercase font-semibold">
                    <tr>
                      <th className="pb-3">Consultor / Especialista</th>
                      <th className="pb-3">Código ID</th>
                      <th className="pb-3">WhatsApp</th>
                      <th className="pb-3 text-center">Visitas</th>
                      <th className="pb-3 text-center">Cliques Zap</th>
                      <th className="pb-3 text-center">Taxa Conversão</th>
                      <th className="pb-3 text-right">Ação Rápida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {lojaAtual.vendedores.map((v) => {
                      const taxa =
                        v.totalVisitas && v.totalVisitas > 0
                          ? (((v.totalCliquesWhatsapp || 0) / v.totalVisitas) * 100).toFixed(1)
                          : "0.0";
                      return (
                        <tr key={v.id} className="hover:bg-zinc-800/30">
                          <td className="py-3.5 flex items-center gap-2.5">
                            <img
                              src={v.foto}
                              alt={v.nome}
                              className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                            />
                            <div>
                              <div className="font-bold text-white">{v.nome}</div>
                              <div className="text-[11px] text-zinc-400">{v.cargo}</div>
                            </div>
                          </td>
                          <td className="py-3.5 font-mono text-amber-400 font-semibold">
                            {v.codigo || v.id}
                          </td>
                          <td className="py-3.5 font-mono text-zinc-300">{v.whatsapp}</td>
                          <td className="py-3.5 text-center font-bold">{v.totalVisitas || 0}</td>
                          <td className="py-3.5 text-center font-bold text-emerald-400">
                            {v.totalCliquesWhatsapp || 0}
                          </td>
                          <td className="py-3.5 text-center font-semibold text-amber-400">
                            {taxa}%
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => copiarLinkVendedor(v.id)}
                              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[11px] font-semibold text-zinc-200 transition-colors inline-flex items-center gap-1"
                            >
                              {copiouId === v.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              {copiouId === v.id ? "Copiado" : "Copiar Link"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Como Funciona a Amarra de Vendas */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20">
              <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4" />
                Como a Amarra de Vendas Funciona na Prática?
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Cada consultor da empresa recebe um link exclusivo (ex: <code className="text-amber-400 font-mono">lyonsgo.com.br/{lojaAtual.slug}/carlos</code>). Quando qualquer cliente acessa este link e clica para falar no WhatsApp ou negociar um produto da vitrine, o LyonsGo gera automaticamente a mensagem direcionada para o número exato daquele consultor com a tag oficial de identificação (<code className="text-amber-400 font-mono">[Ref: #VEND-001]</code>). O gestor tem total controle das métricas e o vendedor tem comissão garantida.
              </p>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: VENDEDORES & LINKS */}
        {abaAtiva === "vendedores" && (
          <div className="space-y-6">
            {/* Lista de Vendedores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lojaAtual.vendedores.map((v) => {
                const origin = typeof window !== "undefined" ? window.location.origin : "https://lyonsgo.com.br";
                const linkVendedor = `${origin}/${lojaAtual.slug}/${v.id}`;

                return (
                  <div
                    key={v.id}
                    className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={v.foto}
                          alt={v.nome}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50 shadow-md"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-white">{v.nome}</h3>
                          <p className="text-xs text-zinc-400">{v.cargo}</p>
                          <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            {v.codigo || v.id}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removerVendedor(v.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Remover Consultor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                      <span className="truncate mr-2">{linkVendedor}</span>
                      <button
                        onClick={() => copiarLinkVendedor(v.id)}
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans text-xs"
                      >
                        {copiouId === v.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiouId === v.id ? "Copiado" : "Copiar"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-xs text-zinc-400">
                        WhatsApp: <span className="font-mono text-zinc-200">{v.whatsapp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setModalQrVendedor(v)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                          title="Ver QR Code"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/${lojaAtual.slug}/${v.id}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-black font-semibold text-xs transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Testar
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Formulário para Adicionar Novo Vendedor */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                Cadastrar Novo Consultor na Equipe de {lojaAtual.nomeLoja}
              </h3>

              <form onSubmit={adicionarVendedor} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={novoVendedor.nome}
                    onChange={(e) => setNovoVendedor({ ...novoVendedor, nome: e.target.value })}
                    placeholder="Ex: Lucas Oliveira"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Cargo / Especialidade</label>
                  <input
                    type="text"
                    value={novoVendedor.cargo}
                    onChange={(e) => setNovoVendedor({ ...novoVendedor, cargo: e.target.value })}
                    placeholder="Ex: Consultor Premium"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">WhatsApp (com DDD)</label>
                  <input
                    type="text"
                    required
                    value={novoVendedor.whatsapp}
                    onChange={(e) => setNovoVendedor({ ...novoVendedor, whatsapp: e.target.value })}
                    placeholder="Ex: 5511999994444"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">URL da Foto de Perfil</label>
                  <input
                    type="text"
                    value={novoVendedor.foto}
                    onChange={(e) => setNovoVendedor({ ...novoVendedor, foto: e.target.value })}
                    placeholder="URL da imagem (Unsplash, etc)"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Consultor à Equipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: ESTOQUE / VITRINE */}
        {abaAtiva === "catalogo" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lojaAtual.catalogo.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 relative"
                >
                  <div className="w-full h-32 rounded-xl overflow-hidden relative">
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removerItem(item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-500 text-white transition-colors"
                      title="Excluir produto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-white truncate">{item.titulo}</h4>
                    <span className="text-xs font-bold text-amber-400">{item.preco}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">{item.descricao}</p>
                </div>
              ))}
            </div>

            {/* Adicionar Produto */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Adicionar Item à Vitrine de {lojaAtual.nomeLoja}
              </h3>

              <form onSubmit={adicionarItem} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Título do Produto / Serviço</label>
                  <input
                    type="text"
                    required
                    value={novoItem.titulo}
                    onChange={(e) => setNovoItem({ ...novoItem, titulo: e.target.value })}
                    placeholder="Ex: Veículo, Imóvel ou Procedimento"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Preço / Condição</label>
                  <input
                    type="text"
                    required
                    value={novoItem.preco}
                    onChange={(e) => setNovoItem({ ...novoItem, preco: e.target.value })}
                    placeholder="Ex: R$ 350.000 ou R$ 1.200"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Tag / Selo de Destaque</label>
                  <input
                    type="text"
                    value={novoItem.tag}
                    onChange={(e) => setNovoItem({ ...novoItem, tag: e.target.value })}
                    placeholder="Ex: Destaque da Semana ou Oportunidade"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">URL da Imagem</label>
                  <input
                    type="text"
                    value={novoItem.imagem}
                    onChange={(e) => setNovoItem({ ...novoItem, imagem: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-zinc-400 block mb-1">Descrição Comercial</label>
                  <textarea
                    rows={2}
                    value={novoItem.descricao}
                    onChange={(e) => setNovoItem({ ...novoItem, descricao: e.target.value })}
                    placeholder="Detalhes, opcionais, garantia ou especificações..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Publicar Item na Vitrine
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: DADOS DA LOJA & TEMA */}
        {abaAtiva === "loja" && (
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-500" />
              Configurações & Identidade de {lojaAtual.nomeLoja}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nome da Empresa</label>
                <input
                  type="text"
                  value={lojaAtual.nomeLoja}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, nomeLoja: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Ramo de Atuação / Segmento</label>
                <input
                  type="text"
                  value={lojaAtual.ramoAtividade || ""}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, ramoAtividade: e.target.value })}
                  placeholder="Ex: Concessionária, Imobiliária, Estética..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Slogan</label>
                <input
                  type="text"
                  value={lojaAtual.slogan}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, slogan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Chave PIX Oficial</label>
                <input
                  type="text"
                  value={lojaAtual.chavePix}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, chavePix: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-zinc-400 block mb-1">Descrição / Bio da Empresa</label>
                <textarea
                  rows={2}
                  value={lojaAtual.descricao}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, descricao: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Endereço / Localização</label>
                <input
                  type="text"
                  value={lojaAtual.endereco}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, endereco: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Horário de Atendimento</label>
                <input
                  type="text"
                  value={lojaAtual.horario}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, horario: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Tema Visual Padrão</label>
                <select
                  value={lojaAtual.temaId}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, temaId: e.target.value as "dark" | "cyber" | "light" })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {TEMAS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Banner de Capa (URL)</label>
                <input
                  type="text"
                  value={lojaAtual.bannerLoja || ""}
                  onChange={(e) => setLojaAtual({ ...lojaAtual, bannerLoja: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => atualizarLoja(lojaAtual)}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Save className="w-4 h-4" />
                Salvar Alterações de {lojaAtual.nomeLoja}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal QR Code */}
      {modalQrVendedor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-zinc-900 border border-zinc-800 p-6 rounded-3xl text-center shadow-2xl text-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base">{modalQrVendedor.nome}</h3>
            <p className="text-xs text-zinc-400 mt-1 mb-4 font-mono">
              Código: {modalQrVendedor.codigo || modalQrVendedor.id}
            </p>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-md mb-4">
              <svg className="w-40 h-40" viewBox="0 0 100 100" fill="black">
                <path d="M0 0h30v30H0zm4 4h22v22H4zm4 4h14v14H8zM70 0h30v30H70zm4 4h22v22H74zm4 4h14v14H78zM0 70h30v30H0zm4 4h22v22H4zm4 4h14v14H8zM40 10h10v10H40zm10 20h10v10H50zm-10 10h10v10H40zm20 10h10v10H60zm-20 20h10v10H40zm30 0h10v10H70zm10-10h10v10H80zm0 20h10v10H80zm-10 10h10v10H70zm20 0h10v10H90z" />
              </svg>
            </div>

            <button
              onClick={() => setModalQrVendedor(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal Criar Nova Loja */}
      {modalNovaLoja && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl text-white space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Cadastrar Nova Empresa Cliente</h3>
                <p className="text-xs text-zinc-400">Crie o minisite e a equipe em 1 clique</p>
              </div>
            </div>

            <form onSubmit={handleCriarNovaLoja} className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nome da Empresa</label>
                <input
                  type="text"
                  required
                  value={formNovaLoja.nomeLoja}
                  onChange={(e) => setFormNovaLoja({ ...formNovaLoja, nomeLoja: e.target.value })}
                  placeholder="Ex: Ótica Vista Linda"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Slug da URL (Subpasta)</label>
                <input
                  type="text"
                  value={formNovaLoja.slug}
                  onChange={(e) => setFormNovaLoja({ ...formNovaLoja, slug: e.target.value })}
                  placeholder="Ex: otica-vista-linda (vazio para gerar automático)"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Ramo de Atuação</label>
                <input
                  type="text"
                  value={formNovaLoja.ramoAtividade}
                  onChange={(e) => setFormNovaLoja({ ...formNovaLoja, ramoAtividade: e.target.value })}
                  placeholder="Ex: Ótica, Imobiliária, Advocacia..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">WhatsApp Padrão da Loja</label>
                <input
                  type="text"
                  value={formNovaLoja.whatsappPadrao}
                  onChange={(e) => setFormNovaLoja({ ...formNovaLoja, whatsappPadrao: e.target.value })}
                  placeholder="Ex: 5511999990000"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNovaLoja(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors shadow-lg"
                >
                  Criar Empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Instruções & Potencial do SaaS */}
      <ManualSaasModal
        aberto={modalManualAberto}
        onFechar={() => setModalManualAberto(false)}
      />

      {/* Modal de Segurança, Login e Senha do Pérsio */}
      <AdminSegurancaModal
        aberto={modalSegurancaAberto}
        onFechar={() => setModalSegurancaAberto(false)}
      />
    </div>
  );
}

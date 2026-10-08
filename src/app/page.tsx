"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Share2,
  Copy,
  Check,
  QrCode,
  MapPin,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  BadgeCheck,
  UserCheck,
  Clock,
  Car,
  ChevronRight,
  ShieldCheck,
  Flame,
  ArrowUpRight
} from "lucide-react";

interface Vendedor {
  id: string;
  nome: string;
  cargo: string;
  whatsapp: string;
  foto: string;
  badge: string;
  vendasMes: number;
}

interface ItemCatalogo {
  id: string;
  titulo: string;
  descricao: string;
  preco: string;
  tag?: string;
  imagem: string;
}

const VENDEDORES: Vendedor[] = [
  {
    id: "VEND-01",
    nome: "Carlos Silva",
    cargo: "Consultor Sênior",
    whatsapp: "5511999991111",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    badge: "Top Vendas",
    vendasMes: 24,
  },
  {
    id: "VEND-02",
    nome: "Mariana Costa",
    cargo: "Especialista em Financiamentos",
    whatsapp: "5511999992222",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    badge: "Atendimento Rápido",
    vendasMes: 19,
  },
  {
    id: "VEND-03",
    nome: "Roberto Mendes",
    cargo: "Avaliador & Seminovos",
    whatsapp: "5511999993333",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    badge: "Melhor Avaliação",
    vendasMes: 22,
  },
];

const CATALAGO_EXEMPLO: ItemCatalogo[] = [
  {
    id: "PROD-01",
    titulo: "BMW 320i M Sport 2024",
    descricao: "Teto solar, interior cognac, 12.000 km, garantia de fábrica",
    preco: "R$ 315.000",
    tag: "Destaque da Semana",
    imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "PROD-02",
    titulo: "Porsche Macan GTS 2023",
    descricao: "Único dono, escapamento esportivo, revisões na autorizada",
    preco: "R$ 589.000",
    tag: "Oportunidade",
    imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
  },
];

const TEMAS = [
  { id: "dark", nome: "Dark Luxury", bg: "bg-zinc-950 text-zinc-100", card: "bg-zinc-900/90 border-zinc-800 text-zinc-100", accent: "from-amber-400 to-amber-600 text-black", highlight: "text-amber-400" },
  { id: "cyber", nome: "Cyber Glow", bg: "bg-slate-950 text-slate-100", card: "bg-slate-900/90 border-cyan-800/50 text-slate-100", accent: "from-cyan-400 to-blue-600 text-white", highlight: "text-cyan-400" },
  { id: "light", nome: "Minimal Pure", bg: "bg-stone-50 text-stone-900", card: "bg-white border-stone-200 text-stone-900 shadow-sm", accent: "from-zinc-900 to-black text-white", highlight: "text-zinc-950" },
];

export default function MinisiteBioDemo() {
  const [vendedorAtual, setVendedorAtual] = useState<Vendedor>(VENDEDORES[0]);
  const [temaAtual, setTemaAtual] = useState(TEMAS[0]);
  const [copiouPix, setCopiouPix] = useState(false);
  const [copiouLink, setCopiouLink] = useState(false);
  const [modalQrAberto, setModalQrAberto] = useState(false);

  const chavePix = "contato@lyonsgo.com.br";
  const linkBioVendedor = `https://lyonsgo.com.br/elite-motors/${vendedorAtual.id.toLowerCase()}`;

  const gerarWhatsappUrl = (assunto?: string) => {
    const rawNumber = vendedorAtual.whatsapp.replace(/\D/g, "");
    const msg = assunto
      ? `Olá, ${vendedorAtual.nome}! Vi o anúncio no seu link da bio (Ref: ${vendedorAtual.id}) e tenho interesse em: ${assunto}. Pode me ajudar?`
      : `Olá, ${vendedorAtual.nome}! Acessei seu link da bio (Ref: ${vendedorAtual.id}) e gostaria de mais informações sobre as ofertas da loja.`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
  };

  const copiarPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopiouPix(true);
    setTimeout(() => setCopiouPix(false), 2500);
  };

  const copiarLinkBio = () => {
    navigator.clipboard.writeText(linkBioVendedor);
    setCopiouLink(true);
    setTimeout(() => setCopiouLink(false), 2500);
  };

  return (
    <div className={`min-h-screen py-6 px-4 flex flex-col items-center transition-colors duration-300 ${temaAtual.bg}`}>
      {/* Barra de controle superior (Simulador de Gestão / Demonstração) */}
      <header className="w-full max-w-md mb-6 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-white shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">LyonsGo Engine</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
            Multi-Afiliados Ativo
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400 font-medium flex items-center justify-between mb-1.5">
              <span>Simular Vendedor Logado:</span>
              <span className="text-amber-400 font-mono text-[11px]">{vendedorAtual.id}</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {VENDEDORES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVendedorAtual(v)}
                  className={`px-2 py-1.5 text-xs rounded-lg font-medium transition-all text-center truncate ${
                    vendedorAtual.id === v.id
                      ? "bg-amber-500 text-black shadow-md font-semibold"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {v.nome.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium flex items-center justify-between mb-1.5">
              <span>Tema Visual do Minisite:</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {TEMAS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemaAtual(t)}
                  className={`px-2 py-1 text-xs rounded-lg transition-all ${
                    temaAtual.id === t.id
                      ? "bg-zinc-100 text-zinc-900 font-semibold"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {t.nome}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Frame do Smartphone / Minisite */}
      <main className="w-full max-w-md flex flex-col items-center">
        {/* Banner e Avatar */}
        <div className="w-full relative mb-4">
          <div className="w-full h-32 rounded-3xl overflow-hidden relative shadow-lg bg-gradient-to-r from-zinc-800 via-zinc-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium border border-white/10 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Aberto Agora
            </div>
          </div>

          {/* Avatar sobreposto */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="relative">
              <img
                src={vendedorAtual.foto}
                alt={vendedorAtual.nome}
                className="w-20 h-20 rounded-full object-cover border-4 border-zinc-950 shadow-2xl"
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black p-1 rounded-full shadow-md">
                <BadgeCheck className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Título & Identificação do Vendedor */}
        <div className="mt-8 text-center px-4 w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Elite Motors Concessionária
          </div>
          <h1 className="text-xl font-bold tracking-tight flex items-center justify-center gap-1.5">
            {vendedorAtual.nome}
          </h1>
          <p className="text-xs opacity-75 mt-0.5 flex items-center justify-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            {vendedorAtual.cargo} • Atendimento Exclusivo
          </p>

          <p className="text-xs opacity-60 mt-2 max-w-xs mx-auto leading-relaxed">
            Especialista em veículos seminovos selecionados e taxa zero. Fale diretamente comigo pelo WhatsApp para negociações exclusivas.
          </p>
        </div>

        {/* Card de Identificação de Rastreamento (Amarrar Venda) */}
        <div className={`w-full mt-4 p-3 rounded-2xl border backdrop-blur-md flex items-center justify-between text-xs ${temaAtual.card}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold font-mono">
              ID
            </div>
            <div>
              <div className="font-semibold flex items-center gap-1">
                Ref: <span className="font-mono text-amber-500">{vendedorAtual.id}</span>
              </div>
              <div className="text-[11px] opacity-70">Vendas vinculadas a este consultor</div>
            </div>
          </div>
          <button
            onClick={() => setModalQrAberto(true)}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 transition-colors text-zinc-200"
            title="Ver QR Code do Vendedor"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* BOTÃO PRINCIPAL DE CONTATO DIRETO (WHATSAPP COM AMARRAÇÃO) */}
        <div className="w-full mt-4 space-y-2.5">
          <a
            href={gerarWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm flex items-center justify-between shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black/15 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="leading-tight">Falar com {vendedorAtual.nome.split(" ")[0]} no Zap</div>
                <div className="text-[11px] font-normal opacity-85">Atendimento rápido e direto</div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Botão de Compartilhar Link */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={copiarLinkBio}
              className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${temaAtual.card} hover:border-amber-500/50`}
            >
              {copiouLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiouLink ? "Copiado!" : "Copiar Link"}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: `Minisite ${vendedorAtual.nome}`, url: linkBioVendedor });
                } else {
                  copiarLinkBio();
                }
              }}
              className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${temaAtual.card} hover:border-amber-500/50`}
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </button>
          </div>
        </div>

        {/* VITRINE / CATÁLOGO RÁPIDO DO MINISITE */}
        <section className="w-full mt-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-80">
              <Car className="w-4 h-4 text-amber-500" />
              Estoque Selecionado
            </div>
            <span className="text-[11px] opacity-60">2 destaques</span>
          </div>

          <div className="space-y-3">
            {CATALAGO_EXEMPLO.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${temaAtual.card} hover:scale-[1.01]`}
              >
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3">
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-full h-full object-cover"
                  />
                  {item.tag && (
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-amber-400 text-[10px] font-semibold border border-amber-500/30 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {item.tag}
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-zinc-950/90 text-white font-bold text-xs">
                    {item.preco}
                  </div>
                </div>

                <h3 className="font-bold text-sm">{item.titulo}</h3>
                <p className="text-xs opacity-70 mt-1 leading-relaxed line-clamp-2">
                  {item.descricao}
                </p>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[11px] opacity-60 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Garantia e Laudo Cautelar
                  </div>
                  <a
                    href={gerarWhatsappUrl(item.titulo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    Negociar
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCO PIX / PAGAMENTO RÁPIDO */}
        <section className={`w-full mt-5 p-4 rounded-2xl border ${temaAtual.card}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              Sinal ou Reserva via PIX
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Instantâneo
            </span>
          </div>
          <p className="text-xs opacity-70 mb-3">
            Garante a reserva do veículo antes de visitar a loja transferindo para a chave oficial:
          </p>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-black/20 border border-white/10">
            <span className="font-mono text-xs truncate flex-1 px-1">{chavePix}</span>
            <button
              onClick={copiarPix}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiouPix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiouPix ? "Copiado" : "Copiar"}
            </button>
          </div>
        </section>

        {/* LOCALIZAÇÃO E CONTATO */}
        <section className={`w-full mt-4 p-4 rounded-2xl border ${temaAtual.card} space-y-3`}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-zinc-800 text-amber-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <div className="font-bold">Showroom Principal</div>
              <div className="opacity-70 mt-0.5">Av. Europa, 1200 - Jardins, São Paulo - SP</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-white/5 text-xs">
            <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400">
              <Clock className="w-4 h-4" />
            </div>
            <div className="opacity-80">Segunda a Sábado das 08h às 19h</div>
          </div>
        </section>

        {/* REDES SOCIAIS E RODAPÉ */}
        <footer className="w-full mt-6 mb-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 transition-colors text-zinc-300 hover:text-white"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <button
              onClick={() => setModalQrAberto(true)}
              className="p-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 transition-colors text-zinc-300 hover:text-white"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] opacity-40">
            Powered by <span className="font-semibold text-amber-400">LyonsGo</span> • Minisites & Afiliados
          </div>
        </footer>
      </main>

      {/* Modal do QR Code Dinâmico */}
      {modalQrAberto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-zinc-900 border border-zinc-800 p-6 rounded-3xl text-center shadow-2xl text-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base">QR Code Exclusivo</h3>
            <p className="text-xs text-zinc-400 mt-1 mb-4">
              Aponte a câmera para abrir o perfil de {vendedorAtual.nome} (Ref: {vendedorAtual.id})
            </p>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-md mb-4">
              {/* Representação visual do QR Code SVG */}
              <svg className="w-40 h-40" viewBox="0 0 100 100" fill="black">
                <path d="M0 0h30v30H0zm4 4h22v22H4zm4 4h14v14H8zM70 0h30v30H70zm4 4h22v22H74zm4 4h14v14H78zM0 70h30v30H0zm4 4h22v22H4zm4 4h14v14H8zM40 10h10v10H40zm10 20h10v10H50zm-10 10h10v10H40zm20 10h10v10H60zm-20 20h10v10H40zm30 0h10v10H70zm10-10h10v10H80zm0 20h10v10H80zm-10 10h10v10H70zm20 0h10v10H90z" />
              </svg>
            </div>

            <p className="text-[11px] text-zinc-400 font-mono mb-4 truncate px-2">
              {linkBioVendedor}
            </p>

            <button
              onClick={() => setModalQrAberto(false)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

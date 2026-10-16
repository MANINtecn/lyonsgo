"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Share2,
  Copy,
  Check,
  QrCode,
  MapPin,
  ShoppingBag,
  BadgeCheck,
  UserCheck,
  Clock,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";
import { MinisiteData, Vendedor, TemaConfig } from "../lib/types";
import { TEMAS, registrarCliqueWhatsapp, registrarVisita } from "../lib/store";

interface MinisiteViewProps {
  data: MinisiteData;
  vendedorAtivo?: Vendedor;
  onMudarVendedor?: (vendedor: Vendedor) => void;
  mostrarBarraAdmin?: boolean;
}

export default function MinisiteView({
  data,
  vendedorAtivo
}: MinisiteViewProps) {
  const vendedor = vendedorAtivo || data.vendedores?.[0] || {
    id: "atendimento",
    codigo: "#ATEND-01",
    nome: data.nomeLoja,
    cargo: "Atendimento Geral",
    whatsapp: data.whatsappPadrao || "5511999990000",
    foto: data.avatarLoja,
    ativo: true
  };

  const tema: TemaConfig =
    TEMAS.find((t) => t.id === data.temaId) || TEMAS[0];

  const [copiouPix, setCopiouPix] = useState(false);
  const [copiouLink, setCopiouLink] = useState(false);
  const [modalQrAberto, setModalQrAberto] = useState(false);

  useEffect(() => {
    if (vendedor?.id) {
      registrarVisita(vendedor.id);
    }
  }, [vendedor?.id]);

  const origin = typeof window !== "undefined" ? window.location.origin : "https://lyonsgo.com.br";
  const linkBioVendedor = `${origin}/${data.slug}/${vendedor.id}`;

  const gerarWhatsappUrl = (assunto?: string) => {
    const rawNumber = (vendedor.whatsapp || data.whatsappPadrao || "").replace(/\D/g, "");
    const msg = assunto
      ? `Olá, ${vendedor.nome}! Acessei seu link da bio (${vendedor.codigo || vendedor.id}) e tenho interesse em: ${assunto}. Poderia me atender?`
      : `Olá, ${vendedor.nome}! Acessei seu link da bio (${vendedor.codigo || vendedor.id}) e gostaria de mais informações sobre ${data.nomeLoja}.`;

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
  };

  const handleWhatsappClick = (assunto?: string) => {
    registrarCliqueWhatsapp(vendedor.id);
    window.open(gerarWhatsappUrl(assunto), "_blank");
  };

  const copiarPix = () => {
    if (!data.chavePix) return;
    navigator.clipboard.writeText(data.chavePix);
    setCopiouPix(true);
    setTimeout(() => setCopiouPix(false), 2500);
  };

  const copiarLinkBio = () => {
    navigator.clipboard.writeText(linkBioVendedor);
    setCopiouLink(true);
    setTimeout(() => setCopiouLink(false), 2500);
  };

  return (
    <div className={`min-h-screen py-6 px-4 flex flex-col items-center transition-colors duration-300 ${tema.bg}`}>
      {/* Frame do Smartphone / Minisite */}
      <main className="w-full max-w-md flex flex-col items-center">
        {/* Banner e Avatar */}
        <div className="w-full relative mb-4">
          <div
            className="w-full h-32 rounded-3xl overflow-hidden relative shadow-lg bg-gradient-to-r from-zinc-800 via-zinc-900 to-black bg-cover bg-center"
            style={{ backgroundImage: data.bannerLoja ? `url(${data.bannerLoja})` : undefined }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium border border-white/10 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Aberto Agora
            </div>
          </div>

          {/* Avatar sobreposto */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="relative">
              <img
                src={vendedor.foto || data.avatarLoja}
                alt={vendedor.nome}
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
            <BadgeCheck className="w-3.5 h-3.5" />
            {data.nomeLoja}
          </div>
          <h1 className="text-xl font-bold tracking-tight flex items-center justify-center gap-1.5">
            {vendedor.nome}
          </h1>
          <p className="text-xs opacity-75 mt-0.5 flex items-center justify-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            {vendedor.cargo} • Atendimento Direto
          </p>

          <p className="text-xs opacity-60 mt-2 max-w-xs mx-auto leading-relaxed">
            {data.descricao}
          </p>
        </div>

        {/* Card de Identificação de Rastreamento (Amarrar Venda) */}
        <div className={`w-full mt-4 p-3 rounded-2xl border backdrop-blur-md flex items-center justify-between text-xs ${tema.card}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold font-mono">
              ID
            </div>
            <div>
              <div className="font-semibold flex items-center gap-1">
                Ref: <span className="font-mono text-amber-500">{vendedor.codigo || vendedor.id}</span>
              </div>
              <div className="text-[11px] opacity-70">Atendimento vinculado a este consultor</div>
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
          <button
            onClick={() => handleWhatsappClick()}
            className="w-full py-4 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm flex items-center justify-between shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black/15 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="leading-tight">Falar com {vendedor.nome.split(" ")[0]} no WhatsApp</div>
                <div className="text-[11px] font-normal opacity-85">Atendimento rápido e exclusivo</div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Botão de Compartilhar Link */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={copiarLinkBio}
              className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${tema.card} hover:border-amber-500/50`}
            >
              {copiouLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiouLink ? "Copiado!" : "Copiar Link"}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: `Minisite ${vendedor.nome}`, url: linkBioVendedor });
                } else {
                  copiarLinkBio();
                }
              }}
              className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${tema.card} hover:border-amber-500/50`}
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </button>
          </div>
        </div>

        {/* VITRINE / CATÁLOGO RÁPIDO DO MINISITE */}
        {data.catalogo && data.catalogo.length > 0 && (
          <section className="w-full mt-6">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-80">
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                Vitrine & Destaques
              </div>
              <span className="text-[11px] opacity-60">{data.catalogo.length} itens</span>
            </div>

            <div className="space-y-3">
              {data.catalogo.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all ${tema.card} hover:scale-[1.01]`}
                >
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      className="w-full h-full object-cover"
                    />
                    {item.tag && (
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-amber-400 text-[10px] font-semibold border border-amber-500/30">
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
                      Garantia & Procedência
                    </div>
                    <button
                      onClick={() => handleWhatsappClick(item.titulo)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      Solicitar
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BLOCO PIX / PAGAMENTO RÁPIDO */}
        {data.chavePix && (
          <section className={`w-full mt-5 p-4 rounded-2xl border ${tema.card}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                Pagamento ou Reserva via PIX
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Instantâneo
              </span>
            </div>
            <p className="text-xs opacity-70 mb-3">
              Chave oficial da empresa para transferências e pagamentos rápidos:
            </p>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-black/20 border border-white/10">
              <span className="font-mono text-xs truncate flex-1 px-1">{data.chavePix}</span>
              <button
                onClick={copiarPix}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiouPix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiouPix ? "Copiado" : "Copiar"}
              </button>
            </div>
          </section>
        )}

        {/* LOCALIZAÇÃO E CONTATO */}
        <section className={`w-full mt-4 p-4 rounded-2xl border ${tema.card} space-y-3`}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-zinc-800 text-amber-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <div className="font-bold">Showroom Principal</div>
              <div className="opacity-70 mt-0.5">{data.endereco}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-white/5 text-xs">
            <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400">
              <Clock className="w-4 h-4" />
            </div>
            <div className="opacity-80">{data.horario}</div>
          </div>
        </section>

        {/* REDES SOCIAIS E RODAPÉ */}
        <footer className="w-full mt-6 mb-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            {data.instagramUrl && (
              <a
                href={data.instagramUrl}
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
            )}
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
              Aponte a câmera para abrir o link de {vendedor.nome} ({vendedor.codigo || vendedor.id})
            </p>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-md mb-4">
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

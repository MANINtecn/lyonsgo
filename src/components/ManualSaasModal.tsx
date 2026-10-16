"use client";

import React from "react";
import {
  X,
  BookOpen,
  Zap,
  Target,
  Users,
  CheckCircle2,
  Car,
  Building2,
  HeartPulse,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  QrCode,
  DollarSign
} from "lucide-react";

interface ManualSaasModalProps {
  aberto: boolean;
  onFechar: () => void;
}

export default function ManualSaasModal({ aberto, onFechar }: ManualSaasModalProps) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl text-zinc-100 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Guia Estratégico & Manual de Uso
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white">
                O Poder do LyonsGo: Como Usar & Potencial de Mercado
              </h2>
            </div>
          </div>

          <button
            onClick={onFechar}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com Scroll */}
        <div className="p-6 overflow-y-auto space-y-8 text-xs leading-relaxed text-zinc-300">
          {/* SEÇÃO 1: O PODER DO APLICATIVO */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400">
              <Zap className="w-4 h-4" />
              1. O Que Torna Este Aplicativo Uma Máquina de Vendas?
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-xs">Conversão Real vs Linktree</h4>
                <p className="text-[11px] text-zinc-400">
                  Links tradicionais só mostram botões secos. O LyonsGo entrega um **minisite completo** com foto de capa, bio profissional, vitrine com preços e botão PIX sem taxas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-xs">Amarra de Vendas Inquebrável</h4>
                <p className="text-[11px] text-zinc-400">
                  A loja tem 5 vendedores? Todos usam o mesmo catálogo, mas cada um tem seu link exclusivo. O WhatsApp vai direto para o vendedor com a tag única (<code className="text-amber-400 font-mono">#VEND-001</code>). Fim das brigas por comissão!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <QrCode className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-xs">Do Físico ao Digital em 1 Seg</h4>
                <p className="text-[11px] text-zinc-400">
                  Gera QR Codes automáticos para cada vendedor usar no balcão, no cartão de visitas, no crachá ou na mesa de atendimento. O cliente aponta a câmera e já entra no link dele.
                </p>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: QUEM ELE CONSEGUE ATENDER */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400">
              <Target className="w-4 h-4" />
              2. Quem Este Mini SaaS Consegue Atender? (Mercados Alvo)
            </div>
            <p className="text-xs text-zinc-400">
              Você pode vender assinaturas e licenças mensais do LyonsGo para diversos nichos comerciais de alto ticket:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Concessionárias & Revendas de Veículos</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Cada consultor divulga os carros mais quentes da semana na bio do seu Instagram pessoal, com financiamento, fotos e negociação direta.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Imobiliárias & Equipes de Corretores</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Cada corretor da imobiliária tem seu link com os lançamentos e coberturas, direcionando o lead para seu próprio WhatsApp com registro de visitas.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Clínicas de Estética, Dentistas & Saúde</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Apresenta os protocolos e procedimentos da clínica, e o cliente escolhe com qual especialista ou biomédica deseja agendar a avaliação.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Lojas de Moda, Óticas & Varejo Premium</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    As vendedoras da loja física mandam seus links no WhatsApp para suas clientes habituais comprarem direto com elas, garantindo a comissão do mês.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 3: PASSO A PASSO DE COMO USAR */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
              3. Passo a Passo Mastigado: Como Usar a Plataforma
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h5 className="font-bold text-white">Criar ou Selecionar a Empresa (Tenant)</h5>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    No topo do painel, escolha a empresa ou clique em <strong>Cadastrar Nova Empresa</strong>. Defina o nome e a URL amigável (slug, ex: <code className="text-amber-400">/imobiliaria-ouro</code>).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h5 className="font-bold text-white">Cadastrar a Equipe de Vendedores / Afiliados</h5>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Na aba <strong>Vendedores & Links</strong>, adicione o nome, cargo e número de WhatsApp com DDD. O LyonsGo gera imediatamente o link exclusivo daquele vendedor (ex: <code className="text-amber-400">/loja/carlos</code>) e o QR Code.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h5 className="font-bold text-white">Cadastrar Produtos ou Serviços na Vitrine</h5>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Na aba <strong>Estoque / Vitrine</strong>, insira os itens principais com título, preço, foto e selos chamativos (ex: <em>Oportunidade</em>, <em>Mais Vendido</em>).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h5 className="font-bold text-white">Configurar Chave PIX & Tema Visual</h5>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Na aba <strong>Dados da Loja</strong>, cadastre a Chave PIX oficial para o cliente poder copiar em 1 clique e escolher entre os temas visuais (<em>Dark Luxury</em>, <em>Cyber Glow</em> ou <em>Minimal Pure</em>).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  5
                </span>
                <div>
                  <h5 className="font-bold text-white">Auditar e Escalar as Vendas</h5>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Na aba <strong>Auditoria & Métricas</strong>, acompanhe em tempo real quais vendedores estão recebendo mais visitas e cliques no WhatsApp, comparando as taxas de conversão de cada um!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">
            LyonsGo Engine • Desenvolvido para Alta Conversão e Monetização
          </span>
          <button
            onClick={onFechar}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
          >
            Entendido, Vamos às Vendas!
          </button>
        </div>
      </div>
    </div>
  );
}

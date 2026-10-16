"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  ShoppingBag,
  QrCode,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Zap,
  Globe,
  Settings,
  Smartphone,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Copy
} from "lucide-react";
import MinisiteView from "../components/MinisiteView";
import { getSaasDatabase } from "../lib/store";
import { MinisiteData, SaasDatabase } from "../lib/types";

export default function HomePage() {
  const [db, setDb] = useState<SaasDatabase>({});
  const [lojaDemonstracao, setLojaDemonstracao] = useState<MinisiteData | null>(null);

  useEffect(() => {
    const loadedDb = getSaasDatabase();
    setDb(loadedDb);
    const primeiraChave = Object.keys(loadedDb)[0];
    if (primeiraChave && loadedDb[primeiraChave]) {
      setLojaDemonstracao(loadedDb[primeiraChave]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Barra de Navegação Superior */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-zinc-950 font-black text-lg shadow-lg shadow-amber-500/20">
              L
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-base leading-none text-white">
                LyonsGo
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase mt-0.5">
                Minisites & Bio Links
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-400">
            <a href="#como-funciona" className="hover:text-white transition-colors">
              Como Funciona
            </a>
            <a href="#amarra-vendas" className="hover:text-white transition-colors">
              Amarra de Vendas
            </a>
            <a href="#recursos" className="hover:text-white transition-colors">
              Recursos
            </a>
            <a href="#demonstracao" className="hover:text-white transition-colors">
              Demonstração
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-amber-500/10 flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              Painel do Lojista
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 overflow-hidden border-b border-zinc-900">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Plataforma SaaS de Bio Links & Minisites Comerciais
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Minisites de Alta Conversão com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Rastreamento de Vendas
            </span>{" "}
            por Vendedor
          </h1>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Transforme o link da bio do seu Instagram e WhatsApp em uma estrutura completa de vendas:
            vitrine de produtos, chave PIX instantânea e o exclusivo sistema de links individuais para
            cada vendedor da sua equipe.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/admin"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              Acessar Painel Administrativo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#demonstracao"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              Ver Minisite Modelo
            </a>
          </div>

          {/* 3 Pilares Resumidos */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white">100% Mobile First</h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                Carregamento imediato no smartphone com layout limpo e focado em converter.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white">Amarra de Vendas</h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                Cada vendedor com seu próprio WhatsApp e identificador exclusivo nas mensagens.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white">Vitrine & PIX Integrado</h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                Exiba produtos com fotos e preços e receba pagamentos por PIX no ato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Exclusiva: Amarra de Vendas por Vendedor */}
      <section id="amarra-vendas" className="py-20 px-4 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Diferencial Exclusivo LyonsGo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Toda a sua equipe vendendo pelo link da bio com rastreamento individual
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
              Ideal para lojas de veículos, imobiliárias, clínicas, óticas e equipes comerciais.
              Chega de perder vendas ou disputar atendimentos por links genéricos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-amber-400 flex items-center justify-center font-bold font-mono text-sm mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-white">Link Exclusivo por Vendedor</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Cada vendedor da sua equipe recebe sua própria URL personalizada para colocar na bio das
                  redes sociais ou enviar para clientes.
                </p>
              </div>
              <div className="mt-6 p-3 rounded-xl bg-black/40 border border-zinc-800 font-mono text-[11px] text-amber-400 truncate">
                lyonsgo.com.br/sualoja/consultor-01
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-amber-400 flex items-center justify-center font-bold font-mono text-sm mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-white">Catálogo Único Compartilhado</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  O administrador cadastra os produtos e valores uma única vez. Todos os vendedores
                  apresentam o mesmo catálogo atualizado em tempo real.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Sem duplicação de dados ou divergência
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-white">WhatsApp Direto com ID de Venda</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Ao clicar para negociar ou comprar, o cliente é direcionado ao WhatsApp daquele vendedor
                  com uma mensagem identificando o código do consultor.
                </p>
              </div>
              <div className="mt-6 p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-300">
                &quot;Olá! Vi no link da bio [Ref: #VEND-01]...&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Principais */}
      <section id="recursos" className="py-20 px-4 border-b border-zinc-900 bg-zinc-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Recursos Completos
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Tudo o que sua empresa precisa em um único Minisite
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Globe className="w-5 h-5 text-amber-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Bio Link Profissional</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Visual executivo com logotipo, banner, redes sociais e selo oficial de verificação.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <ShoppingBag className="w-5 h-5 text-amber-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Vitrine & Produtos</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Exiba itens em estoque, serviços ou destaques com foto, valor e botão direto para consulta.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Zap className="w-5 h-5 text-emerald-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Chave PIX Copia e Cola</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Facilite pagamentos de sinal ou pedidos imediatos com botão de copiar chave com 1 toque.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <QrCode className="w-5 h-5 text-amber-400 mb-3" />
              <h3 className="text-sm font-bold text-white">QR Code Dinâmico</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Gere QR Codes de alta qualidade para adesivos de vitrine, balcão de atendimento e cartões.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <PhoneCall className="w-5 h-5 text-emerald-400 mb-3" />
              <h3 className="text-sm font-bold text-white">WhatsApp & Localização</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Integração com botão direto de conversa, endereço com rota no mapa e horários de funcionamento.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Settings className="w-5 h-5 text-amber-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Painel de Gestão Completo</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Edite dados da loja, cadastre vendedores e altere produtos em segundos pelo celular ou PC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstração Interativa ao Vivo do Minisite */}
      <section id="demonstracao" className="py-20 px-4 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Demonstração ao Vivo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              A experiência que o seu cliente vê no celular
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Abaixo está o modelo real de Minisite gerado pela plataforma, pronto para ser personalizado
              com a marca da sua empresa.
            </p>
          </div>

          <div className="flex justify-center">
            {/* Moldura de Smartphone Elegante */}
            <div className="w-full max-w-sm rounded-[40px] p-3 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 border-4 border-zinc-700/80 shadow-2xl relative">
              {/* Notch superior */}
              <div className="w-28 h-4 bg-zinc-950 rounded-b-xl mx-auto mb-2 border border-zinc-800"></div>

              {/* Conteúdo do Minisite */}
              <div className="rounded-[30px] overflow-hidden max-h-[640px] overflow-y-auto">
                {lojaDemonstracao ? (
                  <MinisiteView data={lojaDemonstracao} />
                ) : (
                  <div className="p-8 text-center text-xs text-zinc-500">
                    Carregando Minisite demonstrativo...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              Personalizar as informações deste Minisite no Painel
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Chamada para Ação Final */}
      <section className="py-20 px-4 bg-gradient-to-b from-zinc-950 to-black text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pronto para profissionalizar o atendimento da sua equipe?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Acesse o painel administrativo agora mesmo para configurar o minisite da sua empresa,
            cadastrar seus vendedores e gerar links de alta conversão.
          </p>
          <div className="mt-8">
            <Link
              href="/admin"
              className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all shadow-xl shadow-amber-500/20 inline-flex items-center gap-2"
            >
              Acessar Painel do Lojista
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé Institucional */}
      <footer className="w-full border-t border-zinc-900 bg-black py-8 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-black font-black text-xs flex items-center justify-center">
              L
            </div>
            <span className="font-bold text-zinc-300">LyonsGo</span>
            <span>• Minisites & Bio Links Profissionais</span>
          </div>
          <div>
            Desenvolvido por <span className="font-semibold text-zinc-400">TECX SOFTHOUSE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

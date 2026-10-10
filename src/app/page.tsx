"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MinisiteView from "../components/MinisiteView";
import { getSaasDatabase, getLojaPorSlug } from "../lib/store";
import { MinisiteData, Vendedor, SaasDatabase } from "../lib/types";
import { Sparkles, Building2, BookOpen, Settings } from "lucide-react";
import ManualSaasModal from "../components/ManualSaasModal";

export default function HomePage() {
  const [db, setDb] = useState<SaasDatabase>({});
  const [slugAtivo, setSlugAtivo] = useState<string>("elite-motors");
  const [data, setData] = useState<MinisiteData | null>(null);
  const [vendedorAtivo, setVendedorAtivo] = useState<Vendedor | undefined>(undefined);
  const [manualAberto, setManualAberto] = useState(false);

  useEffect(() => {
    const loadedDb = getSaasDatabase();
    setDb(loadedDb);
    const initialSlug = loadedDb["elite-motors"] ? "elite-motors" : Object.keys(loadedDb)[0];
    if (initialSlug && loadedDb[initialSlug]) {
      setSlugAtivo(initialSlug);
      setData(loadedDb[initialSlug]);
      if (loadedDb[initialSlug].vendedores.length > 0) {
        setVendedorAtivo(loadedDb[initialSlug].vendedores[0]);
      }
    }
  }, []);

  const handleTrocaEmpresa = (novoSlug: string) => {
    setSlugAtivo(novoSlug);
    const loja = db[novoSlug];
    if (loja) {
      setData(loja);
      if (loja.vendedores.length > 0) {
        setVendedorAtivo(loja.vendedores[0]);
      }
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
        Carregando Plataforma LyonsGo...
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Barra de Demonstração do Mini SaaS no Topo */}
      <div className="w-full bg-zinc-900 border-b border-zinc-800 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs gap-3 sticky top-0 z-40 backdrop-blur-md bg-zinc-900/90">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-amber-400">LyonsGo SaaS</span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-400">Demonstração de Nichos:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {Object.values(db).map((l) => (
              <button
                key={l.slug}
                onClick={() => handleTrocaEmpresa(l.slug)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  slugAtivo === l.slug
                    ? "bg-amber-500 text-black shadow-sm"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {l.nomeLoja.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setManualAberto(true)}
            className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500 hover:text-black font-semibold transition-all flex items-center gap-1 text-[11px]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Como Usar & Potencial
          </button>
          <Link
            href="/admin"
            className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors flex items-center gap-1 text-[11px]"
          >
            <Settings className="w-3.5 h-3.5" />
            Painel Admin
          </Link>
        </div>
      </div>

      <MinisiteView
        data={data}
        vendedorAtivo={vendedorAtivo}
        onMudarVendedor={(v) => setVendedorAtivo(v)}
        mostrarBarraAdmin={true}
      />

      <ManualSaasModal aberto={manualAberto} onFechar={() => setManualAberto(false)} />
    </div>
  );
}

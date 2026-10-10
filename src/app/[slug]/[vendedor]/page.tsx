"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MinisiteView from "../../../components/MinisiteView";
import { getLojaPorSlug } from "../../../lib/store";
import { MinisiteData, Vendedor } from "../../../lib/types";
import { ArrowLeft, Plus } from "lucide-react";

export default function MinisiteVendedorPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const vendedorParam = (params?.vendedor as string) || "";

  const [data, setData] = useState<MinisiteData | null>(null);
  const [vendedorAtivo, setVendedorAtivo] = useState<Vendedor | undefined>(undefined);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (slug) {
      const loaded = getLojaPorSlug(slug);
      setData(loaded);

      if (loaded && vendedorParam && loaded.vendedores.length > 0) {
        const match = loaded.vendedores.find(
          (v) =>
            v.id.toLowerCase() === vendedorParam.toLowerCase() ||
            v.codigo.toLowerCase().replace(/[^a-z0-9]/g, "") ===
              vendedorParam.toLowerCase().replace(/[^a-z0-9]/g, "")
        );
        setVendedorAtivo(match || loaded.vendedores[0]);
      } else if (loaded && loaded.vendedores.length > 0) {
        setVendedorAtivo(loaded.vendedores[0]);
      }
      setCarregando(false);
    }
  }, [slug, vendedorParam]);

  if (carregando) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
        Carregando Minisite do Consultor...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 font-bold text-xl mb-4">
          ?
        </div>
        <h1 className="text-xl font-bold tracking-tight mb-1">Empresa Não Encontrada</h1>
        <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">
          Nenhuma empresa foi cadastrada no endereço <code className="text-amber-400 font-mono">/{slug}</code>.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Criar Minisite no Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MinisiteView
      data={data}
      vendedorAtivo={vendedorAtivo}
      onMudarVendedor={(v) => setVendedorAtivo(v)}
      mostrarBarraAdmin={true}
    />
  );
}

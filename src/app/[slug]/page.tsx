"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MinisiteView from "../../components/MinisiteView";
import { getMinisiteData } from "../../lib/store";
import { MinisiteData, Vendedor } from "../../lib/types";

export default function MinisiteSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [data, setData] = useState<MinisiteData | null>(null);
  const [vendedorAtivo, setVendedorAtivo] = useState<Vendedor | undefined>(undefined);

  useEffect(() => {
    const loaded = getMinisiteData();
    // Se o slug bater ou for o default
    setData(loaded);
    if (loaded.vendedores.length > 0) {
      setVendedorAtivo(loaded.vendedores[0]);
    }
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
        Carregando Minisite...
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

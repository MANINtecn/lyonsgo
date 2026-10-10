"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MinisiteView from "../../../components/MinisiteView";
import { getMinisiteData } from "../../../lib/store";
import { MinisiteData, Vendedor } from "../../../lib/types";

export default function MinisiteVendedorPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const vendedorParam = params?.vendedor as string;

  const [data, setData] = useState<MinisiteData | null>(null);
  const [vendedorAtivo, setVendedorAtivo] = useState<Vendedor | undefined>(undefined);

  useEffect(() => {
    const loaded = getMinisiteData();
    setData(loaded);

    if (vendedorParam && loaded.vendedores.length > 0) {
      const match = loaded.vendedores.find(
        (v) =>
          v.id.toLowerCase() === vendedorParam.toLowerCase() ||
          v.codigo.toLowerCase().replace(/[^a-z0-9]/g, "") ===
            vendedorParam.toLowerCase().replace(/[^a-z0-9]/g, "")
      );
      setVendedorAtivo(match || loaded.vendedores[0]);
    } else {
      setVendedorAtivo(loaded.vendedores[0]);
    }
  }, [slug, vendedorParam]);

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
        Carregando Minisite do Consultor...
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

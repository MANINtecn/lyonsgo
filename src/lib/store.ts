import { MinisiteData, TemaConfig, SaasDatabase, Vendedor, ItemCatalogo } from "./types";

export const TEMAS: TemaConfig[] = [
  {
    id: "dark",
    nome: "Dark Luxury",
    bg: "bg-zinc-950 text-zinc-100",
    card: "bg-zinc-900/90 border-zinc-800 text-zinc-100",
    accent: "from-amber-400 to-amber-600 text-black",
    highlight: "text-amber-400"
  },
  {
    id: "cyber",
    nome: "Cyber Glow",
    bg: "bg-slate-950 text-slate-100",
    card: "bg-slate-900/90 border-cyan-800/50 text-slate-100",
    accent: "from-cyan-400 to-blue-600 text-white",
    highlight: "text-cyan-400"
  },
  {
    id: "light",
    nome: "Minimal Pure",
    bg: "bg-stone-50 text-stone-900",
    card: "bg-white border-stone-200 text-stone-900 shadow-sm",
    accent: "from-zinc-900 to-black text-white",
    highlight: "text-zinc-950"
  }
];

export const SAAS_DEFAULT_DATABASE: SaasDatabase = {
  "elite-motors": {
    slug: "elite-motors",
    nomeLoja: "Elite Motors Concessionária",
    ramoAtividade: "Concessionária de Veículos & Seminovos",
    planoAtivo: "Pro Multi-Vendedores",
    slogan: "Veículos Exclusivos & Seminovos Selecionados",
    descricao: "Referência em atendimento premium, taxa especial e avaliação transparente do seu usado.",
    avatarLoja: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80",
    bannerLoja: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    chavePix: "contato@elitemotors.com.br",
    endereco: "Av. Europa, 1200 - Jardins, São Paulo - SP",
    horario: "Segunda a Sábado das 08h às 19h",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    temaId: "dark",
    whatsappPadrao: "5511999990000",
    criadoEm: "2026-10-01",
    vendedores: [
      {
        id: "carlos",
        codigo: "#VEND-001",
        nome: "Carlos Silva",
        cargo: "Consultor Sênior",
        whatsapp: "5511999991111",
        foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        badge: "Top Vendas",
        ativo: true,
        totalCliquesWhatsapp: 42,
        totalVisitas: 128
      },
      {
        id: "mariana",
        codigo: "#VEND-002",
        nome: "Mariana Costa",
        cargo: "Especialista em Financiamentos",
        whatsapp: "5511999992222",
        foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
        badge: "Atendimento Rápido",
        ativo: true,
        totalCliquesWhatsapp: 35,
        totalVisitas: 94
      },
      {
        id: "roberto",
        codigo: "#VEND-003",
        nome: "Roberto Mendes",
        cargo: "Avaliador & Seminovos",
        whatsapp: "5511999993333",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        badge: "Melhor Avaliação",
        ativo: true,
        totalCliquesWhatsapp: 29,
        totalVisitas: 83
      }
    ],
    catalogo: [
      {
        id: "PROD-01",
        titulo: "BMW 320i M Sport 2024",
        descricao: "Teto solar, interior cognac, 12.000 km, garantia de fábrica ativa.",
        preco: "R$ 315.000",
        tag: "Destaque da Semana",
        imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
        destaque: true
      },
      {
        id: "PROD-02",
        titulo: "Porsche Macan GTS 2023",
        descricao: "Único dono, escapamento esportivo original, revisões na concessionária.",
        preco: "R$ 589.000",
        tag: "Oportunidade",
        imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
        destaque: true
      }
    ]
  },
  "imobiliaria-prime": {
    slug: "imobiliaria-prime",
    nomeLoja: "Prime Imóveis & Coberturas",
    ramoAtividade: "Imobiliária & Lançamentos de Luxo",
    planoAtivo: "Plano Franquia Imobiliária",
    slogan: "Os melhores imóveis e coberturas nos melhores bairros",
    descricao: "Assessoria imobiliária personalizada para compra, venda e investimentos de alta rentabilidade.",
    avatarLoja: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80",
    bannerLoja: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    chavePix: "financeiro@primeimoveis.com.br",
    endereco: "Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi, São Paulo - SP",
    horario: "Segunda a Sexta das 09h às 19h | Sábado até 14h",
    instagramUrl: "https://instagram.com",
    temaId: "cyber",
    whatsappPadrao: "5511988880000",
    criadoEm: "2026-10-05",
    vendedores: [
      {
        id: "lucas-corretor",
        codigo: "#CORR-101",
        nome: "Lucas Andrade",
        cargo: "Corretor CRECI 184.230-F",
        whatsapp: "5511988881111",
        foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        badge: "Especialista Jardins",
        ativo: true,
        totalCliquesWhatsapp: 38,
        totalVisitas: 110
      },
      {
        id: "juliana-imoveis",
        codigo: "#CORR-102",
        nome: "Juliana Ferreira",
        cargo: "Corretora de Lançamentos & Luxo",
        whatsapp: "5511988882222",
        foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        badge: "Coberturas & Alto Padrão",
        ativo: true,
        totalCliquesWhatsapp: 45,
        totalVisitas: 130
      }
    ],
    catalogo: [
      {
        id: "IMO-01",
        titulo: "Cobertura Duplex no Itaim Bibi",
        descricao: "4 suítes, 5 vagas, piscina privativa aquecida e vista panorâmica.",
        preco: "R$ 8.900.000",
        tag: "Exclusividade",
        imagem: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        destaque: true
      },
      {
        id: "IMO-02",
        titulo: "Apartamento Garden nos Jardins",
        descricao: "3 suítes, amplo terraço arborizado, acabamento em mármore travertino.",
        preco: "R$ 4.650.000",
        tag: "Pronto para Morar",
        imagem: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        destaque: true
      }
    ]
  },
  "estetica-glow": {
    slug: "estetica-glow",
    nomeLoja: "Glow Clínica & Estética Avançada",
    ramoAtividade: "Clínica de Estética & Harmonização",
    planoAtivo: "Plano Pro",
    slogan: "Sua beleza natural realçada com tecnologia e carinho",
    descricao: "Protocolos faciais e corporais exclusivos, dermatologia estética e rejuvenescimento.",
    avatarLoja: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80",
    bannerLoja: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    chavePix: "pix@glowestetica.com.br",
    endereco: "Alameda dos Maracatins, 900 - Moema, São Paulo - SP",
    horario: "Segunda a Sábado das 09h às 20h",
    instagramUrl: "https://instagram.com",
    temaId: "light",
    whatsappPadrao: "5511977770000",
    criadoEm: "2026-10-08",
    vendedores: [
      {
        id: "dra-amanda",
        codigo: "#EST-01",
        nome: "Dra. Amanda Nogueira",
        cargo: "Biomédica Esteta",
        whatsapp: "5511977771111",
        foto: "https://images.unsplash.com/photo-1594824813572-c2e50587d605?auto=format&fit=crop&w=200&q=80",
        badge: "Harmonização Facial",
        ativo: true,
        totalCliquesWhatsapp: 64,
        totalVisitas: 175
      },
      {
        id: "beatriz-terapeuta",
        codigo: "#EST-02",
        nome: "Beatriz Ribeiro",
        cargo: "Especialista em Protocolos Corporais",
        whatsapp: "5511977772222",
        foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        badge: "Drenagem & Laser",
        ativo: true,
        totalCliquesWhatsapp: 51,
        totalVisitas: 140
      }
    ],
    catalogo: [
      {
        id: "EST-01",
        titulo: "Protocolo Glow Face Harmonização",
        descricao: "Bioestimulador de colágeno + peeling de diamante + hidratação profunda.",
        preco: "R$ 1.890",
        tag: "Mais Procurado",
        imagem: "https://images.unsplash.com/photo-1512290900672-1f486a0189a0?auto=format&fit=crop&w=600&q=80",
        destaque: true
      },
      {
        id: "EST-02",
        titulo: "Pacote Redux Body Laser (10 sessões)",
        descricao: "Criolipólise de placas associada a drenagem linfática método exclusivo.",
        preco: "R$ 2.450",
        tag: "Pacote Especial",
        imagem: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        destaque: true
      }
    ]
  }
};

const SAAS_STORAGE_KEY = "lyonsgo_saas_tenants_db";

export function getSaasDatabase(): SaasDatabase {
  if (typeof window === "undefined") {
    return SAAS_DEFAULT_DATABASE;
  }
  try {
    const raw = localStorage.getItem(SAAS_STORAGE_KEY);
    if (!raw) return SAAS_DEFAULT_DATABASE;
    const parsed = JSON.parse(raw);
    // Assegura fallback para lojas padrão caso ainda não existam no localStorage
    return { ...SAAS_DEFAULT_DATABASE, ...parsed };
  } catch {
    return SAAS_DEFAULT_DATABASE;
  }
}

export function saveSaasDatabase(db: SaasDatabase): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SAAS_STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error("Erro ao salvar SaasDatabase no LocalStorage", e);
  }
}

export function getLojaPorSlug(slug: string): MinisiteData | null {
  const db = getSaasDatabase();
  const normalized = slug.toLowerCase().trim();
  if (db[normalized]) return db[normalized];

  // Busca aproximada caso haja diferença de hífen ou case
  const key = Object.keys(db).find((k) => k.toLowerCase() === normalized);
  if (key) return db[key];

  return null;
}

export function salvarLoja(loja: MinisiteData): void {
  const db = getSaasDatabase();
  const slugKey = loja.slug.toLowerCase().trim();
  db[slugKey] = loja;
  saveSaasDatabase(db);
}

export function criarNovaLoja(dados: Partial<MinisiteData>): MinisiteData {
  const db = getSaasDatabase();
  const slug = (
    dados.slug ||
    (dados.nomeLoja || "nova-loja")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
  )
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const novaLoja: MinisiteData = {
    slug: slug || `loja-${Date.now()}`,
    nomeLoja: dados.nomeLoja || "Minha Nova Empresa",
    ramoAtividade: dados.ramoAtividade || "Comércio & Serviços",
    planoAtivo: dados.planoAtivo || "Plano Pro",
    slogan: dados.slogan || "Atendimento rápido e produtos de alta qualidade",
    descricao: dados.descricao || "Bem-vindo ao nosso canal oficial de atendimento e catálogo digital.",
    avatarLoja: dados.avatarLoja || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80",
    bannerLoja: dados.bannerLoja || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    chavePix: dados.chavePix || "contato@suaempresa.com.br",
    endereco: dados.endereco || "Centro Comercial - Sala 101",
    horario: dados.horario || "Segunda a Sexta das 08h às 18h",
    temaId: dados.temaId || "dark",
    whatsappPadrao: dados.whatsappPadrao || "5511999990000",
    criadoEm: new Date().toISOString().split("T")[0],
    vendedores: dados.vendedores || [
      {
        id: "atendimento",
        codigo: "#VEND-001",
        nome: "Consultor de Vendas",
        cargo: "Especialista em Atendimento",
        whatsapp: dados.whatsappPadrao || "5511999990000",
        foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        badge: "Atendimento",
        ativo: true,
        totalCliquesWhatsapp: 0,
        totalVisitas: 0
      }
    ],
    catalogo: dados.catalogo || []
  };

  db[novaLoja.slug] = novaLoja;
  saveSaasDatabase(db);
  return novaLoja;
}

export function excluirLoja(slug: string): void {
  const db = getSaasDatabase();
  delete db[slug.toLowerCase().trim()];
  saveSaasDatabase(db);
}

export function registrarCliqueWhatsapp(slug: string, vendedorId?: string): void {
  if (typeof window === "undefined") return;
  try {
    const loja = getLojaPorSlug(slug);
    if (!loja) return;

    const updated = {
      ...loja,
      vendedores: loja.vendedores.map((v) =>
        v.id === vendedorId
          ? { ...v, totalCliquesWhatsapp: (v.totalCliquesWhatsapp || 0) + 1 }
          : v
      )
    };
    salvarLoja(updated);
  } catch (e) {
    console.error("Erro ao registrar clique", e);
  }
}

export function registrarVisita(slug: string, vendedorId?: string): void {
  if (typeof window === "undefined") return;
  try {
    const loja = getLojaPorSlug(slug);
    if (!loja) return;

    const updated = {
      ...loja,
      vendedores: loja.vendedores.map((v) =>
        v.id === vendedorId
          ? { ...v, totalVisitas: (v.totalVisitas || 0) + 1 }
          : v
      )
    };
    salvarLoja(updated);
  } catch (e) {
    console.error("Erro ao registrar visita", e);
  }
}

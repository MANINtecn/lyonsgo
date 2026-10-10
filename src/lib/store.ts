import { MinisiteData, TemaConfig, Vendedor, ItemCatalogo } from "./types";

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

export const MINISITE_DEFAULT: MinisiteData = {
  slug: "elite-motors",
  nomeLoja: "Elite Motors Concessionária",
  slogan: "Veículos Exclusivos & Seminovos Selecionados",
  descricao: "Referência em atendimento premium, taxa especial e avaliação transparente do seu usado.",
  avatarLoja: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80",
  bannerLoja: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  chavePix: "contato@lyonsgo.com.br",
  endereco: "Av. Europa, 1200 - Jardins, São Paulo - SP",
  horario: "Segunda a Sábado das 08h às 19h",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  temaId: "dark",
  whatsappPadrao: "5511999990000",
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
      descricao: "Único dono, escapamento esportivo original, todas as revisões na concessionária.",
      preco: "R$ 589.000",
      tag: "Oportunidade",
      imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
      destaque: true
    },
    {
      id: "PROD-03",
      titulo: "Mercedes-Benz C300 AMG 2024",
      descricao: "Pacote Night, som Burmester 3D, cockpit digital widescreen.",
      preco: "R$ 410.000",
      tag: "Novidade",
      imagem: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80",
      destaque: false
    }
  ]
};

const STORAGE_KEY = "lyonsgo_minisite_data";

export function getMinisiteData(): MinisiteData {
  if (typeof window === "undefined") {
    return MINISITE_DEFAULT;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return MINISITE_DEFAULT;
    return JSON.parse(raw);
  } catch {
    return MINISITE_DEFAULT;
  }
}

export function saveMinisiteData(data: MinisiteData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Erro ao salvar dados no LocalStorage", e);
  }
}

export function registrarCliqueWhatsapp(vendedorId?: string): void {
  if (typeof window === "undefined" || !vendedorId) return;
  try {
    const data = getMinisiteData();
    const updated = {
      ...data,
      vendedores: data.vendedores.map((v) =>
        v.id === vendedorId
          ? { ...v, totalCliquesWhatsapp: (v.totalCliquesWhatsapp || 0) + 1 }
          : v
      )
    };
    saveMinisiteData(updated);
  } catch (e) {
    console.error("Erro ao registrar métrica", e);
  }
}

export function registrarVisita(vendedorId?: string): void {
  if (typeof window === "undefined" || !vendedorId) return;
  try {
    const data = getMinisiteData();
    const updated = {
      ...data,
      vendedores: data.vendedores.map((v) =>
        v.id === vendedorId
          ? { ...v, totalVisitas: (v.totalVisitas || 0) + 1 }
          : v
      )
    };
    saveMinisiteData(updated);
  } catch (e) {
    console.error("Erro ao registrar visita", e);
  }
}

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
  "loja-modelo": {
    slug: "loja-modelo",
    nomeLoja: "Minha Loja",
    ramoAtividade: "Comércio & Serviços",
    planoAtivo: "Plano Profissional",
    slogan: "Atendimento Especializado & Produtos Exclusivos",
    descricao: "Conheça nossas soluções, fale diretamente com nossa equipe no WhatsApp ou faça seu pedido com facilidade.",
    avatarLoja: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=300&q=80",
    bannerLoja: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    chavePix: "contato@sualoja.com.br",
    endereco: "Av. Central, 1000 - Centro",
    horario: "Segunda a Sábado das 09h às 19h",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    temaId: "dark",
    whatsappPadrao: "5511999990000",
    criadoEm: "2026-10-01",
    vendedores: [
      {
        id: "vendedor-01",
        codigo: "#VEND-01",
        nome: "Consultor de Vendas",
        cargo: "Atendimento Comercial",
        whatsapp: "5511999990000",
        foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        badge: "Vendas",
        ativo: true,
        totalCliquesWhatsapp: 0,
        totalVisitas: 0
      }
    ],
    catalogo: [
      {
        id: "ITEM-01",
        titulo: "Produto ou Serviço em Destaque",
        descricao: "Descrição detalhada do seu produto ou serviço principal.",
        preco: "R$ 199,90",
        tag: "Destaque",
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
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

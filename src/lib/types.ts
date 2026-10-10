export interface Vendedor {
  id: string; // Ex: 'carlos', 'mariana'
  codigo: string; // Ex: '#VEND-001'
  nome: string;
  cargo: string;
  whatsapp: string; // Ex: '5511999991111'
  foto: string;
  badge?: string;
  ativo: boolean;
  totalCliquesWhatsapp?: number;
  totalVisitas?: number;
}

export interface ItemCatalogo {
  id: string;
  titulo: string;
  descricao: string;
  preco: string;
  tag?: string;
  imagem: string;
  destaque?: boolean;
}

export interface MinisiteData {
  slug: string; // Ex: 'elite-motors'
  nomeLoja: string;
  slogan: string;
  descricao: string;
  avatarLoja: string;
  bannerLoja?: string;
  chavePix: string;
  endereco: string;
  horario: string;
  instagramUrl?: string;
  facebookUrl?: string;
  temaId: 'dark' | 'cyber' | 'light';
  whatsappPadrao?: string;
  vendedores: Vendedor[];
  catalogo: ItemCatalogo[];
}

export interface TemaConfig {
  id: 'dark' | 'cyber' | 'light';
  nome: string;
  bg: string;
  card: string;
  accent: string;
  highlight: string;
}

# 🦁 LYONSGO - DIÁRIO DE BORDO & MEMÓRIA DO PROJETO
> **Arquivo Central de Conhecimento Técnico, Decisões de Arquitetura, Modelos & Roadmap**  
> **Domínio Oficial**: `lyonsgo.com.br`  
> **Finalidade**: Plataforma de Minisites de Alta Conversão, Bio Links Profissionais e Rastreamento de Vendas por Afiliados/Vendedores  
> **Regra Primária**: Em caso de qualquer dúvida, incerteza ou reinício de sessão, **LEIA ESTE DIÁRIO PRIMEIRO**.

---

## 🧭 REGRAS FUNDAMENTAIS DO DIÁRIO (LEI OPERACIONAL)

1. **LEITURA OBRIGATÓRIA NO INÍCIO DE CADA SESSÃO**:
   - Toda IA ou desenvolvedor deve obrigatoriamente ler o `lyonsgo.md` antes de propor ou executar qualquer alteração.
2. **REGISTRO ANTES DE PERDER O CONTEXTO**:
   - Sempre que uma funcionalidade for modificada, testada ou concluída, registre o status e detalhes técnicos neste diário.
3. **NUNCA ERRAR DUAS VEZES**:
   - Erros descobertos devem ser catalogados na seção de *Lições Aprendidas & Armadilhas Evitadas*.
4. **FIDELIDADE AOS REQUISITOS DO CLIENTE (PÉRCIO / LYONSGO)**:
   - Foco absoluto na conversão: visual impecável no mobile (carregamento instantâneo), links na bio atraentes e fluxo de amarra de vendas com afiliados/vendedores.
5. **ISOLAMENTO COMPLETO DE REPOSITÓRIO**:
   - Este projeto possui seu próprio repositório Git e pasta separada (`lyonsgo/`), não devendo conflitar nem misturar dependências com o ShopyGo.

---

## 🏗️ ARQUITETURA & STACK DO SISTEMA

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4 + Lucide React
- **Paradigma**: Mobile-first, Ultra-fast SPA & SSR, Bento Grid Layouts
- **Banco de Dados**: Firestore / Supabase (Estrutura multitenant pronta para conectar)
- **Rastreamento**: Parâmetros de URL, UTMs internas e Tags de identificação de afiliado nas mensagens disparadas para WhatsApp
- **Geração de QR Codes**: SVG/Canvas dinâmico com link direto para cada vendedor/afiliado

---

## 🎯 PROPÓSITO & CASOS DE USO PRINCIPAIS

### 1. Minisites de Alta Conversão (Bio Links)
- Substitui ferramentas como Linktree com experiência ultra-customizável e marca própria.
- Suporte a múltiplos blocos:
  - Header de perfil (Foto/Logo, Selo verificado, Nome, Bio, Redes Sociais).
  - Botões de links principais (com ícones, destaques visuais pulsantes e badge de novidade).
  - Mini-catálogo / Vitrine rápida de produtos em carrossel ou grade com preços.
  - Bloco de contato direto / Chamar no WhatsApp com mensagem pré-preenchida.
  - Bloco de localização com mapa e rota (Google Maps / Waze).
  - Bloco de chave PIX / Pagamento rápido com botão de copiar chave.
  - Player de vídeo / Apresentação (YouTube / Vimeo / Reels embed).
  - Bloco de horários de atendimento com status "Aberto Agora" dinâmico.

### 2. Amarra de Vendas por Vendedor / Afiliado (Requisito Vital do Cliente)
- **Cenário**: Loja com 5 vendedores (ex: Concessionária de carros, imobiliária, ótica, loja de roupas).
- Todos compartilham o mesmo acervo/catálogo da loja, porém:
  - Cada vendedor possui sua URL própria (ex: `lyonsgo.com.br/loja-exemplo/carlos` ou `lyonsgo.com.br/carlos`).
  - O botão de WhatsApp no minisite do Carlos direciona para o número do Carlos.
  - Ao clicar em um produto ou solicitar cotação, a mensagem enviada ao WhatsApp leva o identificador único do Carlos (`[Vendedor: Carlos | ID: #VEND-004]`).
  - O painel administrativo registra métricas isoladas: quantos cliques e contatos cada vendedor gerou.

---

## 🗄️ MODELOS DE DADOS PREVISTOS

### 1. `minisites` (Perfil Principal da Empresa ou Profissional)
```typescript
interface Minisite {
  id: string;
  slug: string; // ex: 'loja-veiculos'
  titulo: string;
  subtitulo: string;
  descricao: string;
  avatar_url: string;
  banner_url?: string;
  tema_id: string; // 'dark-luxury' | 'modern-glass' | 'sunset' | etc.
  cor_primaria: string;
  cor_secundaria: string;
  whatsapp_padrao: string;
  instagram_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  youtube_url?: string;
  endereco?: string;
  maps_url?: string;
  chave_pix?: string;
  tipo_chave_pix?: 'cpf' | 'cnpj' | 'telefone' | 'email' | 'aleatoria';
  ativo: boolean;
  created_at: string;
}
```

### 2. `vendedores_afiliados` (Equipe & Parceiros)
```typescript
interface VendedorAfiliado {
  id: string;
  minisite_id: string;
  codigo_afiliado: string; // ex: 'carlos-auto'
  nome: string;
  cargo: string; // ex: 'Consultor de Vendas'
  whatsapp: string; // ex: '5511999999999'
  email?: string;
  foto_url?: string;
  bio_personalizada?: string;
  ativo: boolean;
  total_visitas: number;
  total_cliques_whatsapp: number;
}
```

### 3. `minisite_blocos` (Conteúdos e Links Configuráveis)
```typescript
interface MinisiteBloco {
  id: string;
  minisite_id: string;
  tipo: 'link' | 'produto_destaque' | 'carrossel' | 'pix' | 'video' | 'mapa' | 'faq';
  titulo: string;
  subtitulo?: string;
  url?: string;
  icone?: string; // nome do icone Lucide
  imagem_url?: string;
  preco?: number;
  destaque: boolean; // efeito pulsante ou borda chamativa
  ordem: number;
  ativo: boolean;
}
```

### 4. `metricas_acessos` (Analytics Interno)
```typescript
interface MetricaAcesso {
  id: string;
  minisite_id: string;
  vendedor_id?: string;
  tipo_evento: 'pageview' | 'clique_link' | 'clique_whatsapp' | 'clique_pix';
  item_id?: string;
  timestamp: string;
  ip_hash?: string;
  dispositivo: 'mobile' | 'desktop';
}
```

---

## 🎨 PALETA DE TEMAS VISUAIS PLANEJADOS

1. **Dark Luxury (Padrão)**: Fundo escuro aveludado (`#09090b`), detalhes em dourado metálico / âmbar (`#f59e0b`), cartões em glassmorphism translúcidos com bordas sutis.
2. **Neon Cyber**: Fundo preto profundo, gradientes em ciano e fúcsia elétrico, efeito glow nos botões em hover.
3. **Clean Modernist**: Fundo off-white minimalista, tipografia bold elegante, botões preto sólido com cantos arredondados (estilo Apple).
4. **Sunset Glow**: Gradiente acolhedor violeta/laranja, cartões brancos com sombras suaves, ideal para criadores e gastronomia.
5. **Corporate Navy**: Azul marinho corporativo, prata e branco, transmite máxima solidez para imobiliárias, advogados e concessionárias.

---

## ⚠️ LIÇÕES APRENDIDAS & ARMADILHAS EVITADAS

1. **Evitar Mistura de Repositórios Git**:
   - `lyonsgo/` possui seu próprio `.git` e foi devidamente adicionado ao `.gitignore` do repositório pai (ShopyGo), prevenindo submódulos indesejados ou commits cruzados.
2. **Link do WhatsApp sem Quebras**:
   - O número de telefone deve ser higienizado removendo caracteres não numéricos (`\D`), garantindo o prefixo `55` do Brasil antes de disparar para `wa.me/55...`.
3. **Identificação Transparente no WhatsApp**:
   - A mensagem pré-configurada deve deixar claro para o cliente que ele está falando com o vendedor específico, gerando confiança e facilitando a comissão interna.

---

## 📋 ROADMAP DE IMPLEMENTAÇÃO

### Fase 1: Fundação & Protótipo Funcional (EM ANDAMENTO)
- [X] Criar estrutura do projeto Next.js com App Router, TypeScript e Tailwind CSS.
- [X] Configurar repositório Git isolado (`git init`).
- [X] Criar Diário de Bordo Oficial `lyonsgo.md`.
- [ ] Construir layout da página de Bio Link / Minisite moderna, fluida e responsiva com suporte a temas.
- [ ] Implementar seletor dinâmico de vendedor/afiliado com troca instantânea de contato e rastreamento.
- [ ] Implementar modal de QR Code dinâmico para compartilhamento rápido.
- [ ] Implementar bloco de cópia rápida de Chave PIX com feedback visual.

### Fase 2: Painel de Gerenciamento & Multitenancy
- [ ] Criação de rotas dinâmicas `/[slug]` e `/[slug]/[vendedor]`.
- [ ] Painel para o lojista/administrador cadastrar sua equipe e gerar os links de cada afiliado.
- [ ] Estatísticas de cliques e acessos por vendedor.

export interface Guia {
  id: string
  slug: string
  titulo: string
  subtitulo: string
  capa_url: string
  topicos: string[]
  ordem: number
  ativo: boolean
  created_at: string
}

export interface OfertaGuias {
  id: string
  titulo: string
  descricao: string
  /** Preço em reais. `null` oculta o bloco de preço. */
  preco: number | null
  /** Preço "de" (riscado). `null` oculta. */
  preco_original: number | null
  formato: string
  /**
   * Link do checkout (Hotmart, Kiwify, Eduzz, Mercado Pago…).
   * Enquanto for `null`, o botão abre o WhatsApp do administrador.
   */
  checkout_url: string | null
  /** Nome da plataforma de pagamento exibido abaixo do botão. */
  plataforma: string | null
  /** Cupom já embutido no link de checkout. `null` oculta o aviso. */
  cupom: string | null
  ativo: boolean
}

/**
 * Dados locais (Versão 1). Contrato compatível com as tabelas
 * `public.guias` e `public.ofertas_guias` no Supabase.
 */
export const GUIAS_DATA: Guia[] = [
  {
    id: 'g1000000-0001-4000-8000-000000000001',
    slug: 'guia-completo-do-ring-neck',
    titulo: 'Guia Completo do Ring Neck',
    subtitulo: 'Do primeiro dia a uma vida longa e saudável',
    capa_url: '/images/guias/guia-completo.jpg',
    topicos: ['Alimentação', 'Recinto', 'Rotina', 'Higiene', 'Saúde', 'Primeiros socorros'],
    ordem: 1,
    ativo: true,
    created_at: '2026-11-21T12:00:00Z'
  },
  {
    id: 'g1000000-0002-4000-8000-000000000002',
    slug: 'guia-de-alimentacao-do-ring-neck',
    titulo: 'Guia de Alimentação do Ring Neck',
    subtitulo: 'O que ele pode e não pode comer',
    capa_url: '/images/guias/guia-alimentacao.jpg',
    topicos: ['Frutas', 'Verduras', 'Grãos', 'Ervas', 'Proibidos', 'Cardápio', 'Receitas'],
    ordem: 2,
    ativo: true,
    created_at: '2026-11-21T12:00:00Z'
  },
  {
    id: 'g1000000-0003-4000-8000-000000000003',
    slug: 'como-ensinar-seu-ring-neck-a-falar',
    titulo: 'Como Ensinar seu Ring Neck a Falar',
    subtitulo: 'O método passo a passo, com carinho',
    capa_url: '/images/guias/guia-fala.jpg',
    topicos: ['Sessões', 'Primeiras palavras', 'Plano de 4 semanas', 'Erros', 'FAQ'],
    ordem: 3,
    ativo: true,
    created_at: '2026-11-21T16:59:00Z'
  }
]

export const OFERTA_GUIAS_DATA: OfertaGuias = {
  id: 'o1000000-0001-4000-8000-000000000001',
  titulo: 'Pacote 3 Guias do Ring Neck',
  descricao: 'Cuidados + Alimentação + Fala',
  preco: null, // ex.: 47.9
  preco_original: null, // ex.: 79.8
  formato: 'E-book digital',
  checkout_url: 'https://pay.kiwify.com.br/xxvGjkl?coupon=LANCAMENTO',
  plataforma: 'Kiwify',
  cupom: 'LANCAMENTO',
  ativo: true
}

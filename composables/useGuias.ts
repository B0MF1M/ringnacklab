import { computed } from 'vue'
import { GUIAS_DATA, OFERTA_GUIAS_DATA, type Guia, type OfertaGuias } from '~/data/guias'

/**
 * Camada de serviço dos guias (e-books).
 *
 * MIGRAÇÃO SUPABASE (Fase 2):
 * - `guias`:         .select('*').eq('ativo', true).order('ordem')
 * - `ofertas_guias`: .select('*').eq('ativo', true).single()
 */
export const useGuias = () => {
  const config = useRuntimeConfig()
  const rawGuias = useState<Guia[]>('guias-source', () => GUIAS_DATA)
  const oferta = useState<OfertaGuias>('oferta-guias-source', () => OFERTA_GUIAS_DATA)

  const guiasAtivos = computed<Guia[]>(() =>
    rawGuias.value.filter((g) => g.ativo).sort((a, b) => a.ordem - b.ordem)
  )

  const formatarPreco = (valor: number | null): string =>
    valor === null
      ? ''
      : valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const precoFormatado = computed(() => formatarPreco(oferta.value.preco))
  const precoOriginalFormatado = computed(() => formatarPreco(oferta.value.preco_original))

  const temCheckout = computed(() => Boolean(oferta.value.checkout_url))

  /** Checkout quando houver; senão, WhatsApp do administrador com mensagem pronta. */
  const linkCompra = computed<string>(() => {
    if (oferta.value.checkout_url) return oferta.value.checkout_url
    const fone = String(config.public.adminWhatsapp || '').replace(/\D/g, '')
    const mensagem = `Olá! Vi no site do RingnackLab e quero comprar ${oferta.value.titulo} (${oferta.value.descricao}).`
    return `https://wa.me/${fone}?text=${encodeURIComponent(mensagem)}`
  })

  return {
    guiasAtivos,
    oferta,
    precoFormatado,
    precoOriginalFormatado,
    temCheckout,
    linkCompra
  }
}

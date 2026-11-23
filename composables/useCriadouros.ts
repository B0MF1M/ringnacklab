import { computed, ref } from 'vue'
import {
  CRIADOUROS_DATA,
  ESTADOS_BRASIL,
  type Criadouro,
  type EstadoOption
} from '~/data/criadouros'

export interface EstadoFiltroItem extends EstadoOption {
  totalParceiros: number
}

/**
 * Camada de serviço desacoplada para Criadouros Parceiros.
 *
 * MIGRAÇÃO SUPABASE (Fase 2):
 * Substituir a leitura de `CRIADOUROS_DATA` por:
 * const { data, error } = await supabase
 *   .from('criadouros')
 *   .select('id, nome, slug, logo_url, registro_legal, cidade, estado_uf, endereco, regiao_atendimento, telefone_whatsapp, ativo, destaque, created_at')
 *   .eq('ativo', true)
 *   .order('destaque', { ascending: false })
 */
export const useCriadouros = () => {
  const config = useRuntimeConfig()
  const rawCriadouros = useState<Criadouro[]>('criadouros-source', () => CRIADOUROS_DATA)

  const selectedUf = useState<string>('filter-uf', () => '')
  const searchQuery = useState<string>('filter-query', () => '')

  const criadourosAtivos = computed<Criadouro[]>(() => {
    return rawCriadouros.value
      .filter((item) => item.ativo === true)
      .sort((a, b) => Number(b.destaque) - Number(a.destaque))
  })

  const normalizeText = (value: string): string => {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
  }

  const criadourosFiltrados = computed<Criadouro[]>(() => {
    const uf = selectedUf.value.trim().toUpperCase()
    const query = normalizeText(searchQuery.value)

    return criadourosAtivos.value.filter((criadouro) => {
      const matchesUf = !uf || criadouro.estado_uf.toUpperCase() === uf
      if (!matchesUf) return false

      if (!query) return true

      const searchableText = normalizeText(
        `${criadouro.cidade} ${criadouro.nome} ${criadouro.regiao_atendimento} ${criadouro.estado_uf}`
      )
      return searchableText.includes(query)
    })
  })

  const estadosComContagem = computed<EstadoFiltroItem[]>(() => {
    const counts = criadourosAtivos.value.reduce<Record<string, number>>((acc, item) => {
      const uf = item.estado_uf.toUpperCase()
      acc[uf] = (acc[uf] || 0) + 1
      return acc
    }, {})

    return ESTADOS_BRASIL.map((estado) => ({
      ...estado,
      totalParceiros: counts[estado.uf] || 0
    })).sort((a, b) => {
      if (b.totalParceiros !== a.totalParceiros) {
        return b.totalParceiros - a.totalParceiros
      }
      return a.nome.localeCompare(b.nome, 'pt-BR')
    })
  })

  const ufsComParceiros = computed<string[]>(() => {
    return Array.from(new Set(criadourosAtivos.value.map((c) => c.estado_uf.toUpperCase())))
  })

  const temFiltrosAtivos = computed<boolean>(() => {
    return Boolean(selectedUf.value.trim() || searchQuery.value.trim())
  })

  const limparFiltros = (): void => {
    selectedUf.value = ''
    searchQuery.value = ''
  }

  const estadoSelecionadoNome = computed<string>(() => {
    const uf = selectedUf.value.trim().toUpperCase()
    return ESTADOS_BRASIL.find((estado) => estado.uf === uf)?.nome || ''
  })

  const formatarParceiroDesde = (createdAt: string): string => {
    const data = new Date(createdAt)
    if (Number.isNaN(data.getTime())) return ''
    const mes = data.toLocaleDateString('pt-BR', { month: 'short', timeZone: 'UTC' }).replace('.', '')
    return `${mes}/${data.getUTCFullYear()}`
  }

  const getIniciaisCriadouro = (nome: string): string => {
    const stopWords = new Set([
      'criadouro',
      'plantel',
      'aviario',
      'aviário',
      'de',
      'da',
      'do',
      'dos',
      'das',
      'e',
      'ring',
      'necks',
      'neck'
    ])

    const palavrasSignificativas = nome
      .split(/\s+/)
      .filter((word) => word.length > 1 && !stopWords.has(normalizeText(word)))

    if (palavrasSignificativas.length >= 2) {
      return (
        palavrasSignificativas[0].charAt(0) + palavrasSignificativas[1].charAt(0)
      ).toUpperCase()
    }

    const palavrasBrutas = nome.split(/\s+/).filter(Boolean)
    if (palavrasBrutas.length >= 2) {
      return (palavrasBrutas[0].charAt(0) + palavrasBrutas[1].charAt(0)).toUpperCase()
    }

    return nome.slice(0, 2).toUpperCase()
  }

  const formatarTelefone = (telefoneWhatsapp: string): string => {
    const digitos = telefoneWhatsapp.replace(/\D/g, '')
    const semDdi = digitos.startsWith('55') && digitos.length >= 12 ? digitos.slice(2) : digitos

    if (semDdi.length === 11) {
      const ddd = semDdi.slice(0, 2)
      const parte1 = semDdi.slice(2, 7)
      const parte2 = semDdi.slice(7)
      return `(${ddd}) ${parte1}-${parte2}`
    }

    if (semDdi.length === 10) {
      const ddd = semDdi.slice(0, 2)
      const parte1 = semDdi.slice(2, 6)
      const parte2 = semDdi.slice(6)
      return `(${ddd}) ${parte1}-${parte2}`
    }

    return telefoneWhatsapp
  }

  const gerarLinkWhatsappCriadouro = (criadouro: Criadouro): string => {
    const fone = criadouro.telefone_whatsapp.replace(/\D/g, '')
    const mensagem = `Olá! Vi o ${criadouro.nome} no site do RingnackLab e sou da região de ${criadouro.cidade}/${criadouro.estado_uf}. Gostaria de saber mais sobre disponibilidade e valores.`
    return `https://wa.me/${fone}?text=${encodeURIComponent(mensagem)}`
  }

  const gerarLinkSugestaoWhatsapp = (ufPersonalizada?: string): string => {
    const adminFone = String(config.public.adminWhatsapp || '5571983477467').replace(/\D/g, '')
    const ufFinal = (ufPersonalizada ?? selectedUf.value).trim().toUpperCase()
    const nomeEstado = ESTADOS_BRASIL.find((e) => e.uf === ufFinal)?.nome
    const regiaoBuscada = [
      searchQuery.value.trim(),
      nomeEstado ? `${nomeEstado} (${ufFinal})` : ufFinal
    ]
      .filter(Boolean)
      .join(' — ')
    const complementoRegiao = regiaoBuscada ? ` em ${regiaoBuscada}` : ' na minha região'
    const mensagem = `Olá, equipe RingnackLab! Sou de uma região${complementoRegiao} e gostaria de receber aviso quando homologarem um criadouro legalizado (ou pedir uma indicação).`
    return `https://wa.me/${adminFone}?text=${encodeURIComponent(mensagem)}`
  }

  const gerarLinkParceriaComercial = (): string => {
    const adminFone = String(config.public.adminWhatsapp || '5571983477467').replace(/\D/g, '')
    const mensagem =
      'Olá, equipe RingnackLab! Possuo um criadouro legalizado de Ring Neck e gostaria de conhecer as condições para ser um parceiro oficial no diretório.'
    return `https://wa.me/${adminFone}?text=${encodeURIComponent(mensagem)}`
  }

  return {
    selectedUf,
    searchQuery,
    criadourosAtivos,
    criadourosFiltrados,
    estadosComContagem,
    ufsComParceiros,
    temFiltrosAtivos,
    estadoSelecionadoNome,
    limparFiltros,
    formatarParceiroDesde,
    getIniciaisCriadouro,
    formatarTelefone,
    gerarLinkWhatsappCriadouro,
    gerarLinkSugestaoWhatsapp,
    gerarLinkParceriaComercial
  }
}

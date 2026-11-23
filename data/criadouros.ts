export interface Criadouro {
  id: string
  nome: string
  slug: string
  logo_url: string | null
  registro_legal: string
  cidade: string
  estado_uf: string
  endereco: string
  regiao_atendimento: string
  telefone_whatsapp: string
  ativo: boolean
  destaque: boolean
  created_at: string
}

export interface EstadoOption {
  uf: string
  nome: string
}

export const ESTADOS_BRASIL: EstadoOption[] = [
  { uf: 'AC', nome: 'Acre' },
  { uf: 'AL', nome: 'Alagoas' },
  { uf: 'AP', nome: 'Amapá' },
  { uf: 'AM', nome: 'Amazonas' },
  { uf: 'BA', nome: 'Bahia' },
  { uf: 'CE', nome: 'Ceará' },
  { uf: 'DF', nome: 'Distrito Federal' },
  { uf: 'ES', nome: 'Espírito Santo' },
  { uf: 'GO', nome: 'Goiás' },
  { uf: 'MA', nome: 'Maranhão' },
  { uf: 'MT', nome: 'Mato Grosso' },
  { uf: 'MS', nome: 'Mato Grosso do Sul' },
  { uf: 'MG', nome: 'Minas Gerais' },
  { uf: 'PA', nome: 'Pará' },
  { uf: 'PB', nome: 'Paraíba' },
  { uf: 'PR', nome: 'Paraná' },
  { uf: 'PE', nome: 'Pernambuco' },
  { uf: 'PI', nome: 'Piauí' },
  { uf: 'RJ', nome: 'Rio de Janeiro' },
  { uf: 'RN', nome: 'Rio Grande do Norte' },
  { uf: 'RS', nome: 'Rio Grande do Sul' },
  { uf: 'RO', nome: 'Rondônia' },
  { uf: 'RR', nome: 'Roraima' },
  { uf: 'SC', nome: 'Santa Catarina' },
  { uf: 'SP', nome: 'São Paulo' },
  { uf: 'SE', nome: 'Sergipe' },
  { uf: 'TO', nome: 'Tocantins' }
]

/**
 * Dados locais estruturados (Versão 1 - MVP).
 * Contrato idêntico à tabela `public.criadouros` no Supabase/PostgreSQL.
 *
 * Enquanto esta lista estiver vazia, o site exibe automaticamente o modo de
 * lançamento (destaque para o Pacote 3 Guias + credenciamento de parceiros fundadores).
 * Assim que você cadastrar o primeiro criadouro com `ativo: true`, a busca por
 * estado/cidade e os cards dos parceiros são ativados automaticamente.
 *
 * Exemplo de registro real:
 * {
 *   id: 'a1b2c3d4-0001-4000-8000-000000000001',
 *   nome: 'Criadouro Exemplo Legalizado',
 *   slug: 'criadouro-exemplo-legalizado',
 *   logo_url: '/logos/exemplo.png', // ou null para gerar iniciais automaticamente
 *   registro_legal: 'CTF/IBAMA 0000000 • Órgão Estadual',
 *   cidade: 'Atibaia',
 *   estado_uf: 'SP',
 *   endereco: 'Bairro / Referência pública',
 *   regiao_atendimento: 'São Paulo e envio homologado (GTA)',
 *   telefone_whatsapp: '5511999999999',
 *   ativo: true,
 *   destaque: true,
 *   created_at: '2026-11-23T12:00:00Z'
 * }
 */
export const CRIADOUROS_DATA: Criadouro[] = []

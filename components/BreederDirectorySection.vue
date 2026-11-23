<template>
  <section id="criadouros" class="directory-section surface-stone" aria-labelledby="directory-heading">
    <div class="section-container">
      <!-- MODO ATIVO: exibido automaticamente quando houver pelo menos 1 criadouro publicado -->
      <template v-if="criadourosAtivos.length > 0">
        <header class="section-head">
          <span class="kicker">Diretório nacional</span>
          <h2 id="directory-heading" class="section-title">Criadouros parceiros legalizados</h2>
          <p class="section-lede">
            Escolha pela sua região, confira o número de registro e fale diretamente com o criador
            no WhatsApp para consultar disponibilidade e valores.
          </p>
        </header>

        <ul class="legal-checklist-strip" aria-label="O que exigir em uma compra legalizada">
          <li v-for="item in checklistCompra" :key="item.titulo" class="legal-checklist-item">
            <AppIcon name="check" class="legal-checklist-icon" />
            <span>
              <strong>{{ item.titulo }}</strong>
              {{ item.detalhe }}
            </span>
          </li>
        </ul>

        <div class="directory-toolbar" role="status" aria-live="polite">
          <span class="directory-result">
            Mostrando <strong>{{ criadourosFiltrados.length }}</strong> de
            {{ criadourosAtivos.length }} criadouros
            <template v-if="estadoSelecionadoNome"> em <strong>{{ estadoSelecionadoNome }}</strong></template>
            <template v-if="searchQuery.trim()"> para “<strong>{{ searchQuery.trim() }}</strong>”</template>
          </span>
          <button v-if="temFiltrosAtivos" type="button" class="directory-clear" @click="limparFiltros">
            Limpar filtros
          </button>
        </div>

        <div v-if="criadourosFiltrados.length > 0" class="breeder-grid">
          <BreederCard
            v-for="criadouro in criadourosFiltrados"
            :key="criadouro.id"
            :criadouro="criadouro"
          />
        </div>

        <div v-else class="empty-state">
          <div class="empty-state-copy">
            <span class="kicker">
              Nenhum parceiro {{ estadoSelecionadoNome ? `em ${estadoSelecionadoNome}` : 'encontrado' }}
            </span>
            <h3 class="empty-state-title">Ainda não temos um criadouro cadastrado nessa região.</h3>
            <p class="empty-state-text">
              A rede cresce estado por estado. Mande uma mensagem para pedir uma indicação próxima ou
              sugerir um criadouro regularizado que você conhece.
            </p>
          </div>

          <div class="empty-state-actions">
            <a
              :href="gerarLinkSugestaoWhatsapp()"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary btn-block"
            >
              <AppIcon name="whatsapp" class="btn-icon" />
              Pedir indicação no WhatsApp
            </a>
            <button type="button" class="btn btn-outline btn-block" @click="limparFiltros">
              Ver todos os criadouros
            </button>
          </div>
        </div>
      </template>

      <!-- MODO CREDENCIAMENTO (0 criadouros): seletor interativo por região + CTAs centralizados -->
      <template v-else>
        <div class="launch-directory">
          <header class="launch-head">
            <span class="kicker">Diretório nacional · Em credenciamento</span>
            <h2 id="directory-heading" class="section-title">
              Estamos selecionando criadouros legalizados por estado
            </h2>
            <p class="launch-lede">
              Antes de publicar qualquer plantel, conferimos registro no IBAMA, licença estadual e
              emissão de nota fiscal. Selecione seu estado para ser avisado assim que abrirmos na
              sua região.
            </p>
          </header>

          <div class="region-selector-card">
            <div class="region-tabs" role="tablist" aria-label="Filtrar estados por região do Brasil">
              <button
                v-for="regiao in regioesBrasil"
                :key="regiao.nome"
                type="button"
                role="tab"
                class="region-tab"
                :class="{ 'is-active': regiaoAtiva === regiao.nome }"
                :aria-selected="regiaoAtiva === regiao.nome"
                @click="selecionarRegiao(regiao.nome)"
              >
                {{ regiao.nome }}
              </button>
            </div>

            <div class="uf-selector-grid" role="group" :aria-label="`Estados da região ${regiaoAtiva}`">
              <button
                v-for="estado in estadosDaRegiaoAtiva"
                :key="estado.uf"
                type="button"
                class="uf-tile"
                :class="{ 'is-selected': ufSelecionada === estado.uf }"
                :aria-pressed="ufSelecionada === estado.uf"
                @click="alternarUf(estado.uf)"
              >
                <span class="uf-tile-code">{{ estado.uf }}</span>
                <span class="uf-tile-name">{{ estado.nome }}</span>
              </button>
            </div>

            <div class="region-status-bar" aria-live="polite">
              <template v-if="estadoSelecionadoObj">
                <strong>{{ estadoSelecionadoObj.nome }} ({{ estadoSelecionadoObj.uf }})</strong>
                <span>— em fase de credenciamento de criadouros parceiros.</span>
              </template>
              <template v-else>
                <span>Toque no seu estado acima para personalizar a mensagem ou fale direto com a equipe.</span>
              </template>
            </div>

            <div class="launch-cta-group">
              <a
                :href="gerarLinkSugestaoWhatsapp(ufSelecionada)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary launch-cta-btn"
              >
                <AppIcon name="whatsapp" class="btn-icon" />
                {{
                  estadoSelecionadoObj
                    ? `Quero aviso para ${estadoSelecionadoObj.uf} no WhatsApp`
                    : 'Receber aviso da minha região no WhatsApp'
                }}
                <span class="sr-only">(abre em nova aba)</span>
              </a>

              <a href="#parceria" class="btn btn-outline launch-cta-btn">
                Sou criador legalizado e quero anunciar
              </a>
            </div>
          </div>

          <ul class="launch-criteria" aria-label="Critérios exigidos de todos os parceiros">
            <li v-for="item in checklistCompra" :key="item.titulo" class="launch-criteria-item">
              <AppIcon name="check" class="legal-checklist-icon" />
              <span>
                <strong>{{ item.titulo }}</strong> — {{ item.detalhe }}
              </span>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ESTADOS_BRASIL } from '~/data/criadouros'

const {
  searchQuery,
  criadourosAtivos,
  criadourosFiltrados,
  temFiltrosAtivos,
  estadoSelecionadoNome,
  limparFiltros,
  gerarLinkSugestaoWhatsapp
} = useCriadouros()

const regioesBrasil = [
  { nome: 'Sudeste', ufs: ['SP', 'RJ', 'MG', 'ES'] },
  { nome: 'Sul', ufs: ['PR', 'SC', 'RS'] },
  { nome: 'Nordeste', ufs: ['BA', 'PE', 'CE', 'RN', 'PB', 'SE', 'AL', 'MA', 'PI'] },
  { nome: 'Centro-Oeste', ufs: ['GO', 'DF', 'MT', 'MS'] },
  { nome: 'Norte', ufs: ['PA', 'AM', 'TO', 'RO', 'AC', 'AP', 'RR'] }
]

const regiaoAtiva = ref<string>('Sudeste')
const ufSelecionada = ref<string>('')

const estadosDaRegiaoAtiva = computed(() => {
  const regiao = regioesBrasil.find((r) => r.nome === regiaoAtiva.value)
  if (!regiao) return []
  return regiao.ufs
    .map((uf) => ESTADOS_BRASIL.find((e) => e.uf === uf))
    .filter((e): e is (typeof ESTADOS_BRASIL)[number] => Boolean(e))
})

const estadoSelecionadoObj = computed(() =>
  ESTADOS_BRASIL.find((e) => e.uf === ufSelecionada.value) || null
)

const selecionarRegiao = (nome: string) => {
  regiaoAtiva.value = nome
}

const alternarUf = (uf: string) => {
  ufSelecionada.value = ufSelecionada.value === uf ? '' : uf
}

const checklistCompra = [
  { titulo: 'Nota fiscal', detalhe: 'emitida no nome do comprador' },
  { titulo: 'Anilha fechada', detalhe: 'identificação individual da ave' },
  { titulo: 'Registro ativo', detalhe: 'CTF/IBAMA e licença estadual' },
  { titulo: 'Transporte regular', detalhe: 'GTA quando houver envio' }
]
</script>

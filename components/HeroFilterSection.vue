<template>
  <section id="topo" class="hero on-dark" aria-labelledby="hero-heading">
    <figure class="hero-media">
      <img
        src="/images/hero-ringneck.jpg"
        alt=""
        class="hero-image"
        width="1376"
        height="768"
        fetchpriority="high"
        decoding="async"
      />
    </figure>
    <div class="hero-scrim" aria-hidden="true"></div>

    <!-- MODO DIRETÓRIO: exibido automaticamente quando há criadouros parceiros ativos -->
    <div v-if="criadourosAtivos.length > 0" class="hero-content">
      <div class="hero-copy">
        <span class="kicker">Curadoria @ringnacklab</span>

        <h1 id="hero-heading" class="hero-title">
          Encontre criadouros legalizados de Ring Neck na sua região.
        </h1>

        <p class="hero-lede">
          Plantéis com registro ativo no IBAMA e nos órgãos estaduais, procedência à vista e
          contato direto pelo WhatsApp — sem intermediação.
        </p>
      </div>

      <form
        class="filter-bar"
        role="search"
        aria-label="Buscar criadouros por localização"
        @submit.prevent="irParaResultados"
      >
        <div class="filter-field">
          <label for="select-uf" class="filter-label">Estado</label>
          <select id="select-uf" v-model="selectedUf" class="filter-select">
            <option value="">Todo o Brasil</option>
            <option v-for="estado in estadosComContagem" :key="estado.uf" :value="estado.uf">
              {{ estado.nome }}{{ estado.totalParceiros ? ` (${estado.totalParceiros})` : '' }}
            </option>
          </select>
        </div>

        <div class="filter-field">
          <label for="input-cidade" class="filter-label">Cidade ou criadouro</label>
          <input
            id="input-cidade"
            v-model="searchQuery"
            type="search"
            class="filter-input"
            placeholder="Ex.: Atibaia, Londrina, Feira de Santana…"
            autocomplete="off"
            enterkeyhint="search"
          />
        </div>

        <button type="submit" class="btn btn-gold filter-submit">
          Ver {{ criadourosFiltrados.length }}
          {{ criadourosFiltrados.length === 1 ? 'criadouro' : 'criadouros' }}
        </button>
      </form>

      <div class="filter-meta" role="group" aria-label="Filtro rápido por estado">
        <span class="filter-meta-label">Estados disponíveis:</span>
        <button
          v-for="uf in ufsComParceiros"
          :key="uf"
          type="button"
          class="uf-chip"
          :class="{ 'is-active': selectedUf === uf }"
          :aria-pressed="selectedUf === uf"
          @click="alternarUf(uf)"
        >
          {{ uf }}
        </button>
        <button v-if="temFiltrosAtivos" type="button" class="filter-clear" @click="limparFiltros">
          Limpar filtros
        </button>
      </div>

      <ul class="hero-footnotes">
        <li class="hero-footnote">
          <span class="hero-footnote-dot" aria-hidden="true"></span>
          {{ criadourosAtivos.length }} criadouros listados em {{ ufsComParceiros.length }} estados
        </li>
        <li class="hero-footnote">
          <span class="hero-footnote-dot" aria-hidden="true"></span>
          Número de registro visível em cada ficha
        </li>
        <li class="hero-footnote">
          <span class="hero-footnote-dot" aria-hidden="true"></span>
          Negociação direta com o criador, sem comissão
        </li>
      </ul>
    </div>

    <!-- MODO LANÇAMENTO: enquanto os primeiros parceiros estão em credenciamento -->
    <div v-else class="hero-content">
      <div class="hero-copy">
        <h1 id="hero-heading" class="hero-title">
          Guias práticos e curadoria responsável para o seu Ring Neck.
        </h1>

        <p class="hero-lede">
          Conheça o pacote com os {{ guiasAtivos.length }} guias completos do @ringnacklab e
          acompanhe o credenciamento nacional de criadouros legalizados.
        </p>
      </div>

      <div class="hero-cta-row">
        <a href="#guias" class="btn btn-gold hero-cta-primary">
          {{ oferta.cupom ? `Ver os ${guiasAtivos.length} guias com desconto` : `Conhecer os ${guiasAtivos.length} guias` }}
        </a>
        <a href="#parceria" class="btn hero-cta-secondary">
          Quero ser criadouro parceiro
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const {
  selectedUf,
  searchQuery,
  criadourosAtivos,
  criadourosFiltrados,
  estadosComContagem,
  ufsComParceiros,
  temFiltrosAtivos,
  limparFiltros
} = useCriadouros()

const { guiasAtivos, oferta } = useGuias()

const alternarUf = (uf: string) => {
  selectedUf.value = selectedUf.value === uf ? '' : uf
}

const irParaResultados = () => {
  document.getElementById('criadouros')?.scrollIntoView({ behavior: 'smooth' })
  ;(document.activeElement as HTMLElement | null)?.blur()
}
</script>

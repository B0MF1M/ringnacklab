<template>
  <article class="breeder-card" :aria-labelledby="`criadouro-${criadouro.id}`">
    <header class="breeder-card-head">
      <div class="breeder-avatar">
        <img
          v-if="criadouro.logo_url && !erroImagem"
          :src="criadouro.logo_url"
          :alt="`Logomarca de ${criadouro.nome}`"
          class="breeder-logo-img"
          loading="lazy"
          @error="erroImagem = true"
        />
        <span v-else class="breeder-initials" aria-hidden="true">
          {{ getIniciaisCriadouro(criadouro.nome) }}
        </span>
      </div>

      <div class="breeder-heading">
        <div class="breeder-topline">
          <span class="breeder-location">{{ criadouro.cidade }}, {{ criadouro.estado_uf }}</span>
          <span v-if="criadouro.destaque" class="breeder-featured">Destaque</span>
        </div>
        <h3 :id="`criadouro-${criadouro.id}`" class="breeder-name">{{ criadouro.nome }}</h3>
      </div>
    </header>

    <div class="legal-badge">
      <AppIcon name="shield" class="legal-badge-icon" />
      <div class="legal-badge-body">
        <span class="legal-badge-status">Criadouro legalizado</span>
        <span class="legal-badge-code">{{ criadouro.registro_legal }}</span>
      </div>
    </div>

    <dl class="breeder-data">
      <dt class="breeder-data-label">Local</dt>
      <dd class="breeder-data-value">
        {{ criadouro.cidade }}/{{ criadouro.estado_uf }}
        <span class="breeder-data-sub">{{ criadouro.endereco }}</span>
      </dd>

      <dt class="breeder-data-label">Atende</dt>
      <dd class="breeder-data-value">{{ criadouro.regiao_atendimento }}</dd>

      <dt class="breeder-data-label">WhatsApp</dt>
      <dd class="breeder-data-value breeder-phone">
        {{ formatarTelefone(criadouro.telefone_whatsapp) }}
      </dd>
    </dl>

    <footer class="breeder-card-foot">
      <a
        :href="gerarLinkWhatsappCriadouro(criadouro)"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary btn-block"
      >
        <AppIcon name="whatsapp" class="btn-icon" />
        Chamar no WhatsApp
        <span class="sr-only">— {{ criadouro.nome }} (abre em nova aba)</span>
      </a>
      <p class="breeder-since">Parceiro desde {{ formatarParceiroDesde(criadouro.created_at) }}</p>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Criadouro } from '~/data/criadouros'

defineProps<{
  criadouro: Criadouro
}>()

const erroImagem = ref(false)

const {
  getIniciaisCriadouro,
  formatarTelefone,
  formatarParceiroDesde,
  gerarLinkWhatsappCriadouro
} = useCriadouros()
</script>

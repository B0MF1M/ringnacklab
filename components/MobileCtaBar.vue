<template>
  <Transition name="slide-up">
    <div v-if="visivel" class="mobile-cta-bar" role="region" aria-label="Ações rápidas">
      <template v-if="criadourosAtivos.length > 0">
        <a href="#criadouros" class="btn btn-primary">Ver criadouros</a>
        <a href="#guias" class="btn btn-outline">Ver os 3 guias</a>
      </template>
      <template v-else>
        <a href="#guias" class="btn btn-primary">Ver os 3 guias</a>
        <a
          :href="gerarLinkParceriaComercial()"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline"
        >
          <AppIcon name="whatsapp" class="btn-icon" />
          Quero ser parceiro
          <span class="sr-only">(abre o WhatsApp em nova aba)</span>
        </a>
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const { criadourosAtivos, gerarLinkParceriaComercial } = useCriadouros()

/**
 * Barra fixa no mobile: aparece fora das seções que já trazem seus próprios CTAs principais.
 */
const heroVisivel = ref(true)
const alvosVisiveis = ref(new Set<string>())
let observador: IntersectionObserver | null = null

const visivel = computed(() => !heroVisivel.value && alvosVisiveis.value.size === 0)

onMounted(() => {
  observador = new IntersectionObserver(
    (entradas) => {
      const proximo = new Set(alvosVisiveis.value)
      for (const entrada of entradas) {
        const id = (entrada.target as HTMLElement).dataset.ctaAlvo || ''
        if (id === 'topo') {
          heroVisivel.value = entrada.isIntersecting
          continue
        }
        if (entrada.isIntersecting) proximo.add(id)
        else proximo.delete(id)
      }
      alvosVisiveis.value = proximo
    },
    { threshold: 0.15 }
  )

  for (const seletor of ['#topo', '#criadouros', '#guias', '#parceria', '.site-footer']) {
    const el = document.querySelector<HTMLElement>(seletor)
    if (!el) continue
    el.dataset.ctaAlvo = seletor.replace(/^[#.]/, '')
    observador.observe(el)
  }
})

onBeforeUnmount(() => observador?.disconnect())
</script>

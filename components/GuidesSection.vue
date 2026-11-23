<template>
  <section id="guias" class="guides-section surface-paper" aria-labelledby="guides-heading">
    <div class="section-container">
      <div class="bundle-card">
        <!-- Lado esquerdo: palco interativo tipo carrossel com os 3 guias juntos -->
        <div class="bundle-stage on-dark">
          <div class="bundle-fan" role="region" aria-label="Prévia interativa dos 3 guias do pacote">
            <button
              v-for="(guia, index) in guiasOrdenadosNoLeque"
              :key="guia.id"
              type="button"
              class="bundle-book"
              :class="[`bundle-book-${index}`, { 'is-active': guiaAtivoId === guia.id }]"
              :aria-label="`Destacar capa: ${guia.titulo}`"
              :aria-pressed="guiaAtivoId === guia.id"
              @mouseenter="guiaAtivoId = guia.id"
              @focus="guiaAtivoId = guia.id"
              @click="guiaAtivoId = guia.id"
            >
              <img
                :src="guia.capa_url"
                :alt="`Capa: ${guia.titulo}`"
                class="bundle-book-img"
                width="600"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>

          <div class="bundle-carousel-bar">
            <button
              type="button"
              class="bundle-nav-btn"
              aria-label="Guia anterior"
              @click="navegarLeque(-1)"
            >
              ←
            </button>

            <div class="bundle-carousel-status">
              <span class="bundle-active-label">{{ guiaAtivo?.titulo }}</span>
              <div class="bundle-dots" role="tablist" aria-label="Selecionar guia em destaque">
                <button
                  v-for="guia in guiasOrdenadosNoLeque"
                  :key="guia.id"
                  type="button"
                  role="tab"
                  class="bundle-dot"
                  :class="{ 'is-active': guiaAtivoId === guia.id }"
                  :aria-selected="guiaAtivoId === guia.id"
                  :aria-label="`Ver ${guia.titulo}`"
                  @click="guiaAtivoId = guia.id"
                ></button>
              </div>
            </div>

            <button
              type="button"
              class="bundle-nav-btn"
              aria-label="Próximo guia"
              @click="navegarLeque(1)"
            >
              →
            </button>
          </div>
        </div>

        <!-- Lado direito: conteúdo do pacote + CTA em destaque -->
        <div class="bundle-content">
          <span class="kicker">
            {{ oferta.cupom ? 'Lançamento oficial · Pacote único' : 'Pacote único · Guias RingnackLab' }}
          </span>

          <h2 id="guides-heading" class="bundle-title">{{ oferta.titulo }}</h2>

          <p class="bundle-lede">
            Tudo o que você precisa para cuidar, alimentar bem e ensinar seu Ring Neck a falar —
            você leva os <strong>{{ guiasAtivos.length }} guias juntos</strong> com acesso imediato.
          </p>

          <ul class="bundle-includes" aria-label="O que está incluído no pacote">
            <li
              v-for="guia in guiasAtivos"
              :key="guia.id"
              class="bundle-include"
              :class="{ 'is-active': guiaAtivoId === guia.id }"
              @mouseenter="guiaAtivoId = guia.id"
              @click="guiaAtivoId = guia.id"
            >
              <AppIcon name="check" class="bundle-include-icon" />
              <div>
                <strong class="bundle-include-title">{{ guia.titulo }}</strong>
                <span class="bundle-include-topics">{{ guia.topicos.join(' · ') }}</span>
              </div>
            </li>
          </ul>

          <div class="bundle-action-box on-dark">
            <div v-if="precoFormatado" class="bundle-price">
              <span v-if="precoOriginalFormatado" class="bundle-price-old">
                De <s>{{ precoOriginalFormatado }}</s> por
              </span>
              <span class="bundle-price-value">{{ precoFormatado }}</span>
              <span class="bundle-price-note">
                Pagamento único pelos {{ guiasAtivos.length }} guias digitais
              </span>
            </div>

            <p v-if="oferta.cupom" class="bundle-coupon">
              <AppIcon name="check" class="bundle-coupon-icon" />
              <span>Cupom <strong>{{ oferta.cupom }}</strong> já aplicado no link</span>
            </p>

            <a
              :href="linkCompra"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-gold btn-block bundle-cta"
            >
              <AppIcon v-if="!temCheckout" name="whatsapp" class="btn-icon" />
              {{
                oferta.cupom
                  ? `Quero os ${guiasAtivos.length} guias com desconto`
                  : `Quero o pacote com os ${guiasAtivos.length} guias`
              }}
              <span class="sr-only">(abre em nova aba)</span>
            </a>

            <p class="bundle-note">
              {{
                temCheckout
                  ? `Pagamento único e acesso imediato via ${oferta.plataforma || 'checkout seguro'} · Leia no celular, tablet ou PC.`
                  : 'Compra direta com o @ringnacklab pelo WhatsApp.'
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const { guiasAtivos, oferta, precoFormatado, precoOriginalFormatado, temCheckout, linkCompra } =
  useGuias()

/**
 * Ordem visual no leque: [esquerda: Alimentação, centro: Guia Completo, direita: Fala].
 */
const guiasOrdenadosNoLeque = computed(() => {
  const lista = guiasAtivos.value
  if (lista.length === 3) {
    return [lista[1], lista[0], lista[2]]
  }
  return lista
})

const guiaAtivoId = ref<string>(guiasAtivos.value[0]?.id || '')

const guiaAtivo = computed(() =>
  guiasAtivos.value.find((g) => g.id === guiaAtivoId.value) || guiasAtivos.value[0]
)

const navegarLeque = (direcao: -1 | 1) => {
  const lista = guiasOrdenadosNoLeque.value
  if (!lista.length) return
  const indiceAtual = lista.findIndex((g) => g.id === guiaAtivoId.value)
  const proximoIndice = (indiceAtual + direcao + lista.length) % lista.length
  guiaAtivoId.value = lista[proximoIndice].id
}
</script>

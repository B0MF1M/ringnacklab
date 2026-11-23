<template>
  <footer class="site-footer on-dark">
    <div class="section-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img
            src="/brand/logo-lockup-white.png"
            alt="RingnackLab"
            class="footer-logo"
            width="677"
            height="435"
            loading="lazy"
          />
          <p class="footer-tagline">
            Diretório de criadouros legalizados e guias práticos de Ring Neck em todo o Brasil, com
            curadoria do {{ instagramHandle }}.
          </p>
        </div>

        <nav class="footer-col" aria-label="Rodapé">
          <h2 class="footer-heading">Navegar</h2>
          <ul class="footer-links">
            <li v-if="temParceirosAtivos"><a href="#criadouros" class="footer-link">Criadouros parceiros</a></li>
            <li><a href="#guias" class="footer-link">Guias do Ring Neck</a></li>
            <li><a href="#parceria" class="footer-link">Quero ser parceiro</a></li>
            <li><a href="#faq" class="footer-link">Dúvidas frequentes</a></li>
            <li>
              <a :href="instagramUrl" target="_blank" rel="noopener noreferrer" class="footer-link">
                Instagram {{ instagramHandle }} ↗<span class="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="footer-col-legal">
          <h2 class="footer-heading">Aviso legal</h2>
          <p class="footer-legal">
            O RingnackLab atua exclusivamente como diretório de divulgação de criadouros parceiros
            legalizados. Não vendemos, não intermediamos pagamentos e não transportamos aves. Toda
            negociação, incluindo a conferência de nota fiscal, anilha e documentação de transporte,
            ocorre diretamente entre o interessado e o criadouro.
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ anoAtual }} RingnackLab. Todos os direitos reservados.</span>
        <span>Feito no Brasil · {{ instagramHandle }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { criadourosAtivos } = useCriadouros()
const temParceirosAtivos = computed(() => criadourosAtivos.value.length > 0)

const config = useRuntimeConfig()
const instagramHandle = String(config.public.instagramHandle || '@ringnacklab')
const instagramUrl = String(config.public.instagramUrl || 'https://www.instagram.com/ringnacklab/')
const anoAtual = new Date().getFullYear()
</script>

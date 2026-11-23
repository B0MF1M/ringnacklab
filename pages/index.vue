<template>
  <div>
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>

    <AppHeader />

    <main id="conteudo" tabindex="-1">
      <HeroFilterSection />
      <BreederDirectorySection v-if="temParceirosAtivos" />
      <GuidesSection />
      <PartnerBannerSection />
      <FaqSection />
    </main>

    <AppFooter />
    <MobileCtaBar />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { criadourosAtivos } = useCriadouros()
const temParceirosAtivos = computed(() => criadourosAtivos.value.length > 0)
</script>

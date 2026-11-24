<template>
  <header class="site-header" :class="{ 'is-scrolled': rolou }">
    <div class="header-inner">
      <a href="#topo" class="brand-lockup" aria-label="RingnackLab — voltar ao início" @click="fecharMenu">
        <img src="/brand/logo-mark.png" alt="" class="brand-mark" width="251" height="435" />
        <img src="/brand/logo-wordmark.png" alt="RingnackLab" class="brand-wordmark" width="434" height="99" />
      </a>

      <nav class="main-nav" aria-label="Navegação principal">
        <a v-if="temParceirosAtivos" href="#criadouros" class="nav-link">Criadouros</a>
        <a href="#guias" class="nav-link">Guias</a>
        <a href="#parceria" class="nav-link">Para criadores</a>
        <a href="#faq" class="nav-link">Dúvidas</a>
      </nav>

      <div class="header-actions">
        <a href="#parceria" class="btn btn-primary nav-cta">Quero ser parceiro</a>
        <button
          type="button"
          class="menu-toggle"
          :class="{ 'is-open': menuAberto }"
          :aria-expanded="menuAberto"
          aria-controls="menu-mobile"
          :aria-label="menuAberto ? 'Fechar menu' : 'Abrir menu'"
          @click="menuAberto = !menuAberto"
        >
          <span class="menu-toggle-bar" aria-hidden="true"></span>
          <span class="menu-toggle-bar" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="drawer">
        <nav v-if="menuAberto" id="menu-mobile" class="mobile-drawer" aria-label="Menu">
          <div class="mobile-nav-list">
            <a v-if="temParceirosAtivos" href="#criadouros" class="mobile-nav-link" @click="fecharMenu">
              Criadouros
            </a>
            <a href="#guias" class="mobile-nav-link" @click="fecharMenu">Guias</a>
            <a href="#parceria" class="mobile-nav-link" @click="fecharMenu">Para criadores</a>
            <a href="#faq" class="mobile-nav-link" @click="fecharMenu">Dúvidas frequentes</a>
          </div>
          <a href="#parceria" class="btn btn-primary btn-block mobile-nav-cta" @click="fecharMenu">
            Quero ser parceiro
          </a>
        </nav>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const { criadourosAtivos } = useCriadouros()
const temParceirosAtivos = computed(() => criadourosAtivos.value.length > 0)

const menuAberto = ref(false)
const rolou = ref(false)

const atualizarRolagem = () => {
  rolou.value = window.scrollY > 8
}

const fecharMenu = () => {
  menuAberto.value = false
}

const aoPressionarTecla = (evento: KeyboardEvent) => {
  if (evento.key === 'Escape' && menuAberto.value) fecharMenu()
}

const fecharSeDesktop = () => {
  if (window.innerWidth >= 1024 && menuAberto.value) fecharMenu()
}

watch(menuAberto, (aberto) => {
  document.documentElement.style.overflow = aberto ? 'hidden' : ''
})

onMounted(() => {
  atualizarRolagem()
  window.addEventListener('scroll', atualizarRolagem, { passive: true })
  window.addEventListener('keydown', aoPressionarTecla)
  window.addEventListener('resize', fecharSeDesktop, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', atualizarRolagem)
  window.removeEventListener('keydown', aoPressionarTecla)
  window.removeEventListener('resize', fecharSeDesktop)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <svg :viewBox="icone.viewBox" fill="none" aria-hidden="true" focusable="false">
    <template v-if="name === 'whatsapp'">
      <path
        fill="currentColor"
        d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12 2Zm0 18.1c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.1Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.3-.3-.3-.6-.5Z"
      />
    </template>
    <template v-else-if="name === 'check'">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.18" />
      <path d="M7.5 12.3l3 3 6-6.3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'shield'">
      <path d="M12 2.8l7.5 2.9v5.6c0 4.6-3.1 8.6-7.5 9.9-4.4-1.3-7.5-5.3-7.5-9.9V5.7L12 2.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M8.6 12.1l2.4 2.4 4.5-4.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'alert'">
      <path d="M12 3.2l9.5 16.6H2.5L12 3.2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M12 10v4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="12" cy="17" r="1.1" fill="currentColor" />
    </template>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: 'whatsapp' | 'check' | 'shield' | 'alert'
}>()

const icone = computed(() => ({ viewBox: '0 0 24 24', name: props.name }))
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
const route = useRoute()
const section = computed(() => String(route.params.section ?? ''))
const details: Record<string, {name: string; summary: string; entries: string[]; icon: string}> = {
  storage: { name: 'Storage', summary: 'Private uploads and file access', icon: 'i-lucide-hard-drive', entries: ['Private bucket: origin-files', 'Signed download links', '10 MiB backend upload limit', 'Cognito access-token validation'] },
  environment: { name: 'Environment', summary: 'Application configuration and secrets', icon: 'i-lucide-key-round', entries: ['Production / Preview / Development', 'Private environment variables', 'Per-project configuration', 'Audit history'] },
  domains: { name: 'Domains', summary: 'Custom hostnames and TLS', icon: 'i-lucide-globe', entries: ['1origin.dev — DNS/hosting pending', 'Custom domains', 'DNS verification', 'Certificate status'] },
  logs: { name: 'Logs', summary: 'Build output and runtime events', icon: 'i-lucide-scroll-text', entries: ['Build logs', 'Runtime logs', 'Request logs', 'Search and filtering'] },
  settings: { name: 'Settings', summary: 'Workspace preferences', icon: 'i-lucide-settings-2', entries: ['General settings', 'Appearance', 'Team roles', 'Notifications'] }
}
const current = computed(() => details[section.value])
const selected = ref('')
</script>
<template>
  <div v-if="current" class="origin-page">
    <div class="eyebrow">WORKSPACE / {{ current.name.toUpperCase() }}</div><h1 class="page-heading">{{ current.name }}<span class="text-[#4c9aff]">.</span></h1>
    <p class="page-subtitle">{{ current.summary }}</p>
    <div class="my-8 flex items-center gap-3"><span class="preview-marker">UI ONLY</span><span class="mono muted text-[11px]">No cloud requests</span></div>
    <div class="max-w-[780px] border-t border-[#2a2a2a]">
      <button v-for="item in current.entries" :key="item" @click="selected = item" class="flex w-full items-center justify-between gap-3 border-b border-[#2a2a2a] p-4 text-left hover:bg-[#171717]">
        <span class="flex items-center gap-3"><UIcon :name="current.icon" class="size-4 muted"/>{{ item }}</span><UIcon name="i-lucide-chevron-right" class="size-4 muted"/>
      </button>
    </div>
    <div v-if="selected" class="source-note mt-5" role="status">{{ selected }} — selected in the UI preview only. No backend action was taken.</div>
    <div class="source-note mt-8 max-w-[780px]">The controls are design specifications; no storage, logging, or domain operations execute from this page.</div>
  </div>
  <div v-else class="origin-page"><h1 class="page-heading">Page not found</h1><NuxtLink to="/" class="text-[#8dbaff]">Back to overview →</NuxtLink></div>
</template>

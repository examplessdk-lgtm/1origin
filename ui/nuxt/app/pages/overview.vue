<script setup lang="ts">
import { computed, onMounted } from 'vue'
const { state, hydrate } = useOriginWorkspace()
onMounted(hydrate)
const saved = computed(() => Object.keys(state.value.savedAt).length)
const rows = computed(() => [
  { label: 'Active repository', value: state.value.repository?.fullName || 'Not connected', note: state.value.repository?.branch || 'Import a public GitHub repository' },
  { label: 'Source files', value: String(state.value.files.length), note: 'Real GitHub tree · supported text files' },
  { label: 'Locally saved', value: String(saved.value), note: 'Stored in your current browser' },
  { label: 'Cloud build', value: 'Manual', note: 'AWS CodeBuild · authenticated backend not connected' }
])
</script>
<template>
  <div class="origin-page">
    <div class="eyebrow">WORKSPACE / OVERVIEW</div>
    <h1 class="page-heading">Overview<span class="text-white">.</span></h1>
    <p class="page-subtitle">One application, one design system. The values below come from this browser's active workspace, not sample deployments.</p>
    <section class="metric-band" aria-label="Current workspace state">
      <div v-for="row in rows" :key="row.label" class="metric">
        <p class="metric-label">{{ row.label }}</p>
        <p class="metric-value !text-[16px] break-words">{{ row.value }}</p>
        <p class="metric-note">{{ row.note }}</p>
      </div>
    </section>
    <div class="panel-layout">
      <section>
        <h2 class="section-title mb-4">Get to work</h2>
        <NuxtLink v-for="item in [
          { to:'/workspace', icon:'i-lucide-code-2', title:'Open IDE workspace', detail:'Browse and edit source files' },
          { to:'/import', icon:'i-lucide-folder-input', title:'Import GitHub repository', detail:'Public repository · real read-only fetch' },
          { to:'/build', icon:'i-lucide-hammer', title:'Build pipeline', detail:'View verified AWS build and operational access' },
          { to:'/loading', icon:'i-lucide-activity', title:'Activity and loading', detail:'Current workspace activity, not simulated' }
        ]" :key="item.to" :to="item.to" class="quick-item">
          <span class="flex items-center gap-3"><UIcon :name="item.icon" class="size-4"/><span><span class="block">{{ item.title }}</span><span class="text-[11px] muted">{{ item.detail }}</span></span></span>
          <UIcon name="i-lucide-chevron-right" class="size-4" />
        </NuxtLink>
      </section>
      <aside class="inspector">
        <h2 class="section-title">Environment</h2>
        <div v-for="row in [
          {label:'UI',value:'Nuxt 4 + Nuxt UI'},
          {label:'Hosting',value:'AWS S3 + CloudFront'},
          {label:'Region',value:'Singapore'},
          {label:'Repository',value:'GitHub public import'},
          {label:'Editor',value:'Browser-local'}
        ]" :key="row.label" class="inspector-row">
          <span class="muted">{{ row.label }}</span><span>{{ row.value }}</span>
        </div>
        <p class="source-note mt-6">The public application does not grant write access to GitHub or trigger cloud builds. Operations are only displayed when they are supported by a real integration.</p>
      </aside>
    </div>
  </div>
</template>
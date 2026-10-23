<script setup lang="ts">
import { projects, deployments, statusLabels } from '~/data/demo'
const metrics = [
  { label: 'Projects', value: '04', note: 'Example projects' },
  { label: 'Deployments', value: '05', note: 'Example history' },
  { label: 'Builds in queue', value: '01', note: 'Simulated' },
  { label: 'Uptime', value: '—', note: 'Not measured' }
]
</script>
<template>
  <div class="origin-page">
    <div class="eyebrow">ORIGIN / WORKSPACE</div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div><h1 class="page-heading">Overview<span class="text-[#4c9aff]">.</span></h1>
      <p class="page-subtitle">A calm command center for everything you deploy.</p></div>
      <span class="preview-marker">SAMPLE WORKSPACE</span>
    </div>
    <section class="metric-band" aria-label="Example metrics">
      <div v-for="m in metrics" :key="m.label" class="metric">
        <div class="metric-label">{{ m.label }}</div><div class="metric-value">{{ m.value }}</div><div class="metric-note">{{ m.note }}</div>
      </div>
    </section>
    <div class="panel-layout">
      <section class="min-w-0">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="section-title">Recent deployments</h2>
          <NuxtLink to="/deployments" class="mono text-[11px] text-[#8dbaff]">View all →</NuxtLink>
        </div>
        <table class="data-table">
          <thead><tr><th>PROJECT</th><th>STATUS</th><th>BRANCH</th><th>UPDATED</th></tr></thead>
          <tbody><tr v-for="item in deployments.slice(0,4)" :key="item.id">
            <td><span>{{ item.project }}</span><div class="mono muted mt-1 text-[10px]">{{ item.id }}</div></td>
            <td><span :class="'status-' + item.state" class="mono inline-flex items-center gap-1.5 text-[11px]"><span class="status-dot"/>{{ statusLabels[item.state] }}</span></td>
            <td class="mono muted">{{ item.branch }}</td><td class="mono muted">{{ item.age }}</td>
          </tr></tbody>
        </table>
        <div class="mt-9 mb-3 flex items-center justify-between">
          <h2 class="section-title">Projects</h2><NuxtLink to="/projects" class="mono text-[11px] text-[#8dbaff]">Explore →</NuxtLink>
        </div>
        <NuxtLink v-for="item in projects.slice(0,3)" :key="item.id" to="/projects" class="quick-item">
          <span class="flex items-center gap-3"><UIcon name="i-lucide-folder-git-2" class="size-4 muted" />{{ item.name }}</span>
          <span class="mono muted text-[11px]">{{ item.framework }} ↗</span>
        </NuxtLink>
      </section>
      <aside class="inspector">
        <h2 class="section-title">Workspace details</h2>
        <div v-for="item in [{label:'Name',value:'origin'}, {label:'Region',value:'Singapore'}, {label:'Runtime',value:'UI preview'}, {label:'Domain',value:'1origin.dev'}, {label:'Framework',value:'Nuxt 4'}]" :key="item.label" class="inspector-row">
          <span class="muted">{{ item.label }}</span><span class="break-all">{{ item.value }}</span>
        </div>
        <div class="source-note mt-6">
          <div class="mono mb-2 text-[10px] text-[#d8b17a]">UI FIRST / BACKEND LATER</div>
          AWS Cognito and Neon exist, but this preview does not call those services.
        </div>
        <h2 class="section-title mt-8">Quick access</h2>
        <NuxtLink v-for="a in [{to:'/projects',name:'Browse projects'},{to:'/connect',name:'Connections'},{to:'/storage',name:'Storage design'}]" :key="a.to" :to="a.to" class="quick-item">{{ a.name }} <UIcon name="i-lucide-arrow-up-right" class="size-4" /></NuxtLink>
      </aside>
    </div>
  </div>
</template>

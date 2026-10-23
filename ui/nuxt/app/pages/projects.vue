<script setup lang="ts">
import { computed, ref } from 'vue'
import { projects as initial, statusLabels } from '~/data/demo'
const projects = ref([...initial])
const search = ref('')
const open = ref(false)
const name = ref('')
const repository = ref('')
const notice = ref('')
const matching = computed(() => projects.value.filter(x => (x.name + ' ' + x.repo).toLowerCase().includes(search.value.toLowerCase())))
function createDraft() {
  if (!name.value.trim() || !repository.value.trim()) return
  projects.value.unshift({ id: 'local-' + projects.value.length, name: name.value.trim(), repo: repository.value.trim(), framework: 'Unconfigured', updated: 'Just now', state: 'queued' })
  name.value = ''; repository.value = ''; open.value = false
  notice.value = 'Added a temporary draft in this browser. No repository or cloud project was created.'
}
</script>
<template><div class="origin-page">
  <div class="eyebrow">WORKSPACE / PROJECTS</div>
  <div class="flex items-end justify-between gap-4">
    <div><h1 class="page-heading">Projects<span class="text-[#4c9aff]">.</span></h1><p class="page-subtitle">Organize repositories and deployment environments.</p></div>
    <UButton size="sm" icon="i-lucide-plus" class="rounded-none!" @click="open = true">New draft</UButton>
  </div>
  <div class="page-controls">
    <UInput v-model="search" icon="i-lucide-search" placeholder="Filter example projects" class="w-full max-w-xs" />
    <span class="preview-marker">DEMO DATA · {{ matching.length }}</span>
  </div>
  <p v-if="notice" class="source-note my-4" role="status">{{ notice }}</p>
  <table class="data-table mt-5"><thead><tr><th>PROJECT</th><th>STATUS</th><th>FRAMEWORK</th><th>UPDATED</th></tr></thead>
  <tbody><tr v-for="p in matching" :key="p.id">
    <td>{{ p.name }}<div class="mono muted mt-1 text-[10px]">{{ p.repo }}</div></td>
    <td><span :class="'status-'+p.state" class="mono inline-flex gap-1.5 items-center text-[11px]"><span class="status-dot"/>{{ statusLabels[p.state] }}</span></td>
    <td class="mono muted">{{ p.framework }}</td><td class="mono muted">{{ p.updated }}</td>
  </tr></tbody></table>
  <p v-if="!matching.length" class="muted py-7">No project matches this search.</p>
  <div class="source-note mt-7">These projects are design fixtures and do not represent connected GitHub repositories.</div>
  <UModal v-model:open="open" title="Create a local draft" description="Preview only. This does not create a real GitHub repository.">
    <template #body><form class="space-y-4" @submit.prevent="createDraft">
      <label class="block">Project name<UInput v-model="name" class="mt-2 w-full" placeholder="my-application" required/></label>
      <label class="block">Repository label<UInput v-model="repository" class="mt-2 w-full" placeholder="owner/repository" required/></label>
      <div class="flex justify-end gap-2"><UButton variant="outline" color="neutral" @click="open = false">Cancel</UButton><UButton type="submit" :disabled="!name.trim() || !repository.trim()">Add draft</UButton></div>
    </form></template>
  </UModal>
</div></template>

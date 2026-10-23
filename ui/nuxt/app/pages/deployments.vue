<script setup lang="ts">
import { computed, ref } from 'vue'
import { deployments, statusLabels } from '~/data/demo'
const filter = ref('all')
const options = ['all', 'ready', 'building', 'failed']
const matching = computed(() => filter.value === 'all' ? deployments : deployments.filter(x => x.state === filter.value))
</script>
<template><div class="origin-page">
  <div class="eyebrow">WORKSPACE / DEPLOYMENTS</div>
  <h1 class="page-heading">Deployments<span class="text-[#4c9aff]">.</span></h1><p class="page-subtitle">Review build history and commit context.</p>
  <div class="page-controls">
    <div class="flex flex-wrap items-center gap-2">
      <button v-for="v in options" :key="v" @click="filter=v" :aria-pressed="filter === v" class="mono border px-3 py-1.5 text-[11px]" :class="filter===v ? 'border-[#4c9aff] bg-[#173053] text-[#cde2ff]' : 'border-[#333] text-[#999]'">{{ v === 'all' ? 'All' : statusLabels[v as keyof typeof statusLabels] }}</button>
    </div><span class="preview-marker">SAMPLE HISTORY</span>
  </div>
  <table class="data-table mt-5"><thead><tr><th>DEPLOYMENT</th><th>STATUS</th><th>COMMIT</th><th>TIME</th></tr></thead>
  <tbody><tr v-for="item in matching" :key="item.id">
    <td>{{ item.project }}<div class="mono muted mt-1 text-[10px]">{{ item.id }} · {{ item.branch }}</div></td>
    <td><span :class="'status-'+item.state" class="mono inline-flex gap-1.5 items-center text-[11px]"><span class="status-dot"/>{{ statusLabels[item.state] }}</span></td>
    <td class="mono muted">{{ item.commit }}</td><td class="mono muted">{{ item.age }}</td>
  </tr></tbody></table>
  <p v-if="!matching.length" class="muted py-7">No matching deployments.</p>
  <div class="source-note mt-7">No deployment shown here is a real build. Live deployment state will be connected only after UI review.</div>
</div></template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
const { state, hydrate } = useOriginWorkspace()
onMounted(hydrate)
const current = computed(() => state.value.busy ? 'Reading public GitHub repository' : 'Idle — no operation running')
</script>
<template>
  <div class="origin-page max-w-[1050px]">
    <div class="eyebrow">WORKSPACE / ACTIVITY</div>
    <h1 class="page-heading">Loading &amp; activity<span class="text-white">.</span></h1>
    <p class="page-subtitle">Actual import and file-loading state from the browser workspace. No fabricated build progress.</p>
    <div class="mt-8 border border-[#343434] bg-[#111] p-7 sm:p-10">
      <div class="flex items-start gap-4">
        <UIcon :name="state.busy ? 'i-lucide-loader-circle' : 'i-lucide-circle-check'" class="size-6" :class="{ 'animate-spin': state.busy }" />
        <div>
          <h2 class="text-[16px] font-semibold">{{ current }}</h2>
          <p class="muted text-[12px] mt-2">{{ state.repository?.fullName || 'No GitHub repository imported in this browser.' }}</p>
        </div>
      </div>
      <p v-if="state.error" role="alert" class="ide-notice ide-error mt-6">{{ state.error }}</p>
      <p v-if="state.notice" role="status" class="ide-notice mt-6">{{ state.notice }}</p>
      <div class="mt-9 flex flex-wrap gap-3">
        <NuxtLink to="/workspace" class="ide-primary">Open workspace</NuxtLink>
        <NuxtLink to="/import" class="ide-action !px-4 !py-2.5">Import repository</NuxtLink>
        <NuxtLink to="/build" class="ide-action !px-4 !py-2.5">Build details</NuxtLink>
      </div>
    </div>
    <p class="source-note mt-6">The AWS build pipeline is not polled from this static page. Production build logs and live job progress will require an authenticated backend and server-side AWS permissions.</p>
  </div>
</template>
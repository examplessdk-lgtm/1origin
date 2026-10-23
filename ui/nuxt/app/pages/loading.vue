<script setup lang="ts">
import { ref } from 'vue'
const label = ref('Preparing workspace')
</script>
<template>
  <div class="origin-page">
    <div class="eyebrow">WORKSPACE / COMPONENT GALLERY</div>
    <h1 class="page-heading">Loading States<span class="text-[#e5e5e5]">.</span></h1>
    <p class="page-subtitle">Reusable Nuxt UI loading components, following the same black/white theme as the official templates.</p>
    <div class="source-note mt-7">UI demonstration only. These indicators do not reflect real builds, requests or deployment progress.</div>
    <div class="mt-8 grid gap-4 lg:grid-cols-2">
      <section class="border border-[#333] p-6">
        <div class="eyebrow mb-5">01 / WORKSPACE BOOT</div>
        <div class="flex min-h-56 flex-col items-center justify-center gap-5">
          <UIcon name="i-lucide-loader-circle" class="size-9 animate-spin text-[#f0f0f0]" aria-hidden="true" />
          <span class="mono text-[12px] text-[#d6d6d6]" role="status">{{ label }}</span>
          <p class="mono text-[10px] muted">Status illustration — no active request</p>
        </div>
      </section>
      <section class="border border-[#333] p-6">
        <div class="eyebrow mb-5">02 / CONTENT SKELETON</div>
        <div class="space-y-4" aria-label="Example page skeleton" aria-busy="true">
          <USkeleton class="h-8 w-1/2 rounded-sm"/>
          <USkeleton class="h-3 w-full rounded-sm"/>
          <USkeleton class="h-3 w-4/5 rounded-sm"/>
          <div class="mt-5 space-y-2">
            <USkeleton v-for="i in 4" :key="i" class="h-10 w-full rounded-sm"/>
          </div>
        </div>
      </section>
      <section class="border border-[#333] p-6 lg:col-span-2">
        <div class="eyebrow mb-4">03 / EMPTY DATA STATE</div>
        <div class="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <UIcon name="i-lucide-package-open" class="size-8 muted"/>
          <h2 class="text-[14px] font-medium">No workspace items yet</h2>
          <p class="text-[12px] muted">Connect a repository after the UI design phase.</p>
          <NuxtLink to="/catalog" class="mono mt-2 border border-[#999] px-4 py-2 text-[11px] hover:bg-[#282828]">Open template catalog →</NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

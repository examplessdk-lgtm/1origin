<script setup lang="ts">
import { computed, ref } from 'vue'
import manifest from '~/data/catalog.json'

type TemplateEntry = {
  slug: string
  name: string
  framework: 'Nuxt' | 'Vue'
  category: string
  description: string
  upstream: string
  preview: string
}

const catalog = manifest as TemplateEntry[]
const search = ref('')
const framework = ref<'All' | 'Nuxt' | 'Vue'>('All')
const frameworks = ['All', 'Nuxt', 'Vue'] as const
const filtered = computed(() => catalog.filter((entry) => {
  const matchesFramework = framework.value === 'All' || entry.framework === framework.value
  const query = search.value.trim().toLowerCase()
  return matchesFramework && (
    !query ||
    [entry.name, entry.category, entry.description, entry.slug]
      .some((value) => value.toLowerCase().includes(query))
  )
}))
const icons: Record<string, string> = {
  'AI & Chat': 'i-lucide-message-square-text',
  'Workspace': 'i-lucide-panels-top-left',
  'Content': 'i-lucide-book-open-text',
  'Product': 'i-lucide-blocks',
  'Marketing': 'i-lucide-panels-top-left',
  'Editor': 'i-lucide-file-pen-line',
  'Productivity': 'i-lucide-calendar-days',
  'Starter': 'i-lucide-package-check'
}
</script>

<template>
  <div class="origin-page">
    <div class="eyebrow">WORKSPACE / TEMPLATE LIBRARY</div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="page-heading">Template Catalog<span class="text-[#d5d5d5]">.</span></h1>
        <p class="page-subtitle">All 13 official Nuxt UI templates. Original source preserved, one shared Geist Mono theme.</p>
      </div>
      <span class="preview-marker">13 SOURCES / 1 THEME</span>
    </div>

    <section class="metric-band" aria-label="Template source summary">
      <div v-for="metric in [
        { label: 'Templates', value: '13', sub: 'Official sources' },
        { label: 'Nuxt', value: '10', sub: 'Standalone applications' },
        { label: 'Vue', value: '03', sub: 'Vite applications' },
        { label: 'Theme files', value: '01', sub: 'Single CSS source' }
      ]" :key="metric.label" class="metric">
        <p class="metric-label">{{ metric.label }}</p>
        <p class="metric-value">{{ metric.value }}</p>
        <p class="metric-note">{{ metric.sub }}</p>
      </div>
    </section>

    <div class="source-note mt-5">
      <span class="mono text-[11px] text-[#dedede]">SOURCE-FIRST LIBRARY</span>
      <p class="mt-2">Each template was copied from its official source and given the same CSS variables. The links labeled “Official demo” open the original upstream site and <strong>do not show the custom Origin theme</strong>. The themed copies are saved in the 1origin GitHub branch; the separate applications are not merged or individually hosted yet.</p>
    </div>

    <div class="page-controls">
      <UInput v-model="search" icon="i-lucide-search" size="md" aria-label="Find a template" placeholder="Search templates..." class="w-full max-w-xs"/>
      <div class="flex flex-wrap gap-1.5">
        <button v-for="option in frameworks" :key="option"
          class="mono border px-3 py-2 text-[11px]"
          :class="framework===option ? 'border-white bg-white text-black' : 'border-[#373737] text-[#aaa] hover:text-white'"
          :aria-pressed="framework===option"
          @click="framework=option">
          {{ option }}
        </button>
      </div>
    </div>
    <p class="mono muted mt-4 text-[11px]">{{ filtered.length }} templates</p>
    <div class="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="item in filtered" :key="item.slug"
        class="flex min-h-[190px] flex-col border border-[#303030] bg-[#121212] p-5 transition-colors hover:border-[#616161]">
        <header class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="flex size-10 items-center justify-center border border-[#373737] bg-[#181818]">
              <UIcon :name="icons[item.category] || 'i-lucide-boxes'" class="size-[19px] text-[#f0f0f0]" />
            </div>
            <div>
              <h2 class="text-[14px] font-semibold">{{ item.name }}</h2>
              <p class="mono muted mt-0.5 text-[10px]">{{ item.slug }}</p>
            </div>
          </div>
          <span class="outline-pill">{{ item.framework }}</span>
        </header>
        <p class="mt-4 min-h-12 text-[12px] leading-5 text-[#a7a7a7]">{{ item.description }}</p>
        <div class="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#303030] pt-4">
          <a :href="item.preview" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-[11px] text-[#f0f0f0] hover:underline">
            Official demo <UIcon name="i-lucide-external-link" class="size-3.5" />
          </a>
          <a :href="'https://github.com/examplessdk-lgtm/1origin/tree/feat/nuxt-ui-first/ui/template-library/upstream/' + item.slug"
            target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-[11px] text-[#a1a1a1] hover:text-white">
            Origin source <UIcon name="i-lucide-git-branch" class="size-3.5" />
          </a>
        </div>
      </article>
    </div>
    <p v-if="!filtered.length" class="muted py-8 text-[13px]">No matching templates found.</p>
    <div class="source-note mt-10">
      <div class="mono mb-2 text-[11px] text-[#dedede]">SHARED THEME</div>
      Geist Mono · 8px radius · Black/white primary · Neutral light/dark backgrounds.
      <p class="mt-2">Edit <span class="mono text-[#ddd]">ui/template-library/shared/mono-neutral.css</span>, then run <span class="mono text-[#ddd]">node ui/template-library/scripts/sync-theme.mjs</span> to apply it everywhere. Loading screens and a product catalog are app routes/components rather than separate upstream templates.</p>
    </div>
  </div>
</template>

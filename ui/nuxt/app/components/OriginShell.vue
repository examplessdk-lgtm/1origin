<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
const route = useRoute()
const router = useRouter()
const sidebar = ref(false)
const palette = ref(false)
const search = ref('')
const pages = [
  {label:'Overview',to:'/',icon:'i-lucide-layout-dashboard',group:'Workspace'},
  {label:'Projects',to:'/projects',icon:'i-lucide-folder-git-2',group:'Workspace'},
  {label:'Deployments',to:'/deployments',icon:'i-lucide-rocket',group:'Workspace'},
  {label:'Storage',to:'/storage',icon:'i-lucide-hard-drive',group:'Infrastructure'},
  {label:'Environment',to:'/environment',icon:'i-lucide-key-round',group:'Infrastructure'},
  {label:'Domains',to:'/domains',icon:'i-lucide-globe',group:'Infrastructure'},
  {label:'Logs',to:'/logs',icon:'i-lucide-scroll-text',group:'Infrastructure'},
  {label:'Connect',to:'/connect',icon:'i-lucide-plug',group:'Infrastructure'},
  {label:'Settings',to:'/settings',icon:'i-lucide-settings-2',group:'System'}
]
const selected = computed(() => pages.find(p=>p.to===route.path) || pages[0])
const matches = computed(()=>pages.filter(p=>p.label.toLowerCase().includes(search.value.toLowerCase())))
function navigate(to:string) { palette.value=false; sidebar.value=false; search.value=''; void router.push(to) }
function keydown(event:KeyboardEvent) {
  if ((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k') { event.preventDefault(); palette.value=!palette.value }
  if (event.key==='Escape') { palette.value=false; sidebar.value=false }
}
onMounted(()=>window.addEventListener('keydown',keydown))
onBeforeUnmount(()=>window.removeEventListener('keydown',keydown))
watch(()=>route.path,()=>{sidebar.value=false})
</script>
<template>
  <div class="origin-shell">
    <a href="#origin-content" class="sr-only focus:not-sr-only">Skip to content</a>
    <nav class="activity-rail" aria-label="Quick sections">
      <NuxtLink to="/" class="rail-link" aria-label="Origin home"><span class="mono text-[15px] font-bold tracking-[-2px] text-white">O/</span></NuxtLink>
      <div class="mt-4 flex flex-col">
        <NuxtLink v-for="p in pages.slice(0,6)" :key="p.to" :to="p.to" :title="p.label" :aria-label="p.label" class="rail-link" :class="{active:route.path===p.to}"><UIcon :name="p.icon" class="size-[17px]" /></NuxtLink>
      </div>
      <div class="mt-auto mb-3 flex flex-col">
        <NuxtLink to="/connect" class="rail-link" title="Connections"><UIcon name="i-lucide-plug" class="size-[17px]" /></NuxtLink>
        <NuxtLink to="/settings" class="rail-link" title="Settings"><UIcon name="i-lucide-settings-2" class="size-[17px]" /></NuxtLink>
      </div>
    </nav>
    <button class="mobile-scrim" :class="{'is-open':sidebar}" aria-label="Close navigation" @click="sidebar=false" />
    <aside class="origin-sidebar" :class="{'is-open':sidebar}" aria-label="Workspace navigation">
      <div class="sidebar-header"><span class="mono font-semibold">ORIGIN <span class="text-[#7d7d7d]">/ UI</span></span><UIcon name="i-lucide-chevrons-up-down" class="size-3 text-[#777]" /></div>
      <div class="p-3">
        <UButton block icon="i-lucide-search" size="sm" color="neutral" variant="outline" class="rounded-none! justify-start! border-[#333]!" @click="palette=true">
          <span class="flex w-full justify-between items-center"><span>Search</span><span class="mono muted text-[10px]">⌘K</span></span>
        </UButton>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto">
        <template v-for="g in ['Workspace','Infrastructure','System']" :key="g">
          <div class="sidebar-group">{{g}}</div>
          <nav :aria-label="g"><NuxtLink v-for="p in pages.filter(x=>x.group===g)" :key="p.to" :to="p.to" class="sidebar-navlink"><UIcon :name="p.icon" class="size-4 shrink-0" /><span>{{p.label}}</span></NuxtLink></nav>
        </template>
      </div>
      <div class="border-t border-[#2b2b2b] p-3 flex items-center gap-3"><span class="mono flex size-7 items-center justify-center border border-[#444] text-[10px]">OR</span><span><span class="text-[12px]">Design workspace</span><br><span class="muted mono text-[10px]">Frontend only</span></span></div>
    </aside>
    <main id="origin-content" class="origin-main">
      <header class="main-topbar">
        <button aria-label="Toggle navigation" class="inline-flex size-7 items-center justify-center lg:hidden" @click="sidebar=!sidebar"><UIcon name="i-lucide-panel-left" class="size-5" /></button>
        <div class="mono text-[11px] flex items-center gap-2"><span class="muted">workspace</span><span class="muted">/</span><span>{{selected.label.toLowerCase()}}</span></div>
        <div class="ml-auto flex items-center gap-3"><span class="hidden sm:inline-flex items-center gap-2 muted text-[11px]"><span class="inline-block size-1.5 bg-[#d29922]" />Integration paused</span><span class="preview-marker">DESIGN PREVIEW</span></div>
      </header>
      <div class="page-content"><slot /></div>
    </main>
    <footer class="origin-statusbar"><span class="flex items-center gap-2"><UIcon name="i-lucide-git-branch" class="size-3" />ui/nuxt · frontend-first</span><span class="flex items-center gap-3"><span class="hide-phone">Fixtures only · No cloud operations</span><span class="text-[#8cbeff]">Nuxt UI</span></span></footer>
    <div v-if="palette" class="overlay" role="presentation" @click.self="palette=false"><div class="palette" role="dialog" aria-modal="true" aria-label="Command search">
      <div class="flex items-center gap-3 p-4"><UIcon name="i-lucide-search" class="size-5 muted"/><input v-model="search" autofocus aria-label="Search pages" class="w-full bg-transparent outline-none text-[14px]" placeholder="Search pages and commands..." @keydown.enter="matches[0] && navigate(matches[0].to)"/><button class="mono muted text-[11px] border border-[#444] px-1.5" @click="palette=false">ESC</button></div>
      <div class="max-h-80 overflow-y-auto"><button v-for="p in matches" :key="p.to" class="palette-item" @click="navigate(p.to)"><UIcon :name="p.icon" class="size-4 muted" /><span>{{p.label}}</span><span class="ml-auto mono text-[11px] muted">{{p.to}}</span></button><p v-if="!matches.length" class="p-4 muted">No results</p></div>
    </div></div>
  </div>
</template>

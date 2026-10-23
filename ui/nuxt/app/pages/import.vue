<script setup lang="ts">
import { onMounted, ref } from 'vue'
const { state, hydrate, importRepository } = useOriginWorkspace()
const input = ref('')
const router = useRouter()
onMounted(hydrate)
async function submit() {
  if (!input.value.trim() || state.value.busy) return
  if (await importRepository(input.value)) await router.push('/workspace')
}
</script>
<template>
  <div class="origin-page max-w-[1000px]">
    <div class="eyebrow">WORKSPACE / SOURCE CONTROL</div>
    <h1 class="page-heading">Import repository<span class="text-white">.</span></h1>
    <p class="page-subtitle">Load real source files from a public GitHub repository into your Origin IDE workspace.</p>

    <div class="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
      <section class="border border-[#343434] bg-[#111] p-5 sm:p-7">
        <div class="flex items-center gap-3 mb-6"><UIcon name="i-simple-icons-github" class="size-6"/><div><h2 class="font-semibold text-[14px]">GitHub · public repository</h2><p class="text-[11px] muted mt-1">Read-only import, no login or token required</p></div></div>
        <form @submit.prevent="submit">
          <label for="origin-repo-url" class="block text-[12px] mb-2">Repository URL or owner/repo</label>
          <input id="origin-repo-url" v-model="input" required autocomplete="url" spellcheck="false"
            placeholder="https://github.com/owner/repository" class="ide-input !py-3 !px-3" />
          <p class="muted text-[11px] leading-5 mt-2">Only repositories publicly readable through GitHub's API are supported in this phase. Private repositories will require login and server-side OAuth.</p>
          <p v-if="state.error" role="alert" class="mt-4 ide-notice ide-error">{{ state.error }}</p>
          <div class="flex flex-wrap gap-3 mt-7">
            <button type="submit" :disabled="state.busy || !input.trim()" class="ide-primary">
              <UIcon :name="state.busy ? 'i-lucide-loader-circle' : 'i-lucide-folder-input'" class="size-4" :class="{'animate-spin':state.busy}"/>
              {{ state.busy ? 'Reading GitHub…' : 'Import into workspace' }}
            </button>
            <NuxtLink to="/workspace" class="ide-action !px-4 !py-2.5">Back to IDE</NuxtLink>
          </div>
        </form>
      </section>
      <aside class="space-y-4">
        <div class="border border-[#343434] p-5">
          <h2 class="mono uppercase text-[11px] mb-3">What actually happens</h2>
          <ol class="space-y-4 text-[12px] text-[#bdbdbd]">
            <li>01 · Confirm the GitHub repository is public</li>
            <li>02 · Fetch the default branch and text-file tree</li>
            <li>03 · Open the source file in the integrated editor</li>
            <li>04 · Save edits locally or download files</li>
          </ol>
        </div>
        <div class="source-note">
          <strong class="text-white">Not enabled yet:</strong> cloning private repositories, committing, pushing, executing scripts and cloud builds from the browser. None of those operations are simulated.
        </div>
      </aside>
    </div>
    <section v-if="state.repository" class="mt-10">
      <h2 class="section-title mb-3">Current browser workspace</h2>
      <NuxtLink to="/workspace" class="quick-item"><span>{{ state.repository.fullName }} <span class="muted mono text-[11px]">· {{ state.repository.branch }}</span></span><UIcon name="i-lucide-arrow-up-right" class="size-4"/></NuxtLink>
    </section>
  </div>
</template>

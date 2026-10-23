<script setup lang="ts">
import { ref } from 'vue'
const copied = ref(false)
const command = 'cd ui/nuxt && npm ci && npm run generate'
async function copyCommand() {
  try { await navigator.clipboard.writeText(command); copied.value = true }
  catch { copied.value = false }
}
</script>
<template>
  <div class="origin-page">
    <div class="eyebrow">WORKSPACE / BUILD</div>
    <h1 class="page-heading">Build<span class="text-white">.</span></h1>
    <p class="page-subtitle">Current AWS pipeline and verified deployment information. Builds from imported repositories are not enabled yet.</p>
    <div class="max-w-[950px] mt-9 border border-[#363636] bg-[#111]">
      <div class="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-[#303030]">
        <div><h2 class="text-[14px] font-semibold">Origin Nuxt public UI</h2><p class="mono muted text-[11px] mt-1">origin-public-ui-build-20261024</p></div>
        <span class="mono border border-[#45634a] text-[#93c99a] px-2 py-1 text-[10px]">LAST VERIFIED · SUCCEEDED</span>
      </div>
      <dl class="grid sm:grid-cols-2 gap-5 p-5 text-[12px]">
        <div><dt class="mono muted text-[10px] mb-1">Build engine</dt><dd>AWS CodeBuild · Node.js 22</dd></div>
        <div><dt class="mono muted text-[10px] mb-1">Build source</dt><dd>feat/nuxt-ui-first · ui/nuxt</dd></div>
        <div><dt class="mono muted text-[10px] mb-1">Last verified build</dt><dd>October 24, 2026 (Bangkok)</dd></div>
        <div><dt class="mono muted text-[10px] mb-1">Distribution</dt><dd>E1KJQQ9NYCQT2Y</dd></div>
      </dl>
      <div class="border-t border-[#303030] p-5">
        <h3 class="text-[12px] font-semibold mb-3">Run the frontend build locally</h3>
        <div class="flex flex-wrap items-center gap-2">
          <code class="mono text-[11px] border border-[#333] bg-[#090909] p-3 break-all flex-1">{{ command }}</code>
          <button class="ide-action" @click="copyCommand"><UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="size-4"/>{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
      </div>
      <div class="border-t border-[#303030] p-5 flex gap-3 flex-wrap">
        <a href="https://console.aws.amazon.com/codesuite/codebuild/projects?region=ap-southeast-1" target="_blank" rel="noopener noreferrer" class="ide-primary"><UIcon name="i-lucide-external-link" class="size-4"/> Open AWS CodeBuild</a>
        <a href="https://d1x9cuojzyjcbw.cloudfront.net/" target="_blank" rel="noopener noreferrer" class="ide-action !px-4 !py-2.5">View published website ↗</a>
      </div>
    </div>
    <p class="source-note max-w-[950px] mt-6">This is the last verified deployment result, not a live build monitor. The UI intentionally has no fake “Build” button. Starting arbitrary repository builds requires an authenticated job API, sandbox isolation, quotas and streamed build logs.</p>
  </div>
</template>
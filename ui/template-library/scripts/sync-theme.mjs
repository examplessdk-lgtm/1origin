import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const workspaceRoot = resolve(root, '..')
const upstream = resolve(root, 'upstream')
const templateNames = [
  'starter', 'landing', 'docs', 'saas', 'dashboard', 'chat',
  'portfolio', 'changelog', 'editor', 'calendar',
  'starter-vue', 'dashboard-vue', 'chat-vue'
]
const theme = readFileSync(join(root, 'shared/mono-neutral.css'), 'utf8').trim()
const FONT_IMPORT = '@import url("https://fonts.googleapis.com/css2?family=Geist%20Mono:wght@300;400;500;600;700;800&display=swap");'
const START = '/* ORIGIN THEME — GENERATED START: do not edit here */'
const END = '/* ORIGIN THEME — GENERATED END */'

function synchronize(file) {
  if (!existsSync(file)) throw new Error('Template stylesheet not found: ' + file)
  let css = readFileSync(file, 'utf8')
  const start = css.indexOf(START)
  if (start !== -1) {
    const end = css.indexOf(END, start)
    if (end === -1) throw new Error('Unmatched generated section: ' + file)
    css = css.slice(0, start).trimEnd() + css.slice(end + END.length)
  }
  css = css.replaceAll(FONT_IMPORT + '\n', '')
  // CSS @imports belong before custom Tailwind @theme and other CSS rules.
  const importUI = /^(@import\s+["']@nuxt\/ui["'];?)/m
  if (importUI.test(css)) {
    css = css.replace(importUI, '$1\n' + FONT_IMPORT)
  } else {
    // Fallback for the bare Vue starter CSS; must still be before regular rules.
    css = FONT_IMPORT + '\n' + css
  }
  const output = css.trimEnd() + '\n\n' + START + '\n' + theme + '\n' + END + '\n'
  writeFileSync(file, output)
  return file.replace(workspaceRoot + '/', '')
}

for (const name of templateNames) {
  const base = join(upstream, name)
  const suffix = name.endsWith('-vue') ? 'src/assets/css/main.css' : 'app/assets/css/main.css'
  console.log('THEMED', name, synchronize(join(base, suffix)))
}

// The existing standalone Origin preview also consumes the same design tokens.
// Keep its layout intact; actual demo app routes and cloud integrations are not changed.
console.log('THEMED preview', synchronize(join(workspaceRoot, 'nuxt/app/assets/css/main.css')))

// Keep the interactive Origin catalog synchronized with the canonical manifest.
copyFileSync(join(root, 'catalog.json'), join(workspaceRoot, 'nuxt/app/data/catalog.json'))
console.log('SYNCED catalog.json')

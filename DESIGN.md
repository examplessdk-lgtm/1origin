---
name: Origin
description: A deployment console drawn as a dark editor shell.
colors:
  ground: "#0e0e0e"
  sidebar: "#0a0a0a"
  raised: "#161616"
  line: "#2a2a2a"
  ink: "#e8e8e8"
  muted: "#8b8b8b"
  focus: "#4c9aff"
  focus-ink: "#061018"
  selection: "#16325c"
  pass: "#3fb950"
  fail: "#f85149"
  wait: "#d29922"
typography:
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  title:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  status:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
components:
  button-primary:
    backgroundColor: "{colors.focus}"
    textColor: "{colors.focus-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "#79b6ff"
    textColor: "{colors.focus-ink}"
    rounded: "{rounded.none}"
    height: "32px"
  button-ghost:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "32px"
  input:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 8px"
    height: "32px"
---

## Overview

**Creative North Star: "The open session."**

Origin is the console, already open. The first screen is an editor buffer named session.origin, with sample deploy output beside it and a status bar under it. The visitor does not pass through a marketing hero.

**Key Characteristics:**

- Charcoal editor ground, a darker rail and sidebar, and 1px hairlines.
- Electric blue only for the caret, focus, selection, and the primary action.
- Green, red, and amber only for deploy and log state.
- Monospace for identifiers, logs, and the status bar. Public Sans for the UI.
- Sharp corners. No glow, no glass, no card grid.

## Colors

The shell is two charcoals. `{colors.ground}` is the editor. `{colors.sidebar}` is the rail, sidebar, tabs, and status bar. `{colors.raised}` is the hover row. `{colors.line}` is every hairline.

`{colors.ink}` is body text. `{colors.muted}` is secondary text and must stay at least #8b8b8b on these grounds.

**The State Rule.** Color carries status. Ready is `{colors.pass}`, failed is `{colors.fail}`, building and queued are `{colors.wait}`. Blue is focus, not a fourth status.

## Typography

Public Sans at 13px is the UI. Titles are 15px medium. JetBrains Mono is for keys, deploy ids, logs, and the status bar. Do not set marketing display type.

## Layout

The shell is a column: activity rail (48px), sidebar (240px, collapsed under 768px), editor, status bar (28px). The editor is the scrollport. At 390px the sidebar is an overlay and tables become stacked rows. Nothing scrolls the document itself.

## Elevation & Depth

Depth comes from the ground shift and hairlines. The command palette is the one shadow: `0 16px 40px rgb(0 0 0 / 0.45)`. It has a vertical offset and a neutral blur.

## Shapes

**The Square Rule.** Corner radius is 0. Status marks are squares. Focus is a 1px inset outline in `{colors.focus}`, and a 1px ink outline on the blue button.

## Components

The primary button is "Open console": blue fill, dark text, 32px tall, 44px on the entry at a narrow width. Ghost buttons are hairline borders. The command palette is a listbox opened with Ctrl or Cmd K. Rows highlight with `{colors.selection}`.

## Do's and Don'ts

- Do label fixtures as sample data.
- Do keep the AWS Singapore plan in the future tense until an account is connected.
- Do keep focus visible.
- Don't print the AWS account id.
- Don't invent customers, prices, or benchmarks.
- Don't round the shell into cards, add glow, or cover the ground with glass.

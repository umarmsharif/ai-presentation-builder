# ai-presentation-builder

A Claude skill that turns a brief into a consulting-grade presentation: diagnostics, recommendations, roadmaps, market-entry analyses, board briefings, pitches. It ships as editable PowerPoint, HTML, or Markdown.

Most AI deck tools give you generic, slop-looking slides: cream backgrounds, one font everywhere, accent bars down the side, the same three-bullet framework on every slide. This one is built against an anti-slop catalogue. It interviews you, structures the narrative on a cheap "ghost deck" before drafting a single slide, picks the right layout for each slide's job, and builds a real file you can open in PowerPoint or Google Slides and keep editing.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/workflow-dark.png">
  <img alt="Pipeline: brief, ghost deck (you approve), pattern pick, build, QA loop, flight-check (you approve), ship as PPTX / HTML / MD" src="assets/workflow.png" width="100%">
</picture>

## What it does

- **Briefs before building.** Two quick rounds of questions fix the audience, the goal, the archetype, the theme, and the headline font. Nothing gets drawn until the brief is set.
- **Structures on the cheap version first.** It emits a ghost deck (every slide's action title, breadcrumb, and chosen layout as a table) and gets your sign-off before drafting any body content. Throwing away ten titles is faster than throwing away ten finished slides.
- **Picks the layout that fits the slide's job.** A 40+ pattern library, tagged by role (compare, decompose, rank, sequence, show-change, narrow) and arrangement, plus a filter that surfaces only the patterns that suit your archetype.
- **Builds real, editable slides.** A Node/pptxgenjs pipeline writes the file. Bars are hand-drawn so they survive the PowerPoint to Google Slides round-trip. Charts follow honesty rules: no 3D, y-axis at zero, label lines direct, logical bar order.
- **Reviews before it ships.** A render-and-look QA loop plus a static slop linter, and an optional pre-flight gate via the sibling [flight-check](https://github.com/analystacademy/flight-check) skill.

## The design system

Every deck picks one of **eight curated themes**, each a complete, taste-vetted palette (ground, neutrals, accent, default font), not just an accent on a fixed ground:

- **Light:** Bright White & Pine (default), Slate, Oxblood, Solarized, Paper, Mono.
- **Dark:** Ink (cool charcoal), Midnight (navy and gold).
- **Fonts:** eight vetted display faces. Charter (default), Palatino, Iowan Old Style, Baskerville, Hoefler Text, Cochin, Optima, Manrope Bold (all-sans). Body is always Manrope; pick any per deck.

What's locked is *taste*, not one look. Every theme is one accent, cohesive neutrals, and emphasis by weight, hairline, and whitespace, with no dark-mode glow, no generic cream, no rainbow, and no gradient. The two dark themes are deliberately designed, not inverted defaults. For brand-locked work, supply a hex to override the chosen theme's accent. Full token sets and the dark-theme semantics live in [`references/design_system.md`](references/design_system.md).

`assets/reference-build.js` is a complete, render-tested worked example. Run it to see the system:

```bash
npm install
npm run example          # writes reference-build.pptx
```

## Requirements

- **Node.js** (18+) and **pptxgenjs** (`npm install`): needed to build the file.
- **LibreOffice** (`soffice`): optional, enables the render-to-PNG QA loop. Without it, the deck still builds; you just QA the file directly.
- **Fonts:** the theme display faces (Charter, Palatino, Iowan Old Style, Baskerville, Hoefler Text, Cochin, Optima) plus Manrope render best when installed. The build falls back gracefully if they are not.

## Install

**Claude Code**

```bash
git clone https://github.com/<your-username>/ai-presentation-builder.git ~/.claude/skills/ai-presentation-builder
cd ~/.claude/skills/ai-presentation-builder && npm install
```

Restart Claude Code (skills load at session start). Trigger it with "build me a deck", "make a strategy presentation", "turn this into a board deck", or just by describing a consulting deliverable.

**claude.ai / Claude Desktop / Cowork**

1. Download `ai-presentation-builder.zip` (or zip this folder yourself).
2. In Claude, open **Settings → Capabilities → Skills** and upload the zip.
3. Start a chat and describe the deck you want. The skill activates on the same trigger phrases.

In any environment with code execution (Claude Code, Cowork, claude.ai with the analysis tool), the full build pipeline runs. In a plain chat with no code execution, the skill still does the valuable thinking: it produces the ghost-deck outline and a per-slide spec you can render in PowerPoint, Google Slides, or Gamma.

## Usage

Describe what you need, at any level of roughness:

- "A diagnostic deck on why our activation is stalling, for the board, 10 slides."
- "Turn these notes into a market-entry recommendation."
- "Pitch deck for our seed round."

The skill asks the brief questions, shows you the ghost deck, and builds once you approve the structure. Ask for "variations" on any slide to see two or three layout treatments side by side.

## What's inside

```
ai-presentation-builder/
├── SKILL.md                         # the workflow: brief, ghost deck, build, QA, flight-check
├── assets/
│   ├── inputs.example.json          # the deck schema, worked example
│   └── reference-build.js           # complete render-tested pptxgenjs exemplar (theme-driven)
├── scripts/
│   ├── pattern_filter.js            # surfaces archetype-eligible patterns
│   ├── deck_qa.js                   # static anti-slop linter
│   └── check_titles.js              # action-title checker
├── references/
│   ├── design_system.md             # 8 curated themes: palettes, type, anatomy, semantic tokens
│   ├── slide_patterns.md            # the pattern catalogue + universal conventions
│   ├── build-helpers.md             # pptxgenjs recipes for every pattern + gotchas
│   ├── anti-slop.md                 # the AI-tell catalogue mapped to deck relevance
│   ├── chart-selection-guide.md     # message to chart-type mapping
│   ├── chart-library/               # 6 distilled chart patterns + design rules
│   ├── visual-primitives/           # 11 render-tested diagram primitives + previews
│   ├── methodology/                 # content interview, QA checklist, slide-type canon
│   ├── slide-job-to-layout.md       # traceable pattern selection
│   └── raci-guidance.md             # role-ownership slide guidance
├── package.json
├── LICENSE
└── README.md
```

## Compatibility

- **AskUserQuestion:** used for the brief and the ghost-deck gate. Where it is unavailable, the same questions are asked inline.
- **Code execution + Node/pptxgenjs:** required for the full file build. Without it, the skill degrades to the ghost-deck outline plus a per-slide spec.
- **LibreOffice/soffice:** optional, for the render-QA loop.

## Pairs with

- [flight-check](https://github.com/analystacademy/flight-check): the pre-delivery review gate. Build here, review there, ship after both pass.

## License

MIT © 2026 Umar Sharif. See [LICENSE](LICENSE). Use it, fork it, adapt it.

Charts and patterns are distilled from public consulting work for design study; build every chart from your own data. See `references/chart-library/SOURCES.md`.

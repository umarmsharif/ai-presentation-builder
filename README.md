# strategy-deck-builder

A Claude skill that builds consulting-grade strategy decks — diagnostics, recommendations, roadmaps, market-entry analyses, board briefings, pitches — and renders them as editable PowerPoint.

Most AI deck tools give you generic, slop-looking slides: cream backgrounds, one font everywhere, accent bars down the side, the same three-bullet framework on every slide. This one is built against an anti-slop catalogue. It interviews you, structures the narrative on a cheap "ghost deck" before drafting a single slide, picks the right layout for each slide's job, and builds a real `.pptx` you can open in PowerPoint or Google Slides and keep editing.

## What it does

- **Briefs before building.** Two quick rounds of questions fix the audience, the goal, the archetype, the colour, and the headline font. Nothing gets drawn until the brief is set.
- **Structures on the cheap version first.** It emits a ghost deck — every slide's action title, breadcrumb, and chosen layout as a table — and gets your sign-off before drafting any body content. Throwing away ten titles is faster than throwing away ten finished slides.
- **Picks the layout that fits the slide's job.** A 30+ pattern library, tagged by role (compare, decompose, rank, sequence, show-change, narrow) and arrangement, plus a filter that surfaces only the patterns that suit your archetype.
- **Builds real, editable slides.** A Node/pptxgenjs pipeline writes the `.pptx`. Bars are hand-drawn so they survive the PowerPoint → Google Slides round-trip. Charts follow honesty rules (no 3D, y-axis at zero, label lines direct, logical bar order).
- **Reviews before it ships.** A render-and-look QA loop plus a static slop linter, and an optional pre-flight gate via the sibling [flight-check](https://github.com/analystacademy/flight-check) skill.

## The design system — v5 Bright White & Pine

One bright near-white ground (`FCFCFA`), one deep-pine accent (`12564A`), espresso-ink text, a per-deck display serif (default Charter) paired with a Manrope body. Emphasis comes from type weight, hairlines, and whitespace, never from a coloured bar down one edge. It was built to strip the patterns that now read as AI-design tells: warm cream grounds, a single font, eyebrow pills, oversized section numerals.

`assets/reference-build.js` is a complete, render-tested worked example. Run it to see the system:

```bash
npm install
npm run example          # → reference-build.pptx
```

## Requirements

- **Node.js** (18+) and **pptxgenjs** (`npm install`) — needed to build the `.pptx`.
- **LibreOffice** (`soffice`) — optional, enables the render-to-PNG QA loop. Without it, the deck still builds; you just QA the `.pptx` directly.
- **Fonts** — Charter and Manrope render best when installed. The build falls back gracefully if they are not.

## Install

**Claude Code**

```bash
git clone https://github.com/<your-username>/strategy-deck-builder.git ~/.claude/skills/strategy-deck-builder
cd ~/.claude/skills/strategy-deck-builder && npm install
```

Restart Claude Code (skills load at session start). Trigger it with "build me a deck", "make a strategy presentation", "turn this into a board deck", or just by describing a consulting deliverable.

**claude.ai / Claude Desktop / Cowork**

1. Download `strategy-deck-builder.zip` (or zip this folder yourself).
2. In Claude, open **Settings → Capabilities → Skills** and upload the zip.
3. Start a chat and describe the deck you want. The skill activates on the same trigger phrases.

In any environment with code execution (Claude Code, Cowork, claude.ai with the analysis tool), the full build pipeline runs. In a plain chat with no code execution, the skill still does the valuable thinking — it produces the ghost-deck outline and a per-slide spec you can render in PowerPoint, Google Slides, or Gamma.

## Usage

Describe what you need, at any level of roughness:

- "A diagnostic deck on why our activation is stalling, for the board, 10 slides."
- "Turn these notes into a market-entry recommendation."
- "Pitch deck for our seed round."

The skill asks the brief questions, shows you the ghost deck, and builds once you approve the structure. Ask for "variations" on any slide to see two or three layout treatments side by side.

## What's inside

```
strategy-deck-builder/
├── SKILL.md                         # the workflow: brief → ghost deck → build → QA → flight-check
├── assets/
│   ├── inputs.example.json          # the deck schema, worked example
│   └── reference-build.js           # complete render-tested pptxgenjs exemplar
├── scripts/
│   ├── pattern_filter.js            # surfaces archetype-eligible patterns
│   ├── deck_qa.js                   # static anti-slop linter
│   └── check_titles.js              # action-title checker
├── references/
│   ├── design_system.md             # v5 Bright White & Pine: palette, type, anatomy
│   ├── slide_patterns.md            # the pattern catalogue + universal conventions
│   ├── build-helpers.md             # pptxgenjs recipes for every pattern + gotchas
│   ├── anti-slop.md                 # the AI-tell catalogue mapped to deck relevance
│   ├── chart-selection-guide.md     # message → chart-type mapping
│   ├── chart-library/               # 6 distilled chart patterns + design rules
│   ├── methodology/                 # content interview, QA checklist, slide-type canon
│   ├── slide-job-to-layout.md       # traceable pattern selection
│   └── raci-guidance.md             # role-ownership slide guidance
├── package.json
├── LICENSE
└── README.md
```

## Compatibility

- **AskUserQuestion** — used for the brief and the ghost-deck gate. Where it is unavailable, the same questions are asked inline.
- **Code execution + Node/pptxgenjs** — required for the full `.pptx` build. Without it, the skill degrades to the ghost-deck outline + per-slide spec.
- **LibreOffice/soffice** — optional, for the render-QA loop.

## Pairs with

- [flight-check](https://github.com/analystacademy/flight-check) — the pre-delivery review gate. Build here, review there, ship after both pass.

## License

MIT © 2026 Umar Sharif. See [LICENSE](LICENSE). Use it, fork it, adapt it.

Charts and patterns are distilled from public consulting work for design study; build every chart from your own data. See `references/chart-library/SOURCES.md`.

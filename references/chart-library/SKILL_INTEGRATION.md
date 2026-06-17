# Skill integration — `/strategy-deck-builder` + chart-library

This file is the snippet to merge into `strategy-deck-builder/SKILL.md` so the skill consults the chart catalog whenever it generates a chart.

---

## Where to put the chart-library folder

Drop the entire `chart-library/` folder inside the strategy-deck-builder skill directory:

```
strategy-deck-builder/
├── SKILL.md                ← edit this (see below)
├── ... (existing skill files) ...
└── chart-library/          ← drop in as-is
    ├── README.md
    ├── inventory.json
    ├── url-discovery.json
    ├── SOURCES.md
    ├── SKILL_INTEGRATION.md  ← this file (can delete after merge)
    └── patterns/
        ├── 00-shared-design-rules.md
        ├── 01-horizontal-bar-with-delta.md
        ├── 02-dual-panel-bar.md
        ├── 03-stacked-bar.md
        ├── 04-line-with-annotations.md
        ├── 05-combined-bar-and-line.md
        └── 06-small-multiples.md
```

---

## Snippet to add into `SKILL.md`

Insert the section below into `strategy-deck-builder/SKILL.md`, ideally right after your existing layout/typography rules and before the "Generate the deck" execution step.

```markdown
## Chart generation — McKinsey-styled, editable charts

This skill includes a chart pattern library at `chart-library/`. Use it whenever a slide needs a chart (not just a logo or photo).

### Workflow

1. **Read the shared rules first.** Before generating any chart, read `chart-library/patterns/00-shared-design-rules.md`. These rules apply to every chart: headline conventions, color palette, typography, source-line format, annotation philosophy.

2. **Pick the closest pattern.** Match the data shape to one of the six patterns:

   | If the data is... | Use pattern |
   |---|---|
   | Ranking categorical items by one metric (5–12 bars) | `01-horizontal-bar-with-delta.md` |
   | Same categories shown as absolute AND relative values | `02-dual-panel-bar.md` |
   | Composition / mix across categories or over time | `03-stacked-bar.md` |
   | Continuous time series with 1–4 lines | `04-line-with-annotations.md` |
   | Two related metrics on different scales (count + rate) | `05-combined-bar-and-line.md` |
   | Same chart structure across 3–9 categories | `06-small-multiples.md` |

   If unsure, look at `inventory.json` and find an entry whose `chart_type` and `dimensions_mentioned` match what you're building. The headline + accessibility description in that entry are real-world examples.

3. **Read the chosen pattern file in full.** Each pattern file has: when to use, anatomy diagram, design rules, python-pptx recipe, headline templates, source-line format, and "when NOT to use" guardrails.

4. **Generate the chart with python-pptx using the recipe.** Treat the python-pptx code in each pattern file as a starting point — adapt to your slide dimensions and the user's brand colors. The default palette is McKinsey deep blue; if the user has supplied a brand color, swap the primary while preserving value relationships (one strong primary, one muted comparison, one accent for emphasis).

5. **Headline + subhead + source as separate textboxes.** Do NOT use chart.has_title or chart.has_legend defaults — they don't render the way McKinsey does. Build the headline (32-40pt bold), optional subhead (18-22pt), and source line (8-9pt italic gray) as separate textboxes positioned around the chart frame.

6. **Annotation discipline.** If the chart has 5+ data points but the story is about 1 of them, only annotate that one. Use the accent color for the story bar/point and primary color for everything else. Don't rainbow-color categories.

### Brand color override

The default chart-library palette is McKinsey deep blue `#051C2C`. To swap to the user's brand color:

- Replace deep blue with the brand primary throughout the recipe.
- Generate accent colors by lightening the primary (50% saturation, then 75%) for stacked-bar sequential palettes.
- Keep gray `#9FA8B8` and white `#FFFFFF` for neutrals — those don't change.

The strategy-deck-builder default brand colour is **v5 pine `12564A`**. Use that unless the user overrides.

### Source-line discipline

Every chart MUST have a source line. If the user didn't provide one, ask before rendering. Format:

```
Source: [Specific dataset / report name], [Year]; [Secondary source if applicable]
```

If you used a McKinsey insight as the data origin, cite "McKinsey & Company, [report name], [year]" — never strip attribution.

### Copyright guardrail

The chart-library catalog references McKinsey chart images (URLs in `inventory.json`) for *pattern study only*. Never:
- Embed McKinsey's chart images into a generated deck.
- Copy specific McKinsey numbers/data into a chart unless the user is explicitly building a "based on McKinsey research" slide and citing it as such.
- Reproduce McKinsey's exact headline wording — paraphrase to fit the user's voice.

The library teaches *how* to build a chart, not *what to put in one*.
```

---

## Optional: a chart-picker subagent

If you want to make pattern selection more reliable, add this prompt as a subagent inside the skill:

```
Given a description of the data and the story:
1. Read chart-library/inventory.json
2. Read chart-library/patterns/00-shared-design-rules.md
3. Pick the single best pattern (01-06) and explain in 2 sentences why
4. Read that pattern's full .md file
5. Generate the python-pptx code

Return: { "pattern": "0X-name", "reasoning": "...", "code": "..." }
```

But for v1, keeping it inline in SKILL.md works fine.

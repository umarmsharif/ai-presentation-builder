# McKinsey Chart Library

A pattern catalog distilled from McKinsey's "Week in Charts" column. Plugged into `/strategy-deck-builder` so the skill can generate **original, editable** python-pptx charts in McKinsey's visual style.

## What's in here

```
chart-library/
├── README.md             ← this file
├── inventory.json        ← structured catalog of source chart entries
├── url-discovery.json    ← canonical URLs the inventory was built from
├── SOURCES.md            ← citation list + copyright note
├── SKILL_INTEGRATION.md  ← snippet to merge into strategy-deck-builder/SKILL.md
└── patterns/             ← reusable chart pattern specs
    ├── 01-horizontal-bar-with-delta.md
    ├── 02-dual-panel-bar.md
    ├── 03-stacked-bar.md
    ├── 04-line-with-annotations.md
    ├── 05-combined-bar-and-line.md
    └── 06-small-multiples.md
```

## How the skill uses this

When `/strategy-deck-builder` needs to generate a chart, it consults `inventory.json` to find the closest pattern match for the data shape, then loads the corresponding `patterns/*.md` to get the python-pptx recipe, headline conventions, color rules, and source-line format.

The chart is built **from scratch** using python-pptx. McKinsey's chart images are NOT embedded — they are reference only.

## Coverage

41 chart entries indexed (Nov 2025 — Apr 2026). 15 fully extracted with chart-type taxonomy and key numbers; 26 placeholders for top-up extraction in future sessions.

## Copyright

All chart content © McKinsey & Company. This library is for personal pattern study. Charts produced by your skill must be original work using your own data — they should be McKinsey-*styled*, never McKinsey-*copied*.

See `SOURCES.md` for the full citation list.

# Pattern 02 — Dual-panel bar chart (absolute | relative)

## When to use

- You need to show **both** the absolute size and the relative impact of the same categories.
- Classic McKinsey insight pattern: "the biggest by absolute size is NOT the highest by % — and that disconnect is the story."
- The catalog's "How scaling care can reduce disease burden" is the canonical example: left panel = billions of DALYs (absolute disease burden), right panel = % of burden avertable through interventions.

## Catalog examples

- "How scaling care can reduce disease burden" (2026-04-23) — dual horizontal bar, DALYs | % avertable
- "Agentic AI adventures" (2025-11-20) — pair of stacked bars
- Used roughly in 8 of 15 fully extracted entries when including pair/dual variants

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│ How scaling care can reduce disease burden                   │
│                                                              │
│  Disease burden by 2050           % avertable through        │
│  (billions of DALYs)              known interventions        │
│                                                              │
│  Cardiovascular   ███████ 5      Chronic resp.    ████ 57%   │
│  Cancers          ████ 3         Maternal/neonatal ███ 51%   │
│  Musculoskeletal  ██ 2           Mental disorders ███ 47%    │
│  Mental disorders █ 1.5          Cardiovascular   ██ 44%     │
│  ...                             ...                         │
│                                                              │
│  Source: Global Burden of Disease Database, IHME, 2021       │
└──────────────────────────────────────────────────────────────┘
```

## Critical design rules

1. **Each panel gets its own descriptive sublabel**, not a chart title. Place above each panel in 12–14pt.
2. **Sort orders may differ between panels** — the visual disconnect is the insight. Don't force the same order. (In the disease-burden chart, cardio is #1 absolute but #4 by avertability.)
3. **Same color across both panels** unless one panel highlights an inverted insight.
4. **Same number of categories on both** — if a row exists on the left, it exists on the right.
5. **Equal panel widths**. Don't squish one to give the other more room.

## python-pptx recipe (multi-shape approach)

python-pptx doesn't natively render dual-panel bars in one chart object. Build it as two side-by-side bar charts:

```python
# Panel 1 (left) — absolute values
chart1 = slide.shapes.add_chart(
    XL_CHART_TYPE.BAR_CLUSTERED,
    Inches(0.5), Inches(2.0), Inches(6.0), Inches(4.5),
    panel1_data,
).chart

# Panel 2 (right) — percentage values
chart2 = slide.shapes.add_chart(
    XL_CHART_TYPE.BAR_CLUSTERED,
    Inches(6.8), Inches(2.0), Inches(6.0), Inches(4.5),
    panel2_data,
).chart

# Style both identically (helper function recommended)
for c in (chart1, chart2):
    style_mckinsey_bar(c)  # see pattern 01

# Sublabels above each panel — separate textboxes
add_panel_label(slide, "Disease burden by 2050 (billions of DALYs)",
                Inches(0.5), Inches(1.6), Inches(6.0), Inches(0.4))
add_panel_label(slide, "% avertable through known interventions",
                Inches(6.8), Inches(1.6), Inches(6.0), Inches(0.4))
```

## Headline conventions

- The headline frames the *connection* between the two panels, not either panel alone.
- "How scaling care can reduce disease burden" — the bridge is "scaling care" (the right panel) reducing "disease burden" (the left panel).
- "Where [thing] is biggest vs. where it's most fixable"
- "[Big absolute] doesn't mean [biggest opportunity]"

## Source line — combined

Both panels typically share one source line below them, spanning the full chart width.

## When NOT to use this pattern

- If both panels would say the same thing (just doubled-up data) → just use pattern 01.
- If the panels are fundamentally different metric types and don't share a category list → split into two slides.

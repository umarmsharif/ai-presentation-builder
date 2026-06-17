# Pattern 06 — Small multiples (same chart, repeated for different categories)

## When to use

- You have the *same metric structure* across 3–9 different categories (regions, segments, industries, time periods, scenarios) and want to compare them visually.
- Story is "the pattern varies — and the variation is the point."
- The catalog calls these "set of 3 bar charts", "series of area charts", "pair of treemap charts".

## Catalog examples

- "The new age of geoeconomics" (2025-11-24) — set of 3 bar charts
- "Balancing the global books" (2025-12-09) — series of area charts
- "Mining for resilience" (2025-12-11) — pair of treemap charts
- "The AI price is right" (2025-11-11) — pair of tree map charts

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│ The new age of geoeconomics                                  │
│                                                              │
│  Trade flows by region                                       │
│                                                              │
│  US                  EU                 APAC                 │
│  ┌─────────┐         ┌─────────┐        ┌─────────┐          │
│  │█        │         │██       │        │████     │          │
│  │██       │         │███      │        │█████    │          │
│  │████     │         │█████    │        │██████   │          │
│  │██████   │         │███████  │        │████████ │          │
│  └─────────┘         └─────────┘        └─────────┘          │
│   2010 → 2025         2010 → 2025         2010 → 2025         │
│                                                              │
│  Source: World Trade Organization, McKinsey analysis 2025    │
└──────────────────────────────────────────────────────────────┘
```

## Critical design rules

1. **Identical scale across all panels.** This is non-negotiable. The whole point of small multiples is that the eye compares panel-to-panel, which requires the same y-axis scale on every panel.
2. **Identical chart type and style** on every panel. No mixing bars in one and lines in another.
3. **Each panel gets a short, plain category label** above or below it. No headlines on individual panels.
4. **3, 4, 6, or 9 panels** — grid layouts. 5 looks awkward. 7 means combine two into "Other" and use 6.
5. **Annotate one panel's data point** if there's a single insight that anchors the comparison; otherwise let the visual variation speak.
6. **Single shared color** for the same series across panels (don't make US blue and EU green — they're the same metric).

## Variants

- **Sparklines**: tiny line charts in a grid, useful for dashboards.
- **Tree map grid**: when each panel itself is a hierarchical breakdown.
- **Time-faceted multiples**: same chart for 2010, 2020, 2025 — showing change.

## python-pptx recipe

```python
# Build N parallel charts with shared scale
panels = ['US', 'EU', 'APAC']
panel_data = {
    'US':   ('2010 share', 'Today'),
    'EU':   ('2010 share', 'Today'),
    'APAC': ('2010 share', 'Today'),
}
panel_values = {
    'US':   (28, 18),
    'EU':   (22, 17),
    'APAC': (15, 35),
}

# Determine shared axis maximum across all panels
max_y = max(max(v) for v in panel_values.values()) * 1.15

# Layout: 3 panels evenly spaced
panel_width = 3.5
panel_height = 3.5
gap = 0.3
start_x = 1.0
y = 2.0

for i, panel in enumerate(panels):
    cd = CategoryChartData()
    cd.categories = panel_data[panel]
    cd.add_series('share', panel_values[panel])

    chart = slide.shapes.add_chart(
        XL_CHART_TYPE.COLUMN_CLUSTERED,
        Inches(start_x + i * (panel_width + gap)),
        Inches(y),
        Inches(panel_width),
        Inches(panel_height),
        cd,
    ).chart

    # Force shared scale
    chart.value_axis.maximum_scale = max_y
    chart.value_axis.minimum_scale = 0

    # Style consistently
    style_mckinsey_bar(chart)  # the same helper used for pattern 01
    chart.has_legend = False

    # Panel label as separate textbox above the chart
    add_panel_label(
        slide, panel,
        Inches(start_x + i * (panel_width + gap)),
        Inches(y - 0.4),
        Inches(panel_width), Inches(0.3),
    )
```

## Headline conventions

- Names what *varies* across the panels — implicitly inviting the reader to compare.
- "The new age of geoeconomics" (the panels are regions, the headline names the era).
- "Where [X] is fastest / slowest / steadiest"
- "[Trend] by [dimension]"

## When NOT to use this pattern

- If 1 panel would tell the whole story → just show 1.
- If the panels' axis ranges differ dramatically (e.g., one country is 100x another) → use indexed values or a log scale, OR break apart into separate slides.
- If you have 10+ categories → use a heatmap grid instead.

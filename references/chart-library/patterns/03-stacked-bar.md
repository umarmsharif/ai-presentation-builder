# Pattern 03 — Stacked bar chart (composition over categories)

## When to use

- Showing how a total breaks down into parts — and how the *composition* shifts across categories or over time.
- Categories have subcategories that sum to 100% (or to a meaningful total).
- Useful when the story is "the mix is changing" rather than "the total is changing".

## Catalog examples

- "Following payments' paths" (2025-11-18) — stacked bar of payment flows
- "Agentic AI adventures" (2025-11-20) — pair of stacked bars
- "Future fuels and forces" (2025-11-25) — energy mix breakdown

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ Following payments' paths                                │
│                                                          │
│  100%                                                    │
│     ┌───┬───┬───┬───┐                                    │
│     │██ │██ │██ │██ │   Cards         ← legend top-right │
│     │▒▒ │▒▒ │▒▒ │▒▒ │   Account       │                 │
│     │░░ │░░ │░░ │░░ │   Cash          │                 │
│  0% └───┴───┴───┴───┘   Other         │                 │
│      US   EU   APAC LATAM                               │
│                                                          │
│  Source: McKinsey Global Payments Report 2025            │
└──────────────────────────────────────────────────────────┘
```

## Critical design rules

1. **Stack from bottom up in importance order** — the segment that's the story goes at the bottom (anchored to baseline) so the eye can compare its size across categories cleanly.
2. **Limit to 4–5 segments per bar.** If you have 8 categories, group the bottom 3–4 into "Other".
3. **Use a sequential or 2-tone palette** — not 5 unrelated colors. Each segment gets a distinct shade, but they should feel related.
4. **Data labels inside each segment** when there's room (white text). Otherwise external labels via callout lines for small segments.
5. **No stacked 100% with 10 categories** — it becomes unreadable. Cap at 6.

## Variants

1. **Absolute stacked** — total height varies by category (the totals also tell a story).
2. **100% stacked** — every bar is the same height; only the mix matters.
3. **Diverging stacked** — positive segments above zero, negative below (good for "agree/disagree" survey scales).

## python-pptx recipe

```python
from pptx.enum.chart import XL_CHART_TYPE

chart_data = CategoryChartData()
chart_data.categories = ['US', 'EU', 'APAC', 'LATAM']
chart_data.add_series('Cards',   (45, 35, 28, 40))
chart_data.add_series('Account', (30, 40, 35, 25))
chart_data.add_series('Cash',    (15, 15, 25, 25))
chart_data.add_series('Other',   (10, 10, 12, 10))

chart = slide.shapes.add_chart(
    XL_CHART_TYPE.COLUMN_STACKED_100,   # or COLUMN_STACKED for absolute
    Inches(1.0), Inches(2.0), Inches(11.0), Inches(4.5),
    chart_data,
).chart

# Series colors — one base + decreasing saturation (sequential palette)
palette = [
    RGBColor(0x05, 0x1C, 0x2C),  # darkest — biggest segment / story segment
    RGBColor(0x22, 0x51, 0xFF),
    RGBColor(0x71, 0xD2, 0xFF),
    RGBColor(0x9F, 0xA8, 0xB8),  # neutral gray for "Other"
]
for series, color in zip(chart.series, palette):
    series.format.fill.solid()
    series.format.fill.fore_color.rgb = color

# Data labels — white inside dark segments
chart.plots[0].has_data_labels = True
dl = chart.plots[0].data_labels
dl.font.size = Pt(10)
dl.font.bold = True
dl.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
dl.number_format = '0"%"'

# Legend at top
chart.has_legend = True
chart.legend.position = XL_LEGEND_POSITION.TOP
chart.legend.include_in_layout = False
chart.legend.font.size = Pt(11)
```

## Headline conventions

- "[Mix] is shifting" / "Where [composition] is changing"
- "Following payments' paths" — the verb "following" implies tracing the mix across markets
- Avoid "Breakdown of X" (label, not insight)

## When NOT to use this pattern

- If only one segment matters → use a single bar / pattern 01.
- If the categories are continuous time → use stacked area (a different pattern, not in v1 catalog).
- If you have 8+ subcategories and can't aggregate → use a heatmap instead.

# Pattern 04 — Line chart with annotations (trend with the punchline marked)

## When to use

- Time series. Continuous metric over months/years/quarters.
- The story is **a turning point, an inflection, or a divergence** — and you want the chart to point at it explicitly.
- 1–4 lines max. More than that becomes a spaghetti chart.

## Catalog examples

- "European productivity revival plan" (2025-11-06) — line chart of productivity gap
- "AI at work but not at scale" (2025-12-10) — line graph of adoption rate
- "Balancing the global books" (2025-12-09) — series of area charts (a related pattern)

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ AI at work but not at scale                              │
│                                                          │
│  % using AI weekly                                       │
│  60                                       Workers        │
│  50                              ___..--""               │
│  40                  ___..--""""        ◯ 47% (2025)     │
│  30      ___..--""""               ___..-- Companies     │
│  20  ___------                __--""                     │
│  10      Companies      __---"        ◯ 23% (2025)       │
│   0  ────────────────────────────────                    │
│      2020  2021  2022  2023  2024  2025                  │
│                                                          │
│  Source: McKinsey State of AI Survey 2025                │
└──────────────────────────────────────────────────────────┘
```

## Critical design rules

1. **Annotate the endpoint** with the latest value, not "Series A" / "Series B" labels. The number is the answer.
2. **Color = data weight**. The "story" line in dark/saturated. Comparison lines in muted gray.
3. **No markers unless data is sparse** (< 10 points). Solid lines only for continuous data.
4. **Y-axis baseline at 0** unless a non-zero baseline is required (e.g., financial returns where 0 is artificial). Don't truncate to inflate visual change.
5. **Add a vertical reference line** at major events (recessions, policy changes, COVID) with a tiny annotation.
6. **No gridlines** — or extremely faint ones. Let the trend speak.

## Variants

1. **Single line** — clean, no comparison.
2. **2–4 line comparison** — different segments tracked over the same window.
3. **Indexed (= 100)** — when scales differ, normalize to a base year.
4. **Area chart** — when the story is "total volume over time" (use sparingly).

## python-pptx recipe

```python
from pptx.enum.chart import XL_CHART_TYPE

chart_data = CategoryChartData()
chart_data.categories = ['2020', '2021', '2022', '2023', '2024', '2025']
chart_data.add_series('Workers',   (15, 22, 30, 36, 42, 47))
chart_data.add_series('Companies', (5, 8, 11, 14, 18, 23))

chart = slide.shapes.add_chart(
    XL_CHART_TYPE.LINE,
    Inches(1.0), Inches(2.0), Inches(11.0), Inches(4.5),
    chart_data,
).chart

# Style each series
story_color = RGBColor(0x05, 0x1C, 0x2C)   # deep blue — the lead
quiet_color = RGBColor(0x9F, 0xA8, 0xB8)   # gray — the comparison

for i, series in enumerate(chart.series):
    line = series.format.line
    line.color.rgb = story_color if i == 0 else quiet_color
    line.width = Pt(2.5) if i == 0 else Pt(2.0)

# No legend — annotate endpoints instead with separate textboxes
chart.has_legend = False

# Axes — minimal
chart.value_axis.format.line.fill.background()  # remove vertical axis line
chart.value_axis.major_gridlines.format.line.color.rgb = RGBColor(0xE5, 0xE7, 0xEB)
chart.value_axis.tick_labels.font.size = Pt(10)
chart.category_axis.tick_labels.font.size = Pt(10)

# Endpoint annotations: add as separate textboxes positioned to the right of the line end
add_endpoint_label(slide, "Workers — 47%", x=Inches(11.5), y=Inches(2.4), color=story_color)
add_endpoint_label(slide, "Companies — 23%", x=Inches(11.5), y=Inches(4.0), color=quiet_color)
```

## Headline conventions

- Past-tense or present-tense statement of what changed.
- "AI at work but not at scale" — names the trend AND the caveat in 6 words.
- "European productivity revival plan" — names what the chart is *for* (a plan), not just a metric.
- Avoid "[Metric] over time" (label, not insight).

## When NOT to use this pattern

- If the data is categorical (not time) → use pattern 01 (bar).
- If the time series is 30+ points → consider showing only the relevant 5-year window.
- If the story is composition over time → use stacked area (pattern variant of 03).

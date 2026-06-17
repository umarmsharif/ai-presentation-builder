# Shared design rules — applies to every McKinsey-style chart

These rules apply across all patterns. Pattern files only call out deviations.

## Headline (chart title)

- **Length**: 3–7 words. Mean is ~4.5.
- **Tone**: declarative statement, often alliterative or rhythmic. Examples from the catalog: "Decoding deal delays", "Mining for resilience", "Following payments' paths", "Balancing the global books", "Better than business as usual".
- **What it says**: the *insight*, not the *topic*. "How scaling care can reduce disease burden" — not "Disease burden by category".
- **Sentence case** (not title case). No trailing period.
- **Position**: above the chart, large weight, dark color (near-black or McKinsey deep blue).

## Subhead / descriptive title (optional)

- Used when the headline alone doesn't carry the full insight.
- Sits between headline and chart. Smaller, lighter weight than the headline. Often italic on the website (in pptx, use italic or just lighter weight).
- 1 sentence. States either the question being answered or the punchline number.
- Frequency in the catalog: ~30% of charts have one. Don't force it.

## Body / context paragraph (the slide's narrative)

- Sits *outside* the chart frame, typically below the chart in a slide.
- 2–4 sentences. Names the analyst (in your skill's case: cite McKinsey or the original source if you're recreating an insight). States the data point, then the implication.
- Often references specific numbers from the chart in prose (reinforces the chart's most important point).

## Color palette

McKinsey's chart palette is restrained — never more than 5 colors at once, often 2–3.

```
Deep blue       #051C2C   (text, primary bars/lines, axes)
Mid blue        #2251FF   (the "current state" / "self" series)
Accent blue     #71D2FF   (the "comparison" / "other" series, lighter)
Highlight red   #E5546C   (used SPARINGLY to flag a single insight value)
Neutral gray    #9FA8B8   (gridlines, axis labels, secondary text)
Background      #FFFFFF   (always white)
```

For your own brand, swap deep blue → the deck's primary accent (v5 pine `12564A` by default) and adjust accents while keeping the same value relationships (one strong primary, one muted comparison, one accent for emphasis only).

## Typography

- **Sans-serif throughout** — McKinsey uses "McKinsey Sans". For your skill, default to **Manrope** (the v4 skill default) or fall back to Helvetica / Calibri.
- Type hierarchy on a chart slide:
  - Headline: 32–40pt, weight 700
  - Subhead: 18–22pt, weight 400, italic OR weight 300
  - Axis labels: 10–11pt, weight 400, gray
  - Data labels (when used): 10–11pt, weight 600, color matches the bar/line
  - Source line: 8–9pt, weight 400, gray, italic

## Source line

- **Always present** below the chart. Format:
  `Source: [Specific dataset / report], [Year]; [Secondary source if any]`
- Examples from the catalog:
  - "Source: Global Burden of Disease Database, IHME, 2021..."
  - "Source: McKinsey Global Survey on transformations, 2024"
- Position: bottom-left of chart frame, just below the plot area. 8–9pt gray italic.

## Annotation as the punchline

McKinsey charts almost always have **one or two callout numbers** drawn directly on the chart, not just in axis labels. The callout is the insight, in plain numerals, often with a color-matched arrow or leader line. Example: "+44%" on the bar that's the story, while other bars stay quiet.

Rule: if the chart has 5+ data points but the story is about 1 of them, *only annotate that one*.

## Layout / whitespace

- Generous white space around the chart. Don't fill the slide.
- 16:9 slide → chart frame typically occupies the middle 60–70% with clean margins.
- Headline + subhead live in a fixed top band; chart body is centered; source + body context live in a bottom band.

## Multi-panel composites (very common — 8 of 15 catalog entries)

McKinsey often shows two panels side-by-side comparing different angles of the same dataset (e.g., absolute values | percentage). Rule of thumb: when both an absolute and a relative view matter, show both.

Each panel keeps the same color logic and axis style. A short shared headline sits above both; each panel gets a small descriptive label above it (e.g., "By region" / "By industry").

#!/usr/bin/env node
/**
 * reference-build.js — a complete, render-tested pptxgenjs exemplar for the
 * strategy-deck-builder skill. It is the canonical implementation to copy blocks
 * out of: it defines the v5 Bright White & Pine tokens, the three layout helpers
 * (header / title / footer), and six load-bearing slide patterns.
 *
 * Scenario is fictional (Northwind, a SaaS company doing an activation review).
 * Swap inputs.json content in; keep the tokens, helpers, and pattern recipes.
 *
 *   npm install pptxgenjs
 *   node assets/reference-build.js        # → reference-build.pptx
 *
 * Patterns exercised:
 *   1. title-bookend            (§2.1)
 *   2. stat-row                 (§2.3)
 *   3. diagnostic-three-panel   (numbered rows)
 *   4. hand-drawn ranking bars  (render-safe bar idiom — rects, no addChart)
 *   5. phased-roadmap           (timeline bands)
 *   6. closing-ask              (the one full-bleed ACCENT band the system allows)
 *
 * Every coordinate honours the v5 anatomy: content starts at y≈2.55, nothing
 * crosses y+h ≤ 6.97, right edge ≤ 12.8, left margin 0.533. Bars are hand-drawn
 * rectangles (native addChart bars degrade on the PPTX→Google Slides import).
 */

const PptxGenJS = require("pptxgenjs");
const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE"; // 13.333 × 7.5 inches

// ── v5 Bright White & Pine tokens ──────────────────────────────────────────
const SURFACE = "FCFCFA", INK = "1A1A1A", BODY = "45474A", MUTE = "8A8D90";
const LINE = "DADEDC", PANEL = "F2F4F3", WH = "FFFFFF";
const ACCENT = "12564A", ACCENT_DK = "0C3D34", TINT = "E6EFEA", TINT_BORDER = "C9DBD2";
const G = "2F7A55", A = "B07D2B", R = "B23A2E"; // semantic: good / amber / risk
const DISPLAY = "Charter", DISPLAY_BOLD = false, FONT = "Manrope"; // all-sans pick: DISPLAY="Manrope", DISPLAY_BOLD=true

const MX = 0.533;          // left margin — content and frame share it
const CW = 12.267;         // content width (right edge 12.8)
const rect = pres.ShapeType.rect;
const fillLine = (c) => ({ color: c }); // same-colour line = no visible border

const CLIENT = "Northwind";
const TOTAL = 6;

// ── helpers (copy these verbatim into any build.js) ─────────────────────────
function header(s, breadcrumb, num) {
  s.addText(breadcrumb, { x: MX, y: 0.42, w: 8, h: 0.3, fontSize: 10.7, bold: true,
    color: ACCENT, charSpacing: 3, fontFace: FONT, valign: "middle" });
  s.addText(`${num} / ${TOTAL}`, { x: 10.9, y: 0.42, w: 1.9, h: 0.3, fontSize: 10.7,
    color: MUTE, fontFace: FONT, align: "right", valign: "middle" });
  s.addShape(rect, { x: MX, y: 0.8, w: CW, h: 0.013, fill: fillLine(LINE), line: fillLine(LINE) });
}
function title(s, context, headline) {
  if (context) s.addText(context, { x: MX, y: 1.0, w: CW, h: 0.34, fontSize: 13.7,
    italic: true, color: ACCENT, fontFace: FONT });
  s.addText(headline, { x: MX, y: 1.4, w: CW, h: 0.95, fontSize: 30, bold: DISPLAY_BOLD,
    color: INK, fontFace: DISPLAY, valign: "top" });
}
function footer(s, note, num) {
  s.addShape(rect, { x: MX, y: 7.05, w: CW, h: 0.012, fill: fillLine(LINE), line: fillLine(LINE) });
  if (note) s.addText(note, { x: MX, y: 7.08, w: 8.5, h: 0.3, fontSize: 9.5,
    italic: true, color: MUTE, fontFace: FONT, valign: "middle" });
  s.addText(`${CLIENT}  ·  ${num} of ${TOTAL}`, { x: 8.3, y: 7.08, w: 4.5, h: 0.3,
    fontSize: 10, color: MUTE, fontFace: FONT, align: "right", valign: "middle" });
}

// ── 1. Title bookend ────────────────────────────────────────────────────────
(() => {
  const s = pres.addSlide();
  s.background = { color: SURFACE };
  s.addText("STRATEGIC REVIEW", { x: MX, y: 1.7, w: 11.4, h: 0.45, fontSize: 11, bold: true,
    color: ACCENT, charSpacing: 3, fontFace: FONT });
  s.addText("Closing the Activation Gap", { x: 0.5, y: 2.3, w: 12.3, h: 1.2, fontSize: 44,
    color: INK, fontFace: DISPLAY });
  // Thesis: a full-fill TINT panel + TINT_BORDER hairline (never a one-side bar)
  s.addShape(rect, { x: MX, y: 4.0, w: 9.5, h: 1.25, fill: fillLine(TINT), line: { color: TINT_BORDER, width: 1 } });
  s.addText([
    { text: "THESIS   ", options: { bold: true, color: ACCENT, fontSize: 11, charSpacing: 2 } },
    { text: "We don't have an acquisition problem. We have a retention problem.", options: { color: INK, fontSize: 15, bold: true } },
  ], { x: MX + 0.3, y: 4.18, w: 8.9, h: 0.5, fontFace: FONT, valign: "middle" });
  s.addText("Stabilise Day-1 first; the funnel compounds from there.", { x: MX + 0.3, y: 4.72, w: 8.9, h: 0.4,
    fontSize: 13, italic: true, color: BODY, fontFace: FONT });
  s.addText("Submitted to: CEO + Board   |   15 min + 10 min Q&A", { x: MX, y: 6.5, w: 11.4, h: 0.4,
    fontSize: 11, color: MUTE, fontFace: FONT });
})();

// ── 2. Stat row ──────────────────────────────────────────────────────────────
(() => {
  const s = pres.addSlide();
  s.background = { color: SURFACE };
  header(s, "THE MATH", 2);
  title(s, "Four numbers tell the whole story.", "Where we are vs where we said we'd be");
  const stats = [
    { val: "467",   label: "Active today", col: INK },
    { val: "3,000", label: "Target by Mar 2027", col: ACCENT },
    { val: "11",    label: "Months remaining", col: INK },
    { val: "+230",  label: "Required net adds / mo", col: A },
  ];
  const cardW = 2.85, gap = 0.31, y = 2.9, h = 2.2;
  stats.forEach((d, i) => {
    const x = MX + i * (cardW + gap);
    s.addShape(rect, { x, y, w: cardW, h, fill: fillLine(PANEL), line: { color: LINE, width: 0.8 } });
    s.addText(d.val, { x, y: y + 0.45, w: cardW, h: 0.9, fontSize: 50, bold: true, color: d.col, fontFace: FONT, align: "center" });
    s.addText(d.label, { x: x + 0.15, y: y + 1.45, w: cardW - 0.3, h: 0.6, fontSize: 14, color: BODY, fontFace: FONT, align: "center", valign: "top" });
  });
  footer(s, "Source: product analytics, May 2026", 2);
})();

// ── 3. Diagnostic three-panel ────────────────────────────────────────────────
(() => {
  const s = pres.addSlide();
  s.background = { color: SURFACE };
  header(s, "THE DIAGNOSIS", 3);
  title(s, "The gap is three compounding failures, not one.", "Why the funnel stalls before value lands");
  const rows = [
    { n: "1", head: "Day-1 drop is 93%", body: "Of 100 signups, 7 return on Day 2. The product's first-run never reaches the activation event." },
    { n: "2", head: "Three behaviours predict 8x conversion", body: "Users who hit all three in week one convert at 8x the base rate. Most never see two." },
    { n: "3", head: "No owner for the first session", body: "Acquisition owns the signup, product owns the feature, nobody owns the first ten minutes." },
  ];
  const y0 = 2.7, rh = 1.32;
  rows.forEach((d, i) => {
    const y = y0 + i * rh;
    s.addShape(pres.ShapeType.ellipse, { x: MX, y: y + 0.05, w: 0.62, h: 0.62, fill: fillLine(ACCENT), line: fillLine(ACCENT) });
    s.addText(d.n, { x: MX, y: y + 0.05, w: 0.62, h: 0.62, fontSize: 22, bold: true, color: WH, fontFace: FONT, align: "center", valign: "middle" });
    s.addText(d.head, { x: MX + 0.95, y: y, w: 11.2, h: 0.45, fontSize: 17, bold: true, color: INK, fontFace: DISPLAY });
    s.addText(d.body, { x: MX + 0.95, y: y + 0.46, w: 11.2, h: 0.7, fontSize: 12.5, color: BODY, fontFace: FONT });
    if (i < rows.length - 1) s.addShape(rect, { x: MX, y: y + rh - 0.12, w: CW, h: 0.01, fill: fillLine(LINE), line: fillLine(LINE) });
  });
  footer(s, "Source: 30-cohort D2 retention + 192-day behavioural cohort", 3);
})();

// ── 4. Hand-drawn ranking bars (render-safe bar idiom) ───────────────────────
(() => {
  const s = pres.addSlide();
  s.background = { color: SURFACE };
  header(s, "CORRELATION", 4);
  title(s, "We isolated the signal in a 192-day cohort.", "Three behaviours predict an 8x lift; the rest are noise");
  const data = [
    { label: "Completed onboarding checklist", val: 8.0, focus: true },
    { label: "Invited a teammate (week 1)", val: 6.4, focus: true },
    { label: "Connected a data source", val: 5.1, focus: true },
    { label: "Opened mobile app", val: 2.2, focus: false },
    { label: "Customised a dashboard", val: 1.6, focus: false },
    { label: "Viewed pricing page", val: 1.1, focus: false },
  ];
  const vMax = 8.0, axX = 5.0, axMaxW = 6.6, y0 = 2.75, rh = 0.62;
  data.forEach((d, i) => {
    const yc = y0 + i * rh;
    s.addText(d.label, { x: MX, y: yc, w: 4.35, h: 0.5, fontSize: 12.5, bold: d.focus,
      color: d.focus ? INK : BODY, fontFace: FONT, valign: "middle" });
    const w = axMaxW * (d.val / vMax);
    s.addShape(rect, { x: axX, y: yc + 0.07, w, h: 0.36, fill: fillLine(d.focus ? ACCENT : "C2CDC8"), line: fillLine(d.focus ? ACCENT : "C2CDC8") });
    s.addText(`${d.val.toFixed(1)}x`, { x: axX + w + 0.12, y: yc, w: 1.0, h: 0.5, fontSize: 13.5, bold: true,
      color: d.focus ? ACCENT : MUTE, fontFace: FONT, valign: "middle" });
  });
  footer(s, "Source: event analytics, 192-day window. Lift vs install-only baseline.", 4);
})();

// ── 5. Phased roadmap (timeline bands) ───────────────────────────────────────
(() => {
  const s = pres.addSlide();
  s.background = { color: SURFACE };
  header(s, "THE PLAN", 5);
  title(s, "Sequence the fix; don't run it all at once.", "A three-phase plan to close the gap by Q1");
  const gridX = 3.5, gridW = 9.0, y0 = 2.85, rowH = 1.18;
  const cols = ["Q3", "Q4", "Q1"];
  cols.forEach((c, i) => {
    s.addText(c, { x: gridX + i * (gridW / 3), y: 2.5, w: gridW / 3, h: 0.3, fontSize: 11, bold: true,
      color: MUTE, charSpacing: 2, fontFace: FONT, align: "center" });
  });
  const work = [
    { name: "Fix first-run", start: 0, span: 1.0, col: ACCENT },
    { name: "Activation nudges", start: 0.6, span: 1.4, col: ACCENT_DK },
    { name: "Assign session owner", start: 1.4, span: 1.6, col: A },
  ];
  work.forEach((w, i) => {
    const y = y0 + i * rowH;
    s.addText(w.name, { x: MX, y, w: 2.8, h: rowH - 0.2, fontSize: 13.5, bold: true, color: INK, fontFace: FONT, valign: "middle" });
    const bx = gridX + (w.start / 3) * gridW, bw = (w.span / 3) * gridW;
    s.addShape(rect, { x: bx, y: y + 0.28, w: bw, h: 0.42, fill: fillLine(w.col), line: fillLine(w.col) });
    if (i < work.length - 1) s.addShape(rect, { x: MX, y: y + rowH - 0.12, w: CW, h: 0.008, fill: fillLine(LINE), line: fillLine(LINE) });
  });
  // INK-emphasis takeaway strip (primary takeaway → INK, not pine-tint)
  s.addShape(rect, { x: MX, y: 6.45, w: CW, h: 0.5, fill: fillLine(INK), line: fillLine(INK) });
  s.addText([
    { text: "THE SHIFT   ", options: { bold: true, color: ACCENT, fontSize: 11, charSpacing: 2 } },
    { text: "First measurable D2 lift by end of Q3; full close by Q1.", options: { color: WH, fontSize: 13 } },
  ], { x: MX + 0.3, y: 6.45, w: CW - 0.6, h: 0.5, fontFace: FONT, valign: "middle" });
  footer(s, "Phases sequenced by dependency, not by team availability.", 5);
})();

// ── 6. Closing ask (the one full-bleed ACCENT band) ──────────────────────────
(() => {
  const s = pres.addSlide();
  s.background = { color: ACCENT };
  s.addText("WHAT WE NEED", { x: MX, y: 1.6, w: 11.4, h: 0.45, fontSize: 11, bold: true,
    color: TINT, charSpacing: 3, fontFace: FONT });
  s.addText("Three decisions to start Monday", { x: 0.5, y: 2.2, w: 12.3, h: 1.0, fontSize: 40,
    color: WH, fontFace: DISPLAY });
  const asks = [
    { t: "Fund a 6-week first-run rebuild", d: "One squad, ring-fenced." },
    { t: "Name a single activation owner", d: "Accountable for the first session." },
    { t: "Approve the nudge experiments", d: "Three tests, two-week cycles." },
  ];
  const y0 = 3.7, rh = 0.92;
  asks.forEach((d, i) => {
    const y = y0 + i * rh;
    s.addShape(pres.ShapeType.ellipse, { x: MX, y, w: 0.5, h: 0.5, fill: fillLine(WH), line: fillLine(WH) });
    s.addText(`${i + 1}`, { x: MX, y, w: 0.5, h: 0.5, fontSize: 18, bold: true, color: ACCENT, fontFace: FONT, align: "center", valign: "middle" });
    s.addText([
      { text: d.t + "   ", options: { bold: true, color: WH, fontSize: 17 } },
      { text: d.d, options: { color: TINT, fontSize: 13, italic: true } },
    ], { x: MX + 0.8, y, w: 11.4, h: 0.5, fontFace: FONT, valign: "middle" });
  });
  s.addText("Northwind  ·  Board review", { x: MX, y: 6.8, w: 11.4, h: 0.3, fontSize: 10,
    color: TINT, fontFace: FONT });
})();

pres.writeFile({ fileName: "reference-build.pptx" })
  .then((f) => console.log(`✓ wrote ${f}`))
  .catch((e) => { console.error(e); process.exit(1); });

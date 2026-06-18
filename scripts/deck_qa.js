#!/usr/bin/env node
// deck_qa.js — consolidated pre-delivery QA pass on inputs.json + (optional) output PPTX.
//
// Mirrors the Heinrich Rusche / Firm Learning checklist
// (references/methodology/qa_checklist.md). Designed to run as the very last
// step before handing the deck to the user, after build + voice-check.
//
// Usage:
//   node scripts/deck_qa.js <inputs.json> [output.pptx]
//
// Exit codes: 0 = all pass, 1 = warnings only, 2 = at least one FAIL.

const fs = require("fs");
const path = require("path");

const inputsPath = process.argv[2];
const outputPath = process.argv[3] || null;
if (!inputsPath) {
  console.error("Usage: node scripts/deck_qa.js <inputs.json> [output.pptx]");
  process.exit(2);
}
const I = JSON.parse(fs.readFileSync(inputsPath, "utf8"));

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Walk the inputs JSON and collect all string values along with a path label,
// excluding fields that are structural (layout names, hex codes, etc.).
function collectStrings(obj, pathLabel = "") {
  const out = [];
  const skipKeys = new Set([
    "layout", "primary_hex", "font", "colour", "color",
    "header_colour", "x_axis_label", "y_axis_label",
    "_schema_comment", "$schema_comment",
  ]);
  function walk(o, p) {
    if (typeof o === "string") {
      out.push({ value: o, path: p });
    } else if (Array.isArray(o)) {
      o.forEach((v, i) => walk(v, `${p}[${i}]`));
    } else if (o && typeof o === "object") {
      for (const k of Object.keys(o)) {
        if (skipKeys.has(k)) continue;
        if (k.startsWith("_")) continue;
        walk(o[k], p ? `${p}.${k}` : k);
      }
    }
  }
  walk(obj, pathLabel);
  return out;
}

// Slide titles only
function collectTitles() {
  return (I.slides || []).map((s, i) => ({ i: i + 1, title: s.title || "", layout: s.layout }));
}
// Slide footer notes only
function collectFooterNotes() {
  return (I.slides || []).map((s, i) => ({ i: i + 1, note: s.footer_note || "" }));
}

// Layouts that present data and therefore MUST have a footer_note source line
const DATA_LAYOUTS = new Set([
  "diagnostic-three-panel", "prioritisation-matrix", "phased-roadmap-gantt",
  "three-col-comparison", "appendix-unit-economics", "stat-hero",
  "big-numeral-findings", "executive-summary", "waterfall-build-up",
  "bar-chart", "data-table",
]);

// Build source — best-effort. The script's contract is (inputs.json, output.pptx);
// it is not handed the build.js. So the anti-slop group opportunistically looks
// for a build.js sibling to the inputs (then the output) and reads it as a string.
// If none is found, the build-source checks (hex, fontFace, fontSize, align,
// gradient) are skipped and only the text-level checks run. An explicit
// --build=<path> arg overrides the search.
function loadBuildSource() {
  const explicit = process.argv.find(a => a.startsWith("--build="));
  const candidates = [];
  if (explicit) candidates.push(explicit.slice("--build=".length));
  candidates.push(path.join(path.dirname(inputsPath), "build.js"));
  if (outputPath) candidates.push(path.join(path.dirname(outputPath), "build.js"));
  for (const c of candidates) {
    try {
      if (fs.existsSync(c)) return { src: fs.readFileSync(c, "utf8"), file: path.basename(c) };
    } catch (_) { /* keep looking */ }
  }
  return { src: null, file: null };
}
const BUILD = loadBuildSource();

// Findings registry
const findings = [];
function note(severity, section, label, detail = "") {
  findings.push({ severity, section, label, detail });
}

// ─────────────────────────────────────────────────────────────────────────────
// LINTS
// ─────────────────────────────────────────────────────────────────────────────

// 1. Cover page completeness
function lintCover() {
  const ts = I.title_slide || {};
  const meta = I.meta || {};
  if (!ts.title_lines && !ts.role_title_lines) {
    note("FAIL", "Cover page", "Document title missing", "title_slide.title_lines or role_title_lines must be set");
  } else {
    note("PASS", "Cover page", "Document title + client name");
  }
  if (!meta.date_label) {
    note("WARN", "Cover page", "Date missing", "set meta.date_label");
  } else {
    note("PASS", "Cover page", "Date");
  }
  if (!ts.author_name && !meta.candidate_or_author) {
    note("WARN", "Cover page", "Author missing", "set title_slide.author_name");
  } else {
    note("PASS", "Cover page", "Author");
  }
}

// 2. Document structure
function lintStructure() {
  const slides = I.slides || [];
  const hasExecSummary = slides.some(s => s.layout === "executive-summary");
  if (slides.length >= 4 && !hasExecSummary) {
    note("WARN", "Document structure", "No executive-summary slide",
      `Decks of ${slides.length} slides should open with an exec-summary; use the executive-summary layout`);
  } else if (hasExecSummary) {
    const idx = slides.findIndex(s => s.layout === "executive-summary");
    if (idx > 1) {
      note("WARN", "Document structure", `Executive summary is slide ${idx + 1}, not slide 2`,
        "exec summary should come immediately after the title to honour Pyramid Principle");
    } else {
      note("PASS", "Document structure", "Executive summary present and well-positioned");
    }
  } else {
    note("PASS", "Document structure", "Short deck, exec-summary not required");
  }

  // Pagination consistency
  let paginationOK = true;
  slides.forEach((s, i) => {
    const expected = i + 2; // title slide is page 1
    if (s.pagination != null && s.pagination !== expected) {
      paginationOK = false;
      note("WARN", "Document structure", `Slide ${i + 1} pagination = ${s.pagination}, expected ${expected}`);
    }
  });
  if (paginationOK) note("PASS", "Document structure", "Pagination matches slide order");
}

// 3. Action titles
function lintActionTitles() {
  const titles = collectTitles();
  let allShort = true;
  titles.forEach(({ i, title }) => {
    // ≤ 2 lines heuristic: at the deck's title font size, ~80 chars fits on
    // one line at fontSize 30. So 2 lines ≈ 160 chars max.
    if (title.length > 160) {
      allShort = false;
      note("WARN", "Action titles", `Slide ${i} title likely > 2 lines (${title.length} chars)`,
        `"${title.slice(0, 60)}..." — shorten to fit two lines at fontSize 30`);
    }
  });
  if (allShort) note("PASS", "Action titles", "All titles ≤ 2 lines");

  // Title case consistency — sentence vs title case
  const styles = titles.map(({ title }) => {
    const words = title.split(/\s+/).filter(w => w.length > 1);
    if (!words.length) return "n/a";
    const titleCaseCount = words.filter(w => /^[A-Z]/.test(w)).length;
    const ratio = titleCaseCount / words.length;
    return ratio > 0.7 ? "title" : "sentence";
  }).filter(s => s !== "n/a");
  const distinct = new Set(styles);
  if (distinct.size > 1) {
    note("WARN", "Action titles", "Title-case style mixed across deck",
      `${styles.filter(s => s === "sentence").length} sentence-case, ${styles.filter(s => s === "title").length} title-case. Pick one and apply it everywhere.`);
  } else {
    note("PASS", "Action titles", `Title-case style consistent (${[...distinct][0] || "n/a"})`);
  }
}

// 4. Slide footer
function lintFooter() {
  const slides = I.slides || [];
  // Source notes on data slides
  const missingSource = slides
    .map((s, i) => ({ s, i: i + 1 }))
    .filter(({ s }) => DATA_LAYOUTS.has(s.layout) && (!s.footer_note || s.footer_note.length < 10));
  if (missingSource.length) {
    missingSource.forEach(({ i, s }) => {
      note("WARN", "Slide footer", `Slide ${i} (${s.layout}) lacks a source line`,
        "set slides[i].footer_note with the source / caveat / methodology");
    });
  } else {
    note("PASS", "Slide footer", "All data slides have source notes");
  }

  // Footnote numbering consistency
  const footers = collectFooterNotes().map(f => f.note).join(" ");
  const styleHits = {
    super_arabic: /\^?[1-9]\b/.test(footers) && /\(\d+\)/.test(footers),
    paren_arabic: /\(\d+\)/.test(footers),
    roman: /\b[ivxIVX]{1,3}\b/.test(footers),
    paren_alpha: /\([a-z]\)/.test(footers),
  };
  const usedStyles = Object.entries(styleHits).filter(([, v]) => v).map(([k]) => k);
  if (usedStyles.length > 1) {
    note("WARN", "Slide footer", "Mixed footnote numbering styles across footers",
      `styles seen: ${usedStyles.join(", ")} — pick one`);
  } else {
    note("PASS", "Slide footer", "Footnote numbering style consistent");
  }
}

// 5. Formatting & alignment — text-level checks
function lintFormatting() {
  const all = collectStrings(I);
  // Double spaces
  const doubleSpaces = all.filter(({ value }) => /  +/.test(value));
  if (doubleSpaces.length) {
    doubleSpaces.slice(0, 5).forEach(({ value, path }) => {
      note("WARN", "Formatting", "Double space", `${path}: "${value.slice(0, 60)}..."`);
    });
    if (doubleSpaces.length > 5) {
      note("WARN", "Formatting", `+${doubleSpaces.length - 5} more double-space hits`, "");
    }
  } else {
    note("PASS", "Formatting", "No double spaces");
  }

  // Currency punctuation consistency
  // Flag if both 1,234.56 (US) and 1.234,56 (EU) styles appear
  const usStyle = all.some(({ value }) => /\b\d{1,3}(?:,\d{3})+\.\d/.test(value));
  const euStyle = all.some(({ value }) => /\b\d{1,3}(?:\.\d{3})+,\d/.test(value));
  if (usStyle && euStyle) {
    note("FAIL", "Formatting", "Mixed number punctuation (US 1,234.56 vs EU 1.234,56)",
      "Pick one style and apply it everywhere");
  } else {
    note("PASS", "Formatting", "Number punctuation style consistent");
  }
}

// 6. Ctrl+F checks — units, brand, filename
function lintCtrlF() {
  const all = collectStrings(I);
  const brand = (I.brand && I.brand.name) || null;

  // Brand consistency: brand.name should appear in title slide somewhere
  if (brand) {
    const titleSlideStrings = collectStrings(I.title_slide || {}, "title_slide").map(x => x.value).join(" ");
    if (!titleSlideStrings.toLowerCase().includes(brand.toLowerCase())) {
      note("WARN", "Ctrl+F", `Brand name "${brand}" does not appear on title slide`,
        "Either add it to title_slide.client_eyebrow or rename brand.name");
    } else {
      note("PASS", "Ctrl+F", `Brand "${brand}" appears on title slide`);
    }
  }

  // Unit-of-measurement consistency for common currencies
  const currencyForms = {
    eur: { regexes: [/€\s*\d/, /\d\s*€/, /\bEUR\b/], hits: [] },
    usd: { regexes: [/\$\s*\d/, /\d\s*USD\b/, /\bUSD\b/], hits: [] },
    pkr: { regexes: [/\bPKR\s+\d/, /\d\s*PKR\b/, /\bRs\.?\s*\d/], hits: [] },
  };
  Object.entries(currencyForms).forEach(([cur, { regexes }]) => {
    regexes.forEach((re, i) => {
      if (all.some(({ value }) => re.test(value))) currencyForms[cur].hits.push(i);
    });
  });
  Object.entries(currencyForms).forEach(([cur, { hits }]) => {
    if (hits.length > 1) {
      note("WARN", "Ctrl+F", `${cur.toUpperCase()} unit form is inconsistent`,
        "e.g. mixing 100€ and €100 — pick one");
    }
  });
  const inconsistent = Object.values(currencyForms).filter(v => v.hits.length > 1);
  if (inconsistent.length === 0) {
    note("PASS", "Ctrl+F", "Currency unit form consistent");
  }

  // Filename guard
  if (outputPath) {
    const base = path.basename(outputPath);
    if (/^Copy of/i.test(base) || /\bCopy\b/.test(base)) {
      note("FAIL", "Ctrl+F", `Filename "${base}" contains "Copy"`,
        "rename before delivery");
    } else {
      note("PASS", "Ctrl+F", `Filename "${base}" looks clean`);
    }
  }
}

// 7. Out-of-bounds checks (heuristic — counts large content blocks)
function lintBounds() {
  const slides = I.slides || [];
  // Gantt with many phases × workstreams overflows; we already know this
  // is a real bug. Flag it.
  slides.forEach((s, i) => {
    if (s.layout === "phased-roadmap-gantt") {
      const phases = (s.content && s.content.phases) || [];
      const totalRows = phases.reduce((a, p) => a + (p.workstreams || []).length, 0);
      if (totalRows + phases.length > 14) {
        note("WARN", "Formatting", `Slide ${i + 1} gantt has ${totalRows} workstreams + ${phases.length} phase headers`,
          "may overflow slide bottom; consider splitting across two slides or trimming workstreams");
      }
    }
    if (s.layout === "data-table") {
      const rows = (s.content && s.content.rows) || [];
      if (rows.length > 9) {
        note("WARN", "Formatting", `Slide ${i + 1} data-table has ${rows.length} rows`,
          "rows >9 squeeze; either split or shrink to summary rows");
      }
    }
    if (s.layout === "process-flow") {
      const steps = (s.content && s.content.steps) || [];
      if (steps.length > 5) {
        note("WARN", "Formatting", `Slide ${i + 1} process-flow has ${steps.length} steps`,
          "more than 5 steps crowd; consider grouping");
      }
    }
  });
}

// 8. Anti-slop — the statically-checkable subset of the impeccable "slop" rules.
// Catalogue + v5 mapping: references/anti-slop.md. Findings credited to the
// impeccable registry (https://impeccable.style/slop, github.com/pbakaus/impeccable).
// Text-level checks run on the inputs.json strings; the source-level checks
// (hex, fontFace, fontSize, align, gradient) run on the build.js when one is found.
function lintAntiSlop() {
  const all = collectStrings(I);

  // ── 1. Em-dash overuse — > 2 em-dashes ("—" or " -- ") across body/copy.
  // The voice gate also covers this; kept here as a backstop.
  let emTotal = 0;
  const emHits = [];
  all.forEach(({ value, path: p }) => {
    const n = (value.match(/—/g) || []).length + (value.match(/ -- /g) || []).length;
    if (n > 0) { emTotal += n; emHits.push({ p, value, n }); }
  });
  if (emTotal > 2) {
    note("WARN", "Anti-slop", `Em-dash overuse: ${emTotal} em-dashes across copy (max 2)`,
      emHits.slice(0, 3).map(h => `${h.p}: "${h.value.slice(0, 50)}"`).join("  |  "));
  } else {
    note("PASS", "Anti-slop", `Em-dash count within limit (${emTotal})`);
  }

  // ── 2. Marketing buzzwords — generic SaaS / AI-slop vocabulary.
  const BUZZWORDS = [
    "streamline", "empower", "supercharge", "world-class", "enterprise-grade",
    "next-generation", "cutting-edge", "seamless", "robust", "leverage",
    "transformative", "paradigm", "game-changer", "delve", "unlock",
    "elevate", "harness",
  ];
  const buzzRe = new RegExp(`\\b(${BUZZWORDS.join("|").replace(/-/g, "\\-")})\\b`, "i");
  const buzzHits = [];
  all.forEach(({ value, path: p }) => {
    const m = value.match(buzzRe);
    if (m) buzzHits.push({ p, word: m[1], value });
  });
  if (buzzHits.length) {
    buzzHits.slice(0, 5).forEach(({ p, word, value }) => {
      note("WARN", "Anti-slop", `Marketing buzzword "${word}"`, `${p}: "${value.slice(0, 60)}"`);
    });
    if (buzzHits.length > 5) note("WARN", "Anti-slop", `+${buzzHits.length - 5} more buzzword hits`, "");
  } else {
    note("PASS", "Anti-slop", "No marketing buzzwords");
  }

  // ── 3. All-caps body — a string > 40 chars that is fully uppercase.
  // Uppercase is for short tracked labels only; long all-caps reads as a tell.
  const capsHits = all.filter(({ value }) => {
    const v = value.trim();
    return v.length > 40 && /[A-Z]/.test(v) && v === v.toUpperCase();
  });
  if (capsHits.length) {
    capsHits.slice(0, 3).forEach(({ value, path: p }) => {
      note("WARN", "Anti-slop", `All-caps body string (${value.trim().length} chars)`, `${p}: "${value.slice(0, 60)}"`);
    });
  } else {
    note("PASS", "Anti-slop", "No long all-caps body strings");
  }

  // ── Source-level checks — only when a build.js was located.
  if (!BUILD.src) {
    note("PASS", "Anti-slop", "No build.js found — source-level checks skipped",
      "pass --build=<path> or place build.js beside the inputs to enable hex / font / size / align checks");
    return;
  }
  const src = BUILD.src;

  // ── Banned-palette hexes — the AI-slop palette + retired v4 hexes.
  // Themes vary the ground/accent freely (see design_system.md §1); only these
  // specific tells are banned, not non-bright grounds.
  const BANNED_HEXES = [
    // purple / violet (the classic AI-slop accent)
    "7C3AED", "8B5CF6", "A855F7", "6D28D9",
    // retired v4 warm cream surfaces
    "F5F1EA", "FAF6EE", "F4E9D4",
    // retired v4 burgundy accent
    "7A1F2B",
  ];
  BANNED_HEXES.forEach(hex => {
    const re = new RegExp(`#?${hex}\\b`, "i");
    if (re.test(src)) {
      note("WARN", "Anti-slop", `Banned palette hex #${hex} in build`,
        "AI-slop purple/violet or a retired v4 hex — use one of the curated themes in design_system.md §1");
    }
  });
  // Gradient on text / any linear-gradient — v5 uses solid ink/accent only.
  if (/linear-gradient|gradient/i.test(src)) {
    note("WARN", "Anti-slop", "Gradient fill present in build",
      "v5 forbids gradient text/figures — use solid ink or accent");
  }
  if (!BANNED_HEXES.some(h => new RegExp(`#?${h}\\b`, "i").test(src)) && !/gradient/i.test(src)) {
    note("PASS", "Anti-slop", "Palette clean — no banned hexes or gradients");
  }

  // ── Single font — v5 expects a display + body pairing (default Charter + Manrope).
  // The display face is a per-deck choice (Step 1 brief); an intentional all-sans
  // deck (DISPLAY = Manrope, DISPLAY_BOLD = true) is an acceptable conscious choice,
  // so this stays a WARN, not a hard fail.
  // fontFace values in the recipe are token identifiers (DISPLAY, FONT) or
  // quoted literals; count the distinct values.
  const fontFaces = new Set();
  const ffRe = /fontFace:\s*("([^"]+)"|'([^']+)'|[A-Za-z_][A-Za-z0-9_]*)/g;
  let m;
  while ((m = ffRe.exec(src)) !== null) {
    fontFaces.add((m[2] || m[3] || m[1]).trim());
  }
  if (fontFaces.size === 1) {
    note("WARN", "Anti-slop", `Single font in build (${[...fontFaces][0]})`,
      "expected a display + body pairing (default Charter + Manrope); if this is a deliberate all-sans deck, ignore");
  } else if (fontFaces.size > 1) {
    note("PASS", "Anti-slop", `Font pairing present (${[...fontFaces].join(" + ")})`);
  }

  // ── Tiny body text — fontSize below the legibility floor. Footnotes/labels at
  // 9–11 are fine, so use a conservative floor of 10 to avoid firing on footers.
  const tinyHits = [];
  const fsRe = /fontSize:\s*([\d.]+)/g;
  while ((m = fsRe.exec(src)) !== null) {
    const sz = parseFloat(m[1]);
    if (sz < 10) tinyHits.push(sz);
  }
  if (tinyHits.length) {
    note("WARN", "Anti-slop", `Tiny text below 10pt (${tinyHits.length} element(s): ${[...new Set(tinyHits)].join(", ")}pt)`,
      "body sits at 10–12pt; uppercase labels/footnotes may dip but verify nothing important is < 10");
  } else {
    note("PASS", "Anti-slop", "No text below the 10pt floor");
  }

  // ── Justified text — body is left-aligned, never justified (rivers of white).
  if (/align:\s*["']justify["']/i.test(src)) {
    note("WARN", "Anti-slop", 'Justified text in build (align: "justify")',
      "left-align body text — justify creates rivers of white space");
  } else {
    note("PASS", "Anti-slop", "No justified text");
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// RUN ALL LINTS
// ─────────────────────────────────────────────────────────────────────────────
lintCover();
lintStructure();
lintActionTitles();
lintFooter();
lintFormatting();
lintCtrlF();
lintBounds();
lintAntiSlop();

// ─────────────────────────────────────────────────────────────────────────────
// REPORT
// ─────────────────────────────────────────────────────────────────────────────
const sections = [...new Set(findings.map(f => f.section))];
const passCount = findings.filter(f => f.severity === "PASS").length;
const warnCount = findings.filter(f => f.severity === "WARN").length;
const failCount = findings.filter(f => f.severity === "FAIL").length;
const total = findings.length;

console.log("");
console.log("DECK QA CHECKLIST");
console.log("─".repeat(60));
console.log(`Inputs: ${path.basename(inputsPath)}`);
if (outputPath) console.log(`Output: ${path.basename(outputPath)}`);
console.log("");

const glyph = { PASS: "✓", WARN: "⚠", FAIL: "✗" };
sections.forEach(section => {
  console.log(section);
  findings.filter(f => f.section === section).forEach(f => {
    console.log(`  ${glyph[f.severity]} ${f.label}`);
    if (f.detail) console.log(`     ${f.detail}`);
  });
  console.log("");
});

console.log("─".repeat(60));
console.log(`Score: ${passCount}/${total}    PASS=${passCount}  WARN=${warnCount}  FAIL=${failCount}`);
console.log("");

if (failCount > 0) {
  console.log("FAIL: at least one critical issue. Fix before delivery.");
  process.exit(2);
}
if (warnCount > 0) {
  console.log("WARN: review each warning. Resolve or accept consciously.");
  process.exit(1);
}
console.log("✓ All checks passed. Ready for delivery.");
process.exit(0);

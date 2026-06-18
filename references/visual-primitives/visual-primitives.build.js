// Visual-primitives render test — 11 new patterns for my-presentation-consulting v5
// One slide per primitive. Render → PDF → PNG → eyeball → iterate.
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "PRIM_WIDE", width: 13.333, height: 7.5 });   // unique name — LAYOUT_WIDE silently fails
pres.layout = "PRIM_WIDE";

// ---- v5 Bright White & Pine tokens (verbatim from §1.1) ----
const ACCENT="12564A", ACCENT_DK="0C3D34";
const INK="1A1A1A", BODY="45474A", MUTE="8A8D90", LINE="DADEDC";
const SURFACE="FCFCFA", PANEL="F2F4F3", WH="FFFFFF";
const G="2F7A55", A="B07D2B", R="B23A2E";
const TINT="E6EFEA", TINT_BORDER="C9DBD2";
const DISPLAY="Charter", DISPLAY_BOLD=false, FONT="Manrope";
const TOTAL=11;

// ---- helpers (verbatim from §3) ----
function header(s, breadcrumb, num, total){
  s.background={color:SURFACE};
  s.addText(breadcrumb.toUpperCase(),{x:0.533,y:0.4,w:9,h:0.3,fontSize:10.7,bold:true,color:ACCENT,fontFace:FONT,charSpacing:3});
  s.addText(total?`${num} / ${total}`:`${num}`,{x:10.533,y:0.4,w:2.267,h:0.3,fontSize:10.7,color:MUTE,fontFace:FONT,align:"right"});
  s.addShape(pres.ShapeType.rect,{x:0.533,y:0.8,w:12.267,h:0.013,fill:{color:LINE},line:{color:LINE}});
}
function title(s, context, headline){
  s.addText(context,{x:0.533,y:1.0,w:12.267,h:0.4,fontSize:13.7,italic:true,color:ACCENT,fontFace:FONT});
  s.addText(headline,{x:0.5,y:1.4,w:12.3,h:0.95,fontSize:30,bold:DISPLAY_BOLD,color:INK,fontFace:DISPLAY});
}
function footer(s, note, label){
  s.addText(note,{x:0.533,y:7.067,w:9.333,h:0.333,fontSize:11,italic:true,color:MUTE,fontFace:FONT});
  s.addText(label,{x:10.0,y:7.067,w:2.8,h:0.333,fontSize:11,color:MUTE,fontFace:FONT,align:"right"});
}
// thin rotated rect between two points — spokes, bowtie connectors, diagonals
function connector(s, x1,y1,x2,y2, color, thick){
  const dx=x2-x1, dy=y2-y1, len=Math.hypot(dx,dy);
  const ang=Math.atan2(dy,dx)*180/Math.PI, mx=(x1+x2)/2, my=(y1+y2)/2;
  s.addShape(pres.ShapeType.rect,{x:mx-len/2,y:my-thick/2,w:len,h:thick,fill:{color},line:{color},rotate:ang});
}
function frame(bc,n,ctx,head,note){
  const s=pres.addSlide();
  header(s,bc,n,TOTAL); title(s,ctx,head); footer(s,note,`Visual primitive · ${n} of ${TOTAL}`);
  return s;
}

// 1 — layered-pyramid -------------------------------------------------
(function(){
  const s=frame("PYRAMID",1,"Strategy reads top-down: each layer serves the one above it.","From vision at the apex to operations at the base","Layered pyramid · hierarchy / proportion");
  const cx=4.0, W=5.0, y0=2.85, H=3.5, bands=[
    {n:"VISION",d:"Where we are going",c:ACCENT},
    {n:"STRATEGY",d:"How we choose to win",c:INK},
    {n:"CAPABILITIES",d:"What we must be able to do",c:INK},
    {n:"OPERATIONS",d:"How we run it every day",c:INK}];
  // triangle silhouette
  s.addShape(pres.ShapeType.triangle,{x:cx-W/2,y:y0,w:W,h:H,fill:{color:TINT},line:{color:TINT_BORDER,pt:1}});
  const k=bands.length;
  for(let i=1;i<k;i++){ const yk=y0+i*H/k, hw=(W/2)*(i/k); // divider hairline at band boundary
    s.addShape(pres.ShapeType.rect,{x:cx-hw,y:yk,w:2*hw,h:0.012,fill:{color:TINT_BORDER},line:{color:TINT_BORDER}}); }
  bands.forEach((b,i)=>{ const yc=y0+(i+0.5)*H/k;
    s.addText(`${i+1}`,{x:cx-0.3,y:yc-0.16,w:0.6,h:0.32,fontSize:13,bold:true,color:i===0?ACCENT:BODY,fontFace:FONT,align:"center"});
    s.addText(b.n,{x:7.0,y:yc-0.26,w:5.4,h:0.3,fontSize:14,bold:true,color:b.c,fontFace:FONT});
    s.addText(b.d,{x:7.0,y:yc+0.02,w:5.4,h:0.28,fontSize:11.3,italic:true,color:MUTE,fontFace:FONT}); });
})();

// 2 — venn-overlap ----------------------------------------------------
(function(){
  const s=frame("VENN",2,"The answer is not in any one circle — it is in the overlap of all three.","Product-market fit is where desirable, feasible and viable meet","Venn · intersection of sets");
  const r=1.5, sets=[
    {cx:6.0,cy:4.05,lab:"DESIRABLE",sub:"users want it",lx:6.0,ly:3.2,al:"center"},
    {cx:5.0,cy:5.35,lab:"FEASIBLE",sub:"we can build it",lx:3.05,ly:5.95,al:"left"},
    {cx:7.0,cy:5.35,lab:"VIABLE",sub:"it makes money",lx:8.55,ly:5.95,al:"left"}];
  sets.forEach(o=>s.addShape(pres.ShapeType.ellipse,{x:o.cx-r,y:o.cy-r,w:2*r,h:2*r,fill:{type:"none"},line:{color:BODY,pt:1.25}}));
  sets.forEach(o=>{ s.addText(o.lab,{x:o.lx-1.3,y:o.ly-0.16,w:2.6,h:0.3,fontSize:12.5,bold:true,color:INK,fontFace:FONT,align:o.al});
    s.addText(o.sub,{x:o.lx-1.3,y:o.ly+0.14,w:2.6,h:0.26,fontSize:10,italic:true,color:MUTE,fontFace:FONT,align:o.al}); });
  // centroid intersection highlight
  const ix=6.0, iy=4.7;
  s.addShape(pres.ShapeType.ellipse,{x:ix-0.62,y:iy-0.5,w:1.24,h:1.0,fill:{color:TINT},line:{color:ACCENT,pt:1.25}});
  s.addText("FIT",{x:ix-0.62,y:iy-0.28,w:1.24,h:0.3,fontSize:13,bold:true,color:ACCENT,fontFace:FONT,align:"center"});
  s.addText("ship here",{x:ix-0.62,y:iy+0.02,w:1.24,h:0.26,fontSize:9,italic:true,color:ACCENT,fontFace:FONT,align:"center"});
})();

// 3 — concentric-bullseye --------------------------------------------
(function(){
  const s=frame("BULLSEYE",3,"Defend the core before you reach for the next ring out.","Three horizons: core, adjacent, transformational","Concentric bullseye · core + rings");
  const cx=4.2, cy=4.6, rings=[
    {r:2.0,fill:TINT,bd:TINT_BORDER,lab:"TRANSFORMATIONAL",tc:BODY},
    {r:1.38,fill:PANEL,bd:LINE,lab:"ADJACENT",tc:BODY},
    {r:0.78,fill:ACCENT,bd:ACCENT,lab:"CORE",tc:WH}];
  rings.forEach(o=>s.addShape(pres.ShapeType.ellipse,{x:cx-o.r,y:cy-o.r,w:2*o.r,h:2*o.r,fill:{color:o.fill},line:{color:o.bd,pt:1}}));
  // ring labels: core centered, others at top arc
  s.addText("CORE",{x:cx-0.78,y:cy-0.16,w:1.56,h:0.32,fontSize:12.5,bold:true,color:WH,fontFace:FONT,align:"center"});
  s.addText("ADJACENT",{x:cx-1.38,y:cy-1.30,w:2.76,h:0.26,fontSize:10,bold:true,color:BODY,fontFace:FONT,align:"center",charSpacing:1});
  s.addText("TRANSFORMATIONAL",{x:cx-2.0,y:cy-1.92,w:4.0,h:0.26,fontSize:10,bold:true,color:MUTE,fontFace:FONT,align:"center",charSpacing:1});
  // right descriptor column
  const rows=[["CORE","Protect today's revenue engine","70% of effort"],
    ["ADJACENT","Extend into next-door markets","20%"],
    ["TRANSFORMATIONAL","Place option bets on new S-curves","10%"]];
  rows.forEach((rw,i)=>{ const y=3.25+i*1.05;
    s.addText(rw[0],{x:7.4,y,w:5.0,h:0.3,fontSize:13,bold:true,color:i===0?ACCENT:INK,fontFace:FONT});
    s.addText(rw[1],{x:7.4,y:y+0.30,w:4.0,h:0.3,fontSize:11,italic:true,color:MUTE,fontFace:FONT});
    s.addText(rw[2],{x:11.4,y:y+0.30,w:1.4,h:0.3,fontSize:11,bold:true,color:INK,fontFace:FONT,align:"right"}); });
})();

// 4 — positioning-spectrum -------------------------------------------
(function(){
  const s=frame("SPECTRUM",4,"Plot where you sit today and where you intend to move.","Mid-market today, with a deliberate move toward premium","Positioning spectrum · continuum + marker");
  const x0=1.6, w=10.13, y=5.0, h=0.5, segs=["BUDGET","MID-MARKET","PREMIUM"];
  s.addShape(pres.ShapeType.rect,{x:x0,y,w,h,fill:{color:PANEL},line:{color:LINE,pt:1}});
  for(let i=1;i<3;i++) s.addShape(pres.ShapeType.rect,{x:x0+i*w/3,y,w:0.012,h,fill:{color:LINE},line:{color:LINE}});
  segs.forEach((t,i)=>s.addText(t,{x:x0+i*w/3,y:y+h+0.08,w:w/3,h:0.3,fontSize:10.5,bold:true,color:BODY,fontFace:FONT,align:"center",charSpacing:1}));
  // current marker (filled down-triangle) + target marker (hollow)
  const cur=x0+w*0.45, tgt=x0+w*0.80;
  s.addShape(pres.ShapeType.triangle,{x:cur-0.16,y:y-0.34,w:0.32,h:0.3,fill:{color:ACCENT},line:{color:ACCENT},rotate:180});
  s.addText("TODAY",{x:cur-0.8,y:y-0.66,w:1.6,h:0.26,fontSize:10,bold:true,color:ACCENT,fontFace:FONT,align:"center",charSpacing:1});
  s.addShape(pres.ShapeType.triangle,{x:tgt-0.16,y:y-0.34,w:0.32,h:0.3,fill:{type:"none"},line:{color:MUTE,pt:1.25},rotate:180});
  s.addText("TARGET '27",{x:tgt-0.85,y:y-0.66,w:1.7,h:0.26,fontSize:10,bold:true,color:MUTE,fontFace:FONT,align:"center",charSpacing:1});
  // end captions
  s.addText("lowest price, widest reach",{x:x0,y:y+h+0.42,w:4.0,h:0.3,fontSize:10,italic:true,color:MUTE,fontFace:FONT});
  s.addText("highest margin, narrowest reach",{x:x0+w-4.0,y:y+h+0.42,w:4.0,h:0.3,fontSize:10,italic:true,color:MUTE,fontFace:FONT,align:"right"});
})();

// 5 — hub-and-spoke ---------------------------------------------------
(function(){
  const s=frame("HUB & SPOKE",5,"One shared asset in the centre; every function draws from it.","A single data platform feeds all five functions","Hub & spoke · one centre, many dependents");
  const cx=6.4, cy=4.85, hubR=0.95, Rx=3.05, Ry=1.78, pillW=1.95, pillH=0.62;
  const nodes=["MARKETING","SALES","OPERATIONS","FINANCE","PRODUCT"];
  const pts=nodes.map((_,i)=>{ const ang=(-90+i*72)*Math.PI/180; return {x:cx+Rx*Math.cos(ang),y:cy+Ry*Math.sin(ang)}; });
  // spokes first (under nodes)
  pts.forEach(p=>connector(s,cx,cy,p.x,p.y,TINT_BORDER,0.03));
  // hub
  s.addShape(pres.ShapeType.ellipse,{x:cx-hubR,y:cy-hubR,w:2*hubR,h:2*hubR,fill:{color:ACCENT},line:{color:ACCENT}});
  s.addText("UNIFIED\nDATA\nPLATFORM",{x:cx-hubR,y:cy-hubR,w:2*hubR,h:2*hubR,fontSize:12,bold:true,color:WH,fontFace:FONT,align:"center",valign:"middle",lineSpacingMultiple:0.98});
  // pills
  pts.forEach((p,i)=>{ s.addShape(pres.ShapeType.roundRect,{x:p.x-pillW/2,y:p.y-pillH/2,w:pillW,h:pillH,rectRadius:0.08,fill:{color:WH},line:{color:LINE,pt:1}});
    s.addText(nodes[i],{x:p.x-pillW/2,y:p.y-pillH/2,w:pillW,h:pillH,fontSize:11.5,bold:true,color:INK,fontFace:FONT,align:"center",valign:"middle"}); });
})();

// 6 — bowtie-flow -----------------------------------------------------
(function(){
  const s=frame("BOWTIE",6,"Many causes funnel into one control point, then fan out to many effects.","Three inputs converge on one decision, then drive three outcomes","Bowtie · converge → core → diverge");
  const coreX=6.65, coreY=4.6, ins=["Demand signal","Cost to serve","Risk exposure"], outs=["Price set","SLA promised","Capital booked"];
  const inY=[3.35,4.6,5.85], outY=[3.35,4.6,5.85];
  const inX=2.55, outX=10.75, pw=3.0, ph=0.62;
  // connectors (the bowtie silhouette)
  inY.forEach(y=>connector(s,inX+pw/2,y,coreX-0.62,coreY,TINT_BORDER,0.028));
  outY.forEach(y=>connector(s,coreX+0.62,coreY,outX-pw/2,y,TINT_BORDER,0.028));
  // core node (diamond)
  s.addShape(pres.ShapeType.diamond,{x:coreX-0.85,y:coreY-0.85,w:1.7,h:1.7,fill:{color:ACCENT},line:{color:ACCENT}});
  s.addText("PRICING\nDECISION",{x:coreX-0.85,y:coreY-0.85,w:1.7,h:1.7,fontSize:12,bold:true,color:WH,fontFace:FONT,align:"center",valign:"middle",lineSpacingMultiple:0.98});
  // input/output pills
  ins.forEach((t,i)=>{ s.addShape(pres.ShapeType.roundRect,{x:inX-pw/2,y:inY[i]-ph/2,w:pw,h:ph,rectRadius:0.06,fill:{color:PANEL},line:{color:LINE,pt:1}});
    s.addText(t,{x:inX-pw/2,y:inY[i]-ph/2,w:pw,h:ph,fontSize:11.5,color:BODY,fontFace:FONT,align:"center",valign:"middle"}); });
  outs.forEach((t,i)=>{ s.addShape(pres.ShapeType.roundRect,{x:outX-pw/2,y:outY[i]-ph/2,w:pw,h:ph,rectRadius:0.06,fill:{color:WH},line:{color:LINE,pt:1}});
    s.addText(t,{x:outX-pw/2,y:outY[i]-ph/2,w:pw,h:ph,fontSize:11.5,bold:true,color:INK,fontFace:FONT,align:"center",valign:"middle"}); });
  s.addText("INPUTS",{x:inX-pw/2,y:2.55,w:pw,h:0.28,fontSize:10,bold:true,color:MUTE,fontFace:FONT,align:"center",charSpacing:2});
  s.addText("OUTCOMES",{x:outX-pw/2,y:2.55,w:pw,h:0.28,fontSize:10,bold:true,color:MUTE,fontFace:FONT,align:"center",charSpacing:2});
})();

// 7 — maturity-staircase ---------------------------------------------
(function(){
  const s=frame("STAIRCASE",7,"Each stage is a prerequisite for the next — you cannot skip a tread.","Four stages from ad-hoc to optimised","Maturity staircase · ordered progression");
  const base=6.25, sw=2.6, gap=0.18, x0=1.2, steps=[
    {n:"AD-HOC",d:"undocumented, hero-driven"},
    {n:"DEFINED",d:"written down, repeatable"},
    {n:"MANAGED",d:"measured against targets"},
    {n:"OPTIMISED",d:"continuously improving"}];
  steps.forEach((st,i)=>{ const h=1.0+i*0.82, x=x0+i*(sw+gap), y=base-h, top=i===3;
    s.addShape(pres.ShapeType.rect,{x,y,w:sw,h,fill:{color:top?ACCENT:PANEL},line:{color:top?ACCENT:LINE,pt:1}});
    s.addText(`${i+1}`,{x:x+0.14,y:y+0.1,w:0.5,h:0.3,fontSize:11,bold:true,color:top?TINT:MUTE,fontFace:FONT});
    s.addText(st.n,{x:x+0.1,y:y+0.42,w:sw-0.2,h:0.32,fontSize:13.5,bold:true,color:top?WH:INK,fontFace:FONT,align:"center"});
    s.addText(st.d,{x:x+0.1,y:y+0.74,w:sw-0.2,h:0.5,fontSize:10,italic:true,color:top?TINT:MUTE,fontFace:FONT,align:"center"});
    if(i<3){ const nx=x0+(i+1)*(sw+gap); connector(s,x+sw,base-h,nx,base-(1.0+(i+1)*0.82),MUTE,0.02); } });
  s.addText("→ rising capability",{x:x0,y:base+0.12,w:11.5,h:0.3,fontSize:10.5,italic:true,color:MUTE,fontFace:FONT});
})();

// 8 — nine-box-matrix -------------------------------------------------
(function(){
  const s=frame("NINE-BOX",8,"Two axes, three bands each — nine cells that route the action.","Talent grid: performance against potential","Nine-box matrix · 3×3 segmentation");
  const x0=3.3, y0=2.9, cw=2.55, ch=1.12;
  // cells: [col(0..2 perf low->high)][row(0..2 potential high->low top->bottom)]
  const cells=[["Enigma","Growth","STAR"],["Dilemma","Core","High-impact"],["Question","Effective","Trusted pro"]];
  for(let r=0;r<3;r++) for(let c=0;c<3;c++){ const star=(r===0&&c===2);
    s.addShape(pres.ShapeType.rect,{x:x0+c*cw,y:y0+r*ch,w:cw,h:ch,fill:{color:star?TINT:(r+c>=3?PANEL:WH)},line:{color:star?ACCENT:LINE,pt:star?1.25:1}});
    s.addText(cells[r][c],{x:x0+c*cw+0.08,y:y0+r*ch+ch/2-0.16,w:cw-0.16,h:0.32,fontSize:star?12.5:11.5,bold:star,color:star?ACCENT:INK,fontFace:FONT,align:"center"}); }
  // axes (no rotated text)
  s.addText("POTENTIAL  ↑",{x:2.0,y:y0,w:1.25,h:0.3,fontSize:9.5,bold:true,color:MUTE,fontFace:FONT,align:"center",charSpacing:1});
  s.addText("low",{x:2.0,y:y0+3*ch-0.3,w:1.25,h:0.3,fontSize:9,italic:true,color:MUTE,fontFace:FONT,align:"center"});
  s.addText("PERFORMANCE  →",{x:x0,y:y0+3*ch+0.12,w:3*cw,h:0.3,fontSize:9.5,bold:true,color:MUTE,fontFace:FONT,align:"center",charSpacing:1});
})();

// 9 — radar-spider ----------------------------------------------------
(function(){
  const s=frame("RADAR",9,"Read the shape, not the rows — gaps jump out where the line caves in.","Capability assessment: where we trail the target","Radar / spider · multi-dimension profile");
  const dims=["Data","Talent","Tooling","Process","Speed","Governance"];
  const data=[{name:"Today",labels:dims,values:[3,4,2,3,4,2]},{name:"Target",labels:dims,values:[5,5,4,4,5,4]}];
  s.addChart(pres.ChartType.radar,data,{x:0.7,y:2.55,w:7.4,h:4.3,radarStyle:"standard",
    chartColors:[ACCENT,MUTE],chartColorsOpacity:[35,0],lineSize:2.25,
    showLegend:true,legendPos:"b",legendColor:BODY,legendFontFace:FONT,legendFontSize:11,
    catAxisLabelColor:INK,catAxisLabelFontFace:FONT,catAxisLabelFontSize:10.5,
    valAxisHidden:true,valAxisMaxVal:5,valAxisMinVal:0});
  // right read-out panel
  s.addShape(pres.ShapeType.rect,{x:8.55,y:2.7,w:4.25,h:4.0,fill:{color:TINT},line:{color:TINT_BORDER,pt:1}});
  s.addText("WIDEST GAPS",{x:8.85,y:2.95,w:3.7,h:0.3,fontSize:10.5,bold:true,color:ACCENT,fontFace:FONT,charSpacing:2});
  [["Tooling","+3","legacy stack, no automation"],["Governance","+2","no model-risk policy"],["Data","+2","fragmented sources"]].forEach((g,i)=>{ const y=3.45+i*1.0;
    s.addText(g[0],{x:8.85,y,w:2.6,h:0.3,fontSize:13,bold:true,color:INK,fontFace:FONT});
    s.addText(g[1],{x:11.5,y,w:1.0,h:0.3,fontSize:13,bold:true,color:ACCENT,fontFace:FONT,align:"right"});
    s.addText(g[2],{x:8.85,y:y+0.3,w:3.65,h:0.4,fontSize:10,italic:true,color:MUTE,fontFace:FONT}); });
})();

// 10 — pros-cons-weighing --------------------------------------------
(function(){
  const s=frame("PROS / CONS",10,"Weigh both columns, then state the call — do not leave it implied.","Build versus buy, and the verdict it points to","Pros / cons · two-sided weighing");
  const colW=5.55, lx=0.8, rx=7.0, hy=2.75, iy=3.45, rh=0.66;
  s.addShape(pres.ShapeType.rect,{x:6.665,y:hy,w:0.012,h:3.1,fill:{color:LINE},line:{color:LINE}});
  s.addText("FOR  ·  BUILD",{x:lx,y:hy,w:colW,h:0.34,fontSize:13,bold:true,color:INK,fontFace:FONT,charSpacing:1});
  s.addText("AGAINST  ·  BUILD",{x:rx,y:hy,w:colW,h:0.34,fontSize:13,bold:true,color:INK,fontFace:FONT,charSpacing:1});
  const pros=["Full control of the roadmap","Deep fit to our workflow","No per-seat licence drag","IP stays in-house"];
  const cons=["6–9 months to parity","Carries permanent maintenance","Pulls 3 engineers off roadmap","We re-solve a solved problem"];
  function mark(s,x,y,sym,col){ s.addShape(pres.ShapeType.ellipse,{x,y,w:0.3,h:0.3,fill:{color:col},line:{color:col}});
    s.addText(sym,{x,y:y-0.01,w:0.3,h:0.3,fontSize:14,bold:true,color:WH,fontFace:FONT,align:"center",valign:"middle"}); }
  pros.forEach((t,i)=>{ const y=iy+i*rh; mark(s,lx,y,"+",G); s.addText(t,{x:lx+0.45,y:y-0.04,w:colW-0.5,h:0.38,fontSize:11.8,color:BODY,fontFace:FONT,valign:"middle"}); });
  cons.forEach((t,i)=>{ const y=iy+i*rh; mark(s,rx,y,"–",R); s.addText(t,{x:rx+0.45,y:y-0.04,w:colW-0.5,h:0.38,fontSize:11.8,color:BODY,fontFace:FONT,valign:"middle"}); });
  // verdict strip (INK-emphasis)
  s.addShape(pres.ShapeType.rect,{x:lx,y:6.25,w:11.75,h:0.62,fill:{color:INK},line:{color:INK}});
  s.addText([{text:"VERDICT   ",options:{bold:true,color:ACCENT,charSpacing:2}},{text:"Buy now to ship this quarter; revisit build once the workflow is proven.",options:{color:WH}}],
    {x:lx+0.25,y:6.25,w:11.3,h:0.62,fontSize:12.5,fontFace:FONT,valign:"middle"});
})();

// 11 — nested-containers ---------------------------------------------
(function(){
  const s=frame("NESTED",11,"Each ring is a strict subset of the one around it.","Market sizing: total, serviceable, obtainable","Nested containers · containment / subset");
  const levels=[
    {x:2.45,y:2.85,w:8.45,h:3.7,fill:WH,bd:LINE,lab:"TAM · TOTAL ADDRESSABLE",val:"$4.2B",tc:INK},
    {x:3.35,y:3.45,w:6.65,h:2.5,fill:PANEL,bd:LINE,lab:"SAM · SERVICEABLE",val:"$900M",tc:INK},
    {x:4.55,y:4.05,w:4.25,h:1.3,fill:TINT,bd:ACCENT,lab:"SOM · OBTAINABLE",val:"$120M",tc:ACCENT}];
  levels.forEach((L,i)=>{ s.addShape(pres.ShapeType.rect,{x:L.x,y:L.y,w:L.w,h:L.h,fill:{color:L.fill},line:{color:L.bd,pt:i===2?1.25:1}});
    s.addText(L.lab,{x:L.x+0.18,y:L.y+0.12,w:L.w-0.36,h:0.28,fontSize:i===2?11:10.5,bold:true,color:L.tc,fontFace:FONT,charSpacing:1}); });
  // values on the right edge of each band
  levels.forEach((L)=>s.addText(L.val,{x:L.x+L.w-1.7,y:L.y+0.1,w:1.5,h:0.32,fontSize:13,bold:true,color:L.tc,fontFace:FONT,align:"right"}));
  s.addText("3% of the serviceable market in three years — the number the plan must defend.",
    {x:2.45,y:6.62,w:8.45,h:0.3,fontSize:10.5,italic:true,color:MUTE,fontFace:FONT});
})();

pres.writeFile({fileName:"/tmp/primlib/out/primitives.pptx"}).then(p=>console.log("WROTE",p)).catch(e=>{console.error("ERR",e);process.exit(1)});

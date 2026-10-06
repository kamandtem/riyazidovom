import React from 'react';
import { toFa } from '../../utils/fa';
import { Expr, ShapeSvg, Tally } from './Visuals';
import { ClockFace } from './renderers/Clock';

/**
 * تصویرهای آموزشی پایهٔ دوم، با همان رنگ‌ها و خط‌های قهوه‌ای پروژهٔ پایهٔ اول.
 * هر تصویر با یک «spec» ساده (داده) ساخته می‌شود تا تمرین‌ها data-driven بمانند:
 *   { kind: 'pv', h: 2, t: 3, o: 1 }  یا  { kind: 'coins', coins: [100, 10, 10, 1] }  و ...
 */
export const INK = '#5a3510';
export const PAL: Record<string, string> = {
  red: '#FF5A5F', blue: '#3FA7F5', green: '#39C47A', yellow: '#FFC83D', white: '#FFFFFF', black: '#3B3350',
  orange: '#FF8A3D', purple: '#A46BF5', brown: '#C98A4B', gray: '#C9CED8',
};
export const COLOR_NAME: Record<string, string> = { red: 'قرمز', blue: 'آبی', green: 'سبز', yellow: 'زرد', white: 'سفید', black: 'سیاه', orange: 'نارنجی', purple: 'بنفش' };
const fa = toFa;
const FONT = 'IRANSansDN,Vazirmatn,Tahoma,sans-serif';

/* ---------- صدتایی، ده‌تایی، یکی (مثل شکل‌های کتاب) ---------- */
const Flat: React.FC<{ s?: number }> = ({ s = 64 }) => <svg viewBox="0 0 104 104" width={s} height={s} className="g2-flat" aria-label="صدتایی">
  <rect x={2} y={2} width={100} height={100} rx={6} fill="#FFB86B" stroke={INK} strokeWidth={3} />
  {Array.from({ length: 9 }, (_, k) => <g key={k}><line x1={12 + k * 10} y1={2} x2={12 + k * 10} y2={102} stroke={INK} strokeOpacity={.35} strokeWidth={1.4} /><line x1={2} y1={12 + k * 10} x2={102} y2={12 + k * 10} stroke={INK} strokeOpacity={.35} strokeWidth={1.4} /></g>)}
</svg>;
const Rod: React.FC<{ s?: number }> = ({ s = 64 }) => <svg viewBox="0 0 14 104" width={s * 14 / 104} height={s} className="g2-rod" aria-label="ده‌تایی">
  <rect x={2} y={2} width={10} height={100} rx={3} fill="#7CCBFF" stroke={INK} strokeWidth={2.4} />
  {Array.from({ length: 9 }, (_, k) => <line key={k} x1={2} y1={12 + k * 10} x2={12} y2={12 + k * 10} stroke={INK} strokeOpacity={.4} strokeWidth={1.3} />)}
</svg>;
const Cube: React.FC<{ s?: number }> = ({ s = 64 }) => <svg viewBox="0 0 14 14" width={s * 14 / 104} height={s * 14 / 104} className="g2-cube" aria-label="یکی"><rect x={1.5} y={1.5} width={11} height={11} rx={2.5} fill="#FF7A7F" stroke={INK} strokeWidth={2} /></svg>;

export const PV3: React.FC<{ h?: number; t?: number; o?: number; s?: number }> = ({ h = 0, t = 0, o = 0, s = 70 }) => <div className="g2-pv" dir="ltr">
  {h > 0 && <div className="g2-pv-col h">{Array.from({ length: h }, (_, i) => <Flat key={i} s={s} />)}</div>}
  {t > 0 && <div className="g2-pv-col t">{Array.from({ length: t }, (_, i) => <Rod key={i} s={s} />)}</div>}
  {o > 0 && <div className="g2-pv-col o">{Array.from({ length: o }, (_, i) => <Cube key={i} s={s * 1.7} />)}</div>}
  {h + t + o === 0 && <span className="g2-empty">—</span>}
</div>;

/** جدول ارزش مکانی: صدگان | دهگان | یکان (چپ به راست، مثل کتاب) */
export const PVTable3: React.FC<{ h?: number | null; t?: number | null; o?: number | null; cols?: 2 | 3 }> = ({ h = null, t = null, o = null, cols = 3 }) => {
  const c = (v: number | null) => v === null ? '؟' : fa(v);
  return <table className="mx-pv g2-pvt" dir="ltr"><thead><tr>{cols === 3 && <th>صدگان</th>}<th>دهگان</th><th>یکان</th></tr></thead>
    <tbody><tr>{cols === 3 && <td>{c(h)}</td>}<td>{c(t)}</td><td>{c(o)}</td></tr></tbody></table>;
};

/* ---------- چرتکه (کتاب ص ۵۸ و ۶۳) ---------- */
export const Abacus: React.FC<{ h: number; t: number; o: number; onRod?: (i: number) => void; size?: number }> = ({ h, t, o, onRod, size = 260 }) => {
  const vals = [h, t, o]; const labels = ['ص', 'د', 'ی']; const colors = [PAL.orange, PAL.blue, PAL.red];
  return <svg viewBox="0 0 220 200" className="g2-abacus" style={{ width: size, maxWidth: '100%' }} dir="ltr">
    <rect x={8} y={176} width={204} height={16} rx={6} fill="#C98A4B" stroke={INK} strokeWidth={3} />
    {vals.map((v, i) => { const x = 45 + i * 65;
      return <g key={i} onClick={onRod ? () => onRod(i) : undefined} style={onRod ? { cursor: 'pointer' } : undefined}>
        {onRod && <rect x={x - 30} y={6} width={60} height={170} fill="transparent" />}
        <line x1={x} y1={14} x2={x} y2={176} stroke={INK} strokeWidth={5} strokeLinecap="round" />
        {Array.from({ length: v }, (_, k) => <ellipse key={k} cx={x} cy={166 - k * 15} rx={22} ry={7.5} fill={colors[i]} stroke={INK} strokeWidth={2.2} />)}
        <text x={x} y={198} textAnchor="middle" fontSize={0} />
        <text x={x} y={12} textAnchor="middle" fontSize={0} />
        <g transform={`translate(${x} 0)`}><text y={-2} /></g>
        <text x={x} y={196 - 200} />
        <text x={x} y={190} textAnchor="middle" fontSize={13} fontWeight={900} fill="#fff" fontFamily={FONT}>{labels[i]}</text>
      </g>; })}
  </svg>;
};

/* ---------- سکه‌ها ---------- */
const COIN: Record<number, { r: number; fill: string; rim: string }> = {
  1: { r: 17, fill: '#E8A16B', rim: '#B5692F' }, 10: { r: 21, fill: '#D9DEE6', rim: '#8F98A6' },
  50: { r: 23, fill: '#F2D27A', rim: '#B88A1F' }, 100: { r: 26, fill: '#FFD34D', rim: '#C9930F' },
};
export const Coin: React.FC<{ v: number; size?: number }> = ({ v, size }) => { const c = COIN[v] || COIN[10]; const s = size || c.r * 2 + 4;
  return <svg viewBox="0 0 60 60" width={s} height={s} className="g2-coin" aria-label={`سکهٔ ${v} ریالی`}>
    <circle cx={30} cy={30} r={27} fill={c.fill} stroke={c.rim} strokeWidth={4} /><circle cx={30} cy={30} r={20} fill="none" stroke={c.rim} strokeWidth={1.6} strokeDasharray="3 3" />
    <text x={30} y={37} textAnchor="middle" fontSize={v >= 100 ? 17 : 20} fontWeight={900} fill={INK} fontFamily={FONT}>{fa(v)}</text>
  </svg>; };
export const Coins: React.FC<{ coins: number[]; scale?: number }> = ({ coins, scale = 1 }) => <div className="g2-coins" dir="ltr">
  {[...coins].sort((a, b) => b - a).map((v, i) => <Coin key={i} v={v} size={((COIN[v]?.r || 20) * 2 + 4) * scale} />)}
</div>;

/* ---------- کسر: شکل تقسیم شده به قسمت‌ها ----------
 * equal=false یعنی قسمت‌ها مساوی نیستند (برای «کدام شکل به قسمت‌های مساوی تقسیم نشده؟»)
 */
export const FracShape: React.FC<{ shape?: 'bar' | 'circle' | 'square' | 'grid'; parts: number; colored?: number[]; equal?: boolean; onPart?: (i: number) => void; size?: number; color?: string; rows?: number }> =
  ({ shape = 'bar', parts, colored = [], equal = true, onPart, size = 220, color = PAL.blue, rows }) => {
  const fill = (i: number) => colored.includes(i) ? color : '#FFFDF7';
  const tap = (i: number) => onPart ? () => onPart(i) : undefined;
  const cur = onPart ? { cursor: 'pointer' } : undefined;
  if (shape === 'circle') {
    const cuts: number[] = equal ? Array.from({ length: parts }, (_, i) => i / parts) : unequalCuts(parts);
    return <svg viewBox="0 0 120 120" width={size * .6} height={size * .6} className="g2-frac">
      {cuts.map((c, i) => { const c2 = i + 1 < cuts.length ? cuts[i + 1] : 1; const a1 = c * 2 * Math.PI - Math.PI / 2, a2 = c2 * 2 * Math.PI - Math.PI / 2;
        const large = c2 - c > .5 ? 1 : 0;
        const d = parts === 1 ? 'M60 6 A54 54 0 1 1 59.9 6 Z' : `M60 60 L${60 + 54 * Math.cos(a1)} ${60 + 54 * Math.sin(a1)} A54 54 0 ${large} 1 ${60 + 54 * Math.cos(a2)} ${60 + 54 * Math.sin(a2)} Z`;
        return <path key={i} d={d} fill={fill(i)} stroke={INK} strokeWidth={3} strokeLinejoin="round" onClick={tap(i)} style={cur} />; })}
    </svg>;
  }
  if (shape === 'grid' || shape === 'square') {
    const r = rows || (shape === 'square' ? Math.round(Math.sqrt(parts)) : 2); const c = Math.ceil(parts / r);
    const cw = 100 / c, ch = 100 / r;
    return <svg viewBox="-3 -3 106 106" width={size * .62} height={size * .62} className="g2-frac">
      {Array.from({ length: parts }, (_, i) => <rect key={i} x={(i % c) * cw} y={Math.floor(i / c) * ch} width={cw} height={ch} fill={fill(i)} stroke={INK} strokeWidth={2.6} onClick={tap(i)} style={cur} />)}
    </svg>;
  }
  const cuts: number[] = equal ? Array.from({ length: parts }, (_, i) => i / parts) : unequalCuts(parts);
  return <svg viewBox="-3 -3 206 56" width={size} height={size * 56 / 206} className="g2-frac">
    {cuts.map((c, i) => { const c2 = i + 1 < cuts.length ? cuts[i + 1] : 1; return <rect key={i} x={c * 200} y={0} width={(c2 - c) * 200} height={50} fill={fill(i)} stroke={INK} strokeWidth={2.6} onClick={tap(i)} style={cur} />; })}
  </svg>;
};
function unequalCuts(parts: number) { const w = [1.6, .7, 1.2, .5, 1.4, .8]; const ws = Array.from({ length: parts }, (_, i) => w[i % w.length]); const tot = ws.reduce((a, b) => a + b, 0); let acc = 0; return ws.map(x => { const c = acc / tot; acc += x; return c; }); }

/* ---------- کیسهٔ مهره و جعبه (احتمال، فصل ۷) ---------- */
export const Bag: React.FC<{ counts: Record<string, number>; size?: number; label?: string }> = ({ counts, size = 190, label }) => {
  const beads = Object.entries(counts).flatMap(([c, n]) => Array.from({ length: n }, () => c));
  const n = beads.length; const cols = n <= 6 ? 3 : n <= 12 ? 4 : 5; const R = n <= 6 ? 11 : n <= 12 ? 9 : 7;
  // ترتیب ثابت ولی درهم (بدون تصادف تا با هر رندر جابه‌جا نشود)
  const order = beads.map((c, i) => ({ c, k: (i * 7 + 3) % (n || 1) })).sort((a, b) => a.k - b.k).map(x => x.c);
  return <div className="g2-bag-wrap"><svg viewBox="0 0 140 150" width={size * .75} height={size * .8} className="g2-bag">
    <path d="M40 30 Q70 44 100 30 L110 40 Q140 90 120 130 Q70 150 20 130 Q0 90 30 40 Z" fill="#F3D7AE" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
    <path d="M38 30 Q70 20 102 30" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
    {order.map((c, i) => { const row = Math.floor(i / cols), col = i % cols; const w = (cols - 1) * R * 2.3;
      return <circle key={i} cx={70 - w / 2 + col * R * 2.3 + (row % 2 ? R * .5 : 0)} cy={60 + row * R * 2.2} r={R} fill={PAL[c] || c} stroke={INK} strokeWidth={2} />; })}
  </svg>{label && <b className="g2-cap">{label}</b>}</div>;
};

/* ---------- صفحهٔ چرخنده و هدف تیراندازی ---------- */
export const Spinner: React.FC<{ sectors: string[]; size?: number; target?: boolean }> = ({ sectors, size = 200, target }) => {
  const n = sectors.length;
  if (target) return <svg viewBox="0 0 120 120" width={size * .7} height={size * .7} className="g2-spinner">
    {sectors.map((c, i) => <circle key={i} cx={60} cy={60} r={56 - i * (56 / n)} fill={PAL[c] || c} stroke={INK} strokeWidth={2.6} />)}
  </svg>;
  return <svg viewBox="0 0 120 120" width={size * .7} height={size * .7} className="g2-spinner">
    {sectors.map((c, i) => { const a1 = i / n * 2 * Math.PI - Math.PI / 2, a2 = (i + 1) / n * 2 * Math.PI - Math.PI / 2;
      return <path key={i} d={`M60 60 L${60 + 54 * Math.cos(a1)} ${60 + 54 * Math.sin(a1)} A54 54 0 ${n === 1 ? 1 : 0} 1 ${60 + 54 * Math.cos(a2)} ${60 + 54 * Math.sin(a2)} Z`} fill={PAL[c] || c} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />; })}
    <g transform="rotate(35 60 60)"><line x1={60} y1={60} x2={60} y2={20} stroke={INK} strokeWidth={4} strokeLinecap="round" /><polygon points="60,12 54,24 66,24" fill={INK} /></g>
    <circle cx={60} cy={60} r={6} fill={INK} />
  </svg>;
};

/* ---------- نمودار ستونی ---------- */
export const Bars: React.FC<{ labels: string[]; values: number[]; max?: number; colors?: string[]; onCell?: (col: number, v: number) => void; target?: number[]; showValues?: boolean }> =
  ({ labels, values, max, colors, onCell, showValues = true }) => {
  const M = max || Math.max(4, ...values);
  const cw = 46, ch = Math.min(22, 200 / M), W = labels.length * (cw + 14) + 40, H = M * ch + 54;
  return <svg viewBox={`0 0 ${W} ${H}`} className="g2-bars" style={{ width: Math.min(W * 1.25, 640), maxWidth: '100%' }} dir="ltr">
    <line x1={30} y1={H - 40} x2={W - 4} y2={H - 40} stroke={INK} strokeWidth={3} />
    <line x1={30} y1={8} x2={30} y2={H - 40} stroke={INK} strokeWidth={3} />
    {Array.from({ length: M }, (_, k) => <g key={k}><line x1={30} y1={H - 40 - (k + 1) * ch} x2={W - 4} y2={H - 40 - (k + 1) * ch} stroke={INK} strokeOpacity={.12} />
      {(M <= 12 || (k + 1) % 2 === 0) && <text x={24} y={H - 40 - (k + 1) * ch + 5} textAnchor="end" fontSize={11} fontWeight={800} fill={INK} fontFamily={FONT}>{fa(k + 1)}</text>}</g>)}
    {labels.map((lb, i) => { const x = 40 + i * (cw + 14); const col = PAL[colors?.[i] || ''] || colors?.[i] || [PAL.blue, PAL.green, PAL.red, PAL.yellow, PAL.purple, PAL.orange, PAL.brown][i % 7];
      return <g key={i}>
        {Array.from({ length: M }, (_, k) => { const on = k < values[i];
          return <rect key={k} x={x} y={H - 40 - (k + 1) * ch + 1} width={cw} height={ch - 2} rx={3} fill={on ? col : onCell ? '#FFFDF7' : 'transparent'} stroke={on || onCell ? INK : 'none'} strokeOpacity={on ? .55 : .2} strokeWidth={1.5}
            onClick={onCell ? () => onCell(i, k + 1) : undefined} style={onCell ? { cursor: 'pointer' } : undefined} />; })}
        {showValues && values[i] > 0 && <text x={x + cw / 2} y={H - 44 - values[i] * ch} textAnchor="middle" fontSize={13} fontWeight={900} fill={INK} fontFamily={FONT}>{fa(values[i])}</text>}
        <text x={x + cw / 2} y={H - 22} textAnchor="middle" fontSize={labels.some(l => l.length > 5) ? 10 : 12.5} fontWeight={900} fill={INK} fontFamily={FONT}>{lb}</text>
      </g>; })}
  </svg>;
};

/* ---------- نمودار تصویری: هر شکل = چند تا ---------- */
export const Pictograph: React.FC<{ labels: string[]; values: number[]; icon: string; per: number; onRow?: (i: number) => void; onUndo?: (i: number) => void }> = ({ labels, values, icon, per, onRow, onUndo }) =>
  <div className="g2-picto">
    <p className="g2-picto-key">هر <span>{icon}</span> = {fa(per)} تا</p>
    {labels.map((lb, i) => <div key={i} className="g2-picto-row"><b>{lb}</b>
      <span className="g2-picto-icons">{Array.from({ length: values[i] }, (_, k) => <i key={k} onClick={onUndo ? () => onUndo(i) : undefined}>{icon}</i>)}</span>
      {onRow && <button type="button" className="g2-picto-add" onClick={() => onRow(i)}>+</button>}
    </div>)}
  </div>;

/* ---------- خط‌کش (سانتی‌متر و میلی‌متر) ---------- */
export const Ruler: React.FC<{ cm?: number; lineMm?: number; startMm?: number; mm?: boolean; object?: 'line' | 'pencil' | 'eraser' | 'ant' | 'none'; onTick?: (mm: number) => void; mark?: number | null }> =
  ({ cm = 12, lineMm = 0, startMm = 0, mm = true, object = 'line', onTick, mark = null }) => {
  const U = 30; const W = cm * U + 40; const top = 46;
  const X = (m: number) => 20 + m / 10 * U;
  return <svg viewBox={`0 0 ${W} ${top + 62}`} className="g2-ruler" style={{ width: Math.min(W * 1.15, 720), maxWidth: '100%' }} dir="ltr">
    {object === 'line' && lineMm > 0 && <line x1={X(startMm)} y1={top - 14} x2={X(startMm + lineMm)} y2={top - 14} stroke={PAL.red} strokeWidth={6} strokeLinecap="round" />}
    {object === 'pencil' && lineMm > 0 && <g><rect x={X(startMm)} y={top - 26} width={X(startMm + lineMm) - X(startMm) - 16} height={18} rx={3} fill={PAL.yellow} stroke={INK} strokeWidth={2.4} />
      <polygon points={`${X(startMm + lineMm) - 16},${top - 26} ${X(startMm + lineMm)},${top - 17} ${X(startMm + lineMm) - 16},${top - 8}`} fill="#F7D3A8" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" /></g>}
    {object === 'eraser' && lineMm > 0 && <rect x={X(startMm)} y={top - 28} width={X(startMm + lineMm) - X(startMm)} height={22} rx={5} fill="#FF9EB5" stroke={INK} strokeWidth={2.4} />}
    {object === 'ant' && lineMm > 0 && <g><ellipse cx={(X(startMm) + X(startMm + lineMm)) / 2} cy={top - 16} rx={(X(startMm + lineMm) - X(startMm)) / 2} ry={7} fill={INK} /></g>}
    {mark !== null && <line x1={X(0)} y1={top - 14} x2={X(mark)} y2={top - 14} stroke={PAL.green} strokeWidth={6} strokeLinecap="round" />}
    <rect x={6} y={top} width={W - 12} height={56} rx={8} fill="#FFE9A8" stroke={INK} strokeWidth={3} />
    {Array.from({ length: cm * (mm ? 10 : 1) + 1 }, (_, k) => { const m = mm ? k : k * 10; const big = m % 10 === 0; const half = m % 5 === 0;
      return <g key={k}>
        <line x1={X(m)} y1={top} x2={X(m)} y2={top + (big ? 20 : half ? 13 : 8)} stroke={INK} strokeWidth={big ? 2.4 : 1.2} />
        {big && <text x={X(m)} y={top + 38} textAnchor="middle" fontSize={14} fontWeight={900} fill={INK} fontFamily={FONT}>{fa(m / 10)}</text>}
        {onTick && big && <rect x={X(m) - U / 2} y={top - 30} width={U} height={92} fill="transparent" style={{ cursor: 'pointer' }} onClick={() => onTick(m)} />}
      </g>; })}
    <text x={W - 26} y={top + 52} textAnchor="end" fontSize={9} fontWeight={800} fill={INK} fontFamily={FONT}>سانتی‌متر</text>
  </svg>;
};

/* ---------- اندازه‌گیری با واحد غیر استاندارد (گیره، پاک‌کن، چینه) ---------- */
export const UnitsMeasure: React.FC<{ len: number; unit: string; item: string }> = ({ len, unit, item }) => {
  const U = 44; const full = Math.ceil(len); const W = full * U + 30;
  return <svg viewBox={`0 0 ${W} 110`} className="g2-units" style={{ width: Math.min(W * 1.2, 640), maxWidth: '100%' }} dir="ltr">
    <g>{item === 'pencil'
      ? <><rect x={12} y={14} width={len * U - 22} height={24} rx={4} fill={PAL.green} stroke={INK} strokeWidth={2.6} /><polygon points={`${12 + len * U - 22},14 ${12 + len * U},26 ${12 + len * U - 22},38`} fill="#F7D3A8" stroke={INK} strokeWidth={2.6} strokeLinejoin="round" /></>
      : item === 'rope' ? <path d={`M12 26 H${12 + len * U}`} stroke={PAL.brown} strokeWidth={9} strokeLinecap="round" />
      : <rect x={12} y={14} width={len * U} height={24} rx={6} fill={PAL.orange} stroke={INK} strokeWidth={2.6} />}</g>
    <line x1={12} y1={8} x2={12} y2={100} stroke={INK} strokeDasharray="4 4" strokeWidth={1.6} />
    {Array.from({ length: full }, (_, k) => <text key={k} x={12 + k * U + U / 2} y={80} textAnchor="middle" fontSize={34}>{unit}</text>)}
  </svg>;
};

/* ---------- ساختمان چینه‌ای (کتاب ص ۱۲): هر طبقه k چینه ---------- */
export const Floors: React.FC<{ floors: number; per: number; color?: string }> = ({ floors, per, color = PAL.red }) => {
  const s = Math.min(26, 220 / per); const W = per * s + 8, H = floors * s + 8;
  return <svg viewBox={`0 0 ${W} ${H}`} style={{ width: W * 1.3, maxWidth: '100%', maxHeight: '42cqh' }} className="g2-floors">
    {Array.from({ length: floors }, (_, f) => Array.from({ length: per }, (_, k) => <rect key={`${f}-${k}`} x={4 + k * s} y={H - 4 - (f + 1) * s} width={s - 2} height={s - 2} rx={3}
      fill={f % 2 ? PAL.yellow : color} stroke={INK} strokeWidth={1.8} />))}
  </svg>;
};

/* ---------- دسته‌ها: «۴ تا ۳تایی» ---------- */
export const Groups: React.FC<{ groups: number; size: number; emoji?: string }> = ({ groups, size, emoji = '🔵' }) => <div className="g2-groups">
  {Array.from({ length: groups }, (_, g) => <span key={g} className="g2-group">{Array.from({ length: size }, (_, k) => <i key={k}>{emoji}</i>)}</span>)}
</div>;

/* ---------- محور ساده (ده‌تایی، صدتایی، کسر) ---------- */
export const SimpleLine: React.FC<{ min: number; max: number; step: number; labelEvery?: number; marks?: { v: number; label?: string; color?: string }[]; sub?: number; arrows?: { from: number; to: number }[] }> =
  ({ min, max, step, labelEvery, marks = [], sub = 1, arrows = [] }) => {
  const n = Math.round((max - min) / step); const W = Math.max(360, n * 46) + 40; const base = 70;
  const x = (v: number) => 20 + (v - min) / (max - min) * (W - 40);
  const le = labelEvery || step;
  return <svg viewBox={`0 0 ${W} 110`} className="g2-line" style={{ width: Math.min(W * 1.1, 760), maxWidth: '100%' }} dir="ltr">
    <line x1={8} y1={base} x2={W - 6} y2={base} stroke="#7a4a1c" strokeWidth={4} strokeLinecap="round" />
    {Array.from({ length: n * sub + 1 }, (_, k) => { const v = min + k * step / sub; const major = k % sub === 0; const lab = major && Math.abs((v - min) / le - Math.round((v - min) / le)) < 1e-6;
      return <g key={k}><line x1={x(v)} y1={base - (major ? 10 : 6)} x2={x(v)} y2={base + (major ? 10 : 6)} stroke="#7a4a1c" strokeWidth={major ? 3 : 2} />
        {lab && <text x={x(v)} y={base + 30} textAnchor="middle" fontSize={15} fontWeight={900} fill="#5a3510" fontFamily={FONT}>{fa(Math.round(v * 100) / 100)}</text>}</g>; })}
    {arrows.map((a, i) => { const x1 = x(a.from), x2 = x(a.to), mx = (x1 + x2) / 2; const fwd = a.to >= a.from;
      return <path key={i} d={`M${x1} ${base - 6} Q${mx} ${base - 60} ${x2} ${base - 6}`} fill="none" stroke={fwd ? '#2FB165' : '#F2603A'} strokeWidth={4} strokeLinecap="round" />; })}
    {marks.map((m, i) => <g key={i}><circle cx={x(m.v)} cy={base} r={9} fill={m.color || '#2F8FE8'} stroke="#fff" strokeWidth={2.5} />
      {m.label && <g transform={`translate(${x(m.v)} ${base - 26})`}><rect x={-16} y={-13} width={32} height={22} rx={11} fill="#fff" stroke={m.color || '#2F8FE8'} strokeWidth={2.5} /><text y={4} textAnchor="middle" fontSize={14} fontWeight={900} fill={INK} fontFamily={FONT}>{m.label}</text></g>}</g>)}
  </svg>;
};

/* ---------- دنبالهٔ عددی با جای خالی ---------- */
export const Seq: React.FC<{ items: (number | string | null)[] }> = ({ items }) => <div className="g2-seq" dir="ltr">
  {items.map((v, i) => <span key={i} className={`g2-seq-cell ${v === null ? 'gap' : ''}`}>{v === null ? '؟' : typeof v === 'number' ? fa(v) : v}</span>)}
</div>;

/* ---------- جدول چوب‌خط ---------- */
export const TallyTable: React.FC<{ labels: string[]; counts: number[]; showCount?: boolean; head?: string }> = ({ labels, counts, showCount = true, head = '' }) =>
  <table className="g2-tally"><thead><tr><th>{head}</th><th>چوب‌خط</th>{showCount && <th>تعداد</th>}</tr></thead>
    <tbody>{labels.map((l, i) => <tr key={i}><td><b>{l}</b></td><td className="g2-tally-cell">{counts[i] > 0 ? <Tally n={counts[i]} small /> : '—'}</td>{showCount && <td>{fa(counts[i])}</td>}</tr>)}</tbody></table>;

/* ---------- جدول داده (روز/ساعت و ...) ---------- */
export const DataTable: React.FC<{ head: [string, string]; labels: string[]; values: (number | string)[] }> = ({ head, labels, values }) =>
  <table className="g2-data"><tbody>
    <tr><th>{head[0]}</th>{labels.map((l, i) => <td key={i}>{l}</td>)}</tr>
    <tr><th>{head[1]}</th>{values.map((v, i) => <td key={i}><b>{typeof v === 'number' ? fa(v) : v}</b></td>)}</tr>
  </tbody></table>;

/* ---------- عبارت ستونی (فقط برای نمایش) ---------- */
export const ColumnView: React.FC<{ a: number; b: number; op: '+' | '-' }> = ({ a, b, op }) => {
  const w = Math.max(String(a).length, String(b).length);
  const pad = (n: number) => String(n).padStart(w, ' ').split('');
  return <div className="g2-col" dir="ltr">
    <div className="g2-col-row">{pad(a).map((d, i) => <span key={i}>{d === ' ' ? '' : fa(d)}</span>)}</div>
    <div className="g2-col-row op"><em>{op === '+' ? '+' : '−'}</em>{pad(b).map((d, i) => <span key={i}>{d === ' ' ? '' : fa(d)}</span>)}</div>
    <div className="g2-col-bar" />
  </div>;
};

/** نمایش‌دهندهٔ عمومی از روی spec */
export const Visual: React.FC<{ v: any; size?: number }> = ({ v, size }) => {
  if (!v) return null;
  switch (v.kind) {
    case 'expr': return <Expr big={v.big !== false} parts={v.parts} />;
    case 'pv': return <><PV3 h={v.h} t={v.t} o={v.o} s={v.s || size || 70} />{v.table && <PVTable3 h={v.showTable ? v.h : null} t={v.showTable ? v.t : null} o={v.showTable ? v.o : null} cols={v.h ? 3 : 2} />}</>;
    case 'pvTable': return <PVTable3 h={v.h} t={v.t} o={v.o} cols={v.cols || 3} />;
    case 'abacus': return <Abacus h={v.h} t={v.t} o={v.o} size={size || 250} />;
    case 'coins': return <Coins coins={v.coins} scale={v.scale || 1} />;
    case 'clock': return <ClockFace h={v.h} m={v.m || 0} size={size || 220} wedge={v.wedge} />;
    case 'clocks': return <div className="g2-row">{v.list.map((c: any, i: number) => <ClockFace key={i} h={c.h} m={c.m || 0} size={150} />)}</div>;
    case 'frac': return <FracShape shape={v.shape} parts={v.parts} colored={v.colored} equal={v.equal !== false} size={size || 240} rows={v.rows} color={v.color ? PAL[v.color] : undefined} />;
    case 'fracs': return <div className="g2-row">{v.list.map((f: any, i: number) => <div key={i} className="g2-cell"><FracShape shape={f.shape} parts={f.parts} colored={f.colored} equal={f.equal !== false} size={150} rows={f.rows} color={f.color ? PAL[f.color] : undefined} />{f.label && <b className="g2-cap">{f.label}</b>}</div>)}</div>;
    case 'flag': return <svg viewBox="0 0 150 90" width={210} className="g2-flag"><rect x={0} y={0} width={150} height={30} fill="#239F40" /><rect x={0} y={30} width={150} height={30} fill="#fff" /><rect x={0} y={60} width={150} height={30} fill="#DA0000" /><rect x={1} y={1} width={148} height={88} fill="none" stroke={INK} strokeWidth={2} /><text x={75} y={53} textAnchor="middle" fontSize={20} fill="#DA0000">✿</text></svg>;
    case 'bag': return <Bag counts={v.counts} label={v.label} />;
    case 'bags': return <div className="g2-row">{v.list.map((b: any, i: number) => <Bag key={i} counts={b.counts} label={b.label} size={150} />)}</div>;
    case 'spinner': return <Spinner sectors={v.sectors} target={v.target} size={size || 220} />;
    case 'targets': return <div className="g2-row">{v.list.map((s: any, i: number) => <div key={i} className="g2-cell"><Spinner sectors={s.sectors} target={s.target} size={160} />{s.label && <b className="g2-cap">{s.label}</b>}</div>)}</div>;
    case 'bars': return <Bars labels={v.labels} values={v.values} max={v.max} colors={v.colors} showValues={v.showValues !== false} />;
    case 'picto': return <Pictograph labels={v.labels} values={v.values} icon={v.icon} per={v.per} />;
    case 'ruler': return <Ruler cm={v.cm || 10} lineMm={v.mm} startMm={v.start || 0} mm={v.showMm !== false} object={v.object || 'line'} />;
    case 'line2': return <svg viewBox="0 0 400 40" width={Math.min(400, v.mm * 3.2 + 40)} className="g2-free-line"><line x1={10} y1={20} x2={10 + v.mm * 3.2} y2={20} stroke={PAL.red} strokeWidth={6} strokeLinecap="round" /></svg>;
    case 'units': return <UnitsMeasure len={v.len} unit={v.unit} item={v.item} />;
    case 'floors': return <Floors floors={v.floors} per={v.per} />;
    case 'groups': return <Groups groups={v.groups} size={v.size} emoji={v.emoji} />;
    case 'line': return <SimpleLine min={v.min} max={v.max} step={v.step} labelEvery={v.labelEvery} marks={v.marks} sub={v.sub} arrows={v.arrows} />;
    case 'seq': return <Seq items={v.items} />;
    case 'tally': return <TallyTable labels={v.labels} counts={v.counts} showCount={v.showCount} head={v.head} />;
    case 'table': return <DataTable head={v.head} labels={v.labels} values={v.values} />;
    case 'column': return <ColumnView a={v.a} b={v.b} op={v.op} />;
    case 'shape': return <ShapeSvg id={v.id} color={v.color || PAL.blue} rot={v.rot || 0} size={size || 170} />;
    case 'scene': return <div className="g2-scene" aria-hidden="true">{v.emoji}</div>;
    case 'text': return <p className="g2-text">{v.text}</p>;
    case 'stack': return <div className="g2-stack">{v.list.map((x: any, i: number) => <Visual key={i} v={x} size={size} />)}</div>;
    default: return null;
  }
};

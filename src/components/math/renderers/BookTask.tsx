import React, { useState } from 'react';
import { Choices, RProps, SideOk, Stage, Things } from '../Visuals';
import { toFa } from '../../../utils/fa';

/** A small, honest renderer for the textbook's essential mixed tasks. */
export const BookTask: React.FC<RProps> = ({ round, answer, solved }) => {
  const d = round.data || {};
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<number | string | null>(null);
  const options = round.options || [];
  const submit = (v: any) => {
    setSelected(v);
    if (String(v) === String(round.answer)) answer(true);
    else answer(false, d.hint || 'دوباره شکل و عددها را با دقت بررسی کن.');
  };
  const visual = d.visual;
  return <>
    <Stage className="mx-center">
      {visual?.kind === 'objects' && <Things n={visual.count} emoji={visual.emoji || '●'} />}
      {visual?.kind === 'place' && <div className="mx-pv-scene" dir="ltr"><b>{toFa(visual.hundreds)} صدتایی</b><b>{toFa(visual.tens)} ده‌تایی</b><b>{toFa(visual.ones)} یکی</b></div>}
      {visual?.kind === 'fraction' && <div className="book-fraction" dir="ltr">{Array.from({ length: visual.denominator }, (_, i) => <i key={i} className={i < visual.numerator ? 'on' : ''} />)}</div>}
      {visual?.kind === 'symmetry' && <div className="book-symmetry" dir="ltr"><span>{visual.left}</span><em /><span>{solved ? visual.left : '?'}</span></div>}
      {visual?.kind === 'clock' && <div className="book-clock">{toFa(visual.hours)}:{toFa(String(visual.minutes).padStart(2, '0'))}</div>}
      {visual?.kind === 'money' && <div className="book-money">{visual.coins.map((c: number, i: number) => <i key={i}>{toFa(c)}</i>)}</div>}
      {d.note && <p className="mx-note">{d.note}</p>}
    </Stage>
    {options.length > 0
      ? <Choices options={options} disabled={solved} right={solved ? round.answer as any : null} onPick={submit} />
      : <div className="mx-tools" dir="ltr">
          <input aria-label="پاسخ" inputMode="numeric" value={value} disabled={solved} onChange={e => setValue(e.target.value)} placeholder="پاسخ" />
          <button type="button" className="mx-tool add" disabled={solved || !value} onClick={() => submit(value)}>بررسی</button>
        </div>}
    {selected !== null && !solved && <p className="mx-hint-line">انتخابت ثبت شد؛ اگر درست باشد ستاره می‌گیری.</p>}
    {d.allowSelfCheck && <SideOk ready caption="حل کردم" onClick={() => answer(true)} />}
  </>;
};

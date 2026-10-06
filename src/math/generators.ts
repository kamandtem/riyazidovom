import type { ExerciseDef, Round } from './types';

const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const uniq = (n: number, min: number, max: number, answer: number) => Array.from(new Set([answer, ...Array.from({length: n * 2}, () => r(min, max))])).slice(0, n).sort(() => Math.random() - .5);
const faOp = (op: string) => op === '+' ? 'جمع' : 'تفریق';

export const ansMode = (def: ExerciseDef) => def.level === 1 ? 'hands' : 'numeral';

function bookRound(def: ExerciseDef, roundIndex = 0): Round {
  const k = def.params.kind;
  if (k === 'count') { const n = r(def.params.min, def.params.max); return { question: 'چند تا شکل می‌بینی؟', answer: n, options: uniq(4, Math.max(0,n-4), n+4, n), data: { visual: {kind:'objects', count:n, emoji:'🍎'}, hint:'هر شکل را فقط یک بار بشمار.' } }; }
  if (k === 'place2') { const n = r(def.params.min, def.params.max); return { question: `عدد ${n} چند ده‌تایی و چند یکی دارد؟`, answer: `${Math.floor(n/10)},${n%10}`, options: [`${Math.floor(n/10)},${n%10}`, `${n%10},${Math.floor(n/10)}`, `${Math.floor(n/10)+1},${n%10}`], data: {visual:{kind:'place',hundreds:0,tens:Math.floor(n/10),ones:n%10}, hint:'اول بسته‌های ده‌تایی، بعد یکی‌ها را بشمار.'} }; }
  if (k === 'compare2') { const a=r(10,89), b=r(11,99); const ans=a<b?'<':a>b?'>':'='; return {question:`کدام نشانه درست است؟ ${a}  ؟  ${b}`,answer:ans,options:['<','>','='],data:{hint:'رقم دهگان را اول مقایسه کن.'}}; }
  if (k === 'sequence') { const step=def.params.steps[roundIndex%def.params.steps.length]; const start=step*r(1,4), ans=start+step*4; return {question:`جای خالی را کامل کن: ${start}، ${start+step}، ${start+step*2}، ${start+step*3}، ؟`,answer:ans,options:uniq(4,Math.max(0,ans-step*2),ans+step*2,ans),data:{hint:`هر بار ${step} تا اضافه کن.`}}; }
  if (k === 'addsub20') { const a=r(2,12), b=r(1,18-a), op=roundIndex%2?'−':'+'; const ans=op==='+'?a+b:a-b; return {question:`${a} ${op} ${b} = ؟`,answer:ans,options:uniq(4,Math.max(0,ans-4),Math.min(20,ans+4),ans),data:{visual:{kind:'objects',count:op==='+'?a+b:a,emoji:'🔵'},hint:op==='+'?'دو دسته را کنار هم بگذار.':'از تعداد اول، دستهٔ دوم را بردار.'}}; }
  if (k === 'story20') { const a=r(5,12), b=r(1,7), add=roundIndex%2===0, ans=add?a+b:a-b; return {question:add?`مریم ${a} مداد داشت و ${b} مداد دیگر گرفت. چند مداد دارد؟`:`علی ${a} برچسب داشت و ${b} تا را داد. چند برچسب ماند؟`,answer:ans,options:uniq(4,Math.max(0,ans-3),ans+3,ans),data:{hint:'ببین مقدار زیاد شده یا کم.'}}; }
  if (k === 'tensOp') { const a=10*r(2,8), b=10*r(1,9-r(2,4)); const add=roundIndex%2===0, ans=add?a+b:a-b; return {question:`${a} ${add?'+':'−'} ${b} = ؟`,answer:ans,options:uniq(4,Math.max(0,ans-20),ans+20,ans),data:{hint:'ده‌تایی‌ها را جداگانه حساب کن.'}}; }
  if (k === 'twoDigitOp') { const a=r(21,68), b=r(11,89), add=roundIndex%2===0; if (!add && b>a) [a,b]=[b,a]; const ans=add?a+b:a-b; return {question:`${a} ${add?'+':'−'} ${b} = ؟`,answer:ans,options:uniq(4,Math.max(0,ans-12),ans+12,ans),data:{hint:'یکان‌ها و دهگان‌ها را مرحله‌به‌مرحله حساب کن.'}}; }
  if (k === 'nearest10') { const n=r(11,98), ans=Math.round(n/10)*10; return {question:`${n} به کدام ده‌تایی نزدیک‌تر است؟`,answer:ans,options:uniq(4,Math.max(0,ans-20),ans+20,ans),data:{hint:'رقم یکان را نگاه کن.'}}; }
  if (k === 'allSums') { const ans=roundIndex%2?7:6; return {question:`دو عدد یک‌رقمی بنویس که حاصل جمعشان ${ans} شود.`,answer:ans,options:uniq(4,ans-2,ans+2,ans),data:{note:'راه‌حل‌ها را منظم از کوچک به بزرگ پیدا کن.',hint:'از صفر شروع کن و جفت‌ها را جا نینداز.'}}; }
  if (k === 'shape') { const items=[['مثلث',3],['مربع',4],['مستطیل',4],['پنج‌ضلعی',5]]; const [name,n]=items[roundIndex%items.length]; return {question:`${name} چند ضلع دارد؟`,answer:n,options:[3,4,5,6],data:{note:'هر ضلع یک خط بیرونی شکل است.'}}; }
  if (k === 'symmetry') { const answer=roundIndex%2?'قرینه نیست':'قرینه است'; return {question:'این شکل نسبت به خط وسط چه وضعی دارد؟',answer,options:['قرینه است','قرینه نیست'],data:{visual:{kind:'symmetry',left:roundIndex%2?'◆':'●'},hint:'دو نیمه را روی خط تا کن.'}}; }
  if (k === 'place3' || k === 'build3') { const n=r(101,999), ans=`${Math.floor(n/100)},${Math.floor(n/10)%10},${n%10}`; return {question:`عدد ${n} را به صدتایی، ده‌تایی و یکی جدا کن.`,answer:ans,options:[ans,`${n%10},${Math.floor(n/10)%10},${Math.floor(n/100)}`,`${Math.floor(n/100)},${n%10},${Math.floor(n/10)%10}`],data:{visual:{kind:'place',hundreds:Math.floor(n/100),tens:Math.floor(n/10)%10,ones:n%10},hint:'از سمت چپ، صدگان سپس دهگان و یکان.'}}; }
  if (k === 'money') { const coins=[1,10,100]; const selected=[coins[roundIndex%3],10,100]; const ans=selected.reduce((a,b)=>a+b,0); return {question:'ارزش این سکه‌ها چند ریال است؟',answer:ans,options:uniq(4,ans-40,ans+40,ans),data:{visual:{kind:'money',coins:selected},hint:'۱۰ سکهٔ یک‌ریالی برابر یک ۱۰ ریالی است.'}}; }
  if (k === 'nearest100') { const n=r(101,999), ans=Math.round(n/100)*100; return {question:`${n} به کدام صدتایی نزدیک‌تر است؟`,answer:ans,options:uniq(4,Math.max(0,ans-200),ans+200,ans),data:{hint:'رقم دهگان را نگاه کن.'}}; }
  if (k === 'measure') { const ans=r(3,12); return {question:'طول مداد چند واحد است؟',answer:ans,options:uniq(4,1,15,ans),data:{note:'واحدها باید کنار هم و بدون فاصله باشند.',visual:{kind:'objects',count:ans,emoji:'📏'}}}; }
  if (k === 'area') { const rows=roundIndex%2?3:4, cols=roundIndex%2?5:4, ans=rows*cols; return {question:`این مستطیل ${rows} ردیف و ${cols} ستون دارد. چند خانه است؟`,answer:ans,options:uniq(4,ans-4,ans+4,ans),data:{hint:'ردیف‌ها را یکی‌یکی بشمار.'}}; }
  if (k === 'clock') { const hours=(roundIndex%12)+1, minutes=[0,15,30,45][roundIndex%4]; const ans=`${hours}:${String(minutes).padStart(2,'0')}`; return {question:'ساعت را بخوان.',answer:ans,options:[ans,`${hours}:30`,`${(hours%12)+1}:00`,`${hours}:45`],data:{visual:{kind:'clock',hours,minutes},hint:'عقربهٔ بزرگ دقیقه‌ها را نشان می‌دهد.'}}; }
  if (k === 'threeDigitOp') { let a=r(201,799), b=r(101,399); if (def.params.op==='-' && b>a) [a,b]=[b,a]; const ans=def.params.op==='+'?a+b:a-b; return {question:`${a} ${def.params.op} ${b} = ؟`,answer:ans,options:uniq(4,Math.max(0,ans-80),ans+80,ans),data:{hint:'صدگان، دهگان و یکان را جداگانه حل کن.'}}; }
  if (k === 'story100') { const a= r(120,260), b=r(20,80), ans=roundIndex%2?a-b:a+b; return {question:roundIndex%2?`در کتابخانه ${a} کتاب بود و ${b} کتاب امانت رفت. چند کتاب ماند؟`:`در یک مدرسه ${a} دانش‌آموز بود و ${b} نفر دیگر آمدند. چند نفر شد؟`,answer:ans,options:uniq(4,Math.max(0,ans-50),ans+50,ans),data:{hint:'کلمه‌های «آمد» و «ماند» راهنما هستند.'}}; }
  if (k === 'fraction') { const den=[2,3,4][roundIndex%3], ans=`1/${den}`; return {question:`کدام گزینه نشان‌دهندهٔ یک قسمت از ${den} قسمت مساوی است؟`,answer:ans,options:[ans,`2/${den}`,`1/${den+1}`,`1/2`],data:{visual:{kind:'fraction',denominator:den,numerator:1},hint:'قسمت‌ها باید مساوی باشند.'}}; }
  if (k === 'chance') { const ans=['ممکن','غیرممکن','قطعی'][roundIndex%3]; return {question:'آمدن عدد ۷ از یک تاس معمولی چه حالتی دارد؟',answer:roundIndex%3===1?'غیرممکن':ans,options:['ممکن','غیرممکن','قطعی'],data:{hint:'تاس معمولی عددهای ۱ تا ۶ دارد.'}}; }
  if (k === 'tally') { const ans=r(3,9); return {question:'در سرشماری، برای این گروه چند رأی ثبت شده است؟',answer:ans,options:uniq(4,1,12,ans),data:{visual:{kind:'objects',count:ans,emoji:'丨'},hint:'چوب‌خط پنجم، چهار خط قبلی را قطع می‌کند.'}}; }
  if (k === 'graph') { const ans=r(2,8); return {question:'ستون آبی تا عدد چند بالا رفته است؟',answer:ans,options:uniq(4,1,10,ans),data:{visual:{kind:'objects',count:ans,emoji:'🟦'},hint:'از پایین، خانه‌های رنگی را بشمار.'}}; }
  return { question:'پاسخ را پیدا کن.', answer: 1, options:[1,2,3,4], data:{} };
}

export function buildRound(def: ExerciseDef, index = 0, _total = 6): Round { return bookRound(def, index); }
export function generateExercise(def: ExerciseDef) { return buildRound(def, 0, def.rounds || 6); }
export default generateExercise;

export type PatternToken = { kind: 'picture' | 'motion' | 'shape'; v: string; c?: string };
export const MOTION_NAMES: Record<string, string> = { up: 'بالا', down: 'پایین', left: 'چپ', right: 'راست', clap: 'دست زدن' };

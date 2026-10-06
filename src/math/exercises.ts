import type { ExerciseDef, ExerciseType, HouseId, SkillId } from './types';

type Row = Omit<ExerciseDef, 'feedback' | 'numerals'> & { feedback?: ExerciseDef['feedback']; numerals?: boolean };
const task = (id: string, house: HouseId, chapter: number, page: number, title: string, goal: string, skill: SkillId, params: Record<string, any>, difficulty: 1|2|3|4|5, prerequisite: string[] = [], rounds = 6): Row => ({
  id, house, chapter, page, title, goal, skill, type: 'bookTask' as ExerciseType, level: difficulty <= 2 ? 1 : difficulty <= 3 ? 2 : 3, difficulty,
  priority: difficulty <= 2 ? 'essential' : 'important', params, prerequisite, rounds,
  feedback: { good: 'آفرین! راه‌حل را درست پیدا کردی.', hint: 'شکل، دسته‌ها و ارزش رقم‌ها را دوباره بررسی کن.' }, emoji: '📘', numerals: true,
});

/** Essential practice, ordered by the textbook's eight-chapter progression. */
export const EXERCISES: ExerciseDef[] = [
  task('c1-count','digits',1,7,'بشمار و دسته‌بندی کن','شمارش دقیق، چوب‌خط و دسته‌های ده‌تایی','counting',{kind:'count',min:6,max:18},1),
  task('c1-place','digits',1,13,'ده‌تایی و یکی','نمایش عدد دورقمی با ارزش مکانی','placeValue',{kind:'place2',min:10,max:99},2,['c1-count']),
  task('c1-compare','digits',1,18,'مقایسه کن','مقایسهٔ عددها با < و > و =','compare',{kind:'compare2'},2,['c1-place']),
  task('c1-pattern','skip',1,25,'چندتا چندتا','شمارش ۲تا۲تا، ۵تا۵تا و ۱۰تا۱۰تا','skipCount',{kind:'sequence',steps:[2,5,10]},2),
  task('c1-addsub','facts',1,76,'جمع و تفریق با شکل','مدل‌سازی عینی جمع و تفریق تا ۲۰','addition',{kind:'addsub20'},2),
  task('c1-problem','problems',1,83,'مسئله را با شکل حل کن','انتخاب عمل مناسب در مسئلهٔ یک‌مرحله‌ای','problemSolving',{kind:'story20'},2,['c1-addsub']),
  task('c2-tens','twodigit',2,97,'جمع و تفریق ده‌تایی','جمع و تفریق ده‌تایی‌ها روی محور','addition',{kind:'tensOp'},2,['c1-place']),
  task('c2-column','twodigit',2,111,'جمع و تفریق دورقمی','حل مرحله‌ای بدون و با انتقال یکی','addition',{kind:'twoDigitOp'},3,['c2-tens']),
  task('c2-estimate','approx',2,132,'جواب تقریبی','تقریب عددهای دورقمی به نزدیک‌ترین ده','estimate',{kind:'nearest10'},3,['c2-column']),
  task('c2-allcases','problems',2,126,'همهٔ حالت‌ها را پیدا کن','نظم در فهرست کردن حالت‌ها','logic',{kind:'allSums'},3,['c1-problem']),
  task('c3-shapes','shapes',3,149,'ضلع و گوشه','شناخت مثلث، مربع، مستطیل و چندضلعی','geometry',{kind:'shape'},1),
  task('c3-symmetry','symmetry',3,163,'نیمهٔ قرینه را کامل کن','تشخیص و ساخت خط تقارن','symmetry',{kind:'symmetry'},2,['c3-shapes']),
  task('c4-hundreds','three',4,205,'صدتایی، ده‌تایی، یکی','ارزش مکانی عددهای سه‌رقمی','placeValue',{kind:'place3'},2,['c1-place']),
  task('c4-build','three',4,220,'عدد سه‌رقمی بساز','ساختن عدد با کارت و جدول ارزش مکانی','placeValue',{kind:'build3'},3,['c4-hundreds']),
  task('c4-money','money',4,211,'سکه‌ها را عوض کن','درک هم‌ارزی ۱، ۱۰ و ۱۰۰ ریالی','money',{kind:'money'},2,['c4-hundreds']),
  task('c4-round','approx',4,239,'تقریب سه‌رقمی','تقریب به نزدیک‌ترین صد','estimate',{kind:'nearest100'},3,['c4-hundreds']),
  task('c5-measure','measure',5,273,'با واحد اندازه بگیر','اندازه‌گیری طول با واحدهای یکسان','measurement',{kind:'measure'},2),
  task('c5-area','measure',5,287,'خانه‌های سطح را بشمار','درک مساحت به کمک جدول مربعی','measurement',{kind:'area'},2,['c5-measure']),
  task('c5-time','clock',5,294,'ساعت و دقیقه','خواندن ساعت کامل، نیم، ربع و دقیقه','time',{kind:'clock'},3),
  task('c6-add3','threedigit',6,333,'جمع سه‌رقمی','جمع مرحله‌ای و ستونی با انتقال','addition',{kind:'threeDigitOp',op:'+'},4,['c4-hundreds']),
  task('c6-sub3','threedigit',6,346,'تفریق سه‌رقمی','تفریق مرحله‌ای با قرض گرفتن','subtraction',{kind:'threeDigitOp',op:'-'},4,['c6-add3']),
  task('c6-problem','problems',6,356,'مسئلهٔ چندمرحله‌ای','خواندن، انتخاب عمل و کنترل جواب','problemSolving',{kind:'story100'},4,['c6-sub3']),
  task('c7-fraction','fraction',7,387,'قسمت‌های مساوی','ساخت و خواندن ۱/۲، ۱/۳ و ۱/۴','fraction',{kind:'fraction'},2),
  task('c7-chance','fraction',7,401,'احتمال را مقایسه کن','تشخیص ممکن، غیرممکن و محتمل','probability',{kind:'chance'},3,['c7-fraction']),
  task('c8-tally','stats',8,423,'سرشماری و چوب‌خط','ثبت داده با چوب‌خط‌های پنج‌تایی','statistics',{kind:'tally'},2),
  task('c8-graph','stats',8,438,'نمودار ستونی','خواندن و ساخت نمودار ستونی ساده','statistics',{kind:'graph'},3,['c8-tally']),
  task('c8-review','stats',8,451,'مرور ترکیبی','ترکیب عدد، الگو، تقریب و مسئله','logic',{kind:'review'},4,['c8-graph']),
];
export type ExerciseSpec = ExerciseDef;
export const ROWS = EXERCISES;
export const EXERCISE_BY_ID: Record<string, ExerciseDef> = Object.fromEntries(EXERCISES.map(e => [e.id, e]));
export const exercisesOfHouse = (house: HouseId) => EXERCISES.filter(e => e.house === house).sort((a,b) => a.page - b.page);
export const bookRef = (e: ExerciseDef) => `فصل ${e.chapter}، ص ${e.page}`;
export default EXERCISES;

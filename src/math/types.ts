/**
 * مدل دادهٔ موتور تمرین ریاضی.
 * تمرین‌ها «داده» هستند (src/math/exercises.ts) و از UI جدا هستند؛
 * هر «نوع» (type) یک سازندهٔ دور (generator) و یک نمایشگر (renderer) دارد.
 * برای افزودن تمرین تازه با نوعِ موجود، فقط یک ردیف به exercises.ts اضافه کنید.
 */
export type IslandId = 'numbers' | 'order' | 'operations';
export type HouseId =
  | 'digits' | 'skip' | 'three' | 'money' | 'approx'            // جزیرهٔ ۱: عددها (فصل ۱، ۴ و بخشی از ۲ و ۶)
  | 'shapes' | 'symmetry' | 'measure' | 'fraction' | 'stats'    // جزیرهٔ ۲: شکل، اندازه، کسر و آمار (فصل ۳، ۵، ۷، ۸)
  | 'facts' | 'twodigit' | 'threedigit' | 'problems' | 'clock'; // جزیرهٔ ۳: جمع و تفریق، مسئله و ساعت (فصل ۱، ۲، ۶ و «کامل کن»ها)

export type SkillId =
  | 'counting' | 'placeValue' | 'skipCount' | 'pattern' | 'money' | 'estimate' | 'compare'
  | 'geometry' | 'symmetry' | 'measurement' | 'fraction' | 'probability' | 'statistics'
  | 'addition' | 'subtraction' | 'problemSolving' | 'time' | 'logic';

/** ۱ = عینی و تصویری · ۲ = تصویری + عددی · ۳ = نمادین و مفهومی */
export type Level = 1 | 2 | 3;
export type Priority = 'essential' | 'important' | 'optional';

export type ExerciseType =
  | 'tapCount' | 'subitize' | 'countCheck' | 'countOn'
  | 'buildSet' | 'matchRep'
  | 'oneMoreLess' | 'sequenceGap' | 'orderCards'
  | 'compareGroups' | 'makeEqual' | 'compareSymbol'
  | 'tensOnes'
  | 'pattern' | 'chart' | 'latinSquare' | 'shapeCorners' | 'compareLength' | 'measureUnits'
  | 'addCombine' | 'takeAway' | 'expression' | 'lineJump' | 'hiddenPart' | 'makeTen' | 'repMatch' | 'story'
  | 'colorCount' | 'fingerMatch' | 'groupMatch' | 'patternStrip' | 'clock'
  /* نوع‌های تازهٔ پایهٔ دوم (همان سیستم Round/Renderer) */
  | 'choice' | 'columnOp' | 'placeBuild' | 'makeNumbers' | 'symmetryPaint' | 'fractionPaint' | 'census' | 'barGraph' | 'rulerDraw'
  | 'bookTask';

/** نمایش‌های مختلفِ یک مقدار (از عینی به نمادین) */
export type Rep = 'objects' | 'dots' | 'tally' | 'tenframe' | 'numeral' | 'line';

export interface ExerciseFeedback { good?: string; try?: string; hint?: string }

/** یک دورِ ساخته‌شده از تمرین: دادهٔ آماده برای نمایشگر */
export interface Round {
  question: string;          // جملهٔ صفحه
  speak?: string;            // جمله‌ای که خوانده می‌شود (اگر با question فرق دارد)
  objects?: string[];        // اشیای تصویری (ایموجی)
  options?: (number | string)[];
  answer: number | string | number[] | string[];
  data: Record<string, any>; // دادهٔ مخصوص هر نوع
}

export interface ExerciseDef {
  id: string;
  house: HouseId;
  skill: SkillId;
  level: Level;
  difficulty: 1 | 2 | 3 | 4 | 5;
  priority: Priority;
  type: ExerciseType;
  title: string;             // نام کوتاه روی کارت
  goal: string;              // هدف آموزشی (برای والد/معلم)
  question?: string;         // جملهٔ ثابت (اگر generator جمله نسازد)
  objects?: string[];        // مجموعهٔ ایموجی‌های مجاز
  params: Record<string, any>;
  prerequisite: string[];    // شناسهٔ تمرین‌های پیش‌نیاز
  rounds?: number;           // تعداد دور (پیش‌فرض ۵)
  feedback?: ExerciseFeedback;
  /** دورهای ثابت دست‌ساز؛ اگر باشد به جای generator استفاده می‌شود */
  fixed?: Round[];
  emoji: string;
  /** شمارهٔ صفحهٔ کتاب درسی (همان عدد پایین صفحهٔ کتاب) — ترتیب مسیر یادگیری از روی همین ساخته می‌شود */
  page: number;
  /** در پایهٔ دوم کودک عددها را می‌شناسد؛ همیشه true است (فیلد برای سازگاری با نمایشگرهای مشترک مانده است) */
  numerals: boolean;
  /** شمارهٔ فصل کتاب ریاضی دوم (۱ تا ۸) */
  chapter: number;
}

export interface IslandDef { id: IslandId; title: string; subtitle: string; text: string; houses: HouseId[] }
export interface HouseDef { id: HouseId; island: IslandId; title: string; subtitle: string; emoji: string; tone: string; text: string }

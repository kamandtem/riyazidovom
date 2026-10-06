# ریاضی دوم (Grade 2 Math App)

Interactive Grade 2 Math Learning Application
Built on React + TypeScript + Vite + Capacitor

## Project Structure

```
g2/
├── src/
│   ├── math/
│   │   ├── types.ts                 # Type definitions (HouseId, SkillId, ExerciseType)
│   │   ├── curriculum.ts            # 3 Islands × 15 Houses curriculum mapping
│   │   ├── exercises.ts             # 40+ exercise specs extracted from textbook
│   │   ├── generators.ts            # Exercise randomizers (columnOp, coins, fractions, etc)
│   │   └── progress.ts              # Student progress tracking & unlocking
│   │
│   ├── components/
│   │   └── math/
│   │       ├── Visuals2.tsx         # 25+ reusable visual components (blocks, coins, rulers, charts)
│   │       ├── renderers/
│   │       │   ├── Grade2Renderers.tsx   # New exercise renderers (coins, fractions, census, graphs)
│   │       │   └── Grade2Renderers.css   # Styling for all Grade 2 renderers
│   │       └── (Grade 1 renderers also available)
│   │
│   ├── utils/
│   │   └── fa.ts                    # Persian utilities (numWord for 3-digit numbers, etc)
│   │
│   └── App.tsx                      # Main app component (to be integrated)
│
├── public/
├── vite.config.ts
├── tsconfig.json
├── capacitor.config.ts              # Android build configuration
└── README_G2.md (this file)
```

## Curriculum Design

### Island 1: Numbers & Foundations (5 houses)
- **digits**: Place value 0–99 (dihaye va yeki)
- **skip**: Skip counting by 2, 5, 10
- **three**: Place value 100–999 (sadat, deha, yeki)
- **money**: Coin counting & currency (Chapter 6)
- **approx**: Rounding to nearest 10 or 100

### Island 2: Shapes, Measurement, Data (5 houses)
- **shapes**: 2D/3D geometry identification & properties
- **symmetry**: Line symmetry drawing & identification
- **measure**: Length (cm/mm), area (Chapter 5, 7)
- **fraction**: Part-whole fractions (1/2, 1/3, 1/4)
- **stats**: Data collection, tally, bar graphs (Chapter 8)

### Island 3: Operations & Application (5 houses)
- **facts**: Single-digit + and − fluency
- **twodigit**: Two-digit + and − (with/without carry/borrow)
- **threedigit**: Three-digit + and −
- **problems**: Word problems in context
- **clock**: Time reading (hours & minutes)

## Exercise Types Implemented

### Compatible with Grade 1
- `tensOnes`: Place value decomposition with visuals
- `sequence`: Skip counting, fill-in-blank patterns
- `columnOp`: Column addition/subtraction with regrouping options
- `compareSymbol`: <, >, = comparisons
- `multiChoice`: Multiple choice (shapes, properties)
- `chart`: Grid-based counting

### Grade 2–Specific
- `coins`: Coin counting (سکه، 1000، 500، 200، 100 تومان)
- `fractionPaint`: Interactive fraction coloring
- `census`: Data collection with tally marks
- `barGraph`: Vertical bar graphs with axes
- `symmetryPaint`: Draw symmetric half of shape
- `rulerDraw`: Measure length with ruler visual
- `clockTime`: Analog/digital clock reading
- `wordProblem`: Context-based addition/subtraction

## Key Features

### Visuals Library (Visuals2.tsx)
25+ pre-built visual components:
- **PV3Blocks**: Place-value base-10 blocks (units, rods, flats, cubes)
- **Abacus**: Bead counting by place value
- **Coin**: Persian coins (1000, 500, 200, 100)
- **FracShape**: Circles & rectangles for fractions
- **Bag**: Probability/drawing visualization
- **Spinner**: Spinner for random selections
- **Bars**: Bar graph columns
- **Pictograph**: Picture-based data
- **Ruler**: Measurement tool (cm, mm)
- **Grid**: Square grids for area & multiplication
- **Clock**: Analog clock face
- Plus symmetry lines, grids, numerals, and more

### Persian Localization
- **RTL layout** throughout (direction: rtl)
- **Persian numerals** (۰–۹) in visuals
- **Persian text** in all questions, feedback, buttons
- **Farsi speech synthesis** via fa.ts `numWord()` function
- Enhanced `numWord()` supports 3-digit numbers (۱۰۰–۹۹۹)

### Progress Tracking
- Per-house exercise counts & scores
- Mastery thresholds (≥80% unlocks next house)
- Island progression (1–5 houses unlocked)
- Badge system & streak tracking
- Local storage persistence

### Offline-First Architecture
- Data-driven exercise system (no hardcoded questions)
- Randomized generators ensure replay value
- localStorage for progress sync
- Works without internet

## Development Workflow

### 1. Running Locally (Web)
```bash
cd g2
npm install
npm run dev
```
Opens http://localhost:5173

### 2. Building for Android
```bash
npm run build
npx cap add android
npx cap copy
npx cap open android
```
Opens Android Studio; build APK from there.

### 3. Testing Exercise Flow
```bash
import { generateExercise } from './src/math/generators';
import { ROWS } from './src/math/exercises';

const spec = ROWS[0];
const exercise = generateExercise(spec);
console.log(exercise); // { question: "...", answer: ..., ... }
```

## Next Steps

1. **Integrate App.tsx**: Connect main app component to curriculum, islands, house navigation
2. **Render Exercise Flow**: 
   - Load house → fetch unlocked exercises
   - Display exercise with appropriate renderer
   - Check answer, record progress
   - Unlock next house if threshold met
3. **Test on Device**: Android APK build & emulator testing
4. **Add Animations**: Transition effects, achievement popups, island unlocks
5. **Sound Effects**: Persian TTS for numbers, feedback sounds

## Code Standards

- **TypeScript strict mode** throughout
- **Functional components** with React hooks
- **RTL-first CSS** (direction: rtl as default)
- **Accessible color contrast** (WCAG AA+)
- **Bilingual comments** (English logic, Persian user strings)
- **No hardcoded content**: All exercise text from spec files

## Data Sources

All exercises extracted from official Persian Grade 2 textbook (ریاضی دوم دبستان):
- Chapters 1–8 fully mapped to curriculum
- Exercise params match textbook pacing
- Feedback tied to Persian pedagogical standards

---

**Built for learners. Tested with love.** 🎓

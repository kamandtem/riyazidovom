/**
 * Grade 2 App Main Component
 * Island navigation, house progression, exercise rendering
 */

import React, { useState, useEffect } from 'react';
import { CURRICULUM, ISLAND_ORDER, HOUSE_ORDER } from './math/curriculum';
import { ROWS } from './math/exercises';
import { generateExercise } from './math/generators';
import { initializeProgress, recordExerciseCompletion, unlockHouse } from './math/progress';
import type { StudentProgress } from './math/progress';
import type { HouseId, IslandId } from './math/types';
import './App.css';

// Import Grade 2 renderers
import { CoinRenderer, FractionPainter, CensusRenderer, BarGraphRenderer, SymmetryPainter, RulerRenderer, ClockTimeRenderer } from './components/math/renderers/Grade2Renderers';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [currentIsland, setCurrentIsland] = useState<IslandId>('island1');
  const [currentHouse, setCurrentHouse] = useState<HouseId>('digits');
  const [currentExercise, setCurrentExercise] = useState<any>(null);
  const [exerciseSpec, setExerciseSpec] = useState<any>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  // Initialize or load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('g2_student_progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      const newProgress = initializeProgress('student_' + Date.now());
      setProgress(newProgress);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress) {
      localStorage.setItem('g2_student_progress', JSON.stringify(progress));
    }
  }, [progress]);

  // Load next exercise
  const loadExercise = () => {
    const spec = ROWS.find((row) => row.house === currentHouse);
    if (spec) {
      setExerciseSpec(spec);
      setCurrentExercise(generateExercise(spec));
      setFeedbackMessage('');
      setIsAnswered(false);
    }
  };

  useEffect(() => {
    if (progress) {
      loadExercise();
    }
  }, [currentHouse, progress]);

  const handleExerciseSubmit = (answer: any) => {
    if (!exerciseSpec || !currentExercise) return;

    // Simple score: 1=correct, 0=wrong
    const score = answer === currentExercise.answer ? 100 : 0;
    const feedback = score === 100 ? exerciseSpec.feedback : 'دوباره تلاش کن';

    setFeedbackMessage(feedback);
    setIsAnswered(true);

    // Record progress
    if (progress) {
      const updated = recordExerciseCompletion(progress, currentHouse, score);
      setProgress(updated);
    }
  };

  const navigateToHouse = (houseId: HouseId) => {
    setCurrentHouse(houseId);
  };

  const navigateToIsland = (islandId: IslandId) => {
    setCurrentIsland(islandId);
  };

  if (!progress) {
    return <div className="loading">درحال بارگذاری...</div>;
  }

  const unlockedHousesInIsland = HOUSE_ORDER.slice(0, progress[currentIsland as keyof StudentProgress]?.housesUnlocked || 1);

  return (
    <div className="app g2-app" dir="rtl">
      <header className="app-header">
        <h1>ریاضی دوم</h1>
        <div className="progress-bar">
          <span>تمرین‌های کامل شده: {progress.totalExercisesCompleted}</span>
        </div>
      </header>

      <nav className="island-nav">
        {ISLAND_ORDER.map((islandId) => (
          <button
            key={islandId}
            className={`island-btn ${currentIsland === islandId ? 'active' : ''}`}
            onClick={() => navigateToIsland(islandId)}
          >
            {CURRICULUM[islandId].name}
          </button>
        ))}
      </nav>

      <div className="house-grid">
        {unlockedHousesInIsland.map((houseId, idx) => {
          const house = CURRICULUM[currentIsland].houses[houseId];
          const houseProgress = progress.houseProgress[houseId];
          const isActive = currentHouse === houseId;
          const isCompleted = houseProgress && houseProgress.score >= 80;

          return (
            <button
              key={houseId}
              className={`house-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => navigateToHouse(houseId)}
            >
              <div className="house-number">{idx + 1}</div>
              <div className="house-name">{house.name}</div>
              {houseProgress && <div className="house-score">{Math.round(houseProgress.score)}%</div>}
            </button>
          );
        })}
      </div>

      <main className="exercise-area">
        {currentExercise && exerciseSpec && (
          <>
            <div className="exercise-meta">
              <span className="house-title">{CURRICULUM[currentIsland].houses[currentHouse].name}</span>
              <span className="chapter-ref">فصل {exerciseSpec.chapter}</span>
            </div>

            {/* Exercise Renderer Router */}
            {exerciseSpec.type === 'coins' && (
              <CoinRenderer
                question={currentExercise.question}
                coins={currentExercise.coins}
                answer={currentExercise.answer}
                onSubmit={(answer) => handleExerciseSubmit(answer)}
              />
            )}

            {exerciseSpec.type === 'fractionPaint' && (
              <FractionPainter
                question={currentExercise.question}
                denominator={currentExercise.denominator}
                numerator={currentExercise.numerator}
                shape={currentExercise.shape}
                onSubmit={(answer) => handleExerciseSubmit(answer)}
              />
            )}

            {exerciseSpec.type === 'census' && (
              <CensusRenderer
                question={currentExercise.question}
                options={currentExercise.options}
                onSubmit={(answer) => handleExerciseSubmit(answer)}
              />
            )}

            {exerciseSpec.type === 'barGraph' && (
              <BarGraphRenderer
                question={currentExercise.question}
                data={currentExercise.data}
                yMax={currentExercise.yMax}
              />
            )}

            {exerciseSpec.type === 'clockTime' && (
              <ClockTimeRenderer
                question={currentExercise.question}
                hours={currentExercise.hours}
                minutes={currentExercise.minutes}
                showAnalog={currentExercise.showAnalog}
                onSubmit={(h, m) => handleExerciseSubmit({ hours: h, minutes: m })}
              />
            )}

            {/* Placeholder for other renderers */}
            {!['coins', 'fractionPaint', 'census', 'barGraph', 'clockTime'].includes(exerciseSpec.type) && (
              <div className="exercise-placeholder">
                <p>{currentExercise.question}</p>
                <p className="answer-hint">جواب: {currentExercise.answer}</p>
              </div>
            )}

            {feedbackMessage && (
              <div className={`feedback ${isAnswered ? 'show' : ''}`}>
                {feedbackMessage}
              </div>
            )}

            {isAnswered && (
              <button className="next-btn" onClick={loadExercise}>
                تمرین بعدی
              </button>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;

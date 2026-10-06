/**
 * Grade 2 Exercise Renderers
 * Interactive UI components for rendering Grade 2 math exercises
 * Extends Grade 1 renderers with new types (coins, fractions, statistics, etc.)
 */

import React, { useState } from 'react';
import './Grade2Renderers.css';

// ─────────────────────────────────────────────────────────────────
// Coin Counter Renderer (Money exercises)
// ─────────────────────────────────────────────────────────────────

export interface CoinRendererProps {
  question: string;
  coins: number[];
  answer: number;
  onSubmit: (value: number) => void;
}

export const CoinRenderer: React.FC<CoinRendererProps> = ({
  question,
  coins,
  answer,
  onSubmit,
}) => {
  const [total, setTotal] = useState(0);

  const coinDisplay = (value: number) => {
    if (value === 1000) return '۱۰۰۰';
    if (value === 500) return '۵۰۰';
    if (value === 200) return '۲۰۰';
    if (value === 100) return '۱۰۰';
    return value.toString();
  };

  return (
    <div className="exercise-container g2-coins">
      <h2>{question}</h2>
      <div className="coins-display">
        {coins.map((coin, idx) => (
          <div key={idx} className={`coin coin-${coin}`} title={`${coin} تومان`}>
            {coinDisplay(coin)}
          </div>
        ))}
      </div>
      <div className="coin-total">
        <input
          type="number"
          value={total || ''}
          onChange={(e) => setTotal(parseInt(e.target.value) || 0)}
          placeholder="جمع را بنویس"
          dir="rtl"
        />
      </div>
      <button onClick={() => onSubmit(total)}>بررسی</button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Fraction Painter Renderer
// ─────────────────────────────────────────────────────────────────

export interface FractionPainterProps {
  question: string;
  denominator: number;
  numerator: number;
  shape: 'circle' | 'rectangle';
  onSubmit: (filled: number) => void;
}

export const FractionPainter: React.FC<FractionPainterProps> = ({
  question,
  denominator,
  numerator,
  shape,
  onSubmit,
}) => {
  const [filled, setFilled] = useState(0);

  const parts = Array.from({ length: denominator }, (_, i) => i);

  const togglePart = (idx: number) => {
    setFilled(filled === idx + 1 ? idx : idx + 1);
  };

  return (
    <div className="exercise-container g2-fraction">
      <h2>{question}</h2>
      <div className={`fraction-shape shape-${shape}`}>
        {parts.map((_, idx) => (
          <div
            key={idx}
            className={`part part-${idx} ${filled > idx ? 'filled' : ''}`}
            onClick={() => togglePart(idx)}
          />
        ))}
      </div>
      <div className="fraction-info">
        {numerator}/{denominator} = {Math.round((numerator / denominator) * 100)}٪
      </div>
      <button onClick={() => onSubmit(filled)}>بررسی</button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Census/Tally Renderer (Data collection)
// ─────────────────────────────────────────────────────────────────

export interface CensusRendererProps {
  question: string;
  options: string[];
  onSubmit: (responses: Record<string, number>) => void;
}

export const CensusRenderer: React.FC<CensusRendererProps> = ({
  question,
  options,
  onSubmit,
}) => {
  const [responses, setResponses] = useState<Record<string, number>>({});

  const increment = (option: string) => {
    setResponses({
      ...responses,
      [option]: (responses[option] || 0) + 1,
    });
  };

  const decrement = (option: string) => {
    if ((responses[option] || 0) > 0) {
      setResponses({
        ...responses,
        [option]: responses[option] - 1,
      });
    }
  };

  return (
    <div className="exercise-container g2-census">
      <h2>{question}</h2>
      <div className="census-options">
        {options.map((option) => (
          <div key={option} className="census-item">
            <span className="option-name">{option}</span>
            <div className="tally-marks">
              {Array.from({ length: responses[option] || 0 }, (_, i) => (
                <span key={i} className="tally-mark">|</span>
              ))}
            </div>
            <button onClick={() => increment(option)}>+</button>
            <button onClick={() => decrement(option)}>-</button>
          </div>
        ))}
      </div>
      <button onClick={() => onSubmit(responses)}>ثبت نظر سنجی</button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Bar Graph Renderer (Data visualization)
// ─────────────────────────────────────────────────────────────────

export interface BarGraphProps {
  question: string;
  data: Record<string, number>;
  yMax: number;
}

export const BarGraphRenderer: React.FC<BarGraphProps> = ({
  question,
  data,
  yMax,
}) => {
  return (
    <div className="exercise-container g2-bar-graph">
      <h2>{question}</h2>
      <div className="bar-graph">
        <div className="y-axis">
          {Array.from({ length: yMax + 1 }, (_, i) => yMax - i).map((i) => (
            <span key={i} className="y-label">
              {i}
            </span>
          ))}
        </div>
        <div className="bars">
          {Object.entries(data).map(([label, value]) => (
            <div key={label} className="bar-column">
              <div className="bar-container">
                <div className="bar" style={{ height: `${(value / yMax) * 100}%` }} />
              </div>
              <div className="bar-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Symmetry Painter Renderer
// ─────────────────────────────────────────────────────────────────

export interface SymmetryPainterProps {
  question: string;
  gridSize: number;
  showGuideLine: boolean;
  onSubmit: (drawing: boolean[]) => void;
}

export const SymmetryPainter: React.FC<SymmetryPainterProps> = ({
  question,
  gridSize,
  showGuideLine,
  onSubmit,
}) => {
  const [drawing, setDrawing] = useState(Array(gridSize * Math.ceil(gridSize / 2)).fill(false));

  const toggleCell = (idx: number) => {
    const newDrawing = [...drawing];
    newDrawing[idx] = !newDrawing[idx];
    setDrawing(newDrawing);
  };

  return (
    <div className="exercise-container g2-symmetry">
      <h2>{question}</h2>
      <div className="symmetry-grid">
        {showGuideLine && <div className="guide-line" />}
        <div className="grid-cells">
          {drawing.map((cell, idx) => (
            <div
              key={idx}
              className={`grid-cell ${cell ? 'filled' : ''}`}
              onClick={() => toggleCell(idx)}
            />
          ))}
        </div>
      </div>
      <button onClick={() => onSubmit(drawing)}>بررسی تقارن</button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Ruler Measurement Renderer
// ─────────────────────────────────────────────────────────────────

export interface RulerRendererProps {
  question: string;
  min: number;
  max: number;
  unit: string;
  onSubmit: (length: number) => void;
}

export const RulerRenderer: React.FC<RulerRendererProps> = ({
  question,
  min,
  max,
  unit,
  onSubmit,
}) => {
  const [length, setLength] = useState(0);

  return (
    <div className="exercise-container g2-ruler">
      <h2>{question}</h2>
      <div className="ruler-container">
        <svg className="ruler" width={max * 30 + 20} height={60}>
          <line x1="10" y1="40" x2={max * 30 + 10} y2="40" stroke="black" strokeWidth="2" />
          {Array.from({ length: max + 1 }, (_, i) => (
            <g key={i}>
              <line x1={10 + i * 30} y1={i % 5 === 0 ? 20 : 30} x2={10 + i * 30} y2="40" stroke="black" />
              {i % 5 === 0 && (
                <text x={10 + i * 30} y={15} textAnchor="middle" fontSize="12">
                  {i}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <input
        type="number"
        min={min}
        max={max}
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value) || 0)}
        placeholder={`طول را به ${unit} بنویس`}
      />
      <button onClick={() => onSubmit(length)}>بررسی</button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Clock Time Renderer
// ─────────────────────────────────────────────────────────────────

export interface ClockTimeProps {
  question: string;
  hours: number;
  minutes: number;
  showAnalog: boolean;
  onSubmit: (h: number, m: number) => void;
}

export const ClockTimeRenderer: React.FC<ClockTimeProps> = ({
  question,
  hours,
  minutes,
  showAnalog,
  onSubmit,
}) => {
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);

  const hourAngle = (h % 12) * 30 + m * 0.5;
  const minuteAngle = m * 6;

  return (
    <div className="exercise-container g2-clock">
      <h2>{question}</h2>
      {showAnalog && (
        <svg className="clock" width="150" height="150" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="70" fill="white" stroke="black" strokeWidth="2" />
          {Array.from({ length: 12 }, (_, i) => (
            <text
              key={i}
              x={75 + 55 * Math.sin((i * 30 * Math.PI) / 180)}
              y={75 - 55 * Math.cos((i * 30 * Math.PI) / 180)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
            >
              {i || 12}
            </text>
          ))}
          <line
            x1="75"
            y1="75"
            x2={75 + 35 * Math.sin((hourAngle * Math.PI) / 180)}
            y2={75 - 35 * Math.cos((hourAngle * Math.PI) / 180)}
            stroke="black"
            strokeWidth="3"
          />
          <line
            x1="75"
            y1="75"
            x2={75 + 50 * Math.sin((minuteAngle * Math.PI) / 180)}
            y2={75 - 50 * Math.cos((minuteAngle * Math.PI) / 180)}
            stroke="black"
            strokeWidth="2"
          />
          <circle cx="75" cy="75" r="5" fill="black" />
        </svg>
      )}
      <div className="time-input">
        <input
          type="number"
          min="0"
          max="12"
          value={h}
          onChange={(e) => setH(parseInt(e.target.value) || 0)}
          placeholder="ساعت"
        />
        :
        <input
          type="number"
          min="0"
          max="59"
          value={m}
          onChange={(e) => setM(parseInt(e.target.value) || 0)}
          placeholder="دقیقه"
        />
      </div>
      <button onClick={() => onSubmit(h, m)}>بررسی</button>
    </div>
  );
};

export default {
  CoinRenderer,
  FractionPainter,
  CensusRenderer,
  BarGraphRenderer,
  SymmetryPainter,
  RulerRenderer,
  ClockTimeRenderer,
};

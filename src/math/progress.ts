import { useEffect, useState } from 'react';
import type { HouseId, IslandId } from './types';
import { EXERCISES, EXERCISE_BY_ID } from './exercises';

export interface MathProgress { stars: Record<string, number>; attempts: Record<string, number>; }
const KEY = 'riazi_math_progress_v2';
const empty = (): MathProgress => ({ stars: {}, attempts: {} });
export const loadMathProgress = (): MathProgress => { try { return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return empty(); } };
export const saveMathProgress = (p: MathProgress) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} };
export const useMathProgress = () => { const [p, setP] = useState<MathProgress>(loadMathProgress); useEffect(() => { const f=()=>setP(loadMathProgress()); window.addEventListener('storage', f); return () => window.removeEventListener('storage', f); }, []); return p; };
export const saveResult = (id: string, stars: number) => { const p=loadMathProgress(); p.stars[id]=Math.max(p.stars[id] || 0, stars); p.attempts[id]=(p.attempts[id] || 0)+1; saveMathProgress(p); };
export const isMastered = (p: MathProgress, id: string) => (p.stars[id] || 0) >= 2;
export const prereqsMet = (p: MathProgress, id: string) => (EXERCISE_BY_ID[id]?.prerequisite || []).every(x => (p.stars[x] || 0) >= 1);
export const houseStats = (p: MathProgress, h: HouseId) => { const xs=EXERCISES.filter(e=>e.house===h); return { stars: xs.reduce((n,e)=>n+(p.stars[e.id]||0),0), total: xs.length*3 }; };
export const islandOfExercise = (id: string): IslandId => { const h=EXERCISE_BY_ID[id]?.house; return h && ['digits','skip','three','money','approx'].includes(h) ? 'numbers' : h && ['shapes','symmetry','measure','fraction','stats'].includes(h) ? 'order' : 'operations'; };
export const islandStats = (p: MathProgress, island: IslandId) => { const ids=EXERCISES.filter(e=>islandOfExercise(e.id)===island); return { stars:ids.reduce((n,e)=>n+(p.stars[e.id]||0),0), total:ids.length*3 }; };
export const nextRecommended = (p: MathProgress) => EXERCISES.find(e => prereqsMet(p,e.id) && !isMastered(p,e.id))?.id || EXERCISES[EXERCISES.length-1].id;
export const initializeProgress = (_id: string) => ({ });
export default { loadMathProgress, saveResult, isMastered, prereqsMet, nextRecommended };

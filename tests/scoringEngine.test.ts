import { describe, it, expect } from 'vitest';
import { calculatePillarScore, calculateOverallAssessment } from '../src/engine/scoringEngine';
import { SURVEY_60_QUESTIONS } from '../src/data/survey60Questions';
import { SurveyResponseMap } from '../src/types/survey';

describe('LAMSEP Scoring Engine v2 (6-Pillars)', () => {
  it('TC-01: All 1 score -> Raw 60, Score 0.0%, Level 1', () => {
    const responses: SurveyResponseMap = {};
    for (const q of SURVEY_60_QUESTIONS) {
      responses[q.id] = 1;
    }

    const res = calculateOverallAssessment(responses, SURVEY_60_QUESTIONS);
    expect(res.overallRawScore).toBe(60);
    expect(res.overallPercent).toBe(0.0);
    expect(res.maturityLevel.levelId).toBe('LEVEL_1');
    expect(res.hasInsufficientData).toBe(false);
  });

  it('TC-02: All 5 score -> Raw 300, Score 100.0%, Level 4', () => {
    const responses: SurveyResponseMap = {};
    for (const q of SURVEY_60_QUESTIONS) {
      responses[q.id] = 5;
    }

    const res = calculateOverallAssessment(responses, SURVEY_60_QUESTIONS);
    expect(res.overallRawScore).toBe(300);
    expect(res.overallPercent).toBe(100.0);
    expect(res.maturityLevel.levelId).toBe('LEVEL_4');
    expect(res.hasInsufficientData).toBe(false);
  });

  it('TC-03 & TC-04: Boundary Level 1 vs Level 2 (49.9% vs 50.0%)', () => {
    // 50% means score - 1 averages 2 -> score averages 3 (Raw = 180)
    const responses50: SurveyResponseMap = {};
    for (const q of SURVEY_60_QUESTIONS) {
      responses50[q.id] = 3; // (3 - 1) / 4 = 50%
    }
    const res50 = calculateOverallAssessment(responses50, SURVEY_60_QUESTIONS);
    expect(res50.overallRawScore).toBe(180);
    expect(res50.overallPercent).toBe(50.0);
    expect(res50.maturityLevel.levelId).toBe('LEVEL_2');

    // 179 raw -> change one 3 to 2
    const responses179 = { ...responses50, 'Q1.1': 2 as const };
    const res179 = calculateOverallAssessment(responses179, SURVEY_60_QUESTIONS);
    expect(res179.overallRawScore).toBe(179);
    expect(res179.overallPercent).toBeLessThan(50.0);
    expect(res179.maturityLevel.levelId).toBe('LEVEL_1');
  });

  it('TC-05 & TC-06: Boundary Level 2 vs Level 3 (69.9% vs 70.0%)', () => {
    // 70% threshold: (Raw - 60) / 240 = 0.70 -> Raw - 60 = 168 -> Raw = 228
    // To get 228: 48 questions with 4 (score-1=3 -> 75%), 12 questions with 3 (score-1=2 -> 50%) -> Raw = 48*4 + 12*3 = 192 + 36 = 228
    const responses70: SurveyResponseMap = {};
    // Each pillar: 8 questions score 4, 2 questions score 3 -> Raw = 8*4 + 2*3 = 38 per pillar. 38 * 6 = 228.
    for (let p = 1; p <= 6; p++) {
      for (let o = 1; o <= 8; o++) {
        responses70[`Q${p}.${o}`] = 4;
      }
      for (let o = 9; o <= 10; o++) {
        responses70[`Q${p}.${o}`] = 3;
      }
    }

    const res70 = calculateOverallAssessment(responses70, SURVEY_60_QUESTIONS);
    expect(res70.overallRawScore).toBe(228);
    // (8*3 + 2*2)/(4*10) = 28/40 = 70.0%
    expect(res70.overallPercent).toBe(70.0);
    expect(res70.maturityLevel.levelId).toBe('LEVEL_3');

    // 227 raw -> change one 4 to 3
    const responses227 = { ...responses70, 'Q1.1': 3 as const };
    const res227 = calculateOverallAssessment(responses227, SURVEY_60_QUESTIONS);
    expect(res227.overallRawScore).toBe(227);
    expect(res227.overallPercent).toBeLessThan(70.0);
    expect(res227.maturityLevel.levelId).toBe('LEVEL_2');
  });

  it('TC-07 & TC-08: Boundary Level 3 vs Level 4 (84.9% vs 85.0%)', () => {
    // 85% threshold: (Raw - 60) / 240 = 0.85 -> Raw - 60 = 204 -> Raw = 264
    // Each pillar: 6 questions score 5 (4*6=24), 4 questions score 4 (3*4=12) -> normalized 36/40 = 90%.
    // To get exactly 85%: (score-1 sum) = 34 per pillar (e.g. 4 questions score 5 (16), 6 questions score 4 (18) -> 34/40 = 85.0%)
    // Raw per pillar = 4*5 + 6*4 = 44. 44 * 6 = 264.
    const responses85: SurveyResponseMap = {};
    for (let p = 1; p <= 6; p++) {
      for (let o = 1; o <= 4; o++) {
        responses85[`Q${p}.${o}`] = 5;
      }
      for (let o = 5; o <= 10; o++) {
        responses85[`Q${p}.${o}`] = 4;
      }
    }

    const res85 = calculateOverallAssessment(responses85, SURVEY_60_QUESTIONS);
    expect(res85.overallRawScore).toBe(264);
    expect(res85.overallPercent).toBe(85.0);
    expect(res85.maturityLevel.levelId).toBe('LEVEL_4');

    // 263 raw -> change one 5 to 4
    const responses263 = { ...responses85, 'Q1.1': 4 as const };
    const res263 = calculateOverallAssessment(responses263, SURVEY_60_QUESTIONS);
    expect(res263.overallRawScore).toBe(263);
    expect(res263.overallPercent).toBeLessThan(85.0);
    expect(res263.maturityLevel.levelId).toBe('LEVEL_3');
  });

  it('TC-09: Insufficient Data Rule (> 50% N/A in any pillar)', () => {
    const responses: SurveyResponseMap = {};
    // Strategy has 6 N/A (0), only 4 valid questions (score 5)
    for (let o = 1; o <= 4; o++) responses[`Q1.${o}`] = 5;
    for (let o = 5; o <= 10; o++) responses[`Q1.${o}`] = 0; // N/A

    // Other pillars have 10 valid questions (score 5)
    for (let p = 2; p <= 6; p++) {
      for (let o = 1; o <= 10; o++) {
        responses[`Q${p}.${o}`] = 5;
      }
    }

    const res = calculateOverallAssessment(responses, SURVEY_60_QUESTIONS);
    expect(res.pillarResults.strategy.totalValid).toBe(4);
    expect(res.pillarResults.strategy.totalNA).toBe(6);
    expect(res.pillarResults.strategy.isInsufficientData).toBe(true);
    expect(res.hasInsufficientData).toBe(true);
    expect(res.maturityLevel.levelId).toBe('INSUFFICIENT');
  });

  it('TC-10: Partial N/A with valid count >= 5 calculates on valid denominator', () => {
    const responses: SurveyResponseMap = {};
    // Strategy: 2 N/A (0), 8 questions with score 5
    for (let o = 1; o <= 8; o++) responses[`Q1.${o}`] = 5;
    for (let o = 9; o <= 10; o++) responses[`Q1.${o}`] = 0;

    const pillarScore = calculatePillarScore('strategy', responses, SURVEY_60_QUESTIONS);
    expect(pillarScore.totalValid).toBe(8);
    expect(pillarScore.totalNA).toBe(2);
    expect(pillarScore.isInsufficientData).toBe(false);
    // (8 * 4) / (4 * 8) * 100 = 100%
    expect(pillarScore.scorePercent).toBe(100.0);
  });

  it('TC-11: Overall Raw is not comparable when any answer is N/A', () => {
    const responses: SurveyResponseMap = {};
    for (const q of SURVEY_60_QUESTIONS) {
      responses[q.id] = q.order <= 5 ? 5 : 0;
    }

    const res = calculateOverallAssessment(responses, SURVEY_60_QUESTIONS);
    expect(res.isFullyCompleted).toBe(true);
    expect(res.overallPercent).toBe(100.0);
    expect(res.overallRawScore).toBeNull();
    expect(res.maturityLevel.levelId).toBe('LEVEL_4');
  });
});

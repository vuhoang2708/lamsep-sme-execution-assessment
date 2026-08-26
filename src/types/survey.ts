export type PillarId = 'strategy' | 'leadership' | 'culture' | 'hr' | 'operations' | 'performance';

export interface Question {
  id: string; // e.g. "Q1.1"
  pillarId: PillarId;
  pillarName: string;
  pillarIndex: number; // 1 to 6
  order: number; // 1 to 10
  shortName: string;
  text: string;
}

export type LikertScore = 1 | 2 | 3 | 4 | 5 | 0; // 0 represents N/A

export interface SurveyResponseMap {
  [questionId: string]: LikertScore;
}

export interface OnboardingProfile {
  fullName: string;
  role: string;
  department: string;
  experienceYears: string;
  gender: string;
  companyName: string;
  industry: string;
  companySize: string;
  establishedYears: string;
  annualRevenue: string;
  consent: boolean;
}

export interface PillarScoreResult {
  pillarId: PillarId;
  pillarName: string;
  pillarIndex: number;
  totalValid: number;
  totalNA: number;
  rawSum: number;
  scorePercent: number; // 0 - 100%
  isInsufficientData: boolean;
}

export type MaturityLevelId = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'INSUFFICIENT';

export interface MaturityLevelInfo {
  levelId: MaturityLevelId;
  name: string;
  scoreRangeStr: string;
  description: string;
  businessImpact: string;
  badgeColor: string;
}

export interface SurveyAssessmentResult {
  pillarResults: Record<PillarId, PillarScoreResult>;
  orderedPillarResults: PillarScoreResult[];
  overallPercent: number;
  /** Raw 60–300 is comparable only when all 60 answers are numeric 1–5. */
  overallRawScore: number | null;
  maturityLevel: MaturityLevelInfo;
  hasInsufficientData: boolean;
  bottleneckPillar: PillarScoreResult | null;
  bottleneckCluster: PillarScoreResult[];
  completedQuestionsCount: number;
  totalQuestionsCount: number;
  isFullyCompleted: boolean;
}

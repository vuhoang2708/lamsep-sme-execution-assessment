export type KUBAStageId = 'dont_know' | 'know' | 'understand' | 'believe' | 'act';

export interface KUBAStageData {
  id: KUBAStageId;
  index: number; // 1 to 5
  name: string;
  vietnameseName: string;
  readinessDescription: string;
  riskIfStuck: string;
  leaderActionTitle: string;
  leaderActionDescription: string;
  individualActionTitle: string;
  individualActionDescription: string;
  acceptanceEvidenceProposal: string;
  isResistanceThresholdBefore?: boolean;
}

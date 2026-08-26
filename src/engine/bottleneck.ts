import { PillarScoreResult } from '../types/survey';

export interface BottleneckDetectionResult {
  bottleneckPillar: PillarScoreResult | null;
  bottleneckCluster: PillarScoreResult[];
}

/**
 * Phát hiện Thanh gỗ ngắn nhất (Liebig Minimum Pillar) và Nhóm Điểm nghẽn Ưu tiên (Near-tie cluster <= 5%)
 */
export function detectBottlenecks(pillarResults: PillarScoreResult[]): BottleneckDetectionResult {
  const validPillars = pillarResults.filter(p => !p.isInsufficientData);

  if (validPillars.length === 0) {
    return {
      bottleneckPillar: null,
      bottleneckCluster: []
    };
  }

  // Tìm min score
  let minScore = validPillars[0].scorePercent;
  for (const p of validPillars) {
    if (p.scorePercent < minScore) {
      minScore = p.scorePercent;
    }
  }

  // Trụ cột thấp nhất (nếu bằng điểm, ưu tiên theo thứ tự chuyên đề 1 -> 6)
  const bottleneckPillar = validPillars.find(p => p.scorePercent === minScore) || validPillars[0];

  // Nhóm điểm nghẽn suýt soát: mọi trụ cột có điểm số <= minScore + 5.0%
  const threshold = Number((minScore + 5.0).toFixed(2));
  const bottleneckCluster = validPillars
    .filter(p => p.scorePercent <= threshold)
    .sort((a, b) => a.scorePercent - b.scorePercent || a.pillarIndex - b.pillarIndex);

  return {
    bottleneckPillar,
    bottleneckCluster
  };
}

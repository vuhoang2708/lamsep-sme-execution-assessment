import { describe, it, expect } from 'vitest';
import { detectBottlenecks } from '../src/engine/bottleneck';
import { PillarScoreResult } from '../src/types/survey';

describe('LAMSEP Bottleneck & Cluster Detection', () => {
  const createMockPillars = (scores: number[]): PillarScoreResult[] => {
    const names = ['Chiến lược', 'Lãnh đạo', 'Văn hóa', 'Nhân lực', 'Vận hành', 'Hiệu suất'];
    const ids = ['strategy', 'leadership', 'culture', 'hr', 'operations', 'performance'] as const;
    return scores.map((s, idx) => ({
      pillarId: ids[idx],
      pillarName: names[idx],
      pillarIndex: idx + 1,
      totalValid: 10,
      totalNA: 0,
      rawSum: s,
      scorePercent: s,
      isInsufficientData: false,
    }));
  };

  it('TC-12: Single distinct lowest pillar identified as Liebig bottleneck', () => {
    // Strategy: 80, Leadership: 70, Culture: 60, HR: 50, Operations: 30, Performance: 75
    const pillars = createMockPillars([80, 70, 60, 50, 30, 75]);
    const { bottleneckPillar, bottleneckCluster } = detectBottlenecks(pillars);

    expect(bottleneckPillar?.pillarId).toBe('operations');
    expect(bottleneckPillar?.scorePercent).toBe(30);
    // Cluster: only operations (since next lowest is HR at 50, which is > 30 + 5)
    expect(bottleneckCluster.length).toBe(1);
    expect(bottleneckCluster[0].pillarId).toBe('operations');
  });

  it('TC-13: Near-tie cluster (pillars with score <= minScore + 5% are grouped)', () => {
    // Strategy: 80, Leadership: 43, Culture: 60, HR: 40, Operations: 44, Performance: 75
    // Min is HR: 40. Cluster threshold is 45. Leadership (43) and Operations (44) should be in cluster.
    const pillars = createMockPillars([80, 43, 60, 40, 44, 75]);
    const { bottleneckPillar, bottleneckCluster } = detectBottlenecks(pillars);

    expect(bottleneckPillar?.pillarId).toBe('hr');
    expect(bottleneckCluster.length).toBe(3);
    const clusterIds = bottleneckCluster.map(p => p.pillarId);
    expect(clusterIds).toEqual(['hr', 'leadership', 'operations']);
  });

  it('TC-14: Tie-break deterministic ordering (same score -> pillar index priority)', () => {
    // Strategy: 40, Leadership: 40, Culture: 60, HR: 80, Operations: 70, Performance: 75
    const pillars = createMockPillars([40, 40, 60, 80, 70, 75]);
    const { bottleneckPillar, bottleneckCluster } = detectBottlenecks(pillars);

    // Both Strategy (idx 1) and Leadership (idx 2) have 40. Strategy is chosen first.
    expect(bottleneckPillar?.pillarId).toBe('strategy');
    expect(bottleneckCluster.length).toBe(2);
    expect(bottleneckCluster[0].pillarId).toBe('strategy');
    expect(bottleneckCluster[1].pillarId).toBe('leadership');
  });
});

import React from 'react';
import { PillarScoreResult } from '../types/survey';

interface HexagonRadarChartProps {
  pillarResults: PillarScoreResult[];
  bottleneckPillarId?: string;
  bottleneckClusterIds?: string[];
  size?: number;
}

export const HexagonRadarChart: React.FC<HexagonRadarChartProps> = ({
  pillarResults,
  bottleneckPillarId,
  bottleneckClusterIds = [],
  size = 400,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) * 0.70; // 70% radius for label clearance

  const numAxes = 6;
  const angleStep = (Math.PI * 2) / numAxes;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to calculate (x, y) for an axis and percentage
  const getCoordinates = (axisIndex: number, percentage: number) => {
    // Start at top (-PI/2) and go clockwise
    const angle = -Math.PI / 2 + axisIndex * angleStep;
    const r = (percentage / 100) * radius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Helper to get label position slightly beyond radius
  const getLabelCoordinates = (axisIndex: number) => {
    const angle = -Math.PI / 2 + axisIndex * angleStep;
    const labelRadius = radius + 32;
    const x = cx + labelRadius * Math.cos(angle);
    const y = cy + labelRadius * Math.sin(angle);
    return { x, y, angle };
  };

  // Build grid polygon paths
  const gridPolygons = gridLevels.map((level) => {
    const points = Array.from({ length: numAxes }).map((_, i) => {
      const { x, y } = getCoordinates(i, level * 100);
      return `${x},${y}`;
    });
    return points.join(' ');
  });

  // Build data polygon path
  const dataPoints = pillarResults.map((p, i) => {
    const val = p.isInsufficientData ? 0 : p.scorePercent;
    return getCoordinates(i, val);
  });
  const dataPolygonPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="relative" style={{ width: size, height: size, maxWidth: '100%' }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
        >
          {/* Concentric Grid Hexagons */}
          {gridPolygons.map((points, idx) => (
            <polygon
              key={`grid-${idx}`}
              points={points}
              fill={idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF'}
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeDasharray={idx < 4 ? '3 3' : 'none'}
            />
          ))}

          {/* Grid % Marks on Top Axis */}
          {gridLevels.map((level, idx) => {
            const y = cy - level * radius;
            return (
              <text
                key={`mark-${idx}`}
                x={cx + 4}
                y={y + 3}
                fill="#94A3B8"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="500"
              >
                {level * 100}%
              </text>
            );
          })}

          {/* 6 Axis Lines */}
          {Array.from({ length: numAxes }).map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={`axis-${i}`}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
            );
          })}

          {/* Data Polygon Fill */}
          <polygon
            points={dataPolygonPath}
            fill="rgba(37, 99, 235, 0.25)"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Data Points & Vertex Circles */}
          {dataPoints.map((pt, i) => {
            const p = pillarResults[i];
            const isBottleneck = p.pillarId === bottleneckPillarId;
            const isCluster = bottleneckClusterIds.includes(p.pillarId);

            return (
              <g key={`point-${i}`}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isBottleneck ? "6" : isCluster ? "5" : "4.5"}
                  fill={isBottleneck ? "#DC2626" : isCluster ? "#D97706" : "#2563EB"}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* Axis Labels */}
          {pillarResults.map((p, i) => {
            const { x, y } = getLabelCoordinates(i);
            const isBottleneck = p.pillarId === bottleneckPillarId;
            const isCluster = bottleneckClusterIds.includes(p.pillarId);

            // Determine text anchor based on position
            let textAnchor: 'middle' | 'end' | 'start' = 'middle';
            if (x < cx - 10) textAnchor = 'end';
            else if (x > cx + 10) textAnchor = 'start';

            const scoreText = p.isInsufficientData ? 'Thiếu data' : `${p.scorePercent}%`;

            return (
              <g key={`label-${i}`} transform={`translate(${x}, ${y})`}>
                <text
                  textAnchor={textAnchor}
                  fill={isBottleneck ? '#DC2626' : isCluster ? '#B45309' : '#1E293B'}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  {p.pillarName.replace(' xuất sắc', '')}
                </text>
                <text
                  textAnchor={textAnchor}
                  y="14"
                  fill={isBottleneck ? '#DC2626' : isCluster ? '#D97706' : '#2563EB'}
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {scoreText}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-600 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
          <span>Điểm năng lực (% đạt được)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
          <span className="font-semibold text-red-700">Điểm nghẽn Liebig (Thấp nhất)</span>
        </div>
        {bottleneckClusterIds.length > 1 && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="font-semibold text-amber-700">Nhóm suýt soát (≤ 5%)</span>
          </div>
        )}
      </div>
    </div>
  );
};

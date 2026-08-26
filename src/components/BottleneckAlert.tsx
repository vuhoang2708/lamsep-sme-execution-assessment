import React from 'react';
import { PillarScoreResult } from '../types/survey';
import { AlertOctagon, Flame, ArrowDownRight, Layers } from 'lucide-react';

interface BottleneckAlertProps {
  bottleneckPillar: PillarScoreResult | null;
  bottleneckCluster: PillarScoreResult[];
}

export const BottleneckAlert: React.FC<BottleneckAlertProps> = ({
  bottleneckPillar,
  bottleneckCluster,
}) => {
  if (!bottleneckPillar) return null;

  const hasCluster = bottleneckCluster.length > 1;

  return (
    <div className="bg-gradient-to-br from-red-50 via-rose-50 to-amber-50 rounded-2xl border border-red-200 p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-red-600 text-white shadow-md flex-shrink-0">
          <AlertOctagon className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
            Cảnh Báo Điểm Nghẽn Trọng Yếu (Nguyên Lý Thùng Gỗ Liebig)
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
            Thanh Gỗ Ngắn Nhất: <span className="text-red-600">{bottleneckPillar.pillarName}</span> ({bottleneckPillar.scorePercent}%)
          </h3>
        </div>
      </div>

      {/* Liebig Explanation */}
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-4 rounded-xl border border-red-100">
        Theo nguyên lý thùng gỗ Liebig, sức chứa của chiếc thùng không phụ thuộc vào những thanh gỗ dài nhất mà bị giới hạn bởi <strong>thanh gỗ ngắn nhất</strong>. Dù doanh nghiệp có chiến lược hay lãnh đạo xuất sắc đến đâu, điểm nghẽn tại <strong>{bottleneckPillar.pillarName}</strong> sẽ kéo tụt tốc độ ra quyết định, gây lãng phí nguồn lực và kìm hãm toàn bộ hiệu quả thực thi.
      </p>

      {/* Near-Tie Cluster Alert (if multiple pillars within 5%) */}
      {hasCluster && (
        <div className="bg-amber-100/70 p-4 rounded-xl border border-amber-300 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
            <Layers className="w-4 h-4 text-amber-700" />
            <span>Phát hiện Nhóm Điểm Nghẽn Ưu Tiên Đồng Thời (Chênh lệch ≤ 5%):</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Các trụ cột sau có điểm số suýt soát nhau và có mối quan hệ nhân quả tương hỗ. Cần ưu tiên giải quyết đồng thời trong kế hoạch 90 ngày:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {bottleneckCluster.map((p) => (
              <span
                key={p.pillarId}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-amber-300 text-xs font-semibold text-slate-800 shadow-2xs"
              >
                <ArrowDownRight className="w-3.5 h-3.5 text-red-600" />
                {p.pillarName} ({p.scorePercent}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Multiplicative Formula */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
          <Flame className="w-4 h-4" /> Phương trình Thực thi Xuất sắc 6 Trụ cột:
        </div>
        <p className="text-slate-300 italic">
          Chiến lược đúng × Lãnh đạo đúng × Văn hóa đúng × Người đúng × Cách làm đúng × Đo lường đúng = <strong>Thực thi xuất sắc</strong>.
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          * Dấu nhân (×) ngụ ý: Chỉ cần 1 yếu tố tiệm cận 0, toàn bộ kết quả thực thi của tổ chức sẽ bị suy giảm tương ứng.
        </p>
      </div>
    </div>
  );
};

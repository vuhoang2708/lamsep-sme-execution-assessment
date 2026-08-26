import React from 'react';
import { SurveyAssessmentResult, OnboardingProfile } from '../types/survey';
import { HexagonRadarChart } from './HexagonRadarChart';
import { KUBA_STAGES_DATA } from '../data/kubaMatrix';

interface PDFExportViewProps {
  assessment: SurveyAssessmentResult;
  profile: OnboardingProfile | null;
  onClose: () => void;
  onDownloadPDF: () => void;
  isGeneratingPDF: boolean;
}

export const PDFExportView: React.FC<PDFExportViewProps> = ({
  assessment,
  profile,
  onClose,
  onDownloadPDF,
  isGeneratingPDF,
}) => {
  const { overallPercent, overallRawScore, maturityLevel, orderedPillarResults, bottleneckPillar, bottleneckCluster } = assessment;
  const kubaUnderstand = KUBA_STAGES_DATA[2];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-start p-4 overflow-y-auto">
      {/* Action Bar */}
      <div className="sticky top-4 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-4 max-w-4xl w-full border border-slate-700 mb-6">
        <div>
          <h3 className="font-bold text-sm">Xem Trước & Xuất Báo Cáo Tư Vấn (A4 PDF)</h3>
          <p className="text-[11px] text-slate-400">Sinh file PDF trực tiếp trên trình duyệt (Zero External Server Egress)</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Đóng lại
          </button>
          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-6 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isGeneratingPDF ? 'Đang xuất PDF...' : 'Tải File PDF A4'}
          </button>
        </div>
      </div>

      {/* Printable Report Canvas (A4 Dimensions simulation) */}
      <div
        id="pdf-report-content"
        className="bg-white text-slate-900 p-8 sm:p-12 max-w-4xl w-full rounded-2xl shadow-xl border border-slate-200 space-y-8 print:p-0 print:border-none print:shadow-none"
      >
        {/* Header Branding */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              BÁO CÁO CHẨN ĐOÁN NĂNG LỰC THỰC THI SME
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Khung Quản trị PSO (People - Strategy - Operations) & Khung Chuyển đổi KUBA®
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <span className="font-bold text-slate-800 block">LAMSEP x Culture Code x DHM8</span>
            <span>Ngày đánh giá: {new Date().toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        {/* Profile Details */}
        {profile && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Người khảo sát:</span>
              <strong className="text-slate-800">{profile.fullName || 'Doanh chủ SME'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Chức vụ / Bộ phận:</span>
              <strong className="text-slate-800">{profile.role} ({profile.department})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Doanh nghiệp / Ngành:</span>
              <strong className="text-slate-800">{profile.companyName || 'Công ty SME'} ({profile.industry})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Quy mô / Doanh thu:</span>
              <strong className="text-slate-800">{profile.companySize} ({profile.annualRevenue})</strong>
            </div>
          </div>
        )}

        {/* Section 1: Overall Results & Radar Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Radar Chart */}
          <div className="flex flex-col items-center">
            <HexagonRadarChart
              pillarResults={orderedPillarResults}
              bottleneckPillarId={bottleneckPillar?.pillarId}
              bottleneckClusterIds={bottleneckCluster.map(p => p.pillarId)}
              size={320}
            />
          </div>

          {/* Maturity Summary Card */}
          <div className="space-y-4">
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                Kết quả Đánh giá Tổng thể
              </span>
              <h3 className="text-xl font-black text-blue-950 mt-0.5">
                {maturityLevel.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-blue-600">{overallPercent}%</span>
                <span className="text-xs text-slate-500">
                  ({overallRawScore === null ? 'Raw: N/A — không quy đổi khi có N/A' : `Raw: ${overallRawScore}/300 điểm`})
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                {maturityLevel.description}
              </p>
            </div>

            {/* Pillar Breakdown Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                  <tr>
                    <th className="p-2">Trụ cột Thực thi</th>
                    <th className="p-2 text-center">Hợp lệ</th>
                    <th className="p-2 text-right">Điểm (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orderedPillarResults.map(p => (
                    <tr key={p.pillarId} className={p.pillarId === bottleneckPillar?.pillarId ? 'bg-red-50/60 font-semibold text-red-900' : ''}>
                      <td className="p-2">{p.pillarIndex}. {p.pillarName}</td>
                      <td className="p-2 text-center">{p.totalValid}/10</td>
                      <td className="p-2 text-right font-bold">{p.scorePercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 2: Bottleneck Analysis */}
        {bottleneckPillar && (
          <div className="bg-red-50/70 p-4 rounded-xl border border-red-200 space-y-2 text-xs">
            <h4 className="font-bold text-red-900 text-sm flex items-center gap-1.5">
              ⚠️ Điểm Nghẽn Trọng Yếu (Thanh Gỗ Ngắn Nhất Liebig): {bottleneckPillar.pillarName} ({bottleneckPillar.scorePercent}%)
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Theo nguyên lý thùng gỗ Liebig, giới hạn năng lực thực thi của toàn doanh nghiệp bị kéo tụt bởi điểm nghẽn tại <strong>{bottleneckPillar.pillarName}</strong>. Cần dành 80% nguồn lực ưu tiên tháo gỡ điểm nghẽn này trong kế hoạch 90 ngày.
            </p>
            {bottleneckCluster.length > 1 && (
              <p className="text-amber-900 font-medium">
                * Nhóm suýt soát cần xử lý đồng thời: {bottleneckCluster.map(p => `${p.pillarName} (${p.scorePercent}%)`).join(', ')}.
              </p>
            )}
          </div>
        )}

        {/* Section 3: KUBA Action Recommendations */}
        <div className="border border-slate-200 p-4 rounded-xl space-y-3 text-xs bg-slate-50">
          <h4 className="font-bold text-slate-900 text-sm">
            Lộ Trình Hành Động 2 Chiều Theo Mô Hình KUBA® Change Commitment
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <strong className="text-blue-900 block mb-1">Hành động Lãnh đạo (Leader Action):</strong>
              <p className="text-slate-700 leading-relaxed">{kubaUnderstand.leaderActionDescription}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <strong className="text-emerald-900 block mb-1">Hành vi Nhân sự (Individual Action):</strong>
              <p className="text-slate-700 leading-relaxed">{kubaUnderstand.individualActionDescription}</p>
            </div>
          </div>
          <div className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
            <strong>Bằng chứng nghiệm thu 90 ngày: </strong>{kubaUnderstand.acceptanceEvidenceProposal}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-[10px] text-slate-400">
          <span>Khảo sát Thực thi SME LAMSEP — Single-Page Application Client-Only</span>
          <span>Trang 1 / 1 — Báo cáo xuất tự động</span>
        </div>
      </div>
    </div>
  );
};

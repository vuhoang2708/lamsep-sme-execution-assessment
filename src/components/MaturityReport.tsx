import React from 'react';
import { SurveyAssessmentResult } from '../types/survey';
import { Award, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';

interface MaturityReportProps {
  assessment: SurveyAssessmentResult;
}

export const MaturityReport: React.FC<MaturityReportProps> = ({ assessment }) => {
  const { maturityLevel, overallPercent, overallRawScore, orderedPillarResults, hasInsufficientData } = assessment;

  return (
    <div className="space-y-6">
      {/* Level Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Phân Hạng Mức Độ Trưởng Thành Thực Thi
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              {maturityLevel.name}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Điểm Chuẩn Hóa</span>
              <span className="text-3xl font-black text-blue-600">
                {hasInsufficientData ? 'N/A' : `${overallPercent}%`}
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-left">
              <span className="text-xs text-slate-500 block">Điểm Raw (chỉ khi đủ 60 câu số)</span>
              <span className="text-xl font-bold text-slate-800">
                {overallRawScore === null ? 'N/A — có N/A hoặc câu chưa trả lời' : `${overallRawScore} / 300`}
              </span>
            </div>
          </div>
        </div>

        {/* Level Description & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" /> Hiện trạng đặc trưng
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {maturityLevel.description}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2">
              <Award className="w-4 h-4 text-amber-600" /> Tác động tới hiệu quả kinh doanh
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {maturityLevel.businessImpact}
            </p>
          </div>
        </div>
      </div>

      {/* 6 Pillars Score Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" /> Bảng Điểm 6 Trụ Cột Thực Thi (Equal-Pillar 16.67%/trụ)
        </h4>

        <div className="space-y-4">
          {orderedPillarResults.map((p) => {
            const isLow = p.scorePercent < 50;
            const isMed = p.scorePercent >= 50 && p.scorePercent < 70;

            const barColor = isLow ? 'bg-red-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500';

            return (
              <div key={p.pillarId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      Trụ {p.pillarIndex}: {p.pillarName}
                    </span>
                    {p.isInsufficientData && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-700 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Thiếu &gt; 50% câu
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-[11px]">
                      Raw: {p.rawSum}/{p.totalValid * 5} ({p.totalValid} câu hợp lệ{p.totalNA > 0 ? `, ${p.totalNA} N/A` : ''})
                    </span>
                    <span className="font-bold text-slate-900 w-12 text-right">
                      {p.isInsufficientData ? 'N/A' : `${p.scorePercent}%`}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${p.isInsufficientData ? 0 : p.scorePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

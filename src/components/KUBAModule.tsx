import React, { useState } from 'react';
import { KUBA_STAGES_DATA } from '../data/kubaMatrix';
import { KUBAStageId } from '../types/kuba';
import { Compass, Users, UserCheck, ShieldAlert, CheckCircle, Flame } from 'lucide-react';

interface KUBAModuleProps {
  bottleneckName: string;
}

export const KUBAModule: React.FC<KUBAModuleProps> = ({ bottleneckName }) => {
  const [selectedStageId, setSelectedStageId] = useState<KUBAStageId>('understand');

  const selectedStage = KUBA_STAGES_DATA.find(s => s.id === selectedStageId) || KUBA_STAGES_DATA[2];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Lớp Định Hướng Chuyển Đổi (Change Readiness Overlay)
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Khung Cam Kết Thay Đổi KUBA® — Tháo Gỡ Điểm Nghẽn &quot;{bottleneckName}&quot;
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Dựa trên mô hình KUBA® Change Commitment Model (kubachange.com). Định hướng hành động 2 chiều giữa Lãnh đạo và Nhân sự.
          </p>
        </div>
      </div>

      {/* 5 Stages Selector Tabs */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700">
          Đội ngũ của bạn đang ở nấc sẵn sàng nào đối với việc tháo gỡ điểm nghẽn này?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {KUBA_STAGES_DATA.map((stage) => {
            const isSelected = selectedStageId === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all relative ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/30 text-indigo-950 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {stage.isResistanceThresholdBefore && (
                  <span className="absolute -top-2.5 left-2 bg-amber-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                    NGƯỠNG KHÁNG CỰ
                  </span>
                )}
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    Nấc {stage.index}: {stage.name}
                  </span>
                  <div className="text-xs font-bold text-slate-800">
                    {stage.vietnameseName}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      <div className="bg-indigo-50/40 rounded-2xl border border-indigo-200 p-5 space-y-4">
        {/* Stage Diagnosis & Risk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-2xs">
            <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block mb-1">
              Hiện trạng mức độ sẵn sàng
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {selectedStage.readinessDescription}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Rủi ro nếu bị tắc nghẽn tại đây
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {selectedStage.riskIfStuck}
            </p>
          </div>
        </div>

        {/* 2-Way Action Guide: Leader vs Individual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Leader Action */}
          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs border-b border-blue-100 pb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{selectedStage.leaderActionTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedStage.leaderActionDescription}
            </p>
          </div>

          {/* Individual Action */}
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs border-b border-emerald-100 pb-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{selectedStage.individualActionTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedStage.individualActionDescription}
            </p>
          </div>
        </div>

        {/* Acceptance Evidence Proposal */}
        <div className="bg-white p-3.5 rounded-xl border border-indigo-100 flex items-start gap-3">
          <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-indigo-950 font-bold">Bằng chứng nghiệm thu đề xuất: </strong>
            {selectedStage.acceptanceEvidenceProposal}
          </div>
        </div>
      </div>

      {/* Methodology Disclaimer */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
        <Flame className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <span>
          Lưu ý phương pháp luận: Khung KUBA® Change Commitment Overlay đóng vai trò định hướng lộ trình hành động chuyển đổi cho điểm nghẽn, không nằm trên trục biểu đồ Radar và không cộng vào điểm năng lực tổng 300 điểm.
        </span>
      </div>
    </div>
  );
};

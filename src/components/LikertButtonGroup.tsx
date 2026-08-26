import React from 'react';
import { LikertScore } from '../types/survey';
import { LIKERT_OPTIONS } from '../data/survey60Questions';

interface LikertButtonGroupProps {
  questionId: string;
  selectedScore: LikertScore | undefined;
  onSelectScore: (score: LikertScore) => void;
}

export const LikertButtonGroup: React.FC<LikertButtonGroupProps> = ({
  selectedScore,
  onSelectScore,
}) => {
  return (
    <div className="space-y-2 mt-3">
      {/* 5 Likert Level Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {LIKERT_OPTIONS.map((opt) => {
          const isSelected = selectedScore === opt.score;
          return (
            <button
              key={opt.score}
              type="button"
              onClick={() => onSelectScore(opt.score as LikertScore)}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/90 ring-2 ring-blue-600/30 text-blue-950 shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {opt.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* N/A Option */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={() => onSelectScore(0)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            selectedScore === 0
              ? 'border-slate-600 bg-slate-800 text-slate-100 ring-2 ring-slate-400/30'
              : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          N/A — Không áp dụng / Chưa đủ thông tin quan sát
        </button>
      </div>
    </div>
  );
};

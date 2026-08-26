import React from 'react';
import { PillarId, SurveyResponseMap } from '../types/survey';
import { PILLARS_META, SURVEY_60_QUESTIONS } from '../data/survey60Questions';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentPillarId: PillarId;
  onSelectPillar: (pillarId: PillarId) => void;
  responses: SurveyResponseMap;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentPillarId,
  onSelectPillar,
  responses,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[65px] z-30">
      <div className="max-w-6xl mx-auto px-4 py-2 sm:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {PILLARS_META.map((p) => {
            const pillarQuestions = SURVEY_60_QUESTIONS.filter(q => q.pillarId === p.id);
            const answeredInPillar = pillarQuestions.filter(q => responses[q.id] !== undefined).length;
            const isCompleted = answeredInPillar === pillarQuestions.length;
            const isCurrent = currentPillarId === p.id;

            return (
              <button
                key={p.id}
                onClick={() => onSelectPillar(p.id as PillarId)}
                className={`flex flex-col items-start p-2 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/80'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    Trụ {p.index}
                  </span>
                  {isCompleted && (
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-slate-800 truncate w-full">
                  {p.name.replace(' xuất sắc', '')}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {answeredInPillar}/10 câu
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

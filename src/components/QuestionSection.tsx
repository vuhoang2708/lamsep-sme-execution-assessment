import React from 'react';
import { PillarId, SurveyResponseMap, LikertScore } from '../types/survey';
import { PILLARS_META, SURVEY_60_QUESTIONS } from '../data/survey60Questions';
import { LikertButtonGroup } from './LikertButtonGroup';
import { ArrowLeft, ArrowRight, CheckCircle, BarChart3 } from 'lucide-react';

interface QuestionSectionProps {
  currentPillarId: PillarId;
  responses: SurveyResponseMap;
  onAnswerQuestion: (questionId: string, score: LikertScore) => void;
  onNavigatePillar: (pillarId: PillarId) => void;
  onViewResults: () => void;
  canViewResults: boolean;
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({
  currentPillarId,
  responses,
  onAnswerQuestion,
  onNavigatePillar,
  onViewResults,
  canViewResults,
}) => {
  const pillarMeta = PILLARS_META.find(p => p.id === currentPillarId)!;
  const pillarQuestions = SURVEY_60_QUESTIONS.filter(q => q.pillarId === currentPillarId);

  const currentIndex = PILLARS_META.findIndex(p => p.id === currentPillarId);
  const prevPillar = currentIndex > 0 ? PILLARS_META[currentIndex - 1] : null;
  const nextPillar = currentIndex < PILLARS_META.length - 1 ? PILLARS_META[currentIndex + 1] : null;

  const answeredInPillar = pillarQuestions.filter(q => responses[q.id] !== undefined).length;

  return (
    <section className="space-y-6">
      {/* Pillar Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              Chuyên đề {pillarMeta.index} / 6
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {pillarMeta.name}
            </h2>
            <p className="text-sm text-blue-200 mt-1">
              {pillarMeta.subtitle}
            </p>
          </div>

          <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm self-start sm:self-center text-center">
            <span className="block text-xs text-blue-200">Đã trả lời</span>
            <span className="text-lg font-bold text-white">{answeredInPillar}/10 câu</span>
          </div>
        </div>
      </div>

      {/* 10 Questions List */}
      <div className="space-y-4">
        {pillarQuestions.map((q) => {
          const selectedScore = responses[q.id];
          const isAnswered = selectedScore !== undefined;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                isAnswered
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-white border-slate-300 ring-1 ring-slate-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center border border-blue-200">
                  {q.order}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      {q.id} — {q.shortName}
                    </span>
                    {isAnswered && (
                      <span className="text-emerald-600 flex items-center gap-0.5 text-[11px] font-medium">
                        <CheckCircle className="w-3 h-3" /> Đã chọn
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                    {q.text}
                  </p>
                </div>
              </div>

              {/* Likert Buttons */}
              <LikertButtonGroup
                questionId={q.id}
                selectedScore={selectedScore}
                onSelectScore={(score) => onAnswerQuestion(q.id, score)}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div>
          {prevPillar ? (
            <button
              type="button"
              onClick={() => onNavigatePillar(prevPillar.id as PillarId)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Trụ {prevPillar.index}: {prevPillar.name.replace(' xuất sắc', '')}
            </button>
          ) : (
            <div />
          )}
        </div>

        <div className="flex items-center gap-3">
          {nextPillar ? (
            <button
              type="button"
              onClick={() => onNavigatePillar(nextPillar.id as PillarId)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Sang Trụ {nextPillar.index}: {nextPillar.name.replace(' xuất sắc', '')} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (canViewResults) onViewResults();
              }}
              disabled={!canViewResults}
              title={canViewResults ? 'Mở báo cáo tổng thể' : 'Cần trả lời đủ 60 câu và mỗi trụ có ít nhất 5 câu hợp lệ'}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md transition-colors"
            >
              <BarChart3 className="w-4 h-4" /> {canViewResults ? 'Xem Báo Cáo Chẩn Đoán Toàn Diện' : 'Hoàn thành đủ 60 câu để xem báo cáo'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

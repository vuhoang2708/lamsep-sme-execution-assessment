import React, { useState, useEffect } from 'react';
import { PillarId, SurveyResponseMap, LikertScore } from '../types/survey';
import { PILLARS_META, SURVEY_60_QUESTIONS } from '../data/survey60Questions';
import { LikertButtonGroup } from './LikertButtonGroup';
import { ArrowLeft, ArrowRight, CheckCircle, BarChart3, AlertCircle, Lock } from 'lucide-react';

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

  const [showMissingWarning, setShowMissingWarning] = useState<boolean>(false);

  // Clear missing warning when switching pillars
  useEffect(() => {
    setShowMissingWarning(false);
  }, [currentPillarId]);

  const answeredInPillar = pillarQuestions.filter(q => responses[q.id] !== undefined).length;
  const isPillarComplete = answeredInPillar >= 10;

  // Trụ 6 Logic: Nếu Q6.1 = 1 (Không có mục tiêu kinh doanh), khóa Q6.2 -> Q6.10 và gán 1 điểm (Cách 1)
  const isPerformancePillar = currentPillarId === 'performance';
  const isQ61NoGoal = isPerformancePillar && responses['Q6.1'] === 1;

  const handleSelectScore = (questionId: string, score: LikertScore) => {
    onAnswerQuestion(questionId, score);

    // Nếu là câu Q6.1 và chọn mức 1 (Không có mục tiêu)
    if (questionId === 'Q6.1' && score === 1) {
      // Tự động gán 1 điểm cho toàn bộ 9 câu còn lại (Q6.2 -> Q6.10)
      for (let i = 2; i <= 10; i++) {
        onAnswerQuestion(`Q6.${i}`, 1);
      }
    }
  };

  const handlePrevPillar = (targetPillarId: PillarId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigatePillar(targetPillarId);
  };

  const handleNextPillar = (targetPillarId: PillarId) => {
    if (!isPillarComplete) {
      setShowMissingWarning(true);
      const firstUnanswered = pillarQuestions.find(q => responses[q.id] === undefined);
      if (firstUnanswered) {
        const el = document.getElementById(`question-card-${firstUnanswered.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setShowMissingWarning(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigatePillar(targetPillarId);
  };

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

      {/* Warning if incomplete when attempting to proceed */}
      {showMissingWarning && !isPillarComplete && (
        <div className="bg-rose-50 border-2 border-rose-300 text-rose-800 p-4 rounded-xl flex items-center gap-3 animate-shake shadow-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <div className="text-xs sm:text-sm font-semibold">
            Vui lòng hoàn thành đủ 10 câu hỏi trong chuyên đề này (còn thiếu {10 - answeredInPillar} câu được viền đỏ bên dưới) trước khi chuyển sang trụ tiếp theo.
          </div>
        </div>
      )}

      {/* Notice when Q6.1 = 1 locks subsequent questions */}
      {isQ61NoGoal && (
        <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 rounded-xl flex items-start gap-3 shadow-sm">
          <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <strong className="block font-bold text-amber-950">
              Cơ chế tự động hóa Trụ 6 (Hiệu suất xuất sắc):
            </strong>
            <p className="leading-relaxed">
              Vì doanh nghiệp chưa có mục tiêu kinh doanh nền tảng 6-12 tháng (Q6.1 chọn mức 1), 9 câu hỏi về phân rã OKR/KPI (Q6.2 – Q6.10) được tự động khóa và ghi nhận ở mức <strong>Khởi phát (1 điểm)</strong>.
            </p>
          </div>
        </div>
      )}

      {/* 10 Questions List */}
      <div className="space-y-4">
        {pillarQuestions.map((q) => {
          const selectedScore = responses[q.id];
          const isAnswered = selectedScore !== undefined;
          const isUnansweredMissing = showMissingWarning && !isAnswered;
          const isLockedByQ61 = isPerformancePillar && q.id !== 'Q6.1' && isQ61NoGoal;

          return (
            <div
              key={q.id}
              id={`question-card-${q.id}`}
              className={`p-5 rounded-2xl border transition-all ${
                isLockedByQ61
                  ? 'bg-slate-50/80 border-slate-200 opacity-80'
                  : isUnansweredMissing
                  ? 'bg-rose-50/30 border-rose-400 ring-2 ring-rose-300 shadow-sm'
                  : isAnswered
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-white border-slate-300 ring-1 ring-slate-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center border ${
                  isLockedByQ61
                    ? 'bg-slate-200 text-slate-600 border-slate-300'
                    : isUnansweredMissing
                    ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-blue-100 text-blue-800 border-blue-200'
                }`}>
                  {q.order}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      {q.id} — {q.shortName}
                    </span>
                    {isLockedByQ61 ? (
                      <span className="text-amber-700 flex items-center gap-1 text-[11px] font-semibold bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                        <Lock className="w-3 h-3" /> Đã khóa (Gán 1 điểm do Q6.1 = 1)
                      </span>
                    ) : isAnswered ? (
                      <span className="text-emerald-600 flex items-center gap-0.5 text-[11px] font-medium">
                        <CheckCircle className="w-3 h-3" /> Đã chọn
                      </span>
                    ) : isUnansweredMissing ? (
                      <span className="text-rose-600 text-[11px] font-bold">
                        ⚠️ Chưa trả lời
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                    {q.text}
                  </p>
                </div>
              </div>

              {/* Likert Buttons */}
              <div className={isLockedByQ61 ? 'pointer-events-none opacity-60 mt-2' : 'mt-2'}>
                <LikertButtonGroup
                  questionId={q.id}
                  selectedScore={selectedScore}
                  onSelectScore={(score) => handleSelectScore(q.id, score)}
                  disabled={isLockedByQ61}
                />
              </div>
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
              onClick={() => handlePrevPillar(prevPillar.id as PillarId)}
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
              onClick={() => handleNextPillar(nextPillar.id as PillarId)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-semibold shadow-md transition-colors ${
                isPillarComplete
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500/80 hover:bg-blue-600'
              }`}
            >
              Sang Trụ {nextPillar.index}: {nextPillar.name.replace(' xuất sắc', '')} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (canViewResults) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onViewResults();
                } else {
                  setShowMissingWarning(true);
                }
              }}
              disabled={!canViewResults}
              title={canViewResults ? 'Mở báo cáo tổng thể' : 'Cần trả lời đủ 60 câu'}
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

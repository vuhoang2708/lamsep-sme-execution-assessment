import { useState, useEffect, useMemo } from 'react';
import { PillarId, SurveyResponseMap, LikertScore, OnboardingProfile } from './types/survey';
import { SURVEY_60_QUESTIONS } from './data/survey60Questions';
import { calculateOverallAssessment } from './engine/scoringEngine';
import { StorageHelper } from './utils/storageHelper';
import { exportReportToPDF } from './utils/pdfGenerator';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { QuestionSection } from './components/QuestionSection';
import { HexagonRadarChart } from './components/HexagonRadarChart';
import { MaturityReport } from './components/MaturityReport';
import { BottleneckAlert } from './components/BottleneckAlert';
import { KUBAModule } from './components/KUBAModule';
import { OnboardingModal } from './components/OnboardingModal';
import { PDFExportView } from './components/PDFExportView';
import { ArrowLeft, FileDown, CheckCircle, UserCheck, PhoneCall } from 'lucide-react';

export function App() {
  const [storageOptIn, setStorageOptIn] = useState<boolean>(() => StorageHelper.isOptIn());
  const [responses, setResponses] = useState<SurveyResponseMap>(() => StorageHelper.loadResponses());
  const [profile, setProfile] = useState<OnboardingProfile | null>(() => StorageHelper.loadProfile());
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => !StorageHelper.loadProfile());
  const [currentPillarId, setCurrentPillarId] = useState<PillarId>('strategy');
  const [viewMode, setViewMode] = useState<'survey' | 'results'>('survey');
  const [showPDFPreview, setShowPDFPreview] = useState<boolean>(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);

  // Sync to storage on change if opt-in is enabled
  useEffect(() => {
    if (storageOptIn) {
      StorageHelper.saveResponses(responses);
    }
  }, [responses, storageOptIn]);

  useEffect(() => {
    if (storageOptIn && profile) {
      StorageHelper.saveProfile(profile);
    }
  }, [profile, storageOptIn]);

  // Overall Live Assessment
  const assessment = useMemo(() => {
    return calculateOverallAssessment(responses, SURVEY_60_QUESTIONS);
  }, [responses]);
  const canViewResults = assessment.isFullyCompleted && !assessment.hasInsufficientData;

  // Handlers
  const handleAnswerQuestion = (questionId: string, score: LikertScore) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const handleToggleStorageOptIn = (enabled: boolean) => {
    setStorageOptIn(enabled);
    StorageHelper.setOptIn(enabled);
    if (enabled) {
      StorageHelper.saveResponses(responses);
      if (profile) StorageHelper.saveProfile(profile);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ câu trả lời và làm lại từ đầu không?')) {
      setResponses({});
      setProfile(null);
      setShowOnboarding(true);
      setShowPDFPreview(false);
      setCurrentPillarId('strategy');
      setViewMode('survey');
      StorageHelper.clearAllData();
      if (storageOptIn) {
        StorageHelper.setOptIn(true); // Keep preference
      }
    }
  };

  const handleSaveProfile = (newProfile: OnboardingProfile) => {
    setProfile(newProfile);
    setShowOnboarding(false);
  };

  const handleDownloadPDF = async () => {
    if (!canViewResults) {
      alert('Cần hoàn thành đủ 60 câu và mỗi trụ có ít nhất 5 câu hợp lệ trước khi xuất báo cáo.');
      return;
    }
    try {
      setIsGeneratingPDF(true);
      await exportReportToPDF('pdf-report-content', `LamSep_Bao_Cao_Thuc_Thi_${profile?.companyName ? profile.companyName.replace(/\s+/g, '_') : 'SME'}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Không thể tạo file PDF. Bạn có thể sử dụng tính năng In (Ctrl+P) của trình duyệt.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Global Header */}
      <Header
        storageOptIn={storageOptIn}
        onToggleStorageOptIn={handleToggleStorageOptIn}
        onClearData={handleClearData}
        answeredCount={assessment.completedQuestionsCount}
        totalQuestions={assessment.totalQuestionsCount}
      />

      {/* Pillar Tabs Progress Tracker */}
      <ProgressBar
        currentPillarId={currentPillarId}
        onSelectPillar={(pillarId) => {
          setCurrentPillarId(pillarId);
          setViewMode('survey');
        }}
        responses={responses}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:px-6">
        {viewMode === 'survey' || !canViewResults ? (
          /* Survey Flow View */
          <div className="space-y-6">
            {/* Quick Profile Summary Bar */}
            {profile && (
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>
                    Khảo sát cho: <strong className="text-slate-800">{profile.role}</strong> — <strong className="text-slate-800">{profile.companyName || profile.industry}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOnboarding(true)}
                  className="text-blue-600 hover:underline text-[11px] font-medium"
                >
                  Sửa thông tin
                </button>
              </div>
            )}

            <QuestionSection
              currentPillarId={currentPillarId}
              responses={responses}
              onAnswerQuestion={handleAnswerQuestion}
              onNavigatePillar={(nextId) => setCurrentPillarId(nextId)}
              onViewResults={() => {
                if (canViewResults) setViewMode('results');
              }}
              canViewResults={canViewResults}
            />
          </div>
        ) : (
          /* Results Assessment View */
          <div className="space-y-8">
            {/* Results Action Bar */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider block w-fit mb-1">
                  Kết Quả Chẩn Đoán Thực Thi Toàn Diện
                </span>
                <h2 className="text-xl sm:text-2xl font-black">
                  Báo Cáo Năng Lực 6 Trụ Cột (Hexagonal Radar)
                </h2>
                <p className="text-xs text-blue-200 mt-0.5">
                  Đã hoàn thành {assessment.completedQuestionsCount}/60 câu hỏi
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('survey')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Xem lại câu hỏi
                </button>
                <button
                  type="button"
                  onClick={() => setShowPDFPreview(true)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <FileDown className="w-4 h-4" /> Xuất Báo Cáo PDF A4
                </button>
              </div>
            </div>

            {/* Hexagonal Radar Chart & Maturity Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Radar Chart Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-800 mb-2 text-center uppercase tracking-wider flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" /> Biểu Đồ Radar 6 Cạnh
                  </h4>
                  <HexagonRadarChart
                    pillarResults={assessment.orderedPillarResults}
                    bottleneckPillarId={assessment.bottleneckPillar?.pillarId}
                    bottleneckClusterIds={assessment.bottleneckCluster.map(p => p.pillarId)}
                    size={360}
                  />
                </div>
              </div>

              {/* Maturity Report Column (7 cols) */}
              <div className="lg:col-span-7">
                <MaturityReport assessment={assessment} />
              </div>
            </div>

            {/* Liebig Bottleneck Alert */}
            <BottleneckAlert
              bottleneckPillar={assessment.bottleneckPillar}
              bottleneckCluster={assessment.bottleneckCluster}
            />

            {/* KUBA® Change Commitment Overlay */}
            {assessment.bottleneckPillar && (
              <KUBAModule
                bottleneckName={assessment.bottleneckPillar.pillarName}
              />
            )}

            {/* Hotline Tư Vấn Trực Tiếp Mr. Duy */}
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-md border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
                  <PhoneCall className="w-3.5 h-3.5" /> Hotline Chuyên Gia Hỗ Trợ
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  Cần Chuyên Gia Khảo Sát Chi Tiết & Tư Vấn Trực Tiếp Tại Doanh Nghiệp?
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
                  Nếu Quý khách có bất kỳ thắc mắc gì về kết quả khảo sát, hoặc muốn chuyên gia đến khảo sát chi tiết và tư vấn trực tiếp tại Doanh nghiệp, hãy liên hệ ngay với chúng tôi.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="tel:0913989172"
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" /> 0913989172 (Mr. Duy)
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-xs mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-300">
              LamSep — Bộ Công Cụ Đánh Giá Năng Lực Thực Thi SME
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              © 2026 Hoàng Vũ & LamSep Consulting Group. All rights reserved.
            </p>
          </div>
          <div className="text-[11px] text-slate-500">
            Client-Only SPA — Zero External Network Egress
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showOnboarding && (
        <OnboardingModal
          initialProfile={profile}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {showPDFPreview && (
        <PDFExportView
          assessment={assessment}
          profile={profile}
          responses={responses}
          onClose={() => setShowPDFPreview(false)}
          onDownloadPDF={handleDownloadPDF}
          onUpdateProfile={handleSaveProfile}
          isGeneratingPDF={isGeneratingPDF}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { SurveyAssessmentResult, OnboardingProfile, SurveyResponseMap } from '../types/survey';
import { HexagonRadarChart } from './HexagonRadarChart';
import { KUBA_STAGES_DATA } from '../data/kubaMatrix';
import { submitLeadData } from '../utils/leadCapture';
import { Mail, Phone, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PDFExportViewProps {
  assessment: SurveyAssessmentResult;
  profile: OnboardingProfile | null;
  responses: SurveyResponseMap;
  onClose: () => void;
  onDownloadPDF: () => void;
  onUpdateProfile?: (updatedProfile: OnboardingProfile) => void;
  isGeneratingPDF: boolean;
}

export const PDFExportView: React.FC<PDFExportViewProps> = ({
  assessment,
  profile,
  responses,
  onClose,
  onDownloadPDF,
  onUpdateProfile,
  isGeneratingPDF,
}) => {
  const { overallPercent, overallRawScore, maturityLevel, orderedPillarResults, bottleneckPillar, bottleneckCluster } = assessment;
  const kubaUnderstand = KUBA_STAGES_DATA[2];

  const [email, setEmail] = useState<string>(profile?.email || '');
  const [phone, setPhone] = useState<string>(profile?.phone || '');
  const [consultationConsent, setConsultationConsent] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const isValidEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());

  const handleDownloadWithLead = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      setErrorMsg('Vui lòng nhập địa chỉ Email hợp lệ để nhận bản báo cáo đầy đủ.');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);

    const updatedProfile: OnboardingProfile = {
      ...(profile || {
        fullName: 'Doanh chủ SME',
        role: 'CEO / Quản lý',
        department: 'Ban Điều Hành',
        experienceYears: '3 - 5 năm',
        gender: 'Nam',
        companyName: 'Doanh nghiệp SME',
        industry: 'Đa ngành',
        companySize: '20 - 50 nhân sự',
        establishedYears: '3 - 5 năm',
        annualRevenue: '10 - 50 tỷ VNĐ',
        consent: true,
      }),
      email: email.trim(),
      phone: phone.trim(),
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }

    // Submit lead with full 60 questions responses in background
    await submitLeadData(updatedProfile, assessment, responses, email.trim(), phone.trim());

    // Trigger PDF download
    onDownloadPDF();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-start p-4 overflow-y-auto">
      {/* Top Action & Email Capture Header */}
      <div className="sticky top-4 z-50 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-700 mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2 text-blue-400">
              <Download className="w-5 h-5" />
              Nhận & Tải Báo Cáo Chẩn Đoán Năng Lực Thực Thi A4
            </h3>
            <p className="text-xs text-slate-400">
              Báo cáo bao gồm: Biểu đồ Radar 6 cạnh, Bảng điểm 60 câu, Phân tích Điểm nghẽn Liebig & Lộ trình KUBA® 90 ngày
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Đóng lại
          </button>
        </div>

        {/* Email & Phone Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              Email nhận báo cáo chi tiết <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              placeholder="VD: ceo@congty.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="md:col-span-4 space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              Số điện thoại / Zalo (nhận tư vấn)
            </label>
            <input
              type="tel"
              placeholder="VD: 0912 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="button"
              onClick={handleDownloadWithLead}
              disabled={isGeneratingPDF}
              className="w-full py-2 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isGeneratingPDF ? (
                'Đang tạo file PDF...'
              ) : isSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Tải Lại PDF
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Tải Báo Cáo PDF A4
                </>
              )}
            </button>
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs text-red-400 font-medium">⚠️ {errorMsg}</p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consultationConsent}
              onChange={(e) => setConsultationConsent(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Đồng ý nhận bản phân tích chuyên sâu & tư vấn giải pháp từ chuyên gia Làm Sếp (Kenmei)</span>
          </label>
          <span className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Bảo mật thông tin tuyệt đối
          </span>
        </div>
      </div>

      {/* Printable Report Canvas (A4 Dimensions simulation) */}
      <div
        id="pdf-report-content"
        className="bg-white text-slate-900 p-8 sm:p-12 max-w-4xl w-full rounded-2xl shadow-xl border border-slate-200 space-y-8 print:p-0 print:border-none print:shadow-none"
      >
        {/* Header Branding */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-lamsep.jpg" 
              alt="LamSep Logo" 
              className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-200 shadow-sm flex-shrink-0" 
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                BÁO CÁO CHẨN ĐOÁN NĂNG LỰC THỰC THI SME
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Khung Quản trị PSO (People - Strategy - Operations) & Khung Chuyển đổi KUBA®
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500">
            <span className="font-bold text-slate-800 block">LamSep Consulting Group</span>
            <span>Ngày đánh giá: {new Date().toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        {/* Profile Details */}
        {profile && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Người khảo sát:</span>
              <strong className="text-slate-800">{profile.fullName || 'Doanh chủ SME'}</strong>
              {email && <span className="block text-[10px] text-slate-500 truncate">{email}</span>}
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
                  ({overallRawScore === null ? 'Điểm: N/A — không quy đổi khi có N/A' : `Điểm đạt được: ${overallRawScore}/300 điểm`})
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

        {/* Section 4: Direct Consultation Hotline */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-4 rounded-xl text-xs space-y-1.5">
          <h4 className="font-bold text-blue-950 text-sm flex items-center gap-2">
            📞 Khảo Sát Chi Tiết & Tư Vấn Trực Tiếp Tại Doanh Nghiệp
          </h4>
          <p className="text-slate-700 leading-relaxed">
            Nếu Quý khách có bất kỳ thắc mắc gì về kết quả khảo sát, hoặc muốn chuyên gia đến khảo sát chi tiết, tư vấn trực tiếp tại Doanh nghiệp, hãy liên hệ với chúng tôi qua số điện thoại: <strong className="text-blue-700 text-sm">0913989172 (Mr. Duy)</strong>.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-[10px] text-slate-400">
          <span>© 2026 Hoàng Vũ & LamSep Consulting Group. All rights reserved.</span>
          <span>Báo cáo chẩn đoán năng lực thực thi SME LamSep</span>
        </div>
      </div>
    </div>
  );
};

import { OnboardingProfile, SurveyAssessmentResult } from '../types/survey';

export interface LeadSubmissionPayload {
  submittedAt: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  role: string;
  department: string;
  industry: string;
  companySize: string;
  annualRevenue: string;
  overallScorePercent: number;
  maturityLevel: string;
  bottleneckPillar: string;
  pillarScores: Record<string, number>;
}

export async function submitLeadData(
  profile: OnboardingProfile,
  assessment: SurveyAssessmentResult,
  userEmail: string,
  userPhone?: string
): Promise<{ success: boolean; message: string }> {
  const pillarScoresMap: Record<string, number> = {};
  assessment.orderedPillarResults.forEach(p => {
    pillarScoresMap[p.pillarName] = p.scorePercent;
  });

  const payload: LeadSubmissionPayload = {
    submittedAt: new Date().toISOString(),
    fullName: profile.fullName || 'Doanh chủ SME',
    email: userEmail,
    phone: userPhone || profile.phone || '',
    companyName: profile.companyName || 'Doanh nghiệp SME',
    role: profile.role || '',
    department: profile.department || '',
    industry: profile.industry || '',
    companySize: profile.companySize || '',
    annualRevenue: profile.annualRevenue || '',
    overallScorePercent: assessment.overallPercent,
    maturityLevel: assessment.maturityLevel.name,
    bottleneckPillar: assessment.bottleneckPillar?.pillarName || 'N/A',
    pillarScores: pillarScoresMap,
  };

  // 1. Save locally for client-side persistence
  try {
    const existingLeadsStr = localStorage.getItem('lamsep_leads_cache');
    const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
    existingLeads.push(payload);
    localStorage.setItem('lamsep_leads_cache', JSON.stringify(existingLeads));
  } catch (e) {
    console.warn('Could not save lead to local cache:', e);
  }

  // 2. Forward to configured Webhook (e.g. Google Apps Script / CRM) if available
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;
  if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors', // For Google Apps Script webhooks
      });
    } catch (err) {
      console.warn('Lead webhook submission error (handled gracefully):', err);
    }
  }

  return {
    success: true,
    message: 'Thông tin đã được ghi nhận. Báo cáo đang được tải về máy của bạn!',
  };
}

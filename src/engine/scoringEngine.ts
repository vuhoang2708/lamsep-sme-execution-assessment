import { PillarId, Question, SurveyResponseMap, PillarScoreResult, SurveyAssessmentResult, MaturityLevelInfo } from '../types/survey';
import { PILLARS_META, SURVEY_60_QUESTIONS } from '../data/survey60Questions';
import { detectBottlenecks } from './bottleneck';

export const MATURITY_LEVELS: Record<string, MaturityLevelInfo> = {
  LEVEL_1: {
    levelId: 'LEVEL_1',
    name: 'Cấp độ 1: Khởi phát & Hỗn loạn',
    scoreRangeStr: '0.0% – 49.9% (Điểm Raw: 60 – 179)',
    description: 'Mọi hoạt động phụ thuộc vào nỗ lực cá nhân; quyết định chậm, xử lý sự cố bị động, chữa cháy liên tục.',
    businessImpact: 'Nguồn lực tổ chức bị tiêu hao để duy trì vận hành cơ bản, chi phí cơ hội lớn, giá trị tạo ra cho khách hàng chưa ổn định.',
    badgeColor: 'bg-red-100 text-red-800 border-red-300'
  },
  LEVEL_2: {
    levelId: 'LEVEL_2',
    name: 'Cấp độ 2: Thử nghiệm & Chắp vá',
    scoreRangeStr: '50.0% – 69.9% (Điểm Raw: 180 – 227)',
    description: 'Đã có nhiều sáng kiến và cách làm mới nhưng chưa đồng bộ; kết quả phụ thuộc vào từng cá nhân xuất sắc.',
    businessImpact: 'Có nhiều nỗ lực nhưng chưa tạo được đòn bẩy quy mô, làm nhiều nhưng còn lãng phí nguồn lực và thời gian.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  LEVEL_3: {
    levelId: 'LEVEL_3',
    name: 'Cấp độ 3: Chuẩn hóa & Đồng bộ',
    scoreRangeStr: '70.0% – 84.9% (Điểm Raw: 228 – 263)',
    description: 'Đã có tiêu chuẩn, quy trình, vai trò rõ ràng; các bộ phận bắt đầu phối hợp nhịp nhàng theo cùng một cách làm.',
    businessImpact: 'Nguồn lực được sử dụng có chủ đích, tốc độ ra quyết định nhanh hơn, giảm thiểu lãng phí và vận hành ổn định.',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  LEVEL_4: {
    levelId: 'LEVEL_4',
    name: 'Cấp độ 4: Thực thi Xuất sắc',
    scoreRangeStr: '85.0% – 100.0% (Điểm Raw: 264 – 300)',
    description: 'Tổ chức có tính tự chủ cao, thực thi nhanh, liên tục cải tiến và tối ưu hóa nguồn lực vượt trội.',
    businessImpact: 'Tạo giá trị vượt bậc cho khách hàng, thiết lập lợi thế cạnh tranh bền vững và dẫn dắt thị trường.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  INSUFFICIENT: {
    levelId: 'INSUFFICIENT',
    name: 'Chưa đủ dữ liệu kết luận',
    scoreRangeStr: 'Không thể xác định (Có trụ cột thiếu > 50% câu hỏi)',
    description: 'Bài khảo sát có ít nhất 1 trụ cột chưa đủ số lượng câu trả lời hợp lệ để đưa ra kết luận phân hạng chính xác.',
    businessImpact: 'Cần hoàn thành bổ sung các câu hỏi chưa trả lời hoặc chọn mức điểm thực tế thay vì chọn N/A.',
    badgeColor: 'bg-gray-100 text-gray-800 border-gray-300'
  }
};

/**
 * Tính điểm cho một trụ cột theo công thức chuẩn Contract v2:
 * pillarPercent = sum(score - 1) / (4 * validCount) * 100
 * validCount < 5 -> isInsufficientData = true
 */
export function calculatePillarScore(
  pillarId: PillarId,
  responses: SurveyResponseMap,
  questions: Question[] = SURVEY_60_QUESTIONS
): PillarScoreResult {
  const pillarMeta = PILLARS_META.find(p => p.id === pillarId)!;
  const pillarQuestions = questions.filter(q => q.pillarId === pillarId);
  
  let totalValid = 0;
  let totalNA = 0;
  let rawSum = 0;
  let normalizedSum = 0;

  for (const q of pillarQuestions) {
    const score = responses[q.id];
    if (score === undefined || score === 0) {
      totalNA++;
    } else if (score >= 1 && score <= 5) {
      totalValid++;
      rawSum += score;
      normalizedSum += (score - 1);
    }
  }

  const isInsufficientData = totalValid < 5;
  const scorePercent = totalValid > 0
    ? Number(((normalizedSum / (4 * totalValid)) * 100).toFixed(2))
    : 0;

  return {
    pillarId,
    pillarName: pillarMeta.name,
    pillarIndex: pillarMeta.index,
    totalValid,
    totalNA,
    rawSum,
    scorePercent,
    isInsufficientData
  };
}

/**
 * Tính điểm tổng thể và phân hạng trưởng thành cho toàn bộ 6 chuyên đề
 */
export function calculateOverallAssessment(
  responses: SurveyResponseMap,
  questions: Question[] = SURVEY_60_QUESTIONS
): SurveyAssessmentResult {
  const pillarResults = {} as Record<PillarId, PillarScoreResult>;
  const orderedPillarResults: PillarScoreResult[] = [];

  let hasInsufficientData = false;
  let totalRawScore = 0;
  let totalScorePercentSum = 0;
  let answeredCount = 0;

  for (const meta of PILLARS_META) {
    const res = calculatePillarScore(meta.id as PillarId, responses, questions);
    pillarResults[meta.id as PillarId] = res;
    orderedPillarResults.push(res);

    if (res.isInsufficientData) {
      hasInsufficientData = true;
    }

    totalRawScore += res.rawSum;
    totalScorePercentSum += res.scorePercent;
  }

  for (const q of questions) {
    if (responses[q.id] !== undefined) {
      answeredCount++;
    }
  }

  const isFullyCompleted = answeredCount === questions.length;
  const hasExcludedResponses = orderedPillarResults.some((result) => result.totalNA > 0);
  
  // Equal-Pillar Scoring: Điểm tổng thể là trung bình cộng của 6 trụ cột (mỗi trụ 16.67%)
  const overallPercent = Number((totalScorePercentSum / 6).toFixed(2));

  // Xác định Maturity Level
  let maturityLevel: MaturityLevelInfo;
  if (hasInsufficientData) {
    maturityLevel = MATURITY_LEVELS.INSUFFICIENT;
  } else if (overallPercent < 50.0) {
    maturityLevel = MATURITY_LEVELS.LEVEL_1;
  } else if (overallPercent < 70.0) {
    maturityLevel = MATURITY_LEVELS.LEVEL_2;
  } else if (overallPercent < 85.0) {
    maturityLevel = MATURITY_LEVELS.LEVEL_3;
  } else {
    maturityLevel = MATURITY_LEVELS.LEVEL_4;
  }

  // Phát hiện Điểm nghẽn và Nhóm điểm nghẽn suýt soát
  const { bottleneckPillar, bottleneckCluster } = detectBottlenecks(orderedPillarResults);

  return {
    pillarResults,
    orderedPillarResults,
    overallPercent,
    // A raw 60–300 score is comparable only when every answer is numeric 1–5.
    // Keep it null for N/A or unanswered responses so the UI cannot label a
    // partial sum as “/300”.
    overallRawScore: hasExcludedResponses ? null : totalRawScore,
    maturityLevel,
    hasInsufficientData,
    bottleneckPillar,
    bottleneckCluster,
    completedQuestionsCount: answeredCount,
    totalQuestionsCount: questions.length,
    isFullyCompleted
  };
}

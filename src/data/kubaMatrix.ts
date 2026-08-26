import { KUBAStageData } from '../types/kuba';

export const KUBA_STAGES_DATA: KUBAStageData[] = [
  {
    id: 'dont_know',
    index: 1,
    name: "Don't Know",
    vietnameseName: 'Chưa biết / Chưa nhận thức',
    readinessDescription: 'Đội ngũ chưa nhận thức được sự cần thiết hoặc tác động của thay đổi đối với điểm nghẽn này.',
    riskIfStuck: 'Unawareness (Thờ ơ, vô cảm, duy trì thói quen cũ mà không hiểu lý do)',
    leaderActionTitle: 'Leader Action: INFORM (Truyền thông minh bạch)',
    leaderActionDescription: 'Chia sẻ minh bạch bối cảnh, lý do sống còn vì sao công ty phải tháo gỡ điểm nghẽn này và bức tranh tương lai khi thay đổi thành công.',
    individualActionTitle: 'Individual Action: LISTEN (Lắng nghe & Đặt câu hỏi)',
    individualActionDescription: 'Chủ động lắng nghe thông điệp, tìm hiểu bối cảnh doanh nghiệp và đặt câu hỏi để làm rõ những điểm chưa hiểu.',
    acceptanceEvidenceProposal: 'Thông điệp truyền thông nội bộ được phát hành và 100% nhân sự trong phạm vi xác nhận đã đọc/nghe.'
  },
  {
    id: 'know',
    index: 2,
    name: 'Know',
    vietnameseName: 'Đã biết / Nắm thông tin',
    readinessDescription: 'Đã biết có chủ trương thay đổi nhưng chưa nắm rõ chi tiết cách thức thực hiện mới ra sao.',
    riskIfStuck: 'Confusion (Bối rối, mơ hồ, làm sai lệch so với định hướng)',
    leaderActionTitle: 'Leader Action: EDUCATE (Đào tạo & Hướng dẫn cụ thể)',
    leaderActionDescription: 'Tổ chức các buổi hướng dẫn ngắn, cung cấp quy trình, biểu mẫu mẫu (SOP) và minh họa các tình huống thực tế cụ thể.',
    individualActionTitle: 'Individual Action: LEARN (Học hỏi & Nắm tiêu chuẩn mới)',
    individualActionDescription: 'Tham gia học tập, đọc kỹ tài liệu hướng dẫn và xác định sự thay đổi này tác động thế nào đến công việc hàng ngày của mình.',
    acceptanceEvidenceProposal: 'Tổ chức xong buổi đào tạo/hướng dẫn và bài kiểm tra nhận thức nhanh đạt tỷ lệ hiểu đúng ≥ 80%.'
  },
  {
    id: 'understand',
    index: 3,
    name: 'Understand',
    vietnameseName: 'Đã hiểu / Thấu suốt',
    readinessDescription: 'Đã hiểu chi tiết nhưng còn băn khoăn về khó khăn, sự xáo trộn hoặc chi phí chuyển đổi ban đầu.',
    riskIfStuck: 'Negative Perception / Skepticism (Hoài nghi, lo ngại rủi ro, phòng thủ tâm lý)',
    leaderActionTitle: 'Leader Action: COACH & ALIGN (Kèm cặp & Đối thoại giải tỏa)',
    leaderActionDescription: 'Gặp gỡ 1-1 hoặc theo nhóm nhỏ, lắng nghe chân thành các lo ngại, phân tích rõ được - mất và cùng tháo gỡ vướng mắc.',
    individualActionTitle: 'Individual Action: CHOOSE (Chủ động lựa chọn cam kết)',
    individualActionDescription: 'Cân nhắc thấu đáo, vượt qua tâm lý ngại thay đổi, chủ động lựa chọn đồng hành và đóng góp sáng kiến tháo gỡ khó khăn.',
    acceptanceEvidenceProposal: 'Biên bản thống nhất kế hoạch hành động cá nhân (Individual Action Plan) được ký kết với quản lý trực tiếp.'
  },
  {
    id: 'believe',
    index: 4,
    name: 'Believe',
    vietnameseName: 'Tin tưởng / Sẵn sàng hành động',
    readinessDescription: 'Đã tin cách làm mới sẽ mang lại hiệu quả thực sự và mong muốn tham gia thử nghiệm.',
    riskIfStuck: 'Choice not to play / Lack of momentum (Thiếu môi trường an toàn để thực hành, dễ nản nếu vấp váp)',
    leaderActionTitle: 'Leader Action: ENGAGE & EMPOWER (Trao quyền & Thử nghiệm Pilot)',
    leaderActionDescription: 'Tạo môi trường an toàn tâm lý cho phép thử nghiệm quy mô nhỏ (Pilot), hỗ trợ nguồn lực và kịp thời tháo gỡ rào cản.',
    individualActionTitle: 'Individual Action: ADAPT & PRACTICE (Thực hành linh hoạt)',
    individualActionDescription: 'Chủ động áp dụng quy trình mới vào công việc thực tế, linh hoạt điều chỉnh và phản hồi nhanh các điểm bất cập.',
    acceptanceEvidenceProposal: 'Dự án thử nghiệm (Pilot) 30 ngày hoàn thành với các chỉ số đo lường hiệu quả cụ thể.',
    isResistanceThresholdBefore: true
  },
  {
    id: 'act',
    index: 5,
    name: 'Act',
    vietnameseName: 'Hành động liên tục / Trở thành thói quen',
    readinessDescription: 'Vận hành thành thạo, duy trì đều đặn và đưa cách làm mới trở thành nếp văn hóa tự giác.',
    riskIfStuck: 'Dropped after attempt (Đầu voi đuôi chuột, dễ quay về lối mòn cũ khi hết kiểm tra)',
    leaderActionTitle: 'Leader Action: REWARD & REINFORCE (Ghi nhận & Thể chế hóa)',
    leaderActionDescription: 'Khen thưởng kịp thời các thành tích thực tế, thể chế hóa thành chuẩn mực vĩnh viễn và liên tục tối ưu hóa quy trình.',
    individualActionTitle: 'Individual Action: OWN & MENTOR (Làm chủ & Kèm cặp đồng nghiệp)',
    individualActionDescription: 'Làm chủ 100% công việc theo chuẩn mới, chủ động hướng dẫn đồng nghiệp và duy trì kỷ luật tự giác cao nhất.',
    acceptanceEvidenceProposal: 'Quy trình mới được áp dụng chuẩn hóa trong SOP và vận hành liên tục không gián đoạn ≥ 60 ngày.'
  }
];

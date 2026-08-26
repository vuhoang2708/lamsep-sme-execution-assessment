import { Question } from '../types/survey';

export const PILLARS_META = [
  { id: 'strategy', name: 'Chiến lược xuất sắc', index: 1, subtitle: 'Năng lực lựa chọn & Tạo lợi thế cạnh tranh' },
  { id: 'leadership', name: 'Lãnh đạo xuất sắc', index: 2, subtitle: 'Nghệ thuật dẫn dắt đội ngũ' },
  { id: 'culture', name: 'Văn hoá xuất sắc', index: 3, subtitle: 'Trải nghiệm định hình hành động' },
  { id: 'hr', name: 'Nhân lực xuất sắc', index: 4, subtitle: 'Đòn bẩy con người' },
  { id: 'operations', name: 'Vận hành xuất sắc', index: 5, subtitle: 'Dòng chảy kết quả trơn tru' },
  { id: 'performance', name: 'Hiệu suất xuất sắc', index: 6, subtitle: 'Nâng cao chất lượng công việc' },
] as const;

export const SURVEY_60_QUESTIONS: Question[] = [
  // --- CHUYÊN ĐỀ 1: CHIẾN LƯỢC XUẤT SẮC ---
  {
    id: 'Q1.1',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 1,
    shortName: 'Khát vọng số liệu',
    text: 'Công ty có mục tiêu tăng trưởng và khát vọng chiến thắng rõ ràng về doanh thu, thị phần và vị thế cạnh tranh, được đội ngũ hiểu và đồng lòng hướng tới không?'
  },
  {
    id: 'Q1.2',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 2,
    shortName: 'Khách hàng mục tiêu',
    text: 'Công ty có xác định rõ khách hàng mục tiêu, phân khúc ưu tiên và các kênh bán hàng cốt lõi, đồng thời chủ động từ chối những cơ hội không phù hợp với định hướng chiến lược không?'
  },
  {
    id: 'Q1.3',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 3,
    shortName: 'Điểm khác biệt USP',
    text: 'Sản phẩm/dịch vụ có một giá trị khác biệt rõ ràng và đủ hấp dẫn để khách hàng ưu tiên lựa chọn công ty thay vì đối thủ không?'
  },
  {
    id: 'Q1.4',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 4,
    shortName: 'Lợi thế khó sao chép (VRIN)',
    text: 'Lợi thế cạnh tranh của công ty có dựa trên những nguồn lực hoặc năng lực khó sao chép, khó thay thế và có khả năng tạo giá trị bền vững không?'
  },
  {
    id: 'Q1.5',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 5,
    shortName: 'Rà soát đối thủ & thị trường',
    text: 'Ban lãnh đạo có thường xuyên phân tích khách hàng, đối thủ và thị trường để xác định khoảng trống cạnh tranh và tận dụng thế mạnh cốt lõi của mình để giành lợi thế không?'
  },
  {
    id: 'Q1.6',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 6,
    shortName: 'Tốc độ thích ứng',
    text: 'Công ty có khả năng nhanh chóng nhận diện thay đổi của thị trường và điều chỉnh sản phẩm, dịch vụ hoặc mô hình kinh doanh trước khi sự thay đổi trở thành mối đe dọa lớn không?'
  },
  {
    id: 'Q1.7',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 7,
    shortName: 'Tập trung nguồn lực giá trị',
    text: 'Công ty có chủ động tập trung nguồn lực vào những hoạt động tạo ra giá trị và lợi thế cạnh tranh cao nhất, đồng thời loại bỏ hoặc hạn chế những hoạt động không còn tạo giá trị chiến lược không?'
  },
  {
    id: 'Q1.8',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 8,
    shortName: 'Ưu tiên trọng tâm (Few Critical)',
    text: 'Công ty có xác định rõ một số ít việc quan trọng nhất cần tập trung trong từng giai đoạn, giao người chịu trách nhiệm cụ thể và ưu tiên nguồn lực để thực hiện đến cùng không?'
  },
  {
    id: 'Q1.9',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 9,
    shortName: 'Kiểm chứng bằng dữ liệu',
    text: 'Khi ra quyết định kinh doanh quan trọng, ban lãnh đạo có chủ động kiểm chứng giả định bằng dữ liệu thực tế từ khách hàng, thị trường và đối thủ thay vì chỉ dựa vào kinh nghiệm, cảm tính hoặc thông tin ban đầu không?'
  },
  {
    id: 'Q1.10',
    pillarId: 'strategy',
    pillarName: 'Chiến lược xuất sắc',
    pillarIndex: 1,
    order: 10,
    shortName: 'Quyết đoán ra quyết định',
    text: 'Ban lãnh đạo có khả năng đưa ra quyết định kịp thời dựa trên mức độ thông tin cần thiết, chấp nhận rủi ro có tính toán và tránh trì hoãn vì theo đuổi quá nhiều lựa chọn không?'
  },

  // --- CHUYÊN ĐỀ 2: LÃNH ĐẠO XUẤT SẮC ---
  {
    id: 'Q2.1',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 1,
    shortName: 'Nhất quán Nói và Làm',
    text: 'Lãnh đạo có nhất quán giữa điều mình nói, cách mình hành động, những gì mình ưu tiên và những gì mình đo lường để trở thành hình mẫu cho đội ngũ không?'
  },
  {
    id: 'Q2.2',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 2,
    shortName: 'Tìm kiếm phản hồi',
    text: 'Lãnh đạo có chủ động tìm kiếm phản hồi từ cấp dưới, đồng nghiệp và các bên liên quan, đồng thời sẵn sàng thay đổi hành vi khi nhận thấy cần thiết không?'
  },
  {
    id: 'Q2.3',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 3,
    shortName: 'Tam trị Nhân - Pháp',
    text: 'Lãnh đạo có kết hợp hài hòa giữa Nhân trị (tôn trọng, thấu hiểu và phát triển con người) với Pháp trị (nguyên tắc, kỷ luật, trách nhiệm và công bằng) trong quản trị đội ngũ không?'
  },
  {
    id: 'Q2.4',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 4,
    shortName: 'Ứng dụng công nghệ & số hóa',
    text: 'Lãnh đạo có chủ động ứng dụng công nghệ, dữ liệu và số hóa để tăng tốc độ ra quyết định, giảm công việc thủ công và nâng cao hiệu quả vận hành không?'
  },
  {
    id: 'Q2.5',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 5,
    shortName: 'Mức độ tin cậy nội bộ',
    text: 'Lãnh đạo có xây dựng được mức độ tin cậy đủ cao giữa các cá nhân và phòng ban để giảm sự phụ thuộc vào các tầng kiểm soát, phê duyệt và giám sát không cần thiết không?'
  },
  {
    id: 'Q2.6',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 6,
    shortName: 'Tiêu chuẩn đội ngũ',
    text: 'Lãnh đạo có xác định rõ những phẩm chất, năng lực và hành vi cần có của đội ngũ phù hợp với chiến lược và văn hóa doanh nghiệp để làm cơ sở cho tuyển chọn và phát triển nhân sự không?'
  },
  {
    id: 'Q2.7',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 7,
    shortName: 'Truyền tải sứ mệnh & ý nghĩa',
    text: 'Lãnh đạo có truyền tải rõ sứ mệnh, định hướng và ý nghĩa của công việc để nhân viên hiểu mình đang tạo ra giá trị gì và vì sao công việc của họ quan trọng không?'
  },
  {
    id: 'Q2.8',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 8,
    shortName: 'Dẫn dắt chuyển đổi',
    text: 'Khi cần chuyển đổi về văn hóa, công nghệ hoặc mô hình kinh doanh, lãnh đạo có truyền thông rõ ràng, kiên trì dẫn dắt và xử lý các lực cản để đưa tổ chức đi đến cùng không?'
  },
  {
    id: 'Q2.9',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 9,
    shortName: 'Thấu hiểu sự khác biệt',
    text: 'Lãnh đạo có hiểu sự khác biệt về năng lực, động lực, phong cách hành vi và nhu cầu phát triển của từng thành viên để giao việc, giao quyền và dẫn dắt phù hợp không?'
  },
  {
    id: 'Q2.10',
    pillarId: 'leadership',
    pillarName: 'Lãnh đạo xuất sắc',
    pillarIndex: 2,
    order: 10,
    shortName: 'Dừng dự án kém hiệu quả',
    text: 'Lãnh đạo có chủ động phân bổ nguồn lực – con người, thời gian, vốn và sự chú ý vào những ưu tiên tạo ra giá trị và lợi nhuận cao nhất, đồng thời quyết liệt dừng hoặc điều chỉnh những hoạt động kém hiệu quả không?'
  },

  // --- CHUYÊN ĐỀ 3: VĂN HOÁ XUẤT SẮC ---
  {
    id: 'Q3.1',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 1,
    shortName: 'An toàn tâm lý (Nói sự thật)',
    text: 'Nhân viên có cảm thấy an toàn để nói sự thật, nêu vấn đề, thừa nhận sai sót và phản biện mang tính xây dựng mà không sợ bị quy chụp hoặc trừng phạt không?'
  },
  {
    id: 'Q3.2',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 2,
    shortName: 'Báo cáo sự cố kịp thời',
    text: 'Khi có sự cố hoặc thông tin bất lợi, nhân viên có chủ động báo cáo kịp thời lên cấp có thẩm quyền thay vì trì hoãn, che giấu hoặc làm nhẹ vấn đề không?'
  },
  {
    id: 'Q3.3',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 3,
    shortName: 'Ý nghĩa công việc',
    text: 'Nhân viên có hiểu rõ công việc hàng ngày của mình tạo ra giá trị gì cho công ty và khách hàng không?'
  },
  {
    id: 'Q3.4',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 4,
    shortName: 'Ghi nhận tiến bộ nhỏ (Small Wins)',
    text: 'Công ty có cơ chế ghi nhận và khích lệ kịp thời những tiến bộ, sáng kiến và hành vi tích cực của nhân viên để duy trì động lực thực thi không?'
  },
  {
    id: 'Q3.5',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 5,
    shortName: 'Tự nhận trách nhiệm (Own It)',
    text: 'Khi công việc không đạt kết quả, nhân viên có chủ động nhận trách nhiệm đối với phần việc của mình và tập trung tìm giải pháp thay vì đổ lỗi không?'
  },
  {
    id: 'Q3.6',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 6,
    shortName: 'Xử lý né tránh trách nhiệm',
    text: 'Tổ chức có nhận diện, phản hồi và xử lý nhất quán các hành vi đổ lỗi, né tránh trách nhiệm hoặc đẩy vấn đề sang người/phòng ban khác không?'
  },
  {
    id: 'Q3.7',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 7,
    shortName: 'Xử lý hành vi tiêu cực',
    text: 'Công ty có kịp thời nhận diện và xử lý những hành vi tiêu cực, thiếu hợp tác hoặc làm ảnh hưởng đến tinh thần, niềm tin và hiệu quả của đội ngũ không?'
  },
  {
    id: 'Q3.8',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 8,
    shortName: 'Trao quyền tự chủ',
    text: 'Nhân viên và quản lý các cấp có đủ quyền hạn và phạm vi tự chủ để chủ động ra quyết định, xử lý công việc trong phạm vi trách nhiệm mà không phải liên tục chờ CEO phê duyệt không?'
  },
  {
    id: 'Q3.9',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 9,
    shortName: 'Tranh luận dựa trên dữ liệu',
    text: 'Trong các cuộc họp, các ý kiến khác biệt có được lắng nghe và tranh luận dựa trên dữ liệu, vấn đề và lợi ích chung thay vì dựa trên chức vụ hoặc cảm tính không?'
  },
  {
    id: 'Q3.10',
    pillarId: 'culture',
    pillarName: 'Văn hoá xuất sắc',
    pillarIndex: 3,
    order: 10,
    shortName: 'Hiện thực hóa giá trị cốt lõi',
    text: 'Các giá trị cốt lõi và quy tắc ứng xử có được chuyển hóa thành những hành vi cụ thể, được thể hiện nhất quán trong chính sách, quyết định và trải nghiệm hàng ngày của nhân viên không?'
  },

  // --- CHUYÊN ĐỀ 4: NHÂN LỰC XUẤT SẮC ---
  {
    id: 'Q4.1',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 1,
    shortName: 'Chiến lược nhân sự 6B',
    text: 'Công ty có chiến lược rõ ràng về việc khi nào nên tuyển dụng, khi nào phát triển nội bộ, khi nào thuê ngoài hoặc sử dụng nguồn lực linh hoạt để đáp ứng nhu cầu nhân sự không?'
  },
  {
    id: 'Q4.2',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 2,
    shortName: 'Đánh giá & Xử lý nhân sự',
    text: 'Công ty có cơ chế đánh giá và xử lý kịp thời những nhân sự không còn phù hợp về năng lực, hiệu suất hoặc giá trị/hành vi, bao gồm đào tạo, điều chuyển hoặc hỗ trợ phù hợp không?'
  },
  {
    id: 'Q4.3',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 3,
    shortName: 'Thương hiệu tuyển dụng (EVP)',
    text: 'Công ty có xây dựng được định vị giá trị nhân viên và thương hiệu nhà tuyển dụng đủ hấp dẫn để thu hút đúng nhóm ứng viên mà doanh nghiệp cần không?'
  },
  {
    id: 'Q4.4',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 4,
    shortName: 'Đào tạo thực hành (70/20/10 OJT)',
    text: 'Hoạt động phát triển năng lực có ưu tiên thực hành trên công việc, kèm cặp, mentoring/coaching và phản hồi thực tế thay vì chủ yếu đào tạo lý thuyết không?'
  },
  {
    id: 'Q4.5',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 5,
    shortName: 'Đo lường tác động đào tạo',
    text: 'Các chương trình đào tạo có được đánh giá dựa trên mức độ thay đổi năng lực, hành vi và tác động đến kết quả công việc/kinh doanh thực tế không?'
  },
  {
    id: 'Q4.6',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 6,
    shortName: 'Kế hoạch kế nhiệm (Succession)',
    text: 'Công ty có lộ trình phát triển năng lực và kế hoạch kế nhiệm rõ ràng cho các vị trí chủ chốt và đội ngũ quản lý kế cận không?'
  },
  {
    id: 'Q4.7',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 7,
    shortName: 'Lương thưởng công bằng & cạnh tranh',
    text: 'Chính sách lương, thưởng và đãi ngộ có đủ công bằng, hợp lý và cạnh tranh so với thị trường để thu hút, giữ chân những nhân sự quan trọng không?'
  },
  {
    id: 'Q4.8',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 8,
    shortName: 'Đãi ngộ phi tài chính',
    text: 'Công ty có các chính sách phúc lợi và đãi ngộ phi tài chính phù hợp với nhu cầu của các nhóm nhân sự khác nhau để tăng sự gắn kết và động lực làm việc không?'
  },
  {
    id: 'Q4.9',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 9,
    shortName: 'Phù hợp giai đoạn phát triển',
    text: 'Chiến lược nhân sự hiện tại có phù hợp với giai đoạn phát triển và chiến lược kinh doanh của doanh nghiệp (khởi nghiệp, tăng trưởng, trưởng thành, tái cấu trúc...) không?'
  },
  {
    id: 'Q4.10',
    pillarId: 'hr',
    pillarName: 'Nhân lực xuất sắc',
    pillarIndex: 4,
    order: 10,
    shortName: 'Bố trí đúng người đúng việc',
    text: 'Công ty có thường xuyên đánh giá mức độ phù hợp giữa năng lực, sở trường của nhân viên với yêu cầu của vị trí để bố trí đúng người, đúng việc và khai thác tốt nhất năng lực của họ không?'
  },

  // --- CHUYÊN ĐỀ 5: VẬN HÀNH XUẤT SẮC ---
  {
    id: 'Q5.1',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 1,
    shortName: 'Chuẩn hóa quy trình (SOP)',
    text: 'Công ty có phân biệt rõ giữa kết quả đạt được nhờ nỗ lực cá nhân nhất thời và kết quả có thể lặp lại nhờ quy trình, hệ thống và tiêu chuẩn chuẩn hóa không?'
  },
  {
    id: 'Q5.2',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 2,
    shortName: 'Rút kinh nghiệm sau hành động (AAR)',
    text: 'Sau mỗi chiến dịch, dự án hoặc sự kiện quan trọng, đội ngũ có đúc kết bài học và cải tiến cách làm cho lần sau không?'
  },
  {
    id: 'Q5.3',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 3,
    shortName: 'Kỷ luật Horenso 5 phút',
    text: 'Nhân viên có thói quen Báo cáo – Liên lạc – Thảo luận (Horenso) kịp thời để các vấn đề, rủi ro và thay đổi quan trọng được nhận diện và xử lý từ sớm không?'
  },
  {
    id: 'Q5.4',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 4,
    shortName: 'Kế hoạch ưu tiên rõ ràng',
    text: 'Quản lý và nhân viên có lập kế hoạch công việc rõ ràng theo mức độ ưu tiên, thời hạn và kết quả cần đạt không?'
  },
  {
    id: 'Q5.5',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 5,
    shortName: 'Kiểm soát thời lượng họp (<50p)',
    text: 'Các cuộc họp có được tổ chức đúng mục tiêu, đúng thành phần, đúng thời lượng và kết thúc bằng quyết định/kế hoạch hành động rõ ràng không?'
  },
  {
    id: 'Q5.6',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 6,
    shortName: 'Loại bỏ lãng phí thời gian',
    text: 'Trong quá trình xử lý công việc, công ty có thường xuyên đo lường và loại bỏ các thời gian lãng phí do chờ phê duyệt, chờ bàn giao, thiếu thông tin hoặc phụ thuộc giữa các phòng ban không?'
  },
  {
    id: 'Q5.7',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 7,
    shortName: 'Giao việc rõ tiêu chuẩn',
    text: 'Khi giao việc, quản lý có làm rõ kết quả cần đạt, yêu cầu nhân viên xác nhận lại mức độ hiểu và thống nhất thời hạn hoàn thành cụ thể không?'
  },
  {
    id: 'Q5.8',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 8,
    shortName: 'Quản trị theo đầu ra (Output)',
    text: 'Các quy trình và công việc có được quản trị dựa trên tiêu chuẩn đầu ra rõ ràng về chất lượng, thời gian và yêu cầu cần đạt không?'
  },
  {
    id: 'Q5.9',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 9,
    shortName: 'Bàn giao liên phòng ban',
    text: 'Việc bàn giao giữa các phòng ban có được quản trị theo nguyên tắc “phòng nhận đầu vào là khách hàng của phòng tạo đầu ra” và “phòng tạo đầu ra là ân nhân của phòng nhận đầu vào” không?'
  },
  {
    id: 'Q5.10',
    pillarId: 'operations',
    pillarName: 'Vận hành xuất sắc',
    pillarIndex: 5,
    order: 10,
    shortName: 'Trách nhiệm phối hợp & liên đới',
    text: 'Công ty có quy định rõ trách nhiệm phối hợp và trách nhiệm liên đới giữa các cá nhân/phòng ban để đảm bảo vấn đề được xử lý đến cùng, thông tin được chia sẻ đầy đủ và không phát sinh tình trạng đùn đẩy trách nhiệm không?'
  },

  // --- CHUYÊN ĐỀ 6: HIỆU SUẤT XUẤT SẮC (MỚI) ---
  {
    id: 'Q6.1',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 1,
    shortName: 'Mục tiêu kinh doanh 6-12 tháng',
    text: 'Công ty có mục tiêu kinh doanh rõ ràng, cụ thể và đo lường được trong 6-12 tháng tới không?'
  },
  {
    id: 'Q6.2',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 2,
    shortName: 'Cụ thể hoá thành KPI/OKR',
    text: 'Mục tiêu kinh doanh có được cụ thể hoá thành các chỉ số KPI/OKR không?'
  },
  {
    id: 'Q6.3',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 3,
    shortName: 'Phân rã mục tiêu xuống cá nhân',
    text: 'Mục tiêu kinh doanh có được chuyển hóa thành mục tiêu và kết quả cần đạt của từng phòng ban, bộ phận và cá nhân không?'
  },
  {
    id: 'Q6.4',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 4,
    shortName: 'Nhân viên thấu hiểu KPI',
    text: 'Nhân viên có hiểu rõ mục tiêu, chỉ số KPI/OKR được giao và cách thức để đạt được kết quả đó không?'
  },
  {
    id: 'Q6.5',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 5,
    shortName: 'KPI gắn với chức năng & đầu ra',
    text: 'Chỉ số KPI/OKR của phòng ban và cá nhân có gắn trực tiếp với chức năng, nhiệm vụ, quyền hạn và kết quả đầu ra của từng vị trí không?'
  },
  {
    id: 'Q6.6',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 6,
    shortName: 'Điều chỉnh KPI linh hoạt',
    text: 'Chỉ sô KPI/OKR có được rà soát, cập nhật và điều chỉnh linh hoạt khi công ty thay đổi chiến lược và mục tiêu kinh doanh không?'
  },
  {
    id: 'Q6.7',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 7,
    shortName: 'Đánh giá gắn với đãi ngộ/đào tạo',
    text: 'Kết quả đánh giá hiệu suất có được sử dụng để làm cơ sở cho đào tạo, phát triển, ghi nhận và khen thưởng nhân viên không?'
  },
  {
    id: 'Q6.8',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 8,
    shortName: 'Theo dõi & Phản hồi liên tục',
    text: 'Quản lý có thường xuyên theo dõi, phản hồi kịp thời và hướng dẫn nhân viên cải thiện hiệu suất trước khi kết thúc kỳ đánh giá không?'
  },
  {
    id: 'Q6.9',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 9,
    shortName: 'Năng lực quản lý cấp trung',
    text: 'Quản lý cấp trung có đủ năng lực để thiết lập mục tiêu, chỉ số KPI/OKR của nhân viên không?'
  },
  {
    id: 'Q6.10',
    pillarId: 'performance',
    pillarName: 'Hiệu suất xuất sắc',
    pillarIndex: 6,
    order: 10,
    shortName: 'Đánh giá phù hợp chuẩn mực văn hóa',
    text: 'Công ty có đánh giá mức độ nhân viên thực hiện công việc phù hợp với các giá trị cốt lõi và chuẩn mực văn hóa của công ty không?'
  }
];

export const LIKERT_OPTIONS = [
  { score: 1, label: '1 - Chưa có', desc: 'Hoàn toàn chưa xuất hiện hoạt động này; chưa ai nhận thức hoặc thực hiện.' },
  { score: 2, label: '2 - Tự phát', desc: 'Đã xuất hiện nhưng mang tính cá nhân, ngẫu hứng, phụ thuộc con người.' },
  { score: 3, label: '3 - Chuẩn hoá', desc: 'Đã có quy trình rõ ràng áp dụng diện rộng, nhưng còn cần giám sát.' },
  { score: 4, label: '4 - Được quản trị', desc: 'Hoạt động đều đặn, theo dõi bằng dữ liệu/KPI cụ thể, cải tiến định kỳ.' },
  { score: 5, label: '5 - Trở thành văn hoá', desc: 'Thói quen tự giác 100% nhân sự, ăn sâu vào niềm tin không cần kiểm soát.' },
] as const;

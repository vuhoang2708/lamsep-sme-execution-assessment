# SURVEY DESIGN CONTRACT V2.1 — LAMSEP SME EXECUTION ASSESSMENT (6-PILLAR & KUBA® OVERLAY)

**Phiên bản:** v2.1 (Bản 6 Chuyên đề - 60 Câu hỏi - Biểu đồ 6 Cạnh; hậu sửa H-01–H-05)  
**Ngày cập nhật:** 2026-08-24  
**Tác giả & Đối tác:** Vũ Hoàng & Thanh Duy (DHM8) / Chuyên gia Huỳnh Trọng Nghĩa (Kenmei)  
**Khung phương pháp luận:** PSO Framework (People - Strategy - Operations — Larry Bossidy) + KUBA® Change Commitment Model  
**Nguồn đối chiếu:** `BỘ CÂU HỎI CỦA 6 CHUYÊN ĐỀ.docx`  

---

## I. RANH GIỚI DỮ LIỆU & QUYỀN RIÊNG TƯ (H-01 SPECIFICATION)

### 1. Phân định Rạch ròi 2 Pha (Phase Isolation)
* **Pha 1 — MVP Client-Only (Option 1):**
  * **Zero External Data Egress:** Ứng dụng chạy 100% trên trình duyệt người dùng (Client-side Single Page Application). Sau khi tải gói tài nguyên tĩnh ban đầu cùng nguồn gốc (*same-origin initial bundle*), ứng dụng **tuyệt đối không gửi bất kỳ HTTP request, câu trả lời, kết quả hay PII nào ra máy chủ ngoại vi**.
  * **Chính sách lưu trữ cục bộ (Local Storage Policy):** Mặc định chạy hoàn toàn trong bộ nhớ tạm (*in-memory*). Tính năng lưu bản nháp vào `localStorage` là **Opt-in tường minh** (người dùng phải chủ động tích chọn *"Lưu bản nháp trên trình duyệt này"*).
  * **Quyền Dữ liệu (Data Rights):** Cung cấp nút bấm *"Xóa sạch dữ liệu bài làm"* (Clear Data) để xóa ngay lập tức toàn bộ trạng thái trong bộ nhớ và `localStorage`.
  * **Cổng onboarding (Onboarding Gate):** Consent phải mặc định tắt; không có bypass; sáu trường Chức vụ, Bộ phận, Kinh nghiệm, Ngành nghề, Quy mô nhân sự và Doanh thu là bắt buộc trước khi vào câu hỏi.
  * **Định vị kết quả:** Định vị là **Exploratory Self-Assessment** (Công cụ tự đánh giá khám phá hiện trạng). Tuyệt đối không đưa ra các tuyên bố nhân quả tuyệt đối (như *"nguyên nhân làm rò rỉ 30% doanh thu"*); chỉ gọi là *"Điểm ưu tiên cần xác minh / Điểm nghẽn tiềm ẩn"*.
* **Pha 2 — Enterprise & Lead Engine (Option 2):**
  * Tách biệt hoàn toàn khỏi Pha 1. Chỉ triển khai khi có bản Cam kết Bảo mật Dữ liệu (Data Privacy Policy), cơ chế đồng ý lưu trữ (Explicit Consent), mã hóa truyền tải và máy chủ backend bảo mật.

---

## II. SCORE CONTRACT & THUẬT TOÁN ĐIỂM SỐ 6 TRỤ CỘT (H-02 SPECIFICATION)

### 1. Quy cách Điểm số Chuẩn (Single Source of Truth)
* **Số lượng chuyên đề:** 6 chuyên đề (Chiến lược, Lãnh đạo, Văn hóa, Nhân lực, Vận hành, Hiệu suất).
* **Số lượng câu hỏi:** 60 câu chuẩn canonical (10 câu / chuyên đề x 6 chuyên đề).
* **Thang đo từng câu:** Likert 1 – 5 điểm + Lựa chọn **N/A** (Không áp dụng / Chưa đủ thông tin quan sát).
  * **1 Điểm: Chưa có** (Hoàn toàn chưa xuất hiện hoạt động/hành vi này; chưa ai nhận thức hoặc thực hiện).
  * **2 Điểm: Tự phát** (Đã xuất hiện hành vi nhưng mang tính cá nhân, ngẫu hứng, cảm tính, phụ thuộc con người).
  * **3 Điểm: Chuẩn hoá** (Đã có quy trình, quy định rõ ràng và áp dụng diện rộng, nhưng chưa đều đặn, còn cần nhắc nhở).
  * **4 Điểm: Được quản trị** (Hoạt động diễn ra đều đặn, được theo dõi bằng dữ liệu/KPI cụ thể, có đánh giá định kỳ).
  * **5 Điểm: Trở thành văn hoá** (Hành vi trở thành thói quen tự giác của 100% nhân sự, ăn sâu vào niềm tin tổ chức).
* **Phương pháp tính điểm:** **Equal-Pillar Scoring** (Mỗi trụ cột chiếm đúng $1/6 \approx 16.667\%$ trọng số của tổng điểm toàn diện, phản ánh đúng hình học của biểu đồ Radar 6 cạnh đối xứng).
* **Thang điểm Raw:** 60 – 300 điểm chỉ khi đủ 60 câu đều là điểm số 1–5. Nếu có N/A hoặc bỏ trống, `Raw` không còn là tổng so sánh trên mẫu số 300 và giao diện/PDF phải hiển thị `N/A — không quy đổi Raw`; chỉ dùng phần trăm theo mẫu số hợp lệ.

### 2. Công thức Chuẩn hóa Trụ cột & Quy tắc Dữ liệu Thiếu (Missing Data Rule)
Với mỗi chuyên đề $k \in \{1..6\}$, gọi $\text{Valid}(k)$ là tập các câu trả lời hợp lệ (từ 1 đến 5 điểm, loại bỏ N/A):
$$\text{Score}_{\%}(k) = \frac{\sum_{i \in \text{Valid}(k)} (\text{Score}_i - 1)}{4 \times N_{\text{Valid}}(k)} \times 100\%$$

* **Quy tắc Dữ liệu không đủ (Insufficient Data Rule):** Nếu một trụ cột có số câu hợp lệ $N_{\text{Valid}}(k) < 5$ (tức $>50\%$ câu trả lời là N/A hoặc bỏ trống), trụ cột đó bị gắn nhãn `[INSUFFICIENT DATA / UNVERIFIED]` và hệ thống **chặn xuất Cấp độ trưởng thành tổng thể** để tránh kết luận sai lệch.
* **Điểm Tổng thể Toàn diện (khi cả 6 trụ cột đều hợp lệ):**
$$\text{Total Score}_{\%} = \frac{\sum_{k=1}^6 \text{Score}_{\%}(k)}{6}$$
* **Cổng báo cáo (Report Gate):** Chỉ mở Results/PDF khi đủ 60 câu đã chọn (điểm 1–5 hoặc N/A) và mọi trụ có ít nhất 5 câu hợp lệ; nếu còn câu bỏ trống hoặc có trụ `[INSUFFICIENT DATA / UNVERIFIED]`, phải chặn báo cáo tổng thể.

### 3. Bảng Phân hạng Mức độ Trưởng thành (Maturity Levels) — Thang 60 - 300 Điểm
| Cấp độ | Tên gọi chuẩn hóa | Khoảng % Chuẩn hóa | Khoảng Điểm Raw (đủ 60 câu) | Xử lý Điểm Biên |
| :---: | :--- | :---: | :---: | :--- |
| **Cấp 1** | **Khởi phát & Hỗn loạn** | 0.0% – 49.9% | 60 – 179 điểm | Raw = 179 điểm $\rightarrow 49.58\% \rightarrow$ Cấp 1 |
| **Cấp 2** | **Thử nghiệm & Chắp vá** | 50.0% – 69.9% | 180 – 227 điểm | Raw = 180 điểm $\rightarrow 50.0\% \rightarrow$ Cấp 2; Raw = 227 $\rightarrow 69.58\%$ |
| **Cấp 3** | **Chuẩn hóa & Đồng bộ** | 70.0% – 84.9% | 228 – 263 điểm | Raw = 228 điểm $\rightarrow 70.0\% \rightarrow$ Cấp 3; Raw = 263 $\rightarrow 84.58\%$ |
| **Cấp 4** | **Thực thi Xuất sắc** | 85.0% – 100.0% | 264 – 300 điểm | Raw = 264 điểm $\rightarrow 85.0\% \rightarrow$ Cấp 4; Raw = 300 $\rightarrow 100.0\%$ |

### 4. Thuật toán Nhận diện Điểm nghẽn (Liebig Bottleneck & Near-Tie Cluster)
* **Xác định Trụ cột thấp nhất:** $\text{Min\_Score} = \min_{k} \left(\text{Score}_{\%}(k)\right)$.
* **Quy tắc Nhóm Điểm nghẽn Đồng hạng / Suýt soát (Near-Tie Cluster Rule):**
  * Mọi trụ cột $k$ có điểm số nằm trong khoảng dung sai suýt soát:
    $$\text{Score}_{\%}(k) \le \text{Min\_Score} + 5.0\%$$
    sẽ được gom vào **Nhóm Điểm Nghẽn Ưu Tiên Đồng Thời (Bottleneck Priority Cluster)**.
  * Hệ thống cảnh báo đồng thời các trụ cột trong nhóm này vì chúng có mối tương quan chặt chẽ kìm hãm lẫn nhau.

---

## III. KUBA® CHANGE COMMITMENT OVERLAY SPECIFICATION (H-04 SPECIFICATION)

### 1. Bản chất & Định vị Phương pháp luận
* **Không phải trụ cột thứ 7 & Không cộng điểm:** KUBA® không xuất hiện trên biểu đồ Radar 6 trục và không cộng vào điểm năng lực tổng 300.
* **Lớp sẵn sàng thay đổi (Change Readiness Overlay):** Chỉ kích hoạt sau khi đã xác định được Điểm nghẽn (hoặc Nhóm điểm nghẽn) thấp nhất từ bài khảo sát LAMSEP.
* **Định vị:** Đo lường **mức độ sẵn sàng đối với một hành động chuyển đổi cụ thể** nhằm tháo gỡ điểm nghẽn đó. Đây **không phải chẩn đoán tâm lý** và **không phải thang đo năng lực đã thẩm định**.
* **Quyền sử dụng & Bản quyền:** Trích dẫn nguồn chuẩn *"KUBA® Change Commitment Model (kubachange.com)"*. Đánh dấu quyền sử dụng đồ họa thương mại là `UNVERIFIED`; chỉ sử dụng cấu trúc văn bản ánh xạ khái niệm, tuyệt đối không nhúng logo hoặc hình ảnh scan thương mại khi chưa có chứng nhận bản quyền.

### 2. Bảng Ma trận Hướng dẫn Hành động 2 Chiều (KUBA Action Matrix)

| Giai đoạn KUBA | Mô tả mức độ sẵn sàng của đội ngũ | Rủi ro nếu bị kẹt | Hành động Lãnh đạo (Leader Action) | Hành vi Nhân sự (Individual Action) | Bằng chứng nghiệm thu [PROPOSAL] |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Don't Know** | Chưa nhận thức được sự cần thiết hoặc tác động của thay đổi đối với điểm nghẽn này. | *Unawareness* (Thờ ơ, chưa nhận thức) | **Inform:** Chia sẻ minh bạch hiện trạng và lý do vì sao cần thay đổi điểm nghẽn này. | **Listen:** Chủ động lắng nghe, tìm hiểu bối cảnh và đặt câu hỏi làm rõ. | Thông điệp truyền thông nội bộ được gửi tới toàn bộ nhân sự liên quan. |
| **2. Know** | Đã biết có kế hoạch thay đổi nhưng chưa nắm rõ chi tiết cách thức thực hiện mới. | *Confusion* (Bối rối, mơ hồ) | **Educate:** Tổ chức hướng dẫn, giải thích cách làm mới qua tài liệu và ví dụ cụ thể. | **Learn:** Tìm hiểu sự thay đổi này tác động như thế nào đến công việc của mình. | Buổi hướng dẫn được tổ chức và khảo sát nhận thức đạt $\ge 80\%$ hiểu đúng. |
| **3. Understand** | Đã hiểu rõ chi tiết thay đổi nhưng còn băn khoăn về sự xáo trộn hoặc khó khăn ban đầu. | *Negative perception* (Tiêu cực, lo ngại) | **Coach:** Lắng nghe 1-1, phân tích lợi ích - đánh đổi, đồng cảm với khó khăn thực tế. | **Choose:** Cân nhắc thấu đáo, chủ động lựa chọn đồng hành và đóng góp ý kiến. | Kế hoạch hành động cá nhân (Individual Action Plan) được thống nhất. |
| **--- TRUE RESISTANCE THRESHOLD (NGƯỠNG KHÁNG CỰ THỰC SỰ TRƯỚC KHI CHUYỂN HÓA) ---** | | | | | |
| **4. Believe** | Đã tin tưởng cách làm mới sẽ mang lại hiệu quả và sẵn sàng tham gia thử nghiệm. | *Choice not to play* (Bỏ cuộc giữa chừng) | **Engage:** Tạo môi trường an toàn để đội ngũ triển khai thử nghiệm quy mô nhỏ (Pilot). | **Adapt:** Thử nghiệm cách làm mới, linh hoạt phản hồi để tinh chỉnh quy trình. | Kết quả thử nghiệm (Pilot) 30 ngày có số liệu cải thiện cụ thể. |
| **5. Act** | Vận hành thành thạo, duy trì đều đặn cách làm mới trong công việc hàng ngày. | *Dropped after attempt* (Đầu voi đuôi chuột) | **Reward:** Kịp thời ghi nhận, khen thưởng các kết quả thực tế và hành vi gương mẫu. | **Own:** Làm chủ quy trình mới với tinh thần liên tục cải tiến và hỗ trợ đồng nghiệp. | Quy trình mới được đưa vào SOP chính thức và vận hành ổn định $\ge 60$ ngày. |

---

## IV. MA TRẬN 60 CÂU HỎI KHẢO SÁT CHUẨN ĐƠN NHẤT & TRUNG TÍNH (H-03 SPECIFICATION)

### Chuyên đề 1: Chiến lược xuất sắc (Strategy)
* **Q1.1 (Khát vọng số liệu):** Công ty có mục tiêu tăng trưởng và khát vọng chiến thắng rõ ràng về doanh thu, thị phần và vị thế cạnh tranh, được đội ngũ hiểu và đồng lòng hướng tới không?
* **Q1.2 (Khách hàng mục tiêu):** Công ty có xác định rõ khách hàng mục tiêu, phân khúc ưu tiên và các kênh bán hàng cốt lõi, đồng thời chủ động từ chối những cơ hội không phù hợp với định hướng chiến lược không?
* **Q1.3 (Điểm khác biệt USP):** Sản phẩm/dịch vụ có một giá trị khác biệt rõ ràng và đủ hấp dẫn để khách hàng ưu tiên lựa chọn công ty thay vì đối thủ không?
* **Q1.4 (Lợi thế khó sao chép):** Lợi thế cạnh tranh của công ty có dựa trên những nguồn lực hoặc năng lực khó sao chép, khó thay thế và có khả năng tạo giá trị bền vững không?
* **Q1.5 (Rà soát đối thủ):** Ban lãnh đạo có thường xuyên phân tích khách hàng, đối thủ và thị trường để xác định khoảng trống cạnh tranh và tận dụng thế mạnh cốt lõi của mình để giành lợi thế không?
* **Q1.6 (Tốc độ thích ứng):** Công ty có khả năng nhanh chóng nhận diện thay đổi của thị trường và điều chỉnh sản phẩm, dịch vụ hoặc mô hình kinh doanh trước khi sự thay đổi trở thành mối đe dọa lớn không?
* **Q1.7 (Tập trung nguồn lực):** Công ty có chủ động tập trung nguồn lực vào những hoạt động tạo ra giá trị và lợi thế cạnh tranh cao nhất, đồng thời loại bỏ hoặc hạn chế những hoạt động không còn tạo giá trị chiến lược không?
* **Q1.8 (Ưu tiên trọng tâm):** Công ty có xác định rõ một số ít việc quan trọng nhất cần tập trung trong từng giai đoạn, giao người chịu trách nhiệm cụ thể và ưu tiên nguồn lực để thực hiện đến cùng không?
* **Q1.9 (Kiểm chứng dữ liệu):** Khi ra quyết định kinh doanh quan trọng, ban lãnh đạo có chủ động kiểm chứng giả định bằng dữ liệu thực tế từ khách hàng, thị trường và đối thủ thay vì chỉ dựa vào kinh nghiệm, cảm tính hoặc thông tin ban đầu không?
* **Q1.10 (Quyết đoán ra quyết định):** Ban lãnh đạo có khả năng đưa ra quyết định kịp thời dựa trên mức độ thông tin cần thiết, chấp nhận rủi ro có tính toán và tránh trì hoãn vì theo đuổi quá nhiều lựa chọn không?

### Chuyên đề 2: Lãnh đạo xuất sắc (Leadership)
* **Q2.1 (Nhất quán Nói và Làm):** Lãnh đạo có nhất quán giữa điều mình nói, cách mình hành động, những gì mình ưu tiên và những gì mình đo lường để trở thành hình mẫu cho đội ngũ không?
* **Q2.2 (Tìm kiếm phản hồi):** Lãnh đạo có chủ động tìm kiếm phản hồi từ cấp dưới, đồng nghiệp và các bên liên quan, đồng thời sẵn sàng thay đổi hành vi khi nhận thấy cần thiết không?
* **Q2.3 (Tam trị Nhân - Pháp):** Lãnh đạo có kết hợp hài hòa giữa Nhân trị (tôn trọng, thấu hiểu và phát triển con người) với Pháp trị (nguyên tắc, kỷ luật, trách nhiệm và công bằng) trong quản trị đội ngũ không?
* **Q2.4 (Ứng dụng công nghệ):** Lãnh đạo có chủ động ứng dụng công nghệ, dữ liệu và số hóa để tăng tốc độ ra quyết định, giảm công việc thủ công và nâng cao hiệu quả vận hành không?
* **Q2.5 (Mức độ tin cậy):** Lãnh đạo có xây dựng được mức độ tin cậy đủ cao giữa các cá nhân và phòng ban để giảm sự phụ thuộc vào các tầng kiểm soát, phê duyệt và giám sát không cần thiết không?
* **Q2.6 (Tiêu chuẩn đội ngũ):** Lãnh đạo có xác định rõ những phẩm chất, năng lực và hành vi cần có của đội ngũ phù hợp với chiến lược và văn hóa doanh nghiệp để làm cơ sở cho tuyển chọn và phát triển nhân sự không?
* **Q2.7 (Truyền tải sứ mệnh):** Lãnh đạo có truyền tải rõ sứ mệnh, định hướng và ý nghĩa của công việc để nhân viên hiểu mình đang tạo ra giá trị gì và vì sao công việc của họ quan trọng không?
* **Q2.8 (Dẫn dắt chuyển đổi):** Khi cần chuyển đổi về văn hóa, công nghệ hoặc mô hình kinh doanh, lãnh đạo có truyền thông rõ ràng, kiên trì dẫn dắt và xử lý các lực cản để đưa tổ chức đi đến cùng không?
* **Q2.9 (Hiểu sự khác biệt):** Lãnh đạo có hiểu sự khác biệt về năng lực, động lực, phong cách hành vi và nhu cầu phát triển của từng thành viên để giao việc, giao quyền và dẫn dắt phù hợp không?
* **Q2.10 (Dồn nguồn lực giá trị):** Lãnh đạo có chủ động phân bổ nguồn lực – con người, thời gian, vốn và sự chú ý vào những ưu tiên tạo ra giá trị và lợi nhuận cao nhất, đồng thời quyết liệt dừng hoặc điều chỉnh những hoạt động kém hiệu quả không?

### Chuyên đề 3: Văn hóa xuất sắc (Culture)
* **Q3.1 (An toàn nói sự thật):** Nhân viên có cảm thấy an toàn để nói sự thật, nêu vấn đề, thừa nhận sai sót và phản biện mang tính xây dựng mà không sợ bị quy chụp hoặc trừng phạt không?
* **Q3.2 (Báo cáo sự cố kịp thời):** Khi có sự cố hoặc thông tin bất lợi, nhân viên có chủ động báo cáo kịp thời lên cấp có thẩm quyền thay vì trì hoãn, che giấu hoặc làm nhẹ vấn đề không?
* **Q3.3 (Ý nghĩa công việc):** Nhân viên có hiểu rõ công việc hàng ngày của mình tạo ra giá trị gì cho công ty và khách hàng không?
* **Q3.4 (Ghi nhận tiến bộ nhỏ):** Công ty có cơ chế ghi nhận và khích lệ kịp thời những tiến bộ, sáng kiến và hành vi tích cực của nhân viên để duy trì động lực thực thi không?
* **Q3.5 (Nhận trách nhiệm):** Khi công việc không đạt kết quả, nhân viên có chủ động nhận trách nhiệm đối với phần việc của mình và tập trung tìm giải pháp thay vì đổ lỗi không?
* **Q3.6 (Xử lý né tránh trách nhiệm):** Tổ chức có nhận diện, phản hồi và xử lý nhất quán các hành vi đổ lỗi, né tránh trách nhiệm hoặc đẩy vấn đề sang người/phòng ban khác không?
* **Q3.7 (Xử lý hành vi tiêu cực):** Công ty có kịp thời nhận diện và xử lý những hành vi tiêu cực, thiếu hợp tác hoặc làm ảnh hưởng đến tinh thần, niềm tin và hiệu quả của đội ngũ không?
* **Q3.8 (Trao quyền tự chủ):** Nhân viên và quản lý các cấp có đủ quyền hạn và phạm vi tự chủ để chủ động ra quyết định, xử lý công việc trong phạm vi trách nhiệm mà không phải liên tục chờ CEO phê duyệt không?
* **Q3.9 (Tranh luận dựa trên dữ liệu):** Trong các cuộc họp, các ý kiến khác biệt có được lắng nghe và tranh luận dựa trên dữ liệu, vấn đề và lợi ích chung thay vì dựa trên chức vụ hoặc cảm tính không?
* **Q3.10 (Hiện thực hóa giá trị cốt lõi):** Các giá trị cốt lõi và quy tắc ứng xử có được chuyển hóa thành những hành vi cụ thể, được thể hiện nhất quán trong chính sách, quyết định và trải nghiệm hàng ngày của nhân viên không?

### Chuyên đề 4: Nhân lực xuất sắc (Human Resources)
* **Q4.1 (Chiến lược 6B):** Công ty có chiến lược rõ ràng về việc khi nào nên tuyển dụng, khi nào phát triển nội bộ, khi nào thuê ngoài hoặc sử dụng nguồn lực linh hoạt để đáp ứng nhu cầu nhân sự không?
* **Q4.2 (Quy trình đánh giá sàng lọc):** Công ty có cơ chế đánh giá và xử lý kịp thời những nhân sự không còn phù hợp về năng lực, hiệu suất hoặc giá trị/hành vi, bao gồm đào tạo, điều chuyển hoặc hỗ trợ phù hợp không?
* **Q4.3 (Thương hiệu tuyển dụng):** Công ty có xây dựng được định vị giá trị nhân viên và thương hiệu nhà tuyển dụng đủ hấp dẫn để thu hút đúng nhóm ứng viên mà doanh nghiệp cần không?
* **Q4.4 (Đào tạo thực hành OJT):** Hoạt động phát triển năng lực có ưu tiên thực hành trên công việc, kèm cặp, mentoring/coaching và phản hồi thực tế thay vì chủ yếu đào tạo lý thuyết không?
* **Q4.5 (Đo lường sau đào tạo):** Các chương trình đào tạo có được đánh giá dựa trên mức độ thay đổi năng lực, hành vi và tác động đến kết quả công việc/kinh doanh thực tế không?
* **Q4.6 (Kế hoạch kế nhiệm):** Công ty có lộ trình phát triển năng lực và kế hoạch kế nhiệm rõ ràng cho các vị trí chủ chốt và đội ngũ quản lý kế cận không?
* **Q4.7 (Lương thưởng cạnh tranh):** Chính sách lương, thưởng và đãi ngộ có đủ công bằng, hợp lý và cạnh tranh so với thị trường để thu hút, giữ chân những nhân sự quan trọng không?
* **Q4.8 (Đãi ngộ phi tài chính):** Công ty có các chính sách phúc lợi và đãi ngộ phi tài chính phù hợp với nhu cầu của các nhóm nhân sự khác nhau để tăng sự gắn kết và động lực làm việc không?
* **Q4.9 (Phù hợp giai đoạn phát triển):** Chiến lược nhân sự hiện tại có phù hợp với giai đoạn phát triển và chiến lược kinh doanh của doanh nghiệp (khởi nghiệp, tăng trưởng, trưởng thành, tái cấu trúc...) không?
* **Q4.10 (Bố trí đúng người đúng việc):** Công ty có thường xuyên đánh giá mức độ phù hợp giữa năng lực, sở trường của nhân viên với yêu cầu của vị trí để bố trí đúng người, đúng việc và khai thác tốt nhất năng lực của họ không?

### Chuyên đề 5: Vận hành xuất sắc (Operations)
* **Q5.1 (Chuẩn hóa quy trình):** Công ty có phân biệt rõ giữa kết quả đạt được nhờ nỗ lực cá nhân nhất thời và kết quả có thể lặp lại nhờ quy trình, hệ thống và tiêu chuẩn chuẩn hóa không?
* **Q5.2 (Rút kinh nghiệm AAR):** Sau mỗi chiến dịch, dự án hoặc sự kiện quan trọng, đội ngũ có đúc kết bài học và cải tiến cách làm cho lần sau không?
* **Q5.3 (Kỷ luật Horenso):** Nhân viên có thói quen Báo cáo – Liên lạc – Thảo luận (Horenso) kịp thời để các vấn đề, rủi ro và thay đổi quan trọng được nhận diện và xử lý từ sớm không?
* **Q5.4 (Kế hoạch ưu tiên):** Quản lý và nhân viên có lập kế hoạch công việc rõ ràng theo mức độ ưu tiên, thời hạn và kết quả cần đạt không?
* **Q5.5 (Kiểm soát cuộc họp):** Các cuộc họp có được tổ chức đúng mục tiêu, đúng thành phần, đúng thời lượng (dưới 50 phút) và kết thúc bằng quyết định/kế hoạch hành động rõ ràng không?
* **Q5.6 (Loại bỏ lãng phí thời gian):** Trong quá trình xử lý công việc, công ty có thường xuyên đo lường và loại bỏ các thời gian lãng phí do chờ phê duyệt, chờ bàn giao, thiếu thông tin hoặc phụ thuộc giữa các phòng ban không?
* **Q5.7 (Rõ ràng khi giao việc):** Khi giao việc, quản lý có làm rõ kết quả cần đạt, yêu cầu nhân viên xác nhận lại mức độ hiểu và thống nhất thời hạn hoàn thành cụ thể không?
* **Q5.8 (Quản trị theo tiêu chuẩn đầu ra):** Các quy trình và công việc có được quản trị dựa trên tiêu chuẩn đầu ra rõ ràng về chất lượng, thời gian và yêu cầu cần đạt không?
* **Q5.9 (Nguyên tắc bàn giao nội bộ):** Việc bàn giao giữa các phòng ban có được quản trị theo nguyên tắc “phòng nhận đầu vào là khách hàng của phòng tạo đầu ra” không?
* **Q5.10 (Trách nhiệm liên đới):** Công ty có quy định rõ trách nhiệm phối hợp và trách nhiệm liên đới giữa các cá nhân/phòng ban để đảm bảo vấn đề được xử lý đến cùng, không đùn đẩy trách nhiệm không?

### Chuyên đề 6: Hiệu suất xuất sắc (Performance — MỚI)
* **Q6.1 (Mục tiêu kinh doanh cụ thể):** Công ty có mục tiêu kinh doanh rõ ràng, cụ thể và đo lường được trong 6-12 tháng tới không?
* **Q6.2 (Cụ thể hóa thành KPI/OKR):** Mục tiêu kinh doanh có được cụ thể hoá thành các chỉ số KPI/OKR rõ ràng không?
* **Q6.3 (Phân rã mục tiêu xuống cá nhân):** Mục tiêu kinh doanh có được chuyển hóa thành mục tiêu và kết quả cần đạt của từng phòng ban, bộ phận và cá nhân không?
* **Q6.4 (Nhân viên hiểu rõ KPI):** Nhân viên có hiểu rõ mục tiêu, chỉ số KPI/OKR được giao và cách thức để đạt được kết quả đó không?
* **Q6.5 (KPI gắn với tiêu chuẩn đầu ra):** Chỉ số KPI/OKR của phòng ban và cá nhân có gắn trực tiếp với chức năng, nhiệm vụ, quyền hạn và kết quả đầu ra của từng vị trí không?
* **Q6.6 (Điều chỉnh KPI linh hoạt):** Chỉ số KPI/OKR có được rà soát, cập nhật và điều chỉnh linh hoạt khi công ty thay đổi chiến lược và mục tiêu kinh doanh không?
* **Q6.7 (Gắn hiệu suất với đãi ngộ):** Kết quả đánh giá hiệu suất có được sử dụng để làm cơ sở cho đào tạo, phát triển, ghi nhận và khen thưởng nhân viên không?
* **Q6.8 (Theo dõi và phản hồi liên tục):** Quản lý có thường xuyên theo dõi, phản hồi kịp thời và hướng dẫn nhân viên cải thiện hiệu suất trước khi kết thúc kỳ đánh giá không?
* **Q6.9 (Năng lực quản lý cấp trung):** Quản lý cấp trung có đủ năng lực để thiết lập mục tiêu và chỉ số KPI/OKR cho nhân viên của mình không?
* **Q6.10 (Đánh giá phù hợp văn hóa):** Công ty có đánh giá mức độ nhân viên thực hiện công việc phù hợp với các giá trị cốt lõi và chuẩn mực văn hóa của công ty không?

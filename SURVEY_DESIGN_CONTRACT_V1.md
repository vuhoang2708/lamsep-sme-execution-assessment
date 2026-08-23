# SURVEY DESIGN CONTRACT V1.3 — LAMSEP SME EXECUTION ASSESSMENT & KUBA® OVERLAY

**Phiên bản:** v1.3 (Round 3 Closure Patch — Static Contract)  
**Ngày cập nhật:** 2026-08-14  
**Tác giả & Đối tác:** Vũ Hoàng & Thanh Duy (DHM8) / Chuyên gia Huỳnh Trọng Nghĩa (Kenmei)  
**Khung phương pháp luận:** PSO Framework (Larry Bossidy) + KUBA® Change Commitment Model  

**Change note:** Đã sửa ánh xạ điểm Raw theo đúng công thức chuẩn hóa nền Likert 1 điểm; hoàn tất audit 50 câu theo một construct quan sát được; các kiểm thử zero-egress, lưu cục bộ và rollback được quy định ở Master Plan v1.2.

---

## I. RANH GIỚI DỮ LIỆU & QUYỀN RIÊNG TƯ (H-01 SPECIFICATION)

### 1. Phân định Rạch ròi 2 Pha (Phase Isolation)
* **Pha 1 — MVP Client-Only (Option 1):**
  * **Zero External Data Egress:** Ứng dụng chạy 100% trên trình duyệt người dùng (Client-side Single Page Application). Sau khi tải gói tài nguyên tĩnh ban đầu cùng nguồn gốc (*same-origin initial bundle*), ứng dụng **tuyệt đối không gửi bất kỳ HTTP request, câu trả lời, kết quả hay PII nào ra máy chủ ngoại vi**.
  * **Chính sách lưu trữ cục bộ (Local Storage Policy):** Mặc định chạy hoàn toàn trong bộ nhớ tạm (*in-memory*). Tính năng lưu bản nháp vào `localStorage` là **Opt-in tường minh** (người dùng phải chủ động tích chọn *"Lưu bản nháp trên trình duyệt này"*).
  * **Quyền Dữ liệu (Data Rights):** Cung cấp nút bấm *"Xóa sạch dữ liệu bài làm"* (Clear Data) để xóa ngay lập tức toàn bộ trạng thái trong bộ nhớ và `localStorage`.
  * **Định vị kết quả:** Định vị là **Exploratory Self-Assessment** (Công cụ tự đánh giá khám phá hiện trạng). Tuyệt đối không đưa ra các tuyên bố nhân quả tuyệt đối (như *"nguyên nhân làm rò rỉ 30% doanh thu"*); chỉ gọi là *"Điểm ưu tiên cần xác minh / Điểm nghẽn tiềm ẩn"*.
* **Pha 2 — Enterprise & Lead Engine (Option 2):**
  * Tách biệt hoàn toàn khỏi Pha 1. Chỉ triển khai khi có bản Cam kết Bảo mật Dữ liệu (Data Privacy Policy), cơ chế đồng ý lưu trữ (Explicit Consent), mã hóa truyền tải và máy chủ backend bảo mật.
  * **Chuẩn đối sánh Benchmark ($N \ge 300$):** Được đánh nhãn là `[PROPOSAL / UNVERIFIED]` cho đến khi thu thập đủ tập dữ liệu kiểm chứng tối thiểu 300 doanh nghiệp SME thực tế.

---

## II. SCORE CONTRACT & THUẬT TOÁN ĐIỂM SỐ (H-02 SPECIFICATION)

### 1. Quy cách Điểm số Chuẩn (Single Source of Truth)
* **Số lượng câu hỏi:** 50 câu chuẩn canonical (10 câu / chuyên đề x 5 chuyên đề).
* **Thang đo từng câu:** Likert 1 – 5 điểm (1: Chưa có/Tự phát $\rightarrow$ 5: Chuẩn hóa xuất sắc) + Lựa chọn **N/A** (Không áp dụng / Chưa đủ thông tin quan sát).
* **Phương pháp tính điểm:** **Equal-Pillar Scoring** (Mỗi trụ cột chiếm đúng 20% trọng số của tổng điểm toàn diện, phản ánh đúng hình học của biểu đồ Radar 5 trục).
* **Thang điểm Raw:** 50 – 250 điểm (khi không có N/A).

### 2. Công thức Chuẩn hóa Trụ cột & Quy tắc Dữ liệu Thiếu (Missing Data Rule)
Với mỗi chuyên đề $k \in \{1..5\}$, gọi $\text{Valid}(k)$ là tập các câu trả lời hợp lệ (từ 1 đến 5 điểm, loại bỏ N/A):
$$\text{Score}_{\%}(k) = \frac{\sum_{i \in \text{Valid}(k)} (\text{Score}_i - 1)}{4 \times N_{\text{Valid}}(k)} \times 100\%$$

* **Quy tắc Dữ liệu không đủ (Insufficient Data Rule):** Nếu một trụ cột có số câu hợp lệ $N_{\text{Valid}}(k) < 5$ (tức $>50\%$ câu trả lời là N/A hoặc bỏ trống), trụ cột đó bị gắn nhãn `[INSUFFICIENT DATA / UNVERIFIED]` và hệ thống **chặn xuất Cấp độ trưởng thành tổng thể** để tránh kết luận sai lệch.
  * Trên Radar, trụ cột này hiển thị trạng thái `INSUFFICIENT DATA`, không hiển thị 0%; không đưa trụ cột thiếu dữ liệu vào Min-Score/near-tie; KUBA action và PDF tổng thể chỉ kích hoạt khi cả 5 trụ cột đủ dữ liệu.
* **Điểm Tổng thể Toàn diện (khi cả 5 trụ cột đều hợp lệ):**
$$\text{Total Score}_{\%} = \frac{\sum_{k=1}^5 \text{Score}_{\%}(k)}{5}$$

### 3. Bảng Phân hạng Mức độ Trưởng thành (Maturity Levels)
| Cấp độ | Tên gọi chuẩn hóa | Khoảng % Chuẩn hóa | Khoảng Điểm Raw (đủ 50 câu) | Xử lý Điểm Biên |
| :---: | :--- | :---: | :---: | :--- |
| **Cấp 1** | **Khởi phát & Hỗn loạn** | 0.0% – 49.9% | 50 – 149 điểm | Raw = 149 điểm $\rightarrow$ 49.5% $\rightarrow$ Cấp 1 |
| **Cấp 2** | **Thử nghiệm & Chắp vá** | 50.0% – 69.9% | 150 – 189 điểm | Raw = 150 điểm $\rightarrow$ 50.0% $\rightarrow$ Cấp 2; Raw = 189 điểm $\rightarrow$ 69.5% $\rightarrow$ Cấp 2 |
| **Cấp 3** | **Chuẩn hóa & Đồng bộ** | 70.0% – 84.9% | 190 – 219 điểm | Raw = 190 điểm $\rightarrow$ 70.0% $\rightarrow$ Cấp 3; Raw = 219 điểm $\rightarrow$ 84.5% $\rightarrow$ Cấp 3 |
| **Cấp 4** | **Thực thi Xuất sắc** | 85.0% – 100.0% | 220 – 250 điểm | Raw = 220 điểm $\rightarrow$ 85.0% $\rightarrow$ Cấp 4; Raw = 250 điểm $\rightarrow$ 100% $\rightarrow$ Cấp 4 |

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
* **Không phải trụ cột thứ 6 & Không cộng điểm:** KUBA® không xuất hiện trên biểu đồ Radar 5 trục và không cộng vào điểm năng lực tổng 250.
* **Lớp sẵn sàng thay đổi (Change Readiness Overlay):** Chỉ kích hoạt sau khi đã xác định được Điểm nghẽn (hoặc Nhóm điểm nghẽn) thấp nhất từ bài khảo sát LAMSEP.
* **Định vị:** Đo lường **mức độ sẵn sàng đối với một hành động chuyển đổi cụ thể** nhằm tháo gỡ điểm nghẽn đó. Đây **không phải chẩn đoán tâm lý** và **không phải thang đo năng lực đã thẩm định**.
* **Quyền sử dụng & Bản quyền:** Trích dẫn nguồn chuẩn *"KUBA® Change Commitment Model (kubachange.com)"*. Đánh dấu quyền sử dụng đồ họa thương mại là `UNVERIFIED`; chỉ sử dụng cấu trúc văn bản ánh xạ khái niệm, tuyệt đối không nhúng logo hoặc hình ảnh scan thương mại khi chưa có chứng nhận bản quyền.

### 2. Data Contract Xác định Giai đoạn KUBA (Interactive Selector)
```typescript
export type KUBAReadinessStage = 'DONT_KNOW' | 'KNOW' | 'UNDERSTAND' | 'BELIEVE' | 'ACT';

export interface KUBAReadinessChoice {
  stage: KUBAReadinessStage;
  label: string;
  description: string;
  riskIfStalled: string;
  leaderAction: { verb: string; title: string; detail: string; };
  individualAction: { verb: string; title: string; detail: string; };
  acceptanceEvidence: string; // [PROPOSAL]
}
```

### 3. Bảng Ma trận Hướng dẫn Hành động 2 Chiều (KUBA Action Matrix)

| Giai đoạn KUBA | Mô tả mức độ sẵn sàng của đội ngũ | Rủi ro nếu bị kẹt | Hành động Lãnh đạo (Leader Action) | Hành vi Nhân sự (Individual Action) | Bằng chứng nghiệm thu [PROPOSAL] |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Don't Know** | Chưa nhận thức được sự cần thiết hoặc tác động của thay đổi đối với điểm nghẽn này. | *Unawareness* (Thờ ơ, chưa nhận thức) | **Inform:** Chia sẻ minh bạch hiện trạng và lý do vì sao cần thay đổi điểm nghẽn này. | **Listen:** Chủ động lắng nghe, tìm hiểu bối cảnh và đặt câu hỏi làm rõ. | Thông điệp truyền thông nội bộ được gửi tới toàn bộ nhân sự liên quan [PROPOSAL]. |
| **2. Know** | Đã biết có kế hoạch thay đổi nhưng chưa nắm rõ chi tiết cách thức thực hiện mới. | *Confusion* (Bối rối, mơ hồ) | **Educate:** Tổ chức hướng dẫn, giải thích cách làm mới qua tài liệu và ví dụ cụ thể. | **Learn:** Tìm hiểu sự thay đổi này tác động như thế nào đến công việc của mình. | Buổi hướng dẫn được tổ chức và khảo sát nhận thức đạt $\ge 80\%$ hiểu đúng [PROPOSAL]. |
| **3. Understand** | Đã hiểu rõ chi tiết thay đổi nhưng còn băn khoăn về sự xáo trộn hoặc khó khăn ban đầu. | *Negative perception* (Tiêu cực, lo ngại) | **Coach:** Lắng nghe 1-1, phân tích lợi ích - đánh đổi, đồng cảm với khó khăn thực tế. | **Choose:** Cân nhắc thấu đáo, chủ động lựa chọn đồng hành và đóng góp ý kiến. | Kế hoạch hành động cá nhân (Individual Action Plan) được thống nhất [PROPOSAL]. |
| **--- TRUE RESISTANCE THRESHOLD (NGƯỠNG KHÁNG CỰ THỰC SỰ TRƯỚC KHI CHUYỂN HÓA) ---** | | | | | |
| **4. Believe** | Đã tin tưởng cách làm mới sẽ mang lại hiệu quả và sẵn sàng tham gia thử nghiệm. | *Choice not to play* (Bỏ cuộc giữa chừng) | **Engage:** Tạo môi trường an toàn để đội ngũ triển khai thử nghiệm quy mô nhỏ (Pilot). | **Adapt:** Thử nghiệm cách làm mới, linh hoạt phản hồi để tinh chỉnh quy trình. | Kết quả thử nghiệm (Pilot) 30 ngày có số liệu cải thiện cụ thể [PROPOSAL]. |
| **5. Act** | Vận hành thành thạo, duy trì đều đặn cách làm mới trong công việc hàng ngày. | *Dropped after attempt* (Đầu voi đuôi chuột) | **Reward:** Kịp thời ghi nhận, khen thưởng các kết quả thực tế và hành vi gương mẫu. | **Own:** Làm chủ quy trình mới với tinh thần liên tục cải tiến và hỗ trợ đồng nghiệp. | Quy trình mới được đưa vào SOP chính thức và vận hành ổn định $\ge 60$ ngày [PROPOSAL]. |

---

## IV. MA TRẬN 50 CÂU HỎI KHẢO SÁT CHUẨN ĐƠN NHẤT & TRUNG TÍNH (H-03 SPECIFICATION)
*(Đủ 50 câu canonical; phiên bản v1.3 đã audit từng câu theo một construct quan sát được, một khung thời gian và một hành vi chính. Các câu có nhiều điều kiện, so sánh dẫn dắt hoặc phán xét đạo đức đã được gọt về một quan sát vận hành.)*

### Chuyên đề 1: Chiến lược (Strategy) — [Đối tượng: CEO & Quản lý | Khung thời gian: 6–12 tháng]
* **Q1.1 (Khát vọng số liệu):** Công ty có mục tiêu cụ thể bằng số liệu (doanh thu, lợi nhuận hoặc thị phần) cho giai đoạn 1–3 năm tới không?
* **Q1.2 (Sự thấu hiểu mục tiêu):** Đội ngũ nhân sự có thể phát biểu chính xác mục tiêu trọng tâm trong năm của công ty khi được hỏi không?
* **Q1.3 (Phân khúc khách hàng mục tiêu):** Công ty có tài liệu hướng dẫn xác định rõ chân dung phân khúc khách hàng trọng tâm cần phục vụ không?
* **Q1.4 (Tiêu chí từ chối khách hàng):** Công ty có tiêu chí rõ ràng để từ chối các khách hàng hoặc đơn hàng không phù hợp với năng lực cốt lõi không?
* **Q1.5 (Điểm bán hàng khác biệt - USP):** Sản phẩm/dịch vụ của công ty có điểm khác biệt rõ ràng so với đối thủ cạnh tranh trực tiếp không?
* **Q1.6 (Lợi thế cạnh tranh khó sao chép):** Lợi thế cạnh tranh chính của công ty có dựa trên nguồn lực khó sao chép (bí quyết, công nghệ, quan hệ) không?
* **Q1.7 (Rà soát đối thủ cạnh tranh):** Công ty có tài liệu cập nhật về các đối thủ cạnh tranh chính ít nhất mỗi năm một lần không?
* **Q1.8 (Tốc độ điều chỉnh chiến lược):** Khi thị trường có biến động lớn, công ty có đưa ra quyết định điều chỉnh kế hoạch kinh doanh trong vòng 30 ngày không?
* **Q1.9 (Chỉ số đo lường chiến lược):** Công ty có bảng theo dõi các chỉ số KPI/OKR định kỳ hàng tháng để kiểm soát tiến độ thực hiện chiến lược không?
* **Q1.10 (Thời gian ra quyết định cơ hội):** Ban lãnh đạo có chốt quyết định về các cơ hội kinh doanh mới trong vòng 2 tuần không?

### Chuyên đề 2: Lãnh đạo (Leadership) — [Đối tượng: CEO & Quản lý | Khung thời gian: 3–6 tháng]
* **Q2.1 (Nhất quán Nói và Làm):** Ban lãnh đạo có thực hiện đúng các cam kết đã công bố với nhân viên trong vòng 6 tháng qua không?
* **Q2.2 (Ưu tiên gắn liền đo lường):** Các chỉ số công việc được lãnh đạo theo dõi hàng tuần có phản ánh đúng các ưu tiên cốt lõi của công ty không?
* **Q2.3 (Kênh thu nhận phản hồi):** Ban lãnh đạo có duy trì kênh thu nhận ý kiến đóng góp từ nhân viên ít nhất 1 lần mỗi quý không?
* **Q2.4 (Chính sách phát triển nhân viên):** Công ty có phân bổ nguồn lực đào tạo nhân viên hằng năm không?
* **Q2.5 (Áp dụng quy trình xử lý):** Khi có vi phạm nội quy, công ty có áp dụng quy trình xử lý đã ban hành không?
* **Q2.6 (Theo dõi công việc):** Cấp quản lý có ghi nhận và theo dõi công việc trên một công cụ quản lý thống nhất không?
* **Q2.7 (Quy trình xét duyệt tinh gọn):** Các đề xuất công việc định kỳ có quy trình xét duyệt tinh gọn (tối đa qua 2 cấp quản lý) không?
* **Q2.8 (Tiêu chuẩn tuyển chọn văn hóa):** Quy trình tuyển dụng có bước đánh giá mức độ phù hợp với giá trị văn hóa của công ty không?
* **Q2.9 (Truyền thông khi có thay đổi):** Khi triển khai quy trình mới, ban lãnh đạo có công bố lộ trình thực hiện cho nhân sự liên quan không?
* **Q2.10 (Tiêu chí dừng dự án):** Ban lãnh đạo có tiêu chí chính thức để quyết định dừng dự án không đạt chỉ tiêu không?

### Chuyên đề 3: Văn hóa thực thi (Culture) — [Đối tượng: Toàn thể nhân sự | Khung thời gian: Hàng ngày/Hàng tuần]
* **Q3.1 (An toàn nêu khó khăn):** Nhân viên có thể nêu khó khăn thực tế trong cuộc họp không?
* **Q3.2 (Đóng góp ý kiến phản biện):** Nhân viên có chủ động đưa ra ý kiến phản biện mang tính xây dựng đối với các đề xuất của cấp trên không?
* **Q3.3 (Tốc độ báo cáo sự cố):** Khi phát sinh sai sót hoặc sự cố, thông tin có được báo cáo lên cấp trên trong vòng 4 giờ làm việc không?
* **Q3.4 (Ý nghĩa công việc hàng ngày):** Nhân viên có hiểu rõ kết quả công việc hàng ngày của mình đóng góp gì cho khách hàng và tổ chức không?
* **Q3.5 (Ghi nhận tiến bộ nhỏ):** Quản lý trực tiếp có thói quen ghi nhận các tiến bộ cụ thể của nhân viên trong tuần không?
* **Q3.6 (Tìm nguyên nhân quy trình):** Khi công việc bị trễ hạn, đội ngũ có phân tích nguyên nhân của quy trình không?
* **Q3.7 (Báo cáo phần việc phụ trách):** Khi xảy ra sai sót, nhân sự phụ trách có chủ động báo cáo phần việc mình phụ trách không?
* **Q3.8 (Chủ động đề xuất giải pháp):** Khi báo cáo vấn đề khó khăn, nhân viên có chuẩn bị sẵn ít nhất một phương án giải quyết không?
* **Q3.9 (Quy trình xử lý xung đột):** Công ty có quy trình xử lý xung đột nội bộ không?
* **Q3.10 (Tranh luận thẳng thắn trong họp):** Các cuộc họp có diễn ra thảo luận cởi mở đa chiều trước khi đi đến quyết định cuối cùng không?

### Chuyên đề 4: Nhân sự HR (Human Resources) — [Đối tượng: Quản lý & HR | Khung thời gian: 3–12 tháng]
* **Q4.1 (Khung đãi ngộ chuyên gia then chốt):** Công ty có khung đãi ngộ cho các vị trí chuyên môn then chốt không?
* **Q4.2 (Đào tạo hội nhập nhân viên mới):** Nhân viên mới có hoàn thành chương trình đào tạo hội nhập trong tháng đầu không?
* **Q4.3 (Đánh giá hiệu suất định kỳ):** Công ty có đánh giá định kỳ mức độ hoàn thành công việc của nhân sự không?
* **Q4.4 (Kênh tiếp nhận hồ sơ):** Công ty có kênh tiếp nhận hồ sơ ứng tuyển trực tiếp không?
* **Q4.5 (Kèm cặp thực tế tại nơi làm việc):** Hoạt động phát triển kỹ năng có được thực hiện thông qua hình thức kèm cặp trực tiếp trên công việc (On-the-job training) không?
* **Q4.6 (Đánh giá hiệu quả sau đào tạo):** Sau các khóa đào tạo, công ty có đánh giá sự thay đổi về chất lượng công việc của học viên sau 3 tháng không?
* **Q4.7 (Quy hoạch nhân sự kế thừa):** Công ty có danh sách nhân sự tiềm năng sẵn sàng thay thế cho các vị trí quản lý trọng yếu khi có biến động không?
* **Q4.8 (Minh bạch cơ chế thưởng hiệu suất):** Công ty có công bố tiêu chí tính thưởng hiệu suất từ đầu kỳ không?
* **Q4.9 (Chính sách đãi ngộ phi tài chính):** Công ty có chính sách đãi ngộ phi tài chính được ban hành không?
* **Q4.10 (Rà soát nhu cầu nhân lực):** Bộ phận nhân sự có rà soát định kỳ nhu cầu nhân lực với các trưởng bộ phận không?

### Chuyên đề 5: Vận hành (Operations) — [Đối tượng: Quản lý & Vận hành | Khung thời gian: Hàng ngày/Hàng tuần]
* **Q5.1 (Chuẩn hóa quy trình thành công):** Khi một dự án thành công, công ty có tài liệu hóa cách làm thành quy trình chuẩn (SOP) cho lần sau không?
* **Q5.2 (Rút kinh nghiệm sau dự án - AAR):** Công ty có tổ chức buổi họp rút kinh nghiệm trong vòng 7 ngày sau khi kết thúc một sự kiện/chiến dịch lớn không?
* **Q5.3 (Cập nhật tiến độ hàng ngày):** Các bộ phận có cập nhật tiến độ công việc hằng ngày không?
* **Q5.4 (Kế hoạch công việc ưu tiên tuần):** Đầu mỗi tuần, các phòng ban có văn bản chốt danh sách các đầu việc ưu tiên cần hoàn thành trong tuần không?
* **Q5.5 (Kiểm soát thời lượng cuộc họp):** Các cuộc họp định kỳ trong công ty có kết thúc đúng giờ quy định (dưới 50 phút) không?
* **Q5.6 (Người chịu trách nhiệm sau cuộc họp):** Biên bản họp có ghi rõ người chịu trách nhiệm chính cho từng đầu việc không?
* **Q5.7 (Xác nhận tiêu chuẩn khi giao việc):** Khi nhận việc, nhân viên có xác nhận lại cách hiểu về tiêu chuẩn kết quả mong muốn với người giao việc không?
* **Q5.8 (Tiêu chuẩn chất lượng đầu ra):** Mỗi bộ phận có bảng mô tả tiêu chuẩn chất lượng sản phẩm đầu ra (Output) cụ thể để bàn giao cho khâu tiếp theo không?
* **Q5.9 (Đánh giá phối hợp nội bộ):** Công ty có cơ chế đánh giá định kỳ mức độ phối hợp giữa các phòng ban không?
* **Q5.10 (Chỉ số phối hợp liên bộ phận):** Đánh giá hiệu suất của bộ phận có bao gồm chỉ số phối hợp liên bộ phận không?

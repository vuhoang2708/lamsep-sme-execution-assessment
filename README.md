# LAMSEP — Khảo sát & Chẩn đoán Thực trạng Thực thi Doanh nghiệp SME

> **Triết lý Quản trị:** PSO Framework (People - Strategy - Operations — Larry Bossidy)  
> **Lớp Định hướng Chuyển đổi:** KUBA® Change Commitment Model (kubachange.com)  
> **Đơn vị phối hợp:** Vũ Hoàng (Culture Code) & Thanh Duy (DHM8) / Chuyên gia Huỳnh Trọng Nghĩa (Kenmei)

---

## 📖 1. Giới thiệu Dự án

Dự án **LAMSEP — SME Execution Assessment & KUBA® Overlay** được xây dựng nhằm cung cấp một công cụ tự đánh giá, chẩn đoán toàn diện và khám phá các điểm nghẽn thực thi trong doanh nghiệp vừa và nhỏ (SME) tại Việt Nam.

Hệ thống hoạt động theo mô hình ứng dụng web đơn trang **Client-Only Single Page Application (SPA)**, không phụ thuộc backend, bảo mật quyền riêng tư tuyệt đối (Zero External Data Egress), tự động tính điểm theo 5 trụ cột, hiển thị biểu đồ Radar 5 trục, phát hiện "Thanh gỗ ngắn nhất" theo nguyên lý Liebig và đưa ra lộ trình hành động 2 chiều (Lãnh đạo vs Nhân sự) theo mô hình KUBA®.

---

## 🏛️ 2. Cấu trúc 5 Trụ cột Thực thi (PSO Framework)

1. **Chiến lược (Strategy — 10 câu):** Khát vọng số liệu, Sự thấu hiểu mục tiêu, Phân khúc trọng tâm, Tiêu chí từ chối, USP độc nhất, Lợi thế khó sao chép (VRIN), Rà soát đối thủ, Tốc độ thích ứng, Chỉ số đo lường KPI/OKR, Tính quyết đoán ra quyết định.
2. **Lãnh đạo (Leadership — 10 câu):** Nhất quán Nói và Làm (Leadership Shadow), Ưu tiên gắn liền đo lường, Kênh nhận phản hồi, Đãi ngộ nhân văn, Thượng tôn kỷ luật (Tam trị), Ứng dụng công nghệ, Tối giản tầng nấc phê duyệt, Tuyển chọn văn hóa, Truyền thông dẫn dắt, Quyết liệt dừng dự án kém hiệu quả.
3. **Văn hóa Thực thi (Culture — 10 câu):** An toàn tâm lý (Psychological Safety), Dũng khí phản biện, Văn hóa báo sự cố kịp thời, Ý nghĩa công việc, Ghi nhận tiến bộ nhỏ (Small Wins), Nhìn nhận vấn đề (See It), Tự nhận trách nhiệm (Own It), Chủ động giải pháp (Solve It), Xử lý xung đột minh bạch, Tranh luận cởi mở.
4. **Nhân sự (Human Resources — 10 câu):** Chiến lược 6B (Buy/Build/Bounce), Đào tạo hội nhập, Kế hoạch cải thiện hiệu suất (PIP), Thương hiệu tuyển dụng, Kèm cặp thực chiến (70/20/10 OJT), Đánh giá chuyển đổi (Kirkpatrick Level 3), Quy hoạch kế thừa, Minh bạch Total Rewards, Đãi ngộ phi tài chính, Nhân sự đồng hành kinh doanh (HRBP).
5. **Vận hành (Operations — 10 câu):** Chuẩn hóa quy trình thành công (SOP), Rút kinh nghiệm sau hành động (AAR), Kỷ luật Horenso 5 phút, Kế hoạch ưu tiên tuần/ngày (Eisenhower), Kiểm soát thời lượng họp (<50 phút), Biên bản phân công sau họp, Giao việc rõ tiêu chuẩn đầu ra (Output Management), Bàn giao liên phòng ban, Đánh giá phối hợp nội bộ, SLA liên bộ phận (Phá vỡ Silo).

---

## 📑 3. Danh mục Tài liệu Nguồn chuẩn (Source of Truth)

| Tên tài liệu | Định dạng | Mô tả nội dung |
| :--- | :---: | :--- |
| **`SURVEY_DESIGN_CONTRACT_V1.md`** | Markdown / DOCX / PDF | Hợp đồng Thiết kế Khảo sát v1.3: 50 câu đơn nhất, công thức Equal-Pillar, ngưỡng trưởng thành 4 cấp, KUBA Action Matrix. |
| **`MASTER_PLAN_LAMSEP_SME_SURVEY_SPA.md`** | Markdown / DOCX / PDF | Kế hoạch Triển khai Master Plan v1.2: Kiến trúc React+TS+Vite, File Allowlist, 4 Phases, 14 Acceptance Tests (TC-01 -> TC-14), Rollback. |
| **`BAO_CAO_RA_SOAT_VA_BO_KHAO_SAT_THUC_THI_SME_LAMSEP.docx`** | DOCX / PDF | Báo cáo Đối chiếu Ghi âm trao đổi thực tế & Khung 50 câu hỏi khảo sát thực trạng. |
| **`TOM_TAT_BO_TAI_LIEU_LAMSEP_THUC_THI_XUAT_SAC.md`** | Markdown | Bản tóm tắt chuyên sâu 5 chuyên đề gốc của LAMSEP. |
| **`GEMINI_ROUND3_LESSONS_LEARNED.md`** | Markdown | 8 bài học kinh nghiệm quản trị và kiểm soát chất lượng từ Round 3. |

---

## 🚀 4. Lộ trình Triển khai Kỹ thuật

* **Pha 1 — MVP Client-Only (Đang thực hiện):**
  * Frontend: React 18 + TypeScript + Vite.
  * Thuật toán: Scoring Engine dạng hàm thuần (Pure functions), Chart.js / HTML5 Canvas Radar.
  * PDF Engine: `html2canvas` + `jspdf` nhúng font `Roboto-Regular.ttf` & `Roboto-Bold.ttf` (Apache License 2.0).
  * Kiểm thử: 100% Unit tests bao phủ các ca biên (Boundary conditions) và kiểm tra Zero External Network Egress.
* **Pha 2 — Lead Generation & Multi-Tenant Platform:**
  * Tích hợp Cloud Storage, Sync Google Sheets / CRM, Đối sánh Benchmark ngành ($N \ge 300$), Phân tích khoảng cách nhận thức 360 độ (CEO vs Quản lý).

---

## 📄 Bản quyền & Trích dẫn
* Khung khảo sát & Triết lý thực thi: **LAMSEP / Culture Code / DHM8 / Kenmei**.
* Mô hình Chuyển đổi: **KUBA® Change Commitment Model** (`kubachange.com`).

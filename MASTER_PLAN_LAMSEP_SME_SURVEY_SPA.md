# MASTER IMPLEMENTATION PLAN V1.2 — LAMSEP SME EXECUTION ASSESSMENT SPA (PHASE 1 MVP)

**Tài liệu:** Kế hoạch Triển khai Tổng thể (Master Implementation Plan)  
**Phiên bản:** v1.2 (Round 3 Closure Patch — Implementation Plan)  
**Ngày lập:** 2026-08-14  
**Workspace:** `c:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep`  
**Trạng thái Codebase hiện tại:** **Chưa phát hiện codebase SPA** (*Zero source code / Pre-initialization*). Bản plan này là căn cứ kỹ thuật chuẩn bị xin phê duyệt Cấp độ 2 từ User.

**Change note:** Đồng bộ Contract v1.3; sửa các ca biên Raw; làm rõ zero-egress, localStorage, UAT trình duyệt, provenance font và rollback theo manifest. Chưa có thao tác khởi tạo code trong bản kế hoạch này.

---

## 1. MỤC TIÊU & PHẠM VI (SCOPE & GOALS)

### 1.1. Mục tiêu
Xây dựng ứng dụng web đơn trang **Client-Only Single Page Application (SPA)** cho phép Doanh chủ và Quản lý khối SME thực hiện khảo sát 50 câu hỏi thực thi, tự động tính điểm chuẩn hóa theo 5 trụ cột PSO (Equal-Pillar Scoring), hiển thị biểu đồ Radar 5 trục, nhận diện Nhóm Điểm Nghẽn Ưu Tiên (Bottleneck Near-Tie Cluster), chọn lớp sẵn sàng thay đổi KUBA® Change Commitment Overlay và xuất báo cáo kết quả PDF A4 tiếng Việt tại chỗ không phụ thuộc backend.

### 1.2. Phân định Ranh giới 2 Pha (Phase Boundaries)
* **Pha 1 — MVP Client-Only (Trong phạm vi Plan này):**
  * Chạy 100% trong trình duyệt (React 18 + TypeScript + Vite).
  * Không backend, không cơ sở dữ liệu. Sau khi tải gói tĩnh cùng origin ban đầu, không có HTTP request, WebSocket, beacon hoặc CDN request ra external origin; câu trả lời và PII không rời trình duyệt.
  * Bộ câu hỏi 50 item và ma trận KUBA là static schema có versioning (`SURVEY_DESIGN_CONTRACT_V1.md` v1.3).
  * Xuất PDF trực tiếp bằng thư viện client (`html2canvas` + `jspdf`) nhúng sẵn font tiếng Việt Unicode chuẩn (Roboto TTF - Apache License 2.0), không tải font lúc runtime.
* **Pha 2 — Lead Generation & Multi-Tenant Platform (Ngoài phạm vi Plan này):**
  * Tích hợp lưu trữ Cloud, Google Sheets sync, Email report tự động, phân tích đối sánh Benchmark $N \ge 300$, và so sánh 360 độ CEO vs Quản lý.
  * Chỉ khởi động sau khi hoàn thành Phase 1 UAT và có văn bản phê duyệt riêng.

---

## 2. NGUỒN CHUẨN THAM CHIẾU (SOURCE OF TRUTH)

* **Design & Survey Contract:** `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\SURVEY_DESIGN_CONTRACT_V1.md` (v1.3)
* **Triết lý gốc PSO:** `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\TOM_TAT_BO_TAI_LIEU_LAMSEP_THUC_THI_XUAT_SAC.md`
* **Mô hình KUBA®:** `G:\My Drive\download\KUBA_Change_Commitment_Model.pdf` & `1786445112496_2776321716376237038_2776321716376237038_871390cbc567d83316239a075d8cc4c7.jpg`

---

## 3. DANH SÁCH FILE ĐƯỢC PHÉP TÁC ĐỘNG (FILE ALLOWLIST)

Khi được User phê duyệt triển khai (Cấp độ 2), toàn bộ mã nguồn sẽ nằm giới hạn trong thư mục dự án:
```text
C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── index.html
├── public/
│   └── fonts/
│       ├── Roboto-Regular.ttf   # Font Unicode tiếng Việt (Apache License 2.0 - Google Fonts)
│       └── Roboto-Bold.ttf      # Font Unicode tiếng Việt in đậm (Apache License 2.0 - Google Fonts)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   ├── survey.ts          # Schema 50 câu hỏi, Pillar, Score types
│   │   └── kuba.ts            # Schema KUBA Readiness, Leader/Individual Actions
│   ├── data/
│   │   ├── surveyQuestions.ts # 50 canonical questions theo Contract v1.3
│   │   └── kubaMatrix.ts      # 5 stages action matrix
│   ├── engine/
│   │   ├── scoringEngine.ts   # Pure functions: Equal-pillar score, % normalize, edge cases
│   │   └── bottleneck.ts      # Liebig Min-Score & 5% Near-tie cluster detector
│   ├── components/
│   │   ├── Header.tsx         # Tiêu đề, hướng dẫn, tiến trình
│   │   ├── SurveySection.tsx  # Giao diện câu hỏi trượt mượt mà (Mobile-friendly)
│   │   ├── LikertOption.tsx   # Nút chọn 1-5 sao + N/A
│   │   ├── RadarChart.tsx     # Biểu đồ 5 trục HTML5 Canvas
│   │   ├── MaturityBadge.tsx  # Thẻ phân hạng Cấp 1 -> Cấp 4
│   │   ├── BottleneckCard.tsx # Cảnh báo điểm nghẽn & Nhóm ưu tiên
│   │   ├── KUBAOverlay.tsx    # Bộ chọn 5 nấc KUBA & Action guide 2 chiều
│   │   └── PDFExportModal.tsx # Xem trước và xuất PDF A4 tiếng Việt
│   └── utils/
│       ├── pdfGenerator.ts    # Logic sinh PDF client-side với font Roboto base64
│       └── storage.ts         # In-memory & Opt-in localStorage helper
├── tests/
│   ├── scoring.test.ts        # Unit tests kiểm tra 100% logic điểm & biên
│   └── bottleneck.test.ts     # Unit tests kiểm tra cluster & tie-break
└── UAT/
    ├── uat_report_phase1_mvp.md        # Báo cáo kết quả kiểm thử UAT có timestamp & log
    ├── screenshots/                    # Ảnh chụp màn hình Desktop & Mobile viewport
    └── artifacts/
        ├── sample_exported_report.pdf  # File PDF nghiệm thu thực tế từ trình duyệt
        ├── network_evidence.har        # Network evidence (bằng chứng request) từ browser UAT
        └── font_provenance.md           # Nguồn, hash và license font đã nhúng
```

**Setup safety artifact (tạm thời, không ship runtime):** trước khi khởi tạo, tạo `.lamsep_setup_manifest.json` chứa path và hash của mọi file đã tồn tại; chỉ dùng manifest này cho rollback theo đúng phạm vi.

---

## 4. CÁC GIAI ĐOẠN TRIỂN KHAI (IMPLEMENTATION PHASES)

### Phase A: Setup & Core Engine Architecture (Foundation)
1. Khởi tạo dự án React + TypeScript + Vite trong thư mục hiện hành (`npm create vite@latest . -- --template react-ts`).
2. Định nghĩa toàn bộ TypeScript Interfaces (`survey.ts`, `kuba.ts`).
3. Đóng gói dữ liệu chuẩn tĩnh `surveyQuestions.ts` (50 câu) và `kubaMatrix.ts` bám sát `SURVEY_DESIGN_CONTRACT_V1.md` v1.3.
4. Viết `scoringEngine.ts` và `bottleneck.ts` dạng hàm thuần (pure functions, zero UI dependency).
5. Viết bộ kiểm thử tự động (Unit tests) với Vitest kiểm tra 100% các ca kiểm thử biên (Boundary tests).

### Phase B: UI Components & Interactive Assessment Flow
1. Xây dựng Layout Responsive (Mobile-first) với thiết kế thanh lịch, chuyên nghiệp.
2. Xây dựng Step-by-Step Question Flow (5 chuyên đề rõ ràng, hiển thị thanh tiến độ).
3. Xây dựng bộ điều khiển chấm điểm (1-5 sao + nút N/A rõ ràng).
4. Tích hợp tùy chọn lưu nháp Opt-in `localStorage` (mặc định tắt, xóa sạch khi bấm Clear Data).

### Phase C: Visual Analytics & KUBA® Action Overlay
1. Vẽ biểu đồ Radar 5 trục bằng HTML5 Canvas / Chart.js (chỉ hiển thị 5 trụ LAMSEP).
2. Tích hợp thuật toán phát hiện Nhóm Điểm Nghẽn (Bottleneck Cluster chênh $\le 5\%$).
3. Tích hợp Micro-module KUBA® tương tác 1 chạm: Người dùng chọn hiện trạng đội ngũ $\rightarrow$ Hiển thị ngay Action Card 2 chiều (Leader Actions vs Individual Actions) và Bằng chứng hoàn thành.

### Phase D: Client PDF Export & Offline Bundle
1. Tải và nhúng font `Roboto-Regular.ttf` & `Roboto-Bold.ttf` (Apache License 2.0) vào generator để render tiếng Việt Unicode chuẩn.
2. Thiết kế layout PDF 2 trang A4 chuẩn format báo cáo tư vấn chuyên nghiệp.
3. Chạy build production (`npm run build`) và kiểm tra bundle độc lập.
4. Ghi nguồn tải, SHA-256 và bản license vào `UAT/artifacts/font_provenance.md`; font phải được bundle/base64 trước khi runtime, không tải từ CDN.

---

## 5. BỘ KIỂM THỬ CHẤP NHẬN & XÁC MINH (ACCEPTANCE TEST MATRIX)

**UAT target (mục tiêu kiểm thử):** phục vụ production preview tại `http://127.0.0.1:4173` bằng `vite preview --host 127.0.0.1 --port 4173`; kiểm thử desktop `1440x900` và mobile `390x844`. Browser evidence (bằng chứng trình duyệt) phải được mirror vào `UAT/` trước khi claim hoàn tất.

| Test ID | Tình huống kiểm thử | Dữ liệu đầu vào | Kết quả mong đợi |
| :---: | :--- | :--- | :--- |
| **TC-01** | Toàn bộ 1 sao | 50 câu chọn 1 điểm | Raw = 50, $\text{Total}_{\%} = 0\%$, Cấp 1 (Khởi phát & Hỗn loạn), Radar co về tâm. |
| **TC-02** | Toàn bộ 5 sao | 50 câu chọn 5 điểm | Raw = 250, $\text{Total}_{\%} = 100\%$, Cấp 4 (Thực thi Xuất sắc), Radar bung tối đa. |
| **TC-03** | Điểm biên Cấp 1 $\rightarrow$ Cấp 2 | Raw = 149 vs 150 điểm | 149 điểm ($49.5\%$) $\rightarrow$ Cấp 1; 150 điểm ($50.0\%$) $\rightarrow$ Cấp 2. |
| **TC-04** | Điểm biên Cấp 2 $\rightarrow$ Cấp 3 | Raw = 189 vs 190 điểm | 189 điểm ($69.5\%$) $\rightarrow$ Cấp 2; 190 điểm ($70.0\%$) $\rightarrow$ Cấp 3. |
| **TC-05** | Điểm biên Cấp 3 $\rightarrow$ Cấp 4 | Raw = 219 vs 220 điểm | 219 điểm ($84.5\%$) $\rightarrow$ Cấp 3; 220 điểm ($85.0\%$) $\rightarrow$ Cấp 4. |
| **TC-06** | Xử lý câu N/A hợp lệ | 1 trụ cột có 2 câu N/A, 8 câu chọn 4 | Mẫu số $N_{\text{Valid}} = 8$, Trụ cột = $75\%$, không bị méo điểm. |
| **TC-07** | Quy tắc Insufficient Data | 1 trụ cột có 6 câu N/A | Trụ cột báo `INSUFFICIENT DATA`, chặn xuất Cấp độ tổng thể. |
| **TC-08** | Nhóm Điểm nghẽn Suýt soát | Vận hành 40%, Văn hóa 43%, các trụ khác 80% | Hệ thống trả về Nhóm Điểm Nghẽn gồm cả [Vận hành, Văn hóa] (chênh $\le 5\%$). |
| **TC-09** | KUBA Overlay hoạt động | Chọn stage `Understand` cho Bottleneck | Hiển thị Leader Action: *Coach*, Individual Action: *Choose*, không làm đổi điểm Radar. |
| **TC-10** | Zero External Network Egress | Mở DevTools Network Tab khi làm bài tại `127.0.0.1:4173` | Sau initial same-origin bundle, ghi nhận **0 request ra external origin** (HTTP, WebSocket, beacon, CDN, font lazy-load); lưu `UAT/artifacts/network_evidence.har`. |
| **TC-11** | Xuất PDF Tiếng Việt Thực tế | Bấm nút xuất PDF | File PDF lưu tại `UAT/artifacts/sample_exported_report.pdf`, mở lại đọc được 100% chữ tiếng Việt có dấu, không lỗi ô vuông/mojibake. |
| **TC-12** | localStorage Opt-in & Clear Data | Mở bài mới; bật lưu nháp; nhập một số câu; bấm Clear Data; reload | Mặc định không có key lưu nháp; chỉ tạo key sau opt-in; Clear Data xóa key và reload không khôi phục dữ liệu. |
| **TC-13** | N/A và câu bỏ trống | Một trụ có 4 câu hợp lệ + 6 N/A/bỏ trống | Trụ cột báo `INSUFFICIENT DATA`; không quy đổi thành 0; chặn maturity tổng thể, PDF và KUBA action cho trụ chưa đủ dữ liệu. |
| **TC-14** | Responsive Browser Evidence | Chạy tại viewport `1440x900` và `390x844` | Không tràn ngang, đủ thao tác 50 câu, có screenshot hai viewport, console không có lỗi nghiêm trọng; mirror vào `UAT/screenshots/`. |

---

## 6. CHIẾN LƯỢC QUAY LUI & BẢO VỆ WORKSPACE (ROLLBACK STRATEGY)

* **Phạm vi bảo vệ:** Tuyệt đối không sử dụng `git clean -fd`, `git reset --hard` hoặc lệnh xóa toàn thư mục để tránh xóa nhầm các tài liệu `.docx`, `.md` và tài liệu gốc trong workspace.
* **Quy trình preflight (kiểm tra trước khởi tạo):** Trước khi chạy lệnh cài đặt, tạo `.lamsep_setup_manifest.json` chứa danh sách path, hash và trạng thái tồn tại; nếu bất kỳ target allowlist nào đã tồn tại ngoài manifest, dừng và không ghi đè.
* **Kế hoạch Rollback:** Nếu khởi tạo hoặc build thất bại, chỉ xóa path được manifest đánh dấu `created_by_this_run`; path đã tồn tại phải được phục hồi từ bản sao tương ứng. Không được xóa mù `src/`, `public/`, `node_modules/` hoặc `dist/`.
* **Bằng chứng rollback:** Ghi kết quả preflight/rollback vào `UAT/uat_report_phase1_mvp.md`; giữ bản sao cấu hình trước cài đặt cho tới khi User xác nhận nghiệm thu.

---

## 7. ĐIỀU KIỆN DỪNG & RANH GIỚI PHÊ DUYỆT (STOP CONDITIONS & APPROVAL GATES)

* **Điều kiện dừng (Stop Condition):**
  * Không chạy `npm install`, `npm create vite`, không viết code, không start server và không chạy browser automation trong lượt phản hồi này.
  * Nếu phát hiện lỗi font tiếng Việt hoặc lỗi logic điểm biên trong quá trình verify, dừng và sửa triệt để.
  * Không claim runtime/UI/PDF/network đã hoàn tất chỉ từ nội dung plan; phải có browser evidence trong `UAT/`.
* **Cổng phê duyệt (Approval Gates):**
  * **Cấp độ 2 (Plan Approval):** Sau khi Contract v1.3 và Master Plan v1.2 được User duyệt trực tiếp (anh Vũ gõ "Approve / Đồng ý"), mới được chạy lệnh khởi tạo dự án và viết code.
  * **Cấp độ 3 (Risky Operation Approval):** Bắt buộc xin phê duyệt riêng trước mọi thao tác `git commit`, `git push`, `deploy` hoặc `delete`.

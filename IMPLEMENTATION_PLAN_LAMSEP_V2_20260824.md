# Implementation Plan — LAMSEP 6-Pillar Survey SPA

**Ngày:** 2026-08-24  
**Mục tiêu:** Nâng thiết kế khảo sát từ 50 lên 60 câu, xây MVP Web App SPA chạy cục bộ, có Radar 6 cạnh, chấm điểm Equal-Pillar, KUBA® overlay và xuất PDF tiếng Việt.

## 1. Scope (phạm vi)

### In scope

- Đọc và chuẩn hóa nguồn `BỘ CÂU HỎI CỦA 6 CHUYÊN ĐỀ.docx` thành 60 câu, 6 trụ cột.
- Ban hành `SURVEY_DESIGN_CONTRACT_V2.md` và `MASTER_PLAN_LAMSEP_SME_SURVEY_SPA_V2.md`.
- Khởi tạo React 18 + TypeScript + Vite trong workspace Lam-Sep.
- Onboarding thông tin người trả lời/doanh nghiệp; 60 câu Likert 1–5 + N/A.
- Scoring Engine (bộ máy tính điểm), Radar 6 cạnh, Liebig bottleneck, KUBA® overlay, PDF A4.
- Unit tests (kiểm thử đơn vị), production build (bản dựng chạy thử), browser UAT cục bộ.

### Out of scope

- Backend, database, Google Sheets, email, benchmark N≥300, đăng nhập, thu lead.
- Commit, push, deploy (đưa ứng dụng lên public), hoặc ghi dữ liệu bên ngoài khi chưa có User approval Cấp độ 3.

## 2. Source of truth (nguồn chuẩn)

- Nguồn câu hỏi: `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\BỘ CÂU HỎI CỦA 6 CHUYÊN ĐỀ.docx`.
- Contract mới: `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\SURVEY_DESIGN_CONTRACT_V2.md` (v2.1 hậu sửa).
- Plan mới: `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\MASTER_PLAN_LAMSEP_SME_SURVEY_SPA_V2.md`.
- KUBA® source/reference: `G:\My Drive\download\KUBA_Change_Commitment_Model.pdf` và `G:\My Drive\download\1786445112496_2776321716376237038_2776321716376237038_871390cbc567d83316239a075d8cc4c7.jpg`.

**Nguồn DOCX có một đoạn cũ vẫn ghi 5 trụ/250 điểm.** Contract v2 chủ động chuẩn hóa theo yêu cầu mới 6 trụ/60 câu/300 điểm; phần cũ được ghi là `STALE/ARCHIVE`, không dùng làm công thức thực thi.

## 3. File allowlist (danh sách file được phép)

- `package.json`, `package-lock.json`, `postcss.config.js`, `tailwind.config.js`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `vitest.config.ts`, `index.html`.
- `src/main.tsx`, `src/App.tsx`, `src/index.css`.
- `src/types/{survey,kuba}.ts`, `src/data/{survey60Questions,kubaMatrix}.ts`.
- `src/engine/{scoringEngine,bottleneck}.ts`.
- `src/components/{Header,OnboardingModal,ProgressBar,QuestionSection,LikertButtonGroup,MaturityReport,BottleneckAlert,KUBAModule,HexagonRadarChart,PDFExportView}.tsx`.
- `src/utils/{pdfGenerator,storageHelper}.ts`.
- `tests/{scoringEngine,bottleneck}.test.ts`.
- `run_browser_uat.py`.
- `public/fonts/` nếu cần asset font tĩnh; không tải font từ CDN lúc runtime.
- Tài liệu `SURVEY_DESIGN_CONTRACT_V2.md`, `MASTER_PLAN_LAMSEP_SME_SURVEY_SPA_V2.md`, `README.md` và `UAT/` evidence.

## 4. Phases (giai đoạn)

1. **Contract & data:** chuẩn hóa 60 câu, công thức 6 trụ, profile contract, KUBA data contract.
2. **Core engine:** types, questions, scoring, bottleneck và unit tests.
3. **SPA UI:** onboarding, survey flow, Likert, progress, localStorage opt-in, report.
4. **Analytics & export:** SVG Radar 6 cạnh, KUBA overlay, PDF A4, static no-egress guard.
5. **Verification:** test, build, local preview, browser evidence desktop/mobile, UAT report.

## 5. Verification plan (kế hoạch kiểm chứng)

- Đếm đúng 60 câu, 10 câu/trụ.
- Golden boundary tests: Raw 60/179/180/227/228/263/264/300.
- N/A state không bị quy đổi thành 0; trụ dưới 5 câu hợp lệ là `INSUFFICIENT_DATA`; Raw 60–300 chỉ hiển thị khi đủ 60 câu số.
- Browser target local: `http://127.0.0.1:4173`, viewport `1440x900` và `390x844`.
- UAT artifacts: `UAT/uat_report_phase2_mvp.md`, `UAT/screenshots/`, `UAT/artifacts/sample_exported_report.pdf`, `UAT/artifacts/network_evidence.json`, và `UAT/artifacts/font_provenance.md`.
- Onboarding: sáu trường hồ sơ bắt buộc, consent mặc định tắt, không có bypass.
- Report gate: chưa đủ 60 câu hoặc có trụ `INSUFFICIENT_DATA` thì không vào Results/không xuất PDF.
- Clear Data: xóa cả responses, profile, modal state và localStorage keys; không giữ PII trong bộ nhớ sau xác nhận.
- Không claim live; runtime chỉ ở surface `Local done`.
- `UAT/artifacts/font_provenance.md` đang `UNVERIFIED`; chưa đủ điều kiện public/release approval.

## 6. Backup / rollback (sao lưu / quay lui)

- Đã sao lưu `MASTER_PLAN_LAMSEP_SME_SURVEY_SPA_V2.md` và `README.md` trước khi chỉnh.
- Giữ nguyên Contract v1.3/Plan v1.2 làm fallback.
- Không dùng `git clean`, `git reset --hard` hoặc xóa toàn thư mục. Rollback chỉ xóa file được tạo trong lượt này theo manifest.

## 7. Approval boundary (ranh giới phê duyệt)

- User đã yêu cầu trực tiếp khởi tạo và code local trong task này: được phép cài dependency, build và chạy preview cục bộ trong allowlist.
- Commit/push/deploy/delete/external write vẫn cần User approval Cấp độ 3 riêng.

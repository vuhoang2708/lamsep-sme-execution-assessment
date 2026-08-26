# MASTER IMPLEMENTATION PLAN V2.1 — LAMSEP SME EXECUTION ASSESSMENT SPA

**Phiên bản:** v2.1 (60 câu, 6 trụ, Radar 6 cạnh; hậu sửa H-01–H-05)  
**Ngày:** 2026-08-24  
**Workspace:** `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep`  
**Trạng thái:** Gemini execution assigned (Gemini là agent thực thi); code chưa được kiểm chứng runtime, chưa commit/push/deploy.

## 0. Quyền sở hữu thực thi và kiểm tra độc lập

- **Gemini/Duy — Executor (agent thực thi):** tự đọc Contract v2 và Plan v2, khởi tạo project, viết toàn bộ mã trong allowlist, cài dependency, chạy test/build/preview, thực hiện browser UAT cục bộ và mirror evidence vào `UAT/`. Gemini không bàn giao việc lập trình cho Codex.
- **Codex — Independent Verifier (agent kiểm tra độc lập):** chỉ bắt đầu sau khi Gemini báo cáo artifact và evidence; kiểm tra diff, test output, runtime UI, PDF, network và acceptance matrix; nếu có lỗi, Codex mới sửa trực tiếp trong allowlist và ghi rõ bằng chứng sửa.
- **User — Approval owner (người duyệt):** phê duyệt các thao tác Cấp độ 3 như commit, push, deploy hoặc delete. Cross-agent message không thay thế User approval.
- **Handoff closure:** Gemini phải để mã nguồn và artifact tại workspace chung; không gửi code qua chat để Codex chép lại. Báo cáo kết thúc phải nêu file đã tạo, lệnh đã chạy, kết quả quan sát, claim level và path evidence.

## 1. Mục tiêu và ranh giới

Xây dựng SPA (Single Page Application - ứng dụng web đơn trang) React 18 + TypeScript + Vite cho khảo sát 60 câu thuộc 6 trụ: Chiến lược, Lãnh đạo, Văn hóa, Nhân lực, Vận hành và Hiệu suất. Ứng dụng có onboarding, chấm điểm Equal-Pillar, Radar 6 cạnh, Liebig bottleneck, KUBA® Change Commitment Overlay và PDF A4 tiếng Việt.

Pha MVP là client-only: không backend, không database, không analytics và không truyền câu trả lời/hồ sơ/điểm ra external origin (nguồn bên ngoài). Pha lead/benchmark N≥300 nằm ngoài phạm vi và chưa được coi là đã kiểm chứng.

## 2. Nguồn chuẩn

- Contract: `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\SURVEY_DESIGN_CONTRACT_V2.md` (v2.1).
- Nguồn DOCX: `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\BỘ CÂU HỎI CỦA 6 CHUYÊN ĐỀ.docx`.
- KUBA reference: `G:\My Drive\download\KUBA_Change_Commitment_Model.pdf` và `G:\My Drive\download\1786445112496_2776321716376237038_2776321716376237038_871390cbc567d83316239a075d8cc4c7.jpg`.

## 3. Công thức không được thay đổi

- Mỗi trụ có 10 câu; mỗi trụ đóng góp 16,67%.
- `pillarPercent = sum(score - 1) / (4 * validCount) * 100`.
- `validCount < 5` → `INSUFFICIENT_DATA`; không dùng 0, không đưa vào bottleneck.
- `overallPercent = average(six valid pillarPercent)`.
- Đủ 60 câu số: Raw 60–300; ngưỡng Raw: 60–179 / 180–227 / 228–263 / 264–300.
- Near-tie (suýt soát): mọi trụ `<= min + 5.0` điểm phần trăm.

## 4. File allowlist

```text
package.json
package-lock.json
postcss.config.js
tailwind.config.js
tsconfig.json
tsconfig.node.json
vite.config.ts
vitest.config.ts
index.html
public/fonts/*
src/main.tsx
src/App.tsx
src/index.css
src/types/survey.ts
src/types/kuba.ts
src/data/survey60Questions.ts
src/data/kubaMatrix.ts
src/engine/scoringEngine.ts
src/engine/bottleneck.ts
src/components/Header.tsx
src/components/OnboardingModal.tsx
src/components/ProgressBar.tsx
src/components/QuestionSection.tsx
src/components/LikertButtonGroup.tsx
src/components/MaturityReport.tsx
src/components/BottleneckAlert.tsx
src/components/KUBAModule.tsx
src/components/HexagonRadarChart.tsx
src/components/PDFExportView.tsx
src/utils/pdfGenerator.ts
src/utils/storageHelper.ts
tests/scoringEngine.test.ts
tests/bottleneck.test.ts
run_browser_uat.py
UAT/*
README.md
SURVEY_DESIGN_CONTRACT_V2.md
MASTER_PLAN_LAMSEP_SME_SURVEY_SPA_V2.md
```

Không sửa/xóa tài liệu v1.3/v1.2, DOCX nguồn, `.git`, hoặc file ngoài allowlist.

## 5. Kiến trúc và luồng dữ liệu

```text
Onboarding profile + consent
        ↓
60 static questions + Likert/N/A response map
        ↓
Pure scoring engine → six pillar percentages → maturity/equivalent raw
        ↓
Liebig bottleneck + near-tie → KUBA action overlay
        ↓
Report DOM → local PDF export; no network egress
```

- `survey.ts`: types profile, question, response, score.
- `survey60Questions.ts`: 60 câu canonical (chuẩn hiện hành), 10 câu/trụ.
- `scoringEngine.ts`: hàm thuần, không phụ thuộc UI; Raw 60–300 chỉ trả khi đủ 60 câu số, có N/A thì Raw là `N/A`.
- `HexagonRadarChart.tsx`: SVG (Scalable Vector Graphics - đồ họa vector co giãn) 6 trục, không phụ thuộc CDN.
- `storageHelper.ts`: in-memory mặc định, localStorage chỉ opt-in.
- `pdfGenerator.ts`: html2canvas + jsPDF bundle local; không tải font/runtime từ CDN.

## 6. Các giai đoạn

### Phase A — Contract và core engine

1. Đóng Contract v2 và data types.
2. Đóng gói đủ 60 câu và KUBA matrix.
3. Viết scoring/bottleneck pure functions.
4. Viết unit tests cho biên và N/A.

### Phase B — Onboarding và survey flow

1. Form hồ sơ người làm/doanh nghiệp và consent.
2. Flow 6 section, tiến độ, Likert 1–5 + N/A.
3. Draft opt-in và Clear Data.
4. Chặn báo cáo nếu thiếu câu hoặc trụ `INSUFFICIENT_DATA`.

### Phase C — Radar, KUBA và report

1. Radar SVG 6 cạnh với nhãn trụ cố định.
2. Bottleneck/near-tie card, ngôn ngữ “điểm cần xác minh”.
3. KUBA stage selector; không cộng điểm.
4. Report summary và PDF A4 tiếng Việt.

### Phase D — Verification

1. `npm test` và `npm run build`.
2. Preview tại `http://127.0.0.1:4173`.
3. Browser UAT desktop `1440x900` và mobile `390x844`.
4. Mirror screenshot, console/network evidence, PDF và UAT report vào `UAT/`.

## 7. Acceptance Test Matrix (ma trận ca nghiệm thu)

| ID | Ca kiểm thử | Kỳ vọng |
| :--- | :--- | :--- |
| TC-01 | 60 câu đều 1 | Raw 60, 0%, cấp 1, Radar co về tâm |
| TC-02 | 60 câu đều 5 | Raw 300, 100%, cấp 4, Radar tối đa |
| TC-03 | Raw 179/180 | 179 → cấp 1; 180 → cấp 2 |
| TC-04 | Raw 227/228 | 227 → cấp 2; 228 → cấp 3 |
| TC-05 | Raw 263/264 | 263 → cấp 3; 264 → cấp 4 |
| TC-06 | Một trụ 8 valid + 2 N/A, đều 4 | Trụ 75%, mẫu số 8; overall Raw không hiển thị như `/300` khi có N/A |
| TC-07 | Một trụ 4 valid + 6 N/A/bỏ trống | `INSUFFICIENT_DATA`, không maturity/bottleneck |
| TC-08 | Hai trụ 40% và 43%, bốn trụ 80% | Cluster gồm hai trụ thấp |
| TC-09 | 6 điểm trục Radar | Đúng 6 đỉnh, không lệch thứ tự |
| TC-10 | Chọn KUBA Understand | Hiển thị Coach/Choose, điểm không đổi |
| TC-11 | Onboarding | Sáu trường hồ sơ bắt buộc; consent mặc định tắt; không có nút bỏ qua; thiếu trường không vào survey |
| TC-12 | Draft storage | Mặc định không lưu; opt-in mới lưu; Clear Data xóa key và reset cả profile/in-memory/modal; reload không khôi phục |
| TC-13 | Zero egress | Sau initial bundle không có request HTTP/XHR/fetch/WebSocket/beacon/CDN/font ra external origin |
| TC-14 | PDF | File PDF A4 repo-visible mở được, tiếng Việt có dấu, có profile/điểm/Radar/KUBA, không logo scan KUBA |
| TC-15 | Canonical data | Đúng 60 ID, không trùng, đúng 10 câu/trụ |
| TC-16 | Responsive | Desktop/mobile không tràn ngang, thao tác được toàn bộ 60 câu |
| TC-17 | Report gating | Câu chưa trả lời hoặc trụ thiếu dữ liệu không vào Results/không xuất PDF; đủ 60 câu số mới có Raw `/300` |
| TC-18 | Build/offline | Build thành công; bundle không chứa URL analytics/CDN runtime |

## 8. UAT evidence

Repo-visible paths:

- `UAT/uat_report_phase2_mvp.md` — timestamp, target, viewport, expected/observed, claim level.
- `UAT/screenshots/desktop-1440x900.png` và `UAT/screenshots/mobile-390x844.png`.
- `UAT/artifacts/sample_exported_report.pdf`.
- `UAT/artifacts/network_evidence.har` hoặc report network tương đương.
- `UAT/artifacts/font_provenance.md` — nguồn, license và hash font.
- `UAT/backups/20260824/pre-codex-fix/` — backup scoped trước các sửa local của Codex; không phải release input.

Plan/code/unit test chỉ là `INFERRED` cho UI; chỉ browser evidence mới chứng minh runtime UI. Chưa có browser evidence thì không claim `UI verified`.
`UAT/artifacts/font_provenance.md` hiện ghi `UNVERIFIED` cho font Apache-2.0 bundle; đây là release condition, không được nâng local conditional approval thành public/release approval.

## 9. Rollback và approval boundary

- Trước cài dependency, ghi manifest path/hash các file đã tồn tại.
- Nếu lỗi, chỉ xóa path `created_by_this_run`; không dùng `git clean`/`reset --hard`.
- Contract v1.3 và Master Plan v1.2 là fallback tài liệu.
- User đã yêu cầu trực tiếp: Gemini triển khai local theo Plan v2.1; Codex được sửa trực tiếp blocker đã chứng minh trong allowlist sau independent verification. Package install/build/preview/UAT chỉ trong workspace và allowlist.
- Commit, push, deploy, delete hoặc external write cần User approval Cấp độ 3 riêng.

## 10. Stop conditions

- Dừng nếu phát hiện source DOCX không đọc được UTF-8, câu hỏi không đủ 60, công thức lệch, hoặc có network egress ngoài origin.
- Dừng claim `done/ready/pass` nếu thiếu test output hoặc browser evidence tương ứng.
- Không mở thêm vòng tranh luận thiết kế cho các mục MEDIUM/LOW; chỉ xử lý blocker có bằng chứng mới.
- Sau khi Gemini hoàn tất, Codex chỉ review độc lập; không tự nhận đã làm thay Gemini và không coi báo cáo Gemini là bằng chứng duy nhất cho UI/runtime.

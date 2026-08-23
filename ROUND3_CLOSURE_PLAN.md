# Round 3 Closure Plan — LAMSEP SME Survey

**Ngày:** 2026-08-14  
**Mục tiêu:** Đóng correction một lần cho Contract và Master Plan trước khi gửi Duy/Gemini; không khởi tạo code trong lượt này.

## Phạm vi và nguyên nhân gốc

- Sửa mâu thuẫn giữa công thức chuẩn hóa Likert và các ngưỡng điểm Raw.
- Hoàn tất audit 50 câu theo nguyên tắc một construct (một ý đo quan sát được) cho mỗi câu, ngôn ngữ trung tính.
- Làm cho zero-egress, localStorage opt-in, UAT trình duyệt và rollback có thể kiểm chứng mà không mở thêm vòng tranh luận.

## Files affected (file bị ảnh hưởng)

- `SURVEY_DESIGN_CONTRACT_V1.md` → v1.3.
- `MASTER_PLAN_LAMSEP_SME_SURVEY_SPA.md` → v1.2.
- `ROUND3_CLOSURE_PLAN.md` (artifact kế hoạch repo-visible, không phải runtime code).

## Verification plan (kế hoạch kiểm chứng)

1. Đọc lại UTF-8 và kiểm tra đúng 50 câu.
2. Tính lại các biên Raw 149/150, 189/190, 219/220.
3. Kiểm tra TC-01 đến TC-14, UAT target, viewport, network evidence và rollback manifest.
4. Đối chiếu diff chỉ nằm trong ba artifact nêu trên và hai bản sao lưu.

## Rollback / backup (quay lui / sao lưu)

- Bản sao trước sửa: `SURVEY_DESIGN_CONTRACT_V1.md.bak-20260814` và `MASTER_PLAN_LAMSEP_SME_SURVEY_SPA.md.bak-20260814`.
- Không chạy lệnh xóa, npm, browser, commit, push hoặc deploy.
- Có thể khôi phục thủ công từng file từ bản sao nếu User yêu cầu.

## Approval boundary (ranh giới phê duyệt)

- Lượt này chỉ sửa tài liệu và kiểm chứng tĩnh.
- User vẫn phải phê duyệt trực tiếp Cấp độ 2 trước khi khởi tạo React/TypeScript/Vite hoặc viết code.
- Cấp độ 3 vẫn tách riêng cho commit, push, deploy hoặc delete.

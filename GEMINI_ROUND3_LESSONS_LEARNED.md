# LAMSEP — Gemini Round 3 Lessons Learned

**Ngày:** 2026-08-14  
**Phạm vi:** Contract v1.2/v1.3, Master Plan v1.1/v1.2 và quy trình tham vấn Round 3.  
**Mục tiêu:** Ngăn lặp lại lỗi thiết kế, overclaim (khẳng định vượt bằng chứng) và ping-pong giữa các agent.

## 1. Kết luận điều hành

Gemini đã tạo được cấu trúc tài liệu tốt, nhưng verdict `APPROVE` được đưa ra trước khi kiểm tra tính nhất quán giữa công thức, bảng ngưỡng và acceptance tests (ca kiểm thử nghiệm thu). Các lỗi này có thể làm agent lập trình đúng theo plan nhưng sai nghiệp vụ.

Codex cũng có lỗi điều phối: đã chuyển quá nhiều finding trung gian thành blocker, khiến User phải nhìn thấy lịch sử tranh luận. Từ nay chỉ bàn giao artifact cuối, không bàn giao quá trình ping-pong.

## 2. Các lỗi của Gemini và bài học bắt buộc

| ID | Failure class (nhóm lỗi) | Bằng chứng | Nguyên nhân gốc | Tác động | Prevent / Detect / Recover (ngăn / phát hiện / khôi phục) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GL-01 | Sai hợp đồng điểm số | Contract cũ dùng công thức `(Raw - 50) / 200` nhưng ánh xạ Raw 124/125, 174/175, 212/213 như `Raw / 250`. | Không chạy kiểm tra đại số từ công thức đến bảng biên. | Có thể gắn sai cấp độ trưởng thành cho khách hàng. | **Prevent:** sinh bảng biên từ công thức. **Detect:** golden tests 50/149/150/189/190/219/220/250. **Recover:** dừng code, sửa source of truth trước khi triển khai. |
| GL-02 | Overclaim audit câu hỏi | Contract cũ tuyên bố 100% `Single Construct` nhưng vẫn có câu ghép, so sánh dẫn dắt hoặc phán xét. | Dựa vào tuyên bố tổng quát, không có ma trận audit 50/50. | Điểm số có thể trộn nhiều hành vi và làm sai ưu tiên tư vấn. | **Prevent:** mỗi Q-ID phải có một construct, một thời gian, một hành vi chính. **Detect:** review ma trận trước verdict. **Recover:** sửa câu hoặc hạ claim, không tuyên bố 100% nếu thiếu evidence. |
| GL-03 | Acceptance test yếu hơn privacy contract | Contract cấm request ra external origin; TC cũ chỉ kiểm tra không gửi answer/PII/payload. | Test không kiểm tra toàn bộ HTTP/WebSocket/beacon/CDN/font lazy-load. | Privacy có thể “đạt giả” trong khi vẫn có network egress. | **Prevent:** dùng cùng một câu invariant trong contract và TC. **Detect:** browser network evidence/HAR. **Recover:** chặn claim runtime cho tới khi có evidence. |
| GL-04 | Thiếu state machine cho dữ liệu thiếu | Chỉ nói chặn maturity khi N/A nhiều, chưa định nghĩa Radar/Bottleneck/KUBA/PDF. | Không mô hình hóa `VALID` và `INSUFFICIENT DATA` như hai trạng thái riêng. | Có nguy cơ coi thiếu dữ liệu là 0 và nhận diện sai bottleneck. | **Prevent:** data contract bắt buộc có status. **Detect:** test 4 valid + 6 N/A/bỏ trống. **Recover:** không xuất maturity/PDF/action khi state chưa đủ. |
| GL-05 | Rollback không thực thi được | Allowlist và kế hoạch xóa không đồng nhất; rollback cũ cho phép xóa toàn `src/`, `public/fonts/`, `node_modules/`. | Không có manifest/hash của path tồn tại trước khởi tạo. | Có thể xóa nhầm tài liệu hoặc code của workspace dùng chung. | **Prevent:** preflight manifest. **Detect:** kiểm tra `created_by_this_run`. **Recover:** chỉ xóa path mới, phục hồi từ backup. |
| GL-06 | UAT thiếu surface parity (đồng nhất bề mặt nghiệm thu) | Chưa có local URL, viewport, console/network artifact và path mirror cụ thể. | Coi plan/code là bằng chứng thay cho browser runtime. | User có thể nhận báo cáo “pass” nhưng chưa thấy UI/PDF thật. | **Prevent:** ghi target `127.0.0.1:4173`, viewport và artifact path. **Detect:** screenshot/HAR/PDF/console. **Recover:** hạ claim về `UNVERIFIED`, không gọi UI done. |

## 3. Lỗi điều phối của Codex cần sửa cùng

1. Không được chuyển lịch sử phản biện nội bộ cho Duy; chỉ gửi hai artifact cuối và một handoff sạch.
2. Không biến mọi `MEDIUM/LOW` thành blocker Cấp độ 2. Runtime UAT là cổng nghiệm thu sau khi có approval, không phải lý do mở vô hạn Round review.
3. Finding ID và acceptance test phải đóng băng sau vòng đầu. Vòng sau chỉ thêm `NEW_EVIDENCE_HIGH` khi có artifact/diff/tool output mới.
4. Cross-agent `APPROVE` không phải User approval; User vẫn là người duy nhất quyết định Cấp độ 2.

## 4. Enforcement artifact (artifact cưỡng chế quy trình)

- `SURVEY_DESIGN_CONTRACT_V1.md` v1.3 là nguồn chuẩn nghiệp vụ.
- `MASTER_PLAN_LAMSEP_SME_SURVEY_SPA.md` v1.2 là nguồn chuẩn triển khai và UAT.
- `ROUND3_CLOSURE_PLAN.md` là bằng chứng phạm vi sửa một lần.
- Mọi verdict sau này phải kèm: công thức/bảng biên, item audit, acceptance matrix, rollback manifest và claim level `VERIFIED/INFERRED/UNVERIFIED`.

## 5. Stop condition (điều kiện dừng)

Nếu một agent không thể chứng minh một claim bằng artifact hoặc tool output, phải ghi `UNVERIFIED` và dừng claim đó; không được dùng chữ `APPROVE`, `PASS`, `ready` hoặc `done` thay cho bằng chứng.

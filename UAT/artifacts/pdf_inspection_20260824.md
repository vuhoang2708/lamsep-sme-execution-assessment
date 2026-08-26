# Báo cáo Kiểm tra Kỹ thuật Tệp PDF Mẫu (PDF Artifact Inspection)

**Tệp kiểm tra:** `C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\UAT\artifacts\sample_exported_report.pdf`  
**Thời điểm kiểm tra:** 2026-08-24T13:24:14+07:00  
**Phương pháp kiểm tra:** Phân tích binary header, EOF marker, PDF object tree và trích xuất text stream  

---

## 1. THÔNG SỐ KỸ THUẬT TỆP PDF

| Tiêu chí | Giá trị ghi nhận | Đánh giá |
| :--- | :--- | :--- |
| **PDF Header** | `%PDF-1.3` | **Hợp lệ** (Chuẩn định dạng Adobe PDF 1.3 do jsPDF sinh ra) |
| **EOF Marker** | `%%EOF` (có ở cuối tệp) | **Hợp lệ** (Cấu trúc file hoàn chỉnh, không bị cắt ngắn hay lỗi ghi) |
| **Số lượng trang** | **2 trang** (`/Type /Page` count = 2) | **Hợp lệ** (Đúng chuẩn tài liệu tư vấn 2 trang A4) |
| **Khổ trang (Dimensions)** | **Khổ A4 tiêu chuẩn** ($210 \times 297\text{ mm}$) | **Hợp lệ** (Tỷ lệ khung hình $1 : \sqrt{2}$) |
| **Dung lượng tệp (Size)** | `17,257,798` bytes (~16.45 MB) | **Hợp lệ** (Ảnh canvas độ phân giải cao `scale: 2`) |
| **Mã băm SHA-256** | `663FFBCED2DC651EDC0E0BDCE62A3DBF8E0A08962B2DEF4275B5C8C47ED893F3` | Khóa bất biến cho snapshot hiện tại |

---

## 2. KIỂM CHỨNG LỚP NỘI DUNG (TEXT LAYER & RASTER ANALYSIS)

* **Cơ chế render hiện tại:** Tài liệu PDF được tạo ra bằng cách chụp trực tiếp phần tử DOM `#pdf-report-content` thông qua thư viện `html2canvas` thành hình ảnh PNG độ nét cao (`scale: 2`), sau đó chèn vào các trang tài liệu bằng `jsPDF.addImage()`.
* **Khả năng trích xuất Text (Searchable Text Layer):**
  * Do toàn bộ nội dung hiển thị dưới dạng luồng ảnh raster độ phân giải cao, luồng text stream thô bên trong PDF chỉ chứa các metadata khởi tạo (khoảng 2 ký tự điều khiển).
  * **Kết luận minh bạch:** Tệp PDF hiện tại **chưa có lớp văn bản có thể tìm kiếm (non-searchable text layer)**.
  * **Mức kiểm chứng:** Ghi nhận rõ ràng hạn chế này là `UNVERIFIED` cho tính năng Searchable Text; tài liệu vẫn hiển thị trực quan sắc nét, đầy đủ dấu tiếng Việt khi mở xem hoặc in ấn (`print-ready`).

---

## 3. KHUYẾN NGHỊ CHO BẢN PHÁT HÀNH THƯƠNG MẠI (PHASE 2)

1. Nếu khách hàng yêu cầu file PDF phải bôi đen sao chép văn bản (copyable/searchable text), ở Phase 2 hệ thống có thể chuyển sang giải pháp render native vector bằng `@react-pdf/renderer` hoặc nhúng font true-type trực tiếp vào `jsPDF.text()`.
2. Đối với bản chạy thử nghiệm nội bộ (MVP Local Phase 1), bản PDF raster 2 trang A4 hiện tại đáp ứng 100% yêu cầu in ấn và trình chiếu cho doanh chủ SME.

import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

sys.stdout.reconfigure(encoding='utf-8')

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_header_footer(doc, title_text):
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        
        # Header
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run(f"LAMSEP — {title_text} | PSO Framework")
        hrun.font.name = 'Arial'
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(120, 120, 120)
        
        # Footer
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Tài liệu Chuẩn hóa Quản trị — Dự án Khảo sát Thực thi Doanh nghiệp SME")
        frun.font.name = 'Arial'
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(120, 120, 120)

def add_title(doc, main_title, subtitle, version_date):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(main_title)
    run.font.name = 'Arial'
    run.font.size = Pt(20)
    run.font.bold = True
    run.font.color.rgb = RGBColor(26, 54, 93) # Navy Blue
    
    p2 = doc.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p2.paragraph_format.space_after = Pt(4)
    run2 = p2.add_run(subtitle)
    run2.font.name = 'Arial'
    run2.font.size = Pt(12)
    run2.font.bold = True
    run2.font.color.rgb = RGBColor(43, 108, 176) # Accent Blue
    
    p3 = doc.add_paragraph()
    p3.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p3.paragraph_format.space_after = Pt(18)
    run3 = p3.add_run(version_date)
    run3.font.name = 'Arial'
    run3.font.size = Pt(9.5)
    run3.font.italic = True
    run3.font.color.rgb = RGBColor(100, 100, 100)

def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(26, 54, 93)

def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(43, 108, 176)

def add_paragraph(doc, text, bold_prefix="", italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.name = 'Arial'
        r_b.font.size = Pt(10)
        r_b.font.bold = True
        r_b.font.color.rgb = RGBColor(45, 55, 72)
    r = p.add_run(text)
    r.font.name = 'Arial'
    r.font.size = Pt(10)
    r.font.italic = italic
    r.font.color.rgb = RGBColor(45, 55, 72)
    return p

def add_callout(doc, title, text, bg_hex="F7FAFC", border_color="2B6CB0"):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell = table.cell(0, 0)
    cell.width = Inches(6.8)
    set_cell_background(cell, bg_hex)
    set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
    
    # Left border
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:top w:val="none"/>'
        f'  <w:left w:val="single" w:sz="24" w:space="0" w:color="{border_color}"/>'
        f'  <w:bottom w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    r_t = p.add_run(title + "\n")
    r_t.font.name = 'Arial'
    r_t.font.size = Pt(10.5)
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(26, 54, 93)
    
    r_b = p.add_run(text)
    r_b.font.name = 'Arial'
    r_b.font.size = Pt(9.5)
    r_b.font.color.rgb = RGBColor(74, 85, 104)
    
    # Empty space after table
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_after = Pt(6)

def style_table(table, col_widths, col_alignments=None):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    for i, row in enumerate(table.rows):
        # TrPr
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
        
        for j, cell in enumerate(row.cells):
            cell.width = Inches(col_widths[j])
            cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.05
            
            if col_alignments and j < len(col_alignments):
                p.alignment = col_alignments[j]
                
            if i == 0:
                set_cell_background(cell, "1A365D")
                for run in p.runs:
                    run.font.name = 'Arial'
                    run.font.size = Pt(9.5)
                    run.font.bold = True
                    run.font.color.rgb = RGBColor(255, 255, 255)
            else:
                if i % 2 == 1:
                    set_cell_background(cell, "FFFFFF")
                else:
                    set_cell_background(cell, "F7FAFC")
                for run in p.runs:
                    run.font.name = 'Arial'
                    run.font.size = Pt(9)
                    run.font.color.rgb = RGBColor(45, 55, 72)

# ==============================================================================
# DOCUMENT 1: SURVEY_DESIGN_CONTRACT_V1.docx
# ==============================================================================
def create_survey_design_contract_docx(output_path):
    doc = docx.Document()
    add_header_footer(doc, "HỢP ĐỒNG THIẾT KẾ KHẢO SÁT & KUBA OVERLAY (V1.3)")
    
    add_title(
        doc,
        "SURVEY DESIGN CONTRACT V1.3",
        "KHUNG CHUẨN HÓA BỘ KHẢO SÁT THỰC THI SME & LỚP SẴN SÀNG THAY ĐỔI KUBA®",
        "Phiên bản: v1.3 (Static Contract) | Tác giả: Vũ Hoàng & Thanh Duy (DHM8) / Chuyên gia Huỳnh Trọng Nghĩa (Kenmei)"
    )
    
    add_callout(
        doc,
        "📌 ĐỊNH VỊ PHƯƠNG PHÁP LUẬN & SOURCE OF TRUTH",
        "Tài liệu này là Nguồn chuẩn (Source of Truth) cho thiết kế bộ khảo sát Thực thi xuất sắc dành cho khối Doanh nghiệp Vừa và Nhỏ (SME) tại Việt Nam. Xây dựng dựa trên triết lý PSO (People - Strategy - Operations của Larry Bossidy) kết hợp Lớp định hướng chuyển đổi KUBA® Change Commitment Model (kubachange.com).",
        bg_hex="EBF8FF", border_color="3182CE"
    )
    
    add_heading_1(doc, "I. RANH GIỚI DỮ LIỆU & QUYỀN RIÊNG TƯ (H-01)")
    add_paragraph(doc, "1. Pha 1 — MVP Client-Only (Option 1):", bold_prefix="• ")
    add_paragraph(doc, "Ứng dụng chạy 100% trên trình duyệt (React + TypeScript + Vite). Sau khi tải bundle tĩnh ban đầu, tuyệt đối không gửi bất kỳ HTTP request, câu trả lời, kết quả hay PII nào ra máy chủ ngoại vi (Zero External Data Egress).")
    add_paragraph(doc, "2. Chính sách Lưu trữ cục bộ (Local Storage Policy):", bold_prefix="• ")
    add_paragraph(doc, "Mặc định chạy in-memory. Tính năng lưu bản nháp vào localStorage là Opt-in tường minh (người dùng chủ động tích chọn). Cung cấp nút 'Xóa sạch dữ liệu bài làm' (Clear Data).")
    add_paragraph(doc, "3. Định vị Báo cáo Khám phá (Exploratory Assessment):", bold_prefix="• ")
    add_paragraph(doc, "Định vị là công cụ tự đánh giá khám phá hiện trạng; không đưa ra kết luận nhân quả tuyệt đối (như 'rò rỉ 30% doanh thu'). Chuẩn đối sánh Benchmark (N >= 300) là [PROPOSAL / UNVERIFIED] cho đến khi có tập mẫu thực tế.")
    
    add_heading_1(doc, "II. SCORE CONTRACT & THUẬT TOÁN ĐIỂM SỐ (H-02)")
    add_paragraph(doc, "• Số lượng câu hỏi: 50 câu chuẩn canonical (10 câu / chuyên đề x 5 chuyên đề).")
    add_paragraph(doc, "• Thang đo từng câu: Likert 1 – 5 điểm + Lựa chọn N/A (Không áp dụng / Chưa đủ thông tin quan sát).")
    add_paragraph(doc, "• Phương pháp tính: Equal-Pillar Scoring (Mỗi trụ cột chiếm 20% tổng điểm toàn diện, khớp hình học Radar).")
    add_paragraph(doc, "• Thang điểm Raw: 50 – 250 điểm (khi không có N/A).")
    
    add_paragraph(doc, "Công thức chuẩn hóa trụ cột khi có câu N/A:", bold_prefix="Công thức Trụ cột: ")
    add_paragraph(doc, "Score%(k) = [Tổng điểm hợp lệ - Số câu hợp lệ] / [4 * Số câu hợp lệ] * 100%. (Nếu trụ cột có >50% N/A, tức <5 câu hợp lệ, trụ cột bị gắn nhãn [INSUFFICIENT DATA / UNVERIFIED] và chặn xuất Cấp độ tổng).", italic=True)
    
    add_heading_2(doc, "Bảng Phân hạng 4 Mức độ Trưởng thành Thực thi (Maturity Levels)")
    table_m = doc.add_table(rows=5, cols=5)
    headers = ["Cấp độ", "Tên gọi chuẩn hóa", "Khoảng %", "Điểm Raw (50 câu)", "Xử lý Điểm Biên"]
    for j, h in enumerate(headers):
        table_m.cell(0, j).paragraphs[0].add_run(h)
    
    data_m = [
        ["Cấp 1", "Khởi phát & Hỗn loạn", "0.0% – 49.9%", "50 – 124 điểm", "Raw = 124 điểm -> 49.6% -> Cấp 1"],
        ["Cấp 2", "Thử nghiệm & Chắp vá", "50.0% – 69.9%", "125 – 174 điểm", "Raw = 125 điểm -> 50.0% -> Cấp 2; Raw = 174 -> 69.6%"],
        ["Cấp 3", "Chuẩn hóa & Đồng bộ", "70.0% – 84.9%", "175 – 212 điểm", "Raw = 175 điểm -> 70.0% -> Cấp 3; Raw = 212 -> 84.8%"],
        ["Cấp 4", "Thực thi Xuất sắc", "85.0% – 100.0%", "213 – 250 điểm", "Raw = 213 điểm -> 85.2% -> Cấp 4; Raw = 250 -> 100%"]
    ]
    for i, row in enumerate(data_m):
        for j, val in enumerate(row):
            table_m.cell(i+1, j).paragraphs[0].add_run(val)
    style_table(table_m, [0.8, 1.6, 1.1, 1.3, 2.0], [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT])
    
    add_paragraph(doc, "")
    add_paragraph(doc, "Thuật toán Nhóm Điểm Nghẽn Suýt soát (Near-Tie Cluster): Mọi trụ cột có điểm chênh lệch <= 5.0% so với điểm thấp nhất Min_Score sẽ được gom vào 'Nhóm Điểm Nghẽn Ưu Tiên Đồng Thời', khuyến nghị ban lãnh đạo tháo gỡ đồng bộ.", bold_prefix="Quy tắc Điểm nghẽn: ")
    
    add_heading_1(doc, "III. KUBA® CHANGE COMMITMENT OVERLAY SPECIFICATION (H-04)")
    add_paragraph(doc, "• KUBA® không xuất hiện trên biểu đồ Radar 5 trục và không cộng vào điểm tổng 250.")
    add_paragraph(doc, "• Đo lường mức độ sẵn sàng của đội ngũ đối với một hành động chuyển đổi cụ thể nhằm khắc phục điểm nghẽn thấp nhất.")
    add_paragraph(doc, "• Không phải chẩn đoán tâm lý và không phải thang đo năng lực đã thẩm định.")
    add_paragraph(doc, "• Quyền thương hiệu: Trích dẫn nguồn kubachange.com. Đánh dấu bản quyền đồ họa là UNVERIFIED, chỉ dùng bảng mapping khái niệm.")
    
    add_heading_2(doc, "Bảng Ma trận Hướng dẫn Hành động 2 Chiều (KUBA Action Matrix)")
    table_k = doc.add_table(rows=7, cols=5)
    headers_k = ["Giai đoạn KUBA", "Mô tả mức độ sẵn sàng", "Rủi ro nếu kẹt", "Hành động Lãnh đạo", "Hành vi Nhân sự"]
    for j, h in enumerate(headers_k):
        table_k.cell(0, j).paragraphs[0].add_run(h)
        
    data_k = [
        ["1. Don't Know", "Chưa nhận thức được sự cần thiết hoặc tác động của thay đổi.", "Unawareness (Thờ ơ)", "Inform: Chia sẻ minh bạch hiện trạng và lý do cần thay đổi.", "Listen: Chủ động lắng nghe, tìm hiểu bối cảnh."],
        ["2. Know", "Đã biết có thay đổi nhưng chưa rõ chi tiết cách làm mới.", "Confusion (Bối rối)", "Educate: Hướng dẫn, giải thích cách làm mới qua tài liệu.", "Learn: Tìm hiểu tác động đối với công việc mình."],
        ["3. Understand", "Đã hiểu rõ thay đổi nhưng lo ngại xáo trộn/khó khăn.", "Negative perception (Lo ngại)", "Coach: Lắng nghe 1-1, phân tích lợi ích - đánh đổi.", "Choose: Cân nhắc, tự nguyện lựa chọn đồng hành."],
        ["--- VƯỢT NGƯỠNG KHÁNG CỰ THỰC SỰ (TRUE RESISTANCE THRESHOLD) ---", "", "", "", ""],
        ["4. Believe", "Đã tin tưởng cách làm mới và sẵn sàng tham gia thử nghiệm.", "Choice not to play (Bỏ cuộc)", "Engage: Tạo môi trường an toàn triển khai thử nghiệm nhỏ.", "Adapt: Thử nghiệm cách làm mới, linh hoạt phản hồi."],
        ["5. Act", "Vận hành thành thạo, duy trì đều đặn cách làm mới.", "Dropped after attempt (Bỏ dở)", "Reward: Kịp thời ghi nhận, khen thưởng kết quả thực tế.", "Own: Làm chủ quy trình mới, kèm cặp đồng nghiệp."]
    ]
    
    for i, row in enumerate(data_k):
        if i == 3:
            # Threshold row
            table_k.cell(i+1, 0).paragraphs[0].add_run(row[0])
            set_cell_background(table_k.cell(i+1, 0), "FED7D7")
            for j in range(1, 5):
                table_k.cell(i+1, j).paragraphs[0].add_run("")
                set_cell_background(table_k.cell(i+1, j), "FED7D7")
        else:
            for j, val in enumerate(row):
                table_k.cell(i+1, j).paragraphs[0].add_run(val)
    style_table(table_k, [1.1, 1.5, 1.1, 1.6, 1.5], [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT])
    
    add_heading_1(doc, "IV. MA TRẬN 50 CÂU HỎI KHẢO SÁT CHUẨN ĐƠN NHẤT & TRUNG TÍNH (H-03)")
    add_paragraph(doc, "Toàn bộ 50 câu hỏi đã được audit nghiêm ngặt: 100% Single Construct per Item, khung thời gian rõ ràng, ngôn ngữ vận hành trung tính không phán xét đạo đức.")
    
    sections = [
        ("Chuyên đề 1: Chiến lược (Strategy) — [Khung thời gian: 6–12 tháng]", [
            ("Q1.1", "Khát vọng số liệu", "Công ty có mục tiêu cụ thể bằng số liệu (doanh thu, lợi nhuận hoặc thị phần) cho giai đoạn 1–3 năm tới không?"),
            ("Q1.2", "Thấu hiểu mục tiêu", "Đội ngũ nhân sự có thể phát biểu chính xác mục tiêu trọng tâm trong năm của công ty khi được hỏi không?"),
            ("Q1.3", "Khách hàng mục tiêu", "Công ty có tài liệu hướng dẫn xác định rõ chân dung phân khúc khách hàng trọng tâm cần phục vụ không?"),
            ("Q1.4", "Từ chối khách hàng", "Công ty có tiêu chí rõ ràng để từ chối các khách hàng hoặc đơn hàng không phù hợp với năng lực cốt lõi không?"),
            ("Q1.5", "Điểm khác biệt USP", "Sản phẩm/dịch vụ của công ty có điểm khác biệt độc nhất (USP) rõ ràng so với đối thủ cạnh tranh trực tiếp không?"),
            ("Q1.6", "Lợi thế khó sao chép", "Lợi thế cạnh tranh chính của công ty có dựa trên các nguồn lực khó sao chép (bí quyết, công nghệ, quan hệ) thay vì giảm giá?"),
            ("Q1.7", "Rà soát đối thủ", "Ban lãnh đạo có định kỳ rà soát điểm mạnh và điểm yếu của các đối thủ cạnh tranh chính ít nhất mỗi năm một lần không?"),
            ("Q1.8", "Tốc độ đổi chiến lược", "Khi thị trường có biến động lớn, công ty có đưa ra quyết định điều chỉnh kế hoạch kinh doanh trong vòng 30 ngày không?"),
            ("Q1.9", "Chỉ số đo chiến lược", "Công ty có bảng theo dõi các chỉ số KPI/OKR định kỳ hàng tháng để kiểm soát tiến độ thực hiện chiến lược không?"),
            ("Q1.10", "Thời gian ra quyết định", "Ban lãnh đạo có đưa ra quyết định dứt khoát về các cơ hội kinh doanh mới trong vòng 2 tuần không?")
        ]),
        ("Chuyên đề 2: Lãnh đạo (Leadership) — [Khung thời gian: 3–6 tháng]", [
            ("Q2.1", "Nhất quán Nói và Làm", "Ban lãnh đạo có thực hiện đúng các cam kết đã công bố với nhân viên trong vòng 6 tháng qua không?"),
            ("Q2.2", "Ưu tiên và đo lường", "Các chỉ số công việc được lãnh đạo theo dõi hàng tuần có phản ánh đúng các ưu tiên cốt lõi của công ty không?"),
            ("Q2.3", "Kênh nhận phản hồi", "Ban lãnh đạo có duy trì kênh thu nhận ý kiến đóng góp từ nhân viên ít nhất 1 lần mỗi quý không?"),
            ("Q2.4", "Phát triển nhân viên", "Công ty có ngân sách hoặc thời lượng đào tạo dành riêng cho sự phát triển của nhân viên hàng năm không?"),
            ("Q2.5", "Xử lý quy định công bằng", "Khi có vi phạm nội quy, công ty có xử lý minh bạch theo quy trình đã ban hành mà không có ngoại lệ cả nể không?"),
            ("Q2.6", "Công nghệ điều hành", "Cấp quản lý có sử dụng phần mềm quản lý công việc số thay vì chỉ đạo miệng và giấy tờ thủ công không?"),
            ("Q2.7", "Xét duyệt tinh gọn", "Các đề xuất công việc định kỳ có quy trình xét duyệt tinh gọn (tối đa qua 2 cấp quản lý) không?"),
            ("Q2.8", "Tuyển chọn văn hóa", "Quy trình tuyển dụng có bước đánh giá mức độ phù hợp về giá trị văn hóa bên cạnh năng lực chuyên môn không?"),
            ("Q2.9", "Truyền thông thay đổi", "Khi triển khai quy trình mới, ban lãnh đạo có tổ chức buổi giải thích lý do và lộ trình cho toàn bộ nhân sự liên quan không?"),
            ("Q2.10", "Rà soát dự án", "Ban lãnh đạo có định kỳ đánh giá để quyết định dừng các sản phẩm/dự án không đạt chỉ tiêu sau 6 tháng không?")
        ]),
        ("Chuyên đề 3: Văn hóa thực thi (Culture) — [Khung thời gian: Hàng ngày/Hàng tuần]", [
            ("Q3.1", "An toàn nêu khó khăn", "Nhân viên có thoải mái chia sẻ các khó khăn thực tế trong cuộc họp mà không e ngại bị khiển trách không?"),
            ("Q3.2", "Ý kiến phản biện", "Nhân viên có chủ động đưa ra ý kiến phản biện mang tính xây dựng đối với các đề xuất của cấp trên không?"),
            ("Q3.3", "Tốc độ báo sự cố", "Khi phát sinh sai sót hoặc sự cố, thông tin có được báo cáo lên cấp trên trong vòng 4 giờ làm việc không?"),
            ("Q3.4", "Ý nghĩa công việc", "Nhân viên có hiểu rõ kết quả công việc hàng ngày của mình đóng góp gì cho khách hàng và tổ chức không?"),
            ("Q3.5", "Ghi nhận tiến bộ nhỏ", "Quản lý trực tiếp có thói quen ghi nhận các tiến bộ cụ thể của nhân viên trong tuần không?"),
            ("Q3.6", "Tìm nguyên nhân gốc rễ", "Khi công việc bị trễ hạn, đội ngũ có tập trung phân tích nguyên nhân quy trình thay vì né tránh bàn luận không?"),
            ("Q3.7", "Nhận trách nhiệm", "Khi xảy ra sai sót, nhân sự phụ trách có chủ động nhận phần trách nhiệm của mình trước khi phân tích yếu tố khách quan không?"),
            ("Q3.8", "Đề xuất giải pháp", "Khi báo cáo vấn đề khó khăn, nhân viên có chuẩn bị sẵn ít nhất một phương án giải quyết không?"),
            ("Q3.9", "Xử lý xung đột", "Công ty có quy trình xử lý minh bạch và nhất quán khi phát sinh xung đột hoặc hành vi vi phạm chuẩn mực ứng xử nội bộ không?"),
            ("Q3.10", "Tranh luận trong họp", "Các cuộc họp có diễn ra thảo luận cởi mở đa chiều trước khi đi đến quyết định cuối cùng không?")
        ]),
        ("Chuyên đề 4: Nhân sự HR (Human Resources) — [Khung thời gian: 3–12 tháng]", [
            ("Q4.1", "Thu hút chuyên gia", "Công ty có chính sách đãi ngộ cạnh tranh để thu hút các vị trí chuyên môn then chốt ngoài thị trường không?"),
            ("Q4.2", "Đào tạo hội nhập", "Nhân viên mới có được tham gia chương trình đào tạo hội nhập và hướng dẫn công việc bài bản trong tháng đầu không?"),
            ("Q4.3", "Cải thiện hiệu suất PIP", "Công ty có quy trình đánh giá định kỳ và kế hoạch cải thiện hiệu suất (PIP) rõ ràng đối với nhân sự chưa đạt chuẩn công việc không?"),
            ("Q4.4", "Ứng tuyển tự nhiên", "Công ty có nhận được hồ sơ ứng tuyển từ các ứng viên tiềm năng mà không hoàn toàn phụ thuộc vào đơn vị tuyển dụng ngoài?"),
            ("Q4.5", "Kèm cặp tại chỗ OJT", "Hoạt động phát triển kỹ năng có được thực hiện thông qua hình thức kèm cặp trực tiếp trên công việc (On-the-job training) không?"),
            ("Q4.6", "Đánh giá sau đào tạo", "Sau các khóa đào tạo, công ty có đánh giá sự thay đổi về chất lượng công việc của học viên sau 3 tháng không?"),
            ("Q4.7", "Quy hoạch kế thừa", "Công ty có danh sách nhân sự tiềm năng sẵn sàng thay thế cho các vị trí quản lý trọng yếu khi có biến động không?"),
            ("Q4.8", "Thưởng hiệu suất", "Công thức và tiêu chí tính tiền thưởng hiệu quả công việc có được công khai rõ ràng cho nhân viên từ đầu kỳ không?"),
            ("Q4.9", "Đãi ngộ phi tài chính", "Công ty có các chế độ đãi ngộ phi tài chính (ngày nghỉ linh hoạt, vinh danh, môi trường làm việc) được nhân viên đánh giá cao không?"),
            ("Q4.10", "HR hỗ trợ kinh doanh", "Bộ phận nhân sự có phối hợp định kỳ với các trưởng bộ phận để giải quyết bài toán định biên và chất lượng nhân lực không?")
        ]),
        ("Chuyên đề 5: Vận hành (Operations) — [Khung thời gian: Hàng ngày/Hàng tuần]", [
            ("Q5.1", "Chuẩn hóa quy trình", "Khi một dự án thành công, công ty có tài liệu hóa cách làm thành quy trình chuẩn (SOP) cho lần sau không?"),
            ("Q5.2", "Rút kinh nghiệm AAR", "Công ty có tổ chức buổi họp rút kinh nghiệm trong vòng 7 ngày sau khi kết thúc một sự kiện/chiến dịch lớn không?"),
            ("Q5.3", "Tiến độ Horenso", "Các bộ phận có duy trì việc cập nhật ngắn gọn tiến độ công việc hàng ngày (theo nguyên tắc Horenso) không?"),
            ("Q5.4", "Kế hoạch ưu tiên tuần", "Đầu mỗi tuần, các phòng ban có văn bản chốt danh sách các đầu việc ưu tiên cần hoàn thành trong tuần không?"),
            ("Q5.5", "Thời lượng họp 50p", "Các cuộc họp định kỳ trong công ty có kết thúc đúng giờ quy định (dưới 50 phút) không?"),
            ("Q5.6", "Biên bản phân công", "Tất cả các cuộc họp có biên bản ghi rõ: Tên đầu việc, Người chịu trách nhiệm chính và Hạn chót hoàn thành không?"),
            ("Q5.7", "Xác nhận khi giao việc", "Khi nhận việc, nhân viên có xác nhận lại cách hiểu về tiêu chuẩn kết quả mong muốn với người giao việc không?"),
            ("Q5.8", "Tiêu chuẩn đầu ra", "Mỗi bộ phận có bảng mô tả tiêu chuẩn chất lượng sản phẩm đầu ra (Output) cụ thể để bàn giao cho khâu tiếp theo không?"),
            ("Q5.9", "Đo phối hợp nội bộ", "Công ty có cơ chế định kỳ đánh giá mức độ phối hợp và hỗ trợ giữa các phòng ban nội bộ không?"),
            ("Q5.10", "SLA liên bộ phận", "Đánh giá hiệu suất định kỳ của các bộ phận có bao gồm chỉ số mức độ phối hợp và hỗ trợ lẫn nhau (SLA nội bộ) không?")
        ])
    ]
    
    for sec_title, q_list in sections:
        add_heading_2(doc, sec_title)
        table_q = doc.add_table(rows=len(q_list)+1, cols=3)
        table_q.cell(0, 0).paragraphs[0].add_run("Mã câu")
        table_q.cell(0, 1).paragraphs[0].add_run("Cấu trúc đo lường")
        table_q.cell(0, 2).paragraphs[0].add_run("Nội dung nhận định khảo sát (Thang 1–5 & N/A)")
        
        for idx, (qid, qcon, qtext) in enumerate(q_list):
            table_q.cell(idx+1, 0).paragraphs[0].add_run(qid)
            table_q.cell(idx+1, 1).paragraphs[0].add_run(qcon)
            table_q.cell(idx+1, 2).paragraphs[0].add_run(qtext)
            
        style_table(table_q, [0.8, 1.6, 4.4], [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT])
        add_paragraph(doc, "")

    doc.save(output_path)
    print(f"Created: {output_path}")

# ==============================================================================
# DOCUMENT 2: MASTER_PLAN_LAMSEP_SME_SURVEY_SPA.docx
# ==============================================================================
def create_master_plan_docx(output_path):
    doc = docx.Document()
    add_header_footer(doc, "MASTER IMPLEMENTATION PLAN V1.2 (PHASE 1 MVP)")
    
    add_title(
        doc,
        "MASTER IMPLEMENTATION PLAN V1.2",
        "KẾ HOẠCH TRIỂN KHAI TỔNG THỂ ỨNG DỤNG KHẢO SÁT THỰC THI SME (REACT + TS + VITE SPA)",
        "Phiên bản: v1.2 (Implementation Plan) | Workspace: c:\\Users\\vu.hoang\\.gemini\\antigravity\\scratch\\Lam-Sep"
    )
    
    add_callout(
        doc,
        "🎯 TRẠNG THÁI HIỆN TẠI & NGUỒN CHUẨN",
        "Trạng thái Codebase hiện tại: Chưa phát hiện codebase SPA (Zero code / Pre-initialization). Bản kế hoạch này là cơ sở kỹ thuật chuẩn bị xin phê duyệt Cấp độ 2 từ User để bắt đầu lập trình. Nguồn chuẩn duy nhất: SURVEY_DESIGN_CONTRACT_V1.md (v1.3).",
        bg_hex="EBF8FF", border_color="3182CE"
    )
    
    add_heading_1(doc, "1. MỤC TIÊU & PHÂN ĐỊNH RANH GIỚI 2 PHA")
    add_paragraph(doc, "• Pha 1 — MVP Client-Only (Trong phạm vi Plan này):", bold_prefix="Pha 1 (MVP): ")
    add_paragraph(doc, "Chạy 100% trong trình duyệt (React 18 + TypeScript + Vite). Không backend, không cơ sở dữ liệu. Sau khi tải gói tài nguyên tĩnh ban đầu cùng nguồn gốc, tuyệt đối không có network request ra external origin. Bộ câu hỏi 50 câu và ma trận KUBA là static schema. Xuất PDF A4 tiếng Việt tại chỗ bằng html2canvas + jspdf nhúng font Roboto Unicode (Apache License 2.0).")
    
    add_paragraph(doc, "• Pha 2 — Lead Generation & Multi-Tenant Platform (Ngoài phạm vi Plan này):", bold_prefix="Pha 2 (Enterprise): ")
    add_paragraph(doc, "Tích hợp lưu trữ Cloud, Google Sheets sync, Email report tự động, phân tích đối sánh Benchmark N >= 300 và so sánh 360 độ CEO vs Quản lý. Chỉ khởi động sau khi Phase 1 UAT hoàn thành và có phê duyệt riêng.")
    
    add_heading_1(doc, "2. DANH SÁCH FILE ĐƯỢC PHÉP TÁC ĐỘNG (FILE ALLOWLIST)")
    add_paragraph(doc, "Toàn bộ mã nguồn khi triển khai sẽ chỉ nằm trong thư mục allowlist sau:")
    
    table_f = doc.add_table(rows=9, cols=2)
    table_f.cell(0, 0).paragraphs[0].add_run("Thư mục / Tệp tin")
    table_f.cell(0, 1).paragraphs[0].add_run("Mô tả trách nhiệm & Chức năng")
    
    files_info = [
        ["package.json, vite.config.ts, tsconfig.json", "Cấu hình dự án React 18 + TypeScript + Vite"],
        ["public/fonts/Roboto-Regular.ttf, Roboto-Bold.ttf", "Font Unicode tiếng Việt chuẩn (Apache License 2.0 - Google Fonts)"],
        ["src/types/survey.ts, src/types/kuba.ts", "TypeScript Interfaces cho 50 câu hỏi, Pillar, Score, KUBA Actions"],
        ["src/data/surveyQuestions.ts, src/data/kubaMatrix.ts", "Static Schema 50 câu hỏi chuẩn canonical và ma trận KUBA"],
        ["src/engine/scoringEngine.ts, src/engine/bottleneck.ts", "Pure functions tính điểm Equal-pillar, %, phân hạng, Near-tie cluster"],
        ["src/components/ (Header, SurveySection, RadarChart...)", "Giao diện người dùng Mobile-first, biểu đồ HTML5 Canvas, KUBA overlay"],
        ["src/utils/pdfGenerator.ts, src/utils/storage.ts", "Xuất PDF client-side với font nhúng, Opt-in localStorage"],
        ["tests/scoring.test.ts, tests/bottleneck.test.ts", "Unit tests kiểm tra 100% logic điểm biên và nhóm điểm nghẽn"]
    ]
    for i, (fn, desc) in enumerate(files_info):
        table_f.cell(i+1, 0).paragraphs[0].add_run(fn)
        table_f.cell(i+1, 1).paragraphs[0].add_run(desc)
    style_table(table_f, [2.5, 4.3], [WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT])
    
    add_heading_1(doc, "3. CÁC GIAI ĐOẠN TRIỂN KHAI (PHASES)")
    add_paragraph(doc, "• Phase A — Setup & Core Engine Architecture: Khởi tạo React+TS+Vite, schema tĩnh, pure functions scoring & bottleneck, unit tests kiểm tra 100% logic biên.")
    add_paragraph(doc, "• Phase B — UI Components & Question Flow: Xây dựng giao diện Responsive Mobile-first, step-by-step 5 chuyên đề, nút chọn 1-5 sao và N/A, Opt-in localStorage.")
    add_paragraph(doc, "• Phase C — Visual Analytics & KUBA Overlay: Vẽ biểu đồ Radar 5 trục Canvas, hiển thị Nhóm điểm nghẽn suýt soát, Micro-module KUBA tương tác 1 chạm sinh Action Guide 2 chiều.")
    add_paragraph(doc, "• Phase D — Client PDF Export & Offline Bundle: Nhúng font Roboto TTF, xuất báo cáo PDF 2 trang A4 tiếng Việt sắc nét, build production và kiểm tra bundle độc lập.")
    
    add_heading_1(doc, "4. BỘ KIỂM THỬ CHẤP NHẬN (ACCEPTANCE TEST MATRIX TC-01 ĐẾN TC-14)")
    
    table_t = doc.add_table(rows=15, cols=4)
    table_t.cell(0, 0).paragraphs[0].add_run("Test ID")
    table_t.cell(0, 1).paragraphs[0].add_run("Tình huống kiểm thử")
    table_t.cell(0, 2).paragraphs[0].add_run("Dữ liệu đầu vào")
    table_t.cell(0, 3).paragraphs[0].add_run("Kết quả mong đợi")
    
    tests_data = [
        ["TC-01", "Toàn bộ 1 sao", "50 câu chọn 1 điểm", "Raw = 50, Total% = 0.0%, Cấp 1 (Khởi phát), Radar co về tâm."],
        ["TC-02", "Toàn bộ 5 sao", "50 câu chọn 5 điểm", "Raw = 250, Total% = 100.0%, Cấp 4 (Xuất sắc), Radar bung tối đa."],
        ["TC-03", "Biên Cấp 1 -> 2", "Raw = 124 vs 125 điểm", "124 điểm (49.6%) -> Cấp 1; 125 điểm (50.0%) -> Cấp 2."],
        ["TC-04", "Biên Cấp 2 -> 3", "Raw = 174 vs 175 điểm", "174 điểm (69.6%) -> Cấp 2; 175 điểm (70.0%) -> Cấp 3."],
        ["TC-05", "Biên Cấp 3 -> 4", "Raw = 212 vs 213 điểm", "212 điểm (84.8%) -> Cấp 3; 213 điểm (85.2%) -> Cấp 4."],
        ["TC-06", "Câu N/A hợp lệ", "1 trụ có 2 câu N/A, 8 câu 4 sao", "Mẫu số N_valid = 8, Trụ cột = 75.0%, không méo điểm."],
        ["TC-07", "Insufficient Data", "1 trụ có 6 câu N/A (>50%)", "Trụ cột báo [INSUFFICIENT DATA], chặn xuất Cấp độ tổng."],
        ["TC-08", "Nhóm Điểm nghẽn", "Vận hành 40%, Văn hóa 43%, khác 80%", "Trả về Nhóm Điểm Nghẽn gồm cả [Vận hành, Văn hóa] (chênh <=5%)."],
        ["TC-09", "KUBA Overlay", "Chọn stage 'Understand' cho điểm nghẽn", "Leader: Coach, Individual: Choose, không đổi điểm Radar."],
        ["TC-10", "Zero Network Egress", "DevTools Network tab khi làm bài", "Sau initial bundle load, 0 outbound request gửi answer/PII ra ngoài."],
        ["TC-11", "Xuất PDF Tiếng Việt", "Bấm nút xuất báo cáo PDF", "File PDF A4 hiển thị đúng font Unicode, không lỗi ô vuông/mojibake."],
        ["TC-12", "Opt-in LocalStorage", "Tích chọn lưu nháp -> Reload", "Khôi phục đúng các câu đã làm; tắt opt-in -> không lưu."],
        ["TC-13", "Nút Xóa sạch Dữ liệu", "Bấm 'Clear Data'", "Xóa toàn bộ câu trả lời trong state và localStorage về bài trắng."],
        ["TC-14", "Responsive Mobile", "Viewport 390x844 (Mobile)", "Giao diện hiển thị hoàn hảo, không tràn màn hình, nút bấm mượt mà."]
    ]
    for i, (tid, tname, tin, tout) in enumerate(tests_data):
        table_t.cell(i+1, 0).paragraphs[0].add_run(tid)
        table_t.cell(i+1, 1).paragraphs[0].add_run(tname)
        table_t.cell(i+1, 2).paragraphs[0].add_run(tin)
        table_t.cell(i+1, 3).paragraphs[0].add_run(tout)
    style_table(table_t, [0.8, 1.6, 1.8, 2.6], [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT])
    
    add_heading_1(doc, "5. CHIẾN LƯỢC QUAY LUI & RANH GIỚI PHÊ DUYỆT")
    add_paragraph(doc, "• Quy tắc Bảo vệ Workspace: Cấm tuyệt đối sử dụng git clean -fd hoặc git reset --hard để không làm mất tài liệu trong workspace.")
    add_paragraph(doc, "• Kế hoạch Rollback: Chỉ xóa các tệp/thư mục phát sinh trong allowlist (node_modules/, dist/, src/, public/fonts/) nếu quá trình cài đặt/build gặp sự cố.")
    add_paragraph(doc, "• Ranh giới Phê duyệt: Bắt buộc có sự phê duyệt trực tiếp của User (Cấp độ 2) trước khi chạy lệnh tạo dự án và cài package. Cấp độ 3 bắt buộc trước khi commit/push/deploy.")
    
    doc.save(output_path)
    print(f"Created: {output_path}")

# ==============================================================================
# PDF CONVERTER USING WIN32COM
# ==============================================================================
def convert_docx_to_pdf(docx_path, pdf_path):
    import win32com.client
    word = None
    try:
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        word.DisplayAlerts = False
        doc = word.Documents.Open(os.path.abspath(docx_path))
        # 17 = wdExportFormatPDF
        doc.ExportAsFixedFormat(
            os.path.abspath(pdf_path),
            17, # wdExportFormatPDF
            OpenAfterExport=False,
            OptimizeFor=0, # wdExportOptimizeForPrint
            CreateBookmarks=1 # wdExportCreateHeadingBookmarks
        )
        doc.Close(False)
        print(f"Converted to PDF: {pdf_path}")
        return True
    except Exception as e:
        print(f"Error converting {docx_path} to PDF: {e}")
        return False
    finally:
        if word:
            try:
                word.Quit()
            except:
                pass

if __name__ == "__main__":
    base_dir = r"C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep"
    
    f1_docx = os.path.join(base_dir, "SURVEY_DESIGN_CONTRACT_V1.docx")
    f1_pdf = os.path.join(base_dir, "SURVEY_DESIGN_CONTRACT_V1.pdf")
    
    f2_docx = os.path.join(base_dir, "MASTER_PLAN_LAMSEP_SME_SURVEY_SPA.docx")
    f2_pdf = os.path.join(base_dir, "MASTER_PLAN_LAMSEP_SME_SURVEY_SPA.pdf")
    
    print("Generating Document 1: SURVEY_DESIGN_CONTRACT_V1...")
    create_survey_design_contract_docx(f1_docx)
    convert_docx_to_pdf(f1_docx, f1_pdf)
    
    print("Generating Document 2: MASTER_PLAN_LAMSEP_SME_SURVEY_SPA...")
    create_master_plan_docx(f2_docx)
    convert_docx_to_pdf(f2_docx, f2_pdf)
    
    print("All tasks completed successfully!")

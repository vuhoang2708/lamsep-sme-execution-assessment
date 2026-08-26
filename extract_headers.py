import re, json

with open(r'C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\src\data\survey60Questions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

questions = re.findall(r"id:\s*'([^']+)',.*?shortName:\s*'([^']+)'", content, re.DOTALL)
print('Total questions found:', len(questions))

headers = [
    'Thời Gian Gửi',
    'Họ và Tên',
    'Email Nhận Báo Cáo',
    'Số Điện Thoại / Zalo',
    'Tên Doanh Nghiệp',
    'Chức Vụ',
    'Phòng Ban',
    'Ngành Nghề',
    'Quy Mô Nhân Sự',
    'Doanh Thu Năm',
    'Điểm Chuẩn Hóa (%)',
    'Phân Hạng Trưởng Thành',
    'Điểm Nghẽn Trọng Yếu (Liebig)',
    '1. Chiến Lược (%)',
    '2. Lãnh Đạo (%)',
    '3. Văn Hóa (%)',
    '4. Nhân Lực (%)',
    '5. Vận Hành (%)',
    '6. Hiệu Suất (%)',
    'Trạng Thái Tư Vấn'
]

for idx in range(1, 7):
    p_qs = re.findall(rf"id:\s*'Q{idx}\.(\d+)',.*?shortName:\s*'([^']+)'", content, re.DOTALL)
    for q_num, short_name in p_qs:
        headers.append(f'Q{idx}.{q_num}: {short_name}')

print('Total headers:', len(headers))
with open(r'C:\Users\vu.hoang\.gemini\antigravity\scratch\Lam-Sep\scratch_headers.json', 'w', encoding='utf-8') as f:
    json.dump(headers, f, ensure_ascii=False, indent=2)

print('Saved scratch_headers.json')

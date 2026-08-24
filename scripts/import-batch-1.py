import json
import os
from pathlib import Path

ROOT = Path(os.environ.get('WORKBOOK_ROOT', '/home/ubuntu/english-48-day-workbook'))
source_path = ROOT / 'data' / 'days.json'
client_path = ROOT / 'client' / 'src' / 'data' / 'days.json'

data = json.loads(source_path.read_text(encoding='utf-8'))
by_day = {item['day']: item for item in data['days']}
data['version'] = '0.2-source-batch-1'

updates = {
    1: {
        'title': 'Thể khẳng định và phủ định của động từ to be',
        'level': 'FOUNDATION',
        'status': 'ready',
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 1. Link BÀI HỌC là video YouTube, chưa có transcript được xác minh; tài liệu gốc không có các phần nghe/nói/viết theo schema workbook. Quiz gốc trên trang đáp án là dạng điền/viết, không tự chuyển thành trắc nghiệm options. Các mảng không tương thích được để trống, không dùng nội dung tương đương.',
        'warmupScript': 'I am a student.\nHe is a teacher.\nThey are happy.',
        'grammarContent': '<p><strong>To be ở hiện tại</strong></p><p><strong>Thể khẳng định:</strong> I am; You / We / They are; She / He / It is.</p><p><strong>Ví dụ:</strong> I am a student. (Tôi là học sinh.); He is a teacher. (Anh ấy là giáo viên.); They are happy. (Họ rất vui.)</p><p><strong>Cách sử dụng:</strong> To be + danh từ, mang nghĩa “là”; To be + tính từ, để mô tả tính chất, đặc điểm; To be + cụm trạng ngữ, để chỉ nơi chốn, thời gian.</p><p><strong>Thể phủ định:</strong> I am not; You / We / They are not; She / He / It is not.</p><p><strong>Ví dụ:</strong> I am not a student. (Tôi không phải học sinh.); He is not a teacher. (Anh ấy không phải giáo viên.); They are not happy. (Họ không vui.)</p><p><strong>Dạng viết tắt:</strong> I’m, She’s, He’s, It’s, You’re, We’re, They’re; I’m not; She’s not / isn’t; He’s not / isn’t; It’s not / isn’t.</p>',
        'listeningItems': [],
        'shadowingSentences': [],
        'writingPrompts': [],
        'quiz': [],
        'srsCards': [
            {'front': 'I ___ a student.', 'back': 'am'},
            {'front': 'He ___ a teacher.', 'back': 'is'},
            {'front': 'They ___ happy.', 'back': 'are'},
            {'front': 'They ___ not happy.', 'back': 'are'}
        ]
    },
    2: {
        'title': 'Thể nghi vấn của động từ to be',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 2. BÀI HỌC là video YouTube chưa có transcript được xác minh; Sheet không có đủ link FILE ĐỀ online/ĐÁP ÁN cho Ngày 2 trong manifest hiện có. Tài liệu gốc không có các phần nghe/nói/viết theo schema; quiz chưa nạp vì chưa có nguồn đáp án tương ứng.',
        'grammarContent': '<p><strong>Thể nghi vấn với to be ở hiện tại:</strong> chỉ cần đảo to be lên trước chủ ngữ.</p><p><strong>Ví dụ:</strong> Am I late? (Tôi có muộn không?); Is he a doctor? (Anh ấy là bác sĩ à?); Are they friends? (Họ là bạn à?)</p><p>Với this, that, these, those và there, cũng đảo to be lên trước chủ ngữ.</p><p><strong>Cách trả lời:</strong> Yes, ngôi + to be (khẳng định); No, ngôi + to be (phủ định).</p>',
        'listeningItems': [], 'shadowingSentences': [], 'writingPrompts': [], 'quiz': [],
        'srsCards': [{'front': '___ I late?', 'back': 'Am'}, {'front': '___ he a doctor?', 'back': 'Is'}, {'front': '___ they friends?', 'back': 'Are'}]
    },
    3: {
        'title': 'Câu hỏi Who và What với động từ to be',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 3. Đã tải trang ĐÁP ÁN online; phần quiz gốc có câu hỏi/giải thích nhưng schema hiện có chỉ hỗ trợ options trắc nghiệm nên chưa chuyển đổi để tránh tự tạo phương án. BÀI HỌC là video YouTube chưa có transcript được xác minh; tài liệu gốc không có các phần nghe/nói/viết theo schema.',
        'grammarContent': '<p><strong>Who</strong> dùng để bắt đầu câu hỏi về ai, người nào đó.</p><p><strong>Ví dụ:</strong> Who is she? (Cô ấy là ai?); Who are they? (Họ là ai?); Who are you? (Bạn là ai?); Who is he? – He is Nam.; Who is she? – She is my cousin.</p><p>Với this / that: Who is this? – It is Tuan.; Who is that? – It’s my grandmother.</p><p><strong>What</strong> dùng để bắt đầu câu hỏi về thứ gì, cái gì.</p><p><strong>Ví dụ:</strong> What is it? – It is my bag.; What are they? – They are my cats.; What is this? – It’s a desk.; What is that? – It’s a banana.; What are these? – They are shirts.; What are those? – They are her dogs.</p>',
        'listeningItems': [], 'shadowingSentences': [], 'writingPrompts': [], 'quiz': [],
        'srsCards': [{'front': '___ is she?', 'back': 'Who'}, {'front': '___ is it?', 'back': 'What'}, {'front': 'Who is this?', 'back': 'It is Tuan.'}]
    },
    4: {
        'title': 'Câu hỏi Where và When với động từ to be',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 4. Đã tải trang ĐÁP ÁN online; chưa chuyển câu hỏi sang options vì cần giữ nguyên hình thức nguồn. BÀI HỌC là video YouTube chưa có transcript được xác minh; tài liệu gốc không có các phần nghe/nói/viết theo schema.',
        'grammarContent': '<p><strong>Giới từ in / on / at</strong> được dùng để chỉ địa điểm và thời gian.</p><p><strong>Where</strong> hỏi về nơi chốn: Where is she? – She is in the kitchen.; Where are they? – They are at home.; Where is your bag? – It’s on the table.</p><p><strong>When</strong> hỏi về thời gian: When is the English class? – It’s at 3.00 in the afternoon.; When is your exam? – It’s on Monday.</p>',
        'listeningItems': [], 'shadowingSentences': [], 'writingPrompts': [], 'quiz': [],
        'srsCards': [{'front': '___ is she?', 'back': 'Where'}, {'front': '___ is the English class?', 'back': 'When'}, {'front': 'Where is your bag?', 'back': 'It’s on the table.'}]
    },
    5: {
        'title': 'Động từ thường ở hiện tại',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 5. Đã tải trang ĐÁP ÁN online với các câu hỏi 1–20; chưa chuyển sang options vì cần giữ nguyên dạng bài và đáp án nguồn. BÀI HỌC là video YouTube chưa có transcript được xác minh; tài liệu gốc không có các phần nghe/nói/viết theo schema.',
        'grammarContent': '<p><strong>Động từ thường</strong> là động từ diễn tả hành động của người hoặc vật.</p><p><strong>Cách chia động từ thường ở hiện tại thể khẳng định:</strong> với chủ ngữ I / You / We / They, động từ giữ nguyên; với He / She / It, động từ thường thêm s hoặc es.</p><p><strong>Quy tắc thêm s / es:</strong> watch → watches; study → studies; play → plays; dance → dances; go → goes; do → does; visit → visits; wash → washes.</p>',
        'listeningItems': [], 'shadowingSentences': [], 'writingPrompts': [], 'quiz': [],
        'srsCards': [{'front': 'She ___ letters to her friends.', 'back': 'writes'}, {'front': 'They ___ books before bedtime.', 'back': 'read'}, {'front': 'watch → ?', 'back': 'watches'}, {'front': 'study → ?', 'back': 'studies'}, {'front': 'go → ?', 'back': 'goes'}]
    }
}

OPTIONAL_ARRAY_FIELDS = {'listeningItems', 'shadowingSentences', 'writingPrompts', 'quiz'}


def merge_source_fields(target, patch):
    for field, value in patch.items():
        # An empty array means “source not available”, not “erase prior work”.
        if field in OPTIONAL_ARRAY_FIELDS and isinstance(value, list) and not value:
            continue
        target[field] = value
    for field in OPTIONAL_ARRAY_FIELDS:
        target.setdefault(field, [])


for day, patch in updates.items():
    merge_source_fields(by_day[day], patch)

payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Updated days:', ', '.join(map(str, updates)))
print('Root:', source_path)
print('Client:', client_path)

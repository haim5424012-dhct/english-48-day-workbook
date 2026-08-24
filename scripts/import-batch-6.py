import json
import os
from pathlib import Path

ROOT = Path(os.environ.get('WORKBOOK_ROOT', '/home/ubuntu/english-48-day-workbook'))
source_path = ROOT / 'data' / 'days.json'
client_path = ROOT / 'client' / 'src' / 'data' / 'days.json'
OPTIONAL_ARRAY_FIELDS = {'listeningItems', 'shadowingSentences', 'writingPrompts', 'quiz'}


def merge_source_fields(target, patch):
    for field, value in patch.items():
        if field in OPTIONAL_ARRAY_FIELDS and isinstance(value, list) and not value:
            continue
        target[field] = value
    for field in OPTIONAL_ARRAY_FIELDS:
        target.setdefault(field, [])


data = json.loads(source_path.read_text(encoding='utf-8'))
by_day = {item['day']: item for item in data['days']}

patches = {
    26: {
        'title': 'Câu điều kiện loại 1', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ, PDF FILE ĐỀ online và đáp án công khai Ngày 26 từ các nguồn trong Google Sheet, lưu tại source-extracts/batch-6/. Lý thuyết xác nhận câu điều kiện loại 1: If + hiện tại đơn, will/can/should + V; có unless, in case, as long as. Đề online gồm 10 câu chia dạng động từ và 10 MCQ, mỗi MCQ 2 lựa chọn; chưa ánh xạ quiz chính thức. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết: source-extracts/batch-6/ngay-26.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Câu điều kiện loại 1:</strong> dùng để diễn tả tình huống có khả năng xảy ra ở hiện tại hoặc tương lai. Cấu trúc: <em>If + S + V hiện tại đơn, S + will + V nguyên thể</em>. Vế chính cũng có thể dùng <em>can</em> hoặc <em>should</em>.</p><p><strong>Cấu trúc thay thế:</strong> <em>unless</em> = nếu không; <em>in case</em> = phòng khi; <em>as long as</em> = miễn là.</p><p>Ví dụ nguồn: <em>If it doesn’t rain tomorrow, we will go to the zoo.</em> <em>If you don’t know, you should ask your teacher.</em> <em>Unless you help him, he won’t finish it.</em></p>',
        'srsCards': [
            {'front': 'If it doesn’t rain tomorrow, we ___ go to the zoo.', 'back': 'will'},
            {'front': 'If you don’t know, you ___ ask your teacher.', 'back': 'should'},
            {'front': '___ you help him, he won’t finish it.', 'back': 'Unless'},
            {'front': 'I will give you the key ___ I’m not at home.', 'back': 'in case'},
            {'front': 'You can go as long as you ___ home at 9.30.', 'back': 'get'},
        ],
    },
    27: {
        'title': 'Câu điều kiện loại 2', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ, PDF FILE ĐỀ online và đáp án công khai Ngày 27 từ các nguồn trong Google Sheet, lưu tại source-extracts/batch-6/. Lý thuyết xác nhận câu điều kiện loại 2: If + quá khứ đơn, would/could + V; to be dùng were với mọi ngôi. Đề online gồm 10 câu chia dạng động từ và 10 MCQ, mỗi MCQ 2 lựa chọn; chưa ánh xạ quiz chính thức. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết: source-extracts/batch-6/ngay-27.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Câu điều kiện loại 2:</strong> dùng để diễn tả tình huống không có thực ở hiện tại hoặc tương lai. Cấu trúc: <em>If + S + V quá khứ đơn, S + would + V nguyên thể</em>.</p><p>Trong mệnh đề <em>if</em>, động từ <em>to be</em> dùng <em>were</em> với tất cả các ngôi. Ở mệnh đề chính có thể dùng <em>could</em> thay cho <em>would</em>.</p><p>Ví dụ nguồn: <em>If she had a cat, she would be very happy.</em> <em>If he were tall, he could join the basketball team.</em></p>',
        'srsCards': [
            {'front': 'If she had a cat, she ___ be very happy.', 'back': 'would'},
            {'front': 'If he ___ tall, he could join the basketball team.', 'back': 'were'},
            {'front': 'If I ___ the lottery, I would buy a new house.', 'back': 'won'},
            {'front': 'If I were you, I ___ lend him money.', 'back': 'wouldn’t'},
            {'front': 'If I had a laptop, I ___ type this letter.', 'back': 'could'},
        ],
    },
    28: {
        'title': 'Câu điều kiện loại 3', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ, PDF FILE ĐỀ online và đáp án công khai Ngày 28 từ các nguồn trong Google Sheet, lưu tại source-extracts/batch-6/. Lý thuyết xác nhận câu điều kiện loại 3: If + had + V3, would/could have + V3. Đề online gồm 5 câu chia dạng động từ và 15 MCQ, mỗi MCQ 2 lựa chọn; chưa ánh xạ quiz chính thức. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết: source-extracts/batch-6/ngay-28.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Câu điều kiện loại 3:</strong> dùng để diễn tả tình huống không có thực ở quá khứ. Cấu trúc: <em>If + S + had + V-ed/cột 3, S + would have + V-ed/cột 3</em>.</p><p>Ở mệnh đề chính có thể dùng <em>could have</em> thay cho <em>would have</em>.</p><p>Ví dụ nguồn: <em>If it hadn’t rained yesterday, we would have gone camping.</em> <em>If I hadn’t been ill, I could have gone to the party.</em></p>',
        'srsCards': [
            {'front': 'If it hadn’t rained yesterday, we ___ have gone camping.', 'back': 'would'},
            {'front': 'If I hadn’t been ill, I ___ have gone to the party.', 'back': 'could'},
            {'front': 'If they had gone to the beach, they would have ___.', 'back': 'enjoyed'},
            {'front': 'If she had studied hard, she ___ have passed the exam.', 'back': 'would'},
            {'front': 'If he hadn’t got up late, he would have ___ the bus.', 'back': 'caught'},
        ],
    },
    29: {
        'title': 'Luyện nghe điền từ', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ, PDF FILE ĐỀ online và đáp án/transcript công khai Ngày 29 từ các nguồn trong Google Sheet, lưu tại source-extracts/batch-6/. Nội dung tập trung vào hỏi tên, đánh vần, số điện thoại, lớp học, hoạt động và vị trí. Đề online gồm 24 chỗ trống nghe điền, phụ thuộc mp3.1–mp3.6; chưa ánh xạ listeningItems/quiz chính thức. BÀI HỌC là video chưa có transcript; audio/video gốc không được nhúng. Chi tiết: source-extracts/batch-6/ngay-29.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Mẫu hỏi thông dụng:</strong> <em>What’s your name?</em>, <em>What’s your family name?</em>, <em>What’s your first name?</em>, <em>How do you spell your name?</em>, <em>Can you spell that?</em>, <em>What’s your phone number?</em> và <em>Which class are you in?</em></p><p>Bài luyện yêu cầu nghe và điền tên, số điện thoại, lớp học, hoạt động hoặc vị trí. Transcript nguồn được lưu để đối chiếu, nhưng không thay thế audio tương tác.</p>',
        'srsCards': [
            {'front': 'What’s your ___ name?', 'back': 'first'},
            {'front': 'How do you ___ your name?', 'back': 'spell'},
            {'front': 'What’s your ___ number?', 'back': 'phone'},
            {'front': 'Which ___ are you in?', 'back': 'class'},
            {'front': 'Can you ___ that?', 'back': 'spell'},
        ],
    },
    30: {
        'title': 'Luyện nghe chép chính tả', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ, PDF FILE ĐỀ online và đáp án công khai Ngày 30 từ các nguồn trong Google Sheet, lưu tại source-extracts/batch-6/. Lý thuyết định nghĩa dictation và nêu 4 bước: chọn nguồn phù hợp, chép lại, đối chiếu script, luyện đọc và dịch. Đề online gồm 6 nhóm nghe điền với 19 chỗ trống, phụ thuộc mp3.1–mp3.6; chưa ánh xạ listeningItems/quiz chính thức. Thư mục nguồn còn audio nhưng không tải/nhúng audio/video gốc. Chi tiết: source-extracts/batch-6/ngay-30.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Nghe chép chính tả</strong> là kỹ thuật nghe một đoạn văn được đọc to và viết lại chính xác nhất có thể.</p><p><strong>Bốn bước nguồn:</strong> tìm nguồn nghe phù hợp với năng lực; nghe và chép lại toàn bộ nội dung; đối chiếu phần chép với script; luyện đọc lại script và dịch.</p><p>Các đoạn luyện nguồn xoay quanh bạn bè, trường học, gia đình, nghề nghiệp, phương tiện và hoạt động hằng ngày.</p>',
        'srsCards': [
            {'front': 'Dictation là nghe và ___ lại nội dung.', 'back': 'viết/chép'},
            {'front': 'Bước 1: Tìm nguồn nghe phù hợp với ___.', 'back': 'năng lực'},
            {'front': 'Bước 2: Nghe và chép lại toàn bộ nội dung bài ___.', 'back': 'nghe'},
            {'front': 'Bước 3: Đối chiếu phần chép với ___.', 'back': 'script'},
            {'front': 'Bước 4: Luyện đọc lại script và ___.', 'back': 'dịch'},
        ],
    },
}

for day, patch in patches.items():
    merge_source_fields(by_day[day], patch)

data['version'] = '0.6-source-batch-6'
payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Imported days:', ', '.join(map(str, patches)))

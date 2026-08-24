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
    46: {
        'title': 'Kỹ năng Note-taking', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và ĐÁP ÁN Ngày 46 từ Drive, cùng PDF đề online trong folder theo manifest Batch 10, lưu tại source-extracts/batch-10/. Nội dung định nghĩa note-taking là ghi ngắn gọn thông tin vừa nghe và luyện dùng bản note để chọn đáp án. Đề online có 8 câu nghe chọn 3 lựa chọn và 5 mệnh đề nghe đánh dấu True/False; các bài nghe phụ thuộc mp3. Không tải hoặc nhúng audio/video gốc. Chi tiết: source-extracts/batch-10/ngay-46.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Note-taking:</strong> là ghi lại những thông tin ta vừa nghe được một cách vắn tắt.</p><p><strong>Kỹ thuật:</strong> ghi từ khóa và thông tin chính thay vì chép toàn bộ; sau đó dùng bản note để suy ra hoặc kiểm tra các dữ kiện trong đoạn nghe.</p><p><strong>Luyện tập:</strong> đọc/nghe đoạn hội thoại hoặc đoạn văn, ghi lại thông tin chính bằng note-taking rồi sử dụng bản note để trả lời câu hỏi.</p>',
        'srsCards': [
            {'front': 'Note-taking là gì?', 'back': 'Ghi lại những thông tin vừa nghe được một cách vắn tắt.'},
            {'front': 'Khi note-taking, cần ghi lại điều gì?', 'back': 'Những thông tin chính/từ khóa.'},
            {'front': 'Sau khi tạo bản note, ta dùng bản note để làm gì?', 'back': 'Suy ra thông tin hoặc lựa chọn đáp án.'},
            {'front': 'The girl is ___ years old. (nguồn đề online)', 'back': 'Câu nghe cần audio mp3.1; chưa ghi đáp án suy đoán.'},
            {'front': 'The man travels to work by ___. (nguồn đề online)', 'back': 'Câu nghe cần audio mp3.3; chưa ghi đáp án suy đoán.'},
        ],
    },
    47: {
        'title': 'Kỹ năng Paraphrasing', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và ĐÁP ÁN Ngày 47 từ Drive, cùng PDF đề online trong folder theo manifest Batch 10, lưu tại source-extracts/batch-10/. PDF định nghĩa paraphrasing là diễn đạt khác nhưng không đổi nghĩa. Đề online có câu chọn cách diễn đạt tương đương, câu nghe chọn 2 lựa chọn và mệnh đề True/False; PDF đề online đã được kiểm tra trực quan vì text extract chủ yếu là watermark. Các bài nghe phụ thuộc mp3. Không tải hoặc nhúng audio/video gốc. Chi tiết: source-extracts/batch-10/ngay-47.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Paraphrasing:</strong> là cách diễn đạt khác so với cách diễn đạt ban đầu mà nghĩa không đổi.</p><p>Khi paraphrase, cần giữ nguyên thông tin và ý nghĩa của câu gốc nhưng có thể thay đổi từ vựng hoặc cấu trúc diễn đạt theo ví dụ trong tài liệu.</p><p>Đề online luyện nhận diện câu tương đương, nghe chọn đáp án và đánh dấu True/False; các dạng này chưa được chuyển vào quiz chính thức.</p>',
        'srsCards': [
            {'front': 'Paraphrasing là gì?', 'back': 'Diễn đạt khác so với cách diễn đạt ban đầu mà nghĩa không đổi.'},
            {'front': 'Mục tiêu chính khi paraphrase là gì?', 'back': 'Giữ nguyên nghĩa của câu gốc.'},
            {'front': 'Khi paraphrase, có thể thay đổi điều gì?', 'back': 'Từ vựng hoặc cấu trúc diễn đạt, nhưng không đổi nghĩa.'},
            {'front': 'She has some pets. (ví dụ trong nguồn)', 'back': 'Câu dùng để luyện diễn đạt lại cùng nghĩa.'},
            {'front': 'There are 4 people in her family. (ví dụ trong nguồn)', 'back': 'Câu dùng để luyện diễn đạt lại cùng nghĩa.'},
        ],
    },
    48: {
        'title': 'Tự tin giới thiệu bản thân và thuyết trình bằng tiếng Anh', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ Ngày 48 và PDF đề online trong folder theo manifest Batch 10, lưu tại source-extracts/batch-10/. Nội dung gồm từ vựng, mẫu câu và các bước giới thiệu/thuyết trình. Đề online có 7 chỗ trống trong bài giới thiệu bản thân và 8 chỗ trống trong bài thuyết trình, phụ thuộc mp3.1–mp3.2. Hyperlink ĐÁP ÁN trong Sheet trùng file ID với Ngày 47 nên chưa coi là đáp án độc lập của Ngày 48. Không tải hoặc nhúng audio/video gốc. Chi tiết: source-extracts/batch-10/ngay-48.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Cấu trúc bài thuyết trình:</strong> mở đầu, giới thiệu chủ đề, nêu số phần, trình bày từng phần, chuyển ý, kết thúc và trả lời câu hỏi.</p><p><strong>Mẫu câu nguồn:</strong> <em>My topic today is ...</em>; <em>There are ... parts in my presentation.</em>; <em>And that’s all.</em>; <em>Thank you for listening.</em>; <em>If you have any questions, I’ll be happy to answer them now.</em></p><p>Đề online luyện nghe điền từ trong phần giới thiệu bản thân và bài thuyết trình về việc học tiếng Anh.</p>',
        'srsCards': [
            {'front': 'My topic today is ___.', 'back': 'Mẫu giới thiệu chủ đề trong bài thuyết trình.'},
            {'front': 'There are two ___ in my presentation.', 'back': 'parts'},
            {'front': 'I’m going to ___ about learning English.', 'back': 'talk'},
            {'front': 'Thank you for ___.', 'back': 'listening'},
            {'front': 'If you have any ___, I’ll be happy to answer them now.', 'back': 'questions'},
        ],
    },
}

for day, patch in patches.items():
    if day not in by_day:
        raise KeyError(f'Missing in 48-day workbook: {day}')
    merge_source_fields(by_day[day], patch)

# Ngày 49–50 intentionally do not exist in this 48-day workbook.
data['version'] = '1.0-source-batch-10'
payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Imported days:', ', '.join(map(str, patches)))
print('Workbook boundary preserved: 48 days; no days 49–50 created.')

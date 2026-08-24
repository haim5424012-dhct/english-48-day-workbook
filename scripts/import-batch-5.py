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
    21: {
        'title': 'Luyện nghe số và tên',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 21 từ Drive, lưu tại source-extracts/batch-5/. Lý thuyết gồm cách đọc số lớn, số điện thoại (0 có thể đọc zero hoặc oh), bảng chữ cái/phiên âm và cấu trúc first name + family name. Đề online gồm chọn số 5 câu, viết số 6 câu, viết số điện thoại 5 câu, chọn chữ cái 5 câu, viết chữ cái 5 câu và viết tên 5 câu; nhiều phần phụ thuộc audio mp3 chưa được tải hoặc nhúng. PDF ĐÁP ÁN đã tải nhưng text extraction chỉ có watermark/metadata, không suy đoán đáp án. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết: source-extracts/batch-5/ngay-21-25-artifact-notes.md.',
        'grammarContent': '<p><strong>Nghe số:</strong> Với số đếm lớn, chia thành các hàng nghìn, trăm và chục. Ví dụ nguồn: 186 = one hundred and eighty-six; 745 = seven hundred and forty-five; 1,032 = one thousand and thirty-two.</p><p><strong>Số điện thoại:</strong> Thường đọc ngắt thành cụm 3–4 số; số 0 có thể đọc là <em>zero</em> hoặc <em>oh</em>.</p><p><strong>Nghe tên:</strong> Bảng chữ cái tiếng Anh có cách đọc riêng, ví dụ A /eɪ/, B /biː/, I /aɪ/, J /dʒeɪ/, W /ˈdʌbljuː/, Z /zed/ hoặc /ziː/. Tên người thường gồm tên gọi và họ: <em>first name + family name</em>, ví dụ Louis Thomas, Paul Smith.</p>',
        'srsCards': [
            {'front': '186 = ___', 'back': 'one hundred and eighty-six'},
            {'front': '1,032 = ___', 'back': 'one thousand and thirty-two'},
            {'front': 'Số 0 trong số điện thoại có thể đọc là ___ hoặc ___.', 'back': 'zero; oh'},
            {'front': 'W /___/', 'back': 'ˈdʌbljuː'},
            {'front': 'first name + ___', 'back': 'family name'},
        ],
    },
    22: {
        'title': 'Động từ khuyết thiếu',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 22 từ Drive, đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. Grammar nguồn gồm must/have to, mustn’t/don’t have to, can/could, may/might, should/shouldn’t, needn’t và will/shall; động từ sau modal giữ nguyên dạng. Đề online có 20 MCQ 2 lựa chọn; chưa ánh xạ quiz chính thức. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết: source-extracts/batch-5/ngay-22-notes.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Quy tắc chung:</strong> Động từ sau động từ khuyết thiếu luôn giữ nguyên dạng. Modal có thể diễn tả khả năng, bắt buộc, khuyên bảo, cần thiết hoặc cho phép.</p><p><strong>Nhóm modal:</strong> <em>must/have to</em> = phải; <em>mustn’t</em> = không được phép; <em>don’t have to/needn’t</em> = không cần; <em>can/could</em> = có thể; <em>may/might</em> = có khả năng; <em>should/shouldn’t</em> = nên/không nên; <em>will/shall</em> diễn tả khả năng tương lai, trong đó <em>shall</em> dùng với I/we và có thể dùng để đề nghị.</p><p>Ví dụ nguồn: <em>You mustn’t touch the wall.</em> <em>You don’t have to water these plants.</em> <em>It may rain soon.</em> <em>You should exercise.</em> <em>Shall I call him?</em></p>',
        'srsCards': [
            {'front': 'You mustn’t ___ the wall.', 'back': 'touch'},
            {'front': 'You don’t have to ___ these plants.', 'back': 'water'},
            {'front': 'It may ___ soon.', 'back': 'rain'},
            {'front': 'You should ___.', 'back': 'exercise'},
            {'front': 'Shall I ___ him?', 'back': 'call'},
        ],
    },
    23: {
        'title': 'Liên từ and, but, or, so và because',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 23 từ Drive, đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. Grammar nguồn phân biệt and, but, or, so và because. Đề online có 5 câu điền một từ từ hộp liên từ và 15 MCQ 2 lựa chọn; chưa ánh xạ quiz chính thức. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết: source-extracts/batch-5/ngay-23-notes.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>And</strong> nối hai thành phần cùng loại với nghĩa “và”; <strong>but</strong> nối hai thành phần cùng loại để thể hiện sự trái ngược; <strong>or</strong> thể hiện sự lựa chọn.</p><p><strong>So</strong> nối hai mệnh đề để chỉ kết quả. <strong>Because</strong> đứng trước một mệnh đề để chỉ lý do, có thể ở đầu hoặc giữa câu; khi đã dùng <em>because</em> thì không dùng <em>so</em> trong cùng cấu trúc.</p><p>Ví dụ nguồn: <em>He is rich but he is unhappy.</em> <em>Do you want chocolate or ice cream?</em> <em>It rained heavily so I was late.</em> <em>Because it rained heavily, I couldn’t catch the bus.</em></p>',
        'srsCards': [
            {'front': 'my brother ___ I', 'back': 'and'},
            {'front': 'He is rich ___ he is unhappy.', 'back': 'but'},
            {'front': 'Do you want chocolate ___ ice cream?', 'back': 'or'},
            {'front': 'It rained heavily ___ I was late.', 'back': 'so'},
            {'front': 'I couldn’t catch the bus ___ it rained heavily.', 'back': 'because'},
        ],
    },
    24: {
        'title': 'Liên từ chỉ thời gian',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 24 từ Drive, đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. Grammar nguồn gồm when, as, as soon as, once, before, after, until, since và while. Đề online có 5 câu điền liên từ từ hộp và 15 MCQ 2 lựa chọn; chưa ánh xạ quiz chính thức. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết: source-extracts/batch-5/ngay-24-notes.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Liên từ thời gian:</strong> <em>when</em> và <em>as</em> = khi; <em>as soon as</em> và <em>once</em> = ngay khi; <em>before</em> = trước khi; <em>after</em> = sau khi; <em>until</em> = cho tới khi; <em>since</em> = kể từ khi; <em>while</em> = trong khi.</p><p>Ví dụ nguồn: <em>When she was young, she had a bad accident.</em> <em>I will call you once I arrive.</em> <em>He visited me before he left Nha Trang.</em> <em>I will call him after I have finished my homework.</em> <em>She cannot go out until she has finished the housework.</em> <em>She has been very busy since she started her new job.</em> <em>While I was cleaning the kitchen, he was watching TV.</em></p>',
        'srsCards': [
            {'front': 'I met her ___ I entered the shopping mall.', 'back': 'as'},
            {'front': 'I will call you ___ I arrive.', 'back': 'once'},
            {'front': 'He visited me ___ he left Nha Trang.', 'back': 'before'},
            {'front': 'She cannot go out ___ she has finished the housework.', 'back': 'until'},
            {'front': 'She has been busy ___ she started her new job.', 'back': 'since'},
        ],
    },
    25: {
        'title': 'Liên từ chỉ sự đối lập',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 25 từ Drive, đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. Grammar nguồn gồm although/even though/though và while/whereas; các liên từ này không dùng cùng but trong cùng cấu trúc. Đề online có 20 MCQ 2 lựa chọn; chưa ánh xạ quiz chính thức. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết: source-extracts/batch-5/ngay-25-notes.md, ngay-21-25-artifact-notes.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Although, even though, though</strong> đều mang nghĩa “mặc dù”, đứng trước một mệnh đề để thể hiện sự đối lập và không dùng <em>but</em> cùng câu. Chúng có thể đứng đầu hoặc giữa câu.</p><p><strong>While</strong> và <strong>whereas</strong> đều mang nghĩa “trong khi” để thể hiện sự đối lập; <em>while</em> có thể đứng đầu hoặc giữa câu, còn <em>whereas</em> thường đứng giữa câu. Không dùng <em>but</em> cùng cấu trúc.</p><p>Ví dụ nguồn: <em>Although he was busy, he still helped me.</em> <em>Even though Nam is short, he can play basketball very well.</em> <em>He was late though he ran very fast.</em> <em>While he is tall, his brother is short.</em> <em>She likes novels, whereas her brother hates them.</em></p>',
        'srsCards': [
            {'front': '___ he was busy, he still helped me.', 'back': 'Although'},
            {'front': '___ Nam is short, he can play basketball very well.', 'back': 'Even though'},
            {'front': 'He was late ___ he ran very fast.', 'back': 'though'},
            {'front': '___ he is tall, his brother is short.', 'back': 'While'},
            {'front': 'She likes novels, ___ her brother hates them.', 'back': 'whereas'},
        ],
    },
}

for day, patch in patches.items():
    merge_source_fields(by_day[day], patch)

data['version'] = '0.5-source-batch-5'
payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Imported days:', ', '.join(map(str, patches)))

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
    41: {
        'title': 'Luyện nghe về các phương tiện giao thông', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và ĐÁP ÁN Ngày 41 từ Drive theo manifest Batch 9, lưu tại source-extracts/batch-9/. Nội dung có từ vựng phương tiện và mẫu hỏi đáp đi bằng phương tiện nào. Đề online có 7 câu chọn 2 lựa chọn và 9 chỗ trống nghe điền; các bài nghe phụ thuộc mp3. Không tải hoặc nhúng audio/video gốc. Chi tiết: source-extracts/batch-9/ngay-41.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Từ vựng phương tiện:</strong> <em>taxi, coach, van, truck, motorbike, tram, boat, airplane, helicopter, ship, traffic lights, traffic jam, island</em>.</p><p><strong>Hỏi và trả lời:</strong> <em>How do you go to/travel to/get to + địa điểm A?</em> — <em>I go to/travel to/get to + địa điểm A + by + phương tiện B.</em></p><p>Ví dụ nguồn: <em>How do you go to school? — I go to school by bus.</em> và <em>How did you get to the airport? — I got to the airport by taxi.</em>.</p>',
        'srsCards': [
            {'front': 'I go to school ___ bus.', 'back': 'by'},
            {'front': 'How do you go to the airport? — I go ___ taxi.', 'back': 'by'},
            {'front': 'A traffic ___ means there are many vehicles on the road.', 'back': 'jam'},
            {'front': 'A ___ is a small vehicle for carrying goods.', 'back': 'van'},
            {'front': 'An ___ can fly people from one country to another.', 'back': 'airplane'},
        ],
    },
    42: {
        'title': 'Luyện nghe về thể thao', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và ĐÁP ÁN Ngày 42 từ Drive theo manifest Batch 9, lưu tại source-extracts/batch-9/. Nội dung có từ vựng thể thao, dụng cụ, cách hỏi môn yêu thích và nói giỏi/không giỏi. Đề online có 7 câu chọn 2 lựa chọn, 4 chỗ trống và bảng đánh dấu/ghép theo người nói; các bài nghe phụ thuộc mp3. Không tải hoặc nhúng audio/video gốc. Chi tiết: source-extracts/batch-9/ngay-42.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Hỏi môn thể thao yêu thích:</strong> <em>What’s your favourite sport?</em> và <em>What sport do you like to play?</em>.</p><p><strong>Trả lời:</strong> <em>My favourite sport is + môn thể thao</em>; <em>I like/love + to V hoặc V-ing</em>; <em>I enjoy + V-ing</em>; <em>I am fond of/keen on + V-ing</em>. Ví dụ nguồn: <em>My favourite sport is volleyball.</em> và <em>I enjoy cycling.</em>.</p><p><strong>Thế mạnh/thế yếu:</strong> <em>I am good at + môn thể thao</em> và <em>I am bad at + môn thể thao</em>.</p>',
        'srsCards': [
            {'front': 'What’s your favourite ___? — My favourite sport is volleyball.', 'back': 'sport'},
            {'front': 'I enjoy ___.', 'back': 'cycling'},
            {'front': 'I am good ___ football.', 'back': 'at'},
            {'front': 'I am bad at ___ chess.', 'back': 'playing'},
            {'front': 'A ___ rod is used for fishing.', 'back': 'fishing'},
        ],
    },
    43: {
        'title': 'Luyện nghe về nghề nghiệp', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và ĐÁP ÁN Ngày 43 từ Drive theo manifest Batch 9, lưu tại source-extracts/batch-9/. Nội dung có từ vựng nghề nghiệp và mẫu hỏi đáp nghề nghiệp. Đề online có 8 câu chọn 2 lựa chọn, 5 chỗ trống và bảng đánh dấu/ghép theo người nói; các bài nghe phụ thuộc mp3. Không tải hoặc nhúng audio/video gốc. Chi tiết: source-extracts/batch-9/ngay-43.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Từ vựng nghề nghiệp:</strong> <em>driver, builder, cook, baker, policeman, farmer, hairdresser, tailor, painter, dancer, singer, architect, florist, musician, writer, pilot, flight attendant, barber, chef, engineer, guide</em>.</p><p><strong>Hỏi nghề nghiệp:</strong> <em>What is your job?</em> và <em>What do you do?</em>.</p><p><strong>Trả lời:</strong> <em>I am a/an + nghề nghiệp</em> hoặc <em>I work as a/an + nghề nghiệp</em>. Ví dụ nguồn: <em>I am an engineer.</em> và <em>I work as a chef.</em>.</p>',
        'srsCards': [
            {'front': 'I am an ___.', 'back': 'engineer'},
            {'front': 'I work as a ___.', 'back': 'chef'},
            {'front': 'A person who flies an airplane is a ___.', 'back': 'pilot'},
            {'front': 'A person who designs buildings is an ___.', 'back': 'architect'},
            {'front': 'A person who cuts hair is a ___.', 'back': 'barber'},
        ],
    },
    44: {
        'title': 'Luyện nghe về công nghệ', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và ĐÁP ÁN Ngày 44 từ Drive theo manifest Batch 9, lưu tại source-extracts/batch-9/. Nội dung có từ vựng thiết bị điện tử, thiết bị gia dụng và các động từ download/turn off. Đề online có 7 câu chọn 2 lựa chọn và 13 chỗ trống nghe điền; các bài nghe phụ thuộc mp3. Không tải hoặc nhúng audio/video gốc. Chi tiết: source-extracts/batch-9/ngay-44.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Từ vựng công nghệ và thiết bị:</strong> <em>mobile phone, tablet, account, app, AI, mouse, microphone, MP3 player, headphones, Wi-Fi, air conditioner, washing machine, remote control, microwave, oven, iron, cooker, hairdryer, dishwasher, charger</em>.</p><p><strong>Động từ:</strong> <em>download</em> (tải xuống) và <em>turn off</em> (tắt đi). Nguồn dùng các thiết bị trong câu và đoạn nghe để nhận diện từ vựng.</p>',
        'srsCards': [
            {'front': 'I use a ___ to read books and documents.', 'back': 'tablet'},
            {'front': 'I listen to music with my ___.', 'back': 'headphones'},
            {'front': 'Please turn ___ the washing machine.', 'back': 'off'},
            {'front': 'I need a ___ for my mobile phone.', 'back': 'charger'},
            {'front': 'She downloaded an ___.', 'back': 'app'},
        ],
    },
    45: {
        'title': 'Tiếng Anh giao tiếp (2)', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và ĐÁP ÁN Ngày 45 từ Drive theo manifest Batch 9, lưu tại source-extracts/batch-9/. Nội dung gồm tám nhóm giao tiếp: cảm ơn, xin lỗi, chúc mừng, khen, yêu cầu, đề nghị, lời mời và lời chúc. PDF có Quiz 4 câu và Practice 15 câu, đều là lựa chọn 2 phương án; chưa ánh xạ quiz chính thức theo quyết định hiện hành. Không tải hoặc nhúng video gốc. Chi tiết: source-extracts/batch-9/ngay-45.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Cảm ơn:</strong> <em>Thank you/Thank you so much/Thanks a lot</em> — <em>You’re welcome/Don’t mention it/Not at all</em>. <strong>Xin lỗi:</strong> <em>I’m sorry/Oops! I’m sorry</em> — <em>It’s alright/Never mind/No problem/That’s okay</em>.</p><p><strong>Chúc mừng và khen:</strong> <em>Congratulations!</em> — <em>Thank you</em>; <em>Your new dress is beautiful.</em> — <em>Thank you</em> hoặc <em>It’s very nice of you to say so.</em>.</p><p><strong>Yêu cầu, đề nghị, mời và lời chúc:</strong> <em>Could you give me the book, please?</em> — <em>Here you are.</em>; <em>Shall we eat out?</em>/<em>How about playing football?</em> — <em>That’s a good/great idea.</em>; <em>Would you like to play chess with us?</em> — <em>Yes, I’d love to.</em>; <em>Merry Christmas!</em> — <em>Same to you!</em>.</p>',
        'srsCards': [
            {'front': 'Thank you. — You’re ___.', 'back': 'welcome'},
            {'front': 'I’m sorry. — Never ___.', 'back': 'mind'},
            {'front': 'Congratulations! — ___.', 'back': 'Thank you'},
            {'front': 'Could you give me the pen? — Here you ___.', 'back': 'are'},
            {'front': 'Would you like to play chess? — Yes, I’d love ___.', 'back': 'to'},
        ],
    },
}

for day, patch in patches.items():
    merge_source_fields(by_day[day], patch)

data['version'] = '0.9-source-batch-9'
payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Imported days:', ', '.join(map(str, patches)))

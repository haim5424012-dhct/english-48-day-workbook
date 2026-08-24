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
    36: {
        'title': 'Sự hòa hợp về thì', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ, FILE ĐỀ online và ĐÁP ÁN Ngày 36 từ các file Drive trong Google Sheet, lưu tại source-extracts/batch-8/. Lý thuyết nguồn trình bày since + hiện tại hoàn thành/quá khứ đơn, when với tương lai đơn + hiện tại đơn và quá khứ tiếp diễn + quá khứ đơn, by the time với tương lai hoàn thành + hiện tại đơn, cùng as soon as/once/until/as. Đề online có 20 câu, mỗi câu 2 lựa chọn; chưa ánh xạ quiz chính thức. Không nhúng audio/video gốc. Chi tiết: source-extracts/batch-8/ngay-36.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Sự hòa hợp về thì:</strong> Nguồn ghi <em>HTHT + since + QKĐ</em>, ví dụ <em>I haven’t met him since he left Vietnam.</em></p><p>Với <em>when</em>, nguồn ghi <em>TLĐ + when + HTĐ</em>, ví dụ <em>I will call her when I come.</em>, và <em>QKTD + when + QKĐ</em>, ví dụ <em>I was cooking when he came.</em></p><p>Với <em>by the time</em>, dùng <em>TLHT + by the time + HTĐ</em>, ví dụ <em>I will have finished my homework by the time he comes.</em>. Với <em>as soon as / once / until / as</em>, nguồn ghi <em>TLD + liên từ + HTĐ</em>. Không dùng thì tương lai đơn trong mệnh đề trạng ngữ chỉ thời gian.</p>',
        'srsCards': [
            {'front': 'I haven’t met him since he ___ Vietnam.', 'back': 'left'},
            {'front': 'I will call her when I ___.', 'back': 'come'},
            {'front': 'I was cooking when he ___.', 'back': 'came'},
            {'front': 'I will have finished my homework by the time he ___.', 'back': 'comes'},
            {'front': 'I will call him as soon as I ___ the housework.', 'back': 'finish'},
        ],
    },
    37: {
        'title': 'Tiếng Anh giao tiếp (1)', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và ĐÁP ÁN Ngày 37 từ nguồn Drive trong Google Sheet, lưu tại source-extracts/batch-8/. Nội dung nguồn gồm mẫu chào hỏi, hỏi đáp thời tiết và hỏi đường. Đề online có 11 chỗ trống nghe điền và 2 câu nghe chọn đáp án 2 lựa chọn; các chỗ trống phụ thuộc mp3. BÀI HỌC là YouTube chưa nhúng. Chi tiết: source-extracts/batch-8/ngay-37.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Chào hỏi:</strong> Nguồn dùng các mẫu <em>Hi/Hello</em>, <em>Good morning/afternoon/evening/night</em>, <em>Nice to meet you</em>, <em>How are you?</em>, <em>What’s up?</em>, <em>Excuse me</em>, <em>What’s your name?</em> và <em>See you later</em>.</p><p><strong>Thời tiết:</strong> Hỏi <em>What’s the weather like today?</em> hoặc <em>How’s the weather today?</em>; trả lời bằng <em>It is + tính từ chỉ thời tiết</em>, ví dụ <em>It’s sunny</em> và <em>It’s rainy</em>.</p><p><strong>Phương hướng:</strong> Hỏi <em>Excuse me, do you know where the A is?</em> hoặc <em>Excuse me, could you tell me how to get to A?</em>. Các cụm trả lời nguồn nêu gồm <em>turn left/right</em>, <em>go straight</em>, <em>cross the road</em>, <em>next to</em>, <em>opposite</em>, <em>in front of</em> và <em>behind</em>.</p>',
        'srsCards': [
            {'front': 'Nice to ___ you.', 'back': 'meet'},
            {'front': 'What’s the weather like today? — It’s ___.', 'back': 'sunny'},
            {'front': 'Go straight and turn ___.', 'back': 'right'},
            {'front': 'The city library is on your ___.', 'back': 'left'},
            {'front': 'The pharmacy is ___ the market.', 'back': 'next to'},
        ],
    },
    38: {
        'title': 'Liên từ tương hỗ', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ, FILE ĐỀ online và ĐÁP ÁN Ngày 38 từ các file Drive trong Google Sheet, lưu tại source-extracts/batch-8/. Lý thuyết nguồn trình bày either...or, neither...nor, both...and và not only...but also. Đề online có 20 câu, mỗi câu 2 lựa chọn; chưa ánh xạ quiz chính thức. Chi tiết: source-extracts/batch-8/ngay-38.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Liên từ tương hỗ:</strong> <em>either … or</em> diễn tả lựa chọn giữa hai thứ, ví dụ <em>You can choose either the red car or the blue car.</em></p><p><em>neither … nor</em> diễn tả hai đối tượng đều không có khả năng xảy ra, ví dụ <em>Neither Peter nor I attended the meeting.</em>. <em>both … and</em> đồng thời nhấn mạnh hai đối tượng, ví dụ <em>Both Henry and Mark go to school by bike.</em>.</p><p><em>not only … but also</em> đồng thời nhấn mạnh hai đặc điểm/đối tượng, ví dụ <em>He is not only rich but also handsome.</em>.</p>',
        'srsCards': [
            {'front': 'Either you ___ I have to go.', 'back': 'or'},
            {'front': '___ Sam and Linda were late.', 'back': 'Both'},
            {'front': 'Their flat is neither big ___ small.', 'back': 'nor'},
            {'front': 'He can speak both English ___ Chinese.', 'back': 'and'},
            {'front': 'She is not only beautiful ___ friendly.', 'back': 'but also'},
        ],
    },
    39: {
        'title': 'Luyện nghe về các quốc gia và châu lục', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã kiểm kê các thư mục FILE ĐỀ/đề online và PDF ĐÁP ÁN Ngày 39 từ Google Sheet. Artifact truy cập được gồm đề online và đáp án với 21 câu: chọn quốc gia/quốc tịch, điền thông tin và chọn đáp án về thành phố/nông thôn. Tại thời điểm kiểm kê chưa có PDF FILE ĐỀ lý thuyết tương ứng trong kho artifact, nên grammarContent không được suy đoán. Audio/video gốc không được tải hoặc nhúng. Chi tiết: source-extracts/batch-8/ngay-39.md và online-answer-extracts.md.',
        'srsCards': [
            {'front': 'What nationality are you? — I am ___.', 'back': 'American'},
            {'front': 'Where are you from? — I am from ___.', 'back': 'Australia'},
            {'front': 'What nationality are you? — I am ___.', 'back': 'British'},
            {'front': 'Clark is Japanese and works as a ___.', 'back': 'doctor'},
            {'front': 'The cities in Vietnam are noisy and ___.', 'back': 'crowded'},
        ],
    },
    40: {
        'title': 'Luyện nghe về sở thích', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ, đề online và ĐÁP ÁN Ngày 40 từ các file Drive trong Google Sheet, lưu tại source-extracts/batch-8/. Lý thuyết nguồn trình bày mẫu nói, hỏi và trả lời về sở thích; PDF có 6 bài nghe. Đề online gồm 5 câu chọn 2 lựa chọn, 4 chỗ trống, 3 câu chọn 2 lựa chọn và 3 mục đánh dấu/ghép; các phần nghe phụ thuộc mp3. Không nhúng audio/video gốc. Chi tiết: source-extracts/batch-8/ngay-40.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Nói về sở thích:</strong> Nguồn dùng <em>My hobby is + V-ing</em>, <em>I like/love + to V hoặc V-ing</em>, <em>I enjoy + V-ing</em> và <em>I am fond of/keen on + V-ing</em>. Ví dụ gồm <em>My hobby is playing chess</em>, <em>I enjoy cooking</em> và <em>I am keen on playing football</em>.</p><p><strong>Hỏi về sở thích:</strong> <em>What is your hobby?</em>, <em>What do you do in your free time?</em> và <em>What do you like to do in your free time?</em>. Câu trả lời nguồn dùng <em>My hobby is playing cards</em> và <em>I like to play/playing video games</em>.</p>',
        'srsCards': [
            {'front': 'My hobby is ___ chess.', 'back': 'playing'},
            {'front': 'I enjoy ___.', 'back': 'cooking'},
            {'front': 'I am fond ___ surfing the Net.', 'back': 'of'},
            {'front': 'Lucy is keen ___ listening to music.', 'back': 'on'},
            {'front': 'My brother ___ watching football on TV.', 'back': 'enjoys'},
        ],
    },
}

for day, patch in patches.items():
    merge_source_fields(by_day[day], patch)

data['version'] = '0.8-source-batch-8'
payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Imported days:', ', '.join(map(str, patches)))

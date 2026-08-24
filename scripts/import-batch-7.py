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
    31: {
        'title': 'Luyện nghe về giờ', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và FILE ĐỀ online Ngày 31 từ nguồn Google Sheet, lưu tại source-extracts/batch-7/. Lý thuyết nguồn trình bày cách nói giờ đúng, giờ hơn, giờ kém, giờ rưỡi và quarter past/to. Đề online có 10 câu nghe viết giờ, 8 MCQ 2 lựa chọn và 5 MCQ 3 lựa chọn; chưa ánh xạ quiz/listeningItems chính thức. BÀI HỌC là YouTube chưa có transcript; không nhúng media. ĐÁP ÁN blog đã đọc có transcript/đáp án hiển thị cho một số block. Chi tiết: source-extracts/batch-7/ngay-31.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Cách nói về giờ:</strong> giờ đúng dùng số giờ + <em>o’clock</em>, ví dụ <em>seven o’clock</em>. Giờ hơn có thể dùng số giờ + số phút hoặc số phút + <em>past</em> + số giờ, ví dụ <em>eight twenty five</em> và <em>five past four</em>.</p><p>Giờ kém có thể dùng số giờ + số phút hoặc số phút + <em>to</em> + số giờ, ví dụ <em>nine thirty-five</em> và <em>twenty to nine</em>. Với số phút nhỏ hơn 10, đọc cả số 0, ví dụ <em>seven oh five</em>.</p><p>Giờ rưỡi dùng <em>half past</em>; giờ hơn hoặc kém 15 phút dùng <em>a quarter past/to</em>. Ví dụ nguồn: <em>At half past ten.</em>, <em>At a quarter past seven.</em></p>',
        'srsCards': [
            {'front': '7:00 = seven ___', 'back': "o'clock"},
            {'front': '4:05 = five ___ four', 'back': 'past'},
            {'front': '8:40 = twenty ___ nine', 'back': 'to'},
            {'front': '9:30 = ___ past nine', 'back': 'half'},
            {'front': '7:15 = a quarter ___ seven', 'back': 'past'},
        ],
    },
    32: {
        'title': 'Luyện nghe ngày tháng', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và FILE ĐỀ online Ngày 32 từ nguồn Google Sheet, lưu tại source-extracts/batch-7/. Lý thuyết nguồn liệt kê 12 tháng, cách đọc/viết ngày tháng năm và giới từ on/in. Đề online có 9 MCQ 2 lựa chọn và 5 MCQ 3 lựa chọn; PDF bài học còn có các phần nghe viết ngày, năm và ngày-tháng chưa khớp schema. Chưa ánh xạ quiz/listeningItems chính thức. BÀI HỌC và các thư mục Drive chưa dùng media. ĐÁP ÁN blog đã đọc có transcript hội thoại. Chi tiết: source-extracts/batch-7/ngay-32.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Các tháng trong năm:</strong> January, February, March, April, May, June, July, August, September, October, November và December.</p><p><strong>Cách đọc năm:</strong> nguồn nêu ví dụ <em>seventeen fifty-six</em>, <em>nineteen ninety-nine</em> và các cách đọc năm sau 2000 như <em>two thousand twenty-three</em> hoặc <em>twenty twenty-three</em>. Ngày tháng có thể viết theo các mẫu nguồn như <em>November 4</em> và <em>4 November</em>.</p><p>Dùng <em>on</em> khi có cả ngày và tháng, <em>in</em> trước tháng và <em>in</em> trước năm. Ví dụ nguồn: <em>on July 15</em>, <em>in May</em>, <em>in 2023</em>.</p>',
        'srsCards': [
            {'front': 'Tháng 1 = ___', 'back': 'January'},
            {'front': 'Tháng 7 = ___', 'back': 'July'},
            {'front': 'Có cả ngày và tháng: dùng ___', 'back': 'on'},
            {'front': 'Trước tháng: dùng ___', 'back': 'in'},
            {'front': 'Trước năm: dùng ___', 'back': 'in'},
        ],
    },
    33: {
        'title': 'Luyện nghe địa điểm', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và FILE ĐỀ online Ngày 33 từ nguồn Google Sheet, lưu tại source-extracts/batch-7/. Nội dung nguồn gồm từ vựng địa điểm/con vật và bài nghe chọn địa điểm, điền địa điểm hoặc từ trong hội thoại. Đề online có 6 MCQ 2 lựa chọn và 9 chỗ trống không có options; chưa ánh xạ quiz/listeningItems chính thức. BÀI HỌC là YouTube chưa nhúng; ĐÁP ÁN blog đã đọc hiển thị các đáp án bank, box, bus, home, museum, post office, letter, gallery, return. Chi tiết: source-extracts/batch-7/ngay-33.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Từ vựng địa điểm:</strong> <em>library</em>, <em>post office</em>, <em>cinema</em>, <em>museum</em>, <em>book shop</em>, <em>bar</em>, <em>church</em>, <em>gallery</em>, <em>pharmacy</em>, <em>zoo</em>, <em>restaurant</em> và <em>police station</em>. Nguồn cũng nêu <em>elephant</em> và <em>tiger</em>.</p><p>Bài nghe luyện hỏi và trả lời địa điểm với các mẫu như <em>Where is Jack?</em>, <em>Where did Laura go yesterday?</em> và <em>Where did Peter see the elephant?</em>. Các phần điền từ phụ thuộc audio gốc.</p>',
        'srsCards': [
            {'front': 'library = ___', 'back': 'thư viện'},
            {'front': 'post office = ___', 'back': 'bưu điện'},
            {'front': 'pharmacy = ___', 'back': 'hiệu thuốc'},
            {'front': 'Where is Jack? — He is ___ the kitchen.', 'back': 'in'},
            {'front': 'Peter saw the elephant at the ___.', 'back': 'zoo'},
        ],
    },
    34: {
        'title': 'Luyện nghe về tiền bạc', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và FILE ĐỀ online Ngày 34 từ nguồn Google Sheet, lưu tại source-extracts/batch-7/. Lý thuyết nguồn trình bày How much + to be/cost, cách trả lời bằng số tiền và hai đơn vị dollar ($), pound (£). Đề online có 10 MCQ 3 lựa chọn và 8 chỗ trống nghe điền; trang đáp án được liên kết trong Sheet trả 404 nên không dùng để suy đoán đáp án. BÀI HỌC là YouTube chưa nhúng. Chi tiết: source-extracts/batch-7/ngay-34.md và online-answer-extracts.md.',
        'grammarContent': '<p><strong>Cách hỏi giá:</strong> <em>How much + to be + S?</em> hoặc <em>How much + trợ động từ + S + cost?</em>. Cách trả lời trong nguồn gồm <em>It is/They are + số tiền</em>, <em>It costs/They cost + số tiền</em> hoặc chỉ nêu số tiền.</p><p>Hai đơn vị tiền tệ thường gặp là <em>dollar</em> (đô la Mỹ), ký hiệu <em>$</em>, và <em>pound</em> (bảng Anh), ký hiệu <em>£</em>.</p>',
        'srsCards': [
            {'front': 'How much ___ the bag?', 'back': 'is'},
            {'front': 'How much does the printer ___?', 'back': 'cost'},
            {'front': 'It ___ £10.', 'back': 'costs'},
            {'front': 'dollar = ký hiệu ___', 'back': '$'},
            {'front': 'pound = ký hiệu ___', 'back': '£'},
        ],
    },
    35: {
        'title': 'Đại từ phản thân', 'level': 'NEXT', 'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và BÀI HỌC Ngày 35 từ nguồn Google Sheet, lưu tại source-extracts/batch-7/. Lý thuyết nguồn trình bày đại từ phản thân và cách dùng khi chủ ngữ/tân ngữ cùng chỉ một đối tượng, hoặc sau by với nghĩa tự mình/một mình. FILE ĐỀ online và ĐÁP ÁN Drive được liên kết ở hàng 106 nhưng cả hai mang tiêu đề Sự hoà hợp về thì, không khớp Đại từ phản thân; vì vậy không dùng chúng làm dữ liệu thi Ngày 35. Không nhúng video. Chi tiết: source-extracts/batch-7/ngay-35.md.',
        'grammarContent': '<p><strong>Đại từ phản thân:</strong> <em>myself</em>, <em>yourself/yourselves</em>, <em>ourselves</em>, <em>themselves</em>, <em>herself</em>, <em>himself</em> và <em>itself</em>.</p><p>Dùng đại từ phản thân khi chủ ngữ và tân ngữ của động từ cùng đề cập một đối tượng. Ví dụ nguồn: <em>I cut myself when I was using the knife.</em></p><p>Dùng sau <em>by</em> với nghĩa “tự mình, một mình”. Ví dụ nguồn: <em>He walks to school by himself.</em> và <em>She lived by herself.</em></p>',
        'srsCards': [
            {'front': 'I cut ___.', 'back': 'myself'},
            {'front': 'He hurt ___.', 'back': 'himself'},
            {'front': 'She cut ___.', 'back': 'herself'},
            {'front': 'They cleaned the bathroom by ___.', 'back': 'themselves'},
            {'front': 'I washed the dishes by ___.', 'back': 'myself'},
        ],
    },
}

for day, patch in patches.items():
    merge_source_fields(by_day[day], patch)

data['version'] = '0.7-source-batch-7'
payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Imported days:', ', '.join(map(str, patches)))

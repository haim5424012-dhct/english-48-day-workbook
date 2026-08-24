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
    16: {
        'title': 'Thì tương lai đơn',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ Ngày 16 và đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. PDF nguồn trình bày will + V nguyên thể, khẳng định/phủ định/nghi vấn, cách dùng cho dự đoán, quyết định, đề nghị, lời hứa và các dấu hiệu today/tomorrow/tonight/next.../soon. Bài online có 5 câu điền/chia, 5 câu trả lời ngắn theo hình và 10 MCQ 3 lựa chọn; các dạng không phải quiz options chưa được ép vào quiz. FILE ĐỀ online Drive ID 1UnwtxvuiXH-GAHNrWL019uVNcWkfCu4O trả 404 qua Drive API và được giữ pending-source; BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết truy vết: source-extracts/batch-4/ngay-16.md.',
        'grammarContent': '<p><strong>Khẳng định:</strong> S + will + V (giữ nguyên); có thể viết will thành ’ll. Ví dụ nguồn: I’ll go home.</p><p><strong>Phủ định:</strong> S + will not + V (giữ nguyên); will not có thể viết won’t. Ví dụ: She won’t return.</p><p><strong>Nghi vấn:</strong> Will + S + V (giữ nguyên)? Trả lời: Yes, ngôi + will; No, ngôi + won’t. Ví dụ nguồn: Will they help you? – Yes, they will.; Will he travel around Vietnam? – No, he won’t.</p><p><strong>Cách dùng:</strong> dự đoán/niềm tin về tương lai; quyết định, đề nghị hoặc lời hứa tại thời điểm nói. Dấu hiệu gồm today, tomorrow, tonight, next week/month/year, in the future và soon.</p>',
        'srsCards': [
            {'front': 'I think she ___ tomorrow.', 'back': 'will return'},
            {'front': 'She ___ return.', 'back': "won't"},
            {'front': 'Will they help you? – Yes, they ___.', 'back': 'will'},
            {'front': 'I ___ help you.', 'back': 'will'},
            {'front': 'I think that it ___ be a nice day today.', 'back': 'will'},
        ],
    },
    17: {
        'title': 'Thì tương lai hoàn thành',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 17, đồng thời đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. Grammar nguồn gồm will have + V-ed/cột 3, phủ định, nghi vấn, cách dùng hoàn tất trước mốc tương lai và dấu hiệu by + mốc thời gian/next + for. Bài online có 5 câu điền/chia, 5 MCQ 2 lựa chọn và 10 MCQ 3 lựa chọn; chưa ép các dạng vào quiz chính thức. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết truy vết: source-extracts/batch-4/ngay-17.md.',
        'grammarContent': '<p><strong>Khẳng định:</strong> S + will have + V(ed/cột 3). Ví dụ nguồn: Next week we’ll have married for 50 years.</p><p><strong>Phủ định:</strong> S + will not have + V(ed/cột 3). Ví dụ: I won’t have written the essay by next week.</p><p><strong>Nghi vấn:</strong> Will + S + have + V(ed/cột 3)? Ví dụ: Will they have finished by 5.00?</p><p><strong>Cách dùng:</strong> diễn tả hành động sẽ hoàn tất trước một mốc thời gian trong tương lai. Dấu hiệu gồm by 8.00, by then, by next week, by the end of this month và mẫu next + for. Ví dụ: By 8.00, I will have finished the essay.; Next month we will have lived here for 3 years.</p>',
        'srsCards': [
            {'front': 'She will have ___ the novel by 5.00.', 'back': 'finished'},
            {'front': 'He won’t ___ written the essay by tomorrow.', 'back': 'have'},
            {'front': 'Next week we ___ here for 2 years.', 'back': 'will have lived'},
            {'front': 'By 8.00, I will have ___ the essay.', 'back': 'finished'},
            {'front': 'Will they ___ finished by 5.00?', 'back': 'have'},
        ],
    },
    18: {
        'title': 'Học ngữ âm với giáo viên nước ngoài',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 18, đồng thời đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. PDF lý thuyết giới thiệu IPA với 20 nguyên âm và 24 phụ âm, gồm nguyên âm đơn/đôi và ví dụ phiên âm; bài online có 20 MCQ, mỗi câu 2 lựa chọn, yêu cầu chọn từ chứa âm mục tiêu. Chưa ánh xạ quiz vì chưa mở rộng schema; BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết truy vết: source-extracts/batch-4/ngay-18.md.',
        'grammarContent': '<p><strong>IPA:</strong> Nguồn nêu bảng phiên âm quốc tế gồm 20 nguyên âm và 24 phụ âm, trong đó có 12 nguyên âm đơn và 8 nguyên âm đôi.</p><p><strong>Nguyên âm đơn:</strong> Nguồn trình bày các cặp /i:/–/ɪ/, /ʊ/–/u:/, /ə/–/ɜː/, /e/–/æ/, /ʌ/–/a:/ và /ɒ/–/ɔ:/, kèm các ví dụ như meat /miːt/, kid /kɪd/, food /fuːd/, mother /ˈmʌðə(r)/, fan /fæn/ và hot /hɒt/.</p><p><strong>Nguyên âm đôi:</strong> /ɪə/, /eɪ/, /ʊə/, /ɔɪ/, /əʊ/, /eə/, /aɪ/ và /aʊ/, với ví dụ here, face, sure, boy, cold, pair, cry và now.</p><p><strong>Phụ âm:</strong> Nguồn liệt kê 24 âm từ /p/ đến /j/ và các ví dụ như pen, book, tea, dog, five, thin, this, teacher, juice, sun, zero, ship, treasure, sing, hot, live, red, web và yes.</p>',
        'srsCards': [
            {'front': 'meat /miːt/ contains the sound /___/.', 'back': 'iː'},
            {'front': 'kid /kɪd/ contains the sound /___/.', 'back': 'ɪ'},
            {'front': 'face /feɪs/ contains the sound /___/.', 'back': 'eɪ'},
            {'front': 'boy /bɔɪ/ contains the sound /___/.', 'back': 'ɔɪ'},
            {'front': 'teacher /ˈtiːtʃə(r)/ contains the sound /___/.', 'back': 'tʃ'},
        ],
    },
    19: {
        'title': 'Tìm hiểu về trọng âm trong tiếng Anh',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 19, đồng thời đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. PDF nguồn định nghĩa âm tiết/trọng âm, ký hiệu trọng âm trong phiên âm và nêu các quy tắc với schwa, /əʊ/, nguyên âm dài/nguyên âm đôi cùng một số hậu tố. Bài online có 5 MCQ 2 lựa chọn, 5 MCQ 3 lựa chọn và 5 MCQ 2 lựa chọn; chưa ánh xạ quiz chính thức. Một số giải thích trên nguồn lặp nhầm từ “uncle”, được giữ trong extract và không dùng làm dữ liệu mới. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết truy vết: source-extracts/batch-4/ngay-19.md.',
        'grammarContent': '<p><strong>Âm tiết:</strong> là một đơn vị của từ, thường chứa âm thanh của một nguyên âm; một từ có thể có một hoặc nhiều âm tiết. <strong>Trọng âm:</strong> là âm tiết được nhấn mạnh, đọc to và rõ hơn; trong phiên âm, dấu ’ đứng trước âm tiết nhận trọng âm.</p><p><strong>Quy tắc nguồn:</strong> schwa /ə/ không nhận trọng âm; nguồn trình bày quy tắc với /əʊ/, nguyên âm dài và nguyên âm đôi. Nguồn cũng nêu trọng âm trước các hậu tố -ion, -ish, -ic; ở âm tiết thứ ba tính từ cuối trở lên với -ate, -ise/-ize; và rơi vào hậu tố -oon, -ee.</p><p><strong>Ví dụ nguồn:</strong> father /ˈfɑːðə(r)/, guitar /ɡɪˈtɑː(r)/, question /ˈkwestʃən/, graduate /ˈɡrædʒuət/, cartoon /kɑːˈtuːn/ và agree /əˈɡriː/. Cambridge và Oxford đều được nêu là nơi có thể xem ký hiệu trọng âm.</p>',
        'srsCards': [
            {'front': 'father /ˈfɑːðə(r)/: stress falls on syllable ___.', 'back': 'the first'},
            {'front': 'guitar /ɡɪˈtɑː(r)/: stress falls on syllable ___.', 'back': 'the second'},
            {'front': 'question /ˈkwestʃən/: stress falls on syllable ___.', 'back': 'the first'},
            {'front': 'cartoon /kɑːˈtuːn/: stress falls on syllable ___.', 'back': 'the second'},
            {'front': 'agree /əˈɡriː/: stress falls on syllable ___.', 'back': 'the second'},
        ],
    },
    20: {
        'title': 'Các câu hỏi với từ để hỏi khác trong tiếng Anh',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và PDF FILE ĐỀ online Ngày 20, đồng thời đối chiếu trang ĐÁP ÁN công khai ngày 24/08/2026. PDF nguồn gồm số đếm, số thứ tự, phát âm và các mẫu How, How much, How many, How far, How old, How often, How long, Why và Which. Bài online có 5 câu điền từ để hỏi, 5 câu viết câu hỏi từ gợi ý và 10 MCQ 3 lựa chọn; các dạng không phải quiz options chưa được ép vào quiz. PDF nguồn hiển thị cách viết `forth (4th)`; bản extract giữ nguyên để truy vết. BÀI HỌC là video chưa có transcript; không nhúng media. Chi tiết truy vết: source-extracts/batch-4/ngay-20.md.',
        'grammarContent': '<p><strong>How:</strong> hỏi cách thức với How + trợ động từ + S + V?; hỏi mức độ/sức khỏe với How + to be + S?.</p><p><strong>How much/How many:</strong> How much hỏi giá; How many + danh từ số nhiều hỏi số lượng.</p><p><strong>How far/How old/How often/How long:</strong> lần lượt hỏi khoảng cách, tuổi, tần suất và khoảng thời gian; nguồn nêu các mẫu How far is it from A to B?, How old + to be + S?, How often + trợ động từ + S + V? và How long + have/has + S + V(ed/cột 3)?</p><p><strong>Why/Which:</strong> Why hỏi lý do và thường trả lời Because + S + V; Which hỏi sự lựa chọn. Ví dụ nguồn: Why were you late? – Because it rained.; Which car do you like?</p>',
        'srsCards': [
            {'front': '___ do you go to school? – I go by bike.', 'back': 'How'},
            {'front': '___ much does it cost?', 'back': 'How'},
            {'front': '___ far is it from your house to your school?', 'back': 'How'},
            {'front': '___ often do you see the dentist?', 'back': 'How'},
            {'front': '___ long have you learned English?', 'back': 'How'},
        ],
    },
}

for day, patch in patches.items():
    merge_source_fields(by_day[day], patch)

data['version'] = '0.4-source-batch-4'

payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Imported days:', ', '.join(map(str, patches)))

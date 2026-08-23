import json
from pathlib import Path

ROOT = Path('/home/ubuntu/english-48-day-workbook')
source = ROOT / 'data/days.json'
data = json.loads(source.read_text(encoding='utf-8'))

patches = {
    6: {
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 6: thể phủ định của động từ thường ở hiện tại, dùng do not/don’t với I/you/we/they và does not/doesn’t với he/she/it; động từ chính giữ nguyên. Bài thi có phần trắc nghiệm 3 lựa chọn và phần chuyển câu khẳng định sang phủ định (Câu 16–20), cần mở rộng schema quiz dạng biến đổi câu; chưa ép phần này vào options. BÀI HỌC là video YouTube chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>Thể phủ định của động từ thường ở hiện tại:</strong> I / You / We / They + do not (don’t) + V; She / He / It + does not (doesn’t) + V.</p><p><strong>Lưu ý:</strong> Khi đã có do/does/don’t/doesn’t, động từ chính giữ nguyên dạng nguyên thể.</p><p><strong>Ví dụ từ nguồn:</strong> My parents don’t phone me in the evening.; We don’t travel to the university by bus.; Jimmy doesn’t have a small cat.; He doesn’t dance in his room in his free time.</p>',
        'srsCards': [
            {'front': 'My parents ___ phone me in the evening.', 'back': "don't"},
            {'front': 'He ___ dance in his room.', 'back': "doesn't"},
            {'front': 'Jimmy doesn’t ___ a small cat.', 'back': 'have'},
            {'front': 'We ___ travel by bus.', 'back': "don't"},
        ],
    },
    7: {
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 7: câu hỏi với động từ thường dùng Do/Does + chủ ngữ + V nguyên thể; có mẫu trả lời Yes/No. Bài thi có phần trắc nghiệm 3 lựa chọn và phần chuyển câu khẳng định sang nghi vấn (=>), cần mở rộng schema quiz dạng biến đổi câu; chưa ép phần này vào options. BÀI HỌC là video YouTube chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>Cấu trúc câu hỏi:</strong> Do + I / you / we / they / chủ ngữ số nhiều + V (giữ nguyên)?</p><p><strong>Does</strong> + she / he / it / tên riêng / chủ ngữ số ít + V (giữ nguyên)?</p><p><strong>Ví dụ từ nguồn:</strong> Does Harry eat fruits every evening?; Does Joey teach him English?; Do her sisters work at a bank?; Does their father buy them new toys?</p><p>Khi dùng does, động từ có đuôi s/es chuyển về nguyên thể: eats → eat, teaches → teach, buys → buy.</p>',
        'srsCards': [
            {'front': '___ Harry eat fruits every evening?', 'back': 'Does'},
            {'front': '___ her sisters work at a bank?', 'back': 'Do'},
            {'front': 'Does Joey ___ him English?', 'back': 'teach'},
            {'front': 'Does their father ___ them new toys?', 'back': 'buy'},
        ],
    },
    8: {
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 8: cách dùng, dấu hiệu nhận biết và cấu trúc thì hiện tại đơn với to be và động từ thường. Bài thi có câu điền/chia động từ, bộ trắc nghiệm 3 lựa chọn và bộ luyện tập 2 lựa chọn; cần mở rộng schema quiz dạng điền/chia động từ và chuẩn hóa số lựa chọn, chưa ép vào options hiện có. BÀI HỌC là video YouTube chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>Cách dùng thì hiện tại đơn:</strong> diễn tả hành động lặp lại/thói quen, sự việc đúng ở hiện tại, sở thích, chân lý/sự thật hiển nhiên và lịch trình ấn định.</p><p><strong>Dấu hiệu:</strong> every day, every week, every month, once a week, twice a month; always, usually, often, sometimes, hardly, never.</p><p><strong>Động từ thường:</strong> I / You / We / They + V; She / He / It + V(s/es). Phủ định dùng do/does + V nguyên thể; nghi vấn dùng Do/Does + V nguyên thể.</p><p><strong>Ví dụ từ nguồn:</strong> I play football every weekend.; He likes maths.; The Sun rises in the East.; I never watch cartoon.; He is always late.</p>',
        'srsCards': [
            {'front': 'I ___ football every weekend.', 'back': 'play'},
            {'front': 'He ___ maths.', 'back': 'likes'},
            {'front': 'The bus ___ at 5.30.', 'back': 'leaves'},
            {'front': 'I ___ watch cartoon.', 'back': 'never'},
        ],
    },
    9: {
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 9: danh từ, tính từ và trạng từ gồm định nghĩa, vị trí, hậu tố/dấu hiệu nhận biết và ví dụ. Bài thi có phần trắc nghiệm 2 lựa chọn và phần xác định từ loại trong câu, cần mở rộng schema quiz dạng phân loại từ; chưa ép phần này vào options. BÀI HỌC là video YouTube chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>Danh từ (noun)</strong> gọi tên người, vật, nơi chốn hoặc sự việc; có thể đứng sau tính từ, sau mạo từ và làm chủ ngữ/tân ngữ. Một số hậu tố thường gặp: -tion, -ment, -ness, -ity, -er, -or.</p><p><strong>Tính từ (adjective)</strong> mô tả danh từ; thường đứng trước danh từ hoặc sau to be. Một số hậu tố thường gặp: -ful, -less, -ous, -able, -ive.</p><p><strong>Trạng từ (adverb)</strong> bổ nghĩa cho động từ, tính từ hoặc trạng từ khác; nhiều trạng từ có đuôi -ly và thường trả lời câu hỏi “như thế nào?”.</p><p><strong>Ví dụ từ nguồn:</strong> Her mother is happy.; They have a lovely flat.; He drives carefully.; The weather is nice.; He sings well.</p>',
        'srsCards': [
            {'front': 'Her mother is ___.', 'back': 'happy'},
            {'front': 'They have a lovely ___.', 'back': 'flat'},
            {'front': 'He drives ___.', 'back': 'carefully'},
            {'front': 'He sings ___.', 'back': 'well'},
        ],
    },
    10: {
        'sourceNote': 'Đã trích xuất lý thuyết từ PDF FILE ĐỀ gốc của Ngày 10: cấu trúc, cách dùng, dấu hiệu nhận biết và quy tắc thêm -ing của thì hiện tại tiếp diễn. Bài thi có phần điền dạng động từ, bộ trắc nghiệm 3 lựa chọn và các bộ luyện tập 2 lựa chọn; cần mở rộng schema quiz dạng điền/chia động từ và chuẩn hóa số lựa chọn, chưa ép vào options hiện có. BÀI HỌC là video YouTube chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>Thể khẳng định:</strong> S + am/is/are + V-ing. <strong>Thể phủ định:</strong> S + am/is/are + not + V-ing. <strong>Thể nghi vấn:</strong> Am/Is/Are + S + V-ing?</p><p><strong>Cách dùng:</strong> hành động đang xảy ra lúc nói hoặc quanh thời điểm nói; kế hoạch gần trong tương lai theo ngữ cảnh.</p><p><strong>Dấu hiệu:</strong> now, at the moment, at present, Look!, Listen!.</p><p><strong>Ví dụ từ nguồn:</strong> They are learning English now.; Look! They are running.</p><p><strong>Quy tắc thêm -ing:</strong> động từ thường thêm -ing; động từ tận cùng e bỏ e rồi thêm -ing; một số động từ ngắn có phụ âm cuối được gấp đôi trước -ing.</p>',
        'srsCards': [
            {'front': 'They are ___ English now.', 'back': 'learning'},
            {'front': 'Look! They are ___.', 'back': 'running'},
            {'front': 'She ___ reading at the moment.', 'back': 'is'},
            {'front': 'Are you ___ dinner?', 'back': 'cooking'},
        ],
    },
}

for day in data['days']:
    if day['day'] not in patches:
        continue
    day.update(patches[day['day']])
    day['status'] = 'coming-soon'
    day.setdefault('warmupScript', '')
    day.setdefault('listeningItems', [])
    day.setdefault('shadowingSentences', [])
    day.setdefault('writingPrompts', [])
    day.setdefault('quiz', [])

# Bump version only after controlled patch.
data['version'] = '0.3-source-batch-2'
for target in [ROOT / 'data/days.json', ROOT / 'client/src/data/days.json']:
    target.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Imported days:', ', '.join(str(d) for d in patches))

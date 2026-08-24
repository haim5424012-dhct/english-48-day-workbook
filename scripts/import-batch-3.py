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
    11: {
        'title': 'Phân biệt thì hiện tại đơn và hiện tại tiếp diễn',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và bài thi online Ngày 11. Grammar nguồn gồm tân ngữ các ngôi, cách dùng/cấu trúc hiện tại đơn và hiện tại tiếp diễn, cùng nhóm động từ không chia tiếp diễn. Bài thi có bảng chia 5 động từ sang V(s/es) và V-ing, 5 câu điền/chia dạng thì, và 10 câu trắc nghiệm 3 lựa chọn; các phần không phải quiz options được giữ trong source-extract, chưa ép vào schema quiz. BÀI HỌC là video, chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>Tân ngữ của các ngôi:</strong> I → me; you → you; we → us; they → them; she → her; he → him; it → it.</p><p><strong>Hiện tại đơn:</strong> diễn tả hành động thường xuyên/thói quen, lịch trình ấn định, sở thích, sự thật hoặc chân lý. Với to be: I + am; You/We/They + are; She/He/It + is. Với động từ thường: I/You/We/They + V; She/He/It + V(s/es).</p><p><strong>Hiện tại tiếp diễn:</strong> diễn tả hành động đang xảy ra tại thời điểm nói hoặc kế hoạch/sắp xếp tương lai. Cấu trúc: I + am + V-ing; You/We/They + are + V-ing; She/He/It + is + V-ing.</p><p><strong>Lưu ý:</strong> like, enjoy, love, hate, think, believe, understand, know và want không chia ở dạng tiếp diễn theo tài liệu. Ví dụ nguồn: I hate books.; I am hating books.</p>',
        'srsCards': [
            {'front': 'They ___ every weekend.', 'back': 'swim'},
            {'front': 'My grandfather ___ to the radio now.', 'back': 'is listening'},
            {'front': 'Her baby ___ at present.', 'back': 'is crying'},
            {'front': 'I ___ my bedroom twice a week.', 'back': 'tidy'},
            {'front': 'She ___ the answer.', 'back': "doesn't know"},
        ],
    },
    12: {
        'title': 'Thì quá khứ đơn thể khẳng định',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và bài thi online Ngày 12. Grammar nguồn gồm was/were, S + V(ed/cột 2), quy tắc chính tả, bảng động từ bất quy tắc, cách dùng và dấu hiệu yesterday/last/ago/in + mốc quá khứ. Bài thi có 5 câu đổi dạng động từ, 5 câu điền/chia quá khứ đơn và 10 câu trắc nghiệm 3 lựa chọn; hai phần đầu không khớp schema quiz options nên chưa ép vào quiz. BÀI HỌC là video, chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>To be ở quá khứ:</strong> I/She/He/It + was; You/We/They + were. Ví dụ nguồn: He was my classmate.; They were very busy.</p><p><strong>Động từ thường:</strong> S + V(ed/cột 2). Thêm -ed với phần lớn động từ; động từ tận cùng e thêm -d; phụ âm + y đổi y thành i rồi thêm -ed; một số động từ ngắn gấp đôi phụ âm cuối trước -ed.</p><p><strong>Động từ bất quy tắc:</strong> begin → began; break → broke; bring → brought; come → came; find → found; get → got; make → made; say → said; sell → sold; take → took; tell → told; win → won.</p><p><strong>Cách dùng và dấu hiệu:</strong> diễn tả hành động đã xảy ra và chấm dứt trong quá khứ. Dấu hiệu gồm yesterday, last week/month/year/night, ago và in + mốc quá khứ. Ví dụ nguồn: He called me.; He wore this hat.; I met him yesterday.</p>',
        'srsCards': [
            {'front': 'They ___ late this morning.', 'back': 'were'},
            {'front': 'She ___ a university student.', 'back': 'was'},
            {'front': 'I ___ to the story last night.', 'back': 'listened'},
            {'front': 'My son ___ the vase yesterday.', 'back': 'broke'},
            {'front': 'My parents ___ a new car last year.', 'back': 'bought'},
        ],
    },
    13: {
        'title': 'Thì quá khứ đơn thể phủ định và nghi vấn',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất artifact PDF FILE ĐỀ và bài thi online Ngày 13. Artifact lý thuyết riêng thu được không có phần Grammar trình bày đầy đủ; bài thi ghi rõ dạng chia quá khứ đơn phủ định/nghi vấn, quy ước trả lời Did – break, phần trả lời Yes/No từ hình ảnh và 10 câu trắc nghiệm 3 lựa chọn. Các dạng điền/chia và trả lời ngắn không khớp schema quiz options nên chưa ép vào quiz. Trang ĐÁP ÁN lưu được chỉ là redirect, chưa có đáp án nội dung để xác minh; BÀI HỌC là video chưa có transcript.',
        'srsCards': [
            {'front': 'My parents ___ the old house in 2000.', 'back': "didn't sell"},
            {'front': '___ your father work at a factory in 2014?', 'back': 'Did'},
            {'front': 'Daniel ___ up late yesterday.', 'back': "didn't get"},
            {'front': 'The vegetables ___ fresh yesterday.', 'back': "weren't"},
            {'front': 'Did your child ___ a hat to school yesterday?', 'back': 'wear'},
        ],
    },
    14: {
        'title': 'Thì quá khứ tiếp diễn',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và bài thi online Ngày 14. Grammar nguồn gồm khẳng định, phủ định, nghi vấn, cách dùng tại một thời điểm quá khứ và hành động đang xảy ra bị xen vào. Bài thi có 5 câu điền/chia, 5 câu trắc nghiệm 2 lựa chọn và 10 câu trắc nghiệm 3 lựa chọn; phần điền/chia không khớp schema quiz hiện tại, còn số lựa chọn MCQ không đồng nhất nên chưa nạp quiz. BÀI HỌC là video, chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>Khẳng định:</strong> I/She/He/It + was + V-ing; You/We/They + were + V-ing. Ví dụ nguồn: I was listening to music.; They were working.</p><p><strong>Phủ định:</strong> I/She/He/It + was not (wasn’t) + V-ing; You/We/They + were not (weren’t) + V-ing.</p><p><strong>Nghi vấn:</strong> Was + I/she/he/it + V-ing?; Were + you/we/they + V-ing? Trả lời Yes…was/were hoặc No…wasn’t/weren’t.</p><p><strong>Cách dùng:</strong> hành động xảy ra tại một thời điểm trong quá khứ hoặc đang xảy ra thì hành động khác xen vào, thường nối bằng when. Ví dụ nguồn: I was watching TV at 7.30 last night.; We were having dinner when they called.</p>',
        'srsCards': [
            {'front': 'Tom ___ at 5.30 yesterday.', 'back': 'was running'},
            {'front': 'He ___ his homework at 8.30 last night.', 'back': "wasn't doing"},
            {'front': 'When I ___, he called me.', 'back': 'was cooking'},
            {'front': 'He ___ breakfast when his father came home.', 'back': 'was having'},
            {'front': 'Were they ___ at 5.00 yesterday afternoon?', 'back': 'resting'},
        ],
    },
    15: {
        'title': 'Thì hiện tại hoàn thành',
        'level': 'NEXT',
        'status': 'coming-soon',
        'sourceNote': 'Đã trích xuất PDF FILE ĐỀ và bài thi online Ngày 15. Grammar nguồn gồm have/has + V-ed/cột 3, phủ định/nghi vấn, bảng quá khứ phân từ, cách dùng và dấu hiệu for/since/recently/just/already/ever/never. Bài thi có 5 câu chuyển sang quá khứ phân từ, 5 câu trắc nghiệm 2 lựa chọn, 5 câu điền/chia hiện tại hoàn thành và 10 câu trắc nghiệm 3 lựa chọn; các dạng không phải quiz options và block 2 lựa chọn chưa được ép vào schema. BÀI HỌC là video, chưa có transcript được xác minh; không nhúng media.',
        'grammarContent': '<p><strong>Khẳng định:</strong> I/You/We/They + have + V(ed/cột 3); She/He/It + has + V(ed/cột 3). Have có thể viết là ’ve.</p><p><strong>Phủ định:</strong> have/has not + V(ed/cột 3), có thể viết haven’t/hasn’t. <strong>Nghi vấn:</strong> Have/Has + chủ ngữ + V(ed/cột 3)?</p><p><strong>Ví dụ nguồn:</strong> I have called him.; They have won the match.; He has done his homework.</p><p><strong>Cách dùng:</strong> hành động kéo dài tới hiện tại, sự việc vừa xảy ra không có thời gian cụ thể, trải nghiệm tới hiện tại hoặc kết quả quá khứ còn ở hiện tại. Dấu hiệu gồm for, since, recently, just, already, ever và never.</p>',
        'srsCards': [
            {'front': 'I have ___ him.', 'back': 'called'},
            {'front': 'They have ___ the match.', 'back': 'won'},
            {'front': 'He has ___ his homework.', 'back': 'done'},
            {'front': 'I have lived in Ha Noi ___ 2 years.', 'back': 'for'},
            {'front': 'I have lived here ___ 2018.', 'back': 'since'},
        ],
    },
}

for day, patch in patches.items():
    merge_source_fields(by_day[day], patch)

payload = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
source_path.write_text(payload, encoding='utf-8')
client_path.write_text(payload, encoding='utf-8')
print('Imported days:', ', '.join(map(str, patches)))

import json
from copy import deepcopy
from pathlib import Path

ROOT = Path('/home/ubuntu/english-48-day-workbook')
AUTHORED_NOTE = 'Nội dung thực hành do workbook biên soạn dựa trên mục tiêu ngữ pháp/chủ đề; không phải bản sao tài liệu nguồn.'

specs = {
1: ('to be: khẳng định và phủ định', ['I am ready.', 'She is at home.', 'They are not late.'], ['Viết hai câu giới thiệu bản thân dùng am/is/are.', 'Viết một câu phủ định về hôm nay.']),
2: ('câu hỏi với to be', ['Am I early?', 'Is she your sister?', 'Are they at school?'], ['Viết hai câu hỏi dùng Is/Are.', 'Viết một cặp trả lời Yes/No cho một câu hỏi to be.']),
3: ('Who và What với to be', ['Who is he?', 'What is this?', 'What are those?'], ['Viết một câu hỏi Who và câu trả lời.', 'Viết một câu hỏi What về đồ vật quanh em.']),
4: ('Where và When với to be', ['Where is your bag?', 'When is the class?', 'They are at home.'], ['Hỏi và trả lời một câu về nơi chốn.', 'Hỏi và trả lời một câu về thời gian.']),
5: ('động từ thường ở hiện tại', ['I read every night.', 'She watches TV.', 'They study English.'], ['Viết hai câu về thói quen hằng ngày.', 'Viết một câu với chủ ngữ he/she/it và động từ thêm s/es.']),
6: ('phủ định với do và does', ['I do not skip breakfast.', 'He does not play chess.', 'We do not travel by bus.'], ['Viết một câu phủ định với do not.', 'Viết một câu phủ định với does not và động từ nguyên thể.']),
7: ('nghi vấn với do và does', ['Do you like music?', 'Does she read books?', 'Do they work here?'], ['Viết một câu hỏi Do/Does.', 'Viết câu trả lời ngắn cho một câu hỏi về thói quen.']),
8: ('hiện tại đơn', ['I usually walk to school.', 'He often helps his mother.', 'The sun rises in the east.'], ['Viết hai câu mô tả thói quen.', 'Viết một câu về sự thật hoặc lịch trình.']),
9: ('từ loại: noun, adjective, adverb', ['The careful student works carefully.', 'This is a beautiful room.', 'Her quick answer is correct.'], ['Viết một câu có danh từ và tính từ.', 'Viết một câu dùng trạng từ chỉ cách thức.']),
10: ('hiện tại tiếp diễn', ['I am reading now.', 'She is cooking dinner.', 'They are playing outside.'], ['Viết hai câu về việc đang xảy ra lúc này.', 'Viết một câu hỏi hiện tại tiếp diễn.']),
11: ('so sánh hiện tại đơn và hiện tại tiếp diễn', ['I study every day.', 'I am studying now.', 'He usually walks, but today he is taking a bus.'], ['Viết một cặp câu: thói quen và việc đang xảy ra.', 'Mô tả một thay đổi hôm nay so với thường lệ.']),
12: ('quá khứ đơn khẳng định', ['I visited my aunt yesterday.', 'She watched a film last night.', 'They played football on Sunday.'], ['Viết hai câu về hôm qua.', 'Viết một câu dùng động từ bất quy tắc ở quá khứ.']),
13: ('quá khứ đơn phủ định và nghi vấn', ['I did not stay at home.', 'Did he call you?', 'They did not watch TV.'], ['Viết một câu phủ định ở quá khứ đơn.', 'Viết một câu hỏi Did và câu trả lời ngắn.']),
14: ('quá khứ tiếp diễn', ['I was reading at eight.', 'She was cooking when I called.', 'They were walking in the rain.'], ['Viết một câu đang xảy ra tại một thời điểm quá khứ.', 'Viết câu có was/were V-ing và when.']),
15: ('hiện tại hoàn thành và dấu hiệu', ['I have finished my homework.', 'She has lived here for two years.', 'They have just arrived.'], ['Viết một câu dùng for hoặc since.', 'Viết một câu về trải nghiệm với ever/never.']),
16: ('tương lai đơn với will', ['I will call you tonight.', 'She will help us.', 'They will not be late.'], ['Viết một lời hứa dùng will.', 'Viết một dự đoán đơn giản về ngày mai.']),
17: ('tương lai hoàn thành', ['I will have finished by Friday.', 'She will have arrived by noon.', 'They will have completed the task.'], ['Viết một câu dùng will have + V3.', 'Nêu một việc sẽ hoàn tất trước một mốc thời gian.']),
18: ('phát âm âm cuối', ['I like books.', 'She needs pens.', 'He watched the match.'], ['Đọc và ghi lại ba từ có âm cuối rõ.', 'Viết một câu có từ kết thúc bằng /s/, /z/ hoặc /t/.']),
19: ('trọng âm từ', ['I can PREsent the project.', 'This is a PREsent.', 'She is a careful TEAcher.'], ['Đánh dấu âm tiết nhấn trong ba từ.', 'Viết một câu có từ hai âm tiết và đọc chậm.']),
20: ('câu hỏi WH', ['What do you need?', 'Where does he work?', 'Why are they late?'], ['Viết ba câu hỏi WH khác nhau.', 'Viết câu trả lời đầy đủ cho một câu hỏi Why.']),
21: ('nghe số và tên', ['My number is 0912 345 678.', 'Her name is Lan Anh.', 'Please spell your surname.'], ['Viết một câu giới thiệu tên.', 'Viết một câu yêu cầu người khác đánh vần tên.']),
22: ('động từ khuyết thiếu', ['You should rest.', 'Can I ask a question?', 'We must wear helmets.'], ['Viết một lời khuyên dùng should.', 'Viết một câu xin phép dùng can.']),
23: ('and, but, or, so, because', ['I study and I practise.', 'I am tired, but I continue.', 'I stay home because it rains.'], ['Nối hai câu bằng because.', 'Viết một câu có but hoặc so.']),
24: ('liên từ chỉ thời gian', ['Call me when you arrive.', 'I will wait until you finish.', 'Wash your hands before you eat.'], ['Viết một câu có when.', 'Viết một câu có before, after hoặc until.']),
25: ('liên từ chỉ sự đối lập', ['Although it is cold, we walk.', 'I like tea, but my brother likes coffee.', 'However, she keeps practising.'], ['Viết câu có although.', 'Viết hai ý đối lập bằng but hoặc however.']),
26: ('điều kiện loại 1', ['If it rains, I will stay home.', 'If you study, you will improve.', 'We will go if the bus arrives.'], ['Viết một khả năng có thật dùng if.', 'Viết lời khuyên theo mẫu If..., you will...']),
27: ('điều kiện loại 2', ['If I had time, I would travel.', 'If she knew, she would help.', 'I would practise more if I were free.'], ['Viết một giả định hiện tại.', 'Viết câu If I were you... để đưa lời khuyên.']),
28: ('điều kiện loại 3 và had + V3', ['If I had studied, I would have passed.', 'If he had left early, he would have caught the bus.', 'They would have won if they had practised.'], ['Viết một giả định trái với quá khứ.', 'Hoàn thành câu dùng had + V3 và would have + V3.']),
29: ('nghe và điền từ', ['Please listen and write the missing word.', 'The lesson starts at nine.', 'I check each answer twice.'], ['Viết một câu hướng dẫn nghe.', 'Viết một câu dùng check hoặc answer.']),
30: ('nghe và chép chính tả', ['Listen carefully and write the sentence.', 'Small words can change the meaning.', 'Read your sentence aloud.'], ['Chép lại một câu ngắn sau khi nghe TTS.', 'Viết cách em tự kiểm tra lỗi chính tả.']),
31: ('nghe về giờ', ['The meeting is at half past eight.', 'I get up at seven o’clock.', 'The shop closes at five.'], ['Viết ba giờ khác nhau bằng tiếng Anh.', 'Hỏi và trả lời giờ bắt đầu một hoạt động.']),
32: ('nghe ngày tháng', ['My birthday is on the third of May.', 'The test is on Monday.', 'The course ends in June.'], ['Viết ngày sinh của em bằng tiếng Anh.', 'Viết câu hỏi về ngày diễn ra một sự kiện.']),
33: ('nghe địa điểm', ['The bank is next to the post office.', 'The library is across from the school.', 'Meet me at the bus station.'], ['Mô tả vị trí một địa điểm.', 'Viết lời hẹn gặp ở một nơi cụ thể.']),
34: ('nghe về tiền bạc', ['The notebook costs five dollars.', 'I pay by card.', 'How much is this book?'], ['Hỏi giá một vật dụng.', 'Viết câu trả lời về cách thanh toán.']),
35: ('đại từ phản thân', ['I made the cake myself.', 'She taught herself English.', 'They introduced themselves.'], ['Viết một câu dùng myself hoặc yourself.', 'Viết một câu nói ai đó tự làm việc gì.']),
36: ('mệnh đề thời gian và phối hợp thì', ['I have lived here since I was young.', 'I will call when I arrive.', 'She was reading when I came.'], ['Viết câu với since và quá khứ đơn.', 'Viết câu tương lai có when + hiện tại đơn.']),
37: ('tiếng Anh giao tiếp: mở lời và phản hồi', ['How are you today?', 'I am fine, thank you.', 'Could you repeat that, please?'], ['Viết một đoạn hội thoại ba lượt.', 'Viết một câu xin người khác nói chậm hơn.']),
38: ('liên từ tương liên', ['Either you call or I will call.', 'Neither answer is correct.', 'Both reading and speaking help.'], ['Viết câu dùng either...or.', 'Viết câu dùng both...and hoặc neither...nor.']),
39: ('quốc gia, quốc tịch và châu lục', ['I am from Vietnam.', 'She is Australian.', 'Japan is in Asia.'], ['Viết câu giới thiệu quốc gia của em.', 'Viết câu hỏi và trả lời về quốc tịch.']),
40: ('sở thích và hoạt động yêu thích', ['I enjoy reading.', 'He likes playing chess.', 'What do you like doing?'], ['Viết hai câu về sở thích.', 'Hỏi một người bạn về hoạt động yêu thích.']),
41: ('phương tiện giao thông', ['I go to school by bus.', 'She rides a bike.', 'How do you travel to work?'], ['Viết cách em đi đến trường.', 'Hỏi và trả lời về một phương tiện.']),
42: ('thể thao', ['I play badminton.', 'He is good at swimming.', 'What sport do you like?'], ['Viết về một môn thể thao em thích.', 'Viết một câu về thế mạnh thể thao.']),
43: ('nghề nghiệp', ['My mother is a nurse.', 'He works in an office.', 'What does your father do?'], ['Giới thiệu nghề nghiệp của một người.', 'Viết câu hỏi về công việc.']),
44: ('công nghệ và thiết bị', ['I use my phone to study.', 'Please turn on the computer.', 'The screen is bright.'], ['Viết cách em dùng công nghệ để học.', 'Viết một hướng dẫn ngắn cho một thiết bị.']),
45: ('giao tiếp: cảm ơn, xin lỗi, đề nghị', ['Thank you for your help.', 'I am sorry I am late.', 'Would you like some tea?'], ['Viết một lời cảm ơn phù hợp.', 'Viết một lời xin lỗi và một đề nghị.']),
46: ('note-taking: ghi chú khi nghe', ['Her name is Mai.', 'She works at a hospital.', 'She likes cooking.'], ['Tạo ghi chú ba dòng từ một đoạn giới thiệu.', 'Viết năm từ khóa giúp em nhớ thông tin.']),
47: ('paraphrasing: diễn đạt lại', ['The room is very small.', 'He studies every evening.', 'Please close the door.'], ['Viết lại một câu mà không đổi nghĩa.', 'Diễn đạt lại một lời yêu cầu theo cách lịch sự hơn.']),
48: ('giới thiệu bản thân và thuyết trình', ['Hello, my name is Minh.', 'Today I will talk about my daily routine.', 'Thank you for listening.'], ['Viết dàn ý nói 1–2 phút về bản thân.', 'Tự đánh giá bài nói theo rubric: mở đầu, 2 ý chính, kết thúc.']),
}

def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def grammar_for(focus, examples):
    ex = ' '.join(f'{esc(s)}' for s in examples)
    return f'<p><strong>Mục tiêu hôm nay:</strong> {esc(focus)}.</p><p><strong>Cách dùng:</strong> Quan sát chủ ngữ, động từ và từ chỉ thời gian trước khi đặt câu. Mẫu luyện tập do workbook biên soạn giúp em chuyển kiến thức thành đầu ra ngắn, rõ.</p><p><strong>Ví dụ:</strong> {ex}</p><p><strong>Lỗi thường gặp:</strong> Không dịch từng từ theo tiếng Việt; hãy giữ đúng trật tự câu và kiểm tra trợ động từ, dạng động từ hoặc giới từ.</p>'

def quiz_for(focus, examples):
    items = []
    for i in range(5):
        correct = examples[i % len(examples)]
        wrong = examples[(i + 1) % len(examples)]
        items.append({
            'id': f'day-question-{i+1}',
            'type': 'multiple-choice',
            'question': f'Câu {i+1}: Câu nào phù hợp nhất với mục tiêu “{focus}”?',
            'options': [correct, f'{wrong} yesterday.', 'This sentence needs another structure.'],
            'correctIndex': 0,
            'explanation': f'Đáp án này là ví dụ luyện tập cho {focus}; hãy đọc to và kiểm tra từ khóa.'
        })
    return items

def enrich(day):
    number = day['day']
    focus, examples, prompts = specs[number]
    day = deepcopy(day)
    day['title'] = {
        36: 'Mệnh đề thời gian: phối hợp thì',
        38: 'Liên từ tương liên',
        46: 'Note-taking: ghi chú khi nghe',
        47: 'Paraphrasing: diễn đạt lại',
        48: 'Thuyết trình: giới thiệu bản thân',
    }.get(number, day.get('title', focus.title()))
    day['learningObjectives'] = [f'Nhận diện và dùng được {focus}.', 'Tạo ít nhất hai câu đúng ngữ cảnh.', 'Tự sửa một lỗi sau khi nghe, nói hoặc viết.']
    day['prerequisites'] = 'Ôn lại cấu trúc của ngày trước và các từ cơ bản A1–A2.'
    day['bridgeFromPreviousDay'] = f'Bài này nối từ nội dung Ngày {max(number-1, 1):02d} sang mục tiêu {focus}, để kiến thức được gọi lại trước khi tạo câu mới.'
    special_bridges = {
        13: 'Ngày 12 đã tạo câu quá khứ đơn khẳng định; hôm nay dùng chính nền đó để thêm did not và Did, đồng thời đưa động từ về nguyên thể.',
        15: 'Ngày 12–14 kể về một thời điểm trong quá khứ; hôm nay đối chiếu quá khứ đơn với hiện tại hoàn thành để phân biệt mốc thời gian và kết quả hiện tại.',
        28: 'Ngày 27 nói về giả định hiện tại; hôm nay lùi thêm một bước về quá khứ hoàn thành had + V3 trước khi tạo would have + V3.',
        36: 'Các ngày 31–35 luyện nghe chi tiết; hôm nay dùng mệnh đề thời gian để nối các mốc đó bằng phối hợp thì rõ ràng.',
        46: 'Ngày 45 luyện lời nói giao tiếp; hôm nay chuyển một đoạn giới thiệu thành từ khóa và ghi chú ngắn có thể dùng lại.',
        47: 'Ngày 46 đã tách thông tin thành từ khóa; hôm nay dùng các từ khóa đó để diễn đạt lại mà không đổi nghĩa.',
        48: 'Ngày 47 đã luyện đổi cách nói; hôm nay dùng nội dung đã chọn để viết dàn ý và trình bày 1–2 phút có rubric.'
    }
    if number in special_bridges:
        day['bridgeFromPreviousDay'] = special_bridges[number]
    if number == 46:
        day['projectPhase'] = '01 / NOTE-TAKE'
    elif number == 47:
        day['projectPhase'] = '02 / PARAPHRASE'
    elif number == 48:
        day['projectPhase'] = '04 / PRESENT'
        day['rubric'] = ['Mở đầu và giới thiệu chủ đề rõ ràng.', 'Có ít nhất hai ý chính với ví dụ.', 'Kết thúc, cảm ơn và mời câu hỏi.', 'Nói 1–2 phút với tốc độ dễ nghe.']
    elif number == 45:
        day['projectPhase'] = '03 / PREPARE'
    day['commonMistakes'] = ['Dịch từng từ theo tiếng Việt và bỏ qua trật tự câu tiếng Anh.', 'Quên kiểm tra chủ ngữ, trợ động từ hoặc dấu hiệu thời gian.']
    day['masteryCriteria'] = 'Hoàn thành đủ sáu bước; đạt ít nhất 4/5 câu quiz; có ba câu nghe–chép đúng; nói đủ ba câu; nộp hai câu viết và tự đánh giá thẻ SRS.'
    day['estimatedMinutes'] = 25
    day['contentOrigin'] = 'mixed' if day.get('grammarContent', '').strip() else 'workbook-authored'
    day['pronunciationFocus'] = 'Đọc rõ âm cuối, trọng âm từ khóa và nối âm tự nhiên; nghe lại audio mẫu/TTS trước khi nói.'
    if not day.get('grammarContent', '').strip():
        day['grammarContent'] = grammar_for(focus, examples)
    if not day.get('warmupScript', '').strip():
        day['warmupScript'] = '\n'.join(examples)
    day['listeningItems'] = [
        {'audioText': sentence, 'blankSentence': '___ ' + ' '.join(sentence.split()[1:]), 'answer': sentence.split()[0]}
        for sentence in examples[:3]
    ]
    day['shadowingSentences'] = examples[:3]
    day['writingPrompts'] = prompts[:2]
    day['quiz'] = quiz_for(focus, examples)
    cards = list(day.get('srsCards') or [])
    for sentence in examples:
        if len(cards) >= 5: break
        cards.append({'front': sentence, 'back': f'Ví dụ luyện tập cho {focus}.'})
    while len(cards) < 5:
        cards.append({'front': f'What does {focus} mean?', 'back': 'Hãy giải thích bằng tiếng Việt và tạo một câu.'})
    day['srsCards'] = cards[:5]
    note = day.get('sourceNote', '').strip()
    if AUTHORED_NOTE not in note:
        day['sourceNote'] = (note + ' ' + AUTHORED_NOTE).strip()
    day['status'] = 'ready'
    return day

payload = json.loads((ROOT / 'data/days.json').read_text(encoding='utf-8'))
payload['version'] = '2.0-workbook-complete'
payload['days'] = [enrich(day) for day in payload['days']]
for target in [ROOT / 'data/days.json', ROOT / 'client/src/data/days.json']:
    target.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Enriched {len(payload["days"])} days with six blocks and metadata.')

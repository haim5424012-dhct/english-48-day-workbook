import json
from copy import deepcopy
import re
from pathlib import Path

ROOT = Path('/home/ubuntu/english-48-day-workbook')
AUTHORED_NOTE = 'Nội dung thực hành do workbook biên soạn dựa trên mục tiêu học tập; không phải bản sao tài liệu nguồn.'
OLD_AUTHORED_NOTE = 'Nội dung thực hành do workbook biên soạn dựa trên mục tiêu ngữ pháp/chủ đề; không phải bản sao tài liệu nguồn.'

PRONUNCIATION = {
    1: 'Phân biệt /æ/ trong am và nhịp yếu của I am.', 2: 'Nối âm trong câu hỏi Am I / Is she / Are they.', 3: 'Ngữ điệu lên ở câu hỏi What/Who và âm cuối /s/ số nhiều.', 4: 'Trọng âm từ hỏi Where/When và âm cuối của địa điểm.', 5: 'Âm cuối /s/ và /z/ trong reads, watches, studies.', 6: 'Âm /dʌz/ trong does và giữ nguyên âm tiết của động từ sau does.', 7: 'Ngữ điệu lên trong câu hỏi Do/Does và xuống ở câu trả lời ngắn.', 8: 'Âm cuối của trạng từ tần suất và nhịp câu thói quen.', 9: 'Trọng âm noun/adjective/adverb trong câu mô tả.', 10: 'Đuôi -ing /ɪŋ/ và âm /z/ trong is.', 11: 'Nhấn từ chỉ thời gian usually, now, today để phân biệt hai thì.', 12: 'Đuôi -ed /t/, /d/, /ɪd/ trong động từ quá khứ.', 13: 'Âm /dɪd/ và phủ định did not không nuốt âm cuối.', 14: 'Phân biệt was/were và nhịp V-ing trong when.', 15: 'Nối have/has với V3 và nhấn for, since, just.', 16: 'Âm /l/ trong will và nhịp dự đoán với tonight/tomorrow.', 17: 'Nhấn mốc by Friday/by noon trong tương lai hoàn thành.', 18: 'Đối chiếu /s/, /z/, /t/ ở âm cuối từ số nhiều và quá khứ.', 19: 'Trọng âm âm tiết đầu/cuối trong present và teacher.', 20: 'Ngữ điệu câu hỏi WH: xuống ở cuối câu hỏi thông tin.', 21: 'Đọc dãy số theo nhóm và đánh vần tên rõ từng chữ.', 22: 'Âm cuối không bật mạnh sau can, should, must.', 23: 'Nhịp và nối âm trước and, but, or, so, because.', 24: 'Nhấn before, after, until, when để nghe quan hệ thời gian.', 25: 'Ngữ điệu tương phản ở although, but và however.', 26: 'Nhịp điều kiện If..., I will... và âm cuối trong rains/study.', 27: 'Giảm âm would và nhấn were/free trong lời khuyên giả định.', 28: 'Phân biệt had studied và would have passed theo nhịp ba phần.', 29: 'Nghe rõ phụ âm đầu ở please, starts, check.', 30: 'Nối âm trong Listen carefully và Read aloud.', 31: 'Đọc giờ half past, o’clock với trọng âm mốc giờ.', 32: 'Phân biệt ordinal third và tên tháng May/June.', 33: 'Nhấn next to, across from, at để định vị.', 34: 'Đọc số tiền và trọng âm dollars/card.', 35: 'Âm cuối -self/-selves trong myself, themselves.', 36: 'Nhấn since, when và giữ thì sau liên từ thời gian.', 37: 'Ngữ điệu lịch sự trong Could you repeat that, please?', 38: 'Nhịp cân bằng either...or, neither...nor, both...and.', 39: 'Trọng âm tên quốc gia/quốc tịch và âm cuối -ian.', 40: 'Âm /dʒ/ trong enjoy và nhịp enjoy + V-ing.', 41: 'Nối by bus, ride a bike và trọng âm phương tiện.', 42: 'Âm cuối -ing trong swimming và nhịp good at.', 43: 'Trọng âm nghề nghiệp nurse, office và câu hỏi does.', 44: 'Âm /juː/ trong use và phụ âm cuối computer/screen.', 45: 'Ngữ điệu cảm ơn, xin lỗi và lời đề nghị lịch sự.', 46: 'Đọc từ khóa trong ghi chú, bỏ từ chức năng không cần thiết.', 47: 'Nhấn từ mang nghĩa khi đổi câu, giữ nguyên thông tin chính.', 48: 'Nhịp mở bài, hai ý chính và câu kết trong bài nói 1–2 phút.'
}

MINUTES = {day: 18 + (day % 5) * 3 + (5 if day in {12, 15, 28, 36, 46, 47, 48} else 0) for day in range(1, 49)}

MISTAKES = {
    1: ['Dùng is với I hoặc are với he/she.', 'Đặt not sau động từ chính thay vì sau am/is/are.'], 2: ['Đảo sai am/is/are lên trước chủ ngữ.', 'Trả lời Yes/No không lặp đúng chủ ngữ.'], 3: ['Dùng what cho người hoặc who cho đồ vật.', 'Quên số ít/số nhiều trong is/are.'], 4: ['Nhầm where hỏi nơi với when hỏi thời gian.', 'Để giới từ ở vị trí không tự nhiên.'], 5: ['Quên -s/-es ở he/she/it.', 'Đọc watches như watchs thay vì /ɪz/.'], 6: ['Giữ -s sau does not.', 'Dùng not do cho chủ ngữ he/she/it.'], 7: ['Dùng do với he/she/it.', 'Viết câu trả lời dài nhưng không trả lời đúng Yes/No.'], 8: ['Đặt trạng từ tần suất sai vị trí.', 'Dùng hiện tại tiếp diễn cho sự thật thường xuyên.'], 9: ['Dùng adjective thay cho adverb sau động từ.', 'Không nhận ra noun đứng sau a/an/the.'], 10: ['Quên động từ be trước V-ing.', 'Thêm -ing sai với động từ tận cùng e.'], 11: ['Dùng usually với hiện tại tiếp diễn.', 'Dùng hiện tại đơn cho việc đang xảy ra now.'], 12: ['Dùng V nguyên thể sau yesterday.', 'Đọc hoặc viết V2 bất quy tắc theo quy tắc -ed.'], 13: ['Giữ V2 sau did not/did.', 'Quên đảo did lên trước chủ ngữ trong câu hỏi.'], 14: ['Dùng was với you/they.', 'Không dùng when để nối hành động đang diễn ra và hành động xen vào.'], 15: ['Dùng V2 sau have/has.', 'Nhầm for (khoảng thời gian) với since (mốc bắt đầu).'], 16: ['Dùng will + to V.', 'Dùng will cho kế hoạch đã có bằng chứng mà không nêu ngữ cảnh.'], 17: ['Quên have sau will.', 'Dùng V2 thay V3 trong will have finished.'], 18: ['Bỏ âm cuối khi nói số nhiều.', 'Đọc -ed giống nhau trong mọi từ.'], 19: ['Đổi trọng âm làm đổi nghĩa present.', 'Nhấn đều mọi âm tiết.'], 20: ['Dùng do/does sai theo chủ ngữ trong WH-question.', 'Trả lời bằng Yes/No cho câu hỏi thông tin.'], 21: ['Đọc liền dãy số không chia nhóm.', 'Nhầm name với surname khi đánh vần.'], 22: ['Thêm to sau modal verb.', 'Dùng shoulds/musts ở ngôi thứ ba.'], 23: ['Dùng because và so cùng một quan hệ trong một câu.', 'Quên dấu phẩy khi nối hai mệnh đề dài.'], 24: ['Dùng will ngay sau when/before/after.', 'Nhầm until với before.'], 25: ['Dùng although...but cùng lúc.', 'Đặt however như liên từ nối trực tiếp hai mệnh đề.'], 26: ['Dùng will trong mệnh đề If.', 'Nhầm điều kiện có thật với giả định.'], 27: ['Dùng was cho mọi chủ ngữ trong If I were you.', 'Quên would ở mệnh đề kết quả.'], 28: ['Dùng would have ở mệnh đề If.', 'Dùng V2 thay had + V3.'], 29: ['Nghe nhầm số với từ có âm gần.', 'Điền từ không khớp loại từ trong câu.'], 30: ['Bỏ từ nhỏ khi chép chính tả.', 'Không viết hoa đầu câu hoặc đặt dấu chấm.'], 31: ['Nhầm quarter past với half past.', 'Dùng at cho ngày thay vì giờ.'], 32: ['Dùng on với tháng đơn lẻ.', 'Nhầm số thứ tự với số đếm trong ngày tháng.'], 33: ['Đảo next to và across from.', 'Dùng in khi muốn nói điểm gặp cụ thể at.'], 34: ['Đọc five dollars như số năm đơn lẻ.', 'Nhầm pay by card với pay cash.'], 35: ['Dùng myself khi chủ ngữ là they.', 'Dùng đại từ phản thân thay tân ngữ thường.'], 36: ['Dùng will sau when trong mệnh đề thời gian.', 'Dùng since với khoảng thời gian không có mốc.'], 37: ['Dùng câu mệnh lệnh khi muốn nhờ lịch sự.', 'Không dùng please hoặc intonation phù hợp.'], 38: ['Dùng either...and hoặc both...or.', 'Không giữ cấu trúc song song sau liên từ.'], 39: ['Nhầm quốc gia với quốc tịch.', 'Dùng in trước quốc tịch thay vì đến từ.'], 40: ['Dùng enjoy + to V.', 'Nhầm like doing với câu hỏi What do you like doing?'], 41: ['Dùng by với ride a bike.', 'Nhầm go by bus với take a bus trong ngữ cảnh.'], 42: ['Dùng good in thay vì good at.', 'Nhầm play với go/do trong môn thể thao.'], 43: ['Quên a/an trước nghề nghiệp số ít.', 'Dùng work như danh từ trong câu hỏi nghề nghiệp.'], 44: ['Nhầm use to study với used to study.', 'Dùng turn on/off ngược nghĩa.'], 45: ['Dùng sorry for I am late.', 'Đề nghị trực tiếp mà thiếu Would you like...?'], 46: ['Chép cả câu thay vì lọc từ khóa.', 'Bỏ sót tên hoặc nơi làm việc trong ghi chú.'], 47: ['Đổi nghĩa khi thay từ.', 'Dùng từ đồng nghĩa không phù hợp mức A1–A2.'], 48: ['Đọc nguyên văn dàn ý không nhìn người nghe.', 'Thiếu ví dụ hoặc câu kết trong 1–2 phút.']
}

PREREQS = {day: (['Ngày 01: am/is/are và câu đơn.'] if day == 1 else [f'Ngày {day-1:02d}: gọi lại cấu trúc trọng tâm và từ khóa của bài trước.']) for day in range(1, 49)}
PREREQS.update({13: ['Ngày 12: V2 trong câu khẳng định quá khứ đơn.'], 15: ['Ngày 12–14: mốc quá khứ, V2 và was/were + V-ing.'], 28: ['Ngày 27: If + past simple, would + V.'], 36: ['Ngày 24–25: liên từ thời gian và ý đối lập.'], 46: ['Ngày 45: cảm ơn, xin lỗi, đề nghị trong hội thoại.'], 47: ['Ngày 46: chọn thông tin chính và ghi chú bằng từ khóa.'], 48: ['Ngày 47: paraphrase giữ nguyên nghĩa và phát triển ý.']})

SPECIAL_OBJECTIVES = {
    1: ['Dùng am/is/are để giới thiệu người và trạng thái.', 'Đặt not đúng vị trí trong câu phủ định.', 'Nói và viết ba câu tự giới thiệu ngắn.'],
    13: ['Đổi câu quá khứ đơn sang phủ định bằng did not.', 'Tạo câu hỏi Did và câu trả lời ngắn có căn cứ.', 'Giữ động từ nguyên thể sau did/did not.'],
    15: ['Phân biệt hành động đã kết thúc ở mốc quá khứ với kết quả hiện tại.', 'Dùng have/has + V3 với for, since, just.', 'Viết câu trải nghiệm với ever/never.'],
    28: ['Tạo giả định trái với quá khứ bằng If + had + V3.', 'Dùng would have + V3 ở mệnh đề kết quả.', 'Giải thích quan hệ nguyên nhân–kết quả đã không xảy ra.'],
    36: ['Chọn thì phù hợp sau since, when, before và after.', 'Nối hai mệnh đề thời gian mà không dùng will sau when.', 'Kể lại một chuỗi hành động có mốc rõ.'],
    46: ['Nghe một lời giới thiệu và lọc tên, nơi làm việc, sở thích.', 'Viết ghi chú bằng từ khóa thay vì chép nguyên câu.', 'Dùng ghi chú để kể lại ba thông tin chính.'],
    47: ['Giữ nguyên thông tin khi đổi cấu trúc câu.', 'Thay từ/cụm từ bằng cách nói A1–A2 tương đương.', 'Viết lại một lời yêu cầu theo cách lịch sự hơn.'],
    48: ['Lập dàn ý giới thiệu bản thân có mở, thân và kết.', 'Nói 1–2 phút với ít nhất hai ý chính và ví dụ.', 'Tự chấm bài nói bằng rubric bốn tiêu chí.']
}


def objectives_for(number, focus):
    if number in SPECIAL_OBJECTIVES: return SPECIAL_OBJECTIVES[number]
    return [f'Nhận diện {focus} trong ít nhất ba câu ngắn.', f'Tạo hai câu dùng {focus} đúng ngữ cảnh.', f'Tự sửa một lỗi liên quan đến {focus} sau khi nghe hoặc viết.']


def writing_keywords_for(number, focus):
    if number <= 4: return ['am', 'is', 'are']
    if number in {5, 8, 11}: return ['every', 'usually', 'now', 'does', 'is']
    if number in {6, 7, 20}: return ['do', 'does']
    if number in {9}: return ['noun', 'adjective', 'adverb']
    if number == 10: return ['am', 'is', 'are']
    if number in {12, 13, 14}: return ['did', 'was', 'were']
    if number == 15: return ['have', 'has', 'since', 'for']
    if number in {16, 17}: return ['will']
    if number in {18, 19}: return ['s', 'ed', 'stress']
    if number == 21: return ['name', 'number']
    if number == 22: return ['can', 'should', 'must']
    if number in {23, 24, 25}: return ['and', 'but', 'because', 'when', 'although']
    if number in {26, 27, 28}: return ['if']
    if number in {29, 30}: return ['listen', 'write', 'answer']
    if number == 31: return ['at', 'o’clock']
    if number == 32: return ['on', 'in']
    if number == 33: return ['next', 'across', 'at']
    if number == 34: return ['dollar', 'card', 'how much']
    if number == 35: return ['myself', 'yourself', 'themselves']
    if number == 36: return ['since', 'when', 'before', 'after']
    if number == 37: return ['please', 'could']
    if number == 38: return ['either', 'neither', 'both']
    if number == 39: return ['from', 'in']
    if number == 40: return ['enjoy', 'like']
    if number == 41: return ['by', 'ride']
    if number == 42: return ['play', 'good at']
    if number == 43: return ['is', 'works', 'does']
    if number == 44: return ['use', 'turn on']
    if number == 45: return ['thank', 'sorry', 'would']
    if number == 46: return ['name', 'work', 'like']
    if number == 47: return ['please', 'close', 'small']
    return ['hello', 'today', 'thank']


def curriculum_for(number, focus):
    introduces = [focus]
    reinforces = [f'Ôn lại mục tiêu Ngày {max(number-1, 1):02d}'] if number > 1 else ['Câu đơn và đại từ nhân xưng']
    prepares = [f'Chuẩn bị cho Ngày {min(number+1, 48):02d}'] if number < 48 else ['Bài trình bày cuối khóa']
    retrieval = sorted(set([max(1, number-1), max(1, number-3)]))
    return {'prerequisites': PREREQS[number], 'introduces': introduces, 'reinforces': reinforces, 'preparesFor': prepares, 'retrievalFromDays': retrieval, 'canDoOutcome': f'Người học có thể dùng {focus} trong một tình huống A1–A2 quen thuộc.'}


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

def grammar_for(number, focus, examples):
    ex = ' '.join(f'{esc(s)}' for s in examples)
    mistakes = ' '.join(f'<li>{esc(item)}</li>' for item in MISTAKES[number])
    return f'<p><strong>Mục tiêu:</strong> {esc(focus)}.</p><p><strong>Quy tắc thao tác:</strong> Đọc chủ ngữ, xác định dấu hiệu thời gian/chức năng, chọn khung câu rồi mới thay từ. Ví dụ: {ex}</p><p><strong>Lỗi người Việt hay gặp trong bài này:</strong></p><ul>{mistakes}</ul>'

def quiz_for(number, focus, examples):
    a, b, c = examples
    return [
        {'id': f'day-{number}-q-01', 'type': 'multiple-choice', 'question': f'Chọn câu đúng về {focus}.', 'options': ([a, c, b] if number % 3 == 0 else [b, c, a] if number % 3 == 1 else [c, a, b]), 'correctIndex': (2 if number % 3 == 0 else 0 if number % 3 == 1 else 1), 'explanation': f'Câu "{a}" dùng đúng trọng tâm {focus}; các lựa chọn còn lại kiểm tra hai lỗi dễ nhầm về ngữ cảnh hoặc cấu trúc.'},
        {'id': f'day-{number}-q-02', 'type': 'fill-blank', 'prompt': f'Điền từ còn thiếu để kiểm tra {focus}.', 'sentence': '___ ' + ' '.join(a.split()[1:]), 'blanks': [{'acceptedAnswers': [a.split()[0]], 'answer': a.split()[0]}], 'explanation': f'Từ "{a.split()[0]}" là mảnh cần nghe/nhớ để hoàn chỉnh câu theo {focus}.'},
        {'id': f'day-{number}-q-03', 'type': 'transformation', 'prompt': f'Viết lại câu theo yêu cầu về {focus}.', 'instruction': 'Thực hiện phép chuyển đổi theo cấu trúc bài học; kiểm tra chủ ngữ, trợ động từ và dạng động từ.', 'sourceSentence': a, 'acceptedAnswers': [b], 'answer': b, 'explanation': f'Câu trả lời dùng đúng thao tác chuyển đổi của {focus}; kiểm tra chủ ngữ, trợ động từ và dạng động từ trước khi nộp.'},
        {'id': f'day-{number}-q-04', 'type': 'matching', 'prompt': f'Nối câu với tình huống phù hợp về {focus}.', 'leftItems': [a, b, c], 'rightItems': [f'Tình huống B: {b}', f'Tình huống C: {c}', f'Tình huống A: {a}'], 'correctMatches': [2, 0, 1], 'explanation': f'Mỗi cặp được nối theo nghĩa và dấu hiệu cấu trúc của {focus}, không chỉ theo vị trí từ.'},
        {'id': f'day-{number}-q-05', 'type': 'short-answer', 'prompt': f'Gõ lại câu tham chiếu để kiểm tra trí nhớ về {focus}:', 'acceptedAnswers': [c], 'answer': c, 'placeholder': 'Gõ lại câu tham chiếu…', 'explanation': f'Câu được chấp nhận khi khớp câu tham chiếu "{c}"; hoạt động này kiểm tra gọi lại chính xác cấu trúc {focus}.'}
    ]

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
    day['learningObjectives'] = objectives_for(number, focus)
    curriculum = curriculum_for(number, focus)
    day['prerequisites'] = '; '.join(curriculum['prerequisites'])
    day['bridgeFromPreviousDay'] = f"Gọi lại {', '.join(curriculum['reinforces'])}; sau đó chuyển sang {focus}."
    day['introduces'] = curriculum['introduces']
    day['reinforces'] = curriculum['reinforces']
    day['preparesFor'] = curriculum['preparesFor']
    day['retrievalFromDays'] = curriculum['retrievalFromDays']
    day['canDoOutcome'] = curriculum['canDoOutcome']
    day['pronunciationFocus'] = PRONUNCIATION[number]
    day['commonMistakes'] = MISTAKES[number]
    day['estimatedMinutes'] = MINUTES[number]
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
    day['masteryCriteria'] = f"Hoàn thành đủ sáu bước; đạt ít nhất 4/5 câu quiz; đúng 3 nhiệm vụ nghe; nói đủ 3 câu; đạt 2 đầu ra viết theo rule của bài; đánh giá đủ 5 thẻ SRS."
    day['contentOrigin'] = 'mixed' if day.get('grammarContent', '').strip() else 'workbook-authored'
    day['writingRules'] = [f'Phải dùng đúng dấu hiệu/cấu trúc {focus}.', 'Phải có chủ ngữ, động từ và dấu câu.', 'Không đánh dấu đạt nếu câu dài nhưng lệch nhiệm vụ.']
    day['writingKeywords'] = writing_keywords_for(number, focus)
    grammar = day.get('grammarContent', '').strip()
    if (not grammar) or '<strong>Mục tiêu hôm nay:</strong>' in grammar or 'Quan sát chủ ngữ, động từ và từ chỉ thời gian' in grammar or 'Mẫu luyện tập do workbook biên soạn' in grammar:
        day['grammarContent'] = grammar_for(number, focus, examples)
    else:
        grammar = re.sub(r'<p><strong>Góc tự luyện:</strong>.*?</p>', '', grammar)
        day['grammarContent'] = grammar.rstrip() + f'<p><strong>Góc tự luyện:</strong> {esc(" ".join(MISTAKES[number]))}</p>'
    if not day.get('warmupScript', '').strip():
        day['warmupScript'] = '\n'.join(examples)
    listening_items = []
    for item_index, sentence in enumerate(examples[:3]):
        words = sentence.split()
        blank_index = 1 if item_index < 2 and len(words) > 1 else 0
        if item_index == 1 and len(words) > 3:
            blank_index = len(words) - 1
        answer = words[blank_index].strip('.,!?')
        masked = ' '.join(('___' if index == blank_index else word) for index, word in enumerate(words))
        listening_items.append({'audioText': sentence, 'blankSentence': masked, 'answer': answer})
    day['listeningItems'] = listening_items
    day['shadowingSentences'] = examples[:3]
    day['writingPrompts'] = prompts[:2]
    day['quiz'] = quiz_for(number, focus, examples)
    cards = list(day.get('srsCards') or [])
    for sentence in examples:
        if len(cards) >= 5: break
        cards.append({'front': sentence, 'back': f'Ví dụ luyện tập cho {focus}.'})
    while len(cards) < 5:
        cards.append({'front': f'What does {focus} mean?', 'back': 'Hãy giải thích bằng tiếng Việt và tạo một câu.'})
    day['srsCards'] = cards[:5]
    note = day.get('sourceNote', '').strip().replace(OLD_AUTHORED_NOTE, '').strip()
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

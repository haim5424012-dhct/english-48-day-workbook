# Quiz schema gaps — tổng hợp Ngày 1, 3–15

Tài liệu này chỉ kiểm kê format nguồn để phục vụ quyết định mở rộng schema sau. Các câu không khớp schema `quiz` options hiện tại **không được chuyển đổi hoặc bịa phương án** trong các batch đã xử lý.

| Ngày | Dạng không phải MCQ / cần schema mới | Số câu hoặc mục | MCQ và số lựa chọn gốc |
|---|---|---:|---|
| 1 | Điền/viết theo bài thi và đáp án; artifact text bài thi không còn trong bộ nguồn đã lưu nên không định lượng đáng tin cậy | Chưa xác định | Chưa xác định từ artifact hiện có |
| 3 | Nối câu hỏi–đáp án | 5 cặp | 5 câu 2 lựa chọn + 5 câu 3 lựa chọn |
| 3 | Viết câu trả lời theo hình | 5 | — |
| 4 | Viết câu trả lời theo hình | 5 | 5 câu 2 lựa chọn + 5 câu 3 lựa chọn |
| 5 | Chuyển động từ sang dạng V(s/es) | 8 mục | 12 câu 2 lựa chọn |
| 6 | Chuyển câu khẳng định sang phủ định | 5 câu (Câu 16–20) | 10 câu 3 lựa chọn |
| 7 | Viết câu trả lời Yes/No theo hình | 5 | 10 câu 2 lựa chọn |
| 8 | Điền/chia động từ hiện tại đơn | 10 câu | 10 câu 3 lựa chọn |
| 9 | Xác định từ loại trong câu | 5 câu | 5 câu 2 lựa chọn + 5 câu 3 lựa chọn |
| 10 | Chuyển động từ sang V-ing; điền/chia hiện tại tiếp diễn | 5 mục + 5 câu | 10 câu 3 lựa chọn |
| 11 | Chuyển động từ sang V(s/es) và V-ing; điền/chia thì | 5 mục + 5 câu | 10 câu 3 lựa chọn |
| 12 | Chuyển động từ sang quá khứ; điền/chia quá khứ đơn | 5 mục + 5 câu | 10 câu 3 lựa chọn |
| 13 | Điền/chia quá khứ đơn phủ định/nghi vấn; trả lời Yes/No theo hình | 5 + 5 câu | 10 câu 3 lựa chọn |
| 14 | Điền/chia quá khứ tiếp diễn | 5 câu | 5 câu 2 lựa chọn + 10 câu 3 lựa chọn |
| 15 | Chuyển động từ sang quá khứ phân từ; điền/chia hiện tại hoàn thành | 5 mục + 5 câu | 5 câu 2 lựa chọn + 10 câu 3 lựa chọn |
| 16 | Điền/chia động từ tương lai đơn; trả lời ngắn theo hình | 5 + 5 câu | 10 câu 3 lựa chọn |
| 17 | Điền/chia động từ tương lai hoàn thành | 5 câu | 5 câu 2 lựa chọn + 10 câu 3 lựa chọn |
| 18 | Chọn từ chứa âm mục tiêu theo phiên âm | — | 20 câu 2 lựa chọn |
| 19 | Chọn vị trí trọng âm; chọn từ theo vị trí trọng âm | — | 5 câu 2 lựa chọn + 5 câu 3 lựa chọn + 5 câu 2 lựa chọn |
| 20 | Điền từ để hỏi; viết câu hỏi từ từ gợi ý | 5 + 5 câu | 10 câu 3 lựa chọn |

## Ghi chú phương pháp

Các số lượng trên được đếm từ các file text bài thi online đã lưu trong `/home/ubuntu/english_learning_project/materials/ngay_03` đến `ngay_15`, cùng báo cáo batch 1–2 đối với Ngày 1 và các ngày đã xử lý trước. Ngày 1 được ghi là chưa xác định thay vì suy đoán vì artifact bài thi text không có trong thư mục nguồn hiện tại. Các block MCQ được ghi theo số lựa chọn thực tế trong từng block; không giả định mọi ngày đều có 3 lựa chọn.

Ngày 11–20 có các dạng mới cần cân nhắc khi thiết kế schema sau này: bảng biến đổi động từ, điền/chia động từ, trả lời ngắn theo hình, câu hỏi âm vị, xác định vị trí trọng âm, chọn từ theo vị trí trọng âm, điền từ để hỏi và viết câu hỏi từ từ gợi ý. Ngày 13 có câu trả lời theo quy ước `Did – break`; Ngày 15, 16 và 17 có dạng điền hai vị trí hoặc nhiều thành phần như `have – made`, `Will – tell`, `Will – have arrived`. Không mở rộng schema trong Batch 4.

Nguồn Batch 4 được lưu trong `source-extracts/batch-4/ngay-16.md` đến `ngay-20.md`; các số lượng trên dựa trên PDF đề online đã tải hoặc trang đáp án công khai khi FILE ĐỀ Drive không truy cập được. Riêng FILE ĐỀ online Ngày 16 trả 404 qua Drive API nên chỉ ghi nhận format từ trang đáp án công khai và giữ trạng thái pending-source cho file Drive.


## Batch 5 — Ngày 21–25

| Ngày | Dạng không phải MCQ / cần schema mới | Số câu hoặc mục | MCQ và số lựa chọn gốc |
|---|---|---:|---|
| 21 | Viết số nghe được; viết số điện thoại; viết chữ cái; viết tên — đều phụ thuộc audio mp3 | 6 + 5 + 5 + 5 | 5 câu chọn số 2 lựa chọn + 5 câu chọn chữ cái 2 lựa chọn |
| 22 | Không có dạng ngoài MCQ trong đề online | — | 20 câu 2 lựa chọn |
| 23 | Điền một liên từ duy nhất từ hộp cho mỗi chỗ trống | 5 câu | 15 câu 2 lựa chọn |
| 24 | Điền một liên từ chỉ thời gian duy nhất từ hộp cho mỗi chỗ trống | 5 câu | 15 câu 2 lựa chọn |
| 25 | Không có dạng ngoài MCQ trong đề online | — | 20 câu 2 lựa chọn |

Đối với Ngày 21, PDF ĐÁP ÁN Drive đã tải được nhưng lớp text chỉ còn watermark/metadata, nên không dùng để suy đoán đáp án. Các bài viết số, số điện thoại, chữ cái và tên cần audio gốc hoặc đáp án xác minh trước khi đưa vào dữ liệu tương tác. Batch 5 không chuyển các câu trên thành MCQ 3 lựa chọn.


## Batch 6 — Ngày 26–30

| Ngày | Dạng không phải MCQ / cần schema mới | Số câu hoặc mục | MCQ và số lựa chọn gốc |
|---|---|---:|---|
| 26 | Chia dạng thức động từ trong ngoặc | 10 câu | 10 câu, mỗi câu 2 lựa chọn |
| 27 | Chia dạng thức động từ trong ngoặc | 10 câu | 10 câu, mỗi câu 2 lựa chọn |
| 28 | Chia dạng thức câu điều kiện loại 3 của động từ trong ngoặc | 5 câu | 15 câu, mỗi câu 2 lựa chọn |
| 29 | Nghe điền tên, số điện thoại, lớp học, hoạt động, vị trí và hội thoại tổng hợp | 24 chỗ trống | —; toàn bộ phụ thuộc mp3.1–mp3.6 |
| 30 | Nghe điền từ/chép chính tả theo các đoạn mp3 | 19 chỗ trống | —; toàn bộ phụ thuộc mp3.1–mp3.6 |

Batch 6 tiếp tục cho thấy hai nhóm cần schema riêng: **điền/chia động từ không có options** và **nghe điền thông tin/chép chính tả phụ thuộc audio**. Các câu MCQ 2 lựa chọn của Ngày 26–28 được thống kê nhưng chưa chuyển vào `quiz` chính thức; audio/video gốc của Ngày 29–30 không được tải hoặc nhúng khi chưa xác minh quyền sử dụng.


## Batch 7 — Ngày 31–35

| Ngày | Dạng không phải MCQ / cần schema mới | Số câu hoặc mục | MCQ và số lựa chọn gốc |
|---:|---|---:|---|
| 31 | Nghe viết số giờ | 10 câu | 8 câu 2 lựa chọn + 5 câu 3 lựa chọn |
| 32 | Nghe viết ngày, năm và ngày–tháng | 15 câu theo PDF bài học | 9 câu 2 lựa chọn + 5 câu 3 lựa chọn |
| 33 | Nghe điền địa điểm/từ trong đoạn văn và hội thoại | 9 chỗ trống | 6 câu 2 lựa chọn |
| 34 | Nghe điền thông tin về đồ vật, màu sắc, giá tiền và tính chất | 8 chỗ trống | 10 câu 3 lựa chọn |
| 35 | FILE ĐỀ online và ĐÁP ÁN Drive liên kết ở Sheet mang chủ đề “Sự hoà hợp về thì”, không khớp “Đại từ phản thân”; cần xác minh nguồn đúng trước khi định lượng bài thi | Chưa xác định | PDF bài học có các bài chọn đáp án 2 lựa chọn, nhưng chưa coi là đề online chính thức |

Batch 7 bổ sung hai nhóm cần schema riêng: **nghe viết/điền không có options** và **bài nghe phụ thuộc audio**. Ngày 35 không được ánh xạ câu hỏi từ file lệch chủ đề; không dùng dữ liệu “Sự hoà hợp về thì” để lấp bài Đại từ phản thân. Không mở rộng schema quiz trong batch này.


## Batch 8 — Ngày 36–40

| Ngày | Dạng không phải MCQ / cần schema mới | Số câu hoặc mục | MCQ và số lựa chọn gốc |
|---:|---|---:|---|
| 36 | Không có dạng ngoài MCQ trong đề online đã đọc | — | 20 câu, mỗi câu 2 lựa chọn |
| 37 | Nghe điền lời chào, tuổi, thời tiết, địa điểm và hướng đi | 11 chỗ trống | 2 câu nghe chọn đáp án, mỗi câu 2 lựa chọn |
| 38 | Không có dạng ngoài MCQ trong đề online đã đọc | — | 20 câu, mỗi câu 2 lựa chọn |
| 39 | Nghe điền thông tin tên, tuổi, quốc tịch và nghề nghiệp | 7 chỗ trống | 12 câu 2 lựa chọn + 2 câu 3 lựa chọn |
| 40 | Nghe điền từ về sở thích; đánh dấu/ghép sở thích theo người nói | 4 chỗ trống + 3 mục ghép/đánh dấu | 5 câu 2 lựa chọn + 3 câu 2 lựa chọn |

Batch 8 tiếp tục cho thấy cần schema riêng cho **nghe điền thông tin**, **đánh dấu/ghép theo người nói** và nội dung nghe phụ thuộc mp3. Ngày 39 có PDF đề online/đáp án nhưng thiếu PDF FILE ĐỀ lý thuyết trong kho artifact hiện tại; không suy đoán Grammar/Vocabulary. Không mở rộng schema quiz và không ánh xạ các câu trên vào `days.json` trong batch này.

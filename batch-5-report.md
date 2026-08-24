# Báo cáo Batch 5 — Ngày 21–25

**Ngày xử lý:** 24/08/2026  
**Phạm vi:** kiểm kê Google Sheet, tải/trích xuất artifact truy cập được, đối chiếu đáp án công khai, merge dữ liệu nguồn và đồng bộ website.

## 1. Kết luận

Batch 5 đã cập nhật dữ liệu nguồn cho **Ngày 21–25** vào cả `data/days.json` và `client/src/data/days.json`. Mỗi ngày có `sourceNote`, `grammarContent` và 5 thẻ SRS được xây từ PDF lý thuyết và ví dụ có thể truy vết. Các trường `listeningItems`, `shadowingSentences`, `writingPrompts` và `quiz` vẫn để rỗng khi dữ liệu cần audio, dạng điền/viết hoặc schema chưa được xác nhận.

Không có audio/video gốc nào được tải hoặc nhúng. BÀI HỌC của cả 5 ngày là video YouTube chưa có transcript. PDF ĐÁP ÁN Ngày 21 đã tải được nhưng text chỉ còn watermark/metadata nên không suy đoán đáp án.

## 2. Manifest nguồn

| Ngày | FILE ĐỀ | BÀI HỌC | FILE ĐỀ online | ĐÁP ÁN |
|---:|---|---|---|---|
| 21 | PDF tải được | YouTube, chưa transcript | PDF tải được | PDF tải được nhưng text không đủ đọc đáp án |
| 22 | PDF tải được | YouTube, chưa transcript | PDF tải được | Blog HTML đọc được |
| 23 | PDF tải được | YouTube, chưa transcript | PDF tải được | Blog HTML đọc được |
| 24 | PDF tải được | YouTube, chưa transcript | PDF tải được | Blog HTML đọc được |
| 25 | PDF tải được | YouTube, chưa transcript | PDF tải được | Blog HTML đọc được |

ID Drive, số hàng Sheet và URL được lưu tại `source-extracts/batch-5-source-manifest.json`; PDF nguyên bản, metadata và text nằm trong `source-extracts/batch-5/originals/` và `text/`.

## 3. Nội dung đã nạp

| Ngày | Chủ đề | Nội dung đã nạp | SRS |
|---:|---|---|---:|
| 21 | Luyện nghe số và tên | Số lớn, số điện thoại, bảng chữ cái/phiên âm, first name + family name | 5 |
| 22 | Động từ khuyết thiếu | must/have to, mustn’t/don’t have to, can/could, may/might, should, needn’t, will/shall | 5 |
| 23 | And, but, or, so và because | Nối thành phần, lựa chọn, kết quả, lý do và đối lập | 5 |
| 24 | Liên từ chỉ thời gian | when, as, as soon as, once, before, after, until, since, while | 5 |
| 25 | Liên từ chỉ sự đối lập | although/even though/though, while/whereas và quy tắc không dùng but cùng cấu trúc | 5 |

## 4. Dạng bài chưa ánh xạ schema

| Ngày | Dạng bài nguồn | Số lượng | Lựa chọn gốc |
|---:|---|---:|---|
| 21 | Viết số; viết số điện thoại; viết chữ cái; viết tên, phụ thuộc audio | 6 + 5 + 5 + 5 | 5 câu chọn số 2 lựa chọn; 5 câu chọn chữ cái 2 lựa chọn |
| 22 | Không có dạng ngoài MCQ trong đề online | — | 20 câu 2 lựa chọn |
| 23 | Điền một liên từ duy nhất từ hộp | 5 câu | 15 câu 2 lựa chọn |
| 24 | Điền một liên từ chỉ thời gian duy nhất từ hộp | 5 câu | 15 câu 2 lựa chọn |
| 25 | Không có dạng ngoài MCQ trong đề online | — | 20 câu 2 lựa chọn |

Các format trên đã được thêm vào `quiz-schema-gaps.md`; Batch 5 không chuyển thành MCQ 3 lựa chọn và không ghi vào `quiz` chính thức.

## 5. Kiểm tra bảo toàn dữ liệu

Importer `scripts/import-batch-5.py` dùng `merge_source_fields`: chỉ cập nhật các trường có dữ liệu mới, bỏ qua mảng rỗng tùy chọn và giữ dữ liệu cũ. Hai file JSON được kiểm tra đồng nhất bằng `cmp`. Phiên bản dữ liệu là `0.5-source-batch-5`.

## 6. Kiểm thử và QA

Đã chạy importer, kiểm tra manifest đủ 10 dòng nguồn, kiểm tra 5 ngày có `sourceNote`, `grammarContent` và 5 SRS cards/ngày, rebuild chỉ mục, `node scripts/test-days.mjs`, `pnpm check` và `pnpm build`; build đạt với các cảnh báo không chặn. Preview file:// Ngày 21 và Ngày 25 cũng render đúng sau khi tạo lại gói Comet.

## 7. Tệp truy vết

- `source-extracts/batch-5-source-manifest.json`
- `source-extracts/batch-5/ngay-21.md` đến `ngay-25.md`
- `source-extracts/batch-5/online-answer-extracts.md`
- `scripts/import-batch-5.py`
- `quiz-schema-gaps.md`
- `data/days.json` và `client/src/data/days.json`

## 8. Giới hạn

BÀI HỌC video chưa có transcript; audio mp3 Ngày 21 chưa được tải hoặc nhúng. Đáp án PDF Ngày 21 không trích xuất được nội dung câu trả lời. Các dạng điền/viết và toàn bộ quiz Batch 5 chưa được đưa vào dữ liệu chính thức do quyết định chưa mở rộng schema. Nội dung đã nạp chỉ bao gồm phần lý thuyết và SRS có bằng chứng.

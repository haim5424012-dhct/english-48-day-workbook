# Báo cáo Batch 8 — Ngày 36–40

**Ngày thực hiện:** 24/08/2026  
**Dự án:** 48 Ngày Lấy Gốc Tiếng Anh  
**Phạm vi:** Ngày 36 đến Ngày 40, theo cùng quy trình các batch trước.

## 1. Kết luận

Batch 8 đã được kiểm kê từ tab duy nhất của Google Sheet, với các dòng 107–121 cho Ngày 36–40. Các PDF truy cập được đã được lưu trong `source-extracts/batch-8/originals/`, chuyển sang text bằng `pdftotext -layout`, và diễn giải có vị trí dòng trong các file `ngay-36.md` đến `ngay-40.md`. Dữ liệu học được merge bằng `merge_source_fields` vào cả `data/days.json` và `client/src/data/days.json`; các mảng `quiz`, `listeningItems`, `shadowingSentences` và `writingPrompts` rỗng không được xem là lệnh xóa.

Ngày 36, 37, 38 và 40 có `grammarContent` từ PDF lý thuyết; Ngày 39 không được suy đoán Grammar/Vocabulary vì artifact hiện có chỉ gồm đề online/đáp án, chưa có PDF FILE ĐỀ lý thuyết tương ứng. Cả năm ngày có 5 thẻ SRS dựa trên ví dụ hoặc transcript đã đọc. Quiz chính thức vẫn chưa được ánh xạ; các format không tương thích được ghi trong `quiz-schema-gaps.md`.

## 2. Ma trận nguồn

| Ngày | Chủ đề | FILE ĐỀ/BÀI HỌC | Đề online/ĐÁP ÁN | Trạng thái |
|---:|---|---|---|---|
| 36 | Sự hòa hợp về thì | PDF lý thuyết + YouTube trong Sheet | PDF đề 20 câu 2 lựa chọn + PDF đáp án | Đọc được; không nhúng video |
| 37 | Tiếng Anh giao tiếp (1) | PDF lý thuyết + YouTube trong Sheet | PDF đề/đáp án; file đề online lấy từ folder | Đọc được; bài nghe phụ thuộc mp3 |
| 38 | Liên từ tương hỗ | PDF lý thuyết + YouTube trong Sheet | PDF đề 20 câu 2 lựa chọn + PDF đáp án | Đọc được; không nhúng video |
| 39 | Luyện nghe về các quốc gia và châu lục | Folder FILE ĐỀ và YouTube trong Sheet; chưa có PDF lý thuyết trong artifact | PDF đề online/đáp án 21 câu | Thiếu PDF FILE ĐỀ lý thuyết; không suy đoán |
| 40 | Luyện nghe về sở thích | PDF lý thuyết + YouTube trong Sheet | PDF đề/đáp án; file đề online lấy từ folder | Đọc được; bài nghe phụ thuộc mp3 |

## 3. Nội dung đã nạp

Ngày 36 được nạp các mẫu phối hợp thì với `since`, `when`, `by the time` và `as soon as/once/until/as`. Ngày 37 được nạp giao tiếp chào hỏi, hỏi đáp thời tiết và hỏi đường. Ngày 38 được nạp bốn cặp liên từ `either…or`, `neither…nor`, `both…and` và `not only…but also`. Ngày 40 được nạp mẫu câu hỏi, nói và trả lời về sở thích. Ngày 39 chỉ nạp SRS từ transcript/đề online đã đọc, giữ `grammarContent` rỗng và ghi rõ giới hạn nguồn.

| Trường sau import | Ngày 36 | Ngày 37 | Ngày 38 | Ngày 39 | Ngày 40 |
|---|---:|---:|---:|---:|---:|
| `grammarContent` | Có | Có | Có | Rỗng — SOURCE STATUS | Có |
| `srsCards` | 5 | 5 | 5 | 5 | 5 |
| `quiz` chính thức | 0 | 0 | 0 | 0 | 0 |
| `listeningItems`/`writingPrompts`/`shadowingSentences` | Giữ nguyên rỗng | Giữ nguyên rỗng | Giữ nguyên rỗng | Giữ nguyên rỗng | Giữ nguyên rỗng |

## 4. Khoảng trống schema quiz

Ngày 36 có 20 MCQ hai lựa chọn. Ngày 37 có 11 chỗ trống nghe điền và 2 câu nghe chọn đáp án hai lựa chọn. Ngày 38 có 20 MCQ hai lựa chọn. Ngày 39 có 12 câu hai lựa chọn, 7 chỗ trống và 2 câu ba lựa chọn. Ngày 40 có 5 câu hai lựa chọn, 4 chỗ trống, 3 câu hai lựa chọn và 3 mục đánh dấu/ghép theo người nói. Chi tiết đã được nối vào `quiz-schema-gaps.md`; chưa sửa schema hoặc chuyển đổi các câu này thành MCQ.

## 5. Kiểm thử và QA

`node scripts/test-days.mjs`, `pnpm check` và `pnpm build` đều đạt. Hai bản `days.json` và hai bản `days-index.json` đồng nhất. Đã kiểm tra trực quan các route hợp lệ `/ngay/36.html`, `/ngay/38.html`, `/ngay/39.html` và `/ngay/40.html`; tiêu đề, chủ đề và trạng thái nguồn hiển thị đúng. Route không có hậu tố `.html` không thuộc khai báo hiện tại và trả 404. Gói Comet self-contained đã được tạo lại sau khi build; ZIP bàn giao gồm mã nguồn, artifact nguồn, source extracts, báo cáo và thư mục preview Comet.

## 6. Tài liệu truy vết

| Tài liệu | Vai trò |
|---|---|
| `source-extracts/batch-8-source-manifest.json` | Hàng Sheet và liên kết nguồn của Ngày 36–40 |
| `source-extracts/batch-8-grid-links.json` | Hyperlink ẩn lấy từ grid data |
| `source-extracts/batch-8/ngay-36.md` … `ngay-40.md` | Trích xuất lý thuyết/đề online theo từng ngày |
| `source-extracts/batch-8/online-answer-extracts.md` | Bảng format và trạng thái đề online/đáp án |
| `scripts/import-batch-8.py` | Importer merge an toàn, đồng bộ hai bản JSON |
| `quiz-schema-gaps.md` | Tổng hợp dạng bài chưa khớp schema |
| `comet-preview-file-qa.md` | Nhật ký QA preview Comet |

## 7. Tài liệu tham khảo

[1]: https://docs.google.com/spreadsheets/d/1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI/edit "Google Sheet nguồn 48 Ngày Lấy Gốc Tiếng Anh"
[2]: https://drive.google.com/file/d/1DIzVvXkZUY05RARbAtei4E2XxH-lr4wy/view "PDF Sự hòa hợp về thì — Ngày 36"
[3]: https://drive.google.com/file/d/1ik2O8gsEa9jdktsABag-cnPGV6N2IKYF/view "PDF Tiếng Anh giao tiếp (1) — Ngày 37"
[4]: https://drive.google.com/file/d/1DuCf5zh-w0vhTi9NFyQVpFjq6V-9LjzX/view "PDF Liên từ tương hỗ — Ngày 38"
[5]: https://drive.google.com/file/d/1TBxG-4RaDDktdV34dhX-7anUxsRudutK/view "PDF Luyện nghe về sở thích — Ngày 40"

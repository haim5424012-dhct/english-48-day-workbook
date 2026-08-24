# Báo cáo Batch 9 — Ngày 41–45

**Ngày thực hiện:** 24/08/2026  
**Dự án:** 48 Ngày Lấy Gốc Tiếng Anh  
**Phạm vi:** Ngày 41 đến Ngày 45.

## 1. Kết luận

Batch 9 đã được kiểm kê từ tab duy nhất của Google Sheet, vùng `A122:H136`. Các PDF truy cập được của FILE ĐỀ, FILE ĐỀ online và ĐÁP ÁN đã được lưu trong `source-extracts/batch-9/originals/`, chuyển sang text bằng `pdftotext -layout`, và trích xuất theo ngày trong `source-extracts/batch-9/ngay-41.md` đến `ngay-45.md`.

Dữ liệu lý thuyết và SRS đã được merge bằng `merge_source_fields` vào cả `data/days.json` và `client/src/data/days.json`. Mỗi ngày có 5 thẻ SRS. Các trường `quiz`, `listeningItems`, `shadowingSentences` và `writingPrompts` chính thức vẫn không được tự điền từ các bài nghe/chỗ trống/bảng đánh dấu khi chưa có schema đã xác nhận; mảng rỗng không xóa dữ liệu cũ.

## 2. Ma trận nguồn

| Ngày | Chủ đề | FILE ĐỀ/BÀI HỌC | Đề online/ĐÁP ÁN | Trạng thái |
|---:|---|---|---|---|
| 41 | Luyện nghe về các phương tiện giao thông | PDF lý thuyết + video YouTube trong Sheet | PDF đề online trong folder + PDF đáp án | Đọc được; bài nghe phụ thuộc mp3, không nhúng media |
| 42 | Luyện nghe về thể thao | PDF lý thuyết + video YouTube trong Sheet | PDF đề online trong folder + PDF đáp án | Đọc được; bài nghe phụ thuộc mp3, không nhúng media |
| 43 | Luyện nghe về nghề nghiệp | PDF lý thuyết + video YouTube trong Sheet | PDF đề online trong folder + PDF đáp án | Đọc được; bài nghe phụ thuộc mp3, không nhúng media |
| 44 | Luyện nghe về công nghệ | PDF lý thuyết + video YouTube trong Sheet | PDF đề online trong folder + PDF đáp án | Đọc được; bài nghe phụ thuộc mp3, không nhúng media |
| 45 | Tiếng Anh giao tiếp (2) | PDF lý thuyết + video YouTube trong Sheet | PDF bài học/đáp án có Quiz và Practice | Đọc được; chưa ánh xạ quiz chính thức |

## 3. Nội dung đã nạp

Ngày 41 được nạp từ vựng phương tiện giao thông và mẫu hỏi đáp `How do you go/travel/get to... ?` — `I ... by ...`. Ngày 42 được nạp từ vựng thể thao, cách nói môn yêu thích và mẫu `good at/bad at`. Ngày 43 được nạp từ vựng nghề nghiệp và mẫu `What is your job?`/`What do you do?` — `I am a/an...` hoặc `I work as...`. Ngày 44 được nạp từ vựng thiết bị công nghệ/gia dụng cùng `download` và `turn off`. Ngày 45 được nạp tám nhóm giao tiếp: cảm ơn, xin lỗi, chúc mừng, khen, yêu cầu, đề nghị, lời mời và lời chúc.

| Trường sau import | Ngày 41 | Ngày 42 | Ngày 43 | Ngày 44 | Ngày 45 |
|---|---:|---:|---:|---:|---:|
| `grammarContent` | Có | Có | Có | Có | Có |
| `srsCards` | 5 | 5 | 5 | 5 | 5 |
| `quiz` chính thức | 0 | 0 | 0 | 0 | 0 |
| `listeningItems`/`writingPrompts`/`shadowingSentences` | Giữ nguyên | Giữ nguyên | Giữ nguyên | Giữ nguyên | Giữ nguyên |

## 4. Khoảng trống schema quiz

Ngày 41 có 7 câu chọn 2 lựa chọn và 9 chỗ trống nghe điền. Ngày 42 có 7 câu chọn 2 lựa chọn, 4 chỗ trống và bảng đánh dấu/ghép 3 người với 5 dụng cụ, trong đó 2 dụng cụ không được nhắc. Ngày 43 có 8 câu chọn 2 lựa chọn, 5 chỗ trống và bảng đánh dấu/ghép 3 người với 5 nghề, trong đó 2 nghề không được nhắc. Ngày 44 có 7 câu chọn 2 lựa chọn và 13 chỗ trống trong câu/đoạn nghe. Ngày 45 có 19 câu chọn 2 lựa chọn trong Quiz và Practice.

Các thống kê trên đã được nối vào `quiz-schema-gaps.md`. Chưa sửa schema, chưa chuyển đổi các câu nghe/chỗ trống/đánh dấu thành MCQ và chưa ghi fixture QuizLab vào dữ liệu thật.

## 5. Kiểm thử và QA

`node scripts/build-days-index.mjs`, `node scripts/test-days.mjs`, `pnpm check` và `pnpm build` đều đạt. Hai bản `days.json` và hai bản `days-index.json` đồng nhất. Đã kiểm tra trực quan các route hợp lệ `/ngay/41.html`, `/ngay/42.html`, `/ngay/43.html`, `/ngay/44.html` và `/ngay/45.html`; tiêu đề, chủ đề và trạng thái `NEXT` hiển thị đúng trong giao diện Editorial Lab Notebook. Route web không có hậu tố `.html` vẫn không thuộc khai báo Wouter hiện hành.

Preview Comet self-contained đã được tạo lại sau import và build. Bản gói giữ cơ chế index trung tâm, route shell và ảnh inline; không đưa mp3/video gốc vào website. Việc mở thử trên Comet Windows thực tế vẫn cần người dùng xác nhận.

## 6. Tệp truy vết chính

| Tệp | Vai trò |
|---|---|
| `source-extracts/batch-9-source-manifest.json` | Hàng Sheet và bốn liên kết nguồn Ngày 41–45 |
| `source-extracts/batch-9/sheet-grid.json` | Grid data dùng lập manifest |
| `source-extracts/batch-9/originals/` | PDF nguồn đã tải, không gồm audio/video |
| `source-extracts/batch-9/ngay-41.md` … `ngay-45.md` | Trích xuất nội dung theo ngày |
| `source-extracts/batch-9/online-answer-extracts.md` | Bảng format đề online và trạng thái phụ thuộc mp3 |
| `scripts/import-batch-9.py` | Importer merge an toàn và đồng bộ hai bản JSON |
| `quiz-schema-gaps.md` | Tổng hợp format quiz chưa khớp schema |
| `comet-preview-file-qa.md` | Nhật ký QA preview Comet |

## 7. Tài liệu tham khảo

[1]: https://docs.google.com/spreadsheets/d/1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI/edit "Google Sheet nguồn 48 Ngày Lấy Gốc Tiếng Anh"
[2]: https://drive.google.com/file/d/11KkXhMkXcVA2Q9jzAdvFt8OLUV1MAbTv/view "PDF phương tiện giao thông — Ngày 41"
[3]: https://drive.google.com/file/d/114u7QZWvn_eRWX1ddYw6q3Xyya7C6EPb/view "PDF thể thao — Ngày 42"
[4]: https://drive.google.com/file/d/1BsZw3fQLVXGuhAokPG1Ai6Q66UHWGwSk/view "PDF nghề nghiệp — Ngày 43"
[5]: https://drive.google.com/file/d/1dVAVKEg8g1kEo-0Y-FfPNrXQKgrzXGEu/view "PDF công nghệ — Ngày 44"
[6]: https://drive.google.com/file/d/1VgmgljnORPhgCyNhYm9GWGGticUSPFPx/view "PDF giao tiếp (2) — Ngày 45"

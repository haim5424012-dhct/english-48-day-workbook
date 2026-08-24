# Báo cáo Batch 10 — Ngày 46–48

**Ngày thực hiện:** 24/08/2026  
**Dự án:** 48 Ngày Lấy Gốc Tiếng Anh  
**Phạm vi xử lý:** Ngày 46 đến Ngày 48.  
**Ngoài phạm vi:** Ngày 49–50 không tồn tại trong workbook hiện hành; không tạo object mới.

## 1. Kết luận

Batch 10 đã được kiểm kê từ tab duy nhất của Google Sheet, vùng `A137:H145`. Các PDF truy cập được của FILE ĐỀ, FILE ĐỀ online và ĐÁP ÁN đã được lưu trong `source-extracts/batch-10/originals/`, chuyển sang text bằng `pdftotext -layout`, và trích xuất theo ngày trong `source-extracts/batch-10/ngay-46.md` đến `ngay-48.md`.

Dữ liệu lý thuyết và SRS đã được merge bằng `merge_source_fields` vào cả `data/days.json` và `client/src/data/days.json`. Mỗi ngày có 5 thẻ SRS. Các trường `quiz`, `listeningItems`, `shadowingSentences` và `writingPrompts` chính thức chưa được tự điền cho các dạng nghe, paraphrase, True/False hoặc điền từ chưa khớp schema; mảng rỗng được giữ nguyên, không phải lệnh xóa.

## 2. Ma trận nguồn

| Ngày | Chủ đề | FILE ĐỀ/BÀI HỌC | Đề online/ĐÁP ÁN | Trạng thái |
|---:|---|---|---|---|
| 46 | Kỹ năng Note-taking | PDF `Kỹ năng Note-taking.pdf` + video YouTube trong Sheet | PDF đề online trong folder + PDF đáp án riêng | Đọc được; không tải/nhúng mp3 |
| 47 | Kỹ năng Paraphrasing | PDF `Kỹ năng Paraphrasing.pdf` + video YouTube trong Sheet | PDF đề online trong folder + PDF đáp án | Đề online kiểm tra trực quan vì text extract chủ yếu là watermark; không tải/nhúng mp3 |
| 48 | Tự tin giới thiệu bản thân và thuyết trình bằng tiếng Anh | PDF lý thuyết + video YouTube trong Sheet | PDF đề online trong folder; hyperlink đáp án trùng file ID Ngày 47 | Đọc được; đáp án độc lập chưa xác minh; không tải/nhúng mp3 |

## 3. Nội dung đã nạp

Ngày 46 được nạp định nghĩa và kỹ thuật note-taking: ghi ngắn gọn thông tin nghe được, dùng từ khóa/thông tin chính và dùng bản note để suy ra hoặc chọn đáp án. Ngày 47 được nạp định nghĩa paraphrasing: diễn đạt khác câu ban đầu nhưng không đổi nghĩa, cùng yêu cầu giữ nguyên thông tin khi thay đổi từ vựng/cấu trúc. Ngày 48 được nạp từ vựng và cấu trúc bài giới thiệu/thuyết trình: giới thiệu chủ đề, nêu số phần, trình bày, kết thúc và trả lời câu hỏi.

| Trường sau import | Ngày 46 | Ngày 47 | Ngày 48 |
|---|---:|---:|---:|
| `grammarContent` | Có | Có | Có |
| `srsCards` | 5 | 5 | 5 |
| `quiz` chính thức | 0 | 0 | 0 |
| `listeningItems`/`writingPrompts`/`shadowingSentences` | Giữ nguyên | Giữ nguyên | Giữ nguyên |

## 4. Khoảng trống schema quiz

Ngày 46 có 8 câu nghe chọn 3 lựa chọn và 5 mệnh đề nghe đánh dấu True/False. Ngày 47 có 6 câu paraphrase chọn cách diễn đạt tương đương, 6 câu nghe chọn 2 lựa chọn và 5 mệnh đề nghe đánh dấu True/False. Ngày 48 có 7 chỗ trống trong bài giới thiệu bản thân và 8 chỗ trống trong bài thuyết trình.

Các thống kê đã được nối vào `quiz-schema-gaps.md`. Chưa sửa schema, chưa chuyển các dạng trên thành MCQ giả và chưa ghi fixture QuizLab vào dữ liệu thật.

## 5. Ngày 49–50

Google Sheet và `data/days-index.json` hiện chỉ có 48 ngày; `data/days.json` cũng chỉ có các object từ Ngày 1 đến Ngày 48. Vì vậy Ngày 49–50 được ghi nhận là ngoài phạm vi cấu trúc hiện hành, không tạo tiêu đề, object, nguồn hoặc route mới.

## 6. Kiểm thử và QA

`node scripts/build-days-index.mjs`, `node scripts/test-days.mjs`, `pnpm check` và `pnpm build` đều đạt. Hai bản `days.json` và hai bản `days-index.json` đồng nhất. Đã kiểm tra trực quan các route hợp lệ `/ngay/46.html`, `/ngay/47.html`, `/ngay/48.html` và `/lo-trinh`; tiêu đề, chủ đề, trạng thái `NEXT` và bố cục Editorial Lab Notebook hiển thị đúng. Build còn cảnh báo đã biết về cấu hình pnpm, chunk lớn và texture runtime, không phải lỗi biên dịch.

Preview Comet self-contained được tạo lại sau import; không đưa mp3/video gốc vào website. Việc mở ZIP trên Comet Windows thực tế vẫn cần người dùng xác nhận.

## 7. Tệp truy vết chính

| Tệp | Vai trò |
|---|---|
| `source-extracts/batch-10-source-manifest.json` | Hàng Sheet và bốn liên kết nguồn Ngày 46–48 |
| `source-extracts/batch-10/sheet-grid.json` | Grid data dùng lập manifest |
| `source-extracts/batch-10/online-folder-inventory.md` | PDF/audio phát hiện trong folder đề online |
| `source-extracts/batch-10/originals/` | PDF nguồn đã tải, không gồm audio/video |
| `source-extracts/batch-10/ngay-46.md` … `ngay-48.md` | Trích xuất nội dung theo ngày |
| `source-extracts/batch-10/online-answer-extracts.md` | Bảng format đề online và giới hạn đáp án/audio |
| `scripts/import-batch-10.py` | Importer merge an toàn, đồng bộ hai bản JSON và bảo toàn ranh giới 48 ngày |
| `quiz-schema-gaps.md` | Tổng hợp format quiz chưa khớp schema |
| `comet-preview-file-qa.md` | Nhật ký QA preview Comet |

## 8. Tài liệu tham khảo

[1]: https://docs.google.com/spreadsheets/d/1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI/edit "Google Sheet nguồn 48 Ngày Lấy Gốc Tiếng Anh"
[2]: https://drive.google.com/file/d/1iDIoDTIxrdujs4170rHO1pu2VmCBkrTF/view "PDF Kỹ năng Note-taking — Ngày 46"
[3]: https://drive.google.com/file/d/1lZWVQLEw8QT5i0_YT7i2NtyWixCFPO_D/view "PDF Kỹ năng Paraphrasing — Ngày 47"
[4]: https://drive.google.com/file/d/14CDOAPh6rq_juONl1c7Gy7xl4seo886R/view "PDF Tự tin giới thiệu bản thân và thuyết trình — Ngày 48"

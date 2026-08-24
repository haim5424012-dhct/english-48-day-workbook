# Báo cáo Batch 4 — Ngày 16–20

**Ngày xử lý:** 24/08/2026  
**Phạm vi:** kiểm kê nguồn Google Sheet, tải/trích xuất artifact truy cập được, đối chiếu trang đáp án công khai, merge dữ liệu nguồn và đồng bộ website.

## 1. Kết luận ngắn

Batch 4 đã cập nhật dữ liệu nguồn cho **Ngày 16–20** vào cả `data/days.json` và `client/src/data/days.json`. Mỗi ngày hiện có `sourceNote`, `grammarContent` và 5 `srsCards` được xây từ ví dụ/lý thuyết đã trích xuất. Các trường `listeningItems`, `shadowingSentences`, `writingPrompts` và `quiz` vẫn là mảng rỗng vì artifact hiện có không cung cấp dữ liệu tương ứng đủ để nhập an toàn hoặc dạng bài chưa khớp schema quiz hiện hành.

Không có nội dung video/audio nào được tải hoặc nhúng. FILE ĐỀ online Drive của Ngày 16 trả 404 qua Drive API; trường hợp này được ghi rõ trong source extract và sourceNote, còn format/đáp án được ghi nhận từ trang blog công khai có thể truy cập.

## 2. Sổ nguồn và kết quả truy cập

| Ngày | FILE ĐỀ | BÀI HỌC | FILE ĐỀ online | ĐÁP ÁN |
|---|---|---|---|---|
| 16 | PDF tải được | YouTube, chưa transcript | Drive 404/pending-source | Blog HTML đọc được |
| 17 | PDF tải được | YouTube, chưa transcript | PDF tải được | Blog HTML đọc được |
| 18 | PDF tải được | YouTube, chưa transcript | PDF tải được | Blog HTML đọc được |
| 19 | PDF tải được | YouTube, chưa transcript | PDF tải được | Blog HTML đọc được |
| 20 | PDF tải được | YouTube, chưa transcript | PDF tải được | Blog HTML đọc được |

Các link, ID Drive, tên file, phạm vi text và giới hạn được lưu tại `source-extracts/batch-4/ngay-16.md` đến `ngay-20.md`, `source-extracts/batch-4/online-answer-extracts.md` và `source-extracts/batch-4/originals/download-errors.tsv`.

## 3. Dữ liệu đã nạp vào website

| Ngày | Chủ đề | Nội dung đã nạp | SRS | Quiz chính thức |
|---:|---|---|---:|---|
| 16 | Thì tương lai đơn | Khẳng định, phủ định, nghi vấn, cách dùng và dấu hiệu của `will + V` | 5 | Chưa nạp |
| 17 | Thì tương lai hoàn thành | `will have + V-ed/cột 3`, phủ định, nghi vấn, `by` và `next + for` | 5 | Chưa nạp |
| 18 | Ngữ âm | IPA, nguyên âm đơn/đôi, 24 phụ âm và ví dụ phiên âm | 5 | Chưa nạp |
| 19 | Trọng âm | Âm tiết, ký hiệu trọng âm, quy tắc nguồn và hậu tố | 5 | Chưa nạp |
| 20 | Từ để hỏi | `How`, `How much`, `How many`, `How far`, `How old`, `How often`, `How long`, `Why`, `Which` | 5 | Chưa nạp |

Phiên bản dữ liệu đã tăng lên `0.4-source-batch-4`. Hai file JSON được kiểm tra bằng `cmp` và đồng nhất.

## 4. Dạng bài thi chưa ánh xạ schema

| Ngày | Dạng gốc | Số lượng | Ghi chú |
|---:|---|---:|---|
| 16 | Điền/chia động từ; trả lời ngắn theo hình | 5 + 5 | Ngoài schema options hiện hành |
| 17 | Điền/chia động từ | 5 | Có câu nhiều ô trống; MCQ trộn 2/3 lựa chọn |
| 18 | Chọn từ chứa âm mục tiêu | 20 | MCQ 2 lựa chọn; cần hỗ trợ phoneme metadata nếu mở rộng |
| 19 | Chọn vị trí trọng âm; chọn từ theo vị trí | 5 + 5 + 5 | Trộn MCQ 2 và 3 lựa chọn |
| 20 | Điền từ để hỏi; viết câu hỏi từ gợi ý | 5 + 5 | Cần fill-blank và short-answer, chưa chuyển thành MCQ |

Bảng tổng hợp đã được cập nhật trong `quiz-schema-gaps.md`. Theo quyết định phạm vi, Batch 4 **không mở rộng schema và không tự tạo phương án lựa chọn**.

## 5. Kiểm tra logic merge và bảo toàn dữ liệu

Importer `scripts/import-batch-4.py` dùng `merge_source_fields`: cập nhật từng trường được cung cấp, bỏ qua mảng rỗng ở các trường tùy chọn và khởi tạo mảng nếu trường chưa tồn tại. Vì vậy các trường cũ của Ngày 1–15 không bị xóa trong lần nạp này. Script đồng thời ghi cùng payload vào root và client JSON.

## 6. Kiểm thử đã thực hiện

Đã chạy importer Batch 4, kiểm tra 48 ngày, kiểm tra Ngày 16–20 có tiêu đề, `sourceNote`, `grammarContent` và 5 SRS card/ngày, kiểm tra hai JSON đồng nhất, và chạy `scripts/build-days-index.mjs`. Chỉ mục vẫn có đủ 48 ngày/10 giai đoạn; Ngày 16–17 thuộc stage 4, Ngày 18–20 thuộc stage 5 và giữ trạng thái `coming-soon` theo logic roadmap hiện hành.

Đã chạy `node scripts/test-days.mjs`, `pnpm check` và `pnpm build`; cả ba đều đạt. Build còn cảnh báo không chặn: trường cấu hình `pnpm` cũ bị bỏ qua và texture `/manus-storage/...` được giữ để runtime xử lý, phù hợp với build website chính. Route đại diện Ngày 16 hoặc Ngày 20 cần được kiểm tra trên preview ở bước QA giao diện.

## 7. Giới hạn và điểm cần xác nhận

Kết luận “đã cập nhật” chỉ áp dụng cho phần lý thuyết và SRS được truy vết từ artifact PDF đã tải. Video BÀI HỌC chưa có transcript xác minh. FILE ĐỀ online Drive Ngày 16 chưa truy cập được; bài blog đáp án không thay thế hoàn toàn cho file đề gốc. Các câu quiz chưa được đưa vào dữ liệu chính thức cho đến khi schema được người dùng xác nhận mở rộng.

## 8. Tệp truy vết

- `scripts/extract-batch4-sheet.mjs`
- `scripts/download-batch4-drive.sh`
- `scripts/import-batch-4.py`
- `source-extracts/batch-4/ngay-16.md` … `ngay-20.md`
- `source-extracts/batch-4/online-answer-extracts.md`
- `quiz-schema-gaps.md`
- `data/days.json`
- `client/src/data/days.json`

## Tài liệu tham khảo

[1]: https://anhnguyenhi.blogspot.com/2024/07/bai-thi-online-thi-tuong-lai-on.html "Bài thi Online: Thì tương lai đơn"
[2]: https://anhnguyenhi.blogspot.com/2024/07/bai-thi-online-thi-tuong-lai-hoan-thanh.html "Bài thi Online: Thì tương lai hoàn thành"
[3]: https://anhnguyenhi.blogspot.com/2024/07/bai-thi-online-hoc-ngu-am-voi-giao-vien.html "Bài thi online: Học ngữ âm với giáo viên nước ngoài"
[4]: https://anhnguyenhi.blogspot.com/2024/07/bai-thi-online-trong-am.html "Bài thi Online: Trọng âm"
[5]: https://anhnguyenhi.blogspot.com/2024/07/ap-bai-thi-online-cac-cau-hoi-voi-tu-e.html "ĐÁP ÁN: Các câu hỏi với từ để hỏi khác trong tiếng Anh"


## 8. QA giao diện sau cập nhật

Preview WebDev đã được kiểm tra ở các route `/`, `/ngay/16.html` và `/ngay/20.html` trên viewport desktop 1280×720. Cả ba route đều render đúng layout Editorial Lab Notebook, tiêu đề Ngày 16/20 và ảnh minh họa; không xuất hiện lỗi trắng trang trong preview. Bản preview Comet offline cần được tạo lại sau khi dữ liệu Batch 4 được merge để đưa nội dung mới vào gói HTML self-contained.


## 9. QA gói Comet offline

Đã mở `file:///home/ubuntu/comet-preview-48-day-workbook/index.html?cometRoute=%2Fngay%2F16.html&batch4-v1`. Route trung tâm hiển thị `DAY 16 / NEXT`; trang có nút sáu bước, nguồn gốc và nội dung ngày. Tìm kiếm trong nội dung file cho thấy `will` xuất hiện trong `sourceNote` của Ngày 16, xác nhận dữ liệu Batch 4 đã được đóng gói vào HTML self-contained mới. Ảnh bàn học và logo hiển thị trong sandbox file://. Việc kiểm tra trực tiếp trên Comet Windows của người dùng vẫn là bước xác nhận môi trường cuối cùng.

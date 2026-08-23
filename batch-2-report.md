# Báo cáo nạp nội dung thật — Đợt Ngày 6–10

## 1. Phạm vi và kết luận

Đợt này xử lý các nguồn FILE ĐỀ, BÀI HỌC, FILE ĐỀ online và ĐÁP ÁN tương ứng với Ngày 6–10 theo manifest đã lưu. Nội dung lý thuyết được trích từ PDF FILE ĐỀ và đồng bộ vào `data/days.json` cùng `client/src/data/days.json`. Các video YouTube không được tải, nhúng hoặc liên kết vào website theo đúng yêu cầu quyền sử dụng.

## 2. Kết quả theo ngày

| Ngày | Nội dung đã nạp | Phần thiếu/giới hạn |
|---|---|---|
| 6 | Thể phủ định động từ thường hiện tại; do/don’t, does/doesn’t; động từ chính giữ nguyên; ví dụ và flashcard nguồn | Chưa có transcript BÀI HỌC; nghe/nói/viết để trống; bài biến đổi câu chưa vào quiz |
| 7 | Cấu trúc câu hỏi Do/Does + chủ ngữ + V nguyên thể; biến đổi s/es về nguyên thể; ví dụ và flashcard nguồn | Chưa có transcript BÀI HỌC; nghe/nói/viết để trống; bài đổi câu sang nghi vấn chưa vào quiz |
| 8 | Cách dùng, dấu hiệu nhận biết, cấu trúc hiện tại đơn với to be và động từ thường; ví dụ và flashcard nguồn | Chưa có transcript BÀI HỌC; nghe/nói/viết để trống; phần điền/chia động từ chưa vào quiz |
| 9 | Danh từ, tính từ, trạng từ: định nghĩa, vị trí, hậu tố và ví dụ; flashcard nguồn | Chưa có transcript BÀI HỌC; nghe/nói/viết để trống; bài xác định từ loại chưa vào quiz |
| 10 | Hiện tại tiếp diễn: khẳng định, phủ định, nghi vấn, cách dùng, dấu hiệu và quy tắc -ing; ví dụ và flashcard nguồn | Chưa có transcript BÀI HỌC; nghe/nói/viết để trống; bài điền/chia động từ chưa vào quiz |

## 3. Danh sách dạng bài thi chưa phải trắc nghiệm options

| Ngày | Dạng bài | Cách xử lý hiện tại |
|---|---|---|
| 6 | Chuyển câu khẳng định sang phủ định, Câu 16–20 | Ghi trong `sourceNote`, chờ mở rộng schema quiz dạng biến đổi câu |
| 7 | Chuyển câu khẳng định sang nghi vấn | Ghi trong `sourceNote`, chờ mở rộng schema quiz dạng biến đổi câu |
| 8 | Điền/chia động từ; bộ luyện tập có số lựa chọn không đồng nhất | Ghi trong `sourceNote`, chưa ép vào quiz 3 lựa chọn |
| 9 | Xác định từ loại của từ trong câu | Ghi trong `sourceNote`, chờ schema phân loại từ |
| 10 | Điền dạng động từ; các bộ luyện tập có số lựa chọn không đồng nhất | Ghi trong `sourceNote`, chưa ép vào quiz 3 lựa chọn |

## 4. Nguồn bị hạn chế và nguyên tắc không bịa

Nguồn BÀI HỌC của cả năm ngày là video YouTube chưa có transcript được xác minh trong phạm vi xử lý này. Vì vậy website không tự tạo câu nghe, câu Shadowing hoặc nội dung viết thay thế. Các bài thi có nội dung nguyên văn nhưng không khớp `quiz` options hiện có cũng không bị chuyển đổi cưỡng ép. Trạng thái UI tiếp tục hiển thị `SOURCE STATUS` cho các mảng rỗng.

## 5. Kiểm thử và truy vết

Đã chạy `node scripts/test-days.mjs`, `pnpm check` và `pnpm build`; tất cả đạt. Preview `/ngay/06.html` đã xác nhận route động, tiêu đề Ngày 6 và trạng thái nguồn thiếu đúng. Bằng chứng trích xuất nằm tại `source-extracts/batch-2/ngay-06.md` đến `ngay-10.md`; script tái lập là `scripts/extract-batch-2.py` và `scripts/import-batch-2.py`. Audit Sheet được cập nhật tại `google-sheet-tab-audit.md`.

## 6. Điểm dừng

Theo xác nhận của người dùng, chưa xử lý Ngày 11–15. Đợt tiếp theo chỉ bắt đầu sau khi người dùng xem lại báo cáo này và xác nhận tiếp tục.

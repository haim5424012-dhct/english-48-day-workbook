# Báo cáo nạp nội dung thật — Đợt Ngày 11–15

## 1. Phạm vi và nguồn

Đợt này dùng file CSV người dùng gửi làm **manifest khóa học**: `source-manifests/batch-3-course-manifest.csv`. CSV có 146 dòng, UTF-8, một cấu trúc tab duy nhất được biểu diễn dạng bảng phẳng; các ô hiển thị nhãn `FILE ĐỀ`, `BÀI HỌC`, `ĐÁP ÁN` nhưng không chứa URL đầy đủ trong bản CSV đã gửi. CSV xác nhận các chủ đề Ngày 11–15 và tiếp tục có mục đến Ngày 48.

Các nguồn nội dung được trích xuất từ artifact đã thu thập trong `/home/ubuntu/english_learning_project/materials/ngay_11` đến `ngay_15`: PDF FILE ĐỀ, text trích xuất từ PDF/bài thi online và HTML đáp án. Bản text/HTML đã được lưu lại trong `source-extracts/batch-3/ngay-11.md` đến `ngay-15.md`. Các file HTML đáp án của batch này là redirect hoặc không chứa nội dung đáp án có thể kiểm chứng; không tuyên bố đã đọc đáp án khi artifact không cung cấp dữ liệu đó.

## 2. Kết quả theo ngày

| Ngày | Nội dung đã nạp | Phần thiếu hoặc giới hạn |
|---|---|---|
| 11 | Phân biệt hiện tại đơn/tiếp diễn; tân ngữ; cách dùng, cấu trúc, động từ không chia tiếp diễn; 5 SRS cards từ ví dụ/bài thi | BÀI HỌC là video chưa có transcript; listening/shadowing/writing để trống; bảng biến đổi và 5 câu điền chưa vào quiz |
| 12 | Quá khứ đơn khẳng định; was/were, V-ed/cột 2, quy tắc chính tả, động từ bất quy tắc, dấu hiệu thời gian; 5 SRS cards | Video chưa có transcript; listening/shadowing/writing để trống; 5 mục biến đổi và 5 câu điền chưa vào quiz |
| 13 | Tiêu đề và sourceNote theo CSV/artifact; 5 SRS cards từ phần MCQ có đáp án lựa chọn rõ | Artifact “lý thuyết” riêng không có phần Grammar đầy đủ; bài thi có điền/chia và trả lời ngắn theo hình; HTML ĐÁP ÁN chỉ là redirect nên không có đáp án nội dung để xác minh; không tự bổ sung grammarContent |
| 14 | Quá khứ tiếp diễn; khẳng định, phủ định, nghi vấn, when và hành động xen vào; 5 SRS cards | Video chưa có transcript; listening/shadowing/writing để trống; bài điền và MCQ 2/3 lựa chọn chưa vào quiz |
| 15 | Hiện tại hoàn thành; have/has, V-ed/cột 3, cách dùng, dấu hiệu for/since/recently/just/already/ever/never; 5 SRS cards | Video chưa có transcript; listening/shadowing/writing để trống; bài biến đổi V3, điền hai vị trí và MCQ 2/3 lựa chọn chưa vào quiz |

Các trường `quiz`, `listeningItems`, `shadowingSentences` và `writingPrompts` của Ngày 11–15 không bị ép dữ liệu không tương thích. `grammarContent` và `srsCards` được cập nhật bằng `merge_source_fields`; hai bản `days.json` được đồng bộ và kiểm tra giống nhau.

## 3. Quiz schema gaps

Bảng tổng hợp đầy đủ nằm ở `quiz-schema-gaps.md`. Các gap mới của batch 3 gồm: biến đổi bảng động từ, điền/chia động từ, trả lời ngắn theo hình; Ngày 14 có đồng thời 2 lựa chọn và 3 lựa chọn; Ngày 15 có dạng điền hai vị trí như `have – made`. Không mở rộng schema trong đợt này.

| Ngày | Dạng không phải MCQ | Số lượng | MCQ gốc |
|---|---|---:|---|
| 11 | Bảng V(s/es)/V-ing; điền/chia | 5 mục + 5 câu | 10 câu, 3 lựa chọn |
| 12 | Bảng quá khứ; điền/chia | 5 mục + 5 câu | 10 câu, 3 lựa chọn |
| 13 | Điền/chia phủ định/nghi vấn; trả lời Yes/No theo hình | 5 + 5 câu | 10 câu, 3 lựa chọn |
| 14 | Điền/chia quá khứ tiếp diễn | 5 câu | 5 câu, 2 lựa chọn + 10 câu, 3 lựa chọn |
| 15 | Chuyển V3; điền/chia hiện tại hoàn thành | 5 mục + 5 câu | 5 câu, 2 lựa chọn + 10 câu, 3 lựa chọn |

## 4. Kiểm tra phạm vi khóa học

CSV có tiêu đề và nội dung đến **Ngày 48**. Trong đợt này chỉ ghi nhận phạm vi đó; không trích xuất hay nạp nội dung Ngày 36–48. Roadmap vẫn giữ đủ 48 ngày và 10 giai đoạn.

## 5. Kiểm thử

Đã chạy `node scripts/test-days.mjs`: đạt 48 object ngày và yêu cầu tối thiểu của Ngày 1. Đã rebuild `data/days-index.json`, kiểm tra root/client `days.json` giống hệt nhau, chạy kiểm tra cú pháp importer/extractor, `pnpm check` và `pnpm build` đều đạt. Preview `/ngay/11.html` xác nhận route động, tiêu đề “Phân biệt thì hiện tại đơn và hiện tại tiếp diễn”, nhãn `DAY 11 / NEXT`, source status thiếu transcript và `sourceNote` đúng; các khối tương tác chưa có nguồn vẫn không được tạo giả.

## 6. Điểm dừng

Theo yêu cầu, chưa xử lý Ngày 16–20. Chưa tải/nhúng video hoặc audio gốc. Chưa mở rộng schema quiz. Batch 3 dừng tại Ngày 15 để chờ xác nhận.

## 7. Tệp truy vết

- `source-manifests/batch-3-course-manifest.csv`
- `source-extracts/batch-3/ngay-11.md` đến `ngay-15.md`
- `quiz-schema-gaps.md`
- `scripts/extract-batch-3.py`
- `scripts/import-batch-3.py`
- `data/days.json` và `client/src/data/days.json`
- `data/days-index.json`

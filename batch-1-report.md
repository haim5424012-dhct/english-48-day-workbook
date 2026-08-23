# Báo cáo nạp nội dung thật — Đợt Ngày 1–5

## Phạm vi

Đợt này xử lý các nguồn trong Google Sheet được truy cập bằng trình duyệt thật, cùng các bản tải đã lưu trước đó trong `/home/ubuntu/english_learning_project/materials/ngay_01` đến `ngay_05`. Sheet hiện có **một tab duy nhất**; kiểm tra cuối vùng dữ liệu cho thấy có dữ liệu ít nhất đến **Ngày 35**, vì vậy giả định cũ “chỉ đến Ngày 33” không còn được dùng.

## Kết quả cập nhật

| Ngày | Nội dung đã nạp | Trạng thái |
|---|---|---|
| 1 | Tiêu đề, phần lý thuyết to be khẳng định/phủ định, ví dụ, dạng viết tắt và flashcard SRS từ PDF | `ready` |
| 2 | Tiêu đề, lý thuyết câu hỏi to be, đảo trợ động từ và cách trả lời từ PDF | `coming-soon` |
| 3 | Tiêu đề, lý thuyết Who/What và các ví dụ trực tiếp từ PDF | `coming-soon` |
| 4 | Tiêu đề, Where/When, giới từ in/on/at và ví dụ từ PDF | `coming-soon` |
| 5 | Tiêu đề, động từ thường hiện tại, quy tắc thêm s/es và ví dụ từ PDF | `coming-soon` |

Dữ liệu đã được đồng bộ ở cả `data/days.json` và `client/src/data/days.json`; `days-index.json` đã được sinh lại cho đủ 48 ngày và 10 giai đoạn.

## Giới hạn nguồn

Các liên kết BÀI HỌC là video YouTube chưa có transcript được xác minh trong môi trường hiện tại. Một số ngày không có đủ link FILE ĐỀ online/ĐÁP ÁN trong manifest đã tải. Các trang đáp án Ngày 1, 3, 4, 5 có nội dung dạng điền/viết hoặc giải thích dài, không khớp trực tiếp với schema quiz options của website; vì vậy quiz được để trống thay vì tự chuyển đổi. Listening, Shadowing và Writing cũng để trống khi PDF không cung cấp đúng loại dữ liệu. Mỗi ngày đã có `sourceNote` ghi rõ giới hạn và bước UI tương ứng hiển thị trạng thái nguồn.

## Kiểm thử

`pnpm test:content`, `pnpm check` và `pnpm build` đều đạt. Preview `/ngay/02.html` đã xác nhận route động chọn đúng tiêu đề Ngày 2, nhãn DAY 02 / NEXT và hiển thị SOURCE STATUS thay cho đoạn nghe hardcoded Ngày 1. Preview `/ngay/01.html` vẫn giữ giao diện và dữ liệu Ngày 1.

## Tệp truy vết

Các bản trích xuất theo ngày nằm tại `source-extracts/batch-1/ngay-01.md` đến `ngay-05.md`. Script tái lập là `scripts/extract-batch-1.py` và `scripts/import-batch-1.py`. Audit Google Sheet nằm tại `google-sheet-tab-audit.md`.

## Bước chờ xác nhận

Theo yêu cầu quy trình, đợt tiếp theo **Ngày 6–10 chưa được xử lý**. Cần người dùng xác nhận tiếp tục sau khi xem lại bản nạp Ngày 1–5 và quyết định có muốn giữ nguyên quiz dạng nguồn hay mở rộng schema cho bài điền/viết.

# Hồ sơ audit — 48 Ngày Lấy Gốc Tiếng Anh

## Kết luận

Bản build hiện hoàn chỉnh luồng tương tác của Ngày 1 theo sáu nguyên tắc bắt buộc: Input trước Output; dictation; shadowing; viết có phản hồi tức thì; test-enhanced learning; và lặp lại giãn cách. Nội dung có thể mở rộng bằng cách thêm object vào `data/days.json`.

## Nguồn

| Mục | Giá trị | Trạng thái |
|---|---|---|
| Google Sheet mục lục | https://docs.google.com/spreadsheets/d/1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI/edit?gid=1837150795 | Đã biết URL |
| Chủ đề Ngày 1 | Thể khẳng định và phủ định của động từ to be | Được xác định từ prompt người dùng |
| Tệp BÀI HỌC gốc | Link con trong Sheet | Chưa xác minh được quyền truy cập trong lượt này |
| FILE ĐỀ và ĐÁP ÁN gốc | Link con trong Sheet | Chưa dùng làm dữ liệu khẳng định gốc |

## Quyết định nội dung

Do chưa truy cập được tệp BÀI HỌC gốc, Ngày 1 dùng ví dụ tương đương, bám đúng chủ đề `am / is / are` ở thể khẳng định và phủ định. Website hiển thị giới hạn này ngay dưới bài học và có liên kết quay về nguồn Sheet; không trình bày phần biên soạn tương đương như nội dung nguyên văn của giáo viên.

## Ma trận truy vết Ngày 1

| Thành phần | Vị trí | Minh chứng chức năng |
|---|---|---|
| Warm-up | `days.json:warmupScript` và Bước 1 | SpeechSynthesis, hiện/ẩn transcript |
| Grammar | `days.json:grammarContent` và Bước 2 | am/is/are, not, ví dụ khẳng định/phủ định |
| Dictation | `days.json:listeningItems` và Bước 3 | nghe câu, điền từ, so khớp tức thì |
| Shadowing | `days.json:shadowingSentences` và Bước 4 | SpeechRecognition, phản hồi đúng/gần đúng/fallback |
| Writing | `days.json:writingPrompts` và Bước 5 | heuristic kiểm tra am/is/are, phản hồi tại chỗ |
| Test | `days.json:quiz` và Bước 6 | trắc nghiệm, chấm điểm, hiển thị đáp án |
| SRS | `days.json:srsCards` và Bước 6 | lật thẻ, Nhớ/Chưa nhớ, interval/easeFactor |
| Lưu tiến trình | `localStorage` | completed, quizScore, cardStates |

## QA kỹ thuật

| Kiểm tra | Kết quả |
|---|---|
| `pnpm check` | Đạt |
| `pnpm build` | Đạt; Vite có cảnh báo chunk lớn và asset texture runtime, không phải lỗi build |
| Desktop screenshot | Đã kiểm tra ở viewport 1280×720 |
| Mobile screenshot | Đã kiểm tra ở viewport 375×812 |
| Console sau tương tác | Không có console output lỗi |
| Hoàn thành Bước 1 | Đã xác nhận tiến trình chuyển 0/6 → 1/6 và Bước 2 mở |
| SpeechRecognition | Có fallback rõ ràng khi trình duyệt không hỗ trợ hoặc micro bị chặn |
| Offline HTML trực tiếp | Logic app không yêu cầu API; asset generated dùng Manus Storage URL nên bản đóng gói offline cần thay asset bằng tệp tự chứa nếu không có mạng |

## Giới hạn và bước tiếp theo

Bản hiện tại chưa đồng bộ điểm hoặc tiến trình lên Google Sheets; dữ liệu chỉ nằm trên thiết bị học. Bốn mươi bảy ngày còn lại chưa có nội dung học đầy đủ, trong đó Ngày 2–33 có tiêu đề khung và Ngày 34–48 chờ đọc từ Sheet. Khi người dùng cung cấp quyền truy cập các tệp con, cần thay dữ liệu tương đương bằng nội dung gốc và chạy lại audit trước khi gọi đó là bản đã xác minh.

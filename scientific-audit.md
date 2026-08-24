# Hồ sơ audit — 48 Ngày Lấy Gốc Tiếng Anh

## Kết luận

Bản build hiện hoàn chỉnh luồng tương tác của Ngày 1 theo sáu nguyên tắc bắt buộc: Input trước Output; dictation; shadowing; viết có phản hồi tức thì; test-enhanced learning; và lặp lại giãn cách. Dữ liệu nguồn đã được xử lý theo các batch đến Ngày 35; các trường thiếu nguồn vẫn được giữ rỗng và hiển thị trạng thái giới hạn. Nội dung có thể mở rộng bằng cách thêm object vào `data/days.json`.

## Nguồn

| Mục | Giá trị | Trạng thái |
|---|---|---|
| Google Sheet mục lục | https://docs.google.com/spreadsheets/d/1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI/edit?gid=1837150795 | Đã biết URL |
| Chủ đề Ngày 1 | Thể khẳng định và phủ định của động từ to be | Được xác định từ prompt người dùng |
| Tệp BÀI HỌC gốc | Link con trong Sheet | Chưa xác minh được quyền truy cập trong lượt này |
| FILE ĐỀ và ĐÁP ÁN gốc | Link con trong Sheet | Chưa dùng làm dữ liệu khẳng định gốc |

## Quyết định nội dung

Ngày 1 dùng ví dụ tương đương bám đúng chủ đề `am / is / are` ở thể khẳng định và phủ định trong luồng tương tác. Các batch Ngày 1–15 được lưu artifact và báo cáo riêng; phần nào chưa có nguồn hoặc không khớp schema vẫn được ghi trạng thái giới hạn, không trình bày như nguyên văn của giáo viên.

## Ma trận truy vết Ngày 1

| Thành phần | Vị trí | Minh chứng chức năng |
|---|---|---|
| Warm-up | `days.json:warmupScript` và Bước 1 | SpeechSynthesis, hiện/ẩn transcript |
| Grammar | `days.json:grammarContent` và Bước 2 | am/is/are, not, ví dụ khẳng định/phủ định |
| Dictation | `days.json:listeningItems` và Bước 3 | nghe câu, điền từ, so khớp tức thì |
| Shadowing | `days.json:shadowingSentences` và Bước 4 | SpeechRecognition chỉ so khớp transcript; MediaRecorder ghi âm thật, nghe lại, chọn bản tốt nhất và fallback quyền micro |
| Writing | `days.json:writingPrompts` và Bước 5 | heuristic kiểm tra am/is/are, phản hồi tại chỗ |
| Test | `days.json:quiz` và Bước 6 | trắc nghiệm, chấm điểm, hiển thị đáp án |
| SRS | `days.json:srsCards` và Bước 6 + `/on-tap` | lật thẻ, Nhớ/Chưa nhớ, interval/easeFactor/lastReviewedAt, lọc thẻ đến hạn và xếp theo độ trễ |
| Lưu tiến trình | `localStorage` | completed, quizScore, cardStates có lastReviewedAt; roadmap progress giữ completedDays, lastCompletedAt, streak |

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
| Offline HTML trực tiếp | Bản Comet mới có index trung tâm tự chứa JS/CSS/ảnh bằng data URI; route shell và launcher localhost là phương án dự phòng khi Comet chặn file:// |

## Giới hạn và bước tiếp theo

Bản hiện tại chưa đồng bộ điểm hoặc tiến trình lên Google Sheets; dữ liệu chỉ nằm trên thiết bị học. Bốn mươi bảy ngày còn lại chưa có nội dung học đầy đủ, trong đó Ngày 2–33 có tiêu đề khung và Ngày 34–48 chờ đọc từ Sheet. Khi người dùng cung cấp quyền truy cập các tệp con, cần thay dữ liệu tương đương bằng nội dung gốc và chạy lại audit trước khi gọi đó là bản đã xác minh.


## Vá lỗi Ôn tập

Review hiện đọc state SRS theo đúng khóa localStorage riêng của từng ngày (`english48-day{N}-progress`). Mỗi state có `interval`, `easeFactor` và `lastReviewedAt`; thẻ chỉ được đưa vào khay khi ngày đến hạn không lớn hơn hôm nay. Các thẻ đến hạn được sắp xếp theo mức độ trễ giảm dần. Nút `Nhớ` và `Chưa nhớ` dùng cùng công thức `rateSRS()` với trang Ngày 1, sau đó ghi lại state vào đúng khóa của ngày tương ứng. Nếu chưa có thẻ đến hạn, giao diện hiển thị ngày quay lại gần nhất thay vì trạng thái trống chung.

## Ghi âm thật — Mức 1

Bước Shadowing giữ nguyên SpeechRecognition làm lớp phản hồi phụ để hiển thị “Máy nghe được”, nhưng đã tách rõ khỏi việc chấm phát âm. MediaRecorder xin quyền microphone, ghi blob âm thanh tạm trong React state, cho phép ghi lại nhiều lần, nghe giọng mẫu bằng SpeechSynthesis, nghe giọng học sinh bằng audio element và chọn bản tốt nhất trong phiên học. Khi bị từ chối quyền hoặc trình duyệt không hỗ trợ, giao diện hiển thị fallback cụ thể. File ghi âm không được ghi vào localStorage hoặc backend.

## Giới hạn đã ghi nhận

Waveform trực quan bằng Web Audio API và chấm phát âm thật qua API bên thứ ba chưa triển khai. Nếu thực hiện chấm phát âm về sau, cần route server-side riêng để bảo vệ API key; không đưa khóa dịch vụ vào frontend.


## Cập nhật hồ sơ — 24/08/2026

### Trạng thái dữ liệu hiện hành

| Phạm vi | Kết quả kiểm kê | Mức xác nhận |
|---|---|---|
| Toàn khóa | 48 ngày, gồm 10 giai đoạn lộ trình | `[S]` từ `days-index.json` và giao diện Roadmap |
| Nội dung đã xử lý | Ngày 1–45 qua các batch đã lưu trong `source-extracts/` và báo cáo tương ứng | `[S]` trong phạm vi artifact đã lưu |
| `grammarContent` | Có dữ liệu ở 43 ngày | `[S]` từ kiểm kê `data/days.json` |
| `srsCards` | Có dữ liệu ở 45 ngày | `[S]` từ kiểm kê `data/days.json` |
| `listeningItems`, `writingPrompts`, `quiz` chính thức | Chưa có trường có nội dung trong bản kiểm kê hiện tại | `[S]`; không tự suy ra nội dung còn thiếu |
| Ngày 26–30 | Đã nạp lý thuyết/SRS; quiz, audio và phần viết chưa ánh xạ | `[S]`/`[U]`; xem `batch-6-report.md` |
| Ngày 31–35 | Đã nạp lý thuyết/SRS; quiz và media chưa ánh xạ; Ngày 35 có file thi lệch chủ đề | `[S]`/`[U]`; xem `batch-7-report.md` |
| Ngày 36–40 | Đã nạp lý thuyết/SRS khi có bằng chứng; quiz và media chưa ánh xạ; Ngày 39 thiếu PDF FILE ĐỀ lý thuyết trong artifact | `[S]`/`[U]`; xem `batch-8-report.md` |
| Ngày 41–45 | Đã nạp lý thuyết/SRS; bài nghe và quiz chưa ánh xạ; đề online có MCQ 2 lựa chọn, chỗ trống và bảng đánh dấu/ghép | `[S]`/`[U]`; xem `batch-9-report.md` |
| Ngày 46–48 | Giữ khung/trạng thái chờ nguồn theo từng object | `[S]`/`[U]` tùy trường nguồn |

### Phân biệt QuizLab và dữ liệu bài thi

`QuizRenderer`/`QuizLab` là lớp giao diện tương thích cho năm dạng: MCQ legacy, fill-blank, transformation, matching và short-answer. Các `specimens` của QuizLab đã được đối chiếu với source extracts cho các mục đã ghi nhận, nhưng vẫn là **fixture minh họa giao diện**, không phải dữ liệu bài thi chính thức. Không có fixture nào được ghi vào `days.json`; việc ánh xạ quiz thật vẫn hoãn theo `quiz-schema-gaps.md` cho đến khi đủ mẫu và có quyết định schema.

### Ghi âm và lưu trữ cục bộ

Shadowing tách SpeechRecognition dùng làm phản hồi transcript khỏi MediaRecorder dùng ghi âm tạm. URL âm thanh cũ được giải phóng khi cần, bản ghi tốt nhất được theo dõi theo câu trong phiên học, và file âm thanh không được ghi vào localStorage hoặc backend. Khả năng ghi thật còn phụ thuộc quyền microphone của trình duyệt; sandbox chỉ xác nhận được fallback khi quyền bị chặn, không thay thế kiểm thử thiết bị người dùng.

### Gói Comet và bằng chứng kiểm thử

Generator `scripts/prepare-comet-preview.mjs` tạo một `index.html` trung tâm nhúng JS, CSS và bốn ảnh PNG bằng data URI; các route phụ là shell chuyển về index qua `cometRoute`. Bản QA sandbox xác nhận logo/ảnh Bài 1 có `complete=true`, `naturalWidth=1920`, không có ảnh hỏng và không còn tham chiếu ảnh mạng bắt buộc. Đây là bằng chứng trong sandbox, không phải xác nhận độc lập rằng mọi cấu hình Comet Windows đều cho phép JavaScript từ `file://`; vì vậy gói vẫn có `start-comet-preview.bat` làm đường chạy localhost dự phòng.

### Giới hạn chưa được kết luận

Chưa thể kết luận website đã đồng bộ tiến trình hoặc điểm lên Google Sheets; dữ liệu người học vẫn nằm cục bộ trên thiết bị. Chưa thể gọi các ngày chưa có nguồn là bài học hoàn chỉnh. Chưa có waveform Web Audio API, chấm phát âm qua dịch vụ bên thứ ba, hoặc kiểm thử microphone thành công trên thiết bị thật trong hồ sơ hiện tại.

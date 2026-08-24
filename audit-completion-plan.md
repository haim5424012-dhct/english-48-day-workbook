# Audit và kế hoạch hoàn thiện theo `pasted_content.txt`

## 1. Phạm vi đã đọc

Đã đối chiếu toàn bộ đặc tả người dùng với `README.md`, `scientific-audit.md`, `data/days.json`, bản frontend `client/src/data/days.json`, `days-index.json`, `Home.tsx`, `Roadmap.tsx`, `Review.tsx`, `progress.ts`, `QuizRenderer.tsx`, `quizSchema.ts`, `test-days.mjs` và các source extracts Batch 8–10.

## 2. Phát hiện chính

| Khu vực | Hiện trạng có bằng chứng | Hệ quả | Hướng sửa |
|---|---|---|---|
| Dữ liệu sáu bước | `grammarContent` có 46/48 ngày, `srsCards` có 48/48; `listeningItems`, `writingPrompts`, `quiz` chính thức gần như rỗng, `shadowingSentences` cũng thiếu ở phần lớn ngày | Nhiều ngày chỉ có lý thuyết/SRS nhưng UI vẫn cho đánh dấu đủ bước | Bổ sung đủ sáu block cho cả 48 ngày; nội dung mới phải gắn `workbook-authored` hoặc `mixed` và sourceNote không nhận là nguyên văn nguồn |
| Metadata | Schema hiện chưa có `learningObjectives`, `prerequisites`, `bridgeFromPreviousDay`, `commonMistakes`, `masteryCriteria`, `estimatedMinutes`, `contentOrigin` | Không thể kiểm tra mục tiêu, cầu nối và điều kiện hoàn thành | Mở rộng type dữ liệu và validator |
| Hoàn thành bài | `completeStep()` đánh dấu mọi bước, bước 6 gọi `markDayComplete()` dù block rỗng, quiz chưa nộp hoặc SRS chưa đánh giá | Người học có thể hoàn thành bài rỗng | Tạo `validateDayContent`, `canCompleteStep`, `canCompleteDay`; không cho bỏ qua bước trước |
| Roadmap | `isDayReady()` chỉ kiểm tra ngày trước đã hoàn thành; route trực tiếp `/ngay/XX.html` không kiểm tra khóa; `days-index` còn dùng `pending-source`/`Sắp cập nhật` cho nhiều ngày đã có dữ liệu | Có thể bypass lộ trình và trạng thái hiển thị sai | Kiểm tra content validity khi mở route; trạng thái gồm `locked`, `ready`, `in-progress`, `completed`, `needs-content` chỉ dành phát triển |
| Validator | `test-days.mjs` chủ yếu kiểm tra đủ 48 object, liên tục và Day 1 có key; chưa kiểm tra mảng không rỗng, quiz, metadata hoặc bất biến ready | Build có thể pass dù khóa học không đạt yêu cầu nội dung | Viết validator nghiêm ngặt, giữ lệnh `pnpm test:content` |
| Quiz | `quizSchema.ts` và `QuizRenderer.tsx` đã hỗ trợ 5 dạng nhưng dữ liệu thật chưa ánh xạ | Năng lực UI không được dùng trong bài học | Tạo quiz thật cho từng ngày, có đáp án/giải thích; dạng author mới gắn nguồn đúng |
| Chương trình | Ngày 36 cần đổi tên, Ngày 38 cần thuật ngữ liên từ tương liên; ngày 46–48 cần chuỗi dự án kết khóa | Roadmap và nội dung chưa phản ánh mạch kiến thức | Cập nhật title/stage và bridge; giữ nội dung nguồn đã xác minh, bổ sung cầu nối do workbook biên soạn |

## 3. Định nghĩa dữ liệu dùng trong bản hoàn thiện

“Vocabulary count” chỉ được báo cáo khi có danh sách từ/cụm từ có cấu trúc rõ. Không suy ra số từ đơn bằng cách đếm HTML hoặc câu ví dụ. Mỗi ngày sẽ có `learningObjectives`, `prerequisites`, `bridgeFromPreviousDay`, `commonMistakes`, `masteryCriteria`, `estimatedMinutes` và `contentOrigin`. Các block do workbook biên soạn sẽ ghi nguyên văn trong `sourceNote`: “Nội dung thực hành do workbook biên soạn dựa trên mục tiêu ngữ pháp/chủ đề; không phải bản sao tài liệu nguồn.”

Một ngày chỉ được xem là hợp lệ khi có warm-up, grammar/vocabulary input, ít nhất 3 listening items, ít nhất 3 shadowing sentences, ít nhất 2 writing prompts, ít nhất 5 quiz items và ít nhất 5 SRS cards. Audio sử dụng trong các block authored sẽ được gọi là “audio mẫu/TTS”, không phải audio gốc.

## 4. Kế hoạch triển khai

Trước hết sẽ chuẩn hóa dữ liệu 48 ngày bằng một script tạo/merge có kiểm soát, bảo toàn các phần `source-extracted` đã có và bổ sung các block authored còn thiếu. Tiếp theo sẽ mở rộng `DayContent` và thêm hàm kiểm tra tính hợp lệ dùng chung giữa UI, roadmap và validator. Sau đó `Home.tsx` sẽ chặn bước rỗng, bắt buộc quiz nộp, yêu cầu hoạt động tối thiểu và mastery criteria trước khi gọi `markDayComplete()`; route trực tiếp cũng phải qua cùng cổng kiểm tra.

Roadmap sẽ được chuyển sang trạng thái theo dữ liệu thực: ngày 1 `ready`, ngày kế tiếp chỉ `ready` khi ngày trước `completed` và ngày đó hợp lệ; ngày chưa đủ dữ liệu không được gọi là `ready`. Quiz thật sẽ dùng cả năm format đã có trong renderer. Cuối cùng sẽ cập nhật index, README, scientific audit, báo cáo lộ trình 48 ngày, test content, QA web/Comet và checkpoint.

## 5. Tiêu chí nghiệm thu

`pnpm test:content`, `pnpm check` và `pnpm build` phải đạt. Validator phải xác nhận đúng 48 ngày liên tục, đủ metadata và đủ sáu block ở mọi ngày. Kiểm thử giao diện phải xác nhận ngày rỗng không thể hoàn thành, ngày hợp lệ không thể bypass thứ tự, quiz chưa nộp không thể hoàn thành bước 6, và route trực tiếp tuân thủ trạng thái roadmap. Bản báo cáo cuối phải phân biệt rõ nội dung trích xuất từ source extracts, nội dung workbook-authored và giới hạn còn lại.

## 6. Trạng thái triển khai — 25/08/2026

Kế hoạch đã được triển khai. `data/days.json` và `client/src/data/days.json` có đủ 48 ngày, metadata pedagogical và sáu block hợp lệ theo validator. `lessonValidation.ts` được dùng làm cổng hoàn thành; roadmap và route trực tiếp tôn trọng trạng thái khóa. Các cầu nối đặc thù cho Ngày 13, 15, 28, 36 và chuỗi dự án Ngày 45–48 đã được ghi vào dữ liệu; Ngày 48 có rubric tự đánh giá.

Bằng chứng kiểm thử cuối: `pnpm test:content` đạt 48/48; `pnpm test:logic` đạt 3/3 unit tests; `pnpm check` đạt; `pnpm build` đạt. Build còn cảnh báo chunk JavaScript lớn và texture `/manus-storage` được giữ để resolve runtime, nhưng không có lỗi compile. QA trực quan đã kiểm tra `/lo-trinh`, `/ngay/01.html`, `/ngay/48.html` và `/tong-ket`; locked state đã được nâng cấp với route marker, dependency card, sáu bước và perforation.

Giới hạn còn lại: các trường quiz/listening/writing/shadowing authored được tạo để bảo đảm tính hoàn chỉnh và phải được hiểu theo `contentOrigin`/`sourceNote`, không phải bản sao tài liệu giáo viên; QuizLab vẫn chỉ là fixture; tiến trình và ghi âm vẫn lưu cục bộ trên thiết bị.


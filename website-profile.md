# Hồ sơ website — 48 Ngày Lấy Gốc Tiếng Anh

**Ngày cập nhật:** 24/08/2026  
**Loại sản phẩm:** Workbook tự học tiếng Anh dạng web tĩnh, chạy trên trình duyệt và có thể đóng gói để xem offline.  
**Đối tượng:** Học sinh Việt Nam đang xây lại nền tảng tiếng Anh theo lộ trình từng ngày.

## 1. Mục tiêu và định hướng

Website tổ chức hành trình học thành 48 ngày và 10 giai đoạn. Mỗi ngày được thiết kế theo chuỗi sáu bước: khởi động đầu vào, học đọc–ngữ pháp, nghe chủ động và dictation, shadowing/nói, viết, rồi kiểm tra và ôn tập. Nhận diện giao diện là **Editorial Lab Notebook**, sử dụng cấu trúc như một cuốn sổ học tập có dấu tiến độ, nhãn trạm và trạng thái hoàn thành.

Đây là cấu trúc sư phạm của website, không được xem là mục lục chính thức của chương trình nếu chưa có văn bản chương trình hoặc xác nhận riêng. Nội dung nguồn được tách khỏi giao diện trong `data/days.json` và bản đồng bộ frontend `client/src/data/days.json`.

## 2. Phạm vi nội dung đã ghi nhận

| Phạm vi | Trạng thái | Bằng chứng chính |
|---|---|---|
| Toàn khóa | 48 ngày, 10 giai đoạn | `data/days-index.json`, `Roadmap.tsx` |
| Ngày 1 | Luồng tương tác đầy đủ sáu bước | `Home.tsx`, `data/days.json` |
| Ngày 1–5 | Đã xử lý theo batch nguồn và có audit lịch sử | `source-extracts/batch-1/` |
| Ngày 6–10 | Đã xử lý theo batch nguồn, phần không khớp schema giữ trong source note | `source-extracts/batch-2/`, `batch-2-report.md` |
| Ngày 11–15 | Đã xử lý theo batch nguồn, lưu trích xuất và merge theo trường | `source-extracts/batch-3/`, báo cáo batch 3 |
| Ngày 16–20 | Đã nạp lý thuyết/SRS; quiz và media chưa ánh xạ | `batch-4-report.md`, `source-extracts/batch-4/` |
| Ngày 21–25 | Đã nạp lý thuyết/SRS; quiz, audio và phần viết chưa ánh xạ | `batch-5-report.md`, `source-extracts/batch-5/` |
| Ngày 26–30 | Đã nạp lý thuyết/SRS; quiz và media chưa ánh xạ | `batch-6-report.md`, `source-extracts/batch-6/` |
| Ngày 31–35 | Đã nạp lý thuyết/SRS; bài nghe/quiz chưa ánh xạ; Ngày 35 có file đề online lệch chủ đề | `batch-7-report.md`, `source-extracts/batch-7/` |
| Ngày 36–40 | Đã nạp lý thuyết/SRS; quiz và media chưa ánh xạ; Ngày 39 thiếu PDF FILE ĐỀ lý thuyết trong artifact | `batch-8-report.md`, `source-extracts/batch-8/` |
| Ngày 41–45 | Đã nạp lý thuyết/SRS; bài nghe/quiz chưa ánh xạ | `batch-9-report.md`, `source-extracts/batch-9/` |
| Ngày 46–48 | Giữ trạng thái khung/chờ nguồn | `data/days.json`, `days-index.json` |

Theo kiểm kê dữ liệu hiện hành, `grammarContent` có ở 43 ngày và `srsCards` có ở 45 ngày. `listeningItems`, `writingPrompts` và `quiz` chính thức vẫn chưa có nội dung được ánh xạ trong các batch mới khi dạng bài cần audio/viết hoặc chưa khớp schema. Không dùng fixture giao diện hoặc nội dung suy đoán để lấp chỗ trống.

## 3. Tính năng hiện có

| Tính năng | Mô tả | Trạng thái lưu trữ |
|---|---|---|
| Lộ trình | Mở khóa tuần tự, completed/ready/locked, streak | `localStorage` |
| Nghe mẫu | SpeechSynthesis và hiển thị/ẩn chữ | Trình duyệt hiện tại |
| Dictation | Nghe câu, điền từ và phản hồi theo dữ liệu có nguồn | Cục bộ trong phiên/trạng thái ngày |
| Shadowing | SpeechRecognition làm phản hồi transcript; MediaRecorder ghi và nghe lại | Blob/URL tạm, không tải lên backend |
| Viết | Phản hồi heuristic tại chỗ theo nội dung đã cấu hình | Cục bộ |
| SRS | Nhớ/Chưa nhớ, interval, easeFactor, lastReviewedAt, lọc thẻ đến hạn | `localStorage` theo ngày |
| QuizRenderer/QuizLab | MCQ legacy, fill-blank, transformation, matching, short-answer | Fixture riêng, không ghi vào `days.json` |
| Tiến trình | Hoàn thành ngày, điểm quiz và trạng thái thẻ | Chưa đồng bộ Google Sheets/cloud |

## 4. Nguyên tắc dữ liệu và kiểm chứng

Nội dung trực tiếp từ nguồn được lưu cùng artifact hoặc source note để có thể đối chiếu. Trường thiếu nguồn được giữ rỗng và giao diện hiển thị `SOURCE STATUS`/`pending-source`. Các dạng bài thi không khớp schema quiz options không bị ép thành trắc nghiệm; danh sách khoảng trống schema nằm trong `quiz-schema-gaps.md`. Không coi ví dụ minh họa của QuizLab là câu hỏi thi thật.

Các bản dữ liệu root và frontend phải được đồng bộ sau mỗi đợt nạp. Logic merge theo trường giữ dữ liệu cũ khi nguồn mới không có trường tương ứng; mảng rỗng được xem là chưa có nguồn, không phải lệnh xóa. Các thay đổi nội dung phải chạy lại kiểm tra nội dung, TypeScript và build.

## 5. Gói preview Comet/Windows

Generator nằm tại `scripts/prepare-comet-preview.mjs`. Bản hiện hành tạo một `index.html` trung tâm tự chứa JavaScript, CSS và bốn ảnh PNG dưới dạng data URI. Các route trong `ngay/`, `quiz-lab/`, `lo-trinh/` và `on-tap/` là route shell chuyển về index trung tâm qua `cometRoute`; cách này giảm phụ thuộc vào đường dẫn route con và ảnh local khi mở từ Windows.

Khi chạy thử, cần giải nén toàn bộ ZIP vào Desktop hoặc Documents thay vì mở bản xem trước trong `AppData\\Local\\Temp`. Mở `index.html`. Nếu chính sách Comet chặn JavaScript từ `file://`, chạy `start-comet-preview.bat` để mở qua localhost. Hồ sơ QA sandbox đã xác nhận logo và ảnh Bài 1 tải đủ bằng data URI; việc xác nhận trên máy Comet Windows thực tế vẫn cần người dùng kiểm tra.

## 6. Kiểm thử kỹ thuật gần nhất

| Kiểm tra | Kết quả | Giới hạn |
|---|---|---|
| `pnpm check` | Đạt | Có cảnh báo pnpm field không còn được đọc |
| `pnpm build` | Đạt | Có cảnh báo chunk lớn và texture runtime |
| File HTML trung tâm | Đã tạo và render trong sandbox | Windows/Comet có chính sách file riêng |
| Click Bài 1 | Route central query hiển thị Ngày 1 | Cần thử lại trong gói ZIP trên máy người dùng |
| Ảnh logo/hero | `complete=true`, `naturalWidth=1920`, ảnh hỏng = 0 trong sandbox | Không thay thế kiểm thử Comet thực tế |
| Responsive | Đã kiểm tra desktop và mobile ở các vòng trước | Cần hồi quy sau các thay đổi giao diện lớn |

## 7. Giới hạn và việc chưa thực hiện

Website chưa đồng bộ điểm hoặc tiến trình lên Google Sheets, chưa có tài khoản người học, chưa có waveform Web Audio API và chưa chấm phát âm thật qua dịch vụ bên thứ ba. Batch 4–9 đã cập nhật Ngày 16–45 nhưng còn các giới hạn về transcript video, audio, một số PDF đáp án và schema quiz đã nêu ở các báo cáo. Không đưa audio/video gốc của giáo viên vào website khi chưa xác minh quyền sử dụng.

## 8. Tệp tham chiếu chính

| Tệp | Vai trò |
|---|---|
| `README.md` | Hướng dẫn sử dụng và trạng thái website |
| `scientific-audit.md` | Audit nguồn, quyết định nội dung và giới hạn |
| `website-profile.md` | Hồ sơ tổng hợp hiện hành này |
| `data/days.json` | Nguồn dữ liệu bài học trung tâm |
| `client/src/data/days.json` | Bản dữ liệu frontend |
| `client/src/pages/Home.tsx` | Runtime bài học sáu bước |
| `client/src/pages/Roadmap.tsx` | Lộ trình và điều hướng |
| `client/src/components/QuizRenderer.tsx` | Renderer các dạng quiz |
| `client/src/pages/QuizLab.tsx` | Phòng thử nghiệm quiz |
| `scripts/prepare-comet-preview.mjs` | Đóng gói preview Comet |
| `comet-preview-file-qa.md` | Nhật ký QA file:///Comet |
| `quiz-schema-gaps.md` | Khoảng trống schema quiz |


## Phụ lục A — Cập nhật Batch 4: Ngày 16–20

**Ngày cập nhật:** 24/08/2026. Batch 4 đã nạp dữ liệu nguồn cho Ngày 16–20 vào cả `data/days.json` và `client/src/data/days.json`. Mỗi ngày có `sourceNote`, `grammarContent` và 5 thẻ SRS dựa trên PDF lý thuyết đã tải và các ví dụ có thể truy vết.

| Ngày | Chủ đề | Trạng thái dữ liệu |
|---:|---|---|
| 16 | Thì tương lai đơn | Đã nạp lý thuyết/SRS; FILE ĐỀ online Drive trả 404, không nhúng video |
| 17 | Thì tương lai hoàn thành | Đã nạp lý thuyết/SRS; đề online PDF đã trích xuất |
| 18 | Ngữ âm | Đã nạp IPA, ví dụ âm và SRS; đề online 20 câu/2 lựa chọn chưa đưa vào quiz chính thức |
| 19 | Trọng âm | Đã nạp khái niệm/quy tắc và SRS; đề online trộn 2/3 lựa chọn chưa đưa vào quiz |
| 20 | Các câu hỏi với từ để hỏi | Đã nạp mẫu How/Why/Which và SRS; dạng điền/viết câu hỏi chưa đưa vào quiz |

Các trường `listeningItems`, `shadowingSentences`, `writingPrompts` và `quiz` của Batch 4 vẫn để mảng rỗng khi chưa có dữ liệu phù hợp hoặc schema đã được xác nhận. Video BÀI HỌC chưa có transcript nên không được tải hoặc nhúng. Các format quiz mới được thống kê trong `quiz-schema-gaps.md`, chưa tự chuyển đổi thành MCQ.

Hồ sơ truy vết chi tiết nằm tại `batch-4-report.md` và `source-extracts/batch-4/`. `node scripts/test-days.mjs`, `pnpm check` và `pnpm build` đã đạt; build chỉ còn các cảnh báo không chặn về cấu hình pnpm cũ, chunk lớn và texture runtime.


## Phụ lục B — Cập nhật Batch 5: Ngày 21–25

**Ngày cập nhật:** 24/08/2026. Batch 5 đã nạp dữ liệu lý thuyết và 5 SRS cards/ngày vào cả hai bản `days.json` bằng `merge_source_fields`.

| Ngày | Chủ đề | Trạng thái dữ liệu |
|---:|---|---|
| 21 | Luyện nghe số và tên | Đã nạp số lớn, số điện thoại, bảng chữ cái và tên; các bài nghe/viết phụ thuộc audio chưa ánh xạ; PDF đáp án không đủ text để xác minh |
| 22 | Động từ khuyết thiếu | Đã nạp quy tắc modal và ví dụ; đề online 20 câu/2 lựa chọn chưa đưa vào quiz chính thức |
| 23 | Liên từ and, but, or, so và because | Đã nạp lý thuyết; đề online gồm 5 câu điền từ và 15 MCQ/2 lựa chọn, chưa đưa vào quiz |
| 24 | Liên từ chỉ thời gian | Đã nạp lý thuyết; đề online gồm 5 câu điền từ và 15 MCQ/2 lựa chọn, chưa đưa vào quiz |
| 25 | Liên từ chỉ sự đối lập | Đã nạp lý thuyết; đề online 20 câu/2 lựa chọn chưa đưa vào quiz chính thức |

Bằng chứng nằm tại `batch-5-report.md`, `source-extracts/batch-5/ngay-21.md` đến `ngay-25.md`, `source-extracts/batch-5/online-answer-extracts.md` và `quiz-schema-gaps.md`. Không tải hoặc nhúng video/audio gốc; không suy đoán đáp án Ngày 21.

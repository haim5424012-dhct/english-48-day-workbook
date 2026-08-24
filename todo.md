# TODO — Trang lộ trình 48 ngày

## Nạp nội dung thật Ngày 6–10

- [x] Kiểm kê bốn nguồn FILE ĐỀ/BÀI HỌC/FILE ĐỀ online/ĐÁP ÁN cho Ngày 6–10.
- [x] Mở và trích xuất PDF lý thuyết thật theo từng ngày.
- [x] Kiểm tra dạng bài thi; ghi câu hỏi/đáp án không phải trắc nghiệm vào sourceNote.
- [x] Đánh dấu `pending-source` và lý do nếu nguồn bị chặn hoặc thiếu.
- [x] Không tải, nhúng hoặc liên kết audio/video/YouTube gốc trong website.
- [x] Đồng bộ root/client days.json và rebuild days-index.
- [x] Chạy `pnpm check` và `pnpm build`.
- [x] Lập báo cáo đợt Ngày 6–10 và dừng chờ xác nhận trước Ngày 11–15.



## Vá ghi âm Shadowing — bản mới

- [ ] Kiểm kê state `audioUrl`, `bestAudioUrl` và các handler đổi câu.
- [x] Xoá/revoke bản ghi hiện tại khi chuyển câu.
- [x] Lưu bản tốt nhất theo từng câu, không ghi đè giữa các câu.
- [x] Chạy `pnpm check` và `pnpm build`.
- [ ] Kiểm thử luồng ghi âm thành công nếu môi trường cấp được micro.
- [x] Cập nhật `browser-qa-notes.md` và lưu checkpoint.



## Nạp nội dung thật từ Google Sheet

- [ ] Mở Sheet bằng trình duyệt thật và kiểm tra toàn bộ tên tab.
- [ ] Xác nhận có hoặc không có nguồn Ngày 34–48; không tự bịa nếu không có.
- [x] Kiểm kê bốn link nguồn cho Ngày 1–5: FILE ĐỀ, BÀI HỌC, FILE ĐỀ online, ĐÁP ÁN.
- [x] Trích xuất nội dung thật theo schema hiện có, ưu tiên nguyên văn câu hỏi và đáp án.
- [x] Đánh dấu `pending-source` và ghi rõ lỗi cho từng nguồn bị chặn.
- [x] Chạy `pnpm check` và `pnpm build` sau đợt 1–5.
- [x] Sửa tối thiểu Home để đọc số ngày từ URL `/ngay/NN.html`, giữ nguyên giao diện hiện có.
- [x] Ẩn hoặc thay thế các khối Warm-up/Shadowing/Quiz hardcoded khi mảng nguồn của ngày đang rỗng.
- [x] Đồng bộ `days.json` vào `client/src/data/days.json` và cập nhật chỉ mục roadmap theo trạng thái nguồn.
- [x] Lập báo cáo truy vết và dừng chờ xác nhận trước đợt Ngày 6–10.



## Vá lỗi khoa học/logic và ghi âm Mức 1

- [x] Kiểm kê state `cardStates`, công thức `rateCard()` và luồng Shadowing.
- [x] Bổ sung `lastReviewedAt` và dùng chung công thức SRS cho Home/Review.
- [x] Chỉ hiển thị thẻ đến hạn, sắp xếp theo mức độ trễ và cập nhật rating thật.
- [x] Đổi copy Shadowing sang “khớp câu nói/gần khớp”.
- [x] Bổ sung MediaRecorder, nghe lại giọng học sinh, ghi nhiều lần và fallback quyền micro.
- [x] Cập nhật audit và kiểm thử đủ sáu bước Ngày 1.
- [ ] Tương lai: phản hồi trực quan waveform bằng Web Audio API để so sánh giọng mẫu và giọng học sinh.
- [ ] Tương lai: chấm điểm phát âm thật qua API bên thứ ba; cần route mới trong `server/index.ts` để bảo vệ khóa API.


- [x] Kiểm kê mã nguồn hiện tại và giữ nguyên token Editorial Lab Notebook của Ngày 1.
- [x] Tạo `data/days-index.json` đủ 48 dòng, chia đúng 10 giai đoạn.
- [x] Tạo trang roadmap hiển thị 10 stage và 48 day node responsive.
- [x] Implement ba trạng thái trạm: hoàn thành, đang mở, chưa mở khóa.
- [x] Implement mở khóa tuần tự dựa trên `localStorage`.
- [x] Đồng bộ `completedDays`, `lastCompletedAt`, `streak` giữa roadmap và trang Ngày 1.
- [x] Thêm nút Ôn tập và trạng thái phản hồi khi trạm bị khóa.
- [x] Kiểm thử điều hướng, refresh không mất tiến trình, desktop/mobile và hồi quy Ngày 1.
- [x] Cập nhật README/audit, lưu checkpoint và bàn giao.


## Xác minh tính nguyên vẹn dữ liệu Ngày 1

- [x] Đối chiếu object `day: 1` trong `data/days.json` và `client/src/data/days.json`, đặc biệt `shadowingSentences`.
- [x] Kiểm tra đồng thời `grammarContent`, `listeningItems`, `writingPrompts`, `quiz` và `srsCards` của Ngày 1.
- [x] Nếu thiếu dữ liệu, truy nguyên qua lịch sử Git và khôi phục đúng bản gốc; nếu nguyên vẹn, ghi nhận rõ nhầm lẫn báo cáo.
- [x] Chạy `pnpm check` và `pnpm build`, sau đó báo cáo và dừng phạm vi công việc.


## Audit bản chất dữ liệu bị mất và logic đồng bộ

- [x] Đối chiếu lịch sử Git trước/sau `08eb178` để xác định nguồn gốc ba trường Ngày 1 bị rỗng.
- [x] Kiểm kê sáu trường của Ngày 2–5 trong cả root/client days.json.
- [x] Đọc script/hàm đồng bộ của `08eb178`, xác định overwrite hay merge từng trường và rủi ro tái diễn.
- [x] Không sửa dữ liệu; đóng gói mã nguồn hiện tại thành ZIP và lập báo cáo bằng chứng.


## Nạp nội dung thật Ngày 11–15

- [x] Đọc và kiểm kê file CSV người dùng gửi, xác định các cột/dòng cho Ngày 11–15.
- [x] Kiểm kê 4 nguồn FILE ĐỀ/BÀI HỌC/FILE ĐỀ online/ĐÁP ÁN từ Google Sheet hoặc CSV thay thế.
- [x] Kiểm tra phạm vi dữ liệu Sheet đến Ngày 48, chỉ ghi nhận Ngày 36–48.
- [x] Trích xuất PDF và lưu `source-extracts/batch-3/ngay-11.md` đến `ngay-15.md`.
- [x] Cập nhật `quiz-schema-gaps.md` cho Ngày 1, 3–10 và 11–15 nếu có dạng mới.
- [x] Nạp grammar/SRS và trường có nguồn thật bằng merge an toàn; đồng bộ root/client JSON.
- [x] Chạy test nội dung, `pnpm check`, `pnpm build`, kiểm tra preview đại diện và lập báo cáo batch 3.
- [x] Đóng gói ZIP đầy đủ và dừng trước Ngày 16.


## Mở rộng frontend cho các dạng quiz mới

> Tạm dừng ánh xạ câu vào schema mới và không mở rộng thêm QuizRenderer/QuizLab theo yêu cầu hiện tại.

- [x] Rà soát schema dữ liệu quiz hiện tại và renderer trong Home.tsx.
- [x] Chốt kiểu dữ liệu tương thích ngược cho MCQ, điền/chia, biến đổi câu, nối cặp và trả lời ngắn.
- [x] Tách component renderer quiz dùng chung, có trạng thái chấm, phản hồi và reset rõ ràng.
- [x] Tích hợp dữ liệu kiểm thử minh họa có nguồn, không thay đổi nội dung học thật ngoài phạm vi.
- [x] Chạy `pnpm check`, `pnpm build`, kiểm tra preview desktop/mobile và lưu checkpoint.


## Ba bản vá theo audit batch 3

- [x] Đọc đặc tả `pasted_content_5.txt` và khóa phạm vi, không ánh xạ schema mới.
- [x] Thêm fallback SOURCE STATUS cho Bước 2 khi `grammarContent` rỗng.
- [x] Sửa `scripts/test-days.mjs` theo điều kiện bất biến.
- [x] Backfill tiêu đề Ngày 34–48 từ CSV, đồng bộ hai nguồn dữ liệu nếu cần.
- [x] Chạy test/check/build, lập báo cáo và đóng gói một ZIP đầy đủ gồm ba bản vá cùng QuizRenderer/QuizLab.


## Sửa fixture QuizLab theo source-extracts

- [x] Đọc toàn bộ `specimens` và đối chiếu đủ 5 mục với source-extract tương ứng.
- [x] Sửa matching Ngày 3 theo đúng cặp “What is that? – It's a banana.” và sửa short-answer Ngày 7.
- [x] Cập nhật báo cáo để mô tả đúng nhãn Bước 2 thực tế trong code.
- [x] Chạy `pnpm check`, `pnpm build`, đóng gói ZIP và báo cáo; không ánh xạ dữ liệu thật.


## Gói chạy thử trên trình duyệt Comet

- [x] Xác định các route cần tạo fallback static.
- [x] Tạo bản build static có các route `/`, `/lo-trinh`, `/quiz-lab` và `/ngay/01.html`–`/ngay/48.html`.
- [x] Viết README hướng dẫn chạy local trên Comet.
- [x] Kiểm tra gói và đóng ZIP duy nhất để tải về.


## Sửa trang trắng khi mở trực tiếp file HTML

- [x] Xác định nguyên nhân asset/module tuyệt đối không tải được qua `file://`.
- [x] Tạo gói preview mới có asset relative và trang hướng dẫn chạy đúng trên Comet.
- [x] Kiểm tra file trực tiếp, localhost routes và runtime không lỗi.
- [x] Đóng gói ZIP sửa lỗi và bàn giao.


## Gói HTML self-contained cho Comet/Windows

- [x] Inline JavaScript, CSS và ảnh vào HTML để loại bỏ phụ thuộc asset qua `file://`.
- [x] Tạo lại root và toàn bộ route nested từ bản self-contained.
- [x] Kiểm tra trực tiếp trên trình duyệt sandbox, file size và runtime.
- [x] Đóng gói ZIP thay thế với hướng dẫn rõ ràng.


## Điều tra lỗi Comet vẫn không mở được

- [x] Đọc lại toàn bộ báo cáo/QA/generator và kiểm tra giả định khác biệt giữa sandbox và Comet Windows.
- [x] Kiểm tra CSP, module script, dynamic import, URL API và chính sách thực thi JavaScript trên `file://`.
- [x] Tạo một smoke test tối giản và kiểm tra bằng Chromium/file URL với console/network.
- [x] Chọn phương án tương thích thực tế, sửa generator và cập nhật hướng dẫn mở file.
- [x] Kiểm thử lại gói mới bằng nhiều entry point, đóng ZIP và ghi rõ giới hạn nếu Comet vẫn chặn file local.


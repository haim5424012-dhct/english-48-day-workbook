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

- [x] Rà soát schema dữ liệu quiz hiện tại và renderer trong Home.tsx.
- [x] Chốt kiểu dữ liệu tương thích ngược cho MCQ, điền/chia, biến đổi câu, nối cặp và trả lời ngắn.
- [x] Tách component renderer quiz dùng chung, có trạng thái chấm, phản hồi và reset rõ ràng.
- [x] Tích hợp dữ liệu kiểm thử minh họa có nguồn, không thay đổi nội dung học thật ngoài phạm vi.
- [x] Chạy `pnpm check`, `pnpm build`, kiểm tra preview desktop/mobile và lưu checkpoint.

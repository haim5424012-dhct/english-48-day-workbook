# TODO — Trang lộ trình 48 ngày

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

# TODO — Trang lộ trình 48 ngày

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

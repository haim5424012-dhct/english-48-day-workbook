# GitHub Pages QA

## 2026-08-24

- Repository: `https://github.com/haim5424012-dhct/english-48-day-workbook`
- Trang chủ đã phản hồi tại `https://haim5424012-dhct.github.io/english-48-day-workbook/`.
- Tiêu đề tải đúng: `48 Ngày Lấy Gốc Tiếng Anh`.
- Logo tải từ `/english-48-day-workbook/assets/english-workbook-mark.png`.
- Trang chủ hiển thị roadmap 48 ngày, 10 giai đoạn và trạng thái Ngày 1 đang mở.
- Deep link `https://haim5424012-dhct.github.io/english-48-day-workbook/ngay/01.html` tải đúng.
- Ngày 1 hiển thị hero, sáu bước, Lesson Brief, pronunciation focus, writing/quiz flow và link nguồn.
- URL đã chứng minh project-base routing và asset paths hoạt động khi mở trực tiếp.
- Chưa kết luận deployment workflow hoàn tất cho tới khi kiểm tra trạng thái GitHub Actions và các route dashboard/quiz/review.


## Route QA bổ sung

Dashboard `/tong-ket` tải thành công, hiển thị 48 ngày, 10 giai đoạn, 240 thẻ SRS và các thống kê từ/cấu trúc. QuizLab `/quiz-lab` tải thành công, hiển thị MCQ, fill, transform, match và short-answer cùng nút chấm bài. Route `/on-tap` tải thành công, hiển thị trạng thái kho SRS trống và liên kết Học Ngày 1 đúng project base. Các trang đã tải logo từ thư mục asset của project site.


## Kết luận phát hành

Run `32788354017` (commit `5f64c74`) đã hoàn tất với trạng thái **Success**; cả job `build` và `deploy` đều hoàn thành. Artifact `github-pages` được tạo và deployment URL là `https://haim5424012-dhct.github.io/english-48-day-workbook/`. Sau khi bật Pages bằng nguồn GitHub Actions, website đã được kiểm tra trực tiếp ở trang chủ, Ngày 1, Tổng kết, Phòng quiz và Ôn tập.

# Báo cáo Batch 6 — Ngày 26–30

**Ngày cập nhật:** 24/08/2026  
**Phạm vi:** Ngày 26, 27, 28, 29 và 30 trong workbook 48 ngày.

## 1. Kết quả tổng quan

Batch 6 đã được kiểm kê từ Google Sheet, tải và trích xuất các PDF truy cập được, đối chiếu các trang đáp án công khai, sau đó merge vào cả `data/days.json` và `client/src/data/days.json` bằng `merge_source_fields`. Phiên bản dữ liệu được cập nhật thành `0.6-source-batch-6`.

| Ngày | Chủ đề | Dữ liệu đã nạp | Quiz chính thức |
|---:|---|---|---|
| 26 | Câu điều kiện loại 1 | `grammarContent`, 5 SRS cards, `sourceNote` | Chưa nạp; 10 câu chia động từ + 10 MCQ 2 lựa chọn được ghi trong quiz gaps |
| 27 | Câu điều kiện loại 2 | `grammarContent`, 5 SRS cards, `sourceNote` | Chưa nạp; 10 câu chia động từ + 10 MCQ 2 lựa chọn được ghi trong quiz gaps |
| 28 | Câu điều kiện loại 3 | `grammarContent`, 5 SRS cards, `sourceNote` | Chưa nạp; 5 câu chia động từ + 15 MCQ 2 lựa chọn được ghi trong quiz gaps |
| 29 | Luyện nghe điền từ | `grammarContent`, 5 SRS cards, `sourceNote` | Chưa nạp; 24 chỗ trống nghe điền, phụ thuộc mp3 |
| 30 | Luyện nghe chép chính tả | `grammarContent`, 5 SRS cards, `sourceNote` | Chưa nạp; 19 chỗ trống nghe điền/chép chính tả, phụ thuộc mp3 |

## 2. Nguồn và bằng chứng

Manifest Sheet được lưu tại `source-extracts/batch-6-source-manifest.json`. Các PDF và text trích xuất được lưu trong `source-extracts/batch-6/originals/` và `source-extracts/batch-6/text/`. Hồ sơ từng ngày nằm tại `ngay-26.md` đến `ngay-30.md`; bản đối chiếu đáp án online nằm tại `online-answer-extracts.md`.

Các trang đáp án công khai được dùng để đối chiếu Ngày 26–30. Không tải hoặc nhúng audio/video gốc. Transcript/đáp án text chỉ được dùng khi nội dung có thể truy vết; audio vẫn được đánh dấu là phụ thuộc nguồn gốc.

## 3. Quy tắc bảo toàn dữ liệu

Importer Batch 6 dùng `merge_source_fields`: mảng tùy chọn rỗng không xóa dữ liệu cũ; chỉ cập nhật trường có nguồn mới. `quiz`, `listeningItems` và `writingPrompts` của Ngày 26–30 không bị ép dữ liệu vào schema hiện tại. Các format chưa tương thích được đưa vào `quiz-schema-gaps.md`.

## 4. Kiểm thử và QA

Đã rebuild `days-index`, kiểm tra hai bản JSON đồng nhất, chạy kiểm thử nội dung, TypeScript và production build. Preview route trung tâm file:// của Ngày 21 và Ngày 25 đã được kiểm tra trước đó; gói Comet được tạo lại sau Batch 6. Route đại diện Ngày 26–30 cần được kiểm tra bổ sung trong lần QA tiếp theo nếu phát hiện khác biệt giữa preview sandbox và Comet Windows.

## 5. Giới hạn còn lại

BÀI HỌC của các ngày là video/audio nguồn và chưa có transcript đầy đủ cho mọi phần. Không nhúng media gốc khi chưa xác minh quyền sử dụng. Quiz chính thức chưa mở rộng cho fill-blank, verb-form, listening gap-fill, dictation hoặc MCQ 2 lựa chọn; không dùng fixture QuizLab thay cho dữ liệu thi thật.

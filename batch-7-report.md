# Báo cáo Batch 7 — Ngày 31–35

**Ngày thực hiện:** 24/08/2026  
**Phạm vi:** Ngày 31–35 của workbook `48 Ngày Lấy Gốc Tiếng Anh`  
**Nguyên tắc:** chỉ nạp nội dung có thể truy vết; mảng nguồn rỗng không xóa dữ liệu cũ; không tải hoặc nhúng audio/video gốc khi chưa có xác nhận quyền sử dụng.

## 1. Kết luận điều hành

Batch 7 đã hoàn tất việc kiểm kê nguồn, trích xuất PDF, đọc thụ động các trang đáp án công khai có thể truy cập, nạp phần lý thuyết và 5 thẻ SRS cho mỗi ngày vào cả `data/days.json` và `client/src/data/days.json`. Các trường `listeningItems`, `shadowingSentences`, `writingPrompts` và `quiz` chính thức vẫn được giữ nguyên theo trạng thái nguồn/schema; không có câu hỏi mới nào bị ép thành MCQ.

Phạm vi Sheet được xác nhận vượt Batch 7: tab duy nhất chứa các block từ Ngày 31 đến ít nhất Ngày 48, trong đó Ngày 34 là “Luyện nghe về tiền bạc” và Ngày 35 là “Đại từ phản thân”. Batch 7 chỉ xử lý đến Ngày 35 theo yêu cầu hiện tại; Ngày 36–48 chưa được trích xuất.

## 2. Kiểm kê nguồn

| Ngày | Chủ đề trong Sheet | FILE ĐỀ | BÀI HỌC | FILE ĐỀ online | ĐÁP ÁN | Trạng thái kiểm kê |
|---:|---|---|---|---|---|---|
| 31 | Luyện nghe về giờ | PDF Drive, tải được | YouTube, không tải | PDF Drive trong thư mục, tải được | Blog, đọc được | Đủ artifact PDF; audio/video không dùng |
| 32 | Luyện nghe ngày tháng | PDF Drive, tải được | Thư mục Drive, không dùng media | PDF Drive trong thư mục, tải được | Blog, đọc được | Đủ artifact PDF; audio/video không dùng |
| 33 | Luyện nghe địa điểm | PDF Drive, tải được | YouTube, không tải | PDF Drive trong thư mục, tải được | Blog, đọc được | Đủ artifact PDF; audio/video không dùng |
| 34 | Luyện nghe về tiền bạc | PDF Drive, tải được | YouTube, không tải | PDF Drive trong thư mục, tải được | Blog trả 404 | Không có đáp án web xác minh |
| 35 | Đại từ phản thân | PDF Drive, tải được | YouTube, không tải | PDF Drive có tiêu đề “Sự hoà hợp về thì” | PDF Drive có tiêu đề “Sự hoà hợp về thì” | File online/đáp án lệch chủ đề, không dùng |

Manifest đầy đủ, ID Drive, hàng Sheet và URL gốc được lưu tại `source-extracts/batch-7-source-manifest.json`. Grid data của Sheet được lưu tại `source-extracts/batch-7-grid-links.json` và các dòng kiểm kê tại `source-extracts/batch-7-sheet-rows.json`.

## 3. Artifact và trích xuất

Các PDF đã tải ở dạng artifact đối chiếu tại `source-extracts/batch-7/originals/`; bản văn bản `pdftotext -layout` nằm tại `source-extracts/batch-7/text/`. Năm file lý thuyết và sáu file đề/đáp án PDF đã được trích xuất; không có audio/video nào được tải về. Bản đọc có cấu trúc theo từng ngày nằm ở:

| Ngày | File trích xuất | Nội dung chính |
|---:|---|---|
| 31 | `source-extracts/batch-7/ngay-31.md` | Cách nói giờ đúng, giờ hơn, giờ kém, giờ rưỡi và quarter past/to |
| 32 | `source-extracts/batch-7/ngay-32.md` | 12 tháng, cách đọc/viết ngày–tháng–năm, giới từ `on/in` |
| 33 | `source-extracts/batch-7/ngay-33.md` | Từ vựng địa điểm/con vật và nghe chọn/điền địa điểm |
| 34 | `source-extracts/batch-7/ngay-34.md` | Hỏi giá với `How much`, `cost`, dollar và pound |
| 35 | `source-extracts/batch-7/ngay-35.md` | Đại từ phản thân và cách dùng sau `by`; ghi nhận file thi lệch chủ đề |

Các phát hiện từ trang đáp án công khai được lưu ở `source-extracts/batch-7/online-answer-extracts.md`. Ngày 31–33 có transcript/đáp án hiển thị trên trang; Ngày 34 trả 404; Ngày 35 có file Drive lệch chủ đề nên không dùng.

## 4. Dữ liệu đã nạp

Importer `scripts/import-batch-7.py` dùng cùng hàm `merge_source_fields` với các batch trước. Mảng rỗng trong nhóm trường tùy chọn không ghi đè dữ liệu cũ. Sau import, mỗi Ngày 31–35 có `grammarContent`, 5 `srsCards`, `sourceNote`, `title`, `level` và `status` được cập nhật; `quiz` chính thức vẫn là mảng rỗng vì format nghe điền/viết hoặc nguồn lệch chưa phù hợp.

| Ngày | `grammarContent` | `srsCards` | `quiz` chính thức | Ghi chú |
|---:|---:|---:|---:|---|
| 31 | Đã nạp cách nói giờ | 5 | 0 | Chưa nạp đáp án nghe vào quiz |
| 32 | Đã nạp ngày tháng năm | 5 | 0 | Chưa nạp phần nghe viết |
| 33 | Đã nạp từ vựng địa điểm và mẫu hỏi | 5 | 0 | Không ép 9 chỗ trống thành MCQ |
| 34 | Đã nạp cấu trúc hỏi giá và đơn vị tiền | 5 | 0 | Trang đáp án trả 404 |
| 35 | Đã nạp đại từ phản thân | 5 | 0 | File đề online/đáp án là sự hòa hợp về thì |

Hai file dữ liệu đã được so sánh byte-level sau import và đồng nhất. `data/days.json` tiếp tục là nguồn trung tâm; frontend dùng bản đồng bộ tại `client/src/data/days.json`.

## 5. Tổng hợp khoảng trống schema quiz

Bảng tổng hợp đã được bổ sung vào `quiz-schema-gaps.md`:

| Ngày | Dạng cần schema riêng | Số lượng | MCQ gốc |
|---:|---|---:|---|
| 31 | Nghe viết số giờ | 10 | 8 câu 2 lựa chọn, 5 câu 3 lựa chọn |
| 32 | Nghe viết ngày, năm và ngày–tháng | 15 theo PDF bài học | 9 câu 2 lựa chọn, 5 câu 3 lựa chọn |
| 33 | Nghe điền địa điểm/từ | 9 chỗ trống | 6 câu 2 lựa chọn |
| 34 | Nghe điền đồ vật, màu sắc, giá và tính chất | 8 chỗ trống | 10 câu 3 lựa chọn |
| 35 | Đề online/đáp án lệch chủ đề | Chưa xác định | Chưa xác định theo đề đúng |

Không sửa `QuizRenderer`, không mở rộng schema và không ánh xạ dữ liệu thật vào `quiz` trong Batch 7.

## 6. QA kỹ thuật và giao diện

Các lệnh sau đều đạt:

```text
node scripts/build-days-index.mjs
node scripts/test-days.mjs
pnpm check
pnpm build
```

Chỉ mục vẫn xác nhận 48 ngày trên 10 giai đoạn. Build còn các cảnh báo đã biết về chunk lớn và texture `/manus-storage`; không có lỗi TypeScript hoặc lỗi build. Route `/ngay/31.html` đến `/ngay/35.html` hiển thị đúng tiêu đề, ngày, `SOURCE STATUS`, lý thuyết Ngày 31–35 và thanh tiến trình sáu bước.

Sau khi kiểm tra trực quan, bố cục trang ngày được tinh chỉnh theo hướng **lesson-focused**: canvas sáu bước là vùng trung tâm; các khối landing lặp được thay bằng thanh ngữ cảnh gọn; mỗi canvas có margin note theo ngày; nút hoàn tất dùng Signal Coral và dấu XONG; điều hướng phương pháp/lộ trình trỏ về `/lo-trinh`. Thay đổi này không sửa dữ liệu bài học và giữ nguyên luồng Input → Output.

## 7. Giới hạn còn lại

Bài học YouTube và các thư mục Drive có audio được ghi nhận nhưng không tải hoặc nhúng. Vì vậy Bước 1/3/4/5 có thể hiển thị `SOURCE STATUS` nếu ngày đó chưa có trường tương ứng trong schema. Không tự tạo transcript, đáp án hoặc câu shadowing thay thế.

Ngày 35 cần được xác nhận lại bằng đúng FILE ĐỀ online và ĐÁP ÁN cho “Đại từ phản thân”; hai file được liên kết hiện tại đều là “Sự hoà hợp về thì”. Ngày 34 cần một trang đáp án hoạt động hoặc artifact xác minh khác nếu muốn nạp đáp án bài nghe.

## 8. Tệp chính của Batch 7

| Tệp | Vai trò |
|---|---|
| `scripts/import-batch-7.py` | Import bằng merge an toàn |
| `source-extracts/batch-7-source-manifest.json` | Manifest nguồn Sheet/Drive |
| `source-extracts/batch-7/` | PDF, text extract, markdown đối chiếu và metadata |
| `quiz-schema-gaps.md` | Bảng format cần schema mới |
| `batch-7-report.md` | Báo cáo này |
| `website-profile.md`, `scientific-audit.md`, `README.md` | Hồ sơ sản phẩm và giới hạn đã cập nhật |

## References

[1]: https://docs.google.com/spreadsheets/d/1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI/edit "Google Sheet Lấy lại gốc tiếng Anh"
[2]: https://anhnguyenhi.blogspot.com/2024/08/bai-thi-online-luyen-nghe-ve-gio.html "Bài thi online: Luyện nghe về giờ"
[3]: https://anhnguyenhi.blogspot.com/2024/08/bai-thi-online-luyen-nghe-ngay-thang.html "Bài thi online: Luyện nghe ngày tháng"
[4]: https://anhnguyenhi.blogspot.com/2024/08/thi-online-luyen-nghe-ia-iem.html "Thi online: Luyện nghe địa điểm"
[5]: https://anhnguyenhi.blogspot.com/2024/08/thi-online-luyen-nghe-ve-tien-bac.html "Liên kết đáp án Ngày 34 — kết quả 404 khi truy cập"

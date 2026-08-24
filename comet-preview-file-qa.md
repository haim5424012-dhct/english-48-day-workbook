# QA gói preview Comet — file://

Ngày 24/08/2026, mở trực tiếp `file:///home/ubuntu/comet-preview-48-day-workbook/ngay/13.html?preview=local-v3`.

Kết quả: trang render thành công, không còn 404 hoặc trang trắng; route ảo nhận đúng `/ngay/13.html`; tiêu đề nội dung hiển thị đúng Ngày 13; CSS bố cục Editorial Lab Notebook được áp dụng; logo, hero và journey image tải từ asset local với naturalWidth lần lượt 1920, 2304, 2560 và 1920 pixel.

Nguyên nhân lỗi cũ: các file nested dùng đường dẫn asset sai (`./assets` thay vì `../assets`), stylesheet có `crossorigin` không phù hợp khi mở `file://`, và bundle vẫn tham chiếu ảnh `/manus-storage`. Bản sửa đã chuyển asset sang relative path, loại `crossorigin` khỏi stylesheet, chuyển bundle sang script `defer`, thêm route shim cho Windows/file:// và remap ảnh sang thư mục `assets/`.

Kiểm tra này chỉ xác nhận gói build tĩnh; bản chạy qua `python3 -m http.server 4173` vẫn được duy trì và là cách khuyến nghị cho Comet.

QA bổ sung: từ file `ngay/13.html`, bấm liên kết `Phòng quiz` đã chuyển đúng tới `quiz-lab/index.html` và renderer hiển thị đủ các fixture. Mở trực tiếp `index.html` cũng render đúng trang Lộ trình, hiển thị các tiêu đề Ngày 34–48 và ảnh local. Kết quả xác nhận route shim hoạt động ở cả route nested và root.

QA self-contained: bản mới đã inline toàn bộ CSS, JavaScript và 4 ảnh PNG vào từng HTML. Không còn thư mục `assets/`, không còn tham chiếu `/manus-storage` hoặc `./assets`/`../assets`. Mở trực tiếp `file:///.../index.html` và `file:///.../ngay/13.html` đều render có style, ảnh và tiêu đề đúng; Ngày 13 hiển thị đúng route ảo.

QA self-contained tối ưu: mở trực tiếp `ngay/13.html` chuyển về `index.html?cometRoute=/ngay/13.html` và vẫn hiển thị đúng DAY 13. Mở trực tiếp `quiz-lab/index.html` chuyển về `index.html?cometRoute=/quiz-lab`, QuizLab hiển thị MCQ, fill-blank, transformation, matching và short-answer cùng nút chấm bài. Gói có 52 HTML, một file gốc inline khoảng 44 MB, route files nhỏ, không có external app asset reference.

Điều tra lỗi mới: phiên bản trước dùng thay thế URL ảnh trong JS theo chuỗi trần, làm hỏng cú pháp bundle inline; đồng thời ảnh base64 làm mỗi HTML lớn khoảng 44 MB. Bản sửa dùng thay thế đúng literal JS có dấu ngoặc kép, inline JS/CSS nhưng giữ 4 ảnh local relative. Kết quả sandbox file://: mở `ngay/13.html` trực tiếp đã render đúng, không redirect, không module script, kích thước HTML khoảng 1,3 MB. Sau khi vá literal JS, mở Ngày 13 trực tiếp và bấm liên kết Phòng quiz đều render đúng; route chuyển sang `quiz-lab/index.html`, QuizLab hiển thị đủ 5 dạng fixture. Kiểm thử lại root `index.html` cũng render đúng roadmap 48 ngày. Console không có lỗi runtime làm trắng trang; chỉ còn cảnh báo React về cách spread prop `key`, không ảnh hưởng khởi tạo ứng dụng. Khi kiểm thử lại thẻ LESSON / 01 trên roadmap, thẻ hiển thị đúng nhưng thao tác click tự động qua chỉ số trình duyệt chưa làm đổi URL; cần xác minh trực tiếp event handler và route sinh ra trước khi bàn giao bản tiếp theo. Kết quả xác minh: click DOM thật trên thẻ LESSON / 01 đã chuyển đến `file:///home/ubuntu/comet-preview-48-day-workbook/ngay/01.html`; trang hiển thị đúng tiêu đề Ngày 1, nội dung nghe mẫu, sáu bước học và source note. Nguyên nhân đã sửa là Roadmap dùng `setLocation("/ngay/01.html")` tuyệt đối; helper mới đổi sang đường dẫn cùng thư mục khi protocol là `file:`. Điều tra tiếp theo cho thấy cần tránh phụ thuộc route file con khi Comet mở gói trong thư mục Temp; bản mới chuyển mọi route nội bộ về `index.html?cometRoute=...`, trong khi vẫn giữ `ngay/01.html` để mở trực tiếp. Bản central-route-v2 mở roadmap thành công trong sandbox; thao tác click qua browser tool cần chờ điều hướng hoàn tất để xác nhận URL và nội dung Ngày 1. Bản route-fix-v3 đã xác nhận `index.html?cometRoute=%2Fngay%2F01.html` hiển thị đúng Ngày 1. Shim trước đó bị thiếu `queryRoute`, khiến mọi URL quay về `/`; generator đã bổ sung dòng đọc query và ưu tiên route này.

Ảnh self-contained-v4: generator đã nhúng 4 ảnh PNG vào `index.html` bằng data URI; các route shell không còn cần tải ảnh local. Kiểm thử file:// cho thấy 2 ảnh đang hiển thị có `complete=true`, `naturalWidth=1920`, `src` bắt đầu bằng `data:image/png;base64`, và số ảnh hỏng là 0. Cần kiểm tra lại ZIP sau khi đóng gói.

## QA Batch 6 — 24/08/2026

Đã chạy lại `scripts/prepare-comet-preview.mjs` sau khi nạp Ngày 26–30. Generator tạo 52 HTML route shell và `index.html` trung tâm tự chứa JavaScript/CSS cùng bốn ảnh PNG bằng data URI. Các route hợp lệ `ngay/26.html`, `ngay/27.html`, `ngay/28.html`, `ngay/29.html` và `ngay/30.html` hiển thị đúng tiêu đề và nội dung nguồn tương ứng trong preview sandbox. URL dạng `/ngay/26` không có hậu tố `.html` rơi vào 404 vì không nằm trong khai báo route; đây không phải định dạng route của gói Comet. Không tải hoặc nhúng audio/video gốc.


## QA Batch 5 — file:// preview

Ngày 21 và Ngày 25 đã được mở bằng route trung tâm `index.html?cometRoute=...` trong gói Comet sau khi nạp Batch 5. Sandbox render đúng `DAY 21 / NEXT` với chủ đề “LUYỆN NGHE SỐ VÀ TÊN” và `DAY 25 / NEXT` với chủ đề “LIÊN TỪ CHỈ SỰ ĐỐI LẬP”. Route không rơi về roadmap; ảnh minh họa trung tâm vẫn hiển thị. Đây là kiểm thử sandbox Chromium/file://, chưa thay thế kiểm thử Comet Windows thực tế.

## QA Batch 7 và lesson-focused pass — 24/08/2026

- Đã tạo lại preview self-contained sau import Ngày 31–35; central `index.html` khoảng 35,9 MB, ảnh PNG được nhúng data URI.
- Đã kiểm tra trực quan `/ngay/31.html` và `/ngay/35.html`: tiêu đề, margin note theo ngày, `SOURCE STATUS`, rail sáu bước, nút Coral “Đánh dấu bước này XONG” và thanh ngữ cảnh workbook hiển thị đúng.
- Các route ngày hợp lệ trong gói dùng hậu tố `.html`; route phụ chuyển về central index qua `cometRoute`.
- Không tải hoặc nhúng audio/video gốc; các phần thiếu vẫn hiển thị trạng thái nguồn.
- `pnpm check`, `pnpm build` và `node scripts/test-days.mjs` đạt trước khi đóng gói.

# QA gói preview Comet — file://

Ngày 24/08/2026, mở trực tiếp `file:///home/ubuntu/comet-preview-48-day-workbook/ngay/13.html?preview=local-v3`.

Kết quả: trang render thành công, không còn 404 hoặc trang trắng; route ảo nhận đúng `/ngay/13.html`; tiêu đề nội dung hiển thị đúng Ngày 13; CSS bố cục Editorial Lab Notebook được áp dụng; logo, hero và journey image tải từ asset local với naturalWidth lần lượt 1920, 2304, 2560 và 1920 pixel.

Nguyên nhân lỗi cũ: các file nested dùng đường dẫn asset sai (`./assets` thay vì `../assets`), stylesheet có `crossorigin` không phù hợp khi mở `file://`, và bundle vẫn tham chiếu ảnh `/manus-storage`. Bản sửa đã chuyển asset sang relative path, loại `crossorigin` khỏi stylesheet, chuyển bundle sang script `defer`, thêm route shim cho Windows/file:// và remap ảnh sang thư mục `assets/`.

Kiểm tra này chỉ xác nhận gói build tĩnh; bản chạy qua `python3 -m http.server 4173` vẫn được duy trì và là cách khuyến nghị cho Comet.

QA bổ sung: từ file `ngay/13.html`, bấm liên kết `Phòng quiz` đã chuyển đúng tới `quiz-lab/index.html` và renderer hiển thị đủ các fixture. Mở trực tiếp `index.html` cũng render đúng trang Lộ trình, hiển thị các tiêu đề Ngày 34–48 và ảnh local. Kết quả xác nhận route shim hoạt động ở cả route nested và root.

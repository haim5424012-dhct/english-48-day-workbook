# Browser QA notes

Đã mở thành công `/ngay/01.html`; trang Ngày 1 hiển thị đúng workbook và sáu bước. URL không rơi vào 404.

Trong trạng thái trình duyệt hiện tại, Bước 1 đã hoàn thành nên Bước 2 đang mở; Bước 3–6 vẫn khóa theo đúng nguyên tắc tuần tự. Vì vậy thao tác click vào Bước 4 chưa mở nội dung Shadowing, cần tạo một trạng thái test cục bộ với ba bước đầu đã hoàn thành để kiểm tra riêng giao diện ghi âm.


Đã tạo trạng thái test cục bộ để mở Bước 4. Trang hiển thị đủ ba nút: “Nghe giọng mẫu”, “So khớp câu nói”, “Ghi âm thật”; mô tả phân biệt SpeechRecognition với MediaRecorder; transcript được gắn nhãn “Máy nghe được”. Bước 4 mở đúng và không xuất hiện 404 hay lỗi TypeScript trong trang.


Đã bấm “Ghi âm thật” trong môi trường preview; trình duyệt sandbox từ chối quyền micro nên giao diện hiển thị rõ “Micro bị từ chối...” đúng yêu cầu fallback. Console không ghi nhận lỗi JavaScript sau thao tác này.


Sau bản vá ghi âm: code đã chuyển sang lưu `bestAudioUrls` theo từng câu, helper đổi câu đặt `audioUrl` về `null`, dừng stream/recorder và revoke URL tạm nếu không phải bản tốt nhất. `pnpm check` và `pnpm build` đạt.

Kiểm thử ghi âm thành công thật: **chưa thể xác nhận trong sandbox preview hiện tại**, vì môi trường này chỉ cung cấp nhánh từ chối quyền micro. Cần chạy trên Chrome/Edge desktop hoặc thiết bị di động đã cấp quyền micro để xác nhận: nút ghi chuyển sang “Dừng ghi âm”, dừng ghi tạo audio nghe lại được, ghi lại nhiều lần không lỗi và bản tốt nhất theo từng câu không bị ghi đè. Không đánh dấu đạt thay cho phép thử thực tế này.


QA sau bản vá reset ghi âm: preview vẫn mở đúng `/ngay/01.html` và Bước 4 theo tiến trình hiện tại. Vì dữ liệu Ngày 1 đang để `shadowingSentences` rỗng theo nguồn gốc đã kiểm chứng, giao diện hiển thị `SOURCE STATUS` thay vì nút MediaRecorder; do đó không thể thực hiện phép thử ghi âm thành công trong phiên này. Đã xác nhận bằng trình duyệt rằng không có bản ghi cũ cần hiển thị trong trạng thái thiếu nguồn. Kiểm thử thành công thật trên thiết bị có micro vẫn là bước mở cần người dùng thực hiện sau khi nạp câu Shadowing có nguồn.

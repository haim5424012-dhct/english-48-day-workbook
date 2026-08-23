# Browser QA notes

Đã mở thành công `/ngay/01.html`; trang Ngày 1 hiển thị đúng workbook và sáu bước. URL không rơi vào 404.

Trong trạng thái trình duyệt hiện tại, Bước 1 đã hoàn thành nên Bước 2 đang mở; Bước 3–6 vẫn khóa theo đúng nguyên tắc tuần tự. Vì vậy thao tác click vào Bước 4 chưa mở nội dung Shadowing, cần tạo một trạng thái test cục bộ với ba bước đầu đã hoàn thành để kiểm tra riêng giao diện ghi âm.


Đã tạo trạng thái test cục bộ để mở Bước 4. Trang hiển thị đủ ba nút: “Nghe giọng mẫu”, “So khớp câu nói”, “Ghi âm thật”; mô tả phân biệt SpeechRecognition với MediaRecorder; transcript được gắn nhãn “Máy nghe được”. Bước 4 mở đúng và không xuất hiện 404 hay lỗi TypeScript trong trang.


Đã bấm “Ghi âm thật” trong môi trường preview; trình duyệt sandbox từ chối quyền micro nên giao diện hiển thị rõ “Micro bị từ chối...” đúng yêu cầu fallback. Console không ghi nhận lỗi JavaScript sau thao tác này.

# Google Sheet tab audit

Đã mở Google Sheet nguồn ở chế độ chỉ xem bằng tài khoản `behaitxcltg@gmail.com`.

Tên tài liệu: `Lấy lại gốc tiếng anh`.

Danh sách tab mở từ menu “Tất cả trang tính”: chỉ thấy một tab duy nhất, tên `48 NGÀY LẤY GỐC TIẾNG ANH TOÀN DIỆN`.

Tab đang hiển thị cấu trúc dữ liệu theo các khối Ngày 1, Ngày 2, Ngày 3...; vùng nhìn thấy đã đến Ngày 9. Chưa thấy tab thứ hai chứa Ngày 34–48. Cần kiểm tra phần cuối của tab duy nhất để kết luận chính thức về phạm vi Ngày 34–48 trước khi nạp dữ liệu.


Kiểm tra bổ sung bằng ô tên `A80` cho thấy tab duy nhất có các khối `NGÀY 27`, `NGÀY 28`, `NGÀY 29`, `NGÀY 30`, `NGÀY 31`, `NGÀY 32`, `NGÀY 33`, `NGÀY 34. LUYỆN NGHE VỀ TIỀN BẠC` và `NGÀY 35. ĐẠI TỪ PHẢN THÂN`. Vì vậy giả định trong prompt rằng tab mặc định chỉ chứa Ngày 1–33 không còn đúng với trạng thái Sheet hiện tại. Cần tiếp tục kiểm tra đến cuối vùng dữ liệu để xác định chính xác ngày cuối cùng, không tự suy đoán phần còn thiếu.


Kiểm tra preview `/ngay/02.html` sau đồng bộ: route đã chọn đúng tiêu đề `Thể nghi vấn của động từ to be`, nhãn hero `DAY 02 / NEXT`, progress `TIẾN TRÌNH NGÀY 02` và grammarContent nguồn. Các khối nghe/quiz thiếu nguồn đã được thay bằng thông báo minh bạch. Tuy nhiên một số nhãn phụ trong template vẫn còn cố định như `DAY 01 / CORE GRAMMAR` và chỉ mục đang học; cần vá tiếp để không tạo ấn tượng sai khi mở ngày khác.


QA sau vá Home: screenshot `/ngay/01.html` vẫn giữ giao diện Editorial Lab Notebook và nhãn DAY 01 / FOUNDATION. Screenshot `/ngay/02.html` hiển thị đúng DAY 02 / NEXT, tiêu đề Ngày 2 và trạng thái `SOURCE STATUS` cho bước nghe; các phần không có nguồn không còn hiển thị đoạn hội thoại/nghe mẫu hardcoded. Build và TypeScript đều đạt.


QA batch 2: preview `/ngay/06.html` hiển thị đúng `DAY 06 / NEXT`, tiêu đề “Thể phủ định của động từ thường ở hiện tại” và `SOURCE STATUS` cho phần nghe, không tự nhúng video YouTube hay tạo đoạn nghe thay thế. Giao diện giữ nguyên; phần lý thuyết được cập nhật trong dữ liệu nhưng bước Học chưa mở trong trạng thái trình duyệt hiện tại.

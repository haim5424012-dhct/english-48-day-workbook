# Quiz schema gaps — tổng hợp Ngày 1, 3–15

Tài liệu này chỉ kiểm kê format nguồn để phục vụ quyết định mở rộng schema sau. Các câu không khớp schema `quiz` options hiện tại **không được chuyển đổi hoặc bịa phương án** trong các batch đã xử lý.

| Ngày | Dạng không phải MCQ / cần schema mới | Số câu hoặc mục | MCQ và số lựa chọn gốc |
|---|---|---:|---|
| 1 | Điền/viết theo bài thi và đáp án; artifact text bài thi không còn trong bộ nguồn đã lưu nên không định lượng đáng tin cậy | Chưa xác định | Chưa xác định từ artifact hiện có |
| 3 | Nối câu hỏi–đáp án | 5 cặp | 5 câu 2 lựa chọn + 5 câu 3 lựa chọn |
| 3 | Viết câu trả lời theo hình | 5 | — |
| 4 | Viết câu trả lời theo hình | 5 | 5 câu 2 lựa chọn + 5 câu 3 lựa chọn |
| 5 | Chuyển động từ sang dạng V(s/es) | 8 mục | 12 câu 2 lựa chọn |
| 6 | Chuyển câu khẳng định sang phủ định | 5 câu (Câu 16–20) | 10 câu 3 lựa chọn |
| 7 | Viết câu trả lời Yes/No theo hình | 5 | 10 câu 2 lựa chọn |
| 8 | Điền/chia động từ hiện tại đơn | 10 câu | 10 câu 3 lựa chọn |
| 9 | Xác định từ loại trong câu | 5 câu | 5 câu 2 lựa chọn + 5 câu 3 lựa chọn |
| 10 | Chuyển động từ sang V-ing; điền/chia hiện tại tiếp diễn | 5 mục + 5 câu | 10 câu 3 lựa chọn |
| 11 | Chuyển động từ sang V(s/es) và V-ing; điền/chia thì | 5 mục + 5 câu | 10 câu 3 lựa chọn |
| 12 | Chuyển động từ sang quá khứ; điền/chia quá khứ đơn | 5 mục + 5 câu | 10 câu 3 lựa chọn |
| 13 | Điền/chia quá khứ đơn phủ định/nghi vấn; trả lời Yes/No theo hình | 5 + 5 câu | 10 câu 3 lựa chọn |
| 14 | Điền/chia quá khứ tiếp diễn | 5 câu | 5 câu 2 lựa chọn + 10 câu 3 lựa chọn |
| 15 | Chuyển động từ sang quá khứ phân từ; điền/chia hiện tại hoàn thành | 5 mục + 5 câu | 5 câu 2 lựa chọn + 10 câu 3 lựa chọn |

## Ghi chú phương pháp

Các số lượng trên được đếm từ các file text bài thi online đã lưu trong `/home/ubuntu/english_learning_project/materials/ngay_03` đến `ngay_15`, cùng báo cáo batch 1–2 đối với Ngày 1 và các ngày đã xử lý trước. Ngày 1 được ghi là chưa xác định thay vì suy đoán vì artifact bài thi text không có trong thư mục nguồn hiện tại. Các block MCQ được ghi theo số lựa chọn thực tế trong từng block; không giả định mọi ngày đều có 3 lựa chọn.

Ngày 11–15 có các dạng mới cần cân nhắc khi thiết kế schema sau này: bảng biến đổi động từ, điền/chia động từ, trả lời ngắn theo hình, và trong Ngày 13 có câu trả lời theo quy ước `Did – break`. Ngày 15 có dạng điền hai vị trí như `have – made`, cần được xem là một format riêng nếu mở rộng schema.

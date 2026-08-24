# Ý tưởng thiết kế — 48 Ngày Lấy Gốc Tiếng Anh

## Ba hướng thẩm mỹ ban đầu

### Hướng 1 — Editorial Lab Notebook
**Very Brief Intro:** Một workbook kỹ thuật số kết hợp tinh thần Swiss International với sổ tay phòng thí nghiệm: lưới rõ, mực xanh đậm, các dấu đánh dấu tiến độ và đường kẻ như giấy ghi chú. Cảm giác cần đạt là có phương pháp, sáng sủa và đủ thú vị để học sinh muốn quay lại mỗi tối.

**Probability:** 0.07

### Hướng 2 — Field Guide for Everyday English
**Very Brief Intro:** Một cẩm nang thực địa thân thiện, dùng các thẻ bài học, nhãn phân loại và sơ đồ đường đi để biến mỗi ngày học thành một chuyến khám phá ngôn ngữ. Tông màu thiên nhiên và minh họa mềm giúp giảm áp lực nhưng vẫn giữ cấu trúc.

**Probability:** 0.03

### Hướng 3 — Quiet Focus / Study Console
**Very Brief Intro:** Một không gian tập trung tối giản, nền sáng lạnh, các vùng thông tin xếp theo nhịp thở và tương tác rất tiết chế. Thiết kế ưu tiên đọc lâu trên điện thoại và làm nổi bật cảm giác tiến bộ từng bước.

**Probability:** 0.09

## Hướng được chọn — Editorial Lab Notebook

### Design Movement
**Swiss International Style** được làm mềm bằng ngôn ngữ **Japanese stationery / lab notebook**: hệ thống, tiết chế và có những dấu hiệu thủ công vừa đủ để bài học không lạnh lẽo.

### Core Principles
1. **Đường đi học tập phải nhìn thấy được:** thanh tiến trình, rail sáu bước và dấu XONG luôn chỉ rõ học sinh đang ở đâu.
2. **Mỗi khối nội dung có một nhiệm vụ:** không dùng thẻ trang trí; khối nào cũng phục vụ đọc, nghe, nói, viết hoặc kiểm tra.
3. **Tương phản mực–giấy rõ ràng:** chữ xanh mực trên nền trắng lạnh, màu san hô chỉ dùng cho hành động và trạng thái, màu mint dành cho hoàn thành.
4. **Dấu vết học tập là một phần của giao diện:** underline, đường đục lỗ, nhãn ngày và con dấu hoàn thành tạo cảm giác đang viết vào một quyển vở thật.

### Color Philosophy
Nền **paper blue-white** tạo cảm giác nhẹ mắt khi học ban đêm nhưng không rơi vào công thức kem–cam quen thuộc. **Ink navy** là màu của kiến thức và khả năng đọc lâu. **Signal coral** chỉ xuất hiện ở nút hành động, lỗi và các điểm cần chú ý để tạo nhịp năng lượng. **Mint** là bằng chứng trực quan của tiến bộ, còn **school-bus yellow** được dùng rất tiết kiệm để đánh dấu ghi nhớ và flashcard.

### Layout Paradigm
Bố cục **left rail + reading canvas**: rail dọc cố định trên desktop chứa sáu bước tuần tự; canvas bên phải dùng các dải nội dung so le, không gom mọi thứ vào một cột trung tâm. Trên mobile, rail chuyển thành thanh bước ngang có thể cuộn, còn nội dung vẫn giữ nhịp notebook với các section có tiêu đề lớn và khoảng thở.

### Signature Elements
- Con dấu **XONG** dạng mực san hô xuất hiện khi hoàn thành một bước.
- Đường **perforation** chấm–gạch ngăn các vùng bài học, gợi mép giấy xé.
- Nhãn **DAY 01 / CORE GRAMMAR** kiểu label-maker ở đầu trang và trên các khối nhiệm vụ.

### Interaction Philosophy
Tương tác phải giống như đánh dấu vào workbook: bấm một lần có phản hồi ngay, kết quả hiển thị cạnh nhiệm vụ, không đẩy học sinh sang màn hình khác. Các bước sau chỉ mở khi bước trước đã hoàn thành để bảo toàn thứ tự Input trước Output. Tất cả nút đều có trạng thái focus rõ ràng và vùng chạm đủ lớn trên điện thoại.

### Animation
Chuyển cảnh ngắn 160–240ms, dùng transform và opacity với easing `cubic-bezier(0.23, 1, 0.32, 1)`. Nội dung của bước mới trượt vào rất nhẹ từ 8px, con dấu XONG xuất hiện bằng scale từ 0.95 kèm opacity chứ không bật từ 0. Khi người dùng nhập đáp án, chỉ thay đổi màu viền và microcopy; không rung hoặc gây xao nhãng. Tôn trọng `prefers-reduced-motion` bằng cách tắt các chuyển động không cần thiết.

### Typography System
- **Space Grotesk**: tiêu đề lớn, nhãn ngày, số bước; dùng 600–700 để tạo nhịp hình học.
- **IBM Plex Sans**: nội dung giải thích, câu hỏi, nút và microcopy; dùng 400–600 để tối ưu khả năng đọc tiếng Việt–Anh.
- Quy tắc hierarchy: H1 48/52 desktop và 34/38 mobile; H2 26/32; body 16/26; label 11/14 uppercase với tracking 0.16em.

### Brand Essence
**Một workbook tương tác giúp học sinh Việt Nam lấy lại nền tiếng Anh trong 48 ngày bằng chuỗi nhiệm vụ nghe–nói–đọc–viết có thể nhìn thấy tiến bộ, thay vì chỉ đọc lý thuyết.**

**Personality:** rõ ràng, động viên, có phương pháp.

### Brand Voice
Headline nói ngắn, có hướng dẫn và không hô khẩu hiệu. CTA dùng động từ cụ thể, microcopy xác nhận nỗ lực thay vì phán xét.

- “Bắt đầu bằng tai. Kết thúc bằng một câu của chính bạn.”
- “Nghe kỹ một lần nữa — rồi để miệng thử thay bạn.”

### Wordmark & Logo
Logo là một biểu tượng không chữ: **một dấu ngoặc kép mở tạo thành hình mũi tên đi lên, cắt bởi ba vạch ngang như dòng vở**. Dấu ngoặc đại diện cho ngôn ngữ, mũi tên cho tiến bộ, ba vạch cho nhịp luyện tập. Wordmark dùng chữ Space Grotesk biến thể với số `48` đặt lệch như nhãn dán trên gáy vở, không dùng tên trong font mặc định.

### Signature Brand Color
**Signal Coral — `#F05A4F`**. Đây là màu mực đánh dấu hành động và thành tựu: đủ ấm để động viên, đủ mạnh để nhận diện, nhưng không phủ toàn bộ giao diện.

## Quyết định thực thi
Mọi trang, component và file CSS mới phải giữ hệ mực–giấy, rail sáu bước, label ngày và con dấu XONG. Nếu một lựa chọn làm giao diện giống dashboard chung chung hơn là workbook có phương pháp, lựa chọn đó bị loại.

## Style Decisions

- Chỉ dấu thương hiệu phải đọc được ngay ở kích thước header: biểu tượng quote-arrow notebook đi cùng nhãn lệch `48`, không thu nhỏ thành một icon điều hướng thông thường.
- Course index dùng ngôn ngữ thẻ nhiệm vụ workbook: metadata, ruled lines, trạng thái khóa/đang học và dấu XONG thay cho card SaaS trung tính.
- Các vùng nền ink navy phải vẫn giống trang phương pháp trong workbook nhờ đường kẻ, annotation, số thứ tự và margin notes.
- Nhịp sáu bước `input → grammar → active listening → speaking → writing → review` được lặp lại ở hero, method band, route map và index.
- Signal Coral ưu tiên cho action, active state và achievement; cấu trúc phân cấp thường ngày dùng ink navy, ink-soft và màu giấy.
- Mọi bề mặt quiz phải dùng ngôn ngữ workbook-native: số thứ tự ở lề, vùng trả lời có đường kẻ, đường perforation, nhãn nguồn và phản hồi dạng con dấu.
- Mọi route nhìn thấy bởi học sinh phải có ít nhất một dấu hiệu của lộ trình 48 ngày; Phòng quiz dùng rail sáu bước và nhãn nhiệm vụ để không tách rời phương pháp học.
- Thuật ngữ nội bộ như “schema/lab” chỉ giữ ở annotation nhỏ; tiêu đề và CTA chính phải nói trực tiếp, rõ ràng với người học.

- Dashboard tổng kết phải đọc như **workbook audit của người học**, không như analytics dashboard: số liệu dùng ledger, con dấu, nhãn ngày, đường ruled/perforation và trạng thái tiến bộ.
- Tiếng Anh kiểu lab như “field record / source ledger / audit” chỉ dùng ở annotation nhỏ; headline, CTA và trạng thái chính dùng tiếng Việt trực tiếp, hướng dẫn học sinh.
- Signal Coral `#F05A4F` chỉ là mực hành động/thành tựu: CTA, active/progress, row marker quan trọng và dấu XONG; hierarchy thường ngày dựa vào ink navy, scale chữ, đường kẻ và nhãn notebook.

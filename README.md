# 48 Ngày Lấy Gốc Tiếng Anh

Website workbook tương tác dành cho học sinh Việt Nam muốn xây lại nền tảng tiếng Anh trong 48 ngày. Luồng tương tác đầy đủ đã được xây cho **Ngày 1 — Thể khẳng định và phủ định của động từ to be**; dữ liệu nguồn đã được xử lý theo các batch đến **Ngày 20**, còn Ngày 21–48 giữ khung hoặc trạng thái chờ nguồn.

> **Định hướng thiết kế:** Editorial Lab Notebook — mực xanh đậm trên giấy xanh-trắng, Signal Coral cho hành động và trạng thái, sáu bước học tuần tự, đường perforation và dấu XONG.

## Đã hoàn thành trong Ngày 1

Ngày học gồm đủ sáu bước theo thứ tự Input trước Output: Khởi động nghe thụ động; Học đọc và ngữ pháp; Nghe chủ động kèm dictation; Nói theo shadowing; Viết câu mới có phản hồi heuristic tức thì; Kiểm tra trắc nghiệm và flashcard SRS. Bài nghe dùng `SpeechSynthesis`, shadowing dùng `SpeechRecognition` nếu trình duyệt hỗ trợ, còn tiến trình, điểm quiz và khoảng ôn flashcard được lưu bằng `localStorage` trên thiết bị hiện tại.

Nội dung tương tác của Ngày 1 có các ví dụ tương đương theo đúng chủ đề; các phần nguồn và giới hạn truy cập được ghi trong audit. Nội dung của Ngày 2–15 chỉ được giữ ở những trường đã có artifact/nguồn tương ứng; phần thiếu không được tự bịa hoặc chuyển thành quiz trắc nghiệm.

## Cấu trúc tệp chính

| Tệp | Vai trò |
|---|---|
| `data/days.json` | Nguồn dữ liệu trung tâm cho 48 ngày, có schema Ngày 1 và khung Ngày 2–48 |
| `client/src/data/days.json` | Bản dữ liệu được Vite import khi build frontend |
| `client/src/pages/Home.tsx` | Trang workbook; giao diện đọc dữ liệu từ `days.json`, không hard-code nội dung bài học |
| `client/src/index.css` | Design tokens, layout, responsive và chuyển động của hướng Editorial Lab Notebook |
| `client/index.html` | Metadata, font Space Grotesk/IBM Plex Sans và favicon logo |
| `ideas.md` | Brainstorm, quyết định thương hiệu và style decisions |
| `scientific-audit.md` | Hồ sơ nguồn, quyết định nội dung và giới hạn xác nhận |

## Chạy dự án

```bash
pnpm install
pnpm dev
```

Kiểm tra TypeScript và build production:

```bash
pnpm check
pnpm build
```

Bản xem trước hiện chạy trong Manus WebDev. Khi muốn xuất bản trên GitHub Pages, dùng GitHub Actions hoặc thư mục build theo cấu hình repository; không đưa khóa API hoặc thông tin đăng nhập vào frontend.

## Thêm Ngày 2

Mở `data/days.json`, tìm mảng `days[]` và thay object khung Ngày 2 bằng object đầy đủ theo đúng schema Ngày 1. Chỉ cần thêm dữ liệu: `day`, `title`, `warmupScript`, `grammarContent`, `listeningItems`, `shadowingSentences`, `writingPrompts`, `quiz` và `srsCards`. Không sửa component giao diện hoặc logic tương tác.

Sau khi cập nhật dữ liệu nguồn, đồng bộ bản frontend rồi chạy kiểm tra:

```bash
cp data/days.json client/src/data/days.json
pnpm check
pnpm build
```

Ví dụ schema tối thiểu:

```json
{
  "day": 2,
  "title": "Thể nghi vấn của động từ to be",
  "level": "NEXT",
  "status": "ready",
  "warmupScript": "Are you ready? Yes, I am.",
  "grammarContent": "<p>...</p>",
  "listeningItems": [
    { "audioText": "Are they students?", "blankSentence": "___ they students?", "answer": "Are" }
  ],
  "shadowingSentences": ["Are you ready?", "Is she at home?", "Are they students?"],
  "writingPrompts": ["Viết một câu hỏi dùng to be."],
  "quiz": [
    { "question": "...", "options": ["...", "...", "..."], "correctIndex": 0 }
  ],
  "srsCards": [
    { "front": "Are you...? = ?", "back": "Bạn có ... không?" }
  ]
}
```

## Ghi chú sử dụng

Nút phát âm cần trình duyệt cho phép SpeechSynthesis. Shadowing cần Chrome hoặc Edge và quyền microphone; nếu không hỗ trợ, website hiển thị thông báo fallback rõ ràng. Điểm số và trạng thái hoàn thành chỉ được lưu cục bộ trên thiết bị hiện tại, chưa đồng bộ lên Google Sheets hay tài khoản đám mây.

Website không tự nhận là nội dung giảng dạy gốc của giáo viên khi chưa xác minh được tệp nguồn. Khi có link BÀI HỌC/FILE ĐỀ/ĐÁP ÁN mở được, hãy thay phần dữ liệu tương đương trong `days.json` và cập nhật `scientific-audit.md`.

## Trang lộ trình 48 ngày

Trang chủ `/` và `/lo-trinh` hiện là bản đồ toàn khóa. Dữ liệu hiển thị nhẹ nằm ở `data/days-index.json`, gồm đúng 48 trạm và 10 giai đoạn: nền tảng TO BE; động từ thường và hiện tại; quá khứ; hiện tại hoàn thành và tương lai; ngữ âm; nghe số/tên và động từ khuyết thiếu; liên từ; câu điều kiện; nghe chuyên đề; và chặng 34–48 `Sắp cập nhật`.

Mỗi trạm có một trong ba trạng thái: `completed` khi ngày đó nằm trong `completedDays`; `ready` khi ngày 1 hoặc ngày trước đó đã hoàn thành; và `locked` cho các trạm chưa đủ điều kiện. Trạm khóa không điều hướng mà hiển thị thông báo cần hoàn thành ngày liền trước. Trạm Ngày 1 mở `/ngay/01.html`; trang `/on-tap` gom flashcard SRS của những ngày đã được ghi nhận hoàn thành.

Trang Ngày 1 gọi `markDayComplete(1)` sau khi đủ sáu bước, ghi schema `{ completedDays, lastCompletedAt, streak }` vào `localStorage` với khóa `english48-roadmap-progress`. Vì vậy khi quay lại `/`, roadmap tự cập nhật số ngày, streak và trạm tiếp theo; dữ liệu vẫn chỉ lưu trên thiết bị hiện tại.


## Hồ sơ cập nhật — 24/08/2026

Website hiện có **48 trạm học và 10 giai đoạn** trên lộ trình. Nội dung nguồn đã được xử lý theo bốn đợt đến **Ngày 1–20**; Ngày 21–48 giữ trạng thái khung hoặc `pending-source`, không tự điền nội dung khi thiếu nguồn. Theo kiểm kê dữ liệu hiện hành, `grammarContent` có ở 19 ngày, `srsCards` có ở 20 ngày, còn `listeningItems`, `writingPrompts` và `quiz` chính thức chưa được ánh xạ vào `days.json` khi chưa có format nguồn tương thích.

| Hạng mục | Trạng thái hiện tại | Ghi chú truy vết |
|---|---|---|
| Lộ trình | Đã có 48 ngày, 10 giai đoạn | `data/days-index.json`, `Roadmap.tsx` |
| Nội dung nguồn | Đã xử lý Ngày 1–20 theo các batch đã ghi nhận | `source-extracts/`, `batch-4-report.md` |
| Ngày 1 | Có luồng học sáu bước và nội dung tương tác | `data/days.json`, `Home.tsx` |
| Ngày 2–20 | Có dữ liệu lý thuyết/SRS ở mức đã trích xuất; trường thiếu nguồn được giữ rỗng | Không dùng nội dung giả để lấp chỗ trống; xem `batch-4-report.md` |
| QuizLab | Có fixture minh họa cho MCQ, fill-blank, transformation, matching, short-answer | Không ghi fixture vào quiz chính thức |
| Quiz chính thức | Chưa ánh xạ các dạng không tương thích vào `days.json` | Theo quyết định hoãn mở rộng schema |
| Ôn tập SRS | Lưu cục bộ theo ngày, có interval/easeFactor/lastReviewedAt và lọc thẻ đến hạn | Khóa localStorage, chưa đồng bộ đám mây |
| Shadowing | SpeechSynthesis, SpeechRecognition fallback và MediaRecorder ghi âm tạm | Cần quyền microphone để ghi thật |
| Gói Comet | `index.html` trung tâm tự chứa JS/CSS/ảnh bằng data URI; route phụ chuyển về index | Có `README-COMET.md`, `start-comet-preview.bat` |
| Kiểm thử mã nguồn | `pnpm check` và `pnpm build` đạt ở lần cập nhật gần nhất | Build còn cảnh báo chunk lớn/texture runtime, không phải lỗi biên dịch |

### Quy tắc xác nhận nội dung

Các phần được ghi là nội dung nguồn chỉ được xem là đã trích xuất trong phạm vi tệp và vị trí đã lưu tại `source-extracts`. Những phần chưa truy cập được, không khớp schema hoặc chưa đủ bằng chứng vẫn phải hiển thị `SOURCE STATUS`/`pending-source`. QuizLab chỉ là phòng kiểm tra giao diện; không được dùng các fixture của nó như dữ liệu bài thi thật.

### Hồ sơ Comet và giới hạn môi trường

Để tránh lỗi `ERR_FILE_NOT_FOUND` và ảnh hỏng khi Comet mở từ thư mục tạm, cần giải nén toàn bộ gói vào một thư mục cố định rồi mở `index.html`. Bản self-contained mới nhúng ảnh vào file trung tâm; nếu chính sách Comet chặn JavaScript từ `file://`, dùng `start-comet-preview.bat` để chạy localhost. Việc kiểm thử trong sandbox xác nhận ảnh tải đủ và Bài 1 hiển thị đúng, nhưng vẫn cần người dùng kiểm tra lại trên Comet Windows thực tế.

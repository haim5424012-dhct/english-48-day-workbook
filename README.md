# 48 Ngày Lấy Gốc Tiếng Anh

Website workbook tương tác dành cho học sinh Việt Nam muốn xây lại nền tảng tiếng Anh trong 48 ngày. Luồng tương tác đã được chuẩn hóa cho **toàn bộ 48 ngày**, với Ngày 1 là luồng mẫu giàu tương tác và các ngày còn lại có metadata, sáu khối học, grammar/SRS hoặc trạng thái nguồn tương ứng.

> **Định hướng thiết kế:** Editorial Lab Notebook — mực xanh đậm trên giấy xanh-trắng, Signal Coral cho hành động và trạng thái, sáu bước học tuần tự, đường perforation và dấu XONG.

## Đã hoàn thành trong Ngày 1

Ngày học gồm đủ sáu bước theo thứ tự Input trước Output: Khởi động nghe thụ động; Học đọc và ngữ pháp; Nghe chủ động kèm dictation; Nói theo shadowing; Viết câu mới có phản hồi heuristic tức thì; Kiểm tra trắc nghiệm và flashcard SRS. Bài nghe dùng `SpeechSynthesis`, shadowing dùng `SpeechRecognition` nếu trình duyệt hỗ trợ, còn tiến trình, điểm quiz và khoảng ôn flashcard được lưu bằng `localStorage` trên thiết bị hiện tại.

Nội dung được phân biệt bằng metadata `contentOrigin` và `sourceNote`: phần có nguồn được truy vết trong `source-extracts/`, phần do workbook biên soạn được ghi rõ, còn trường chưa đủ bằng chứng được giữ rỗng hoặc hiển thị `SOURCE STATUS`. Không dùng fixture của QuizLab để lấp dữ liệu bài thi thật.

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

Kiểm tra nội dung, logic completion, TypeScript và build production:

```bash
pnpm test:content
pnpm test:logic
pnpm check
pnpm build
```

Bản xem trước hiện chạy trong Manus WebDev. Khi muốn xuất bản trên GitHub Pages, dùng GitHub Actions hoặc thư mục build theo cấu hình repository; không đưa khóa API hoặc thông tin đăng nhập vào frontend.

## Thêm Ngày 2

Mở `data/days.json`, tìm object ngày cần cập nhật và bổ sung dữ liệu theo schema. Mỗi ngày phải có metadata `learningObjectives`, `prerequisites`, `bridgeFromPreviousDay`, `commonMistakes`, `masteryCriteria`, `estimatedMinutes`, `contentOrigin` cùng sáu khối `warmupScript`, `grammarContent`, `listeningItems`, `shadowingSentences`, `writingPrompts`, `quiz`, và `srsCards`. Nếu nguồn chưa đủ hoặc quiz không tương thích, giữ trường rỗng và ghi `sourceNote`; không tự bịa dữ liệu nguồn.

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

Trang chủ `/` và `/lo-trinh` hiện là bản đồ toàn khóa. Dữ liệu hiển thị nhẹ nằm ở `data/days-index.json`, gồm đúng 48 trạm và 10 giai đoạn theo lộ trình từ TO BE đến nghe chuyên đề và dự án cuối khóa. Ngày 46–48 được đánh dấu theo chuỗi `NOTE-TAKE → PARAPHRASE → PRESENT`; Ngày 48 có rubric tự đánh giá trình bày.

Mỗi trạm có một trong ba trạng thái: `completed` khi ngày đó nằm trong `completedDays`; `ready` khi ngày 1 hoặc ngày trước đó đã hoàn thành; và `locked` cho các trạm chưa đủ điều kiện. Trạm khóa không điều hướng mà hiển thị thông báo cần hoàn thành ngày liền trước. Trạm Ngày 1 mở `/ngay/01.html`; trang `/on-tap` gom flashcard SRS của những ngày đã được ghi nhận hoàn thành.

Trang học gọi `markDayComplete(day)` chỉ sau khi validator xác nhận đủ sáu khối và bằng chứng tối thiểu: dictation đúng, shadowing đủ lượt, writing có câu trả lời và quiz đạt ngưỡng. Schema `{ completedDays, lastCompletedAt, streak }` được lưu vào `localStorage` với khóa `english48-roadmap-progress`; truy cập URL trực tiếp vẫn đi qua roadmap gate.


## Hồ sơ cập nhật — 24/08/2026

Website hiện có **48 trạm học và 10 giai đoạn** trên lộ trình. Nội dung nguồn đã được xử lý theo mười đợt đến **Ngày 1–48**; không có Ngày 49–50 trong cấu trúc workbook. Theo kiểm kê dữ liệu hiện hành, cả 48 ngày có `grammarContent`, `listeningItems`, `writingPrompts`, `quiz` và `srsCards` hợp lệ theo schema workbook; quiz có 240 câu, mỗi ngày dùng đủ năm dạng. Phần authored vẫn được gắn `contentOrigin`/`sourceNote` và không được gọi là nguyên văn nguồn giáo viên.

| Hạng mục | Trạng thái hiện tại | Ghi chú truy vết |
|---|---|---|
| Lộ trình | Đã có 48 ngày, 10 giai đoạn | `data/days-index.json`, `Roadmap.tsx` |
| Nội dung nguồn | Đã xử lý Ngày 1–48 theo các batch đã ghi nhận | `source-extracts/`, `batch-10-report.md` |
| Ngày 1 | Có luồng học sáu bước và nội dung tương tác | `data/days.json`, `Home.tsx` |
| Ngày 2–48 | Có metadata riêng, sáu khối hợp lệ, pronunciationFocus, writing rules và curriculum links | Phần authored được gắn nhãn; sourceNote vẫn giữ giới hạn bằng chứng |
| QuizLab | Có fixture minh họa cho MCQ, fill-blank, transformation, matching, short-answer | Không ghi fixture vào quiz chính thức |
| Quiz chính thức | 240 câu, 48 MCQ + 48 fill-blank + 48 transformation + 48 matching + 48 short-answer | Bộ authored theo mục tiêu workbook; dữ liệu nguồn không tương thích vẫn không bị nhận là nguyên văn |
| Ôn tập SRS | Lưu cục bộ theo ngày, có interval/easeFactor/lastReviewedAt và lọc thẻ đến hạn | Khóa localStorage, chưa đồng bộ đám mây |
| Shadowing | SpeechSynthesis, SpeechRecognition fallback và MediaRecorder ghi âm tạm | Cần quyền microphone để ghi thật |
| Gói Comet | `index.html` trung tâm tự chứa JS/CSS/ảnh bằng data URI; route phụ chuyển về index | Có `README-COMET.md`, `start-comet-preview.bat` |
| Kiểm thử mã nguồn | `test:content`, `test:logic`, `pnpm check` và `pnpm build` đạt | Validator kiểm tra 240 ID, 5 dạng quiz/ngày, map đồng bộ và pattern generic; build còn cảnh báo chunk lớn/texture runtime |

### Quy tắc xác nhận nội dung

Các phần được ghi là nội dung nguồn chỉ được xem là đã trích xuất trong phạm vi tệp và vị trí đã lưu tại `source-extracts`. Những phần chưa truy cập được, không khớp schema hoặc chưa đủ bằng chứng vẫn phải hiển thị `SOURCE STATUS`/`pending-source`. QuizLab chỉ là phòng kiểm tra giao diện; không được dùng các fixture của nó như dữ liệu bài thi thật.

### Hồ sơ Comet và giới hạn môi trường

Để tránh lỗi `ERR_FILE_NOT_FOUND` và ảnh hỏng khi Comet mở từ thư mục tạm, cần giải nén toàn bộ gói vào một thư mục cố định rồi mở `index.html`. Bản self-contained mới nhúng ảnh vào file trung tâm; nếu chính sách Comet chặn JavaScript từ `file://`, dùng `start-comet-preview.bat` để chạy localhost. Việc kiểm thử trong sandbox xác nhận ảnh tải đủ và Bài 1 hiển thị đúng, nhưng vẫn cần người dùng kiểm tra lại trên Comet Windows thực tế.

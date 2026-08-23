# 48 Ngày Lấy Gốc Tiếng Anh

Website workbook tương tác dành cho học sinh Việt Nam muốn xây lại nền tảng tiếng Anh trong 48 ngày. Bản đầu tiên hoàn chỉnh **Ngày 1 — Thể khẳng định và phủ định của động từ to be**; 47 ngày còn lại đã có khung dữ liệu để mở rộng mà không phải sửa giao diện hoặc logic.

> **Định hướng thiết kế:** Editorial Lab Notebook — mực xanh đậm trên giấy xanh-trắng, Signal Coral cho hành động và trạng thái, sáu bước học tuần tự, đường perforation và dấu XONG.

## Đã hoàn thành trong Ngày 1

Ngày học gồm đủ sáu bước theo thứ tự Input trước Output: Khởi động nghe thụ động; Học đọc và ngữ pháp; Nghe chủ động kèm dictation; Nói theo shadowing; Viết câu mới có phản hồi heuristic tức thì; Kiểm tra trắc nghiệm và flashcard SRS. Bài nghe dùng `SpeechSynthesis`, shadowing dùng `SpeechRecognition` nếu trình duyệt hỗ trợ, còn tiến trình, điểm quiz và khoảng ôn flashcard được lưu bằng `localStorage` trên thiết bị hiện tại.

Nội dung Ngày 1 hiện là bản biên soạn tương đương theo đúng chủ đề, vì chưa truy cập được tệp BÀI HỌC gốc trong Google Sheet. Giao diện có ghi rõ giới hạn này và giữ liên kết nguồn để đối chiếu khi tài liệu gốc được cấp quyền.

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

# Báo cáo nghiệm thu — Hoàn thiện workbook theo `pasted_content_2.txt`

## Phạm vi và nguyên tắc

Đợt này đã chuyển yêu cầu trong `pasted_content_2.txt` thành một pass hoàn thiện có thể kiểm chứng trên toàn bộ workbook 48 ngày. Dữ liệu nguồn và dữ liệu do workbook biên soạn được phân biệt qua `contentOrigin` và `sourceNote`; các hoạt động authored không được trình bày như bản sao nguyên văn tài liệu giáo viên.

## Thay đổi đã thực hiện

| Hạng mục | Trạng thái và bằng chứng |
|---|---|
| Phủ đủ 48 ngày | `data/days.json` và `client/src/data/days.json` liên tục từ 1 đến 48, có sáu learning blocks hợp lệ. |
| Metadata riêng từng ngày | Mỗi ngày có ba objectives theo focus, prerequisites, bridge, `pronunciationFocus`, 2–3 `commonMistakes`, `estimatedMinutes` đa dạng, `writingRules` và `writingKeywords`. |
| Curriculum map | Tạo `data/curriculum-map.json` và bản đồng bộ trong `client/src/data/`; mỗi node có `prerequisites`, `introduces`, `reinforces`, `preparesFor`, `retrievalFromDays` và `canDoOutcome`. |
| Quiz | 240 câu có ID duy nhất; mỗi ngày có đủ `multiple-choice`, `fill-blank`, `transformation`, `matching`, `short-answer`. Đáp án MCQ được phân bố đều trên ba vị trí; matching không dùng mapping theo vị trí. |
| Listening | Ba nhiệm vụ/ngày với blank thay đổi vị trí, không còn luôn che từ đầu câu. |
| Writing | UI kiểm tra độ dài, từ khóa mục tiêu, động từ và dấu câu; hiển thị rule card cụ thể của từng ngày. |
| Pronunciation | `pronunciationFocus` riêng cho cả 48 ngày và được hiển thị trong phần nghe mở đầu và Lesson Brief. |
| Shadowing fallback | Khi SpeechRecognition không hỗ trợ hoặc lỗi, người học có thể tự xác nhận đã luyện; hệ thống ghi rõ đây không phải điểm chấm phát âm. Ghi âm MediaRecorder theo từng câu vẫn được tách URL và reset khi đổi câu. |
| Completion gating | `lessonValidation.ts` vẫn yêu cầu đủ sáu bước và evidence tối thiểu; `progress.ts` thêm version 2, migration an toàn và không cho `markDayComplete` bỏ qua ngày liền trước. |
| Dự án cuối khóa | Ngày 46 note-taking, Ngày 47 paraphrase, Ngày 48 presentation; Ngày 48 hiển thị rubric tự chấm bốn tiêu chí. |
| Giao diện | Lesson Brief, pronunciation/rule/rubric cards và Editorial Lab Notebook treatment được giữ nhất quán với roadmap, lesson, locked state và dashboard. |
| Tài liệu | Cập nhật `README.md`, `scientific-audit.md`, `todo.md` và bản đồ curriculum. |

## Kiểm thử và QA

| Lệnh hoặc kiểm tra | Kết quả |
|---|---|
| `pnpm test:content` | Đạt: 48/48 ngày, 240 quiz IDs duy nhất, năm dạng quiz/ngày, curriculum map đồng bộ, không còn các template generic bị cấm. |
| `pnpm test:logic` | Đạt: 3/3 unit tests trong `lessonValidation.test.ts`. |
| `pnpm test` | Đạt: chạy content validator và unit tests liên tiếp. |
| `pnpm check` | Đạt: TypeScript không có lỗi. |
| `pnpm build` | Đạt: Vite production build và server bundle hoàn tất. |
| QA trực quan | Đã kiểm tra `/lo-trinh`, `/ngay/01.html`, `/ngay/48.html` và `/tong-ket` ở desktop 1280×720; Lesson Brief, locked dependency, rubric và dashboard hiển thị đúng. |

## Giới hạn còn lại

Nội dung thực hành được sinh theo mục tiêu của workbook và có nhãn authored/mixed; không nên xem toàn bộ 240 câu là bản chép nguyên văn từ nguồn giáo viên. QuizLab vẫn là khu fixture độc lập và không ghi vào `days.json`. Audio mẫu phụ thuộc SpeechSynthesis của trình duyệt; SpeechRecognition và MediaRecorder cần quyền/tính năng tương thích của thiết bị. Progress, SRS và audio URL hiện lưu cục bộ, chưa đồng bộ Google Sheets hoặc tài khoản đám mây. Build còn cảnh báo chunk JavaScript lớn và texture `/manus-storage` được resolve lúc runtime; đây là cảnh báo tối ưu/phụ thuộc môi trường, không phải lỗi biên dịch.

## Tệp đối chiếu chính

`data/days.json`, `client/src/data/days.json`, `data/curriculum-map.json`, `client/src/data/curriculum-map.json`, `client/src/lib/lessonValidation.ts`, `client/src/lib/progress.ts`, `client/src/pages/Home.tsx`, `client/src/pages/Roadmap.tsx`, `client/src/pages/Dashboard.tsx`, `scripts/test-days.mjs`, `scripts/complete-48-day-content.py`, `scripts/build-curriculum-map.mjs`, `README.md` và `scientific-audit.md`.

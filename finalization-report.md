# Báo cáo hoàn thiện — 48 Ngày Lấy Gốc Tiếng Anh

## Kết quả chính

Dự án đã được chuyển từ prototype sang workbook tương tác 48 ngày có kiểm soát nội dung và tiến trình. Cả `data/days.json` và `client/src/data/days.json` đều có đủ 48 ngày, metadata pedagogical và sáu learning blocks hợp lệ theo validator. Nội dung được phân biệt bằng `contentOrigin`/`sourceNote`; phần authored không được trình bày là nguyên văn tài liệu giáo viên.

## Thay đổi đã thực hiện

| Hạng mục | Kết quả |
|---|---|
| Dữ liệu | 48/48 ngày liên tục; đủ metadata; sáu block không rỗng theo điều kiện validator |
| Gating | `lessonValidation.ts` kiểm tra đủ block và bằng chứng tối thiểu trước khi hoàn thành bước/ngày |
| Roadmap | Khóa tuần tự, hỗ trợ `in-progress`, route trực tiếp không bypass dependency |
| Nội dung nối mạch | Cầu nối đặc thù cho Ngày 13, 15, 28, 36 và chuỗi dự án 45–48 |
| Dự án cuối khóa | Ngày 46 note-taking, Ngày 47 paraphrase, Ngày 48 presentation; rubric 4 tiêu chí |
| UI lesson | Lesson Brief, six-step rail, source status và workbook editorial treatment |
| UI locked | Route marker, dependency card, sáu bước thu nhỏ, perforation và label-maker metadata |
| Roadmap tiles | Ruled-paper texture, status marks, field-page cue và tactile hover states |
| Dashboard | Giữ audit/ledger language, ruled dividers và route marker xuyên vùng dữ liệu dài |
| Kiểm thử | Thêm script `test:logic` cho unit tests completion |
| Tài liệu | Cập nhật `README.md`, `scientific-audit.md`, `audit-completion-plan.md` |

## Kiểm thử cuối

- `pnpm test:content`: đạt, 48/48 ngày có metadata và sáu learning blocks.
- `pnpm test:logic`: đạt, 3/3 unit tests trong `lessonValidation.test.ts`.
- `pnpm check`: đạt.
- `pnpm build`: đạt. Còn cảnh báo chunk JavaScript lớn và texture `/manus-storage` resolve runtime; không phải lỗi biên dịch.
- QA trực quan: `/lo-trinh`, `/ngay/01.html`, `/ngay/48.html`, `/tong-ket` ở desktop 1280×720; đã kiểm tra lesson brief, open lesson, locked dependency và dashboard ledger.

## Giới hạn cần biết

QuizLab vẫn là fixture minh họa, không ghi vào quiz chính thức. Nội dung authored được tạo để bảo đảm mỗi ngày có luồng học hoàn chỉnh, nhưng không thay thế nguồn giáo viên và luôn phải đọc cùng `contentOrigin`/`sourceNote`. Audio mẫu dựa vào khả năng trình duyệt/TTS; ghi âm thật cần quyền microphone trên thiết bị người dùng. Tiến trình, SRS và bản ghi âm chỉ lưu cục bộ bằng localStorage/React state, chưa đồng bộ Google Sheets hay tài khoản đám mây.

## Tệp đối chiếu chính

`data/days.json`, `client/src/data/days.json`, `client/src/lib/lessonValidation.ts`, `client/src/pages/Home.tsx`, `client/src/pages/Roadmap.tsx`, `client/src/pages/Dashboard.tsx`, `scripts/test-days.mjs`, `scripts/complete-48-day-content.py`, `README.md`, `scientific-audit.md`.

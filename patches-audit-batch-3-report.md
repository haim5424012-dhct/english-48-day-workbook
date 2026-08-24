# Báo cáo bàn giao — Ba bản vá sau audit batch 3

## Phạm vi đã thực hiện

Theo đặc tả `pasted_content_5.txt`, đợt này chỉ thực hiện ba bản vá dưới đây. Việc ánh xạ câu hỏi vào schema mở rộng, việc mở rộng thêm QuizRenderer/QuizLab và việc nạp các ngày mới đều được tạm dừng.

| Việc | Trạng thái | File/kết quả chính |
|---|---|---|
| 1. Fallback `SOURCE STATUS` cho Bước 2 khi `grammarContent` rỗng | Hoàn tất | `client/src/pages/Home.tsx` |
| 2. Validator sourceNote theo điều kiện bất biến | Hoàn tất | `scripts/test-days.mjs` |
| 3. Backfill tiêu đề Ngày 34–48 từ CSV | Hoàn tất | `scripts/build-days-index.mjs`, `data/days-index.json`, `client/src/data/days-index.json` |

## Việc 1 — Fallback Bước 2 và Ngày 13

Nhánh `activeStep === 1` trong `Home.tsx` nay kiểm tra `day.grammarContent` trước khi render HTML. Khi trường rỗng, giao diện hiển thị `SOURCE STATUS` với thông báo rõ: chưa trích xuất được phần lý thuyết đầy đủ từ nguồn của ngày đó và hướng dẫn xem ghi chú nguồn; không còn khung nội dung trắng.

Với Ngày 13, do có `srsCards` nhưng không có `grammarContent`, Bước 6 hiển thị thêm ghi chú rằng các thẻ được suy luận có căn cứ từ bài thi gốc, chưa phải nguồn Input từ bài giảng lý thuyết đầy đủ. Dữ liệu thẻ không bị thay đổi và không bị ẩn.

QA preview `/ngay/13.html` xác nhận tiêu đề đúng, nhánh rỗng của Bước 2 hiển thị khối thông báo SOURCE STATUS trong vùng đang có kicker cố định `02 / BUILD THE RULE`, và `sourceNote` vẫn hiện bên dưới. Không sửa nhãn kicker trong đợt này.

## Việc 2 — Điều kiện bất biến của validator

`test-days.mjs` không còn dùng điều kiện `day.day <= 5`. Validator nay tính `hasContent` từ `grammarContent`, các mảng listening/shadowing/writing/quiz và `srsCards`. Một ngày phải có `sourceNote` nếu có bất kỳ nội dung nào hoặc có `status: "pending-source"`. Quy tắc này không phụ thuộc batch hay số ngày cụ thể.

Kết quả chạy:

```text
Content check passed: 48 day objects; Day 1 has all required learning blocks.
```

## Việc 3 — Tiêu đề Ngày 34–48

`build-days-index.mjs` nay đọc tiêu đề từ `source-manifests/batch-3-course-manifest.csv`, chuẩn hóa chữ hoa/thường theo kiểu đã dùng ở các ngày trước và chỉ thay trường `title`. Các ngày 34–48 vẫn giữ `stage: 10`, `stageTitle: "Sắp cập nhật"` và `status: "pending-source"`; không tạo grammarContent, srsCards hay nội dung học mới.

| Ngày | Tiêu đề sau backfill |
|---:|---|
| 34 | Luyện nghe về tiền bạc |
| 35 | Đại từ phản thân |
| 36 | Sự hòa hợp về thì |
| 37 | Tiếng Anh giao tiếp (1) |
| 38 | Liên từ tương hỗ |
| 39 | Luyện nghe về các quốc gia và châu lục |
| 40 | Luyện nghe về sở thích |
| 41 | Luyện nghe về các phương tiện giao thông |
| 42 | Luyện nghe về thể thao |
| 43 | Luyện nghe về nghề nghiệp |
| 44 | Luyện nghe về công nghệ |
| 45 | Tiếng Anh giao tiếp (2) |
| 46 | Kỹ năng note-taking |
| 47 | Kỹ năng paraphrasing |
| 48 | Tự tin giới thiệu bản thân và thuyết trình bằng Tiếng Anh |

## QuizRenderer và QuizLab hiện có

Các phần này được giữ nguyên trong ZIP, không mở rộng thêm trong đợt vá. `QuizRenderer` hiện hỗ trợ chính xác năm dạng dữ liệu/tương tác:

1. MCQ / multiple-choice, bao gồm cả kiểu MCQ legacy không có trường `type`.
2. Fill-blank / điền hoặc chia động từ.
3. Transformation / viết lại, biến đổi câu.
4. Matching / nối cặp bằng các select.
5. Short-answer / trả lời ngắn.

`/quiz-lab` dùng một fixture minh họa được gắn rõ là bàn luyện format. Fixture này có câu mẫu để kiểm tra renderer và **không phải dữ liệu quiz chính thức của 15 ngày**. Không có câu mẫu nào được ghi vào `data/days.json` hoặc `client/src/data/days.json`; vì vậy QuizRenderer/QuizLab không làm thay đổi dữ liệu thật hiện có của Ngày 1–15.

Việc ánh xạ các câu trong `quiz-schema-gaps.md` vào schema mới vẫn được hoãn theo yêu cầu.

## Kiểm thử và giới hạn

Đã chạy thành công:

- `node scripts/test-days.mjs`
- `pnpm check`
- `pnpm build`
- Preview `/ngay/13.html` và kiểm tra Bước 2.

Build có các cảnh báo không chặn: asset paper texture dùng URL lưu trữ runtime chưa resolve ở build-time và bundle chính lớn hơn ngưỡng khuyến nghị. Không phát sinh lỗi TypeScript hoặc lỗi build.

## Tệp nằm trong ZIP

ZIP gồm toàn bộ mã nguồn dự án hiện tại, ba bản vá, hai bản `days-index.json`, toàn bộ `QuizRenderer`, `quizSchema`, `QuizLab`, `browser-qa-notes.md`, báo cáo này và hồ sơ dự án cần thiết; loại trừ `node_modules`, `dist`, `.git` và log runtime.

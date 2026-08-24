# Báo cáo đối chiếu fixture QuizLab

## Phạm vi

Đợt này chỉ sửa dữ liệu minh họa trong `client/src/pages/QuizLab.tsx`. Không thay đổi `data/days.json`, `client/src/data/days.json`, `days-index.json`, schema quiz chính thức hoặc việc ánh xạ câu trong `quiz-schema-gaps.md`.

## Kết quả đối chiếu năm mục

| Mục fixture | Dạng | Nguồn đối chiếu | Kết quả sau sửa |
|---|---|---|---|
| `mcq-day-11` | MCQ legacy | `source-extracts/batch-3/ngay-11.md`, block bài thi online, dòng 89–90 | Khớp nguyên văn câu “They _______ the answer.”, ba lựa chọn và đáp án `don't know` ở chỉ số 2. |
| `fill-day-12` | Điền/chia động từ | `source-extracts/batch-3/ngay-12.md`, dòng 82–87 và danh sách động từ dòng 192–203 | Khớp câu `They ___ (bring) a book last week.` và đáp án `brought`. |
| `transform-day-13` | Biến đổi câu | `source-extracts/batch-3/ngay-13.md`, quy tắc `S + did not + V` dòng 166–196 | Câu minh họa phù hợp quy tắc và được ghi đúng là ví dụ suy ra từ grammar, không tuyên bố là câu quiz chép nguyên văn. |
| `matching-day-3` | Nối cặp | `source-extracts/batch-1/ngay-03.md`, cột ghép dòng 54–79 và đáp án HTML dòng 186–220 | Đã sửa đủ 5 cặp: `Who is she? → She is my cousin.`; `Who is this? → It’s my grandfather.`; `What is that? → It’s a banana.`; `Who are these? → They are my children.`; `What are they? → They are my socks.` |
| `short-day-7` | Trả lời ngắn | `source-extracts/batch-2/ngay-07.md`, dòng 54–72 và đáp án dòng 205–213 | `acceptedAnswers` nay chỉ còn `Yes, he does.`; placeholder cũng đã đổi thành `Yes, …` để không gợi ý đáp án phủ định. |

## Hai lỗi đã sửa

`matching-day-3` không còn dùng danh sách rút gọn sai ba cặp. Fixture nay dùng đủ năm câu hỏi và năm đáp án được ghi trong source-extract; `correctMatches` tương ứng là `[3, 0, 4, 1, 2]` theo thứ tự `rightItems` mới.

`short-day-7` không còn nhận `No, he doesn't.`. Việc này phù hợp với phần đáp án nguồn cho câu hỏi theo tranh: “Does the child like ice cream? – Yes, he does / he does.”

## Ghi chú về nhãn Bước 2

Báo cáo batch 3 đã được hiệu chỉnh riêng: code giữ kicker cố định `02 / BUILD THE RULE`; chỉ nhánh nội dung rỗng hiển thị khối thông báo SOURCE STATUS bên dưới. Không mô tả giao diện là `01 / SOURCE STATUS` nữa.

## QuizRenderer/QuizLab và dữ liệu thật

`QuizRenderer` hiện vẫn hỗ trợ đúng năm dạng: MCQ legacy/multiple-choice, fill-blank, transformation, matching và short-answer. Năm mục trong `specimens` là fixture minh họa có ghi chú nguồn, dùng để kiểm tra giao diện; chúng không phải một bộ quiz chính thức được ghi vào dữ liệu Ngày 1–15. Đợt này không ánh xạ câu từ `quiz-schema-gaps.md` vào schema, không thay đổi nội dung thật, và không tiếp tục mở rộng renderer.

## Kiểm thử

Đã chạy `pnpm check` và `pnpm build` sau khi sửa. Cần tiếp tục kiểm tra tương tác QuizLab sau cập nhật fixture nếu muốn xác nhận trực quan cả năm mục; việc chấm điểm của renderer vẫn giữ nguyên logic đã kiểm tra trước đó.

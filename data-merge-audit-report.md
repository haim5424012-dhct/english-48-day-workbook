# Audit dữ liệu bị rỗng và logic đồng bộ

**Phạm vi:** kiểm tra lịch sử Git, hai bản `days.json`, script import batch 1–2 và kiểm thử merge cô lập. Không khôi phục hoặc xóa thêm dữ liệu học tập trong audit này.

## Kết luận ngắn

Các trường `listeningItems`, `writingPrompts` và `quiz` cũ của Ngày 1 **không có bằng chứng lịch sử cho thấy là dữ liệu thật đã được xác minh từ Google Sheet**. Chúng xuất hiện trong checkpoint khởi tạo như nội dung tương đương/scaffold; chính `sourceNote` của checkpoint ghi rõ chưa truy cập được tệp BÀI HỌC gốc. Commit `08eb178` đã thay chúng bằng mảng rỗng trong patch import nguồn.

Ngày 2–5 hiện có cùng một mẫu: `grammarContent` và `srsCards` có dữ liệu, còn `listeningItems`, `writingPrompts`, `quiz` và `shadowingSentences` đều rỗng trong cả hai bản JSON. Đây là hành vi nhất quán của importer batch 1, không phải mất dữ liệu riêng lẻ ở Ngày 1.

Importer **không ghi đè toàn bộ object ngày**. Nó dùng `by_day[day].update(patch)` trong batch 1 và `day.update(patches[day['day']])` trong batch 2, tức là cập nhật từng khóa ở mức nông. Tuy nhiên, patch lại chứa các mảng rỗng cho các trường tùy chọn; vì vậy các mảng cũ bị ghi đè. Đây là lỗi merge theo ngữ nghĩa dữ liệu, có khả năng tái diễn nếu các batch sau đưa mảng rỗng vào patch.

Đã sửa cả `scripts/import-batch-1.py` và `scripts/import-batch-2.py`: mảng rỗng trong nhóm trường tùy chọn nay được hiểu là “chưa có nguồn”, không phải lệnh xóa dữ liệu; các trường có dữ liệu mới vẫn được cập nhật. Đã chạy lại importer trên fixture cô lập từ checkpoint trước `08eb178`, kết quả Ngày 1 vẫn giữ đủ 3 `listeningItems`, 3 `shadowingSentences`, 2 `writingPrompts` và 4 `quiz` ở cả root/client.

## Câu hỏi 1 — Bản chất ba trường cũ của Ngày 1

| Bằng chứng | Nội dung | Ý nghĩa |
|---|---|---|
| Checkpoint `7520b2b` và `42cf436d` | Ngày 1 có 3 listening item, 3 shadowing sentence, 2 writing prompt và 4 quiz options | Đây là nội dung scaffold ban đầu đã làm cho giao diện tương tác chạy được |
| `sourceNote` của checkpoint trước import | “Bản Ngày 1 này dùng nội dung tương đương theo đúng chủ đề vì chưa truy cập được tệp BÀI HỌC gốc trong Sheet.” | Không đủ căn cứ gọi các trường này là dữ liệu đã xác minh từ Sheet |
| `scripts/import-batch-1.py`, dòng 20–23 | Patch Ngày 1 chủ động đặt `listeningItems: []`, `shadowingSentences: []`, `writingPrompts: []`, `quiz: []` | Đợt import nguồn đã xóa các trường scaffold đó khỏi bản dữ liệu hiện hành |
| Diff `42cf436d → 08eb178` | `grammarContent`, `warmupScript` và `srsCards` đổi sang nội dung trích từ PDF; bốn mảng tương tác thành rỗng | Đây là một lần chuyển từ nội dung tương đương/scaffold sang dữ liệu nguồn có kiểm chứng trong phạm vi PDF, không phải chứng cứ rằng ba mảng cũ là dữ liệu Sheet thật |

**Kết luận C1:** Với mức bằng chứng lịch sử hiện có, ba trường cũ nên được phân loại là **nội dung tương đương/scaffold chưa xác minh nguồn**, không phải dữ liệu thật đã được duyệt từ Google Sheet. Không tự khôi phục chúng trong audit này.

## Câu hỏi 2 — Kiểm tra Ngày 2–5

Kết quả đọc và so sánh cả `data/days.json` và `client/src/data/days.json`:

| Ngày | listeningItems | writingPrompts | quiz | shadowingSentences | grammarContent | srsCards |
|---|---:|---:|---:|---:|---|---:|
| 2 | 0 | 0 | 0 | 0 | Có | 3 |
| 3 | 0 | 0 | 0 | 0 | Có | 3 |
| 4 | 0 | 0 | 0 | 0 | Có | 3 |
| 5 | 0 | 0 | 0 | 0 | Có | 5 |

Hai bản JSON có summary giống hệt nhau. Vì vậy Ngày 2–5 có cùng mẫu với Ngày 1 sau import: lý thuyết và SRS được nạp, còn bốn mảng tương tác được đặt rỗng. Không có bằng chứng cho thấy Ngày 2–5 bị mất dữ liệu nguồn tương tác đã được xác minh; các object trước batch 1 vốn chỉ là metadata tối giản.

## Câu hỏi 3 — Audit và sửa logic merge

### Logic cũ

Trong `scripts/import-batch-1.py`:

```python
by_day = {item['day']: item for item in data['days']}
for day, patch in updates.items():
    by_day[day].update(patch)
```

Trong `scripts/import-batch-2.py`:

```python
for day in data['days']:
    if day['day'] not in patches:
        continue
    day.update(patches[day['day']])
```

Đây **không phải ghi đè toàn bộ object**. Các khóa không xuất hiện trong patch vẫn được giữ lại. Nhưng `dict.update()`/`day.update()` là merge nông theo khóa: nếu patch có `"shadowingSentences": []`, giá trị mảng cũ bị thay thế hoàn toàn bằng `[]`. Batch 1 chứa chính xác bốn mảng rỗng này cho từng ngày 1–5. Do đó nguyên nhân gốc là **patch dùng giá trị rỗng để biểu diễn thiếu nguồn nhưng importer diễn giải nó thành lệnh xóa**.

### Logic mới

Cả hai script hiện dùng `merge_source_fields()`. Với các trường tùy chọn `listeningItems`, `shadowingSentences`, `writingPrompts`, `quiz`, mảng rỗng được bỏ qua; nếu trường chưa tồn tại thì mới thêm giá trị mặc định rỗng. Các trường có nội dung mới, cùng với `grammarContent`, `sourceNote` và `srsCards`, vẫn được cập nhật bình thường.

Đây là **semantic field merge** phù hợp với schema hiện tại: không xóa mảng cũ khi nguồn mới chưa cung cấp dữ liệu. Các object lồng nhau trong mảng SRS vẫn được thay toàn bộ khi có SRS mới, vì đó là một nguồn dữ liệu mới có chủ đích chứ không phải mảng rỗng biểu thị thiếu nguồn.

### Kiểm thử rerun cô lập

Fixture được tạo từ `42cf436d:data/days.json`, sau đó chạy lại `scripts/import-batch-1.py` với `WORKBOOK_ROOT` trỏ tới thư mục tạm. Assertion đạt ở cả hai file đầu ra:

```text
listeningItems: 3
shadowingSentences: 3
writingPrompts: 2
quiz: 4
status: PASS — all pre-existing Day 1 arrays preserved
```

Dữ liệu làm việc thật không bị chạy lại importer và không bị thay đổi ngoài việc giữ nguyên ba câu Shadowing đã được khôi phục trước đó.

## Trạng thái thay đổi và giới hạn

Đã sửa logic importer và tạo báo cáo audit; **chưa khôi phục** `listeningItems`, `writingPrompts` hoặc `quiz` Ngày 1. `pnpm check` và `pnpm build` cần được chạy sau thay đổi script trước khi bàn giao. ZIP mã nguồn được tạo riêng để đối chiếu trực tiếp.

## Tài liệu truy vết

- `7520b2b`: checkpoint khởi tạo Ngày 1 hoàn chỉnh.
- `42cf436d`: checkpoint trước import batch 1, vẫn chứa nội dung scaffold Ngày 1.
- `08eb178`: checkpoint đồng bộ nguồn Ngày 1–5, trong đó các mảng tương tác của Ngày 1–5 bị đặt rỗng.
- `scripts/import-batch-1.py`: importer đã sửa.
- `scripts/import-batch-2.py`: importer đã sửa tương ứng.

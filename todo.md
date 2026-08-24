# TODO — Trang lộ trình 48 ngày

## Nạp nội dung thật Ngày 6–10

- [x] Kiểm kê bốn nguồn FILE ĐỀ/BÀI HỌC/FILE ĐỀ online/ĐÁP ÁN cho Ngày 6–10.
- [x] Mở và trích xuất PDF lý thuyết thật theo từng ngày.
- [x] Kiểm tra dạng bài thi; ghi câu hỏi/đáp án không phải trắc nghiệm vào sourceNote.
- [x] Đánh dấu `pending-source` và lý do nếu nguồn bị chặn hoặc thiếu.
- [x] Không tải, nhúng hoặc liên kết audio/video/YouTube gốc trong website.
- [x] Đồng bộ root/client days.json và rebuild days-index.
- [x] Chạy `pnpm check` và `pnpm build`.
- [x] Lập báo cáo đợt Ngày 6–10 và dừng chờ xác nhận trước Ngày 11–15.



## Vá ghi âm Shadowing — bản mới

- [ ] Kiểm kê state `audioUrl`, `bestAudioUrl` và các handler đổi câu.
- [x] Xoá/revoke bản ghi hiện tại khi chuyển câu.
- [x] Lưu bản tốt nhất theo từng câu, không ghi đè giữa các câu.
- [x] Chạy `pnpm check` và `pnpm build`.
- [ ] Kiểm thử luồng ghi âm thành công nếu môi trường cấp được micro.
- [x] Cập nhật `browser-qa-notes.md` và lưu checkpoint.



## Nạp nội dung thật từ Google Sheet

- [ ] Mở Sheet bằng trình duyệt thật và kiểm tra toàn bộ tên tab.
- [ ] Xác nhận có hoặc không có nguồn Ngày 34–48; không tự bịa nếu không có.
- [x] Kiểm kê bốn link nguồn cho Ngày 1–5: FILE ĐỀ, BÀI HỌC, FILE ĐỀ online, ĐÁP ÁN.
- [x] Trích xuất nội dung thật theo schema hiện có, ưu tiên nguyên văn câu hỏi và đáp án.
- [x] Đánh dấu `pending-source` và ghi rõ lỗi cho từng nguồn bị chặn.
- [x] Chạy `pnpm check` và `pnpm build` sau đợt 1–5.
- [x] Sửa tối thiểu Home để đọc số ngày từ URL `/ngay/NN.html`, giữ nguyên giao diện hiện có.
- [x] Ẩn hoặc thay thế các khối Warm-up/Shadowing/Quiz hardcoded khi mảng nguồn của ngày đang rỗng.
- [x] Đồng bộ `days.json` vào `client/src/data/days.json` và cập nhật chỉ mục roadmap theo trạng thái nguồn.
- [x] Lập báo cáo truy vết và dừng chờ xác nhận trước đợt Ngày 6–10.



## Vá lỗi khoa học/logic và ghi âm Mức 1

- [x] Kiểm kê state `cardStates`, công thức `rateCard()` và luồng Shadowing.
- [x] Bổ sung `lastReviewedAt` và dùng chung công thức SRS cho Home/Review.
- [x] Chỉ hiển thị thẻ đến hạn, sắp xếp theo mức độ trễ và cập nhật rating thật.
- [x] Đổi copy Shadowing sang “khớp câu nói/gần khớp”.
- [x] Bổ sung MediaRecorder, nghe lại giọng học sinh, ghi nhiều lần và fallback quyền micro.
- [x] Cập nhật audit và kiểm thử đủ sáu bước Ngày 1.
- [ ] Tương lai: phản hồi trực quan waveform bằng Web Audio API để so sánh giọng mẫu và giọng học sinh.
- [ ] Tương lai: chấm điểm phát âm thật qua API bên thứ ba; cần route mới trong `server/index.ts` để bảo vệ khóa API.


- [x] Kiểm kê mã nguồn hiện tại và giữ nguyên token Editorial Lab Notebook của Ngày 1.
- [x] Tạo `data/days-index.json` đủ 48 dòng, chia đúng 10 giai đoạn.
- [x] Tạo trang roadmap hiển thị 10 stage và 48 day node responsive.
- [x] Implement ba trạng thái trạm: hoàn thành, đang mở, chưa mở khóa.
- [x] Implement mở khóa tuần tự dựa trên `localStorage`.
- [x] Đồng bộ `completedDays`, `lastCompletedAt`, `streak` giữa roadmap và trang Ngày 1.
- [x] Thêm nút Ôn tập và trạng thái phản hồi khi trạm bị khóa.
- [x] Kiểm thử điều hướng, refresh không mất tiến trình, desktop/mobile và hồi quy Ngày 1.
- [x] Cập nhật README/audit, lưu checkpoint và bàn giao.


## Xác minh tính nguyên vẹn dữ liệu Ngày 1

- [x] Đối chiếu object `day: 1` trong `data/days.json` và `client/src/data/days.json`, đặc biệt `shadowingSentences`.
- [x] Kiểm tra đồng thời `grammarContent`, `listeningItems`, `writingPrompts`, `quiz` và `srsCards` của Ngày 1.
- [x] Nếu thiếu dữ liệu, truy nguyên qua lịch sử Git và khôi phục đúng bản gốc; nếu nguyên vẹn, ghi nhận rõ nhầm lẫn báo cáo.
- [x] Chạy `pnpm check` và `pnpm build`, sau đó báo cáo và dừng phạm vi công việc.


## Audit bản chất dữ liệu bị mất và logic đồng bộ

- [x] Đối chiếu lịch sử Git trước/sau `08eb178` để xác định nguồn gốc ba trường Ngày 1 bị rỗng.
- [x] Kiểm kê sáu trường của Ngày 2–5 trong cả root/client days.json.
- [x] Đọc script/hàm đồng bộ của `08eb178`, xác định overwrite hay merge từng trường và rủi ro tái diễn.
- [x] Không sửa dữ liệu; đóng gói mã nguồn hiện tại thành ZIP và lập báo cáo bằng chứng.


## Nạp nội dung thật Ngày 11–15

- [x] Đọc và kiểm kê file CSV người dùng gửi, xác định các cột/dòng cho Ngày 11–15.
- [x] Kiểm kê 4 nguồn FILE ĐỀ/BÀI HỌC/FILE ĐỀ online/ĐÁP ÁN từ Google Sheet hoặc CSV thay thế.
- [x] Kiểm tra phạm vi dữ liệu Sheet đến Ngày 48, chỉ ghi nhận Ngày 36–48.
- [x] Trích xuất PDF và lưu `source-extracts/batch-3/ngay-11.md` đến `ngay-15.md`.
- [x] Cập nhật `quiz-schema-gaps.md` cho Ngày 1, 3–10 và 11–15 nếu có dạng mới.
- [x] Nạp grammar/SRS và trường có nguồn thật bằng merge an toàn; đồng bộ root/client JSON.
- [x] Chạy test nội dung, `pnpm check`, `pnpm build`, kiểm tra preview đại diện và lập báo cáo batch 3.
- [x] Đóng gói ZIP đầy đủ và dừng trước Ngày 16.


## Mở rộng frontend cho các dạng quiz mới

> Tạm dừng ánh xạ câu vào schema mới và không mở rộng thêm QuizRenderer/QuizLab theo yêu cầu hiện tại.

- [x] Rà soát schema dữ liệu quiz hiện tại và renderer trong Home.tsx.
- [x] Chốt kiểu dữ liệu tương thích ngược cho MCQ, điền/chia, biến đổi câu, nối cặp và trả lời ngắn.
- [x] Tách component renderer quiz dùng chung, có trạng thái chấm, phản hồi và reset rõ ràng.
- [x] Tích hợp dữ liệu kiểm thử minh họa có nguồn, không thay đổi nội dung học thật ngoài phạm vi.
- [x] Chạy `pnpm check`, `pnpm build`, kiểm tra preview desktop/mobile và lưu checkpoint.


## Ba bản vá theo audit batch 3

- [x] Đọc đặc tả `pasted_content_5.txt` và khóa phạm vi, không ánh xạ schema mới.
- [x] Thêm fallback SOURCE STATUS cho Bước 2 khi `grammarContent` rỗng.
- [x] Sửa `scripts/test-days.mjs` theo điều kiện bất biến.
- [x] Backfill tiêu đề Ngày 34–48 từ CSV, đồng bộ hai nguồn dữ liệu nếu cần.
- [x] Chạy test/check/build, lập báo cáo và đóng gói một ZIP đầy đủ gồm ba bản vá cùng QuizRenderer/QuizLab.


## Sửa fixture QuizLab theo source-extracts

- [x] Đọc toàn bộ `specimens` và đối chiếu đủ 5 mục với source-extract tương ứng.
- [x] Sửa matching Ngày 3 theo đúng cặp “What is that? – It's a banana.” và sửa short-answer Ngày 7.
- [x] Cập nhật báo cáo để mô tả đúng nhãn Bước 2 thực tế trong code.
- [x] Chạy `pnpm check`, `pnpm build`, đóng gói ZIP và báo cáo; không ánh xạ dữ liệu thật.


## Gói chạy thử trên trình duyệt Comet

- [x] Xác định các route cần tạo fallback static.
- [x] Tạo bản build static có các route `/`, `/lo-trinh`, `/quiz-lab` và `/ngay/01.html`–`/ngay/48.html`.
- [x] Viết README hướng dẫn chạy local trên Comet.
- [x] Kiểm tra gói và đóng ZIP duy nhất để tải về.


## Sửa trang trắng khi mở trực tiếp file HTML

- [x] Xác định nguyên nhân asset/module tuyệt đối không tải được qua `file://`.
- [x] Tạo gói preview mới có asset relative và trang hướng dẫn chạy đúng trên Comet.
- [x] Kiểm tra file trực tiếp, localhost routes và runtime không lỗi.
- [x] Đóng gói ZIP sửa lỗi và bàn giao.


## Gói HTML self-contained cho Comet/Windows

- [x] Inline JavaScript, CSS và ảnh vào HTML để loại bỏ phụ thuộc asset qua `file://`.
- [x] Tạo lại root và toàn bộ route nested từ bản self-contained.
- [x] Kiểm tra trực tiếp trên trình duyệt sandbox, file size và runtime.
- [x] Đóng gói ZIP thay thế với hướng dẫn rõ ràng.


## Điều tra lỗi Comet vẫn không mở được

- [x] Đọc lại toàn bộ báo cáo/QA/generator và kiểm tra giả định khác biệt giữa sandbox và Comet Windows.
- [x] Kiểm tra CSP, module script, dynamic import, URL API và chính sách thực thi JavaScript trên `file://`.
- [x] Tạo một smoke test tối giản và kiểm tra bằng Chromium/file URL với console/network.
- [x] Chọn phương án tương thích thực tế, sửa generator và cập nhật hướng dẫn mở file.
- [x] Kiểm thử lại gói mới bằng nhiều entry point, đóng ZIP và ghi rõ giới hạn nếu Comet vẫn chặn file local.


## Sửa liên kết Bài 1 trong Comet preview

- [x] Truy vết href/route từ roadmap đến Ngày 1 và kiểm tra cấu trúc file thực tế.
- [x] Sửa đường dẫn route local để không tạo ERR_FILE_NOT_FOUND.
- [x] Kiểm thử click Bài 1 trên file:// và localhost.
- [x] Đóng gói ZIP mới, cập nhật QA và bàn giao.


## Điều tra ERR_FILE_NOT_FOUND trên Comet Windows

- [x] Kiểm tra cấu trúc ZIP và các đường dẫn route khi giải nén vào thư mục Temp của Windows.
- [x] Loại bỏ điều hướng tuyệt đối và cơ chế phụ thuộc file route con nếu cần.
- [x] Tạo launcher Windows độc lập, tự xác định thư mục và chạy localhost.
- [x] Kiểm thử mở bài học từ launcher và từ file HTML, cập nhật hướng dẫn tránh mở file tạm trực tiếp.


## Sửa ảnh thiếu trong Comet preview

- [x] Kiểm kê nguồn ảnh, tên file, MIME và mọi tham chiếu `/manus-storage` còn sót.
- [x] Sửa generator để ảnh trong gói dùng đường dẫn tương thích Windows hoặc data URI hợp lệ.
- [x] Kiểm thử logo và ảnh Bài 1 trên file:// và localhost.
- [x] Cập nhật QA, tạo ZIP mới và bàn giao.


## Cập nhật hồ sơ website theo thay đổi đã kiểm chứng

- [x] Kiểm kê README, audit, QA, dữ liệu và mã nguồn hiện hành.
- [x] Đối chiếu trạng thái 48 ngày, tính năng quiz/SRS/ghi âm và gói Comet với bằng chứng.
- [x] Cập nhật hồ sơ website và hướng dẫn chạy theo trạng thái thực tế.
- [x] Kiểm tra liên kết chéo, chạy check/build và lưu phiên bản cập nhật.



## Nạp nội dung thật Ngày 16–20 — Batch 4

- [x] Kiểm kê nguồn Sheet và 4 loại nguồn cho Ngày 16–20.
- [x] Tải/trích xuất các PDF truy cập được và lưu source-extracts Batch 4.
- [x] Ghi rõ FILE ĐỀ online Ngày 16 không truy cập được qua Drive API.
- [x] Cập nhật `quiz-schema-gaps.md` cho các dạng điền, viết câu, âm vị, trọng âm và MCQ 2/3 lựa chọn.
- [x] Nạp `grammarContent` và 5 SRS cards/ngày bằng `merge_source_fields`; không nạp quiz chưa khớp schema.
- [x] Đồng bộ root/client days.json, cập nhật version `0.4-source-batch-4` và rebuild days-index.
- [x] Cập nhật `batch-4-report.md`, `website-profile.md` và README.
- [x] Chạy `test-days`, `pnpm check`, `pnpm build`, QA preview và tạo lại gói Comet.
- [ ] Chờ người dùng xác nhận nguồn FILE ĐỀ online Ngày 16 hoặc quyết định mở rộng schema quiz.


## Nạp nội dung thật Ngày 21–25 — Batch 5

- [x] Kiểm kê nguồn Sheet và bốn loại nguồn cho Ngày 21–25.
- [x] Tải/trích xuất các artifact truy cập được, lưu source-extracts Batch 5.
- [x] Ghi rõ nguồn bị chặn, thiếu transcript hoặc không thể xác minh.
- [x] Cập nhật `quiz-schema-gaps.md` cho các dạng bài mới nếu có.
- [x] Nạp dữ liệu nguồn bằng `merge_source_fields`; không bịa và không ép quiz sai schema.
- [x] Đồng bộ root/client days.json, rebuild days-index và cập nhật báo cáo/hồ sơ.
- [x] Chạy test-days, `pnpm check`, `pnpm build`, QA preview và tạo checkpoint.
- [ ] Chờ xác nhận người dùng nếu có nguồn thiếu hoặc cần mở rộng schema quiz.


## Nạp nội dung thật Ngày 26–30 — Batch 6

- [x] Kiểm kê nguồn Sheet và bốn loại nguồn cho Ngày 26–30.
- [x] Tải/trích xuất các artifact truy cập được, lưu source-extracts Batch 6.
- [x] Ghi rõ nguồn bị chặn, thiếu transcript/audio hoặc không thể xác minh.
- [x] Cập nhật `quiz-schema-gaps.md` cho các dạng bài mới nếu có.
- [x] Nạp dữ liệu nguồn bằng `merge_source_fields`; không bịa và không ép quiz sai schema.
- [x] Đồng bộ root/client days.json, rebuild days-index và cập nhật báo cáo/hồ sơ.
- [x] Chạy test-days, `pnpm check`, `pnpm build`, QA preview và tạo checkpoint.
- [ ] Chờ xác nhận người dùng nếu có nguồn thiếu hoặc cần mở rộng schema quiz.


## Nạp nội dung thật Ngày 31–35 — Batch 7

- [x] Kiểm kê Sheet và bốn loại nguồn: FILE ĐỀ, BÀI HỌC, FILE ĐỀ online, ĐÁP ÁN.
- [x] Tải/trích xuất artifact truy cập được vào `source-extracts/batch-7/`.
- [x] Ghi rõ nguồn bị chặn, thiếu transcript/audio hoặc không thể xác minh.
- [x] Cập nhật `quiz-schema-gaps.md`; không mở rộng schema và không bịa phương án.
- [x] Tạo importer Batch 7 dùng `merge_source_fields`, giữ nguyên dữ liệu cũ khi nguồn mới rỗng.
- [x] Đồng bộ `data/days.json` và `client/src/data/days.json`, rebuild `days-index`.
- [x] Chạy `test-days`, `pnpm check`, `pnpm build` và QA route Ngày 31–35.
- [x] Cập nhật báo cáo Batch 7, README, hồ sơ/audit và QA Comet.
- [x] Đóng gói Comet, tạo checkpoint và dừng chờ xác nhận trước Batch 8.


## Nạp nội dung thật Ngày 36–40 — Batch 8

- [x] Kiểm kê Sheet và bốn loại nguồn: FILE ĐỀ, BÀI HỌC, FILE ĐỀ online, ĐÁP ÁN.
- [x] Tải/trích xuất artifact truy cập được vào `source-extracts/batch-8/`.
- [x] Ghi rõ nguồn bị chặn, thiếu transcript/audio hoặc không thể xác minh.
- [x] Cập nhật `quiz-schema-gaps.md`; không mở rộng schema và không bịa phương án.
- [x] Tạo importer Batch 8 dùng `merge_source_fields`, giữ nguyên dữ liệu cũ khi nguồn mới rỗng.
- [x] Đồng bộ `data/days.json` và `client/src/data/days.json`, rebuild `days-index`.
- [x] Chạy `test-days`, `pnpm check`, `pnpm build` và QA route Ngày 36–40.
- [x] Cập nhật báo cáo Batch 8, README, hồ sơ/audit và QA Comet.
- [x] Đóng gói Comet, tạo checkpoint và dừng chờ xác nhận trước Batch 9.


## Nạp nội dung thật Ngày 41–45 — Batch 9

- [x] Kiểm kê Sheet và bốn loại nguồn: FILE ĐỀ, BÀI HỌC, FILE ĐỀ online, ĐÁP ÁN.
- [x] Tải/trích xuất artifact truy cập được vào `source-extracts/batch-9/`.
- [x] Ghi rõ nguồn bị chặn, thiếu transcript/audio hoặc không thể xác minh.
- [x] Cập nhật `quiz-schema-gaps.md`; không mở rộng schema và không bịa phương án.
- [x] Tạo importer Batch 9 dùng `merge_source_fields`, giữ nguyên dữ liệu cũ khi nguồn mới rỗng.
- [x] Đồng bộ `data/days.json` và `client/src/data/days.json`, rebuild `days-index`.
- [x] Chạy `test-days`, `pnpm check`, `pnpm build` và QA route Ngày 41–45.
- [x] Cập nhật báo cáo Batch 9, README, hồ sơ/audit và QA Comet.
- [x] Đóng gói Comet, tạo checkpoint và dừng chờ xác nhận trước Batch 10.


## Nạp nội dung thật Ngày 46–48 — Batch 10

- [x] Kiểm kê Sheet và bốn loại nguồn: FILE ĐỀ, BÀI HỌC, FILE ĐỀ online, ĐÁP ÁN.
- [x] Ghi nhận rõ Ngày 49–50 không tồn tại trong workbook 48 ngày và không tự tạo object mới.
- [x] Tải/trích xuất artifact truy cập được vào `source-extracts/batch-10/`.
- [x] Ghi rõ nguồn bị chặn, thiếu transcript/audio hoặc không thể xác minh.
- [x] Cập nhật `quiz-schema-gaps.md`; không mở rộng schema và không bịa phương án.
- [x] Tạo importer Batch 10 dùng `merge_source_fields`, giữ nguyên dữ liệu cũ khi nguồn mới rỗng.
- [x] Đồng bộ `data/days.json` và `client/src/data/days.json`, rebuild `days-index`.
- [x] Chạy `test-days`, `pnpm check`, `pnpm build` và QA route Ngày 46–48.
- [x] Cập nhật báo cáo Batch 10, README, hồ sơ/audit và QA Comet.
- [x] Đóng gói Comet, tạo checkpoint và dừng chờ xác nhận hoàn tất 48 ngày.


## Dashboard tổng kết 48 ngày — từ vựng và ngữ pháp

- [x] Audit schema và đếm chính xác mục từ vựng/cấu trúc từ dữ liệu thật.
- [x] Chốt định nghĩa thống kê, ghi rõ trường thiếu hoặc không thể định lượng.
- [x] Thiết kế dashboard Editorial Lab Notebook với thẻ tổng quan, biểu đồ và bảng theo ngày/giai đoạn.
- [x] Thêm route dashboard, điều hướng và bộ lọc tương tác.
- [x] Kiểm thử dữ liệu, responsive, route và build production.
- [x] Lưu checkpoint và bàn giao dashboard.


## Audit và hoàn thiện theo pasted_content.txt

- [ ] Đọc toàn bộ đặc tả và lập ma trận yêu cầu–file–bằng chứng.
- [ ] Audit schema, dữ liệu 48 ngày, nguồn và các trường còn thiếu.
- [ ] Cập nhật dữ liệu đủ 48 ngày theo nguồn thật hoặc `SOURCE STATUS`, không bịa.
- [ ] Sửa logic roadmap, mở khóa tuần tự và trạng thái hoàn thành bài.
- [ ] Bổ sung kiểm thử bất biến dữ liệu và kiểm thử các luồng chính.
- [ ] Chạy validator, `pnpm check`, `pnpm build` và QA web/Comet.
- [ ] Cập nhật hồ sơ, báo cáo giới hạn và lưu checkpoint bàn giao.


## Đợt hoàn thiện theo pasted_content_2.txt

- [x] Đọc và đối chiếu toàn bộ file nguồn code/dữ liệu/báo cáo theo mục 1.
- [x] Ghi nhận hiện trạng thật: field riêng từng ngày, quiz IDs/types/explanations, pronunciationFocus, curriculum links và UI render.
- [x] Thiết kế `curriculum-map.json` với prerequisites, introduces, reinforces, preparesFor, retrievalFromDays, canDoOutcome.
- [x] Bổ sung/kiểm định metadata riêng từng ngày; loại bỏ giá trị generic và estimatedMinutes mặc định.
- [x] Rà 48 ngày, bảo đảm nội dung riêng và gắn `contentOrigin`/`sourceNote` đúng.
- [x] Làm lại quiz theo mục tiêu; đủ 5 dạng, ID duy nhất, đáp án cân bằng, distractor hợp lý, explanation cụ thể.
- [x] Hiển thị pronunciationFocus, curriculum bridge, writing rules và rubric trong UI.
- [x] Kiểm tra listening TTS, shadowing fallback, writing rules/feedback.
- [x] Kiểm tra completion evidence, route lock và migration localStorage.
- [x] Mở rộng validator/unit tests/curriculum QA.
- [x] Chạy test content, logic, check, build và QA trực quan.
- [x] Cập nhật README, scientific-audit, finalization-report.
- [x] Tạo ZIP Comet/source và báo cáo giới hạn còn lại.

# task-be-01_API_danh_gia_ung_vien

## Contract hiện hành — 20/10/2026

Actor: HR/HR_ADMIN của company, user và company đều ACTIVE. Backend kiểm tra tenant từ phiên đăng nhập, không nhận companyId từ client. ID database BIGINT/backend Long/JSON number.

Job ACTIVE hoặc CLOSED chưa xóa được xử lý hồ sơ đã nhận. CLOSED không cho sửa cấu hình vòng hay nhận đơn mới; INACTIVE/deleted không được đánh giá/tuyển. Application phải ACTIVE.

## API

| Thao tác | Endpoint | Request |
| --- | --- | --- |
| Đạt vòng hiện tại | POST /api/v1/applications/{id}/advance | {"expectedRoundId": 202} |
| Từ chối hồ sơ | POST /api/v1/applications/{id}/reject | {"expectedRoundId": 202, "reason": "Kỹ năng chưa phù hợp"} |
| Tuyển ứng viên | POST /api/v1/applications/{id}/hire | {"expectedRoundId": 202} |

expectedRoundId là property bắt buộc nhưng cho phép null để tương thích hồ sơ chưa được gán vòng và Job không có vòng. Trường phải khớp giá trị đã lưu; không thay null bằng ID vòng đầu ở frontend. reason phải trim, không rỗng, tối đa 1000 ký tự.

Response HTTP 200: BaseResponse {status:1,message,data:ApplicationListResponseDTO}. Chi tiết qua GET /applications/{id} trả currentRoundResult, canEvaluate, canHire, roundHistory[].result và rejectedReason/rejectedAt. Không nhận applicationStatus nhạy cảm do client tự chọn.

Endpoint PUT /applications/{id}/round được giữ để trả lỗi hướng dẫn tương thích; không còn được dùng để chuyển vòng tùy ý, bỏ qua đánh giá, tự HIRED hay hồi sinh hồ sơ đã kết thúc.

## Chuyển trạng thái

- PASSED ở vòng chưa cuối: ghi application_progress.status=PASSED, chuyển đến vòng kế tiếp, application vẫn ACTIVE.
- PASSED ở vòng cuối: ghi PASSED, giữ vòng cuối và ACTIVE; canHire=true.
- Hire: chỉ khi đang ở vòng cuối đã có PASSED; chuyển HIRED trong hành động riêng. Với Job roundCount=0 và không có round, HR được Hire trực tiếp, không tự HIRED.
- Reject trước khi có kết quả: ghi FAILED, chuyển REJECTED, lưu lý do và thời điểm.
- Reject sau final PASSED: Application chuyển REJECTED, giữ nguyên kết quả PASSED lịch sử, lưu lý do/thời điểm từ chối.
- Không ghi đè kết quả vòng đã chốt; cùng một final PASS hoặc Hire gửi lặp trả 409, không gửi lại email.
- Khóa hàng theo application + company, kết hợp version; ghi kết quả vòng và thay đổi application trong cùng transaction.

## Database

Bảng application_progress, không dùng round_statuses/job_rounds và không dùng UUID:
id BIGINT PK; application_id BIGINT FK applications.id; round_id BIGINT FK hiring_rounds.id;
status VARCHAR(50) PENDING/PASSED/FAILED/SKIPPED; evaluated_by BIGINT nullable FK users.id;
evaluated_at TIMESTAMP NOT NULL; note TEXT; created_at/updated_at TIMESTAMP NOT NULL.
Unique(application_id, round_id). API/service phải kiểm tra round thuộc đúng Job/company.
Không suy diễn hoặc backfill evaluation từ current_round_id của dữ liệu cũ.

Migration V45 bổ sung applications.version, rejected_reason, rejected_at. V46 tạo application_progress.
Không sửa lại migration đã áp dụng. score/evaluation_details và form đánh giá chi tiết vẫn thuộc US-19.

## Template và email

- PASS/FAIL template bắt buộc trong request cấu hình round; phải active, chưa xóa, đúng company và đúng loại.
- Khi `sendEmail=true`, lấy template của vòng vừa đánh giá, không lấy template của vòng đích. Round cũ thiếu template trả 400 và yêu cầu HR cấu hình lại, không tự chọn template thay thế. Khi `sendEmail=false`, không resolve template/SMTP, vẫn ghi kết quả nghiệp vụ và email log SKIPPED; quy tắc bắt buộc PASS/FAIL template khi cấu hình vòng không thay đổi.
- Hire dùng template OFFER khả dụng của company; nếu không có template thì không báo gửi thành công, email log FAILED. Không hủy trạng thái Hire đã commit vì lỗi gửi email.
- Event chứa snapshot dữ liệu email, không mang entity lazy sang luồng nền. Listener lưu queue email_logs trong cùng transaction; worker gửi sau commit. Rollback không giữ queue/email.
- Payload advance/hire thêm `sendEmail` Boolean tùy chọn; reject thêm trường tương tự bên cạnh expectedRoundId/reason. Bỏ qua mặc định true; false lưu SKIPPED, không gửi SMTP.
- Backend tự tính `isFinalRound` từ vòng cuối trong thứ tự; client chỉ đọc cờ. CRUD/reorder/aggregate dùng chung validator. Pipeline legacy có thứ tự/cờ không hợp lệ bị chặn quyết định bằng 409, không sửa ngầm khi đọc. PASS cuối vẫn giữ ACTIVE; Hire là hành động riêng.
- Trạng thái email PENDING/SUCCESS/FAILED/SKIPPED; worker tối đa 1 lần đầu + 3 retry, backoff 30/60/90 giây. Ghi attempt_count/next_attempt_at/sent_at/retried_at đúng thực tế; restart giữ queue.
- SMTP chỉ bảo đảm at-least-once. Manual retry chỉ FAILED, khóa theo log + company. SMTP thất bại trả 503 nhưng vẫn commit attempt_count/retried_at/error_message; không rollback bằng chứng lần gửi.

## Lỗi và UI

400: thiếu property, reason sai, template thiếu/sai. 401: chưa đăng nhập.
403: sai role/user/company không ACTIVE. 404: hồ sơ ngoài tenant hoặc không tồn tại.
409: expectedRoundId stale, đánh giá lặp, Application đã kết thúc, Job không cho xử lý, hoặc Hire khi chưa đạt vòng cuối.

Drawer/Board chỉ phát một request sau xác nhận; Hủy không ghi dữ liệu. Vô hiệu hóa action trong lúc pending.
Lỗi giữ ngữ cảnh và cho tải lại; thành công invalidate list, detail, board, round-board và dashboard.

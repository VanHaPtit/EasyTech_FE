# Task BE API: API Applications

## Mục đích

### Contract bổ sung ngày 21/10/2026

- API đang triển khai: `GET /api/v1/applications/board` trả `data={total,truncated,columns}`; `GET /api/v1/applications/round-board?jobId=...` trả danh sách cột vòng. Danh sách chung dùng `/api/v1/applications`; không tạo endpoint trùng `/jobs/{jobId}/applications` từ tài liệu cũ.
- Phân trang độc lập từng cột: `GET /api/v1/applications/board/column?stage=NEW&jobId=1&page=1&limit=20`, hoặc `?jobId=1&roundId=2&page=1&limit=20`. Chỉ nhận đúng một trong stage/roundId; roundId yêu cầu jobId và ownership của vòng trong Job. ID là BIGINT/Long; stage dùng NEW/IN_PROGRESS/PASSED/REJECTED (PASSED hiển thị hồ sơ HIRED, không phải Round Result).
- Response theo BaseResponse, data gồm `current_page,last_page,total,data`. `page>=1`, `limit` 1..100. Thứ tự `appliedAt DESC,id DESC` ổn định khi timestamp bằng nhau. Keyword áp dụng trước count và pagination.
- UI tải 20 hồ sơ/cột/lần, có Tải thêm/Thử lại/loading/empty. Đổi Job/từ khóa reset query của cột. Invalidate toàn bộ applications sau quyết định; không còn giới hạn khả năng truy cập ở 200 card đầu.
- Hồ sơ chưa gán vòng hoặc trỏ vòng không còn hiệu lực được hiển thị ở cột đầu để HR kiểm tra; API hiển thị không tự sửa con trỏ. Quyết định vẫn kiểm tra pipeline độc lập.
Xác định phạm vi backend cho task 'API Applications' trong US-22 Kanban Board, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-22 - Kanban Board.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/applications`

## Request
- Query params: jobId, status, keyword, page, limit. Phân trang theo cột dùng endpoint bổ sung `/applications/board/column` đã mô tả phía trên.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Danh sách application cho Kanban/List.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Ghi audit log nếu task tạo/cập nhật/xóa dữ liệu nghiệp vụ.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `GET /api/v1/applications?jobId=1&status=ACTIVE&page=1&limit=20`

### Request Body
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách ứng viên thành công",
  "data": {
    "current_page": 1,
    "last_page": 1,
    "total": 1,
    "data": [
      {
        "applicationId": 301,
        "candidateId": 501,
        "fullName": "Tran B",
        "email": "tranb@example.com",
        "phone": "0901234567",
        "currentRoundId": 201,
        "currentRoundName": "CV Screening",
        "applicationStatus": "ACTIVE",
        "appliedAt": "2026-08-31T10:00:00"
      }
    ]
  }
}
```

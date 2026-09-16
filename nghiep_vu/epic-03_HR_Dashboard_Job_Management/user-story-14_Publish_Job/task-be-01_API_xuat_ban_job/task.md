# task-be-01_API_xuat_ban_job

## Mục đích
Xác định phạm vi backend cho task 'API xuat ban job' trong US-14 Publish Job, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-14 - Publish Job.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/jobs/{jobId}/publish`
- `/api/v1/jobs/{jobId}/close`
- `/api/v1/jobs/{jobId}/reopen`

## Request
- Path variable `jobId`; không cần body nếu publish theo cấu hình hiện tại.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Job sau khi publish.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Publish: `INACTIVE` -> `ACTIVE`.
- Close: `ACTIVE` -> `CLOSED`.
- Reopen: `CLOSED` -> `ACTIVE`.
- Không nhận `status` trong request body.

## Side Effects
- Publish/reopen làm Job public trên Career Site và ghi audit log; close ẩn Job khỏi public list
  nhưng không xóa application hoặc pipeline hiện tại.
- Nếu Job cũ đang gắn category `INACTIVE`, publish/reopen vẫn được phép nếu category chưa
  soft delete; đây là quy tắc giữ liên kết của US-07. Category đã soft delete hoặc không tồn tại
  thì không được publish/reopen.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/jobs/{jobId}/publish`
### Request Body
Không có request body.
### Response (200 OK)
```json
{
  "status": 1,
  "message": "Publish job thành công",
  "data": {
    "id": 101,
    "title": "Senior Frontend Developer",
    "status": "ACTIVE",
    "publishedAt": "2026-08-31T10:00:00"
  }
}
```

### Contract đã triển khai
- Publish, close và reopen đều trả `BaseResponse` với Job sau chuyển trạng thái.
- Publish kiểm tra title, description, location, khoảng lương và category chưa soft delete.
- Nếu state hiện tại không phù hợp, backend trả `409`; nếu Job không thuộc company hiện tại
  hoặc đã soft delete, backend trả `404`.

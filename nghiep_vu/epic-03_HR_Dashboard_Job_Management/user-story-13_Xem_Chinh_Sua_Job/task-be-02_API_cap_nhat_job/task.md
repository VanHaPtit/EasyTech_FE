# task-be-02_API_cap_nhat_job

## Mục đích
Xác định phạm vi backend cho task 'API cap nhat job' trong US-13 Xem Chinh Sua Job, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-13 - Xem Chinh Sua Job.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Endpoint chỉ dành cho role `HR` hoặc `HR_ADMIN`; Job phải thuộc đúng `company_id` hiện tại.
- `Company.status = ACTIVE` và `User.status = ACTIVE`; nếu workspace hoặc tài khoản đang `PENDING`, `REJECTED`, `INACTIVE` hoặc `BLOCKED`, backend trả `403` và không cập nhật Job.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `PUT`

## Endpoint
- `/api/v1/jobs/{jobId}`

## Request
- Các field job được phép chỉnh sửa.
- `categoryId` là số nguyên JSON tương ứng với kiểu `Long`/`BIGINT`. Đây là field tùy chọn khi cập nhật:
  - Nếu có truyền `categoryId`, chỉ chấp nhận category `ACTIVE` và `is_deleted = false`.
  - Nếu bỏ qua `categoryId`, giữ nguyên liên kết category hiện tại, kể cả khi category đã chuyển `INACTIVE`.
- `roundCount` là số nguyên không âm và là field tùy chọn:
  - `roundCount = 0` hợp lệ khi Job không có hiring round đang hiệu lực.
  - Nếu truyền `roundCount`, giá trị phải khớp với số bản ghi `hiring_rounds` của Job có `is_deleted = false`; API không cho phép lưu số vòng chỉ tồn tại ở `jobs` nhưng lệch pipeline thực tế.
- Muốn thay đổi số lượng hoặc thứ tự vòng, client dùng contract pipeline của US-16; API pipeline sẽ tính lại `jobs.round_count` từ danh sách `rounds` đã lưu.
- Frontend hiện dùng `PUT /api/v1/jobs/{jobId}/pipeline` để lưu Job và toàn bộ pipeline trong một transaction; endpoint aggregate này áp dụng cùng rule US-16 về Job `CLOSED`, tenant, workspace ACTIVE, ID round/template dạng `Long` và audit.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- `title` bắt buộc và phải được trim; các field tùy chọn không truyền trong request được giữ nguyên giá trị hiện tại.
- Khi truyền salary, `salaryMin`/`salaryMax` phải không âm và `salaryMax >= salaryMin`; các giá trị enum (`currency`, `workingType`, `employmentType`, `experienceLevel`) được backend kiểm tra và chuẩn hóa.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Job sau khi cập nhật.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không tự publish; giữ nguyên Job Status nếu request không yêu cầu state change hợp lệ.

## Side Effects
- Ghi audit log nếu task tạo/cập nhật/xóa dữ liệu nghiệp vụ.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 400: `categoryId` không tồn tại, đã xóa mềm hoặc không còn `ACTIVE`; request có salary/enum không hợp lệ.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: Job đang `CLOSED` nên không thể chỉnh sửa; các conflict khác theo trạng thái hiện tại.


## 3. API JSON Contract

**Endpoint:** `PUT /api/v1/jobs/{jobId}`
**Mô tả:** Cập nhật các field được phép chỉnh sửa của job thuộc company hiện tại.

### Request Body
```json
{
  "title": "Senior Frontend Developer",
  "description": "JD details updated...",
  "requirements": "ReactJS, TypeScript",
  "salaryMin": 1800,
  "salaryMax": 2800,
  "currency": "USD",
  "workingType": "HYBRID",
    "employmentType": "FULL_TIME",
    "experienceLevel": "SENIOR",
    "categoryId": 1,
    "roundCount": 0
}
```

`categoryId` không được dùng để gỡ liên kết category bằng cách gửi `null`; nếu không muốn đổi category, client bỏ field này khỏi request. Backend vẫn là nơi kiểm tra trạng thái category.

### Category options cho form HR

Frontend lấy danh sách lựa chọn từ `GET /api/v1/job-categories`. Endpoint yêu cầu đăng nhập và chỉ trả category có `status = ACTIVE`, `is_deleted = false` với các field `id` (number/Long), `name`, `slug`; không trả `jobCount` của màn hình Admin.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật job thành công",
  "data": {
    "id": 101,
    "title": "Senior Frontend Developer",
    "slug": "senior-frontend-developer",
    "status": "INACTIVE",
    "updatedAt": "2026-08-31T10:30:00"
  }
}
```

# task-be-01_API_tao_job

## Mục đích
Xác định phạm vi backend cho task 'API tao job' trong US-12 Tao Job AI JD, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-12 - Tao Job AI JD.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- `Company.status = ACTIVE` và `User.status = ACTIVE`; nếu doanh nghiệp hoặc tài khoản đang `PENDING`, `REJECTED`, `INACTIVE` hoặc `BLOCKED` thì endpoint trả `403` và không tạo Job.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/jobs`

## Request
- Thông tin job: title, description, location, salary và `categoryId`. Cấu hình form tùy chỉnh không nằm trong body của API tạo Job; frontend gọi các endpoint form-fields của US-15 sau khi nhận được Job ID.
- `categoryId` là số nguyên JSON tương ứng với `Long`/`BIGINT` trong backend/database.
- Khi tạo hoặc đổi category, backend chỉ chấp nhận category có `status = ACTIVE` và `is_deleted = false`.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- `categoryId` bắt buộc là số nguyên dương, tương ứng với Java `Long`/PostgreSQL `BIGINT`.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Job vừa tạo ở trạng thái `INACTIVE` (chưa công khai/bản nháp).
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Job Status = `INACTIVE`.

## Side Effects
- Tạo bản ghi `jobs` thuộc đúng `company_id` của HR, gán `created_by` và lưu ở trạng thái `INACTIVE`.
- Không tự tạo pipeline hoặc form ứng tuyển trong API này. Form tùy chỉnh được lưu riêng qua US-15 trong bảng `form_fields` sau khi Job được tạo; pipeline được cấu hình ở luồng riêng.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/jobs`
### Request Body
```json
{
  "title": "Senior Frontend Developer",
  "categoryId": 1,
  "description": "JD details...",
  "requirements": "ReactJS...",
  "salaryMin": 1500,
  "salaryMax": 2500,
  "currency": "USD",
  "workingType": "HYBRID",
  "employmentType": "FULL_TIME",
  "experienceLevel": "SENIOR"
}
```
### Response (201 Created)
```json
{
  "status": 1,
  "message": "Tạo job thành công",
  "data": {
    "id": 101,
    "title": "Senior Frontend Developer",
    "slug": "senior-frontend-developer",
    "status": "INACTIVE",
    "createdAt": "2026-08-31T10:00:00"
  }
}
```

### Phạm vi đã chốt trong code hiện tại

- `POST /api/v1/jobs` đã hỗ trợ tạo Job thủ công với category ACTIVE.
- `categoryId` là JSON number tương ứng Java `Long`/PostgreSQL `BIGINT`.
- Chỉ Company và User đang `ACTIVE` mới được tạo Job; backend kiểm tra cả ownership và trạng thái workspace.
- `categoryId` phải là số nguyên dương; category được chọn phải `ACTIVE` và chưa soft delete.
- `status` không nhận từ client; backend luôn tạo Job mới ở `INACTIVE`.
- AI JD Writer là phần phụ thuộc riêng, không dùng mock response trong API tạo Job khi provider chưa được chốt. Cấu hình form ứng tuyển là contract riêng của US-15.

---

## Thiết kế Database – Bảng jobs

## Bảng/entity liên quan
- Bảng chính của task: `jobs`, `job_categories`. Bảng `form_fields` được quản lý ở US-15, không được ghi trong transaction tạo Job của endpoint này.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng `BIGINT` trong PostgreSQL và `Long` trong Java cho ID/khóa ngoại của các entity hiện có.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: Job Status = `INACTIVE`/`ACTIVE`/`CLOSED`.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, 
ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.

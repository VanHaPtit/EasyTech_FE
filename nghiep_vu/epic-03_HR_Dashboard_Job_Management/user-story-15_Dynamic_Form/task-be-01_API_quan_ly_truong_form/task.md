# task-be-01_API_quan_ly_truong_form

## Mục đích
Xác định phạm vi backend cho task 'API quan ly truong form' trong US-15 Dynamic Form, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- GET /api/v1/jobs/{jobId}/form-fields
- POST /api/v1/jobs/{jobId}/form-fields
- PUT /api/v1/jobs/{jobId}/form-fields/{fieldId}
- PUT /api/v1/jobs/{jobId}/form-fields/reorder
- DELETE /api/v1/jobs/{jobId}/form-fields/{fieldId}

`GET`, `POST`, `PUT` và `DELETE` là endpoint nội bộ dành cho HR/HR_ADMIN có tài khoản và company ở trạng thái `ACTIVE`, thuộc company sở hữu Job. `PUT /reorder` nhận toàn bộ danh sách ID field đang còn hiệu lực và lưu lại thứ tự từ `0`.

Job ở `INACTIVE` hoặc `ACTIVE` được chỉnh sửa form. Job `CLOSED` không cho thay đổi form và trả `409`. Mọi query đều kiểm tra `company_id`; mọi thao tác thay đổi ghi audit log theo actor hiện tại.

## API JSON Contract

### Request Body - Tạo/Cập nhật field
```json
{
  "fieldName": "portfolio_url",
  "label": "Portfolio URL",
  "fieldType": "URL",
  "required": false,
  "options": [],
  "displayOrder": 3
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật trường form ứng tuyển thành công.",
  "data": {
    "id": 12,
    "jobId": 1001,
    "fieldName": "portfolio_url",
    "label": "Portfolio URL",
    "fieldType": "URL",
    "required": false,
    "options": [],
    "displayOrder": 3,
    "updatedAt": "2026-08-31T10:00:00"
  }
}
```

### Quy tắc dữ liệu

- `fieldType` chỉ nhận `TEXT`, `TEXTAREA`, `URL`, `FILE`, `SELECT`.
- `fieldName` là tùy chọn khi tạo; nếu bỏ qua, backend sinh tên snake_case ổn định từ `label`. Tên đang hiệu lực phải duy nhất trong một Job.
- `options` chỉ được gửi cho `SELECT`, phải có ít nhất một lựa chọn không trống và không trùng nhau. Các loại khác phải gửi mảng rỗng hoặc bỏ qua.
- `displayOrder` là số nguyên không âm. Endpoint reorder phải nhận đúng toàn bộ ID field đang hiệu lực, không trùng và không thiếu ID.
- Xóa field là xóa mềm (`form_fields.is_deleted = true`) để không làm mất câu trả lời của các đơn cũ. Field đã xóa không xuất hiện ở `GET` nội bộ và public.
- Migration triển khai bảng là `V14__create_form_fields.sql`; khóa chính và khóa ngoại dùng `BIGINT`/Java `Long`.

### Response public liên quan

`GET /api/v1/public/companies/{companySlug}/jobs/{jobSlug}` trả thêm:

```json
{
  "applicationForm": {
    "fields": [
      {
        "id": 12,
        "fieldName": "portfolio_url",
        "label": "Portfolio URL",
        "fieldType": "URL",
        "required": false,
        "options": [],
        "displayOrder": 0
      }
    ]
  }
}
```

Các field mặc định Họ tên, Email, Số điện thoại và CV vẫn thuộc flow nộp CV của US-26; US-15 chỉ quản lý field tùy chỉnh và cấu hình form.

### Response lỗi
```json
{
  "status": 0,
  "message": "Field không hợp lệ hoặc job không thuộc công ty hiện tại.",
  "data": null
}
```

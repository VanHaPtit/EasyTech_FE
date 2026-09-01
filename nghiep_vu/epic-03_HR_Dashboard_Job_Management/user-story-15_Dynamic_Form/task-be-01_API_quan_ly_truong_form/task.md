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
- POST /api/v1/jobs/{jobId}/form-fields
- PUT /api/v1/jobs/{jobId}/form-fields/{fieldId}
- DELETE /api/v1/jobs/{jobId}/form-fields/{fieldId}

## API JSON Contract

### Request Body - Tạo/Cập nhật field
```json
{
  "label": "Portfolio URL",
  "fieldType": "URL",
  "required": false,
  "placeholder": "https://portfolio.example.com",
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
    "label": "Portfolio URL",
    "fieldType": "URL",
    "required": false,
    "placeholder": "https://portfolio.example.com",
    "options": [],
    "displayOrder": 3,
    "updatedAt": "2026-08-31T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Field không hợp lệ hoặc job không thuộc công ty hiện tại.",
  "data": null
}
```

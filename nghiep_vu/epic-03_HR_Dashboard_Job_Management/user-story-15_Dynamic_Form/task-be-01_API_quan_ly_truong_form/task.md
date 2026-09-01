# task-be-01_API_quan_ly_truong_form

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-01 API quan ly truong form.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Manage Form Fields

## Mục đích
API để cấu hình bộ câu hỏi động (form_fields) cho từng Job (CRUD).

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

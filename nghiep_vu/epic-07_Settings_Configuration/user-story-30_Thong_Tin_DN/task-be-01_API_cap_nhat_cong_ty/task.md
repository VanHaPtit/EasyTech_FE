# task-be-01_API_cap_nhat_cong_ty

## Mục đích
Xác định phạm vi backend cho task 'API cap nhat cong ty' trong US-30 Thong Tin DN, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

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
- PUT /api/v1/companies/me

## API JSON Contract

### Request Body
```json
{
  "companyName": "TechA Solutions",
  "taxCode": "0123456789",
  "phone": "0987654321",
  "address": "123 Tech Street, Hà Nội",
  "website": "https://techa.vn",
  "description": "Công ty công nghệ chuyên phát triển phần mềm."
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật thông tin doanh nghiệp thành công.",
  "data": {
    "companyId": 5,
    "companyName": "TechA Solutions",
    "taxCode": "0123456789",
    "phone": "0987654321",
    "address": "123 Tech Street, Hà Nội",
    "website": "https://techa.vn",
    "updatedAt": "2026-08-31T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Thông tin doanh nghiệp không hợp lệ hoặc không có quyền cập nhật.",
  "data": null
}
```

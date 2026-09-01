# Task BE API: Update Company Info

## Mục đích
API cập nhật thông tin chung của doanh nghiệp (tên, logo, địa chỉ, mst, contact).

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

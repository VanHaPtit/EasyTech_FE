# Task BE API: Update Career Site Config

## Mục đích
API lưu cấu hình giao diện Career Site (màu sắc, banner, font, hiển thị phúc lợi) cho tenant.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- PUT /api/v1/companies/me/career-site-config

## API JSON Contract

### Request Body
```json
{
  "primaryColor": "#2563EB",
  "bannerUrl": "https://cdn.easytech.vn/banners/techa.png",
  "headline": "Gia nhập TechA Solutions",
  "description": "Cùng xây dựng sản phẩm công nghệ có tác động thực tế.",
  "showBenefits": true,
  "benefits": ["Lương cạnh tranh", "Hybrid working", "Bảo hiểm đầy đủ"]
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật cấu hình Career Site thành công.",
  "data": {
    "companyId": 5,
    "primaryColor": "#2563EB",
    "bannerUrl": "https://cdn.easytech.vn/banners/techa.png",
    "headline": "Gia nhập TechA Solutions",
    "showBenefits": true,
    "updatedAt": "2026-08-31T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Cấu hình Career Site không hợp lệ hoặc không có quyền cập nhật.",
  "data": null
}
```

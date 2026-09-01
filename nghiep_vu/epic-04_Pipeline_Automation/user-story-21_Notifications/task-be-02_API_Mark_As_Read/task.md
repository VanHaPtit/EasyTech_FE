# Task BE API: Mark Notifications As Read

## Mục đích
API đánh dấu một hoặc tất cả thông báo là đã đọc.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- PUT /api/v1/notifications/mark-read

## API JSON Contract

### Request Body
```json
{
  "notificationIds": [7001, 7002],
  "markAll": false
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Đánh dấu thông báo đã đọc thành công.",
  "data": {
    "updatedCount": 2
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không thể cập nhật trạng thái thông báo.",
  "data": null
}
```

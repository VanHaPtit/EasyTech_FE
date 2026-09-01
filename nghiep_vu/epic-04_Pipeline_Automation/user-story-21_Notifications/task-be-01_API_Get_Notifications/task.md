# Task BE API: Get Notifications

## Mục đích
API lấy danh sách thông báo in-app của HR, hỗ trợ phân trang và filter trạng thái đọc.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- GET /api/v1/notifications

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách thông báo thành công.",
  "data": {
    "content": [
      {
        "id": 7001,
        "type": "INTERVIEW_RESPONSE",
        "title": "Ứng viên đã xác nhận lịch phỏng vấn",
        "message": "Tran Van B đã xác nhận tham dự phỏng vấn.",
        "read": false,
        "createdAt": "2026-08-31T10:00:00"
      }
    ],
    "current_page": 1,
    "last_page": 1,
    "total": 1
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không có quyền xem thông báo.",
  "data": null
}
```

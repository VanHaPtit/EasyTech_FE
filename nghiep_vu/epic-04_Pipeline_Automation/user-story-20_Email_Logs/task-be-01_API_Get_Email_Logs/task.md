# Task BE API: Get Email Logs

## Mục đích
API lấy danh sách lịch sử gửi email (phân trang, lọc theo candidate/status/template).

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- GET /api/v1/admin/email-logs

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách lịch sử email thành công.",
  "data": {
    "content": [
      {
        "id": 9001,
        "recipientEmail": "candidate@example.com",
        "templateCode": "INTERVIEW_INVITATION",
        "status": "SENT",
        "subject": "Thư mời phỏng vấn",
        "sentAt": "2026-08-31T10:00:00",
        "errorMessage": null
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
  "message": "Không có quyền xem lịch sử email.",
  "data": null
}
```

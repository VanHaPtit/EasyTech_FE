# Task BE API: Get Application Status via Magic Link

## Mục đích
API trả về trạng thái hồ sơ ứng tuyển dựa trên magic link hợp lệ.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- API chỉ trả về thông tin hạn chế dành riêng cho ứng viên đó.

## Endpoint đề xuất
- GET /api/v1/candidates/application-status

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy trạng thái hồ sơ ứng tuyển thành công.",
  "data": {
    "applicationId": 2001,
    "candidateName": "Tran Van B",
    "jobTitle": "Java Backend Developer",
    "applicationStatus": "ACTIVE",
    "currentStage": "Technical Interview",
    "lastUpdatedAt": "2026-08-31T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không thể lấy trạng thái hồ sơ từ magic link hiện tại.",
  "data": null
}
```

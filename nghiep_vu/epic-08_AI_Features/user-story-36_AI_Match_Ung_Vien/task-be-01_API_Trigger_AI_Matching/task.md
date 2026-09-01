# Task BE API: Trigger AI Matching

## Mục đích
API kích hoạt quá trình AI quét data ứng viên cũ để gợi ý cho Job mới.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Gọi service AI bên dưới một cách bất đồng bộ (async).

## Endpoint đề xuất
- POST /api/v1/jobs/{jobId}/ai-matching/trigger

## API JSON Contract

### Request Body
```json
{
  "forceRerun": true,
  "minScore": 70,
  "limit": 10
}
```

### Response (202 Accepted)
```json
{
  "status": 1,
  "message": "Đã tiếp nhận yêu cầu chạy AI Matching.",
  "data": {
    "jobId": 1001,
    "jobStatus": "ACTIVE",
    "matchingJobId": "ai-match-20260831-0001",
    "status": "QUEUED"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không thể kích hoạt AI Matching cho job hiện tại.",
  "data": null
}
```

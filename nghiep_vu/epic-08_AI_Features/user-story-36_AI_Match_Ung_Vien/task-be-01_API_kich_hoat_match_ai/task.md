# task-be-01_API_kich_hoat_match_ai

## Mục đích
Xác định phạm vi backend cho task 'API kich hoat match ai' trong US-36 AI Match Ung Vien, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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

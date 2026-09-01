# task-be-02_API_danh_sach_goi_y_ai

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API danh sach goi y ai.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Get AI Suggestions

## Mục đích
API lấy danh sách các ứng viên được AI gợi ý (matching score) cho một Job.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).

## Endpoint đề xuất
- GET /api/v1/jobs/{jobId}/ai-suggestions

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách ứng viên AI gợi ý thành công.",
  "data": [
    {
      "suggestionId": 8001,
      "candidateId": 3001,
      "candidateName": "Tran Van B",
      "email": "tranvanb@example.com",
      "matchingScore": 86.5,
      "matchedSkills": ["Java", "Spring Boot", "PostgreSQL"],
      "strengths": ["Kinh nghiệm backend phù hợp JD", "Đã từng làm hệ thống SaaS"],
      "contactStatus": "NOT_CONTACTED",
      "createdAt": "2026-08-31T10:00:00"
    }
  ]
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không thể lấy danh sách ứng viên AI gợi ý cho job hiện tại.",
  "data": null
}
```

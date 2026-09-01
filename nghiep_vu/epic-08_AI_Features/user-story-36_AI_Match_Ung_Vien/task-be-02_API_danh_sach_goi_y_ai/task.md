# task-be-02_API_danh_sach_goi_y_ai

## Mục đích
Xác định phạm vi backend cho task 'API danh sach goi y ai' trong US-36 AI Match Ung Vien, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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

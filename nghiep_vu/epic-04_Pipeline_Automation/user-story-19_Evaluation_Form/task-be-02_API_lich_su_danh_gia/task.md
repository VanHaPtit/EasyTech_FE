# task-be-02_API_lich_su_danh_gia

## Mục đích
Xác định phạm vi backend cho task 'API lich su danh gia' trong US-19 Evaluation Form, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.

## Endpoint đề xuất
- GET /api/v1/applications/{applicationId}/evaluations

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy lịch sử đánh giá thành công.",
  "data": [
    {
      "evaluationId": 501,
      "roundId": 3,
      "roundName": "Technical Interview",
      "result": "PASSED",
      "overallScore": 8.5,
      "note": "Ứng viên đạt yêu cầu kỹ thuật vòng 1.",
      "submittedBy": {
        "id": 10,
        "fullName": "Nguyen Van A"
      },
      "submittedAt": "2026-08-31T10:00:00"
    }
  ]
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không tìm thấy hồ sơ ứng viên trong phạm vi công ty hiện tại.",
  "data": null
}
```

# task-be-02_API_lich_su_danh_gia

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API lich su danh gia.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Get Evaluation History

## Mục đích
API để lấy lịch sử các phiếu đánh giá của một ứng viên.

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

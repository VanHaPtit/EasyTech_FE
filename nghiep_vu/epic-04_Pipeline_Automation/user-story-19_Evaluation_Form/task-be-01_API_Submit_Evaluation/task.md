# Task BE API: Submit Evaluation

## Mục đích
API để HR submit kết quả đánh giá (PASSED/FAILED) và điểm số các tiêu chí cho ứng viên theo vòng phỏng vấn.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- POST /api/v1/applications/{applicationId}/evaluations

## API JSON Contract

### Request Body
```json
{
  "roundId": 3,
  "result": "PASSED",
  "overallScore": 8.5,
  "note": "Ứng viên đạt yêu cầu kỹ thuật vòng 1.",
  "criteriaScores": [
    {
      "criteriaId": 101,
      "score": 9,
      "comment": "Nắm chắc kiến thức Java."
    }
  ]
}
```

### Response (201 Created)
```json
{
  "status": 1,
  "message": "Gửi phiếu đánh giá thành công.",
  "data": {
    "evaluationId": 501,
    "applicationId": 2001,
    "roundId": 3,
    "result": "PASSED",
    "overallScore": 8.5,
    "submittedAt": "2026-08-31T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không thể gửi đánh giá cho hồ sơ hoặc vòng tuyển dụng này.",
  "data": null
}
```

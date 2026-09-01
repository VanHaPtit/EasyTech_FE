# task-be-01_API_danh_sach_ung_vien

## Mục đích
Xác định phạm vi backend cho task 'API danh sach ung vien' trong US-23 List View, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

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
- GET /api/v1/applications

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách hồ sơ ứng viên thành công.",
  "data": {
    "content": [
      {
        "applicationId": 2001,
        "candidateName": "Tran Van B",
        "email": "tranvanb@example.com",
        "phone": "0987654321",
        "jobTitle": "Java Backend Developer",
        "applicationStatus": "ACTIVE",
        "currentStage": "Technical Interview",
        "source": "CAREER_SITE",
        "appliedAt": "2026-08-31T09:00:00"
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
  "message": "Không thể lấy danh sách hồ sơ ứng viên.",
  "data": null
}
```

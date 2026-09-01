# task-be-01_API_danh_sach_ung_vien

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-01 API danh sach ung vien.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Get Applications List

## Mục đích
API lấy danh sách hồ sơ ứng viên dạng bảng/list, hỗ trợ filter phức tạp (trạng thái, vòng, job, nguồn).

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

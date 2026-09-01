# task-be-01_API_danh_sach_thong_bao

## Mục đích
Xác định phạm vi backend cho task 'API danh sach thong bao' trong US-21 Notifications, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

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
- GET /api/v1/notifications

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách thông báo thành công.",
  "data": {
    "content": [
      {
        "id": 7001,
        "type": "INTERVIEW_RESPONSE",
        "title": "Ứng viên đã xác nhận lịch phỏng vấn",
        "message": "Tran Van B đã xác nhận tham dự phỏng vấn.",
        "read": false,
        "createdAt": "2026-08-31T10:00:00"
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
  "message": "Không có quyền xem thông báo.",
  "data": null
}
```

# task-be-02_API_danh_dau_da_doc

## Mục đích
Xác định phạm vi backend cho task 'API danh dau da doc' trong US-21 Notifications, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

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
- PUT /api/v1/notifications/mark-read

## API JSON Contract

### Request Body
```json
{
  "notificationIds": [7001, 7002],
  "markAll": false
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Đánh dấu thông báo đã đọc thành công.",
  "data": {
    "updatedCount": 2
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Không thể cập nhật trạng thái thông báo.",
  "data": null
}
```

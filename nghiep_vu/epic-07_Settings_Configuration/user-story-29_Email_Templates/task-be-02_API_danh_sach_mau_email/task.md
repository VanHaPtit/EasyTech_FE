# task-be-02_API_danh_sach_mau_email

## Mục đích
Xác định phạm vi backend cho task 'API danh sach mau email' trong US-29 Email Templates, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-29 - Email Templates.

## Điều kiện tiên quyết
- User đã đăng nhập và có quyền quản lý Email Template.
- Backend kiểm tra ownership theo `company_id`.

## API contract

### Đồng bộ ngày 21/10/2026 — ưu tiên contract triển khai

- Giữ `GET /api/v1/email-templates`, `page` từ 1, `size` 1..100, `keyword,type,activeOnly`. Response `data` là Spring Page: `content,totalElements,totalPages,number,size`; `number` zero-based. Không dùng wrapper `items/total/page` hoặc enum REJECT/INVITE của tài liệu legacy.
- Enum: APPLICATION_RECEIVED/PASS/FAIL/INTERVIEW_INVITE/OFFER/AI_MATCH_INVITE. ID là BIGINT/Long. Sắp xếp `createdAt DESC,id DESC` để tránh lệch trang khi bằng timestamp.
- Màn Settings phân trang phía server, 10 mẫu/trang, tìm kiếm reset trang 1; xóa phần tử cuối trang chuyển về trang trước. Không tự tải toàn bộ mẫu để dựng danh sách Settings. Các dropdown chọn template có thể dùng hàm lấy đủ trang riêng, không cắt ở 100 mẫu.
- UI giữ draft khi lỗi, xác nhận trước bỏ phần chỉnh sửa khi chuyển trang/tìm kiếm; loading/empty/error có Thử lại.

### GET /api/v1/email-templates
- Mục đích: lấy danh sách Email Template của company hiện tại.
- Request: query params `keyword`, `type`, `page`, `size` nếu cần.
- Response: danh sách template và metadata phân trang.

## Validation
- Query parameters phân trang hợp lệ (page >= 1, size >= 1).

## State Transition
- Không đổi trạng thái Company/User/Job/Application.

## Side Effects
- Ghi audit log nếu cần thiết.

## Các trường hợp lỗi
- 400: request không hợp lệ.
- 401: chưa đăng nhập.
- 403: không có quyền quản lý Email Template.

## 3. API JSON Contract
**Endpoint:** `GET /api/v1/email-templates`

### Request Parameters
- `page` (int, default=1)
- `size` (int, default=50; UI Settings gửi 10)
- `keyword` (string, optional)
- `type` (string, optional, enum: APPLICATION_RECEIVED, PASS, FAIL, INTERVIEW_INVITE, OFFER, AI_MATCH_INVITE)

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách Email Template thành công",
  "data": {
    "content": [
      {
        "id": 501,
        "templateName": "Default Pass Template",
        "type": "PASS",
        "subject": "Chúc mừng {{Candidate.name}}",
        "isActive": true,
        "createdAt": "2026-08-31T10:00:00"
      }
    ],
    "totalElements": 1,
    "number": 0,
    "size": 50,
    "totalPages": 1
  }
}
```

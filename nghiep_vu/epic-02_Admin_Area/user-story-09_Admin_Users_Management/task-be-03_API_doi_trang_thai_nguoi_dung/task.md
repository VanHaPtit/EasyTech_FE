# task-be-03_API_doi_trang_thai_nguoi_dung

## Mục đích
Xác định phạm vi backend cho task 'API doi trang thai nguoi dung' trong US-09 Admin Users Management, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Điều kiện tiên quyết
- User phải có quyền System Admin (`role = ADMIN`).

## HTTP Method
- `PUT`

## Endpoint
- `/api/v1/admin/users/{id}/status`

## Request
- Path variable: `id`.
- Body: `status` (ACTIVE hoặc INACTIVE), `reason` (Lý do thay đổi - bắt buộc nếu INACTIVE).

## Validation
- Kiểm tra tài khoản tồn tại.
- Nếu đổi sang `INACTIVE`, hệ thống **BẮT BUỘC** phải thu hồi (revoke) toàn bộ Refresh Tokens và Access Tokens đang hoạt động của tài khoản này để buộc đăng xuất ngay lập tức.
- Ghi nhận Audit Log kèm theo `reason`.

## Response
- Thành công: Cập nhật thành công.

## API JSON Contract
### Request
```json
{
  "status": "INACTIVE",
  "reason": "Phát hiện spam đăng tin tuyển dụng giả mạo"
}
```

### Response
```json
{
  "status": 1,
  "message": "Đã vô hiệu hóa tài khoản và thu hồi các phiên đăng nhập",
  "data": null
}
```

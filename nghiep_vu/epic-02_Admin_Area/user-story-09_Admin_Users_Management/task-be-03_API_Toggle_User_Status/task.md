# Task BE API: Bật/Tắt trạng thái Người dùng

## Mục đích
Cung cấp API backend phục vụ US-09 - Admin vô hiệu hóa (INACTIVE) hoặc kích hoạt lại (ACTIVE) một tài khoản.

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

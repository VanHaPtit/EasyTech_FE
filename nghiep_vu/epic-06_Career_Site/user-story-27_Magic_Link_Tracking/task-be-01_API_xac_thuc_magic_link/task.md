# task-be-01_API_xac_thuc_magic_link

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-01 API xac thuc magic link.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: Verify Magic Link

## Mục đích
API xác thực token magic link của ứng viên.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Token phải hợp lệ và chưa hết hạn.
- Không yêu cầu Header Authorization (public API dành cho ứng viên).

## Endpoint đề xuất
- POST /api/v1/candidates/verify-magic-link

## API JSON Contract

### Request Body
```json
{
  "token": "magic_link_token",
  "email": "candidate@example.com"
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Xác thực magic link thành công.",
  "data": {
    "applicationId": 2001,
    "candidateName": "Tran Van B",
    "expiresAt": "2026-09-30T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Magic link không hợp lệ, đã hết hạn hoặc email xác minh không khớp.",
  "data": null
}
```

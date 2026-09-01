# task-be-01_API_xac_thuc_magic_link

## Mục đích
Xác định phạm vi backend cho task 'API xac thuc magic link' trong US-27 Magic Link Tracking, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

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

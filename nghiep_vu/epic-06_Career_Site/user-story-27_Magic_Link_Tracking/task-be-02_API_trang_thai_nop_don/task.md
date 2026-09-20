# task-be-02_API_trang_thai_nop_don

## Mục đích
Xác định phạm vi backend cho task 'API trang thai nop don' trong US-27 Magic Link Tracking, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- API chỉ trả về thông tin hạn chế dành riêng cho ứng viên đó.

## Endpoint đề xuất
- GET /api/v1/candidates/application-status

Query bắt buộc: `token` và `email`. Ví dụ: `/api/v1/candidates/application-status?token=magic_link_token&email=candidate%40example.com`.

## API JSON Contract

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy trạng thái hồ sơ ứng tuyển thành công.",
  "data": {
    "applicationId": 2001,
    "candidateName": "Tran Van B",
    "jobTitle": "Java Backend Developer",
    "applicationStatus": "ACTIVE",
    "currentStage": "Technical Interview",
    "companyName": "Tech A",
    "lastUpdatedAt": "2026-08-31T10:00:00",
    "expiresAt": "2026-09-30T10:00:00",
    "interviews": []
  }
}
```

`interviews` chỉ chứa thông tin lịch phỏng vấn cần hiển thị cho ứng viên, không bao gồm ghi chú nội bộ hoặc dữ liệu CV. Request không dùng Header Authorization; backend xác thực bằng cặp `token + email`.

### Response lỗi
```json
{
  "status": 0,
  "message": "Không thể lấy trạng thái hồ sơ từ magic link hiện tại.",
  "data": null
}
```

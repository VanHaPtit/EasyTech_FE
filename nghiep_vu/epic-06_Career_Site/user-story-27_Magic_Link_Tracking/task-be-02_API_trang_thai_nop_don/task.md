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

GET chỉ đọc cookie HttpOnly candidate_tracking_session do API verify cấp; không truyền token/email trên query. Thiếu/hết phiên trả 403, frontend yêu cầu mở lại link và xác minh. POST cùng endpoint nhận `{token,email}` để xác minh và cấp cookie. Nếu GET có tham số token hoặc email, kể cả rỗng và kể cả có cookie hợp lệ, trả 400 với thông báo yêu cầu dùng POST; ngừng tương thích GET query cũ (chốt ngày 22/10/2026). Response tra cứu thành công dùng no-store.

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

`interviews` chỉ chứa thông tin lịch phỏng vấn cần hiển thị cho ứng viên, không bao gồm ghi chú nội bộ hoặc dữ liệu CV. Request không dùng JWT HR; cookie tra cứu ánh xạ thông tin token/email đã xác minh trong Redis TTL và backend kiểm tra lại tính hợp lệ mỗi lần. Response thêm companySlug. Link bị xoay/hết hạn không được dùng tiếp dù cookie còn TTL.

### Response lỗi
```json
{
  "status": 0,
  "message": "Không thể lấy trạng thái hồ sơ từ magic link hiện tại.",
  "data": null
}
```

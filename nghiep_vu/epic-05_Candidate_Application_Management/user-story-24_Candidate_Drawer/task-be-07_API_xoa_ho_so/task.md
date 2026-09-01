# task-be-07_API_xoa_ho_so

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-07 API xoa ho so.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.



## User Story liên quan
- US-24 - Candidate Drawer (Hành động Xóa hồ sơ).

## Điều kiện tiên quyết
- User đã đăng nhập và có quyền quản lý hồ sơ ứng viên.
- Backend kiểm tra ownership của Application theo `company_id`.

## API contract

### DELETE /api/v1/applications/{applicationId}
- Mục đích: xóa cứng hồ sơ ứng viên.
- Request: path variable `applicationId`.
- Response: kết quả xóa thành công.

## Validation
- Ứng viên phải tồn tại và thuộc về quyền quản lý của công ty.

## State Transition
- Bản ghi `Application` bị xóa hoàn toàn khỏi DB.
- Bản ghi `Candidate` gốc có thể được giữ lại nếu dùng chung, nhưng liên kết ứng tuyển của họ vào Job này đã bị xóa sạch (kèm lịch sử đánh giá, điểm AI của Application đó).
- File CV (PDF) lưu trên Storage (S3/Cloud) phải bị xóa vĩnh viễn.

## Side Effects
- Ghi audit log hành động xóa hồ sơ ứng viên.
- Gọi API/Service dọn dẹp Storage để giải phóng dung lượng.

## Các trường hợp lỗi
- 400: request không hợp lệ.
- 401: chưa đăng nhập.
- 403: không có quyền xóa hồ sơ này.
- 404: không tìm thấy hồ sơ ứng viên.

## 3. API JSON Contract
**Endpoint:** `DELETE /api/v1/applications/{applicationId}`

### Request
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Xóa hồ sơ ứng viên và file CV thành công",
  "data": null
}
```

# Task BE API: API Company Public

## Mục đích
Cung cấp API backend phục vụ US-25 - Xem Career Site với contract rõ ràng và validate tại server.

## User Story liên quan
- US-25 - Xem Career Site.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- Endpoint public; Candidate không cần đăng nhập. Backend chỉ trả dữ liệu public hợp lệ theo trạng thái của Job/Career Site.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/public/companies/{companySlug}`

## Request
- Path variable `companySlug`.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Thông tin company public và branding Career Site.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Ghi audit log nếu task tạo/cập nhật/xóa dữ liệu nghiệp vụ.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `GET /api/v1/public/companies/{companySlug}`
**Mô tả:** Lấy thông tin công ty public và cấu hình branding cho Career Site.

### Request Body
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy thông tin Career Site thành công",
  "data": {
    "id": 101,
    "companyName": "EasyTech",
    "companySlug": "easytech",
    "logoUrl": "https://storage.easytech.vn/logos/easytech.png",
    "bannerUrl": "https://storage.easytech.vn/banners/easytech.png",
    "description": "Môi trường công nghệ năng động",
    "website": "https://easytech.vn",
    "publicEmail": "hr@easytech.vn",
    "publicPhone": "0901234567",
    "primaryColor": "#0EA5E9"
  }
}
```


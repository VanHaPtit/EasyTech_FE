# task-be-02_API_job_public

## Mục đích
Task này dùng để xử lý nghiệp vụ liên quan đến chức năng task-be-02 API job public.

## Mô tả chức năng chi tiết
Đây là module đảm nhận vai trò thực thi chức năng đã định nghĩa, đảm bảo luồng nghiệp vụ hoạt động chính xác.

# Task BE API: API Public Jobs

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
- `/api/v1/public/companies/{companySlug}/jobs`

## Request
- Query params: keyword, location, category, page, size.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Danh sách job public đang ACTIVE.
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
**Endpoint:** `GET /api/v1/public/companies/{companySlug}/jobs?keyword=frontend&location=HCM&page=1&limit=20`

### Request Body
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy danh sách tin tuyển dụng public thành công",
  "data": {
    "current_page": 1,
    "last_page": 1,
    "total": 1,
    "data": [
      {
        "id": 201,
        "title": "Frontend Dev",
        "slug": "frontend-dev",
        "location": "HCM",
        "workingType": "HYBRID",
        "employmentType": "FULL_TIME",
        "salaryMin": 15000000,
        "salaryMax": 30000000,
        "publishedAt": "2026-08-31T09:00:00"
      }
    ]
  }
}
```


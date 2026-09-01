# task-be-01_API_chi_tiet_job_public

## Mục đích
Xác định phạm vi backend cho task 'API chi tiet job public' trong US-26 Nop CV, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-26 - Nop CV.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- Endpoint public; Candidate không cần đăng nhập. Backend chỉ trả dữ liệu public hợp lệ theo trạng thái của Job/Career Site.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `GET`

## Endpoint
- `/api/v1/public/jobs/{jobSlug}`

## Request
- Path variable định danh job.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Chi tiết job.
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

**Endpoint:** `GET /api/v1/public/jobs/{jobSlug}`
**Mô tả:** Lấy chi tiết tin tuyển dụng public để candidate xem và nộp CV.

### Request Body
Không có request body.

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Lấy chi tiết tin tuyển dụng thành công",
  "data": {
    "id": 201,
    "title": "Frontend Dev",
    "slug": "frontend-dev",
    "description": "Tham gia phát triển sản phẩm EasyTech HRM.",
    "requirements": "Có kinh nghiệm React và TypeScript.",
    "benefits": "Lương cạnh tranh, môi trường linh hoạt.",
    "location": "HCM",
    "workingType": "HYBRID",
    "employmentType": "FULL_TIME",
    "salaryMin": 15000000,
    "salaryMax": 30000000,
    "company": {
      "id": 101,
      "companyName": "EasyTech",
      "companySlug": "easytech",
      "logoUrl": "https://storage.easytech.vn/logos/easytech.png"
    },
    "applicationForm": {
      "requirePhone": true,
      "requireCoverLetter": false,
      "questions": []
    }
  }
}
```

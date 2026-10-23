# Task BE API: API JD Writer Proxy

## Mục đích
Xác định phạm vi backend cho task 'API JD Writer Proxy' trong US-12 Tao Job AI JD, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-12 - Tao Job AI JD.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/ai/job-description/suggest`

## Request
- Thông tin Job `INACTIVE` (chưa công khai/bản nháp) và prompt bổ sung của HR.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); JD suggestion để HR review/chỉnh sửa.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không đổi Job Status.

## Side Effects
- Gọi AI service; lưu log usage nếu có.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `POST /api/v1/ai/job-description/suggest`
**Mô tả:** Sinh gợi ý JD bằng AI để HR review/chỉnh sửa trước khi lưu job.

### Request Body
```json
{
  "title": "Senior Frontend Developer",
  "categoryId": 1,
  "experienceLevel": "SENIOR",
  "workingType": "HYBRID",
  "prompt": "Nhấn mạnh kinh nghiệm ReactJS và TypeScript."
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Tạo gợi ý JD thành công",
  "data": {
    "suggestedDescription": "Mô tả công việc do AI đề xuất...",
    "suggestedRequirements": "Yêu cầu ứng viên do AI đề xuất...",
    "suggestedBenefits": "Phúc lợi đề xuất...",
    "provider": "SYSTEM_DEFAULT",
    "model": "gemini-runtime-model"
  }
}
```

## Chốt nguồn cấu hình model — 22/10/2026

- Thứ tự provider giữ nguyên: custom ACTIVE của doanh nghiệp → system default → lỗi rõ ràng khi không có provider khả dụng.
- `SYSTEM_DEFAULT` luôn lấy model từ `GEMINI_MODEL` (cấu hình `gemini.model`), không ưu tiên `model_name` của bản ghi seed trong DB.
- Custom provider ACTIVE tiếp tục dùng `model_name` riêng; nếu chưa có model riêng thì lấy model runtime làm dự phòng.
- `GEMINI_API_KEY`, `GEMINI_MODEL`, `GEMINI_FALLBACK_MODEL`, `GEMINI_BASE_URL` được bind tập trung qua `GeminiProperties`. Giá trị mặc định chỉ định nghĩa trong `application.yml`; không sửa migration cũ để đồng bộ model.
- Retry có giới hạn, fallback model và lỗi provider giữ nguyên. Không ghi API key/nội dung CV vào log; không đảm bảo provider luôn trả kết quả.
- Quy tắc này áp dụng chung cho AI JD và CV scoring dùng resolver; embedding vẫn dùng model embedding riêng, không dùng model text làm fallback.

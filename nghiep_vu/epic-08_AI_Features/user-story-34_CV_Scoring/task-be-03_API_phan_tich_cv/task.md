# task-be-03_API_phan_tich_cv

## Mục đích
Xác định contract backend cho API chấm điểm CV on-demand của US-34. API xử lý đồng bộ trong MVP, lưu kết quả vào `cv_analyses` và không tự quyết định trạng thái tuyển dụng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-34 - CV Scoring.

## Điều kiện tiên quyết
- User đã authentication và có quyền HR trong workspace.
- `applicationId` thuộc đúng `company_id` lấy từ JWT; backend không tin `companyId` do client gửi.
- Job của Application có `requiresCv = true`; Job không yêu cầu CV không thuộc phạm vi chấm điểm AI.
- Application có CV đã lưu trong Storage và Job còn dữ liệu JD cần phân tích.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/applications/{applicationId}/cv-analysis`
- `applicationId` là số JSON tương ứng PostgreSQL `BIGINT`/Java `Long`.
- `GET /api/v1/applications/{applicationId}/cv-analysis` đọc bản phân tích `COMPLETED` mới nhất để mở lại Candidate Drawer; nếu chưa có kết quả thì trả `200` với `data = null`, không gọi AI.

## Request
- Path variable `applicationId`; có thể kèm flag `rerun`.
- `rerun = true` tạo một lần phân tích mới; không xóa lịch sử phân tích trước.
- Đây là endpoint on-demand; không được gọi tự động khi Application được tạo.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.
- Nếu Job có `requiresCv = false`, trả `422` với thông báo Job không yêu cầu CV nên không thể chấm điểm AI; không đọc CV, gọi provider hoặc tạo bản ghi phân tích.
- Nếu Job có `requiresCv = true` nhưng Application không có CV hợp lệ, trả `422` và ghi nhận lần chạy thất bại theo contract hiện tại.

## Response
- Thành công: `BaseResponse(status = 1, message, data)`; chỉ trả `200 OK` sau khi kết quả đã được lưu.
- Thất bại: `BaseResponse(status = 0, message, data = null)` với message nêu rõ lỗi và cách xử lý.
- Không dùng `202 Accepted`, background worker, queue hoặc polling trong contract MVP.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Gọi AI CV scoring agent và lưu kết quả phân tích vào `cv_analyses`.
- Không tự đổi Application Status, Pipeline Stage hoặc Round Result.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 422: CV không thể trích xuất nội dung hoặc dữ liệu đầu vào không đủ; đồng thời lưu `status = FAILED`.
- 503: không resolve được provider hoặc provider upstream tạm thời không khả dụng.


## 3. API JSON Contract
**Endpoint:** `POST /api/v1/applications/{applicationId}/cv-analysis`

### Request Body
```json
{
  "rerun": false
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Phân tích CV thành công",
  "data": {
    "id": 701,
    "applicationId": 301,
    "matchingScore": 85.5,
    "matchedSkills": [
      "Java",
      "Spring Boot"
    ],
    "missingSkills": [
      "AWS"
    ],
    "strengths": [
      "Kinh nghiệm backend tốt"
    ],
    "weaknesses": [
      "Chưa có nhiều kinh nghiệm cloud"
    ],
    "summary": "Ứng viên phù hợp với yêu cầu backend Java.",
    "provider": "OPENAI",
    "providerSource": "CUSTOM",
    "status": "COMPLETED"
  }
}
```

---

## Trạng thái triển khai

- Backend MVP đã có PDF text extraction, Gemini REST adapter, provider resolution và lưu kết quả/lỗi vào `cv_analyses`.
- Endpoint vẫn giữ contract on-demand đồng bộ `200`; không tự chạy khi Application được tạo và không thay đổi Application Status/Pipeline Stage/Round Result.
- Live E2E với provider thật và PostgreSQL/Docker là bước nghiệm thu còn lại sau khi cấu hình key mới; unit test chỉ xác nhận logic và boundary của service.

---

## Thiết kế Database – Bảng cv_analyses

## Bảng/entity liên quan
- Bảng chính: `cv_analyses`.
- `ai_providers` là bảng cấu hình provider; `ai_suggestions` thuộc US-36 và không phải bảng lưu CV scoring.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng `BIGINT` cho khóa chính/khóa ngoại và Java `Long`; JSON/TypeScript dùng number. Không dùng UUID.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- Enum/status liên quan: `COMPLETED` cho kết quả thành công, `FAILED` cho lần chạy lỗi; `PENDING`/`PROCESSING` chỉ là trạng thái nội bộ nếu implementation cần. AI chỉ tạo recommendation; không tự đổi Application Status hoặc Round Result.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt `company_id`, `job_id`, `application_id`, `round_id`, `user_id`.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.
- Rerun tạo bản ghi phân tích mới; bản ghi thành công mới nhất là kết quả hiển thị mặc định, không xóa bản ghi cũ.

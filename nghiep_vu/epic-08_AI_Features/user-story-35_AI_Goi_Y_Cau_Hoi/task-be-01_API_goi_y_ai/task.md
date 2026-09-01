# task-be-01_API_goi_y_ai

## Mục đích
Xác định phạm vi backend cho task 'API goi y ai' trong US-35 AI Goi Y Cau Hoi, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## User Story liên quan
- US-35 - AI Goi Y Cau Hoi.

## Điều kiện tiên quyết
- User đã authentication nếu endpoint thuộc workspace/admin.
- User đã đăng nhập và có quyền thao tác trong company hiện tại. Backend kiểm tra role và ownership theo `company_id`.
- Dữ liệu phải thuộc đúng company_id hiện tại nếu là endpoint nội bộ.

## HTTP Method
- `POST`

## Endpoint
- `/api/v1/ai/interview-questions/suggest`

## Request
- Job, round, competency và context ứng viên nếu có.

## Validation
- Validate trường bắt buộc, format, độ dài và enum/status trực tiếp liên quan đến task.
- Không nhận trạng thái nhạy cảm từ client nếu trạng thái phải do hệ thống quyết định.
- Backend là nguồn chuẩn; Frontend validation chỉ hỗ trợ UX.

## Response
- Thành công: BaseResponse(status = 1, message, data); Danh sách câu hỏi gợi ý để HR chọn/chỉnh sửa.
- Thất bại: BaseResponse(status = 0, message, data = null) với message nêu rõ lỗi và cách xử lý.

## State Transition
- Không có state transition trực tiếp.

## Side Effects
- Gọi AI service; không tự lưu vào evaluation nếu HR chưa xác nhận.

## Các trường hợp lỗi
- 400: request không hợp lệ hoặc enum/status sai.
- 401: chưa đăng nhập hoặc token không hợp lệ.
- 403: không đủ quyền hoặc workspace bị hạn chế.
- 404: không tìm thấy tài nguyên trong phạm vi company hiện tại.
- 409: conflict như duplicate, trạng thái hiện tại không cho phép chuyển tiếp.


## 3. API JSON Contract

**Endpoint:** `POST /api/v1/ai/interview-questions/suggest`
**Mô tả:** Sinh danh sách câu hỏi phỏng vấn gợi ý theo job, round, competency và context ứng viên.

### Request Body
```json
{
  "jobId": 201,
  "roundId": 301,
  "applicationId": 401,
  "competencies": [
    "Java",
    "Spring Boot",
    "System Design"
  ],
  "difficulty": "SENIOR",
  "questionCount": 5
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Gợi ý câu hỏi phỏng vấn thành công",
  "data": {
    "provider": "OPENAI",
    "suggestions": [
      {
        "id": 1,
        "competency": "System Design",
        "question": "Bạn sẽ thiết kế hệ thống xử lý 10.000 hồ sơ ứng viên mỗi ngày như thế nào?",
        "expectedSignals": [
          "Biết phân tách service",
          "Có tư duy scale",
          "Có phương án quan sát hệ thống"
        ],
        "difficulty": "SENIOR"
      }
    ]
  }
}
```

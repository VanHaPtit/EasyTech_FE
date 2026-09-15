# task-fe-01_UI_tao_form_dong

## Mục đích
Xác định phạm vi frontend cho task 'UI tao form dong' trong US-15 Dynamic Form, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Hiển thị giao diện và trạng thái tương ứng với nghiệp vụ của user story, gồm loading, empty, success và error state khi cần.
- Thu thập dữ liệu người dùng, validate ở mức UI để cải thiện trải nghiệm và gọi đúng API dependency đã mô tả.
- Hiển thị phản hồi rõ ràng cho người dùng, giữ dữ liệu đang nhập khi có lỗi hợp lệ và điều hướng theo đúng flow nghiệp vụ.
- Không tự quyết định trạng thái nghiệp vụ nhạy cảm; frontend tuân theo response và quyền do backend trả về.

## Screen/Component
- Component chính: Form Builder.
- Hiển thị trong wizard tạo Job và modal chỉnh sửa Job của HR; dùng pattern layout, spacing, control và toast của EasyTech_FE.
- Form Builder hỗ trợ thêm, sửa, xóa mềm, kéo-thả hoặc nút lên/xuống để sắp xếp field. Field `SELECT` có editor danh sách options.
- Dữ liệu phải tôn trọng multi-tenant và role hiện tại.

## Hành động của user
- Người dùng mở màn hình và thực hiện hành động chính của component.
- Không tự thực hiện hành động có rủi ro nếu người dùng chưa xác nhận.

## Hành vi UI
- Hiển thị dữ liệu hiện tại, trạng thái rỗng, lỗi và trạng thái loading.
- Vô hiệu hóa nút submit/save/action trong lúc request đang chạy để tránh gửi lặp.
- Với hành động có ảnh hưởng trực tiếp của task, hiển thị xác nhận khi cần.

## Validation
- Validate trường bắt buộc ngay trên FE để cải thiện UX.
- Không coi FE validation là source-of-truth; BE vẫn phải validate lại.
- Hiển thị lỗi gần trường nhập liệu và không xóa dữ liệu user đã nhập khi validation không đạt.

## Phản hồi thành công
- Hiển thị toast hoặc trạng thái xác nhận sau khi hành động thành công.
- Điều hướng theo flow cụ thể của user story.

## Xử lý lỗi
- Hiển thị lỗi có thể hành động được: điều gì sai và user cần sửa gì.
- Hiển thị lỗi từ API theo đúng ngữ cảnh và giữ dữ liệu user đang thao tác nếu có thể.

## API dependency cụ thể
- `GET /api/v1/jobs/{jobId}/form-fields`
- `POST /api/v1/jobs/{jobId}/form-fields`
- `PUT /api/v1/jobs/{jobId}/form-fields/{fieldId}`
- `PUT /api/v1/jobs/{jobId}/form-fields/reorder`
- `DELETE /api/v1/jobs/{jobId}/form-fields/{fieldId}`
- `GET /api/v1/public/companies/{companySlug}/jobs/{jobSlug}` để hiển thị field tùy chỉnh trong flow apply; API submit thuộc US-26.

Khi tạo Job, frontend tạo Job trước rồi lưu lần lượt các field với Job ID trả về. Nếu lưu field thất bại, phải báo rõ Job đã tạo nhưng form chưa hoàn chỉnh và cho phép vào chỉnh sửa lại; không giả vờ hiển thị thành công toàn bộ.

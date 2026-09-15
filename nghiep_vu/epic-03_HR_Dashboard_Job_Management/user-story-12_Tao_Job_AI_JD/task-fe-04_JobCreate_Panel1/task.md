# Task FE: JobCreate Panel1

## Mục đích
Xác định phạm vi frontend cho task 'JobCreate Panel1' trong US-12 Tao Job AI JD, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Hiển thị giao diện và trạng thái tương ứng với nghiệp vụ của user story, gồm loading, empty, success và error state khi cần.
- Thu thập dữ liệu người dùng, validate ở mức UI để cải thiện trải nghiệm và gọi đúng API dependency đã mô tả.
- Hiển thị phản hồi rõ ràng cho người dùng, giữ dữ liệu đang nhập khi có lỗi hợp lệ và điều hướng theo đúng flow nghiệp vụ.
- Không tự quyết định trạng thái nghiệp vụ nhạy cảm; frontend tuân theo response và quyền do backend trả về.

## Screen/Component
- Component chính: JobCreate Panel1.
- Hiển thị trong đúng route/layout của epic hiện tại.
- Dữ liệu phải tôn trọng multi-tenant và role hiện tại.

## Hành động của user
- Người dùng mở màn hình và thực hiện hành động chính của component.
- Không tự thực hiện hành động có rủi ro nếu người dùng chưa xác nhận.

## Hành vi UI
- Hiển thị dữ liệu hiện tại, trạng thái rỗng, lỗi và trạng thái loading.
- Vô hiệu hóa nút submit/save/action trong lúc request đang chạy để tránh gửi lặp.
- Hiển thị trường **Danh mục** bằng select theo hierarchy, spacing và style của mockup `EasyTech_FE`; dữ liệu lấy từ `GET /api/v1/job-categories` và chỉ cho chọn category `ACTIVE` chưa xóa mềm.
- Khi catalog category đang loading, lỗi, rỗng hoặc retry, không làm mất dữ liệu HR đã nhập ở các field khác.
- Nút **Lưu bản nháp** gọi `POST /api/v1/jobs`; không cho frontend tự truyền `status`.
- Với hành động có ảnh hưởng trực tiếp của task, hiển thị xác nhận khi cần.

## Validation
- Validate trường bắt buộc ngay trên FE để cải thiện UX.
- Không coi FE validation là source-of-truth; BE vẫn phải validate lại.
- Hiển thị lỗi gần trường nhập liệu và không xóa dữ liệu user đã nhập khi validation không đạt.

## Phản hồi thành công
- Hiển thị toast hoặc trạng thái xác nhận sau khi hành động thành công.
- Điều hướng theo flow cụ thể của user story.
- Sau khi tạo thành công, điều hướng tới `/dashboard/jobs/{id}` bằng ID thật trong response, không dùng mock ID.

## Xử lý lỗi
- Hiển thị lỗi có thể hành động được: điều gì sai và user cần sửa gì.
- Hiển thị lỗi từ API theo đúng ngữ cảnh và giữ dữ liệu user đang thao tác nếu có thể.

## API dependency cụ thể
- `GET /api/v1/jobs`, `GET /api/v1/jobs/{jobId}`, `POST /api/v1/jobs`, `PUT /api/v1/jobs/{jobId}`, `POST /api/v1/jobs/{jobId}/publish` tùy component.

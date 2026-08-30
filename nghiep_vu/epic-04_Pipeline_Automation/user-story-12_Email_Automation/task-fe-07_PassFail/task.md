# Task FE: PassFail

## Mục đích
Xây dựng screen/component phục vụ US-12 - Email automation, tập trung vào hành vi người dùng và trạng thái UI.

## Screen/Component
- Component chính: $title.
- Hiển thị trong đúng route/layout của epic hiện tại.
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
- `GET /api/v1/jobs/{jobId}/rounds`, `PATCH /api/v1/jobs/{jobId}/rounds/reorder`, `POST /api/v1/applications/{applicationId}/rounds/{roundId}/evaluate`, `POST /api/v1/applications/{applicationId}/interviews`.

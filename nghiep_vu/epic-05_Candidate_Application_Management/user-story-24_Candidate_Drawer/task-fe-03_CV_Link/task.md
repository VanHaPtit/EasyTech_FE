# Task FE: CV Link

## Mục đích
Xác định phạm vi frontend cho task 'CV Link' trong US-24 Candidate Drawer, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Hiển thị giao diện và trạng thái tương ứng với nghiệp vụ của user story, gồm loading, empty, success và error state khi cần.
- Thu thập dữ liệu người dùng, validate ở mức UI để cải thiện trải nghiệm và gọi đúng API dependency đã mô tả.
- Hiển thị phản hồi rõ ràng cho người dùng, giữ dữ liệu đang nhập khi có lỗi hợp lệ và điều hướng theo đúng flow nghiệp vụ.
- Không tự quyết định trạng thái nghiệp vụ nhạy cảm; frontend tuân theo response và quyền do backend trả về.

## Screen/Component
- Component chính: CV Link.
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
- `GET /api/v1/applications?jobId={jobId}&page={page}&limit={limit}` để lấy danh sách theo Job đang `ACTIVE`.
- `GET /api/v1/applications/{applicationId}/cv` để tải CV PDF riêng tư bằng phiên HR hiện tại.

## Contract UI xem CV
- Trong Candidate Drawer, chỉ hiển thị nút **Xem CV PDF** khi list response có `hasCv = true`; không render `cvUrl` hoặc storage key từ dữ liệu API.
- Frontend gọi endpoint CV với `responseType = blob`, tạo Object URL tạm để nhúng preview trong modal/iframe; có thể mở tab mới từ cùng Object URL.
- Khi đóng Drawer/modal, đổi ứng viên hoặc retry, phải revoke Object URL cũ để tránh giữ dữ liệu CV trong bộ nhớ trình duyệt.
- Phải có trạng thái loading, lỗi có nút thử lại, trường hợp chưa có CV và nút đóng rõ ràng.

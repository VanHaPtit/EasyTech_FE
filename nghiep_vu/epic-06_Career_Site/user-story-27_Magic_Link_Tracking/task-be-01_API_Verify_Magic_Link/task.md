# Task BE API: Verify Magic Link

## Mục đích
API xác thực token magic link của ứng viên.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Token phải hợp lệ và chưa hết hạn.
- Không yêu cầu Header Authorization (public API dành cho ứng viên).

## Endpoint đề xuất
- POST /api/v1/candidates/verify-magic-link

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.

# Task BE API: Get Application Status via Magic Link

## Mục đích
API trả về trạng thái hồ sơ ứng tuyển dựa trên magic link hợp lệ.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- API chỉ trả về thông tin hạn chế dành riêng cho ứng viên đó.

## Endpoint đề xuất
- GET /api/v1/candidates/application-status

## API JSON Contract
- Bổ sung schema Request/Response chi tiết sau khi chốt thiết kế.

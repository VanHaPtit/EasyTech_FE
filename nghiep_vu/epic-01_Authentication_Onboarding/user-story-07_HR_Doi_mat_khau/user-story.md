

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Vào mục Đổi MK] --> B[Nhập MK cũ & MK mới]
    B --> C{Kiểm tra MK cũ}
    C -- Sai --> D[Báo lỗi]
    C -- Đúng --> E{MK mới hợp lệ?}
    E -- Không --> F[Lỗi định dạng]
    E -- Có --> G[Cập nhật Database]
    G --> H[Xóa Token cũ & Đăng xuất (Tùy chọn)]
```


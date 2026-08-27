# STORY-02 · HR Đăng ký tài khoản và hồ sơ doanh nghiệp

> **Epic:** [EP-01](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 3 · **Sprint:** Sprint 1

---

## User Story

> **Là** HR mới chưa có tài khoản,
> **Tôi muốn** đăng ký tài khoản và điền hồ sơ công ty qua 2 bước,
> **Để** gửi đơn xin sử dụng nền tảng EasyTech và chờ Admin duyệt.

---

## Luồng chi tiết

```
Bước 1 — Thông tin tài khoản:
  HR nhập: Họ tên, Email, Password, Confirm Password
  → Validate: email unique, password >= 8 ký tự, match confirm
  → Next

Bước 2 — Thông tin doanh nghiệp:
  HR nhập: Tên công ty, Lĩnh vực, Số điện thoại, Địa chỉ
  → Submit

POST /api/auth/register:
  → Tạo User (status chờ xét)
  → Tạo Business (status = PENDING)
  → Trả về token (vào trạng thái pending)

Redirect → /pending (màn hình chờ duyệt)
```

---

## Definition of Done

- [ ] Form 2 bước với validation đầy đủ
- [ ] Submit thành công → status `PENDING`, redirect `/pending`
- [ ] Dữ liệu lưu vào `users` + `businesses`
- [ ] Email duplicate → báo lỗi "Email đã được sử dụng"

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-02-01](./T-02-01_API_Register.md) | API `POST /api/auth/register` | `[BE]` | 2 |
| [T-02-02](./T-02-02_Register_Form.md) | Kết nối Register form 2 bước với API | `[FE]` | 2 |
| [T-02-03](./T-02-03_Pending_Screen.md) | Tạo màn hình "Chờ duyệt" `/pending` | `[FE]` | 1 |
| [T-02-04](./T-02-04_API_Me.md) | API `GET /api/auth/me` kiểm tra business status | `[BE]` | 1 |
| [T-02-05](./T-02-05_Redirect_Logic.md) | Logic redirect sau login theo status | `[FE]` | 1 |
| [T-02-06](./T-02-06_DB_Businesses.md) | Tạo bảng `businesses` | `[DB]` | 1 |

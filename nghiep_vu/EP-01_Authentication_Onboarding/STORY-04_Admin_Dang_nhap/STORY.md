# STORY-04 · Admin Đăng nhập riêng

> **Epic:** [EP-01](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 1 · **Sprint:** Sprint 1

---

## User Story

> **Là** Admin EasyTech,
> **Tôi muốn** đăng nhập vào khu vực quản trị riêng biệt tại `/admin`,
> **Để** quản lý danh sách doanh nghiệp đăng ký.

---

## Luồng chi tiết

```
Admin truy cập /admin/login
→ Nhập email + password (tài khoản seed sẵn)
→ POST /api/auth/login (dùng chung endpoint)
→ BE check role = ADMIN
→ FE lưu token, redirect /admin/dashboard
```

## Notes

- Dùng chung API login với HR nhưng FE check `role = ADMIN` để vào `/admin`
- AdminGuard redirect về `/admin/login` nếu role != ADMIN

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-04-01](./T-04-01_Admin_Login_FE.md) | Kết nối `AdminLogin.tsx` với API | `[FE]` | 1 |
| [T-04-02](./T-04-02_Admin_Guard.md) | Protect route `/admin` bằng AdminGuard | `[FE]` | 1 |
| [T-04-03](./T-04-03_Seed_Admin.md) | Seed tài khoản Admin mặc định | `[DB]` | 1 |

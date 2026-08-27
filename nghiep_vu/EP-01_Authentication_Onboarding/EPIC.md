# EP-01 · Authentication & Onboarding

> **Epic ID:** EP-01
> **Ưu tiên:** 🔴 Must
> **Tổng SP:** 9
> **Sprint:** Sprint 1

---

## Mục tiêu

Cung cấp cơ chế xác thực và onboarding cho hai nhóm actor chính của hệ thống:
- **HR** (Human Resource): đăng ký tài khoản, khai báo hồ sơ doanh nghiệp, chờ Admin duyệt
- **Admin EasyTech**: đăng nhập vào khu vực quản trị riêng biệt

Đây là **epic nền tảng** — toàn bộ epic khác phụ thuộc vào luồng này.

---

## Phạm vi

### In Scope
- Đăng nhập bằng email/password
- Đăng nhập bằng Google OAuth (HR)
- Đăng ký tài khoản HR + khai báo hồ sơ doanh nghiệp (2 bước)
- Trang chờ duyệt (Pending Screen)
- Onboarding cập nhật đầy đủ hồ sơ sau khi được duyệt
- Admin đăng nhập khu vực riêng (`/admin`)
- Route guard / Private Route bảo vệ các trang nội bộ
- Refresh token tự động (axios interceptor)

### Out of Scope
- Quên mật khẩu / Reset password (Phase 2)
- SSO doanh nghiệp (Phase 2)
- 2FA / MFA (Phase 2)

---

## Actors

| Actor | Mô tả |
|-------|-------|
| **HR** | Người dùng chính — quản lý tuyển dụng cho doanh nghiệp |
| **Admin** | Quản trị viên EasyTech — kiểm duyệt doanh nghiệp |
| **System** | Hệ thống tự động kiểm tra trạng thái, redirect |

---

## Technical Impact

| Layer | Ảnh hưởng |
|-------|-----------|
| **FE** | `AuthContext`, `useAuth`, `PrivateRoute`, `AdminGuard`, `LoginPage`, `RegisterPage`, `PendingPage`, `OnboardingPage`, axios interceptor |
| **BE** | `AuthController`, `AuthService`, JWT util, Spring Security config, `UserRepository`, `BusinessRepository` |
| **DB** | Bảng `users`, `businesses`, `business_profiles` |
| **INFRA** | Google OAuth credentials, JWT secret config |

---

## Danh sách Stories

| Story | Tên | Ưu tiên | SP |
|-------|-----|---------|-----|
| [STORY-01](./STORY-01_HR_Dang_nhap/STORY.md) | HR Đăng nhập vào hệ thống | 🔴 Must | 3 |
| [STORY-02](./STORY-02_HR_Dang_ky/STORY.md) | HR Đăng ký tài khoản và hồ sơ doanh nghiệp | 🔴 Must | 3 |
| [STORY-03](./STORY-03_HR_Onboarding/STORY.md) | HR Onboarding hồ sơ doanh nghiệp (sau khi được duyệt) | 🟡 Should | 2 |
| [STORY-04](./STORY-04_Admin_Dang_nhap/STORY.md) | Admin Đăng nhập riêng | 🔴 Must | 1 |

---

## Acceptance Criteria cấp Epic

- [ ] HR có thể đăng nhập thành công và truy cập `/dashboard`
- [ ] HR mới có thể đăng ký và được redirect đến trang chờ duyệt
- [ ] Sau khi Admin duyệt, HR có thể đăng nhập và vào dashboard
- [ ] Admin có thể đăng nhập vào `/admin` với role ADMIN
- [ ] Mọi route nội bộ đều được bảo vệ, tự động redirect khi chưa auth
- [ ] Token refresh hoạt động tự động, không cần login lại

---

## Luồng tổng quan

```
HR Mới:
  Register → [Pending] → Admin Approve → Login → Dashboard

HR Đã có tài khoản:
  Login (email/Google) → [Check status] → Dashboard | Pending

Admin:
  /admin/login → AdminDashboard
```

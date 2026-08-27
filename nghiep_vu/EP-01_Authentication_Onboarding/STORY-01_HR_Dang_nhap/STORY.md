# STORY-01 · HR Đăng nhập vào hệ thống

> **Epic:** [EP-01 Authentication & Onboarding](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 3
> **Sprint:** Sprint 1

---

## User Story

> **Là** HR (Human Resource),
> **Tôi muốn** đăng nhập vào hệ thống bằng email/password hoặc tài khoản Google,
> **Để** truy cập Dashboard quản trị tuyển dụng của công ty tôi.

---

## Luồng nghiệp vụ chi tiết

### Luồng 1: Đăng nhập bằng Email/Password

```
1. HR truy cập /login
2. HR nhập email + password → bấm "Đăng nhập"
3. FE validate form (required, email format)
4. FE gọi POST /api/auth/login { email, password }
5. BE verify credentials:
   a. Tìm user theo email → 404 nếu không tồn tại
   b. Compare password hash (BCrypt)
   c. Check business.status:
      - PENDING → trả về 403 + message "Tài khoản chưa được duyệt"
      - REJECTED → trả về 403 + message "Tài khoản đã bị từ chối"
      - BLOCKED → trả về 403 + message "Tài khoản bị khóa"
      - ACTIVE → tiếp tục
   d. Sinh accessToken (15 phút) + refreshToken (7 ngày)
6. FE nhận token → lưu vào localStorage (hoặc cookie httpOnly)
7. FE lưu user info vào AuthContext
8. FE redirect sang /dashboard
```

### Luồng 2: Đăng nhập bằng Google OAuth

```
1. HR bấm nút "Đăng nhập với Google"
2. Google OAuth flow (popup/redirect) → nhận idToken
3. FE gọi POST /api/auth/google { idToken }
4. BE verify idToken với Google API
5. Tìm hoặc tạo user theo google_id/email
6. Check business.status (tương tự luồng 1)
7. Sinh accessToken + refreshToken
8. FE lưu token → redirect /dashboard
```

### Luồng lỗi

```
- Sai password → Hiển thị "Email hoặc mật khẩu không đúng"
- Tài khoản PENDING → Redirect sang /pending
- Tài khoản REJECTED/BLOCKED → Hiển thị thông báo lý do
- Network error → "Không thể kết nối. Vui lòng thử lại."
```

---

## UI/UX Flow

```
/login
  ├── Tab "Đăng nhập"
  │     ├── Input: Email
  │     ├── Input: Password (show/hide toggle)
  │     ├── Button: "Đăng nhập" (loading state khi đang gọi API)
  │     └── Button: "Đăng nhập với Google" (Google OAuth)
  └── Tab "Đăng ký" → [STORY-02]
```

---

## Definition of Done (DoD)

- [ ] Đăng nhập thành công với email/password → redirect `/dashboard`
- [ ] Đăng nhập thành công với Google OAuth → redirect `/dashboard`
- [ ] Đăng nhập thất bại → hiển thị thông báo lỗi đúng loại
- [ ] Token được lưu và persist qua reload trang
- [ ] Route `/dashboard` được bảo vệ bằng Auth Guard (redirect `/login` nếu chưa auth)
- [ ] Axios interceptor tự động attach Authorization header
- [ ] Refresh token hoạt động khi access token hết hạn

---

## Acceptance Criteria

| # | Scenario | Expected |
|---|----------|----------|
| 1 | HR nhập đúng email/password | Redirect `/dashboard` |
| 2 | HR nhập sai password | Toast error "Email hoặc mật khẩu không đúng" |
| 3 | HR chưa được duyệt đăng nhập | Redirect `/pending` |
| 4 | HR đăng nhập Google lần đầu | Tạo account mới, redirect `/dashboard` hoặc `/pending` |
| 5 | Truy cập `/dashboard` khi chưa login | Redirect `/login` |
| 6 | Access token hết hạn | Auto refresh, không logout |

---

## Danh sách Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-01-01](./T-01-01_API_Login.md) | API `POST /api/auth/login` | `[BE]` | 2 |
| [T-01-02](./T-01-02_API_Google_OAuth.md) | API `POST /api/auth/google` | `[BE]` | 2 |
| [T-01-03](./T-01-03_AuthContext.md) | Tạo `AuthContext` + `useAuth` hook | `[FE]` | 2 |
| [T-01-04](./T-01-04_PrivateRoute.md) | Implement `PrivateRoute` HOC | `[FE]` | 1 |
| [T-01-05](./T-01-05_LoginForm.md) | Kết nối LoginPage với AuthService | `[FE]` | 2 |
| [T-01-06](./T-01-06_Google_Button.md) | Integrate Google OAuth button | `[FE]` | 2 |
| [T-01-07](./T-01-07_Refresh_Token.md) | Axios interceptor + refresh token | `[FE]` | 2 |
| [T-01-08](./T-01-08_DB_Users.md) | Tạo bảng `users` | `[DB]` | 1 |

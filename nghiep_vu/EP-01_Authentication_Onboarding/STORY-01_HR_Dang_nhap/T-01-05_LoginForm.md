# T-01-05 · Kết nối LoginPage với AuthService

> **Story:** [STORY-01 HR Đăng nhập](./STORY.md)
> **Tag:** `[FE]`
> **SP:** 2

---

## Mô tả

Thay thế mock data/hardcode trong `LoginPage.tsx` bằng gọi API thật thông qua `AuthService`. Xử lý đầy đủ loading state, error state và redirect.

## Files liên quan

| File | Action |
|------|--------|
| `src/pages/LoginPage.tsx` | MODIFY — kết nối form với AuthContext |
| `src/services/auth.service.ts` | [NEW] `AuthService.login()`, `AuthService.loginWithGoogle()` |
| `src/lib/axios.ts` | [NEW] Axios instance với base URL |

---

## AuthService

```typescript
// auth.service.ts
export const AuthService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
    return data;
  },
  loginWithGoogle: async (idToken: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post('/auth/google', { idToken });
    return data;
  }
};
```

## Form Handling

- Dùng `react-hook-form` + `zod` để validate
- Button bị vô hiệu hóa và hiển thị spinner khi `isSubmitting`
- Error message hiển thị dưới form (toast hoặc inline)
- Redirect logic sau login thành công dựa trên `businessStatus`

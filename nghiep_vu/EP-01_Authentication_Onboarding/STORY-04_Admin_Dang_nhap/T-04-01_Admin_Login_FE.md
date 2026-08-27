# T-04-01 · Kết nối AdminLogin.tsx với API

> **Story:** [STORY-04](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

## Files
| File | Action |
|------|--------|
| `src/pages/admin/AdminLogin.tsx` | MODIFY — gọi AuthService.login() |

## Logic
```tsx
const onSubmit = async (data) => {
  const result = await AuthService.login(data.email, data.password);
  if (result.user.role !== 'ADMIN') {
    toast.error('Không có quyền truy cập Admin');
    return;
  }
  // Store token, navigate to /admin/dashboard
};
```

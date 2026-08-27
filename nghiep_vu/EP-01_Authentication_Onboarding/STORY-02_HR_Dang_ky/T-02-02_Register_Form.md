# T-02-02 · Kết nối Register Form 2 bước với API

> **Story:** [STORY-02](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

---

## Mô tả

Implement form 2 bước trong `LoginPage.tsx` (tab Đăng ký). Kết nối với API register thực tế.

## Files

| File | Action |
|------|--------|
| `src/pages/LoginPage.tsx` | MODIFY — implement step form |
| `src/services/auth.service.ts` | Thêm `register()` method |

## Step Form Logic

```tsx
// Step 1: User Info
const step1Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"]
});

// Step 2: Company Info
const step2Schema = z.object({
  companyName: z.string().min(2),
  industry: z.string(),
  phone: z.string().regex(/^0\d{9}$/),
  address: z.string().min(5)
});

// On submit step 2: gọi AuthService.register()
```

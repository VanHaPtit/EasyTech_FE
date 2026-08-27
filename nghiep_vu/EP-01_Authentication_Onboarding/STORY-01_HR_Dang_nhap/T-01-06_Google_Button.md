# T-01-06 · Integrate Google OAuth Button

> **Story:** [STORY-01 HR Đăng nhập](./STORY.md)
> **Tag:** `[FE]`
> **SP:** 2

---

## Mô tả

Tích hợp nút đăng nhập Google thật sự vào LoginPage, thay thế mock `handleGoogleLogin`.

## Dependencies

```bash
npm install @react-oauth/google
```

## Files liên quan

| File | Action |
|------|--------|
| `src/main.tsx` | Wrap với `<GoogleOAuthProvider clientId={...}>` |
| `src/pages/LoginPage.tsx` | Dùng `useGoogleLogin` hook |
| `.env` | `VITE_GOOGLE_CLIENT_ID=...` |

---

## Implementation

```tsx
// LoginPage.tsx
import { useGoogleLogin } from '@react-oauth/google';

const loginWithGoogle = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    // Lấy idToken từ tokenResponse
    const { credential } = tokenResponse;
    await loginWithGoogle(credential); // AuthContext
  },
  onError: () => toast.error('Google đăng nhập thất bại')
});
```

## Notes

- Dùng `flow: 'implicit'` để nhận idToken trực tiếp
- Google Client ID phải được thêm vào `.env.local` (không commit)

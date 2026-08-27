# T-01-03 · Tạo `AuthContext` + `useAuth` hook

> **Story:** [STORY-01 HR Đăng nhập](./STORY.md)
> **Tag:** `[FE]`
> **SP:** 2

---

## Mô tả

Tạo React Context quản lý trạng thái xác thực toàn ứng dụng. Cung cấp `useAuth()` hook để mọi component có thể đọc thông tin user và gọi các action auth.

## Files liên quan

| File | Action |
|------|--------|
| `src/contexts/AuthContext.tsx` | [NEW] Context + Provider |
| `src/hooks/useAuth.ts` | [NEW] Custom hook |
| `src/types/auth.types.ts` | [NEW] Type definitions |
| `src/main.tsx` | Wrap App với `<AuthProvider>` |

---

## Interface

```typescript
// auth.types.ts
interface User {
  id: string;
  email: string;
  name: string;
  role: 'HR' | 'ADMIN';
  businessId: string;
  businessStatus: 'PENDING' | 'ACTIVE' | 'REJECTED' | 'BLOCKED';
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => void;
}
```

## Implementation Notes

- Khi mount, check localStorage cho token và tự động restore session
- `isLoading = true` trong khi đang verify token để tránh hiển thị màn hình chưa xác thực (flash of unauthenticated content)
- Persist user info vào localStorage để không bị mất khi reload
- `logout()` xóa token + user info, redirect `/login`

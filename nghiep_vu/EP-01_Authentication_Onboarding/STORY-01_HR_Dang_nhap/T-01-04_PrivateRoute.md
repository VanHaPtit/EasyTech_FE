# T-01-04 · Implement `PrivateRoute` HOC

> **Story:** [STORY-01 HR Đăng nhập](./STORY.md)
> **Tag:** `[FE]`
> **SP:** 1

---

## Mô tả

Higher-Order Component bảo vệ các route nội bộ. Nếu user chưa đăng nhập, redirect về `/login`. Nếu đã đăng nhập nhưng business chưa active, redirect về `/pending`.

## Files liên quan

| File | Action |
|------|--------|
| `src/components/auth/PrivateRoute.tsx` | [NEW] |
| `src/router/index.tsx` | Wrap protected routes |

---

## Implementation

```tsx
// PrivateRoute.tsx
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  
  if (isLoading) return <FullPageSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.businessStatus === 'PENDING') return <Navigate to="/pending" replace />;
  
  return <>{children}</>;
};
```

## Router Setup

```tsx
// router/index.tsx
<Route path="/dashboard/*" element={
  <PrivateRoute>
    <DashboardLayout />
  </PrivateRoute>
} />
```

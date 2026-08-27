# T-04-02 · AdminGuard Route Protection

> **Story:** [STORY-04](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

## Implementation
```tsx
const AdminGuard = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};
```

## Router
```tsx
<Route path="/admin/*" element={<AdminGuard><AdminLayout /></AdminGuard>} />
```

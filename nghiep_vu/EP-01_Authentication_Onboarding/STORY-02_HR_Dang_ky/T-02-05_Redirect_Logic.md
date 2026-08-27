# T-02-05 · Logic Redirect Sau Login Theo Status

> **Story:** [STORY-02](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

---

## Mô tả

Sau khi login thành công, redirect đến đúng trang dựa trên `businessStatus`.

## Logic

```typescript
// AuthContext — sau khi login thành công
const handlePostLogin = (user: User) => {
  switch (user.businessStatus) {
    case 'ACTIVE':
      navigate('/dashboard');
      break;
    case 'PENDING':
      navigate('/pending');
      break;
    case 'REJECTED':
      toast.error('Tài khoản đã bị từ chối. Liên hệ support.');
      logout();
      break;
    case 'BLOCKED':
      toast.error('Tài khoản bị khóa. Liên hệ support.');
      logout();
      break;
  }
};
```

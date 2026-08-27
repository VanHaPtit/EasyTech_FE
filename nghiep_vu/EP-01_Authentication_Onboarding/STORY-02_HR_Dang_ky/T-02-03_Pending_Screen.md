# T-02-03 · Màn hình "Chờ duyệt" `/pending`

> **Story:** [STORY-02](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

---

## Mô tả

Tạo trang hiển thị khi HR đã đăng ký nhưng business.status = PENDING.

## Files

| File | Action |
|------|--------|
| `src/pages/PendingPage.tsx` | [NEW] |
| `src/router/index.tsx` | Thêm route `/pending` |

## UI

```
🕐 Đang chờ xét duyệt

Cảm ơn bạn đã đăng ký!
Chúng tôi đang xem xét hồ sơ doanh nghiệp của bạn.
Thời gian xét duyệt thường là 1-2 ngày làm việc.

Bạn sẽ nhận được email thông báo khi hồ sơ được duyệt.

[Đăng xuất]
```

- Route này accessible khi đã login nhưng business status = PENDING
- Nếu reload và business đã ACTIVE → redirect `/dashboard`

# T-05-07 · Kết nối Action Buttons (Approve/Reject/Block)

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

---

## Xử lý từng action

### Approve
Hiển thị dialog xác nhận → gọi `AdminService.approveBusiness(id)` → invalidate query để làm mới danh sách.

### Reject
Mở modal nhập lý do từ chối (bắt buộc, tối thiểu 20 ký tự) → gọi `AdminService.rejectBusiness(id, reason)`.

### Block
Hiển thị dialog xác nhận kèm cảnh báo "Sẽ ẩn tất cả job ACTIVE của DN này" → gọi `AdminService.blockBusiness(id)`.

## Optimistic Update

Cập nhật UI ngay lập tức trước khi API phản hồi để trải nghiệm mượt hơn:

```tsx
// Sau khi approve thành công
queryClient.setQueryData(['admin-businesses', filters], (old) => ({
  ...old,
  content: old.content.map(biz =>
    biz.id === businessId ? { ...biz, status: 'ACTIVE' } : biz
  )
}));
```

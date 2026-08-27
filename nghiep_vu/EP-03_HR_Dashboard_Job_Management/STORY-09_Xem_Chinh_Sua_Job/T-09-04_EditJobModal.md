# T-09-04 · Kết nối EditJobModal với API update

> **Story:** [STORY-09](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

## Files

| File | Action |
|------|--------|
| `src/components/jobs/EditJobModal.tsx` | MODIFY |

## Xử lý submit

```tsx
const onSubmit = async (data: EditJobForm) => {
  try {
    await JobService.updateJob(jobId, data);
    queryClient.invalidateQueries(['job', jobId]); // Làm mới dữ liệu
    onClose();
    toast.success('Đã cập nhật tin tuyển dụng thành công');
  } catch (error) {
    toast.error('Cập nhật thất bại. Vui lòng thử lại.');
  }
};
```

## Lưu ý

- Prefill form với data hiện tại của job
- Chỉ submit những field đã thay đổi (dirty fields)

# T-12-07 · Kết nối nút Pass/Fail trong CandidateDrawer
> **Story:** [STORY-12](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

## Files
| File | Action |
|------|--------|
| `src/components/candidates/CandidateDrawer.tsx` | MODIFY |

## Implementation
```tsx
const handleEvaluate = async (result: 'PASS' | 'FAIL') => {
  const confirmed = await showConfirm({
    title: result === 'PASS' ? 'Xác nhận Pass' : 'Xác nhận Fail',
    message: result === 'PASS'
      ? 'Ứng viên sẽ chuyển sang vòng tiếp theo và nhận email thông báo.'
      : 'Ứng viên sẽ bị loại và nhận email từ chối.'
  });
  
  if (!confirmed) return;
  
  await ApplicationService.evaluate(applicationId, result);
  onClose(); // Đóng drawer
  queryClient.invalidateQueries(['applications']); // Refresh board
  toast.success(result === 'PASS' ? 'Đã chuyển ứng viên sang vòng tiếp theo' : 'Đã từ chối ứng viên');
};
```

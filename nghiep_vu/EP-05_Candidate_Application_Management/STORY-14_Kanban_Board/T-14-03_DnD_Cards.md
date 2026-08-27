# T-14-03 · Drag & Drop card giữa các cột
> **Story:** [STORY-14](./STORY.md) · **Tag:** `[FE]` · **SP:** 3

Khi drag card sang cột khác, tự động gọi evaluate API:
```tsx
const handleDragEnd = async (event) => {
  const { active, over } = event;
  const newStatus = getStatusFromColumnId(over.id);
  const result = mapStatusToResult(newStatus); // NEW→skip, PASSED→PASS, REJECTED→FAIL
  
  if (result) {
    await ApplicationService.evaluate(active.id, result);
    queryClient.invalidateQueries(['applications']);
  }
};
```

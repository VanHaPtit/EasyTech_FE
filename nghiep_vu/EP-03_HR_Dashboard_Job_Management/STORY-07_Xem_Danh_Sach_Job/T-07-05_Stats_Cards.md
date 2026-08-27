# T-07-05 · Kết nối 4 thẻ Stats Cards

> **Story:** [STORY-07](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

## Implementation
```tsx
const { data: stats } = useQuery({
  queryKey: ['job-stats', businessId],
  queryFn: JobService.getStats
});
// 4 thẻ: Tổng / ACTIVE / INACTIVE / CLOSED
```

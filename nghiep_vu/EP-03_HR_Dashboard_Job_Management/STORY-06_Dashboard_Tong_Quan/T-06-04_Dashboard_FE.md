# T-06-04 · Kết nối Dashboard.tsx với 3 API

> **Story:** [STORY-06](./STORY.md) · **Tag:** [FE] · **SP:** 3

## Files
| File | Action |
|------|--------|
| `src/pages/Dashboard.tsx` | MODIFY — thay mock data |
| `src/services/dashboard.service.ts` | [NEW] |

## Implementation
```tsx
// Dùng Promise.all để fetch song song
const [stats, chart, topJobs] = await Promise.all([
  DashboardService.getStats(),
  DashboardService.getChart(6),
  DashboardService.getTopJobs(5)
]);
```

## States
- `isLoading` → hiển thị skeleton cards
- `isError` → hiển thị error banner với retry button

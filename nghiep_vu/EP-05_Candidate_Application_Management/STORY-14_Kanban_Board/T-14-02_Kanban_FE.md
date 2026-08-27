# T-14-02 · Kết nối Kanban.tsx với API
> **Story:** [STORY-14](./STORY.md) · **Tag:** `[FE]` · **SP:** 3

## Logic
```tsx
const { data: applications } = useApplications({ jobId, status });

const columns = {
  NEW: applications?.filter(a => a.status === 'NEW') || [],
  IN_PROGRESS: applications?.filter(a => a.status === 'IN_PROGRESS') || [],
  PASSED: applications?.filter(a => a.status === 'PASSED') || [],
  REJECTED: applications?.filter(a => a.status === 'REJECTED') || []
};
```

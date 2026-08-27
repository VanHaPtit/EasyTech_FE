# T-12-08 · Refresh Kanban/List sau khi evaluate
> **Story:** [STORY-12](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

Sau khi evaluate, invalidate React Query cache để board tự động reload:
```tsx
queryClient.invalidateQueries({ queryKey: ['applications', jobId] });
```
Nếu dùng Kanban: card sẽ tự động move sang cột đúng.

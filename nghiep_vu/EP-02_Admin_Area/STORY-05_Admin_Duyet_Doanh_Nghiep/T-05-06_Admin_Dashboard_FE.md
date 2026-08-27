# T-05-06 · Kết nối AdminDashboard Table với API

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[FE]` · **SP:** 3

## Files
| File | Action |
|------|--------|
| `src/pages/admin/AdminDashboard.tsx` | MODIFY — thay mock data bằng API |
| `src/services/admin.service.ts` | [NEW] `getBusinesses()` |
| `src/hooks/useBusinesses.ts` | [NEW] Custom hook với React Query |

## Implementation

```tsx
// useBusinesses.ts
const useBusinesses = (filters: BusinessFilters) => {
  return useQuery({
    queryKey: ['admin-businesses', filters],
    queryFn: () => AdminService.getBusinesses(filters),
    staleTime: 30_000
  });
};

// AdminDashboard.tsx
const { data, isLoading, isError } = useBusinesses({ status, search, page });

// States to handle:
// isLoading → <TableSkeleton />
// isError → <ErrorState onRetry={refetch} />
// data.content.length === 0 → <EmptyState />
// data.content → <BusinessTable />
```

## Filter Tabs
```
[Tất cả] [Chờ duyệt] [Đang hoạt động] [Từ chối] [Bị khóa]
```

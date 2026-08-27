# T-05-08 · Kết nối Business Detail Drawer

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

## Files
| File | Action |
|------|--------|
| `src/components/admin/BusinessDetailDrawer.tsx` | MODIFY — gọi API thay mock |

## Implementation
```tsx
const { data: business, isLoading } = useQuery({
  queryKey: ['business-detail', businessId],
  queryFn: () => AdminService.getBusinessDetail(businessId),
  enabled: !!businessId
});
```

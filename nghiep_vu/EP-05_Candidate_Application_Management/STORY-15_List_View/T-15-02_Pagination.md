# T-15-02 · Pagination server-side
> **Story:** [STORY-15](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```tsx
// URL state: ?page=0&size=10
const [page, setPage] = useSearchParamsState('page', 0);
const { data } = useApplications({ ..., page, size: 10 });

<Pagination
  total={data?.totalElements}
  pageSize={10}
  current={page + 1}
  onChange={(p) => setPage(p - 1)}
/>
```

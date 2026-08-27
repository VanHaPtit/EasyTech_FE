# T-23-06 · Nút "Chạy lại phân tích"
> **Story:** [STORY-23](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```tsx
<Button variant="outline" size="sm" onClick={() => reAnalyze(applicationId)}>
  🔄 Chạy lại phân tích
</Button>

const reAnalyze = async (id) => {
  await ApplicationService.analyzeCV(id);
  // Poll hoặc invalidate query sau 5 giây
  setTimeout(() => queryClient.invalidateQueries(['application', id]), 5000);
};
```

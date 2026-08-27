# T-24-02 · Kết nối AISuggestionsModal với API
> **Story:** [STORY-24](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

Trong CandidateDrawer, nút [Gợi ý câu hỏi PV] → mở modal.
```tsx
const { data: suggestions, isLoading, refetch } = useQuery({
  queryKey: ['ai-suggestions', applicationId],
  queryFn: () => ApplicationService.getAISuggestions(applicationId),
  enabled: false  // Chỉ fetch khi user click
});

// Hiển thị:
// - Loading spinner khi đang generate
// - List câu hỏi kỹ thuật (có thể copy từng câu)
// - List câu hỏi behavioral
// - Nút [Copy tất cả]
```

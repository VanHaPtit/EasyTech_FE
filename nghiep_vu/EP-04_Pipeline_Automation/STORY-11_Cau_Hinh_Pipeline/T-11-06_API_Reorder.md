# T-11-06 · API `PUT /api/jobs/{id}/rounds/reorder`
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Request
```json
{ "orderedIds": ["round-uuid-3", "round-uuid-1", "round-uuid-2"] }
```

## Logic
- Gán lại `orderIndex` theo thứ tự trong mảng (index + 1)
- Cập nhật tất cả trong cùng một transaction (đảm bảo atomic)

```java
@Transactional
public void reorderRounds(UUID jobId, List<UUID> orderedIds) {
    for (int i = 0; i < orderedIds.size(); i++) {
        roundRepo.updateOrderIndex(orderedIds.get(i), i + 1);
    }
}
```

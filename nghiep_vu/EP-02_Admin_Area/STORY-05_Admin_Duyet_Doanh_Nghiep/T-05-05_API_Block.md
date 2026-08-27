# T-05-05 · API `PUT /api/admin/businesses/{id}/block`

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Endpoint
```
PUT /api/admin/businesses/{id}/block
Authorization: Bearer {adminToken}
```

## Logic
```java
biz.setStatus(BLOCKED);
// Tự động: unpublish tất cả job ACTIVE của DN này
jobRepo.updateStatusByBusinessId(businessId, INACTIVE);
auditLogService.log(adminId, "BLOCK_BUSINESS", businessId);
```

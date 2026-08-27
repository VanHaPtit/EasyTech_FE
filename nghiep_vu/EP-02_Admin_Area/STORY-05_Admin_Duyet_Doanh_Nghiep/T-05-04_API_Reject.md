# T-05-04 · API `PUT /api/admin/businesses/{id}/reject`

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Endpoint
```
PUT /api/admin/businesses/{id}/reject
Authorization: Bearer {adminToken}
Content-Type: application/json
```

## Request
```json
{ "reason": "Hồ sơ không đầy đủ, thiếu thông tin địa chỉ công ty" }
```

## Response (200)
```json
{ "id": "biz-uuid", "status": "REJECTED", "rejectedReason": "..." }
```

## Logic
```java
biz.setStatus(REJECTED);
biz.setRejectedReason(reason);
businessRepo.save(biz);
auditLogService.log(adminId, "REJECT_BUSINESS", businessId, reason);
```

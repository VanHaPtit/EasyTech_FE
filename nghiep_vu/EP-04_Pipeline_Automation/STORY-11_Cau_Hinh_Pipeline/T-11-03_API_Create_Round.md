# T-11-03 · API `POST /api/jobs/{id}/rounds`
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Request
```json
{
  "name": "Technical Interview",
  "passEmailTemplateId": "tpl-uuid",
  "failEmailTemplateId": "tpl-uuid-2"
}
```

## Logic
- Tự động tính `orderIndex = max(orderIndex) + 1` trong job đó
- Xác thực rằng job thuộc về business của HR (dựa trên `businessId` trong JWT)

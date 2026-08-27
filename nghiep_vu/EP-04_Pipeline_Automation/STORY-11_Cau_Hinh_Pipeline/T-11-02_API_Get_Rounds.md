# T-11-02 · API `GET /api/jobs/{id}/rounds`
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Response (200)
```json
[
  {
    "id": "round-uuid",
    "name": "CV Review",
    "orderIndex": 1,
    "passEmailTemplate": { "id": "tpl-uuid", "name": "Pass - Mời PV vòng 2" },
    "failEmailTemplate": { "id": "tpl-uuid", "name": "Fail - Cảm ơn đã ứng tuyển" }
  }
]
```

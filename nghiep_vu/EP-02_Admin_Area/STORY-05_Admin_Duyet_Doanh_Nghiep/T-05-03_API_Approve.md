# T-05-03 · API `PUT /api/admin/businesses/{id}/approve`

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Endpoint
```
PUT /api/admin/businesses/{id}/approve
Authorization: Bearer {adminToken}
```

## Response (200)
```json
{
  "id": "biz-uuid",
  "status": "ACTIVE",
  "careerSiteSlug": "cong-ty-abc",
  "approvedAt": "2026-08-27T15:00:00"
}
```

## Business Logic

```java
@Transactional
public void approveBusiness(UUID businessId, UUID adminId) {
    Business biz = businessRepo.findById(businessId).orElseThrow();
    if (biz.getStatus() != PENDING) throw new IllegalStateException("Chỉ duyệt business PENDING");
    
    biz.setStatus(ACTIVE);
    businessRepo.save(biz);
    
    // Tạo career site
    String slug = SlugUtil.generate(biz.getName()); // "cong-ty-abc"
    CareerSiteSettings site = new CareerSiteSettings(businessId, slug);
    careerSiteRepo.save(site);
    
    // Audit log
    auditLogService.log(adminId, "APPROVE_BUSINESS", businessId);
}
```

## Slug Generation
- Vietnamese text → normalize (bỏ dấu) → lowercase → replace spaces với "-"
- VD: "Công ty ABC" → "cong-ty-abc"
- Nếu slug đã tồn tại → thêm suffix: "cong-ty-abc-2"

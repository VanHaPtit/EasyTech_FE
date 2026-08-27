# T-05-10 · Tạo Career Site tự động khi Approve

> **Story:** [STORY-05](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Logic (thực hiện trong T-05-03 Approve endpoint)
```java
// CareerSiteService.java
public CareerSiteSettings createForBusiness(UUID businessId, String businessName) {
    String baseSlug = SlugUtil.toSlug(businessName); // "cong-ty-abc"
    String slug = ensureUniqueSlug(baseSlug);
    
    CareerSiteSettings settings = CareerSiteSettings.builder()
        .businessId(businessId)
        .slug(slug)
        .isActive(true)
        .build();
    
    return careerSiteRepo.save(settings);
}
```

## Bảng `career_site_settings`
```sql
CREATE TABLE career_site_settings (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id   UUID UNIQUE NOT NULL REFERENCES businesses(id),
    slug          VARCHAR(255) UNIQUE NOT NULL,
    primary_color VARCHAR(7) DEFAULT '#0052cc',
    banner_url    TEXT,
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT NOW()
);
```

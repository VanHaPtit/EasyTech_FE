# T-20-02 · API CRUD Email Templates
> **Story:** [STORY-20](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

```
GET    /api/email-templates           → List tất cả templates của business
POST   /api/email-templates           → Tạo mới
PUT    /api/email-templates/{id}      → Cập nhật
DELETE /api/email-templates/{id}      → Xóa (không xóa được default templates)
GET    /api/email-templates/{id}/preview → Render với biến mẫu
```

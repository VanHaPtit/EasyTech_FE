# T-18-01 · API `GET /api/public/jobs/{slug}`
> **Story:** [STORY-18](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Endpoint (Public - Không cần xác thực)
```
GET /api/public/jobs/senior-backend-dev
```

## Mô tả
Endpoint public, trả về đầy đủ thông tin job bao gồm description (Markdown), requirements, benefits và thông tin công ty.

## Response (200)
```json
{
  "id": "job-uuid",
  "title": "Senior Backend Developer",
  "description": "## About the Role\n...",
  "requirements": "## Yêu cầu\n...",
  "benefits": "## Quyền lợi\n...",
  "location": "TP.HCM",
  "jobType": "FULL_TIME",
  "salaryMin": 30000000,
  "salaryMax": 50000000,
  "publishedAt": "2026-08-20",
  "company": {
    "name": "Công ty ABC",
    "logoUrl": "/uploads/logos/...",
    "slug": "cong-ty-abc"
  }
}
```

## Lưu ý
- Chỉ trả về job có `status = ACTIVE`
- Nếu job không tồn tại hoặc không public → 404

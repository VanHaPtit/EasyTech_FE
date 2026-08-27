# T-17-01 · API `GET /api/public/companies/{slug}`
> **Story:** [STORY-17](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

## Endpoint (Public - No Auth)
```
GET /api/public/companies/cong-ty-abc
```

## Response (200)
```json
{
  "name": "Công ty ABC",
  "slug": "cong-ty-abc",
  "industry": "IT",
  "logoUrl": "/uploads/logos/...",
  "description": "Chúng tôi là...",
  "website": "https://abc.com",
  "address": "TP.HCM",
  "primaryColor": "#0052cc"
}
```

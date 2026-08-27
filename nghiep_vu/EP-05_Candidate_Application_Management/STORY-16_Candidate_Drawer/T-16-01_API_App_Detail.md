# T-16-01 · API `GET /api/applications/{id}` chi tiết đầy đủ

> **Story:** [STORY-16](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Response (200)
```json
{
  "id": "app-uuid",
  "candidate": {
    "id": "cand-uuid",
    "name": "Nguyễn Văn B",
    "email": "b@gmail.com",
    "phone": "0901234567",
    "cvUrl": "/uploads/cv/b-cv.pdf",
    "appliedAt": "2026-08-20"
  },
  "job": { "id": "job-uuid", "title": "Senior Backend Dev" },
  "status": "IN_PROGRESS",
  "currentRound": { "id": "round-uuid", "name": "Technical Interview", "orderIndex": 2 },
  "roundHistory": [
    { "roundName": "CV Review", "result": "PASS", "evaluatedAt": "2026-08-21" }
  ],
  "aiAnalysis": {
    "score": 78,
    "strengths": ["5 năm kinh nghiệm Spring Boot", "Đã làm dự án microservices"],
    "weaknesses": ["Thiếu kinh nghiệm Kubernetes"],
    "matchedSkills": ["Java", "Spring Boot", "PostgreSQL"],
    "missingSkills": ["Kubernetes", "Kafka"]
  },
  "emailHistory": [
    { "subject": "Chào mừng bạn ứng tuyển", "sentAt": "2026-08-20", "status": "SENT" }
  ],
  "interviews": [
    { "scheduledAt": "2026-09-05T14:00:00", "location": "Google Meet", "responseStatus": "CONFIRMED" }
  ]
}
```

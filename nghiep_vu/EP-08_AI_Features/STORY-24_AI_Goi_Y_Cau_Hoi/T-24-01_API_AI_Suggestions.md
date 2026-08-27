# T-24-01 · API `POST /api/applications/{id}/ai-suggestions`

> **Story:** [STORY-24](./STORY.md) · **Tag:** `[BE]` `[AI]` · **SP:** 2

## Endpoint
```
POST /api/applications/{id}/ai-suggestions
Authorization: Bearer {token}
```

## Response (200)
```json
{
  "interviewQuestions": [
    "Bạn có thể kể về một dự án microservices bạn đã làm không?",
    "Làm thế nào bạn xử lý distributed transactions trong hệ thống của bạn?",
    "Hãy giải thích cách bạn debug một vấn đề performance trong production."
  ],
  "technicalTopics": ["Spring Boot", "Microservices", "Database optimization"],
  "behavioralQuestions": [
    "Kể về một lần bạn phải học nhanh công nghệ mới để hoàn thành deadline."
  ]
}
```

## AI Prompt (Python Service)
```python
prompt = f"""Dựa trên CV và JD sau, gợi ý 5-7 câu hỏi phỏng vấn kỹ thuật 
và 2-3 câu hỏi behavioral phù hợp:

CV Summary: {cv_text[:1500]}
JD: {jd_text[:1000]}

Return JSON với: interviewQuestions, technicalTopics, behavioralQuestions"""
```

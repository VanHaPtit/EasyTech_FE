# T-19-02 · API verify token
> **Story:** [STORY-19](./STORY.md) · **Tag:** `[BE]` · **SP:** 1

```
GET /api/public/interviews/respond?token=abc123
Response: { schedule: { date, time, location }, candidate: { name }, job: { title } }
```
Trả về 410 Gone nếu token đã hết hạn.

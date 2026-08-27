# T-08-08 · Redirect dùng Job ID thật
> **Story:** [STORY-08](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

Sau khi lưu draft thành công (Panel 1), lưu `jobId` vào state. Sau khi hoàn tất wizard:
```tsx
navigate(`/dashboard/jobs/${jobId}/rounds`);
```
Bỏ hardcode `new-job-123`.

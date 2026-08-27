# T-08-04 · Kết nối Panel 1 form với API tạo job

> **Story:** [STORY-08](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

## Files
| File | Action |
|------|--------|
| `src/components/jobs/JobCreateWizard.tsx` | MODIFY — Panel 1 |
| `src/services/job.service.ts` | Thêm `createJob()` |

## Logic
```tsx
const onSaveDraft = async (formData: CreateJobForm) => {
  const job = await JobService.createJob(formData);
  setJobId(job.id); // Lưu ID thật để dùng cho các bước sau
  setCurrentPanel(2);
};
```

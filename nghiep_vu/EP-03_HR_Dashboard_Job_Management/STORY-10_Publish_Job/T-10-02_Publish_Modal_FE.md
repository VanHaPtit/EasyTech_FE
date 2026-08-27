# T-10-02 · Kết nối PublishJobModal với API
> **Story:** [STORY-10](./STORY.md) · **Tag:** `[FE]` · **SP:** 1

```tsx
const onPublish = async () => {
  try {
    await JobService.publishJob(jobId);
    setPublished(true); // trigger confetti
    queryClient.invalidateQueries(['job', jobId]);
  } catch (err) {
    if (err.code === 'PIPELINE_NOT_CONFIGURED') {
      toast.error('Cần cấu hình pipeline trước. Đi đến cấu hình →', {
        action: { label: 'Cấu hình', onClick: () => navigate(`/dashboard/jobs/${jobId}/rounds`) }
      });
    }
  }
};
```

# T-07-04 · Kết nối Jobs.tsx với API

> **Story:** [STORY-07](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

## Files
| File | Action |
|------|--------|
| `src/pages/Jobs.tsx` | MODIFY |
| `src/services/job.service.ts` | [NEW] `getJobs()`, `getJobStats()` |

## Features
- Debounced search (300ms delay)
- URL state cho filter + pagination (`useSearchParams`)
- Click row → navigate(`/dashboard/jobs/${id}`)
- [+ Tạo mới] → navigate(`/dashboard/jobs/new`)

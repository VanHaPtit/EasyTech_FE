# T-09-03 · Kết nối JobDetail.tsx với API
> **Story:** [STORY-09](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

## Files
| File | Action |
|------|--------|
| `src/pages/JobDetail.tsx` | MODIFY |

## Implementation
- Dùng `useParams()` lấy `jobId`
- Render description bằng `react-markdown`
- Hiển thị danh sách rounds (link đến /dashboard/jobs/{id}/rounds)
- Tab: [Tổng quan] [Ứng viên] [Vòng tuyển dụng]

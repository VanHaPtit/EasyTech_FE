# T-11-07 · Kết nối RoundsConfig.tsx với API
> **Story:** [STORY-11](./STORY.md) · **Tag:** `[FE]` · **SP:** 3

## Files
| File | Action |
|------|--------|
| `src/pages/RoundsConfig.tsx` | MODIFY |
| `src/services/round.service.ts` | [NEW] CRUD rounds |

## Features
- Load rounds từ API khi mount
- [+ Thêm vòng]: Expand inline form
- Confirm dialog trước khi xóa
- Hiển thị badge cảnh báo nếu chưa có template
- Disable [Publish] button nếu chưa có vòng nào

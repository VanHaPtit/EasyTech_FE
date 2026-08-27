# T-03-03 · Kết nối OnboardingPage với API

> **Story:** [STORY-03](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

## Files
| File | Action |
|------|--------|
| `src/pages/OnboardingPage.tsx` | MODIFY — kết nối API thật |
| `src/services/business.service.ts` | [NEW] `updateProfile()`, `uploadLogo()` |

## UI Features
- Form: tên, phone, địa chỉ, website, mô tả (textarea)
- Logo upload: drag-drop + preview ảnh sau khi upload
- Progress indicator (onboarding step)
- Submit → redirect `/dashboard`

## Logo Preview
```tsx
const [logoPreview, setLogoPreview] = useState<string | null>(null);

const handleLogoChange = async (file: File) => {
  const localUrl = URL.createObjectURL(file);
  setLogoPreview(localUrl); // preview ngay
  const { logoUrl } = await BusinessService.uploadLogo(businessId, file);
  // logoUrl từ server để lưu vào state
};
```

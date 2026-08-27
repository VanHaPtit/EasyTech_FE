# T-18-07 · Kết nối CareerApplyForm với API

> **Story:** [STORY-18](./STORY.md) · **Tag:** `[FE]` · **SP:** 2

---

## Files

| File | Action |
|------|--------|
| `src/pages/career/CareerApplyForm.tsx` | MODIFY |
| `src/services/career.service.ts` | Thêm `applyJob()` |

---

## Form (react-hook-form + zod)

```tsx
const applySchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
  coverLetter: z.string().optional(),
  cvFile: z.instanceof(File)
    .refine(f => f.size <= 5 * 1024 * 1024, 'File không được vượt quá 5MB')
    .refine(f => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(f.type), 'Chỉ chấp nhận PDF hoặc DOCX')
});
```

## Upload File

- Giao diện drag-and-drop + hiển thị tên file đã chọn
- Kiểm tra file trên FE trước khi submit (tránh gọi API thừa)
- Submit dưới dạng `multipart/form-data`

## Màn hình thành công

```tsx
{isSuccess && (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">🎉</div>
    <h2 className="text-2xl font-bold">Nộp hồ sơ thành công!</h2>
    <p className="text-muted-foreground mt-2">
      Chúng tôi sẽ xem xét hồ sơ và liên hệ lại với bạn trong vòng 3-5 ngày làm việc.
    </p>
  </div>
)}
```

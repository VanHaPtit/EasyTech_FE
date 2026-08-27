# T-INF-09 · Thống nhất màu Primary Color
> **Tag:** `[FE]` · **SP:** 1

## Quyết định

Chọn **`#0052cc`** (Blue) làm màu primary chính thức cho toàn bộ dự án.

## Công việc cần làm

1. Cập nhật `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#0052cc', hover: '#003d99' }
    }
  }
}
```

2. Cập nhật CSS variables trong `src/index.css`:
```css
:root {
  --color-primary: #0052cc;
  --color-primary-hover: #003d99;
}
```

3. Tìm và thay thế toàn bộ màu hardcode cũ `#47b1de` bằng `#0052cc` trong tất cả components.

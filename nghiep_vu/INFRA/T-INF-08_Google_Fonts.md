# T-INF-08 · Thêm Google Fonts (Inter)
> **Tag:** `[FE]` · **SP:** 1

Thêm vào `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Cập nhật `tailwind.config.ts`:
```ts
theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'] } } }
```

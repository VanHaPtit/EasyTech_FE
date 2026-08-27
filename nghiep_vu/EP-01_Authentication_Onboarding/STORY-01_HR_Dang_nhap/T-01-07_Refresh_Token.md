# T-01-07 · Axios Interceptor + Refresh Token Logic

> **Story:** [STORY-01 HR Đăng nhập](./STORY.md)
> **Tag:** `[FE]`
> **SP:** 2

---

## Mô tả

Cấu hình Axios instance với:
1. Request interceptor: tự động attach `Authorization: Bearer {token}` vào mọi request
2. Response interceptor: khi nhận 401, tự động gọi refresh token endpoint, retry request gốc

## Files liên quan

| File | Action |
|------|--------|
| `src/lib/axios.ts` | [NEW] Axios instance + interceptors |
| `src/services/auth.service.ts` | Thêm `refreshToken()` method |

---

## Implementation

```typescript
// axios.ts
const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
let isRefreshing = false;
let failedQueue: any[] = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      // Queue requests while refreshing
      // Call POST /api/auth/refresh
      // Retry original request with new token
      // If refresh fails → logout
    }
    return Promise.reject(error);
  }
);
```

## Refresh Token API

```
POST /api/auth/refresh
Body: { refreshToken: "..." }
Response: { accessToken: "...", expiresIn: 900 }
```

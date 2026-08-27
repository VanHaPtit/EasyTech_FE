# T-03-02 · API Upload Logo doanh nghiệp

> **Story:** [STORY-03](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

## Endpoint
```
POST /api/businesses/{id}/logo
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

## Request
```
Form field: file (image/png, image/jpeg, tối đa 2MB)
```

## Response (200)
```json
{ "logoUrl": "/uploads/logos/biz-uuid-logo.png" }
```

## Implementation

```java
// FileStorageService.java
public String saveLogo(MultipartFile file, UUID businessId) {
    // Validate: type = image/*, size <= 2MB
    // Generate filename: businessId + extension
    // Save to /uploads/logos/
    // Return public URL path
}
```

## Notes
- Lưu file vào thư mục `uploads/logos/` (local) hoặc S3 bucket
- Cập nhật `businesses.logo_url` sau khi upload thành công
- Xóa logo cũ nếu có

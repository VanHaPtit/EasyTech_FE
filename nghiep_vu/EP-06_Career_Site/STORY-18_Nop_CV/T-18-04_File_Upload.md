# T-18-04 · Upload CV lên Storage

> **Story:** [STORY-18](./STORY.md) · **Tag:** `[BE]` · **SP:** 2

---

## Validation

- Loại file: Chỉ chấp nhận PDF và DOCX (kiểm tra MIME type, không dựa vào extension)
- Kích thước file: Tối đa 5MB
- Tên file: Làm sạch (sanitize) để tránh lỗ hổng path traversal

---

## Cấu hình Storage

| Môi trường | Storage |
|------------|---------|
| **Dev** | Filesystem cục bộ: `/uploads/cv/` |
| **Prod** | S3-compatible (MinIO hoặc AWS S3) |

---

## Implementation

```java
// FileStorageService.java
public String uploadCV(MultipartFile file, UUID candidateId) {
    // Validate loại và kích thước file
    validateFile(file);
    
    // Tạo tên file an toàn
    String filename = candidateId + "_" + System.currentTimeMillis() + getExtension(file);
    
    // Lưu vào storage
    Path targetPath = uploadDir.resolve(filename);
    Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
    
    return "/uploads/cv/" + filename; // URL công khai
}

private void validateFile(MultipartFile file) {
    String contentType = file.getContentType();
    if (!List.of("application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
            .contains(contentType)) {
        throw new ValidationException("Chỉ chấp nhận file PDF hoặc DOCX");
    }
    if (file.getSize() > 5 * 1024 * 1024) {
        throw new ValidationException("File không được vượt quá 5MB");
    }
}
```

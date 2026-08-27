# T-04-03 · Seed tài khoản Admin mặc định

> **Story:** [STORY-04](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

## SQL Seed

```sql
-- Seed admin account (password: Admin@123)
INSERT INTO users (id, email, password_hash, name, role, is_active)
VALUES (
    gen_random_uuid(),
    'admin@easytech.vn',
    '$2a$10$...bcrypt_hash_of_Admin@123...',
    'EasyTech Admin',
    'ADMIN',
    true
);
```

## Notes
- Password phải được hash bằng BCrypt với strength = 10
- Có thể dùng Flyway seed script: `V99__seed_admin.sql`
- Hoặc Spring Boot `ApplicationRunner` để seed lần đầu
- Tài khoản Admin không liên kết với bảng `businesses`

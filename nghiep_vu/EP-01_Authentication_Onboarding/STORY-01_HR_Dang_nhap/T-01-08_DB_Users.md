# T-01-08 · Tạo bảng `users`

> **Story:** [STORY-01 HR Đăng nhập](./STORY.md)
> **Tag:** `[DB]`
> **SP:** 1

---

## Mô tả

Tạo bảng `users` trong PostgreSQL để lưu thông tin tài khoản người dùng (HR và Admin).

## Schema

```sql
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),          -- NULL nếu chỉ dùng Google OAuth
    name        VARCHAR(255) NOT NULL,
    role        VARCHAR(20) NOT NULL CHECK (role IN ('HR', 'ADMIN')),
    google_id   VARCHAR(255) UNIQUE,     -- NULL nếu không dùng Google OAuth
    avatar_url  TEXT,
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);
```

## JPA Entity

```java
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String passwordHash;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // HR, ADMIN
    
    private String googleId;
    private String avatarUrl;
    private Boolean isActive = true;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp  
    private LocalDateTime updatedAt;
    
    @OneToOne(mappedBy = "user")
    private Business business;
}
```

## Migration

File: `V1__create_users_table.sql` (Flyway)

## Notes

- `password_hash` là nullable vì user đăng nhập bằng Google không có password
- Cần seed 1 Admin account mặc định: `admin@easytech.vn`

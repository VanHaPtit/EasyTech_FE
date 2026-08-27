# T-02-06 · Tạo bảng `businesses`

> **Story:** [STORY-02](./STORY.md) · **Tag:** `[DB]` · **SP:** 1

---

## Schema

```sql
CREATE TABLE businesses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID UNIQUE NOT NULL REFERENCES users(id),
    name            VARCHAR(255) NOT NULL,
    industry        VARCHAR(100),
    phone           VARCHAR(20),
    address         TEXT,
    website         VARCHAR(255),
    logo_url        TEXT,
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING'
                    CHECK (status IN ('PENDING','ACTIVE','REJECTED','BLOCKED')),
    rejected_reason TEXT,
    slug            VARCHAR(255) UNIQUE,  -- tạo khi Approve
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_businesses_slug ON businesses(slug);
```

## JPA Entity

```java
@Entity @Table(name = "businesses")
public class Business {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @OneToOne @JoinColumn(name = "user_id")
    private User user;
    
    private String name;
    private String industry;
    private String phone;
    private String address;
    private String website;
    private String logoUrl;
    
    @Enumerated(EnumType.STRING)
    private BusinessStatus status = BusinessStatus.PENDING;
    
    private String rejectedReason;
    private String slug;
    
    @CreationTimestamp private LocalDateTime createdAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
}
```

## Migration File

`V2__create_businesses_table.sql`

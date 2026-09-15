# T-INF-04 · DB Schema với Flyway Migration
> **Tag:** `[DB]` · **SP:** 3

Các migration hiện có trong repository `EasyTech_HRM`:
```
db/migration/
├── V1__init_auth_and_company_schema.sql
├── V2__align_auth_onboarding_and_audit.sql
├── V3__init_dashboard_tables.sql
├── V4__align_access_and_onboarding.sql
├── V5__registration_constraints.sql
├── V6__add_token_version.sql
├── V7__align_auth_onboarding_and_audit.sql
├── V8__align_access_and_onboarding.sql
├── V10__add_hiring_rounds.sql
└── V11__create_job_categories_and_category_fk.sql
```

Migration `V11__create_job_categories_and_category_fk.sql` tạo bảng
`job_categories`, index thứ tự/hiển thị và khóa ngoại `jobs.category_id` tới
`job_categories.id` với `ON DELETE SET NULL`. Bảng dùng `BIGINT`, `status`
(`ACTIVE`/`INACTIVE`) và `is_deleted` theo database convention; không dùng
`is_active`.

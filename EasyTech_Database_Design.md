# EasyTech Recruitment Platform - Database Design

## 1. Mục tiêu thiết kế

Database cần phục vụ các nghiệp vụ chính:

- Quản lý tài khoản Admin/HR.
- Quản lý doanh nghiệp đăng ký sử dụng hệ thống.
- Tách dữ liệu theo từng doanh nghiệp.
- Quản lý danh mục công việc.
- Quản lý tin tuyển dụng và lịch sử trạng thái.
- Quản lý pipeline/vòng tuyển dụng linh hoạt.
- Quản lý ứng viên và hồ sơ ứng tuyển.
- Lưu kết quả AI phân tích CV.
- Quản lý email template và lịch sử gửi email.
- Quản lý lịch phỏng vấn.
- Quản lý câu hỏi đánh giá từng vòng.
- Lưu cấu hình Career Site riêng cho từng doanh nghiệp.
- Lưu audit log cho các thao tác quan trọng.

Nguyên tắc quan trọng:

- Mọi dữ liệu nghiệp vụ của HR phải gắn với `business_id`.
- Admin không được truy vấn nội dung CV chi tiết của doanh nghiệp.
- Pipeline không hardcode số vòng.
- Email gửi ra phải trace được bằng `email_logs`.

---

## 2. Danh sách bảng chính

| Nhóm | Bảng | Mục đích |
| --- | --- | --- |
| Auth & Tenant | `users` | Lưu tài khoản Admin/HR. |
| Auth & Tenant | `businesses` | Lưu doanh nghiệp/tenant. |
| Auth & Tenant | `business_profiles` | Lưu thông tin hiển thị và branding doanh nghiệp. |
| Auth & Tenant | `career_site_settings` | Lưu cấu hình giao diện Career Site riêng từng DN. |
| Catalog | `job_categories` | Danh mục công việc (Technology, Finance, Marketing...). |
| Recruitment | `job_posts` | Lưu tin tuyển dụng. |
| Recruitment | `job_post_history` | Lưu lịch sử thay đổi trạng thái job (publish/close/edit). |
| Recruitment | `job_rounds` | Lưu các vòng tuyển dụng của từng job. |
| Recruitment | `form_evaluations` | Lưu câu hỏi/form đánh giá gắn với từng vòng. |
| Candidate | `candidates` | Lưu thông tin ứng viên. |
| Candidate | `applications` | Lưu đơn ứng tuyển của candidate vào job. |
| Candidate | `application_round_statuses` | Lưu trạng thái ứng viên qua từng vòng. |
| AI | `cv_analyses` | Lưu kết quả AI phân tích CV. |
| Email | `email_templates` | Lưu mẫu email. |
| Email | `email_logs` | Lưu lịch sử gửi email. |
| Interview | `interview_schedules` | Lưu lịch phỏng vấn. |
| System | `audit_logs` | Lưu log thao tác quan trọng. |
| System | `notifications` | Lưu thông báo nội bộ. |
| Settings | `ai_provider_configs` | Lưu cấu hình AI Provider/API Key. |

---

## 3. Thiết kế bảng chi tiết

### 3.1 `users`

Lưu tài khoản đăng nhập của Admin và HR.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID người dùng. |
| `business_id` | UUID/BIGINT | FK, nullable | Doanh nghiệp của HR. Admin có thể null. |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email đăng nhập. |
| `full_name` | VARCHAR(255) | NOT NULL | Họ tên. |
| `avatar_url` | TEXT | nullable | Avatar từ Google OAuth. |
| `google_id` | VARCHAR(255) | UNIQUE, nullable | ID Google OAuth. |
| `password_hash` | VARCHAR(255) | nullable | Dùng nếu có login email/password. |
| `role` | VARCHAR(50) | NOT NULL | `ADMIN`, `HR`. |
| `status` | VARCHAR(50) | NOT NULL | `ACTIVE`, `INACTIVE`, `BLOCKED`. |
| `last_login_at` | TIMESTAMP | nullable | Lần đăng nhập gần nhất. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Index: `idx_users_business_id`, `idx_users_email`, `idx_users_google_id`

---

### 3.2 `businesses`

Lưu thông tin doanh nghiệp/tenant.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID doanh nghiệp. |
| `name` | VARCHAR(255) | NOT NULL | Tên doanh nghiệp. |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | Slug dùng cho Career Site. |
| `subdomain` | VARCHAR(255) | UNIQUE, nullable | Subdomain, ví dụ `techa`. |
| `tax_code` | VARCHAR(100) | nullable | Mã số thuế nếu cần xác minh. |
| `phone` | VARCHAR(50) | nullable | Số điện thoại. |
| `email` | VARCHAR(255) | nullable | Email liên hệ. |
| `website` | VARCHAR(255) | nullable | Website công ty. |
| `address` | TEXT | nullable | Địa chỉ. |
| `status` | VARCHAR(50) | NOT NULL | `PENDING`, `ACTIVE`, `REJECTED`, `BLOCKED`. |
| `approved_by` | UUID/BIGINT | FK -> users.id, nullable | Admin duyệt. |
| `approved_at` | TIMESTAMP | nullable | Thời điểm duyệt. |
| `rejected_reason` | TEXT | nullable | Lý do từ chối. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Index: `idx_businesses_status`, `idx_businesses_slug`, `idx_businesses_subdomain`

---

### 3.3 `business_profiles`

Lưu branding và nội dung hiển thị cho Career Site.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID profile. |
| `business_id` | UUID/BIGINT | FK, UNIQUE, NOT NULL | Doanh nghiệp. |
| `logo_url` | TEXT | nullable | Logo. |
| `banner_url` | TEXT | nullable | Banner Career Site. |
| `primary_color` | VARCHAR(20) | nullable | Màu thương hiệu (hex). |
| `description` | TEXT | nullable | Mô tả công ty. |
| `benefits` | TEXT | nullable | Quyền lợi chung. |
| `social_links` | JSON/TEXT | nullable | Facebook, LinkedIn, Zalo. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

---

### 3.4 `career_site_settings` *(Mới)*

Lưu cấu hình giao diện Career Site riêng cho từng doanh nghiệp.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID config. |
| `business_id` | UUID/BIGINT | FK, UNIQUE, NOT NULL | Doanh nghiệp. |
| `site_title` | VARCHAR(255) | nullable | Tiêu đề trang Career Site. |
| `tagline` | VARCHAR(255) | nullable | Slogan hiển thị trên trang chủ. |
| `hero_image_url` | TEXT | nullable | Ảnh nền hero section. |
| `accent_color` | VARCHAR(20) | nullable | Màu nhấn (hex), ví dụ `#47b1de`. |
| `font_family` | VARCHAR(100) | nullable | Font hiển thị tùy chỉnh. |
| `show_company_description` | BOOLEAN | default true | Hiển thị mô tả công ty trên Career Site. |
| `show_benefits` | BOOLEAN | default true | Hiển thị quyền lợi. |
| `footer_text` | TEXT | nullable | Nội dung footer tùy chỉnh. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

---

### 3.5 `job_categories` *(Mới)*

Danh mục phân loại công việc.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID danh mục. |
| `name` | VARCHAR(255) | NOT NULL | Tên danh mục. Ví dụ: "Công nghệ thông tin". |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | Slug URL. Ví dụ: `technology`. |
| `icon` | VARCHAR(100) | nullable | Icon name (lucide). |
| `sort_order` | INT | default 0 | Thứ tự hiển thị. |
| `is_active` | BOOLEAN | default true | Đang hiển thị hay ẩn. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |

Dữ liệu mẫu:

| id | name | slug |
| -- | ---- | ---- |
| 1 | Công nghệ thông tin | technology |
| 2 | Tài chính / Kế toán | finance |
| 3 | Marketing / Sales | marketing |
| 4 | Nhân sự / Hành chính | hr |
| 5 | Thiết kế | design |
| 6 | Data / AI / ML | data-ai-ml |
| 7 | DevOps / Hạ tầng | devops |
| 8 | Backend / Java / Python | backend |

---

### 3.6 `job_posts`

Lưu tin tuyển dụng.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID job. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp sở hữu job. |
| `category_id` | UUID/BIGINT | FK -> job_categories.id, nullable | Danh mục công việc. |
| `created_by` | UUID/BIGINT | FK -> users.id | HR tạo job. |
| `title` | VARCHAR(255) | NOT NULL | Tên vị trí. |
| `slug` | VARCHAR(255) | NOT NULL | Slug public URL. |
| `description` | TEXT | NOT NULL | Mô tả công việc/JD (Markdown). |
| `requirements` | TEXT | nullable | Yêu cầu ứng viên. |
| `benefits` | TEXT | nullable | Quyền lợi. |
| `salary_min` | DECIMAL | nullable | Lương tối thiểu. |
| `salary_max` | DECIMAL | nullable | Lương tối đa. |
| `currency` | VARCHAR(10) | default `VND` | Đơn vị tiền: `VND`, `USD`. |
| `location` | VARCHAR(255) | nullable | Địa điểm làm việc. |
| `working_type` | VARCHAR(50) | nullable | `ONSITE`, `REMOTE`, `HYBRID`. |
| `employment_type` | VARCHAR(50) | nullable | `FULL_TIME`, `PART_TIME`, `CONTRACT`. |
| `experience_level` | VARCHAR(50) | nullable | `INTERN`, `JUNIOR`, `MID_LEVEL`, `SENIOR`, `LEAD`. |
| `experience_years_min` | INT | nullable | Số năm kinh nghiệm tối thiểu. |
| `round_count` | INT | default 1 | Số vòng phỏng vấn. |
| `status` | VARCHAR(50) | NOT NULL | `INACTIVE`, `ACTIVE`, `CLOSED`, `EXPIRED`. |
| `published_at` | TIMESTAMP | nullable | Ngày publish. |
| `closed_at` | TIMESTAMP | nullable | Ngày đóng. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Unique: `(business_id, slug)`

Index: `idx_job_posts_business_id`, `idx_job_posts_status`, `idx_job_posts_category_id`

---

### 3.7 `job_post_history` *(Mới)*

Lưu lịch sử thay đổi trạng thái của job (publish, close, edit...).

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID log. |
| `job_post_id` | UUID/BIGINT | FK, NOT NULL | Job liên quan. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp. |
| `actor_id` | UUID/BIGINT | FK -> users.id | HR thực hiện. |
| `action` | VARCHAR(100) | NOT NULL | `CREATED`, `PUBLISHED`, `CLOSED`, `EDITED`, `EXPIRED`. |
| `from_status` | VARCHAR(50) | nullable | Trạng thái trước thay đổi. |
| `to_status` | VARCHAR(50) | nullable | Trạng thái sau thay đổi. |
| `note` | TEXT | nullable | Ghi chú. |
| `created_at` | TIMESTAMP | NOT NULL | Thời điểm ghi log. |

Index: `idx_job_post_history_job_post_id`

---

### 3.8 `job_rounds`

Lưu pipeline/vòng tuyển dụng của từng job.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID vòng. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp. |
| `job_post_id` | UUID/BIGINT | FK, NOT NULL | Job chứa vòng này. |
| `name` | VARCHAR(255) | NOT NULL | Tên vòng. Ví dụ: `CV Screening`, `Online Test`. |
| `description` | TEXT | nullable | Mô tả vòng. |
| `order_index` | INT | NOT NULL | Thứ tự vòng (bắt đầu từ 0). |
| `pass_email_template_id` | UUID/BIGINT | FK -> email_templates.id, nullable | Template khi Pass. |
| `fail_email_template_id` | UUID/BIGINT | FK -> email_templates.id, nullable | Template khi Fail. |
| `test_link` | TEXT | nullable | Link bài test Online nếu có. |
| `is_final_round` | BOOLEAN | default false | Vòng cuối cùng (Offer). |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Unique: `(job_post_id, order_index)`

Lưu ý: Không hardcode số vòng. HR tự định nghĩa.

---

### 3.9 `form_evaluations` *(Mới)*

Lưu câu hỏi đánh giá/bài test gắn với từng vòng tuyển dụng.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID form. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp. |
| `job_round_id` | UUID/BIGINT | FK, NOT NULL | Vòng sử dụng form này. |
| `title` | VARCHAR(255) | NOT NULL | Tiêu đề form đánh giá. |
| `questions` | JSON/TEXT | NOT NULL | Mảng câu hỏi (dạng JSON). |
| `max_score` | INT | nullable | Điểm tối đa. |
| `pass_threshold` | INT | nullable | Điểm tối thiểu để pass. |
| `is_active` | BOOLEAN | default true | Form đang dùng hay đã hủy. |
| `created_by` | UUID/BIGINT | FK -> users.id | HR tạo form. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Cấu trúc JSON `questions` mẫu:
```json
[
  { "id": 1, "type": "TEXT", "question": "Mô tả kinh nghiệm với Java?", "required": true },
  { "id": 2, "type": "RATING", "question": "Tự đánh giá kỹ năng Spring Boot?", "min": 1, "max": 5 }
]
```

---

### 3.10 `candidates`

Lưu thông tin ứng viên. Candidate không nhất thiết có tài khoản đăng nhập.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID ứng viên. |
| `full_name` | VARCHAR(255) | NOT NULL | Họ tên. |
| `email` | VARCHAR(255) | NOT NULL | Email. |
| `phone` | VARCHAR(50) | nullable | Số điện thoại. |
| `avatar_url` | TEXT | nullable | Ảnh đại diện (nếu có). |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Index: `idx_candidates_email`

---

### 3.11 `applications`

Lưu đơn ứng tuyển của Candidate vào Job.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID hồ sơ ứng tuyển. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp nhận hồ sơ. |
| `job_post_id` | UUID/BIGINT | FK, NOT NULL | Job ứng tuyển. |
| `candidate_id` | UUID/BIGINT | FK, NOT NULL | Ứng viên. |
| `current_round_id` | UUID/BIGINT | FK -> job_rounds.id, nullable | Vòng hiện tại đang ở. |
| `current_round_index` | INT | default 0 | Index vòng hiện tại (0-based). |
| `cv_url` | TEXT | NOT NULL | Đường dẫn file CV (S3/local). |
| `cover_letter` | TEXT | nullable | Thư giới thiệu/ghi chú. |
| `status` | VARCHAR(50) | NOT NULL | `NEW`, `IN_PROGRESS`, `PASSED`, `REJECTED`, `HIRED`. |
| `source` | VARCHAR(100) | default `CAREER_SITE` | Nguồn ứng tuyển: `CAREER_SITE`, `MANUAL`, `REFERRAL`. |
| `applied_at` | TIMESTAMP | NOT NULL | Thời điểm ứng tuyển. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Unique: `(job_post_id, candidate_id)`

Index: `idx_applications_business_id`, `idx_applications_job_post_id`, `idx_applications_status`, `idx_applications_current_round_id`

---

### 3.12 `application_round_statuses`

Lưu lịch sử ứng viên đi qua từng vòng.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID trạng thái vòng. |
| `application_id` | UUID/BIGINT | FK, NOT NULL | Hồ sơ ứng tuyển. |
| `job_round_id` | UUID/BIGINT | FK, NOT NULL | Vòng tuyển dụng. |
| `status` | VARCHAR(50) | NOT NULL | `PENDING`, `PASSED`, `FAILED`, `SKIPPED`. |
| `score` | DECIMAL(5,2) | nullable | Điểm đánh giá (nếu có form). |
| `evaluated_by` | UUID/BIGINT | FK -> users.id, nullable | HR đánh giá. |
| `evaluated_at` | TIMESTAMP | nullable | Thời điểm đánh giá. |
| `note` | TEXT | nullable | Ghi chú đánh giá của HR. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Unique: `(application_id, job_round_id)`

---

### 3.13 `cv_analyses`

Lưu kết quả AI phân tích CV.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID phân tích. |
| `application_id` | UUID/BIGINT | FK, NOT NULL | Hồ sơ được phân tích. |
| `raw_text` | LONGTEXT/TEXT | nullable | Text trích xuất từ CV. |
| `summary` | TEXT | nullable | Tóm tắt CV. |
| `matching_score` | DECIMAL(5,2) | nullable | Điểm khớp 0–100. |
| `matched_skills` | JSON/TEXT | nullable | Kỹ năng khớp JD. |
| `missing_skills` | JSON/TEXT | nullable | Kỹ năng còn thiếu. |
| `strengths` | JSON/TEXT | nullable | Điểm mạnh. |
| `weaknesses` | JSON/TEXT | nullable | Điểm yếu. |
| `interview_questions` | JSON/TEXT | nullable | Câu hỏi phỏng vấn gợi ý. |
| `provider` | VARCHAR(100) | nullable | AI provider dùng để phân tích. |
| `status` | VARCHAR(50) | NOT NULL | `PENDING`, `COMPLETED`, `FAILED`. |
| `error_message` | TEXT | nullable | Lỗi nếu phân tích thất bại. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Index: `idx_cv_analyses_application_id`, `idx_cv_analyses_score`

---

### 3.14 `email_templates`

Lưu mẫu email của từng doanh nghiệp.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID template. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp sở hữu template. |
| `name` | VARCHAR(255) | NOT NULL | Tên template nội bộ. |
| `type` | VARCHAR(100) | NOT NULL | `APPLICATION_RECEIVED`, `PASS`, `FAIL`, `INTERVIEW_INVITE`, `OFFER`. |
| `subject` | VARCHAR(255) | NOT NULL | Tiêu đề email. |
| `body` | TEXT | NOT NULL | Nội dung email (hỗ trợ biến). |
| `is_default` | BOOLEAN | default false | Template mặc định cho loại này. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Biến hỗ trợ trong `subject` và `body`:

- `{{candidate_name}}`
- `{{job_title}}`
- `{{company_name}}`
- `{{interview_date}}`
- `{{test_link}}`
- `{{offer_salary}}`

---

### 3.15 `email_logs`

Lưu lịch sử gửi email.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID log. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp. |
| `application_id` | UUID/BIGINT | FK, nullable | Hồ sơ liên quan. |
| `email_template_id` | UUID/BIGINT | FK, nullable | Template đã dùng. |
| `recipient_email` | VARCHAR(255) | NOT NULL | Email người nhận. |
| `subject` | VARCHAR(255) | NOT NULL | Tiêu đề đã gửi. |
| `body` | TEXT | NOT NULL | Nội dung đã render (sau khi thay biến). |
| `status` | VARCHAR(50) | NOT NULL | `PENDING`, `SENT`, `FAILED`, `RETRYING`. |
| `provider` | VARCHAR(100) | nullable | SMTP / SendGrid / Mailtrap. |
| `error_message` | TEXT | nullable | Lỗi gửi email. |
| `sent_at` | TIMESTAMP | nullable | Thời điểm gửi thành công. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Index: `idx_email_logs_business_id`, `idx_email_logs_application_id`, `idx_email_logs_status`

---

### 3.16 `interview_schedules`

Lưu lịch phỏng vấn.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID lịch. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp. |
| `application_id` | UUID/BIGINT | FK, NOT NULL | Hồ sơ ứng tuyển. |
| `job_round_id` | UUID/BIGINT | FK, nullable | Vòng phỏng vấn. |
| `scheduled_by` | UUID/BIGINT | FK -> users.id | HR đặt lịch. |
| `interview_time` | TIMESTAMP | NOT NULL | Thời gian phỏng vấn. |
| `duration_minutes` | INT | nullable | Thời lượng dự kiến (phút). |
| `location` | VARCHAR(255) | nullable | Địa điểm hoặc link meet. |
| `note` | TEXT | nullable | Ghi chú nội bộ. |
| `candidate_note` | TEXT | nullable | Hướng dẫn gửi cho ứng viên. |
| `status` | VARCHAR(50) | NOT NULL | `SCHEDULED`, `ACCEPTED`, `RESCHEDULE_REQUESTED`, `CANCELLED`, `DONE`. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

---

### 3.17 `audit_logs`

Lưu thao tác quan trọng.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID log. |
| `business_id` | UUID/BIGINT | FK, nullable | Doanh nghiệp liên quan. |
| `actor_user_id` | UUID/BIGINT | FK -> users.id, nullable | Người thực hiện. |
| `actor_role` | VARCHAR(50) | nullable | Role tại thời điểm thao tác. |
| `action` | VARCHAR(100) | NOT NULL | `APPROVE_BUSINESS`, `PUBLISH_JOB`, `EVALUATE_APPLICATION`, `SEND_EMAIL`, ... |
| `target_type` | VARCHAR(100) | NOT NULL | Loại đối tượng bị tác động. |
| `target_id` | UUID/BIGINT | nullable | ID đối tượng. |
| `metadata` | JSON/TEXT | nullable | Dữ liệu bổ sung. |
| `created_at` | TIMESTAMP | NOT NULL | Thời điểm ghi log. |

---

### 3.18 `notifications`

Lưu thông báo nội bộ cho HR.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID thông báo. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp. |
| `user_id` | UUID/BIGINT | FK -> users.id, nullable | Người nhận cụ thể. |
| `title` | VARCHAR(255) | NOT NULL | Tiêu đề. |
| `content` | TEXT | nullable | Nội dung chi tiết. |
| `type` | VARCHAR(100) | nullable | `NEW_APPLICATION`, `ROUND_PASSED`, `INTERVIEW_REMINDER`, `JOB_EXPIRED`. |
| `link` | VARCHAR(255) | nullable | Đường dẫn liên quan (deeplink). |
| `is_read` | BOOLEAN | default false | Đã đọc chưa. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |

---

### 3.19 `ai_provider_configs`

Lưu cấu hình AI provider theo doanh nghiệp.

| Column | Type | Constraint | Mô tả |
| --- | --- | --- | --- |
| `id` | UUID/BIGINT | PK | ID config. |
| `business_id` | UUID/BIGINT | FK, NOT NULL | Doanh nghiệp. |
| `provider_name` | VARCHAR(100) | NOT NULL | OpenAI, Google, Anthropic... |
| `provider_code` | VARCHAR(100) | NOT NULL | `OPENAI`, `GOOGLE_GEMINI`, `ANTHROPIC`. |
| `api_key_encrypted` | TEXT | nullable | API key đã mã hóa AES-256. |
| `model_name` | VARCHAR(100) | nullable | Model sử dụng, ví dụ `gpt-4o`, `gemini-2.0-flash`. |
| `status` | VARCHAR(50) | NOT NULL | `ACTIVE`, `INACTIVE`. |
| `created_at` | TIMESTAMP | NOT NULL | Ngày tạo. |
| `updated_at` | TIMESTAMP | NOT NULL | Ngày cập nhật. |

Unique: `(business_id, provider_code)`

---

## 4. Quan hệ tổng quan

```text
businesses 1---n users
businesses 1---1 business_profiles
businesses 1---1 career_site_settings
businesses 1---n job_posts
businesses 1---n email_templates
businesses 1---n ai_provider_configs
businesses 1---n notifications

job_categories 1---n job_posts

job_posts 1---n job_rounds
job_posts 1---n applications
job_posts 1---n job_post_history

job_rounds 1---n application_round_statuses
job_rounds n---1 email_templates (pass_email_template_id)
job_rounds n---1 email_templates (fail_email_template_id)
job_rounds 1---1 form_evaluations

candidates 1---n applications

applications 1---n application_round_statuses
applications 1---n cv_analyses
applications 1---n email_logs
applications 1---n interview_schedules

users 1---n audit_logs
users 1---n job_post_history
```

---

## 5. Enum values chuẩn

### 5.1 Business status
```
PENDING → ACTIVE
PENDING → REJECTED
ACTIVE → BLOCKED
BLOCKED → ACTIVE
```

### 5.2 Job status
```
INACTIVE → ACTIVE (Publish)
ACTIVE → CLOSED (HR đóng thủ công)
ACTIVE → EXPIRED (Hết hạn tự động)
CLOSED → ACTIVE (Mở lại)
```

### 5.3 Application status
```
NEW → IN_PROGRESS (HR bắt đầu xét)
IN_PROGRESS → PASSED (Qua tất cả vòng)
IN_PROGRESS → REJECTED (Trượt)
PASSED → HIRED (Ký hợp đồng)
```

### 5.4 Application round status
```
PENDING → PASSED  (HR đánh giá Đạt)
PENDING → FAILED  (HR đánh giá Trượt)
PENDING → SKIPPED (Bỏ qua vòng)
```

### 5.5 Job working_type
```
ONSITE | REMOTE | HYBRID
```

### 5.6 Job employment_type
```
FULL_TIME | PART_TIME | CONTRACT
```

### 5.7 Job experience_level
```
INTERN | JUNIOR | MID_LEVEL | SENIOR | LEAD
```

### 5.8 Email template type
```
APPLICATION_RECEIVED  — Xác nhận đã nhận hồ sơ
PASS                  — Thông báo đạt vòng
FAIL                  — Thông báo trượt vòng
INTERVIEW_INVITE      — Mời phỏng vấn
OFFER                 — Thư mời nhận việc
```

### 5.9 Email log status
```
PENDING → SENT
PENDING → FAILED
FAILED → RETRYING
RETRYING → SENT | FAILED
```

### 5.10 Interview schedule status
```
SCHEDULED → ACCEPTED (Ứng viên xác nhận)
SCHEDULED → RESCHEDULE_REQUESTED (Ứng viên xin đổi)
SCHEDULED → CANCELLED
ACCEPTED → DONE
```

---

## 6. Lưu ý bảo mật dữ liệu

- Các bảng nghiệp vụ phải có `business_id` để lọc theo doanh nghiệp.
- API của HR luôn filter theo `business_id` lấy từ JWT token, không lấy từ request body.
- Admin chỉ xem metadata doanh nghiệp, không xem `applications.cv_url`, `cv_analyses.raw_text`.
- `api_key_encrypted` không trả nguyên văn về frontend (chỉ trả masked).
- File CV cần validate định dạng (PDF, DOCX) và dung lượng (tối đa 5MB).
- Các thao tác quan trọng phải ghi `audit_logs`.

---

## 7. Thứ tự tạo database đề xuất

1. `job_categories`
2. `businesses`
3. `users`
4. `business_profiles`
5. `career_site_settings`
6. `email_templates`
7. `job_posts`
8. `job_post_history`
9. `job_rounds`
10. `form_evaluations`
11. `candidates`
12. `applications`
13. `application_round_statuses`
14. `cv_analyses`
15. `email_logs`
16. `interview_schedules`
17. `ai_provider_configs`
18. `notifications`
19. `audit_logs`

---

## 8. MVP tối thiểu cho demo

Bắt buộc:

- `users`, `businesses`, `business_profiles`
- `job_categories`, `job_posts`, `job_rounds`
- `candidates`, `applications`, `application_round_statuses`
- `cv_analyses`, `email_templates`, `email_logs`
- `audit_logs`

Có thể để sau:

- `career_site_settings`, `job_post_history`, `form_evaluations`
- `interview_schedules`, `notifications`, `ai_provider_configs`

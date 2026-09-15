# T-INF-15: Áp dụng cơ chế Soft Delete

Thêm cờ `is_deleted = false` mặc định vào các API Get Data, và chuyển đổi API Delete thành Update `is_deleted = true` cho Jobs, Candidates, Hiring Rounds. Khi migration của US-07 được triển khai, `job_categories` cũng dùng cùng quy ước này. Trạng thái `ACTIVE`/`INACTIVE` của Job Category được lưu riêng ở cột `status`, không dùng `is_active`.

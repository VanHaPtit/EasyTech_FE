# T-INF-15: Áp dụng cơ chế Soft Delete

Thêm cờ `is_deleted = false` mặc định vào các API Get Data, và chuyển đổi API Delete thành Update `is_deleted = true` cho Jobs, Candidates, Hiring Rounds.
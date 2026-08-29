# 📋 User Story 03: HR Onboarding (Thiết Lập Hồ Sơ Công Ty Sau Khi Được Duyệt)

## 1. MÔ TẢ USER STORY
- **As a** Nhà tuyển dụng (HR) vừa được Admin phê duyệt,
- **I want to** hoàn thành bước Onboarding bằng cách thiết lập thông tin cơ bản cho công ty,
- **So that** tôi có thể bắt đầu sử dụng đầy đủ các tính năng của hệ thống và Career Site của công ty được hiển thị với thông tin chính xác.
- **Story Points:** 3

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Scenario 1: HR hoàn thành Onboarding lần đầu sau khi được duyệt**
  - **GIVEN** Admin vừa phê duyệt tài khoản HR, status chuyển từ `PENDING` → `ACTIVE`.
  - **WHEN** HR đăng nhập lần đầu tiên với tài khoản mới được duyệt.
  - **THEN** hệ thống kiểm tra `company_profiles.onboarding_completed = false` và tự động chuyển hướng đến trang Onboarding `/onboarding` thay vì Dashboard.

- **Scenario 2: HR điền thông tin Onboarding**
  - **GIVEN** HR đang ở trang Onboarding (multi-step form).
  - **WHEN** HR điền đầy đủ thông tin theo từng bước: Bước 1 – Thông tin công ty (mô tả, quy mô, ngành nghề, website); Bước 2 – Upload logo; Bước 3 – Thông tin liên hệ (địa chỉ, số điện thoại).
  - **THEN** sau mỗi bước hệ thống lưu tạm vào `company_profiles`. Khi HR nhấn "Hoàn thành" ở bước cuối, cập nhật `onboarding_completed = true` và chuyển đến Dashboard.

- **Scenario 3: HR bỏ qua Onboarding (Skip)**
  - **GIVEN** HR không muốn điền ngay khi đăng nhập lần đầu.
  - **WHEN** HR nhấn "Bỏ qua, tôi sẽ điền sau".
  - **THEN** hệ thống vẫn cập nhật `onboarding_completed = true` (để không bắt lại) và chuyển đến Dashboard.
  - Banner nhắc nhở "Hoàn thiện hồ sơ công ty" vẫn hiển thị trên Dashboard cho đến khi HR hoàn thiện đầy đủ thông tin.

- **Scenario 4: HR cũ (đã qua Onboarding) truy cập lại trang /onboarding**
  - **GIVEN** HR đã có `onboarding_completed = true`.
  - **WHEN** HR cố truy cập `/onboarding` trực tiếp qua URL.
  - **THEN** hệ thống redirect về `/dashboard`.

## 3. NGOÀI PHẠM VI (Out of Scope)
- **KHÔNG** bắt buộc HR phải upload logo trong bước Onboarding (tùy chọn).
- **KHÔNG** tích hợp verify thông tin công ty với dữ liệu doanh nghiệp nhà nước trong phiên bản này.

# 📋 User Story 30: Thông Tin Doanh Nghiệp (Company General Settings)

## 1. MÔ TẢ USER STORY
- **Là** Nhà tuyển dụng (HR Admin),
- **Tôi muốn** cập nhật hồ sơ doanh nghiệp của mình trong hệ thống (mô tả, website, địa chỉ, hotline, lĩnh vực, quy mô và thông tin hiển thị Career Site),
- **Để** dữ liệu công ty luôn chính xác, các báo cáo hoặc hóa đơn hiển thị đúng thông tin, và cài đặt hệ thống phù hợp với khu vực hoạt động.
- **Story Points:** 2

## SƠ ĐỒ LUỒNG NGHIỆP VỤ (Business Flow)

```mermaid
graph TD
    A[Mở giao diện 30 Thong Tin DN] --> B[Thực hiện thao tác]
    B --> C{Hệ thống xử lý}
    C -- Lỗi --> D[Báo lỗi]
    C -- Thành công --> E[Cập nhật CSDL]
    E --> F[Phản hồi giao diện thành công]
```

## 2. TIÊU CHÍ NGHIỆM THU (Acceptance Criteria)

- **Kịch bản 1: HR Admin xem và cập nhật thông tin công ty**
  - **VỚI ĐIỀU KIỆN** HR có quyền Admin truy cập `/dashboard/settings/general`.
  - **KHI** form hiển thị thông tin hiện tại. HR sửa một số trường như Tên công ty, Website, Số điện thoại và nhấn "Lưu thay đổi".
  - **THÌ** hệ thống xác thực dữ liệu, gọi API `PATCH /api/v1/company-profiles/me`, cập nhật database và hiển thị thông báo "Cập nhật thành công".
  - Tên công ty và mã số thuế là dữ liệu đăng ký; hiện chỉ hiển thị read-only ở màn này, không nằm trong request PATCH hồ sơ.
  - Các thông tin mới hiển thị ngay lập tức trên giao diện chung của Dashboard.
  - Địa chỉ có thể chọn tỉnh/thành phố rồi xã/phường từ dữ liệu `full_json_generated_data_vn_units.json`; database hiện vẫn lưu chuỗi địa chỉ đã ghép trong cột `companies.address`, chưa tách bảng địa giới.

- **Kịch bản 2: Quản lý Logo nội bộ**
  - **VỚI ĐIỀU KIỆN** HR đang ở trang Cài đặt thông tin.
  - **KHI** HR upload một logo (<= 2MB, JPG/PNG).
  - **THÌ** ảnh được tải lên thành công, thay thế logo cũ trên thanh điều hướng góc trái Dashboard.
  - Logo được gửi qua `POST /api/v1/company-profiles/me/logo` và hiện lưu vào cấu hình Career Site (`career_sites.logo_url`) để hiển thị trên site công khai.

- **Kịch bản 3: HR không có quyền Admin cố gắng chỉnh sửa**
  - **VỚI ĐIỀU KIỆN** HR (không có quyền Admin) truy cập trang này.
  - **KHI** trang hiển thị.
  - **THÌ** form hiển thị ở chế độ Chỉ đọc (chỉ xem), nút "Lưu thay đổi" và tính năng upload logo bị ẩn.

- **Kịch bản 4: Cập nhật Mã số thuế (Tax Code)**
  - **VỚI ĐIỀU KIỆN** HR Admin sửa Mã số thuế.
  - **KHI** lưu lại.
  - **THÌ** nếu Mã số thuế mới đã bị công ty khác đăng ký, hệ thống báo lỗi trùng lặp và không cho lưu.

## 3. NGOÀI PHẠM VI
- **KHÔNG** quản lý thông tin xuất hóa đơn đỏ (VAT Invoicing) chi tiết trong phiên bản MVP này.
- **KHÔNG** liên kết thay đổi tên công ty với các thông tin đã public trên Career Site (nếu thay đổi, phải chỉnh sửa ở trang Career Site Settings riêng).

# Danh Sách Các Tính Năng Giao Diện (UI Features) - EasyTech

Tài liệu này liệt kê các tính năng giao diện hiện đã được xây dựng (với dữ liệu giả lập - mock data) trong dự án Frontend `EasyTech_FE`, kèm theo đường dẫn (route) tương ứng.

## 1. Authentication & Onboarding (Đăng nhập & Khởi tạo)

| Tính năng | Đường dẫn (Route) | Component | Mô tả |
| :--- | :--- | :--- | :--- |
| **Đăng nhập** | `/login` | `LoginPage` | Giao diện đăng nhập dành cho HR và Admin. |
| **Onboarding** | `/onboarding` | `OnboardingPage` | Màn hình dành cho HR điền thông tin hồ sơ doanh nghiệp sau khi đăng nhập lần đầu. |

## 2. Admin Dashboard (Quản trị nền tảng)

| Tính năng | Đường dẫn (Route) | Component | Mô tả |
| :--- | :--- | :--- | :--- |
| **Dashboard Admin** | `/admin` | `AdminDashboard` | Khu vực dành cho quản trị viên EasyTech để duyệt/từ chối các doanh nghiệp đăng ký nền tảng. |

## 3. HR Dashboard (Quản trị doanh nghiệp)

Khu vực này dành cho HR quản lý tuyển dụng của công ty mình. Các route đều nằm dưới tiền tố `/dashboard`.

| Tính năng | Đường dẫn (Route) | Component | Mô tả |
| :--- | :--- | :--- | :--- |
| **Tổng quan thống kê** | `/dashboard` | `Dashboard` | Màn hình chính thống kê phễu tuyển dụng, xu hướng ứng tuyển, và hiệu suất AI. |
| **Danh sách Tin tuyển dụng** | `/dashboard/jobs` | `Jobs` | Bảng danh sách các vị trí đang tuyển, bản nháp, đã đóng. |
| **Tạo Tin tuyển dụng** | `/dashboard/jobs/create` | `JobCreateWizard` | Trình tạo job mới gồm 3 bước: nhập form, dùng AI viết JD, và xem trước (Preview). |
| **Chi tiết Tin tuyển dụng** | `/dashboard/jobs/:id` | `JobDetail` | Xem chi tiết thông tin của 1 job, cho phép chỉnh sửa hoặc Publish. |
| **Cấu hình Vòng phỏng vấn** | `/dashboard/jobs/:id/rounds` | `RoundsConfig` | Thiết lập số lượng vòng, tên vòng và kịch bản email Pass/Fail cho từng vòng của một job cụ thể. |
| **Bảng Kanban Ứng viên** | `/dashboard/applications/kanban` | `Kanban` | Quản lý trạng thái ứng viên bằng thao tác kéo thả qua các cột (Mới, Đang xử lý, Đạt, Không đạt). Mở rộng xem Drawer chi tiết ứng viên. |
| **Danh sách Ứng viên** | `/dashboard/applications/list` | `CandidatesList` | Xem danh sách ứng viên dưới dạng bảng dữ liệu truyền thống. |
| **Thông báo** | `/dashboard/notifications` | `NotificationsPage` | Xem các thông báo liên quan đến hoạt động tuyển dụng. |
| **Cài đặt Career Site** | `/dashboard/career-site` | `CareerSiteSettings` | Cấu hình nhận diện thương hiệu, màu sắc, logo cho trang tuyển dụng công khai của doanh nghiệp. |
| **Cài đặt hệ thống** | `/dashboard/settings` | `Settings` | Cấu hình thông tin công ty, mẫu email (Email Templates), cấu hình AI Provider. |

## 4. Career Site (Trang tuyển dụng công khai dành cho Ứng viên)

Khu vực public để ứng viên xem tin và nộp hồ sơ.

| Tính năng | Đường dẫn (Route) | Component | Mô tả |
| :--- | :--- | :--- | :--- |
| **Trang chủ Tuyển dụng** | `/careers` | `CareerHome` | Trang chủ chung hiển thị danh sách các công việc. |
| **Trang Tuyển dụng Doanh nghiệp** | `/company/:companySlug` | `CompanyCareerSitePage` | Trang Career Site được cấp phát riêng biệt mang thương hiệu của một doanh nghiệp cụ thể. |
| **Chi tiết Việc làm** | `/careers/jobs/:slug` | `CareerJobDetail` | Màn hình xem JD công khai của một tin tuyển dụng cụ thể. |
| **Form Ứng tuyển** | `/careers/jobs/:slug/apply` | `CareerApplyForm` | Form ứng viên điền thông tin và upload CV ứng tuyển. |
| **Tra cứu Hồ sơ** | `/careers/applications/track` | `CandidateTrackPage` | Trang để ứng viên nhập thông tin để theo dõi tình trạng ứng tuyển. |
| **Trạng thái Hồ sơ** | `/careers/applications/status` | `CandidateStatusPage` | Hiển thị trạng thái chi tiết hiện tại của một hồ sơ ứng viên. |
| **Phản hồi Phỏng vấn** | `/careers/interviews/respond` | `InterviewResponsePage` | Trang dành cho ứng viên thao tác Xác nhận Đồng ý hoặc Xin đổi lịch phỏng vấn từ email mời. |

---
*Tài liệu này được tạo dựa trên hệ thống Routes hiện tại của dự án `EasyTech_FE`.*

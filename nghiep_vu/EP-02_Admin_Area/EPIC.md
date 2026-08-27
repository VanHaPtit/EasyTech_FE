# EP-02 · Admin Area

> **Epic ID:** EP-02
> **Ưu tiên:** 🔴 Must
> **Tổng SP:** 5
> **Sprint:** Sprint 1

---

## Mục tiêu

Cung cấp khu vực quản trị dành riêng cho **Admin EasyTech** để kiểm duyệt các doanh nghiệp đăng ký sử dụng nền tảng. Admin có toàn quyền approve, reject hoặc block doanh nghiệp.

---

## Phạm vi

### In Scope
- Xem danh sách doanh nghiệp theo trạng thái (PENDING / ACTIVE / REJECTED / BLOCKED)
- Xem chi tiết hồ sơ doanh nghiệp
- Approve → kích hoạt doanh nghiệp, tự động tạo Career Site
- Reject → từ chối với lý do
- Block → khóa doanh nghiệp đang hoạt động
- Ghi Audit Log sau mỗi hành động

### Out of Scope
- Admin quản lý HR accounts (Phase 2)
- Admin xem analytics toàn hệ thống (Phase 2)
- Admin cấu hình platform settings (Phase 2)

---

## Actors

| Actor | Mô tả |
|-------|-------|
| **Admin** | Quản trị viên EasyTech duy nhất có quyền duyệt DN |

---

## Technical Impact

| Layer | Ảnh hưởng |
|-------|-----------|
| **FE** | `AdminDashboard.tsx`, `BusinessDetailDrawer.tsx`, các filter/pagination component |
| **BE** | `AdminController`, `BusinessService`, `AuditLogService`, `CareerSiteService` |
| **DB** | Bảng `businesses`, `audit_logs`, `career_site_settings` |

---

## Danh sách Stories

| Story | Tên | Ưu tiên | SP |
|-------|-----|---------|-----|
| [STORY-05](./STORY-05_Admin_Duyet_Doanh_Nghiep/STORY.md) | Admin xem danh sách doanh nghiệp và duyệt hồ sơ | 🔴 Must | 5 |

---

## Business Rules

- Chỉ account có `role = ADMIN` mới truy cập được `/admin`
- Khi Approve: `business.status = ACTIVE`, tạo `career_site_settings` với `slug` từ tên DN
- Khi Reject: `business.status = REJECTED`, lưu `rejected_reason`
- Mọi action đều ghi vào `audit_logs` với thông tin: admin_id, action, business_id, timestamp
- DN đã bị BLOCKED vẫn có thể được UNBLOCK (Phase 2)

# STORY-05 · Admin xem danh sách doanh nghiệp và duyệt hồ sơ

> **Epic:** [EP-02 Admin Area](../EPIC.md)
> **Ưu tiên:** 🔴 Must · **SP:** 5 · **Sprint:** Sprint 1

---

## User Story

> **Là** Admin EasyTech,
> **Tôi muốn** xem danh sách doanh nghiệp đang chờ duyệt, xem chi tiết hồ sơ và thực hiện Approve/Reject/Block,
> **Để** kiểm soát chất lượng các đơn vị sử dụng nền tảng.

---

## Luồng chi tiết

### Xem danh sách
```
Admin vào /admin/dashboard
→ GET /api/admin/businesses?status=PENDING&page=0&size=10
→ Hiển thị bảng: Tên DN, Email HR, Ngày đăng ký, Status, Actions
→ Filter theo status: ALL / PENDING / ACTIVE / REJECTED / BLOCKED
→ Search theo tên/email
```

### Xem chi tiết
```
Admin click vào row
→ Mở BusinessDetailDrawer (slide-in từ phải)
→ GET /api/admin/businesses/{id}
→ Hiển thị: Thông tin DN, Thông tin HR, Ngày đăng ký
→ Actions: [Approve] [Reject] [Block]
```

### Approve
```
Admin bấm [Approve]
→ Confirm dialog: "Duyệt doanh nghiệp này?"
→ PUT /api/admin/businesses/{id}/approve
→ BE: status=ACTIVE, tạo career_site_settings, ghi audit_log
→ FE: Optimistic update → ẩn khỏi PENDING list
```

### Reject
```
Admin bấm [Reject]
→ Modal nhập lý do từ chối (required)
→ PUT /api/admin/businesses/{id}/reject { reason: "..." }
→ BE: status=REJECTED, lưu reason, ghi audit_log
→ FE: Update row status
```

---

## Definition of Done

- [ ] Danh sách load từ API (không còn mock data)
- [ ] Filter theo status hoạt động đúng
- [ ] Approve → `business.status = ACTIVE`, Career Site được tạo tự động
- [ ] Reject → `business.status = REJECTED`, lý do được lưu
- [ ] Block → `business.status = BLOCKED`
- [ ] Audit Log ghi sau mỗi hành động

---

## Tasks

| Task | Mô tả | Tag | SP |
|------|-------|-----|-----|
| [T-05-01](./T-05-01_API_List_Businesses.md) | API `GET /api/admin/businesses` | `[BE]` | 2 |
| [T-05-02](./T-05-02_API_Business_Detail.md) | API `GET /api/admin/businesses/{id}` | `[BE]` | 1 |
| [T-05-03](./T-05-03_API_Approve.md) | API `PUT /api/admin/businesses/{id}/approve` | `[BE]` | 2 |
| [T-05-04](./T-05-04_API_Reject.md) | API `PUT /api/admin/businesses/{id}/reject` | `[BE]` | 1 |
| [T-05-05](./T-05-05_API_Block.md) | API `PUT /api/admin/businesses/{id}/block` | `[BE]` | 1 |
| [T-05-06](./T-05-06_Admin_Dashboard_FE.md) | Kết nối AdminDashboard table với API | `[FE]` | 3 |
| [T-05-07](./T-05-07_Action_Buttons.md) | Kết nối Approve/Reject/Block với API | `[FE]` | 2 |
| [T-05-08](./T-05-08_Business_Drawer.md) | Kết nối Business Detail Drawer với API | `[FE]` | 1 |
| [T-05-09](./T-05-09_Audit_Log_BE.md) | Ghi AuditLog khi approve/reject/block | `[BE]` | 1 |
| [T-05-10](./T-05-10_Career_Site_Auto_Create.md) | Tạo Career Site tự động khi approve | `[BE]` | 2 |
| [T-05-11](./T-05-11_DB_Audit_Logs.md) | Tạo bảng `audit_logs` | `[DB]` | 1 |

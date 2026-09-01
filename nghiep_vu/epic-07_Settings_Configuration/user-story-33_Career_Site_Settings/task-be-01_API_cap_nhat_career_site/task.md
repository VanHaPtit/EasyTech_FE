# task-be-01_API_cap_nhat_career_site

## Mục đích
Xác định phạm vi backend cho task 'API cap nhat career site' trong US-33 Career Site Settings, làm rõ task dùng để làm gì và liên kết với luồng nghiệp vụ tương ứng.

## Mô tả chức năng chi tiết
- Tiếp nhận và xử lý request đúng với nghiệp vụ của user story, bao gồm validate dữ liệu đầu vào, quyền truy cập và trạng thái tài nguyên liên quan.
- Thực hiện truy vấn, cập nhật dữ liệu hoặc side effect cần thiết theo business rule; không xử lý ngoài phạm vi task.
- Trả response theo JSON/BaseResponse contract đã mô tả để frontend xử lý thành công, lỗi validation, lỗi phân quyền và lỗi hệ thống.
- Đảm bảo backend là source-of-truth cho dữ liệu, trạng thái và phân quyền.

## Yêu cầu nghiệp vụ
- Contract API cần tuân thủ cấu trúc BaseResponse chuẩn.
- Đảm bảo cơ chế phân quyền (multi-tenant theo company_id).
- Cập nhật đúng các trường trong cơ sở dữ liệu dựa theo Database Design.
- Quản lý Audit Log cho các hành động thay đổi dữ liệu quan trọng.

## Endpoint đề xuất
- PUT /api/v1/companies/me/career-site-config

## API JSON Contract

### Request Body
```json
{
  "primaryColor": "#2563EB",
  "bannerUrl": "https://cdn.easytech.vn/banners/techa.png",
  "headline": "Gia nhập TechA Solutions",
  "description": "Cùng xây dựng sản phẩm công nghệ có tác động thực tế.",
  "showBenefits": true,
  "benefits": ["Lương cạnh tranh", "Hybrid working", "Bảo hiểm đầy đủ"]
}
```

### Response (200 OK)
```json
{
  "status": 1,
  "message": "Cập nhật cấu hình Career Site thành công.",
  "data": {
    "companyId": 5,
    "primaryColor": "#2563EB",
    "bannerUrl": "https://cdn.easytech.vn/banners/techa.png",
    "headline": "Gia nhập TechA Solutions",
    "showBenefits": true,
    "updatedAt": "2026-08-31T10:00:00"
  }
}
```

### Response lỗi
```json
{
  "status": 0,
  "message": "Cấu hình Career Site không hợp lệ hoặc không có quyền cập nhật.",
  "data": null
}
```

---

## Thiết kế Database – Bảng career_site_configs

## Bảng/entity liên quan
- Bảng chính: `career_sites`, `jobs`, `candidates`, `applications`, `interview_responses`.
- Mỗi bảng phải có id làm Primary Key, created_at, updated_at và is_deleted nếu cần xóa mềm.
- Các bảng thuộc tenant phải có company_id và index theo company_id.

## Column và kiểu dữ liệu
- Dùng UUID cho khóa chính/khóa ngoại.
- Dùng VARCHAR cho mã, email, slug, enum dạng text.
- Dùng TEXT cho nội dung dài như mô tả, lý do từ chối, email body hoặc AI explanation.
- Dùng TIMESTAMP cho thời điểm tạo/cập nhật/gửi email/đánh giá.
- - Enum/status liên quan: chỉ hiển thị Job Status = `ACTIVE` trên Career Site public.

## Khóa và ràng buộc
- Primary Key: id.
- Foreign Key: trỏ đúng entity cha, đặc biệt company_id, job_id, pplication_id, 
ound_id, user_id.
- Constraint bắt buộc cho field nghiệp vụ chính; không cho dữ liệu mồ côi giữa company, job, application và round.
- Unique index cho các mã định danh như email, tax code, slug hoặc template key theo phạm vi tenant nếu nghiệp vụ yêu cầu.

## Migration
- Tạo migration idempotent theo thứ tự triển khai.
- Có giá trị mặc định rõ ràng cho status và boolean flag.

## Relationship
- Dữ liệu phải giữ đúng multi-tenant boundary theo company_id.
- Xóa mềm không được làm mất audit/history cần phục vụ báo cáo hoặc truy vết.

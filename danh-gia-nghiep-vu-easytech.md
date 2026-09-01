# ĐÁNH GIÁ NGHIỆP VỤ & THIẾT KẾ DATABASE - EASYTECH RECRUITMENT PLATFORM
**Người thực hiện**: Product Manager (PM) Nghiêm Khắc & Kỹ Tính
**Phiên bản đánh giá**: v1.1 (Theo đặc tả nghiệp vụ `nghiep_vu` và thiết kế database `EasyTech_Database_Design.md`)

---

## I. Đánh giá tổng quan (Executive Summary)
Nền tảng **EasyTech Recruitment Platform** được định vị là một giải pháp SaaS quản lý tuyển dụng dành cho doanh nghiệp lớn và vừa. Việc chia nhỏ nghiệp vụ thành 8 Epics lớn cùng với mô hình dữ liệu đa thuê chủ (Multi-tenant/Tenant-isolated) là một hướng tiếp cận kỹ thuật đúng đắn và có chiều sâu. 

Tuy nhiên, dưới góc nhìn của một PM khó tính, tài liệu nghiệp vụ hiện tại đang bộc lộ **rất nhiều lỗ hổng logic (business logic holes), các luồng hoạt động chưa khép kín (open loops)** và đặc biệt là **sự mâu thuẫn, lệch pha nghiêm trọng giữa đặc tả nghiệp vụ (User Story/UX Conventions) và thiết kế Cơ sở Dữ liệu (Database Design)**. Nếu đưa tài liệu này cho đội ngũ phát triển (Developers) triển khai ngay lập tức, hệ thống chắc chắn sẽ gặp lỗi runtime, chồng chéo dữ liệu và mang lại trải nghiệm người dùng (UX) vô cùng tồi tệ.

Dưới đây là bảng bóc tách chi tiết các điểm mâu thuẫn, chưa hợp lý và chưa trọn vẹn của hệ thống.

---

## II. Các mâu thuẫn nghiêm trọng giữa Đặc tả Nghiệp vụ và Thiết kế Database (Data Mismatches)

### 1. Mâu thuẫn Vai trò Người dùng (User Roles Mismatch)
*   **Đặc tả nghiệp vụ (`_overview.md`):** Xác định rõ 4 đối tượng chính của hệ thống, trong đó phân biệt rõ **`HR_ADMIN`** (người đăng ký công ty, có toàn quyền cấu hình hệ thống, quản lý billing, phân quyền) và **`HR`** (thành viên thông thường được `HR_ADMIN` thêm vào để cùng tham gia tuyển dụng). Ngoài ra còn có `System Admin` và `Candidate`.
*   **Thiết kế Database (`users` table):** Cột `role` chỉ chứa ràng buộc cứng: `ADMIN, HR` (Admin ở đây hiểu là System Admin của EasyTech, còn HR là người dùng doanh nghiệp).
*   **Điểm chưa hợp lý & Hậu quả:** 
    *   Hệ thống hoàn toàn **không có vai trò `HR_ADMIN`** trong database. Làm thế nào Backend phân biệt được giữa chủ doanh nghiệp và nhân viên thường?
    *   Đặc tả Epic 7 có `US-32 HR quản lý phân quyền` (gồm API `task-be-01_API_Mana...` và UI `task-fe-01_UI_HR_RBAC`). Nếu cơ sở dữ liệu chỉ có duy nhất một role `HR` chung chung và không có bảng liên kết phân quyền nào khác, tính năng phân quyền này hoàn toàn **vô dụng** và không thể triển khai trên thực tế.

### 2. Trạng thái Onboarding bị "bốc hơi" khỏi Database (Missing Onboarding State)
*   **Đặc tả nghiệp vụ (`_overview.md` & `UX_CONVENTIONS.md`):** Quy định rõ: *"Onboarding được quản lý bằng `onboardingCompleted = true/false`"*. Trạng thái này độc lập với User Status (ACTIVE/INACTIVE). HR bắt buộc phải qua luồng Onboarding 3 bước để thiết lập Branding, Lời chào trước khi vào Dashboard.
*   **Thiết kế Database (`users` và `companies` table):** Không hề tồn tại cột `onboarding_completed` hay bất kỳ cột nào tương tự trong toàn bộ các bảng `users`, `companies`, `company_profiles` hay `career_sites`.
*   **Hậu quả:** Trạng thái onboarding của doanh nghiệp sẽ được lưu trữ ở đâu? Nếu lưu ở phía Client (Local Storage/Cookies), khi người dùng đổi trình duyệt hoặc xóa cache, hệ thống sẽ bắt họ onboarding lại từ đầu. Đây là một lỗ hổng thiết kế hệ thống (system design) sơ đẳng.

### 3. Mâu thuẫn "Hai nguồn Chân lý" của Dữ liệu Thương hiệu (Dual Source of Truth)
*   **Đặc tả nghiệp vụ (`UX_CONVENTIONS.md` & Epic 7):** Đưa ra quy ước kỳ lạ và bất hợp lý: *"Thay đổi thông tin doanh nghiệp ở US-30 (nội bộ) KHÔNG tự động áp dụng lên Career Site (US-33) và ngược lại"*. 
    *   Tên công ty nội bộ lưu ở `companies.name`, tên public lưu ở `career_site_settings.display_name`.
    *   Logo nội bộ lưu ở `companies.logo_url` (thực tế bảng này không có), logo public lưu ở `career_site_settings.logo_url`.
*   **Thiết kế Database (`career_sites` table):** Bảng này thực tế **KHÔNG hề có** các cột `display_name`, `logo_url`, hay `description` (public) như đặc tả Epic 7 mô tả. Bảng chỉ có các cột thiết lập giao diện như `site_title`, `tagline`, `hero_image_url`, `accent_color`, `font_family`.
*   **Điểm chưa hợp lý & Hậu quả:**
    *   Mâu thuẫn trực tiếp giữa tài liệu kỹ thuật DB và đặc tả Epic. Developers tạo bảng theo schema DB sẽ làm crash tính năng Career Site Settings ở FE vì gọi API vào các trường không tồn tại.
    *   **Trải nghiệm người dùng cực kỳ tồi tệ:** Tại sao một doanh nghiệp đổi tên hoặc tái định vị thương hiệu (rebrand) lại phải đi cập nhật Tên công ty và Logo ở 2 màn hình cài đặt riêng biệt? Nếu họ quên cập nhật ở Career Site, ứng viên sẽ thấy một logo cũ và tên cũ, gây thiếu chuyên nghiệp và mất lòng tin nghiêm trọng.

### 4. Sai lệch tên bảng trong ràng buộc khóa ngoại (Foreign Key Errors)
*   **Thiết kế Database (`applications` table):** Cột `current_round_id` được định nghĩa là một Foreign Key tham chiếu đến bảng `job_rounds.id`.
*   **Thực tế cấu trúc DB:** Trong danh sách bảng, bảng lưu trữ các vòng tuyển dụng có tên là **`hiring_rounds`**, hoàn toàn không có bảng nào tên là `job_rounds`.
*   **Hậu quả:** Lỗi cú pháp SQL (Syntax/DDL Error) khi khởi tạo database. Backend không thể chạy được migrations.

### 5. Dư thừa dữ liệu (Data Redundancy) dẫn đến rủi ro "lệch pha"
*   **Thiết kế Database (`jobs` table):** Chứa cột `round_count INT default 1` (Số vòng phỏng vấn).
*   **Thực tế cấu trúc DB:** Số vòng phỏng vấn của mỗi tin tuyển dụng được lưu động dưới dạng các dòng (rows) trong bảng `hiring_rounds`.
*   **Điểm chưa hợp lý & Hậu quả:** Việc lưu trữ cứng `round_count` ở bảng `jobs` là hoàn toàn dư thừa vì ta có thể dễ dàng lấy được số vòng bằng câu lệnh `COUNT` trên bảng `hiring_rounds`. Khi HR thêm mới hoặc xóa bớt vòng tuyển dụng trong pipeline, nếu Backend quên không cập nhật đồng thời cột `jobs.round_count`, dữ liệu hiển thị sẽ bị mâu thuẫn nghiêm trọng.

---

## III. Các luồng nghiệp vụ chưa khép kín (Open-ended Loops)

### 1. Luồng "Đổi lịch Phỏng vấn" của Ứng viên (Interview Rescheduling Loop)
Đây là lỗi thiết kế luồng (flow design) nặng nhất trong hệ thống.
*   **Luồng hoạt động hiện tại (Epic 4 & Epic 6):**
    1. HR lên lịch phỏng vấn thông qua `US-18` -> Hệ thống lưu trạng thái `SCHEDULED` và gửi email chứa Magic Link cho ứng viên.
    2. Ứng viên mở Magic Link, nhập email xác thực, chọn đề xuất đổi lịch phỏng vấn (tối đa 1 lần).
    3. Hệ thống gọi API `PUT /api/v1/public/interviews/{secure_token}/respond` -> Cập nhật trạng thái cuộc phỏng vấn thành `RESCHEDULE_REQUESTED` kèm theo `reschedule_time` và `reschedule_reason`. Gửi thông báo cho HR.
*   **Vòng lặp bị bỏ lửng (The Loop is Open):**
    *   **Không hề có bất kỳ User Story, UI hay API nào dành cho HR để xử lý yêu cầu đổi lịch phỏng vấn này!**
    *   Khi HR nhận được thông báo ứng viên xin đổi lịch, họ sẽ bấm duyệt/từ chối ở đâu? Trên màn hình nào? API nào xử lý hành động HR đồng ý giờ mới hoặc từ chối giờ mới?
    *   Nếu ứng viên đề xuất một giờ mà HR không rảnh, HR có quyền đề xuất ngược lại lần 2 không? (Vì quy định ứng viên chỉ được đổi 1 lần).
*   **Hậu quả:** Luồng phỏng vấn của ứng viên sẽ bị "mắc kẹt" vĩnh viễn ở trạng thái `RESCHEDULE_REQUESTED` trên hệ thống nếu không có sự can thiệp thủ công bằng cơm hoặc HR buộc phải xóa lịch cũ đi tạo lại lịch mới (làm mất toàn bộ vết audit log lịch sử đổi lịch).

### 2. Luồng khôi phục Magic Link bị mất/hết hạn của Ứng viên (Lost/Expired Magic Link Recovery)
*   **Luồng hoạt động hiện tại:** Ứng viên nộp hồ sơ không cần tài khoản. Mọi việc từ theo dõi tiến độ (CV Screening -> Phỏng vấn -> Nhận Offer) đến tương tác lịch phỏng vấn đều phụ thuộc hoàn toàn vào một token duy nhất trong Magic Link gửi qua email. Magic Link có thời hạn 30 ngày.
*   **Vòng lặp bị bỏ lửng:** 
    *   Nếu ứng viên vô tình xóa email chứa Magic Link, họ sẽ tự tra cứu tiến độ ứng tuyển của mình ở đâu? 
    *   Khi Magic Link hết hạn sau 30 ngày, hệ thống yêu cầu *"cần có nút yêu cầu gửi lại link mới"*. Nhưng nếu ứng viên không thể truy cập vào link cũ đã hết hạn, họ lấy nút đó ở đâu? Hệ thống hoàn toàn không có một trang chủ công khai phục vụ tra cứu (Public Applicant Portal) để ứng viên nhập email và nhận lại link.
*   **Hậu quả:** Ứng viên bị cắt đứt hoàn toàn liên lạc với doanh nghiệp, trải nghiệm ứng viên bị đứt gãy nghiêm trọng.

### 3. Điểm nghẽn trên Kanban Board khi chuyển từ PASSED sang HIRED
*   **Luồng hoạt động hiện tại:** 
    *   `hiring_rounds` lưu các vòng tuyển dụng động của một Job (ví dụ: Vòng 1: CV Screening, Vòng 2: Tech Interview, Vòng 3: Offer).
    *   Kanban Board (`US-22`) hiển thị ứng viên dạng thẻ (cards) chia theo các cột tương ứng với các vòng này.
    *   Khi đánh giá đạt vòng cuối, trạng thái vòng của ứng viên trong `application_progress` chuyển sang `PASSED`.
    *   Theo quy ước: *"PASSED là Round Result, không phải Application Status. HIRED mới là trạng thái hồ sơ tổng thể và chỉ xảy ra khi HR bấm Hire rõ ràng"*.
*   **Điểm chưa hợp lý:** 
    *   Khi ứng viên vượt qua vòng cuối (ví dụ Vòng 3: Offer), họ sẽ nằm ở cột cuối cùng của Kanban Board với trạng thái vòng là `PASSED`.
    *   Làm thế nào để HR chuyển trạng thái tổng thể của hồ sơ thành `HIRED` ngay trên Kanban Board?
    *   Kanban Board không có cột "HIRED" hay "REJECTED" (vì đây là trạng thái hồ sơ - `Application Status`, không phải vòng tuyển dụng - `Hiring Round`).
*   **Hậu quả:** Ứng viên đã trúng tuyển sẽ bị "ngâm" ở cột vòng cuối cùng của Kanban Board mãi mãi. HR không thể kéo thẻ của ứng viên vào một khu vực "HIRED" trực quan mà bắt buộc phải click vào thẻ để mở Candidate Drawer, sau đó tìm nút bấm "Chốt tuyển dụng (Hire)" thủ công. Điều này làm giảm đáng kể tính trực quan của giao diện Kanban.

---

## IV. Những điểm chưa thỏa đáng & Rủi ro vận hành (Operational Risks)

### 1. Rủi ro "Bùng nổ chi phí" AI do thiếu cơ chế kiểm soát (Cost Explosion Risk)
*   **Nghiệp vụ hiện tại (Epic 8):** AI hỗ trợ chấm điểm CV và gợi ý câu hỏi. Để tối ưu chi phí, hệ thống chốt cơ chế "On-demand" (HR chủ động nhấn nút mới gọi API ChatGPT/Gemini).
*   **Rủi ro vận hành:** 
    *   Màn hình Candidate Drawer thiết kế nút **"Rerun AI"** (`task-fe-06_Rerun_Button`) cho phép HR chạy lại AI bất kỳ lúc nào.
    *   Hệ thống hoàn toàn **không có bất kỳ cơ chế giới hạn tần suất (Rate Limiting) hay hạn ngạch Token (Quota) cho mỗi doanh nghiệp** trong Database (`ai_configs` hay `companies`).
    *   Một HR bất cẩn hoặc phá hoại có thể bấm "Rerun" hàng trăm lần trên các bộ CV nặng (tối đa 5MB), gọi API liên tục và đốt sạch ngân sách API của hệ thống EasyTech trong tích tắc (do giai đoạn MVP hệ thống Admin chi trả hoàn toàn phí API).

### 2. Sự nửa vời của cơ chế Tự động hóa Email (Email Automation Inconsistencies)
*   **Thiết kế hiện tại:** 
    *   Bảng `hiring_rounds` cho phép liên kết `pass_email_template_id` và `fail_email_template_id`.
    *   Khi ứng viên đạt hoặc trượt một vòng, hệ thống sẽ kích hoạt gửi email tự động (có qua confirmation modal).
*   **Điểm chưa thỏa đáng:** 
    *   Khi ứng viên vượt qua vòng 1 (CV Screening) và được chuyển sang vòng 2 (Technical Interview). Trạng thái của họ ở vòng 2 lúc này là `PENDING`.
    *   Lúc này ứng viên cần nhận được một email **Mời phỏng vấn (Interview Invite)** chứa lịch hẹn, thời gian và địa điểm.
    *   Tuy nhiên, email mời phỏng vấn không thể gửi tự động ngay khi chuyển vòng được, vì HR **chưa lên lịch hẹn**! HR bắt buộc phải vào màn hình Đặt lịch (`US-18`) nhập ngày giờ, địa điểm rồi mới gửi được email.
    *   Như vậy, việc gán `pass_email_template_id` cho vòng 1 là rất vô duyên: nếu gửi ngay khi Pass vòng 1, ứng viên nhận được email thông báo đạt nhưng không biết bao giờ phỏng vấn. Sau đó khi HR đặt lịch, ứng viên lại nhận thêm một email thứ 2. Việc này gây loãng thông tin và tăng spam email không cần thiết.

---

## V. Đề xuất giải pháp sửa đổi tức thời (Actionable Recommendations)

Để đảm bảo hệ thống khép kín và nhất quán, tôi yêu cầu đội ngũ thiết kế hệ thống và phát triển thực hiện ngay các thay đổi sau:

### 1. Về cấu trúc Database & Phân quyền
*   **Phân quyền rõ ràng:** Thêm cột `is_admin_user` (Boolean) hoặc mở rộng `role` trong bảng `users` thành `ADMIN, HR_ADMIN, HR_MEMBER` để phục vụ chính xác cho US-32.
*   **Bổ sung trạng thái Onboarding:** Thêm cột `onboarding_completed` (BOOLEAN, default false) vào bảng `companies` để đồng bộ dữ liệu chuẩn hóa trên server.
*   **Sửa lỗi Foreign Key:** Đổi tên bảng tham chiếu trong cột `applications.current_round_id` từ `job_rounds.id` thành `hiring_rounds.id`.
*   **Loại bỏ cột dư thừa:** Xóa cột `round_count` ở bảng `jobs`. Hãy viết câu lệnh query `COUNT` động khi FE yêu cầu thông tin này.

### 2. Về cấu hình Thương hiệu (Branding)
*   **Đồng bộ một nguồn chân lý:** Tên công ty và Logo chỉ upload một lần tại màn hình thông tin doanh nghiệp (`companies` / `company_profiles`). Career Site sẽ tự động kế thừa dữ liệu này. Nếu doanh nghiệp muốn Career Site hiển thị tên khác hoặc logo khác, họ mới bật tính năng "Override" tại cài đặt Career Site.
*   **Bổ sung cột thiếu:** Cập nhật bảng `career_sites` thêm các cột `display_name` (VARCHAR), `logo_url` (TEXT) để khớp tuyệt đối với đặc tả nghiệp vụ của Epic 7.

### 3. Khép kín các luồng hoạt động (Closing the Loops)
*   **Khép kín luồng đổi lịch phỏng vấn:** 
    *   Bổ sung thêm 1 User Story trong Epic 4: *"HR xem và xử lý yêu cầu đổi lịch phỏng vấn"*.
    *   Thiết kế API `POST /api/v1/hr/interviews/{interview_id}/handle-reschedule` nhận payload: `{"action": "APPROVE | REJECT", "new_time": "..."}`.
    *   Nếu APPROVE: Trạng thái cuộc phỏng vấn chuyển thành `ACCEPTED` (hoặc `SCHEDULED` với giờ mới), gửi email xác nhận giờ mới cho ứng viên. 
    *   Nếu REJECT: Gửi email thông báo giữ nguyên giờ cũ, yêu cầu ứng viên xác nhận tham gia đúng hẹn.
*   **Khép kín luồng khôi phục Magic Link:**
    *   Xây dựng một trang công khai: **Career Site Tracking Portal** (`/career/[company_slug]/track`).
    *   Tại đây, ứng viên chỉ cần nhập Email ứng tuyển của mình. Hệ thống sẽ kiểm tra xem email này có đơn ứng tuyển nào đang `ACTIVE` không. Nếu có, hệ thống sẽ tự động tạo một `secure_token` mới và gửi email chứa Magic Link cập nhật về cho ứng viên.
*   **Tối ưu hóa Kanban Board:**
    *   Thiết kế thêm **2 cột cố định (Static Columns)** ở hai đầu/cuối của Kanban Board bên cạnh các cột vòng tuyển dụng động: Cột đầu tiên là **`NEW`** (Hồ sơ mới nộp, chưa phân vào vòng nào) và cột cuối cùng là **`HIRED / REJECTED`** (Khu vực lưu trữ/chốt hồ sơ).
    *   Khi HR kéo thẻ ứng viên thả vào cột `HIRED`, hệ thống sẽ tự động gọi API cập nhật `Application.status = HIRED`. Điều này giúp trải nghiệm kéo thả trọn vẹn 100%.

### 4. Quản lý rủi ro AI & Email
*   **Quản lý chi phí AI:** Bổ sung bảng `ai_usage_limits` lưu cấu hình: `max_rerun_per_candidate` (Ví dụ tối đa 3 lần rerun AI/ứng viên) và `monthly_token_budget` cho từng doanh nghiệp để chặn đứng nguy cơ cháy tài khoản API.
*   **Tinh chỉnh email tự động:** Tách biệt rõ ràng Email chúc mừng đạt vòng (`pass_email_template_id` - gửi ngay khi bấm Pass) và Email mời phỏng vấn (gửi kèm link đặt lịch phỏng vấn khi HR tạo lịch thành công). Không gộp chung một cách khiên cưỡng.

---
*Tài liệu đánh giá này được thực hiện nghiêm túc dựa trên các tài liệu thiết kế gốc của dự án EasyTech. Yêu cầu toàn bộ team BA, Dev và QC đọc kỹ và phản hồi trước khi Sprint 1 bắt đầu.*

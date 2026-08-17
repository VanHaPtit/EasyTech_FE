import React, { useState } from 'react';
import { ExternalLink, Eye, Globe2, Image, Link2, Palette, Save, Settings2 } from 'lucide-react';

export const CareerSiteSettings: React.FC = () => {
  const [companyName, setCompanyName] = useState('TechA Solutions JSC');
  const [slug, setSlug] = useState('techa');
  const [headline, setHeadline] = useState('Cùng xây dựng tương lai AI tại TechA');
  const [services, setServices] = useState('AI Product Development, Data Platform, Cloud Engineering');
  const [description, setDescription] = useState(
    'TechA Solutions là công ty công nghệ tập trung vào các sản phẩm AI ứng dụng, nền tảng dữ liệu và giải pháp tự động hóa cho doanh nghiệp.'
  );
  const [primaryColor, setPrimaryColor] = useState('#47b1de');
  const [showSalary, setShowSalary] = useState(true);
  const [allowGeneralApply, setAllowGeneralApply] = useState(true);

  return (
    <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-slate-500">Career Site</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Quản trị website tuyển dụng</h1>
          <p className="text-sm font-medium text-slate-500">
            HR tự chỉnh thông tin công ty, thương hiệu và nội dung hiển thị trên trang tuyển dụng riêng.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.open(`/company/${slug}`, '_blank')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm font-bold cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            Xem preview
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold shadow-md shadow-primary-500/10 cursor-pointer">
            <Save className="h-4 w-4" />
            Lưu cấu hình
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 space-y-6">
          <section className="premium-card bg-white p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Globe2 className="h-5 w-5 text-primary-500" />
              <div>
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Thông tin công ty</h2>
                <p className="text-[11px] font-semibold text-slate-400">Dữ liệu này được lấy từ onboarding và có thể cập nhật sau.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tên công ty</label>
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Slug / subdomain</label>
                <div className="flex">
                  <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-3 py-2.5 rounded-l-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500" />
                  <span className="px-3 py-2.5 rounded-r-xl border border-l-0 border-slate-200 bg-slate-50 text-xs font-bold text-slate-400">.easytech.vn</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Dịch vụ cung cấp</label>
              <input value={services} onChange={(e) => setServices(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mô tả công ty</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500 resize-none leading-relaxed" />
            </div>
          </section>

          <section className="premium-card bg-white p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Palette className="h-5 w-5 text-primary-500" />
              <div>
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Branding & hiển thị</h2>
                <p className="text-[11px] font-semibold text-slate-400">Điều chỉnh màu chủ đạo, hero và các tùy chọn công khai.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Headline hero</label>
                <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Màu chủ đạo</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 w-14 rounded-lg border border-slate-200 bg-white" />
                  <input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { checked: showSalary, setChecked: setShowSalary, title: 'Hiển thị mức lương', desc: 'Ứng viên thấy salary range trên job card.' },
                { checked: allowGeneralApply, setChecked: setAllowGeneralApply, title: 'Cho phép ứng tuyển chung', desc: 'Candidate gửi hồ sơ ngay cả khi chưa có JD phù hợp.' },
              ].map((item) => (
                <label key={item.title} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input type="checkbox" checked={item.checked} onChange={(e) => item.setChecked(e.target.checked)} className="mt-1 h-4 w-4 accent-primary-500" />
                  <span>
                    <span className="block text-sm font-extrabold text-slate-800">{item.title}</span>
                    <span className="block text-xs font-semibold text-slate-400 mt-1">{item.desc}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="xl:col-span-5 space-y-6">
          <section className="premium-card bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Preview nhanh</h2>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">Đang public</span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
              <div className="h-40 p-5 text-white" style={{ background: `linear-gradient(135deg, #0f172a 0%, ${primaryColor} 120%)` }}>
                <div className="h-10 w-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center mb-5">
                  <Image className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-white/70">{companyName}</p>
                <h3 className="text-xl font-extrabold leading-tight mt-1">{headline}</h3>
              </div>
              <div className="bg-white p-5 space-y-3">
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">{description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {services.split(',').map((service) => (
                    <span key={service.trim()} className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-500">
                      {service.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="premium-card bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary-500" />
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Luồng hệ thống</h2>
            </div>
            <div className="space-y-3">
              {[
                'HR đăng nhập lần đầu',
                'Hệ thống yêu cầu nhập thông tin công ty',
                'Admin duyệt doanh nghiệp',
                'Tạo Career Site riêng theo slug/subdomain',
                'HR vào tab Career Site để chỉnh nội dung khi cần',
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-[11px] font-extrabold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-card bg-white p-6 space-y-3">
            <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">URL công khai</h2>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <Link2 className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-600 truncate">https://{slug}.easytech.vn</span>
            </div>
            <button onClick={() => window.open(`/company/${slug}`, '_blank')} className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 cursor-pointer">
              <ExternalLink className="h-4 w-4" />
              Mở bản mock local
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

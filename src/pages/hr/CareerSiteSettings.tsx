import React, { useState } from 'react';

export interface WhyJoinCard {
  id: string;
  text: string;
}

export const CareerSiteSettings: React.FC = () => {
  const companyName = 'TechA Solutions JSC';
  const services = 'AI Product Development, Data Platform, Cloud Engineering';
  const description = 'TechA Solutions là công ty công nghệ tập trung vào các sản phẩm AI ứng dụng, nền tảng dữ liệu và giải pháp tự động hóa cho doanh nghiệp.';

  const slug = 'techa';
  
  const [headline, setHeadline] = useState('Cùng xây dựng tương lai AI tại TechA');
  
  const [whyChooseUs, setWhyChooseUs] = useState<WhyJoinCard[]>([
    { id: 'wj1', text: 'Làm việc với các công nghệ AI mới nhất, từ LLM đến Vector Embedding trong môi trường thực tế.' },
    { id: 'wj2', text: 'Mức lương cạnh tranh + equity + review 2 lần/năm + 13th month + bảo hiểm sức khỏe cao cấp.' },
    { id: 'wj3', text: 'Budget học hỏi hàng năm, mentorship từ senior engineers, cơ hội làm việc với khách hàng quốc tế.' },
  ]);
  const [primaryColor, setPrimaryColor] = useState('#47b1de');
  
  // Footer state
  const [footerDescription, setFooterDescription] = useState('Chúng tôi xây dựng những sản phẩm AI/tech hàng đầu, tìm kiếm những tài năng đam mê đổi mới và công nghệ.');
  const [facebookLink, setFacebookLink] = useState('https://facebook.com/techa');
  const [linkedinLink, setLinkedinLink] = useState('https://linkedin.com/company/techa');
  const [copyrightText, setCopyrightText] = useState('© 2026 TechA Solutions JSC. All rights reserved.');

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
            Xem preview
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold shadow-md shadow-primary-500/10 cursor-pointer">
            Lưu cấu hình
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 space-y-6">
          <section className="premium-card bg-white p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Thông tin Footer</h2>
                <p className="text-[11px] font-semibold text-slate-400">Thiết lập nội dung hiển thị ở chân trang web tuyển dụng.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mô tả ngắn ở Footer</label>
                <textarea value={footerDescription} onChange={(e) => setFooterDescription(e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500 resize-none" placeholder="Nhập mô tả ngắn..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Link Facebook</label>
                  <input value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500" placeholder="https://facebook.com/..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Link LinkedIn</label>
                  <input value={linkedinLink} onChange={(e) => setLinkedinLink(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500" placeholder="https://linkedin.com/company/..." />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Copyright Text</label>
                <input value={copyrightText} onChange={(e) => setCopyrightText(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-primary-500" placeholder="© 2026..." />
              </div>
            </div>
          </section>

          <section className="premium-card bg-white p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
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


          </section>

          <section className="premium-card bg-white p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Lý do chọn công ty (Why Choose Us)</h2>
            </div>
            <p className="text-[11px] font-semibold text-slate-400">Các thẻ nổi bật về văn hóa, cơ hội phát triển hiển thị trên trang Career Site.</p>
            
            <div className="space-y-4">
              {whyChooseUs.map((card, index) => (
                <div key={card.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-4 relative group">
                  <button 
                    onClick={() => setWhyChooseUs(prev => prev.filter(c => c.id !== card.id))}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 text-xs font-bold"
                  >
                    Xóa
                  </button>
                  
                  <div className="space-y-1.5 pr-10">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mô tả lý do</label>
                    <textarea
                      value={card.text}
                      onChange={(e) => {
                        const newCards = [...whyChooseUs];
                        newCards[index].text = e.target.value;
                        setWhyChooseUs(newCards);
                      }}
                      rows={2}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-600 transition-colors resize-none"
                      placeholder="Nhập nội dung mô tả lý do chọn công ty..."
                    />
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => {
                  setWhyChooseUs(prev => [
                    ...prev, 
                    { id: `wj${Date.now()}`, text: '' }
                  ]);
                }}
                className="w-full py-3 rounded-xl border border-dashed border-slate-300 hover:border-primary-500 hover:bg-primary-50 text-slate-500 hover:text-primary-600 text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                Thêm lý do mới
              </button>
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
                <div className="h-10 w-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center mb-5 text-[10px] font-bold text-white">
                  Logo
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
              <span className="text-xs font-bold text-slate-600 truncate">https://{slug}.easytech.vn</span>
            </div>
            <button onClick={() => window.open(`/company/${slug}`, '_blank')} className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 cursor-pointer">
              Mở bản mock local
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

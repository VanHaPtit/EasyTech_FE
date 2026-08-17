import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Check, Globe2, Info, MapPin, Phone, Sparkles, Upload } from 'lucide-react';
import { PublicFooter } from '../components/PublicFooter';
import { PublicHeader } from '../components/PublicHeader';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyName, setCompanyName] = useState('TechA Solutions JSC');
  const [services, setServices] = useState('AI Product Development, Data Platform, Cloud Engineering');
  const [phoneNumber, setPhoneNumber] = useState('+84 900 100 200');
  const [address, setAddress] = useState('Quận 1, TP. Hồ Chí Minh');
  const [website, setWebsite] = useState('www.techa.vn');
  const [slug, setSlug] = useState('techa');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const completeness = useMemo(() => {
    let score = 15;
    if (companyName.trim()) score += 20;
    if (services.trim()) score += 20;
    if (address.trim()) score += 15;
    if (phoneNumber.trim()) score += 10;
    if (website.trim()) score += 10;
    if (slug.trim()) score += 10;
    if (logoUrl) score += 5;
    return Math.min(score, 100);
  }, [address, companyName, logoUrl, phoneNumber, services, slug, website]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLogoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !services.trim() || !slug.trim()) {
      alert('Vui lòng điền tên công ty, dịch vụ cung cấp và slug Career Site.');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12">
        <div className="mb-8 text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            Lần đăng nhập đầu tiên
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            Thiết lập hồ sơ công ty trước khi vào HR Dashboard
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-2 max-w-3xl">
            EasyTech cần thông tin doanh nghiệp để Admin duyệt, tạo Career Site riêng và gắn branding cho email/tin tuyển dụng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start w-full">
          <aside className="lg:col-span-1 premium-card bg-white p-6 space-y-6 text-left">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest">Luồng bắt buộc</h3>
            <div className="space-y-6 relative pl-2">
              <div className="absolute top-1 bottom-1 left-[14px] w-0.5 bg-slate-200" />
              {[
                { step: 1, title: 'Thông tin công ty', desc: 'Tên, dịch vụ, logo' },
                { step: 2, title: 'Liên hệ & Career Site', desc: 'Website, số điện thoại, slug' },
                { step: 3, title: 'Xác nhận', desc: 'Gửi hồ sơ chờ duyệt' },
              ].map((item) => (
                <button key={item.step} type="button" onClick={() => setCurrentStep(item.step)} className="flex items-start gap-4 relative z-10 text-left">
                  <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentStep >= item.step ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {currentStep > item.step ? <Check className="h-4 w-4" /> : item.step}
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">{item.title}</span>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase mt-0.5">{item.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className="lg:col-span-2 premium-card bg-white p-8 space-y-6">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="text-left">
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Hồ sơ doanh nghiệp</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  Các trường này sẽ được dùng cho Admin Approval và Career Site riêng.
                </p>
              </div>
              <Building2 className="h-6 w-6 text-primary-500" />
            </div>

            <form onSubmit={handleComplete} className="space-y-6 text-left">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Logo công ty</label>
                    <div className="flex items-center gap-6">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Preview" className="h-16 w-16 rounded-xl object-cover border border-slate-200" />
                      ) : (
                        <div className="h-16 w-16 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                          <Building2 className="h-6 w-6" />
                        </div>
                      )}
                      <label className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 cursor-pointer">
                        <span className="flex items-center gap-1.5">
                          <Upload className="h-4 w-4" />
                          Tải ảnh lên
                        </span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tên công ty *</label>
                    <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Dịch vụ cung cấp *</label>
                    <textarea value={services} onChange={(e) => setServices(e.target.value)} rows={3} placeholder="VD: Tuyển dụng IT, outsourcing, sản phẩm AI..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800 resize-none" />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button type="button" onClick={() => setCurrentStep(2)} className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold shadow-md shadow-primary-500/10 cursor-pointer">
                      Tiếp tục
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Địa chỉ</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                      <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Số điện thoại</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Website</label>
                      <div className="relative">
                        <Globe2 className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Career Site slug *</label>
                    <div className="flex">
                      <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-3 rounded-l-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800" />
                      <span className="px-4 py-3 rounded-r-xl border border-l-0 border-slate-200 bg-slate-50 text-xs font-bold text-slate-400">.easytech.vn</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button type="button" onClick={() => setCurrentStep(1)} className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold cursor-pointer">
                      Quay lại
                    </button>
                    <button type="button" onClick={() => setCurrentStep(3)} className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold shadow-md shadow-primary-500/10 cursor-pointer">
                      Tiếp tục
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="p-5 bg-primary-500/5 border border-primary-500/10 rounded-2xl space-y-4">
                    <h4 className="text-sm font-bold text-slate-800">Xác nhận thông tin trước khi vào hệ thống</h4>
                    <div className="space-y-2 text-xs font-semibold text-slate-600">
                      <p><span className="text-slate-400">Tên doanh nghiệp:</span> <span className="text-slate-800 font-bold">{companyName}</span></p>
                      <p><span className="text-slate-400">Dịch vụ:</span> {services}</p>
                      <p><span className="text-slate-400">Career Site:</span> <span className="text-primary-600 font-bold">https://{slug}.easytech.vn</span></p>
                      <p><span className="text-slate-400">Website:</span> {website}</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button type="button" onClick={() => setCurrentStep(2)} className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold cursor-pointer">
                      Quay lại
                    </button>
                    <button type="submit" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold shadow-md shadow-primary-500/10 cursor-pointer">
                      Hoàn tất và vào hệ thống
                    </button>
                  </div>
                </div>
              )}
            </form>
          </section>

          <aside className="lg:col-span-1 premium-card bg-white p-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-primary-500">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-sm font-extrabold tracking-tight">Gợi ý hoàn thiện</h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Mức độ hoàn thiện</span>
                <span className="text-primary-500">{completeness}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${completeness}%` }} />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl flex gap-3">
              <Info className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
                Sau khi hoàn tất, mock UI cho phép đi thẳng vào Dashboard. Khi có backend thật, trạng thái sẽ chuyển sang chờ Admin duyệt trước khi mở Dashboard đầy đủ.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Upload, 
  Sparkles, 
  Check, 
  MapPin, 
  Phone, 
  ArrowRight,
  Info
} from 'lucide-react';
import { PublicHeader } from '../components/PublicHeader';
import { PublicFooter } from '../components/PublicFooter';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Compute completeness score
  const [completeness, setCompleteness] = useState(25);

  useEffect(() => {
    let score = 25; // Base score
    if (companyName.trim()) score += 20;
    if (phoneNumber.trim()) score += 15;
    if (address.trim()) score += 20;
    if (website.trim()) score += 15;
    if (logoUrl) score += 5;
    setCompleteness(score);
  }, [companyName, phoneNumber, address, website, logoUrl]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) {
      alert("Vui lòng điền tên công ty!");
      return;
    }
    // Success redirect
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Public Header */}
      <PublicHeader />

      {/* Onboarding Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start w-full">
          
          {/* Left Panel: Progress Steps */}
          <div className="lg:col-span-1 premium-card bg-white p-6 space-y-6 text-left select-none">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest">
              Đăng ký hồ sơ
            </h3>

            {/* Stepper Timeline */}
            <div className="space-y-6 relative pl-2">
              <div className="absolute top-1 bottom-1 left-[14px] w-0.5 bg-slate-200"></div>

              {/* Step 1 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {currentStep > 1 ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Thông tin chung</h4>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">Company Info</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {currentStep > 2 ? <Check className="h-4 w-4" /> : '2'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Liên hệ</h4>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">Contact Details</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep >= 3 ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  '3'
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Xác nhận</h4>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">Review</p>
                </div>
              </div>
            </div>

            {/* Save Draft button */}
            <div className="pt-4 border-t border-slate-150">
              <button 
                onClick={() => alert("Đã lưu bản nháp!")}
                className="w-full py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Lưu bản nháp
              </button>
            </div>
          </div>

          {/* Middle Panel: Interactive Form */}
          <div className="lg:col-span-2 premium-card bg-white p-8 space-y-6">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between select-none">
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight text-left">Hồ sơ Doanh nghiệp</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5 text-left">
                  Thiết lập thông tin thương hiệu Career Site công khai của bạn
                </p>
              </div>
              <Building2 className="h-6 w-6 text-primary-500" />
            </div>

            <form onSubmit={handleComplete} className="space-y-6 text-left">
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Upload Logo */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider select-none">Logo công ty</label>
                    <div className="flex items-center gap-6">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Preview" className="h-16 w-16 rounded-xl object-cover border border-slate-200" />
                      ) : (
                        <div className="h-16 w-16 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                          <Building2 className="h-6 w-6" />
                        </div>
                      )}
                      <label className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors shadow-sm cursor-pointer select-none">
                        <span className="flex items-center gap-1.5">
                          <Upload className="h-4 w-4" />
                          Tải ảnh lên
                        </span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider select-none">Tên công ty *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="VD: Công ty TNHH HR Flow"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800 transition-colors"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider select-none">Địa chỉ</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Số nhà, Tên đường..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-all shadow-md shadow-primary-500/10 cursor-pointer select-none"
                    >
                      <span>Tiếp tục</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider select-none">Số điện thoại</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+84 900 000 000"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider select-none">Website</label>
                    <div className="relative flex items-stretch">
                      <span className="px-3.5 flex items-center justify-center bg-slate-50 border border-r-0 border-slate-200 rounded-l-xl text-xs font-bold text-slate-400 select-none">
                        https://
                      </span>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="www.website.com"
                        className="w-full px-4 py-3 rounded-r-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all cursor-pointer select-none"
                    >
                      Quay lại
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-all shadow-md shadow-primary-500/10 cursor-pointer select-none"
                    >
                      <span>Tiếp tục</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="p-4 bg-primary-500/5 border border-primary-500/10 rounded-2xl space-y-4">
                    <h4 className="text-sm font-bold text-slate-800">Xác nhận thông tin đã nhập</h4>
                    
                    <div className="space-y-2 text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Tên doanh nghiệp:</span>
                        <span className="text-slate-800 font-bold">{companyName || 'Chưa cung cấp'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Địa chỉ:</span>
                        <span className="text-slate-800">{address || 'Chưa cung cấp'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Điện thoại:</span>
                        <span className="text-slate-800">{phoneNumber || 'Chưa cung cấp'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Website:</span>
                        <span className="text-slate-800">{website ? `https://${website}` : 'Chưa cung cấp'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all cursor-pointer select-none"
                    >
                      Quay lại
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-all shadow-md shadow-primary-500/10 cursor-pointer select-none"
                    >
                      <span>Hoàn tất đăng ký</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Panel: AI Insights card */}
          <div className="lg:col-span-1 premium-card bg-white p-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-primary-500">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <h3 className="text-sm font-extrabold tracking-tight">AI Insights</h3>
            </div>

            {/* Completion progress */}
            <div className="space-y-2 select-none">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Mức độ hoàn thiện</span>
                <span className="text-primary-500">{completeness}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-primary-500 transition-all duration-300"
                  style={{ width: `${completeness}%` }}
                ></div>
              </div>
            </div>

            {/* AI Tips widget */}
            <div className="p-4 bg-slate-50 rounded-2xl flex gap-3">
              <Info className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-700">Gợi ý từ AI</h4>
                <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                  {completeness < 50 
                    ? "Hãy điền thêm Tên công ty và địa chỉ để Career Site của bạn trông chuyên nghiệp hơn." 
                    : completeness < 90 
                    ? "Cập nhật đầy đủ logo, website và SĐT liên hệ để gia tăng 180% độ tin cậy đối với ứng viên." 
                    : "Hồ sơ của bạn đã hoàn tất! Career Site độc lập của bạn đã sẵn sàng được tự động khởi tạo."
                  }
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Public Footer */}
      <PublicFooter />
    </div>
  );
};

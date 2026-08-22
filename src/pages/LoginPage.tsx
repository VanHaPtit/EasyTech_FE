import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ShieldCheck, AlertCircle, Loader2, Briefcase } from 'lucide-react';
import { PublicHeader } from '../components/PublicHeader';
import { PublicFooter } from '../components/PublicFooter';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulatedGoogleLogin = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      // Redirect directly to dashboard so the user can see the new HR interface
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Public Header */}
      <PublicHeader />

      {/* Main Login Split Container */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-stretch bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl min-h-[600px]">
          
          {/* Left Side: GlassCard Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-b from-white to-slate-50/50">
            {/* Background elements */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-primary-400/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-md w-full mx-auto space-y-8 text-left z-10">
              {/* Rocket Launch Icon Box */}
              <div className="h-12 w-12 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-md shadow-primary-500/20">
                <Rocket className="h-6 w-6" />
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Đăng nhập Doanh nghiệp</h1>
                <p className="text-sm font-semibold text-slate-400">
                  Khu vực quản lý tuyển dụng dành cho HR trên nền tảng EasyTech.
                </p>
              </div>

              <div className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-extrabold text-slate-800">Dành riêng cho Nhà tuyển dụng</p>
                    <p className="text-xs font-semibold leading-relaxed text-slate-500">
                      Ứng viên không cần đăng nhập tại đây. Nếu bạn là ứng viên đang tìm việc, hãy truy cập Career Site của doanh nghiệp để xem các vị trí đang tuyển.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Alert (Demo toggle) */}
              {error && (
                <div className="flex items-start gap-2.5 p-3.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-semibold">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Google Login Actions */}
              <div className="space-y-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-6 space-y-3">
                    <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">
                      Đang xác thực tài khoản...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Simulated Google Button for HR */}
                    <button
                      onClick={handleSimulatedGoogleLogin}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-bold text-slate-700 hover:text-slate-800 transition-all shadow-sm cursor-pointer select-none"
                    >
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#EA4335"
                          d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.104C18.423 1.95 15.608 1 12.24 1 5.922 1 1 5.922 1 12.24s4.922 11.24 11.24 11.24c6.6 0 11-4.606 11-11.24 0-.756-.08-1.334-.18-1.955H12.24z"
                        />
                      </svg>
                      <span>Đăng nhập tài khoản Google</span>
                    </button>

                    <button
                      onClick={() => navigate('/careers')}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white transition-all shadow-sm cursor-pointer select-none"
                    >
                      <Briefcase className="h-5 w-5" />
                      <span>Tìm việc ngay</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Warning Alert if Client ID is missing */}
              <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] font-semibold text-slate-400 select-none">
                <div className="flex gap-2 items-center">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Google Client ID configured. One-tap signup enabled.</span>
                </div>
                <button 
                  onClick={() => navigate('/admin/login')}
                  className="hover:text-primary-500 transition-colors cursor-pointer"
                >
                  Admin Portal &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: AI Illustration & Badge */}
          <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-tr from-slate-900 to-slate-850 text-white relative overflow-hidden">
            {/* Gradient glow rings */}
            <div className="absolute -top-20 -left-20 h-80 w-80 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 h-80 w-80 bg-amber-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-sm text-center space-y-8 z-10">
              {/* Illustration Placeholder */}
              <div className="h-64 w-64 rounded-3xl bg-slate-800/80 border border-slate-700/50 flex flex-col items-center justify-center p-6 shadow-inner mx-auto relative">
                <div className="h-20 w-20 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center text-primary-400 mb-4 animate-pulse">
                  <Rocket className="h-10 w-10" />
                </div>
                <h3 className="text-base font-extrabold text-slate-100">AI Core Active</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  Automated CV screening and job description generation is fully operational.
                </p>

                {/* Badge Overlay */}
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 uppercase tracking-wider">
                  SYSTEM OK
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-100">Nền tảng tuyển dụng thông minh</h2>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  Trải nghiệm giải pháp B2B SaaS quản trị ứng viên, thiết lập kịch bản vòng tuyển dụng linh hoạt và tạo JD tự động bằng trí tuệ nhân tạo.
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

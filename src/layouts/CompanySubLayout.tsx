import React from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { Zap, MapPin, Mail, Globe, ArrowLeft, Building2 } from 'lucide-react';

const CompanyFooter: React.FC = () => {
  const { companySlug = 'techa' } = useParams();
  
  return (
    <footer className="bg-slate-900 text-slate-400 mt-0 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-primary-500 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm font-extrabold text-white">TechA Solutions JSC</p>
            </div>
            <p className="text-xs font-semibold leading-relaxed">
              Chúng tôi xây dựng những sản phẩm AI/tech hàng đầu, tìm kiếm những tài năng đam mê đổi mới và công nghệ.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Liên kết</h4>
            <div className="space-y-2.5">
              <Link to={`/company/${companySlug}`} className="block text-xs font-semibold hover:text-primary-400 transition-colors">
                Trang chủ Công ty
              </Link>
              <Link to={`/company/${companySlug}/applications/track`} className="block text-xs font-semibold hover:text-primary-400 transition-colors">
                Theo dõi hồ sơ
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                <p className="text-xs font-semibold">TP. Hồ Chí Minh, Việt Nam</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                <p className="text-xs font-semibold">www.techa.vn</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                <p className="text-xs font-semibold">hr@techa.vn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs font-semibold">© 2026 TechA Solutions JSC. All rights reserved.</p>
          <p className="text-xs font-semibold text-slate-600">
            Tuyển dụng trực tuyến qua{' '}
            <span className="text-primary-500 font-bold">EasyTech Platform</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export const CompanySubLayout: React.FC = () => {
  const { companySlug = 'techa' } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to={`/company/${companySlug}`} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">TechA Solutions JSC</span>
          </Link>
          <nav className="flex items-center gap-8 text-sm font-semibold text-slate-500">
            <Link to={`/company/${companySlug}`} className="flex items-center gap-2 hover:text-primary-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Quay lại trang công ty
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      <CompanyFooter />
    </div>
  );
};

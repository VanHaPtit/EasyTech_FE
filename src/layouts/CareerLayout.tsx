import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Zap, MapPin, Mail, Phone, Globe, ExternalLink } from 'lucide-react';

const CareerHeader: React.FC = () => (
  <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link to="/careers" className="flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-amber-400 flex items-center justify-center shadow-md shadow-primary-500/20">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-extrabold text-slate-800 leading-tight">TechA Solutions</p>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest -mt-0.5">Powered by EasyTech</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/careers" className="text-sm font-semibold text-slate-600 hover:text-primary-500 transition-colors">
          Trang chủ
        </Link>
        <Link to="/careers" className="text-sm font-semibold text-slate-600 hover:text-primary-500 transition-colors">
          Cơ hội nghề nghiệp
        </Link>
        <Link to="/careers" className="text-sm font-semibold text-slate-600 hover:text-primary-500 transition-colors">
          Về chúng tôi
        </Link>
        <Link to="/careers/applications/track" className="text-sm font-semibold text-slate-600 hover:text-primary-500 transition-colors">
          Theo dõi hồ sơ
        </Link>
      </nav>

      {/* CTA */}
      <Link
        to="/careers"
        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-all shadow-sm shadow-primary-500/20"
      >
        Xem tất cả việc làm
      </Link>
    </div>
  </header>
);

const CareerFooter: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 mt-20">
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
          <div className="flex gap-3">
            <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </a>
            <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
              <Globe className="h-4 w-4 text-slate-400" />
            </a>
            <a href="#" className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
              <Mail className="h-4 w-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Liên kết</h4>
          <div className="space-y-2.5">
            {['Trang chủ', 'Cơ hội nghề nghiệp', 'Về chúng tôi', 'Chính sách bảo mật'].map((l) => (
              <Link key={l} to={l === 'Cơ hội nghề nghiệp' ? '/careers' : '/careers'} className="block text-xs font-semibold hover:text-primary-400 transition-colors">
                {l}
              </Link>
            ))}
            <Link to="/careers/applications/track" className="block text-xs font-semibold hover:text-primary-400 transition-colors">
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
              <p className="text-xs font-semibold">Tầng 12, Tòa Lotus, 68 Nguyễn Huệ, Q.1, TP.HCM</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-3.5 w-3.5 text-primary-500 shrink-0" />
              <p className="text-xs font-semibold">hr@techa.vn</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-3.5 w-3.5 text-primary-500 shrink-0" />
              <p className="text-xs font-semibold">+84 900 100 200</p>
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

export const CareerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <CareerHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <CareerFooter />
    </div>
  );
};

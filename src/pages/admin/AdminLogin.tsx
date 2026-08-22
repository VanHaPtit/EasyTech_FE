import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, KeyRound, Loader2, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // In a real scenario, this would use a secure admin endpoint
  const handleAdminLogin = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 -left-1/4 h-[500px] w-[500px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 md:p-10 space-y-8">
          
          {/* Logo / Header */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Command Panel</h1>
              <p className="text-sm font-semibold text-slate-400 mt-1">Hệ thống Quản trị Nền tảng VTT Careers</p>
            </div>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <div className="flex gap-3 items-start">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider">Khu vực hạn chế</p>
                <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                  Chỉ dành cho Ban Quản trị hệ thống. Mọi truy cập trái phép đều được ghi lại trong Audit Log.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-950/50 text-red-400 border border-red-900 rounded-xl text-xs font-semibold">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Action */}
          <div className="pt-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-4 space-y-3">
                <Loader2 className="h-6 w-6 text-primary-500 animate-spin" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest animate-pulse">
                  Xác thực danh tính...
                </span>
              </div>
            ) : (
              <button
                onClick={handleAdminLogin}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-sm font-bold text-white transition-all shadow-md cursor-pointer select-none"
              >
                <KeyRound className="h-4.5 w-4.5" />
                <span>Đăng nhập Quản trị viên</span>
              </button>
            )}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => navigate('/login')}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              ← Quay lại trang đăng nhập doanh nghiệp
            </button>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] font-semibold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2">
          <span>VTT Careers Core</span>
          <span className="h-1 w-1 rounded-full bg-slate-700"></span>
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  );
};

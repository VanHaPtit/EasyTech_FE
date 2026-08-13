import React, { useState } from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Building2,
  LogOut,
  Check,
  X,
  Search,
  ChevronDown,
  TrendingUp,
  Users,
  Clock,
  Ban,
  Eye,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────
interface BusinessRow {
  id: string;
  logo: string;
  name: string;
  email: string;
  website: string;
  subdomain: string;
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED';
  createdAt: string;
  totalJobs?: number;
}

// ─── Mock Data ────────────────────────────────────────────
const BUSINESSES: BusinessRow[] = [
  {
    id: 'b1',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=80&h=80',
    name: 'TechA Solutions JSC',
    email: 'hr@techa.vn',
    website: 'www.techa.vn',
    subdomain: 'techa.easytech.vn',
    status: 'ACTIVE',
    createdAt: '2026-07-10',
    totalJobs: 8,
  },
  {
    id: 'b2',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=80&h=80',
    name: 'InnovateTech VN',
    email: 'careers@innovate.vn',
    website: 'www.innovate.vn',
    subdomain: 'innovate.easytech.vn',
    status: 'PENDING',
    createdAt: '2026-08-06',
  },
  {
    id: 'b3',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&q=80&w=80&h=80',
    name: 'FutureSoft Corp',
    email: 'recruit@futuresoft.io',
    website: 'www.futuresoft.io',
    subdomain: 'futuresoft.easytech.vn',
    status: 'PENDING',
    createdAt: '2026-08-07',
  },
  {
    id: 'b4',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=80&h=80',
    name: 'DataBridge Analytics',
    email: 'hr@databridge.vn',
    website: 'www.databridge.vn',
    subdomain: 'databridge.easytech.vn',
    status: 'ACTIVE',
    createdAt: '2026-07-22',
    totalJobs: 3,
  },
  {
    id: 'b5',
    logo: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=80&h=80',
    name: 'CloudNine Systems',
    email: 'talent@cloudnine.io',
    website: 'www.cloudnine.io',
    subdomain: 'cloudnine.easytech.vn',
    status: 'BLOCKED',
    createdAt: '2026-06-15',
  },
  {
    id: 'b6',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=80&h=80',
    name: 'Nexus Digital Agency',
    email: 'hr@nexusdigital.vn',
    website: 'www.nexusdigital.vn',
    subdomain: 'nexusdigital.easytech.vn',
    status: 'PENDING',
    createdAt: '2026-08-08',
  },
];

// ─── Confirmation Dialog ──────────────────────────────────
const ConfirmDialog: React.FC<{
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ open, title, message, confirmLabel, confirmColor, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-sm p-6 space-y-5 text-center">
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold cursor-pointer transition-all">
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl text-white text-xs font-bold cursor-pointer transition-all ${confirmColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Dashboard ──────────────────────────────────────
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<BusinessRow[]>(BUSINESSES);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [confirm, setConfirm] = useState<{ open: boolean; type: 'approve' | 'reject' | 'block'; id: string }>({
    open: false, type: 'approve', id: '',
  });

  const stats = {
    total: businesses.length,
    pending: businesses.filter((b) => b.status === 'PENDING').length,
    active: businesses.filter((b) => b.status === 'ACTIVE').length,
    blocked: businesses.filter((b) => b.status === 'BLOCKED').length,
  };

  const filtered = businesses.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleConfirmAction = () => {
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id !== confirm.id) return b;
        if (confirm.type === 'approve') return { ...b, status: 'ACTIVE' as const };
        if (confirm.type === 'reject' || confirm.type === 'block') return { ...b, status: 'BLOCKED' as const };
        return b;
      })
    );
    setConfirm({ open: false, type: 'approve', id: '' });
  };

  const statusCfg = {
    PENDING: { cls: 'bg-amber-50 text-amber-600 border-amber-100', dot: 'bg-amber-500', label: 'Chờ duyệt' },
    ACTIVE: { cls: 'bg-emerald-50 text-emerald-600 border-emerald-100', dot: 'bg-emerald-500', label: 'Hoạt động' },
    BLOCKED: { cls: 'bg-red-50 text-red-500 border-red-100', dot: 'bg-red-500', label: 'Bị khóa' },
  };

  const statCards = [
    { label: 'Tổng Doanh nghiệp', value: stats.total, icon: Building2, color: 'bg-primary-50 text-primary-500 border-primary-100' },
    { label: 'Chờ duyệt', value: stats.pending, icon: Clock, color: 'bg-amber-50 text-amber-500 border-amber-100' },
    { label: 'Đang hoạt động', value: stats.active, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-500 border-emerald-100' },
    { label: 'Bị khóa', value: stats.blocked, icon: Ban, color: 'bg-red-50 text-red-500 border-red-100' },
  ];

  const confirmMeta = {
    approve: { title: 'Duyệt doanh nghiệp?', message: 'Doanh nghiệp sẽ được kích hoạt và nhận subdomain Career Site riêng.', confirmLabel: 'Đồng ý duyệt', confirmColor: 'bg-emerald-500 hover:bg-emerald-600' },
    reject: { title: 'Từ chối hồ sơ?', message: 'Doanh nghiệp sẽ bị từ chối và không thể truy cập nền tảng.', confirmLabel: 'Từ chối', confirmColor: 'bg-red-500 hover:bg-red-600' },
    block: { title: 'Khóa doanh nghiệp?', message: 'Tài khoản sẽ bị tạm khóa. HR sẽ không thể đăng nhập.', confirmLabel: 'Khóa tài khoản', confirmColor: 'bg-red-500 hover:bg-red-600' },
  };

  return (
    <>
      {/* Admin Shell Layout */}
      <div className="min-h-screen bg-slate-950 flex flex-col">
        {/* Admin Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-primary-500/30">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white tracking-wider">VTT Careers</p>
              <p className="text-[9px] font-bold text-primary-400 uppercase tracking-widest -mt-0.5">Admin Command Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
              <div className="h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center">
                <ShieldAlert className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Admin</p>
                <p className="text-[9px] text-slate-400 font-semibold">admin@easytech.vn</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Đăng xuất
            </button>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Admin Sidebar */}
          <aside className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col py-6 px-3 shrink-0">
            <nav className="space-y-1.5">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-500/10 text-primary-400 cursor-pointer">
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-sm font-bold">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
                <Building2 className="h-4 w-4" />
                <span className="text-sm font-semibold">Doanh nghiệp</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
                <Users className="h-4 w-4" />
                <span className="text-sm font-semibold">Tài khoản HR</span>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-slate-950 space-y-8 overflow-y-auto">
            {/* Page Title */}
            <div className="text-left">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Quản lý Doanh nghiệp</h1>
              <p className="text-sm text-slate-400 font-semibold mt-1">Duyệt hồ sơ và quản lý trạng thái doanh nghiệp trên nền tảng EasyTech</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {statCards.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-colors">
                    <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-white">{s.value}</p>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm doanh nghiệp, email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 focus:outline-none focus:border-primary-500 text-sm font-medium text-slate-200 placeholder:text-slate-600 transition-colors"
                />
              </div>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-700 bg-slate-900 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="PENDING">Chờ duyệt</option>
                  <option value="ACTIVE">Đang hoạt động</option>
                  <option value="BLOCKED">Bị khóa</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Business Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Doanh nghiệp</th>
                      <th className="px-6 py-4">Email HR</th>
                      <th className="px-6 py-4">Subdomain</th>
                      <th className="px-6 py-4">Trạng thái</th>
                      <th className="px-6 py-4">Ngày đăng ký</th>
                      <th className="px-6 py-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filtered.map((b) => {
                      const cfg = statusCfg[b.status];
                      return (
                        <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                          {/* Logo + Name */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={b.logo} alt={b.name} className="h-10 w-10 rounded-xl object-cover border border-slate-700" />
                              <div>
                                <p className="text-sm font-extrabold text-slate-100">{b.name}</p>
                                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{b.website}</p>
                              </div>
                            </div>
                          </td>
                          {/* Email */}
                          <td className="px-6 py-4 text-sm text-slate-400 font-medium">{b.email}</td>
                          {/* Subdomain */}
                          <td className="px-6 py-4">
                            <code className="text-xs font-mono text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-lg">
                              {b.status === 'ACTIVE' ? b.subdomain : '—'}
                            </code>
                          </td>
                          {/* Status */}
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.cls}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                          </td>
                          {/* Date */}
                          <td className="px-6 py-4 text-sm text-slate-500 font-medium">{b.createdAt}</td>
                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {b.status === 'PENDING' && (
                                <>
                                  <button
                                    onClick={() => setConfirm({ open: true, type: 'approve', id: b.id })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold transition-all cursor-pointer"
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                    Duyệt
                                  </button>
                                  <button
                                    onClick={() => setConfirm({ open: true, type: 'reject', id: b.id })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold transition-all cursor-pointer"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                    Từ chối
                                  </button>
                                </>
                              )}
                              {b.status === 'ACTIVE' && (
                                <>
                                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-700 text-slate-300 text-[10px] font-bold transition-all cursor-pointer">
                                    <Eye className="h-3.5 w-3.5" />
                                    Xem
                                  </button>
                                  <button
                                    onClick={() => setConfirm({ open: true, type: 'block', id: b.id })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-800 hover:bg-red-900/30 text-red-400 text-[10px] font-bold transition-all cursor-pointer"
                                  >
                                    <Ban className="h-3.5 w-3.5" />
                                    Khóa
                                  </button>
                                </>
                              )}
                              {b.status === 'BLOCKED' && (
                                <span className="text-[10px] font-semibold text-slate-600">Đã khóa</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="py-16 text-center">
                    <p className="text-slate-500 font-semibold text-sm">Không tìm thấy doanh nghiệp nào</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirm.open}
        {...confirmMeta[confirm.type]}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirm({ open: false, type: 'approve', id: '' })}
      />
    </>
  );
};

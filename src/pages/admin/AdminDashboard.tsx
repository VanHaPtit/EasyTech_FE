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
  Mail,
  Globe,
  Phone,
  MapPin,
  FileCheck2,
  Activity,
  ScrollText,
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
  representative?: string;
  phone?: string;
  address?: string;
  industry?: string;
  employees?: string;
  requestedPlan?: string;
  riskNote?: string;
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
    representative: 'Nguyễn Minh Anh',
    phone: '+84 900 100 200',
    address: '68 Nguyễn Huệ, Q.1, TP.HCM',
    industry: 'AI / SaaS',
    employees: '120+',
    requestedPlan: 'Growth',
    riskNote: 'Website, email domain và thông tin liên hệ trùng khớp.',
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
    representative: 'Trần Hoàng Nam',
    phone: '+84 912 345 678',
    address: 'Quận Cầu Giấy, Hà Nội',
    industry: 'Product Engineering',
    employees: '50-100',
    requestedPlan: 'Starter',
    riskNote: 'Cần kiểm tra thêm domain email doanh nghiệp.',
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
    representative: 'Lê Thu Hà',
    phone: '+84 988 221 144',
    address: 'TP. Thủ Đức, TP.HCM',
    industry: 'Software Outsourcing',
    employees: '200+',
    requestedPlan: 'Growth',
    riskNote: 'Hồ sơ đầy đủ, website hoạt động bình thường.',
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
    representative: 'Phạm Quốc Bảo',
    phone: '+84 933 775 199',
    address: 'Quận Hải Châu, Đà Nẵng',
    industry: 'Data Analytics',
    employees: '80+',
    requestedPlan: 'Starter',
    riskNote: 'Doanh nghiệp đã xác thực.',
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
    representative: 'CloudNine HR',
    phone: '+84 977 880 111',
    address: 'Quận 3, TP.HCM',
    industry: 'Cloud Infrastructure',
    employees: '30-50',
    requestedPlan: 'Starter',
    riskNote: 'Bị khóa do phản ánh tuyển dụng không minh bạch.',
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
    representative: 'Đỗ Gia Huy',
    phone: '+84 901 555 888',
    address: 'Quận Bình Thạnh, TP.HCM',
    industry: 'Digital Agency',
    employees: '20-50',
    requestedPlan: 'Starter',
    riskNote: 'Thiếu mã số thuế, cần yêu cầu bổ sung nếu làm dữ liệu thật.',
  },
];

const hrAccounts = [
  { name: 'Nguyễn Minh Anh', email: 'hr@techa.vn', business: 'TechA Solutions JSC', status: 'ACTIVE', lastLogin: 'Hôm nay 08:45' },
  { name: 'Trần Hoàng Nam', email: 'careers@innovate.vn', business: 'InnovateTech VN', status: 'PENDING', lastLogin: 'Chưa kích hoạt' },
  { name: 'Phạm Quốc Bảo', email: 'hr@databridge.vn', business: 'DataBridge Analytics', status: 'ACTIVE', lastLogin: 'Hôm qua 17:20' },
  { name: 'CloudNine HR', email: 'talent@cloudnine.io', business: 'CloudNine Systems', status: 'BLOCKED', lastLogin: '2026-07-30' },
];

// ─── Confirmation Dialog ──────────────────────────────────
const ConfirmDialog: React.FC<{
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: string;
  showReason?: boolean;
  reason?: string;
  onReasonChange?: (reason: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ open, title, message, confirmLabel, confirmColor, showReason, reason, onReasonChange, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-sm p-6 space-y-5 text-center">
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">{message}</p>
        </div>
        {showReason && (
          <div className="text-left space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Lý do từ chối</label>
            <textarea
              value={reason}
              onChange={(e) => onReasonChange?.(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-[#0052cc] focus:bg-white focus:outline-none"
              placeholder="VD: Thiếu thông tin xác thực doanh nghiệp, email không dùng domain công ty..."
            />
          </div>
        )}
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
  const [adminTab, setAdminTab] = useState<'overview' | 'businesses' | 'audit'>('overview');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessRow | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [confirm, setConfirm] = useState<{ open: boolean; type: 'approve' | 'reject' | 'block'; id: string }>({
    open: false, type: 'approve', id: '',
  });

  const stats = {
    total: businesses.length,
    pending: businesses.filter((b) => b.status === 'PENDING').length,
    active: businesses.filter((b) => b.status === 'ACTIVE').length,
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
    setSelectedBusiness(null);
    setRejectReason('');
    setConfirm({ open: false, type: 'approve', id: '' });
  };

  const statusCfg = {
    PENDING: { cls: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-500', label: 'Chờ duyệt' },
    ACTIVE: { cls: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-500', label: 'Hoạt động' },
    BLOCKED: { cls: 'bg-red-50 text-red-600 border-red-200', dot: 'bg-red-500', label: 'Bị khóa' },
  };

  const statCards = [
    { label: 'Tổng Doanh nghiệp', value: stats.total, icon: Building2, color: 'bg-blue-50 text-[#0052cc] border-blue-100' },
    { label: 'Chờ duyệt', value: stats.pending, icon: Clock, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { label: 'Đang hoạt động', value: stats.active, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  ];

  const confirmMeta = {
    approve: { title: 'Duyệt doanh nghiệp?', message: 'Doanh nghiệp sẽ được kích hoạt và nhận subdomain Career Site riêng.', confirmLabel: 'Đồng ý duyệt', confirmColor: 'bg-emerald-500 hover:bg-emerald-600' },
    reject: { title: 'Từ chối hồ sơ?', message: 'Doanh nghiệp sẽ bị từ chối và không thể truy cập nền tảng.', confirmLabel: 'Từ chối', confirmColor: 'bg-red-500 hover:bg-red-600' },
    block: { title: 'Khóa doanh nghiệp?', message: 'Tài khoản sẽ bị tạm khóa. HR sẽ không thể đăng nhập.', confirmLabel: 'Khóa tài khoản', confirmColor: 'bg-red-500 hover:bg-red-600' },
  };

  const recentAudits = [
    { action: 'Duyệt TechA Solutions JSC', actor: 'admin@easytech.vn', time: '08:30 hôm nay', tone: 'text-emerald-600' },
    { action: 'Khóa CloudNine Systems', actor: 'admin@easytech.vn', time: 'Hôm qua', tone: 'text-red-600' },
    { action: 'Nhận hồ sơ InnovateTech VN', actor: 'system', time: '2 ngày trước', tone: 'text-amber-600' },
  ];

  const auditRows = [
    { time: '2026-08-14 08:30', actor: 'admin@easytech.vn', action: 'APPROVE_BUSINESS', target: 'TechA Solutions JSC', detail: 'Cấp subdomain techa.easytech.vn' },
    { time: '2026-08-13 17:10', actor: 'admin@easytech.vn', action: 'BLOCK_BUSINESS', target: 'CloudNine Systems', detail: 'Khóa do phản ánh tuyển dụng không minh bạch' },
    { time: '2026-08-13 14:22', actor: 'system', action: 'RECEIVE_BUSINESS_REQUEST', target: 'Nexus Digital Agency', detail: 'Hồ sơ chờ kiểm duyệt' },
    { time: '2026-08-12 09:05', actor: 'admin@easytech.vn', action: 'REVIEW_BUSINESS', target: 'FutureSoft Corp', detail: 'Kiểm tra website và email HR' },
  ];

  const adminNavItems = [
    { id: 'overview' as const, label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'businesses' as const, label: 'Doanh nghiệp', icon: Building2 },
    { id: 'audit' as const, label: 'Audit Log', icon: ScrollText },
  ];

  const pageMeta = {
    overview: {
      title: 'Tổng quan kiểm duyệt',
    },
    businesses: {
      title: 'Quản lý Doanh nghiệp',
    },
    audit: {
      title: 'Audit Log',
    },
  };

  return (
    <>
      {/* Admin Shell Layout */}
      <div className="min-h-screen bg-[#f4f7fb] flex flex-col font-sans">
        {/* Admin Header */}
        <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#0052cc] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-800 tracking-wider">VTT Careers</p>
              <p className="text-[9px] font-bold text-[#0052cc] uppercase tracking-widest -mt-0.5">Admin Command Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="h-6 w-6 rounded-full bg-[#0052cc] flex items-center justify-center">
                <ShieldAlert className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Admin</p>
                <p className="text-[9px] text-slate-500 font-semibold">admin@easytech.vn</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/login')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 border border-transparent transition-all cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Đăng xuất
            </button>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Admin Sidebar */}
          <aside className="w-56 bg-white border-r border-slate-200 flex flex-col py-6 px-3 shrink-0">
            <nav className="space-y-1.5">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const active = adminTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAdminTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors text-left ${
                      active
                        ? 'bg-blue-50 text-[#0052cc]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className={`text-sm ${active ? 'font-bold' : 'font-semibold'}`}>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 space-y-8 overflow-y-auto">
            {/* Page Title */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
              <div className="text-left">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{pageMeta[adminTab].title}</h1>
              </div>
            </div>

            {/* Stats Grid */}
            <div className={`${adminTab === 'overview' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-3 gap-5`}>
              {statCards.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 hover:shadow-md transition-shadow">
                    <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-slate-800">{s.value}</p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Filter Bar */}
            <div className={`${adminTab === 'businesses' ? 'flex' : 'hidden'} flex-wrap items-center gap-3`}>
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm doanh nghiệp, email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-colors shadow-sm"
                />
              </div>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-sm font-semibold text-slate-700 transition-colors cursor-pointer shadow-sm"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="PENDING">Chờ duyệt</option>
                  <option value="ACTIVE">Đang hoạt động</option>
                  <option value="BLOCKED">Bị khóa</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className={`${adminTab === 'overview' ? 'grid' : 'hidden'} grid-cols-1 xl:grid-cols-3 gap-5`}>
              <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">Hàng đợi kiểm duyệt</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Các doanh nghiệp cần kiểm tra trước khi cấp Career Site.</p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-600 border border-amber-200">
                    {stats.pending} đang chờ
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {businesses.filter((b) => b.status === 'PENDING').slice(0, 3).map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBusiness(b)}
                      className="text-left rounded-xl border border-slate-100 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img src={b.logo} alt={b.name} className="h-10 w-10 rounded-xl object-cover border border-slate-200" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-extrabold text-slate-800">{b.name}</p>
                          <p className="truncate text-[10px] font-semibold text-slate-500">{b.industry}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-[11px] font-semibold leading-relaxed text-slate-500">{b.riskNote}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-[#0052cc]" />
                  <p className="text-sm font-extrabold text-slate-800">Audit gần đây</p>
                </div>
                <div className="space-y-3">
                  {recentAudits.map((audit) => (
                    <div key={audit.action} className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                      <p className={`text-xs font-bold ${audit.tone}`}>{audit.action}</p>
                      <p className="mt-1 text-[10px] font-semibold text-slate-500">{audit.actor} · {audit.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Table */}
            <div className={`${adminTab === 'businesses' ? 'block' : 'hidden'} bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Doanh nghiệp</th>
                      <th className="px-6 py-4">Email HR</th>
                      <th className="px-6 py-4">Subdomain</th>
                      <th className="px-6 py-4">Trạng thái</th>
                      <th className="px-6 py-4">Ngày đăng ký</th>
                      <th className="px-6 py-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((b) => {
                      const cfg = statusCfg[b.status];
                      return (
                        <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                          {/* Logo + Name */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={b.logo} alt={b.name} className="h-10 w-10 rounded-xl object-cover border border-slate-200" />
                              <div>
                                <p className="text-sm font-extrabold text-slate-800">{b.name}</p>
                                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{b.website}</p>
                              </div>
                            </div>
                          </td>
                          {/* Email */}
                          <td className="px-6 py-4 text-sm text-slate-600 font-medium">{b.email}</td>
                          {/* Subdomain */}
                          <td className="px-6 py-4">
                            <code className="text-xs font-mono text-[#0052cc] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
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
                                    onClick={() => setSelectedBusiness(b)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-bold transition-all cursor-pointer"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Xem
                                  </button>
                                  <button
                                    onClick={() => setConfirm({ open: true, type: 'approve', id: b.id })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold transition-all cursor-pointer shadow-sm shadow-emerald-500/20"
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                    Duyệt
                                  </button>
                                  <button
                                    onClick={() => setConfirm({ open: true, type: 'reject', id: b.id })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold transition-all cursor-pointer shadow-sm shadow-red-500/20"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                    Từ chối
                                  </button>
                                </>
                              )}
                              {b.status === 'ACTIVE' && (
                                <>
                                  <button
                                    onClick={() => setSelectedBusiness(b)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-bold transition-all cursor-pointer"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Xem
                                  </button>
                                  <button
                                    onClick={() => setConfirm({ open: true, type: 'block', id: b.id })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-[10px] font-bold transition-all cursor-pointer"
                                  >
                                    <Ban className="h-3.5 w-3.5" />
                                    Khóa
                                  </button>
                                </>
                              )}
                              {b.status === 'BLOCKED' && (
                                <span className="text-[10px] font-semibold text-slate-400">Đã khóa</span>
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

            <div className={`${adminTab === 'audit' ? 'grid' : 'hidden'} grid-cols-1 gap-5`}>
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">Audit Log đầy đủ</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">Theo dõi các thao tác quản trị quan trọng.</p>
                  </div>
                  <Activity className="h-5 w-5 text-[#0052cc]" />
                </div>
                <div className="divide-y divide-slate-100">
                  {auditRows.map((row) => (
                    <div key={`${row.time}-${row.action}`} className="px-5 py-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="text-xs font-extrabold text-slate-800">{row.action}</p>
                        <p className="text-[10px] font-semibold text-slate-400">{row.time}</p>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-600">{row.target}</p>
                      <p className="mt-1 text-[11px] font-semibold text-slate-500">{row.actor} · {row.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirm.open}
        {...confirmMeta[confirm.type]}
        showReason={confirm.type === 'reject'}
        reason={rejectReason}
        onReasonChange={setRejectReason}
        onConfirm={handleConfirmAction}
        onCancel={() => {
          setRejectReason('');
          setConfirm({ open: false, type: 'approve', id: '' });
        }}
      />

      {/* Business Detail Drawer */}
      {selectedBusiness && (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/40 backdrop-blur-sm">
          <div className="h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4">
              <div>
                <p className="text-sm font-extrabold text-slate-800">Hồ sơ doanh nghiệp</p>
                <p className="text-xs font-semibold text-slate-500">Chi tiết thông tin đăng ký</p>
              </div>
              <button
                onClick={() => setSelectedBusiness(null)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-800 cursor-pointer"
              >
                Đóng
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-4">
                  <img src={selectedBusiness.logo} alt={selectedBusiness.name} className="h-16 w-16 rounded-2xl object-cover border border-slate-200 bg-white" />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-extrabold text-slate-900">{selectedBusiness.name}</h2>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{selectedBusiness.industry} · {selectedBusiness.employees} nhân sự</p>
                    <span className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusCfg[selectedBusiness.status].cls}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusCfg[selectedBusiness.status].dot}`} />
                      {statusCfg[selectedBusiness.status].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* HR Accounts attached to this business */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-[#0052cc]" />
                  <p className="text-sm font-extrabold text-slate-800">Tài khoản Nhân sự (HR)</p>
                </div>
                
                {(() => {
                  const hrForBusiness = hrAccounts.find(hr => hr.business === selectedBusiness.name) || {
                    name: selectedBusiness.representative,
                    email: selectedBusiness.email,
                    status: selectedBusiness.status,
                    lastLogin: 'Chưa xác định'
                  };

                  return (
                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {hrForBusiness.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{hrForBusiness.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{hrForBusiness.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold ${
                            hrForBusiness.status === 'ACTIVE'
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                              : hrForBusiness.status === 'PENDING'
                                ? 'border-amber-200 bg-amber-50 text-amber-600'
                                : 'border-red-200 bg-red-50 text-red-600'
                          }`}>
                           {hrForBusiness.status}
                         </span>
                         <p className="mt-1 text-[10px] text-slate-500">Lần cuối: {hrForBusiness.lastLogin}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Mail, label: 'Email HR', value: selectedBusiness.email },
                  { icon: Globe, label: 'Website', value: selectedBusiness.website },
                  { icon: Phone, label: 'Số điện thoại', value: selectedBusiness.phone || 'Chưa có' },
                  { icon: MapPin, label: 'Địa chỉ', value: selectedBusiness.address || 'Chưa có' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <Icon className="mb-3 h-4 w-4 text-[#0052cc]" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
                      <p className="mt-1 text-xs font-bold text-slate-800">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-extrabold text-slate-800">Checklist xác minh</p>
                <div className="mt-4 space-y-3">
                  {[
                    'Email HR dùng domain doanh nghiệp hoặc domain có thể xác minh',
                    'Website doanh nghiệp hoạt động và có thông tin tuyển dụng/liên hệ',
                    'Thông tin đại diện, số điện thoại và địa chỉ hợp lệ',
                    'Không yêu cầu truy cập dữ liệu CV của doanh nghiệp khác',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <FileCheck2 className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
                      <p className="text-xs font-semibold leading-relaxed text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Ghi chú kiểm duyệt</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-700">{selectedBusiness.riskNote}</p>
                </div>
              </div>

              {selectedBusiness.status === 'PENDING' && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setConfirm({ open: true, type: 'reject', id: selectedBusiness.id })}
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-extrabold text-red-600 hover:bg-red-100 cursor-pointer transition-colors"
                  >
                    Từ chối hồ sơ
                  </button>
                  <button
                    onClick={() => setConfirm({ open: true, type: 'approve', id: selectedBusiness.id })}
                    className="rounded-2xl bg-emerald-500 px-4 py-3 text-xs font-extrabold text-white hover:bg-emerald-600 cursor-pointer transition-colors shadow-sm shadow-emerald-500/20"
                  >
                    Duyệt doanh nghiệp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

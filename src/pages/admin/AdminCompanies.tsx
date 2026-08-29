import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Check, X, Eye, Ban, ShieldAlert, Building2, Mail, Globe, Phone, MapPin, Users } from 'lucide-react';

interface BusinessRow {
  id: string;
  logo: string;
  name: string;
  email: string;
  website: string;
  subdomain: string;
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED';
  createdAt: string;
  representative?: string;
  hrPosition?: string;
  hrDepartment?: string;
  hrPhone?: string;
  phone?: string;
  address?: string;
  city?: string;
  industry?: string;
  employees?: string;
  taxCode?: string;
  businessType?: string;
}

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
    representative: 'Nguyễn Minh Anh',
    hrPosition: 'HR Manager',
    hrDepartment: 'Human Resources',
    hrPhone: '0988 123 456',
    phone: '+84 900 100 200',
    address: '68 Nguyễn Huệ, Quận 1',
    city: 'Hồ Chí Minh',
    industry: 'AI / SaaS',
    employees: '120+',
    taxCode: '0101234567',
    businessType: 'Công ty Cổ phần',
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
  }
];

const hrAccounts = [
  { name: 'Nguyễn Minh Anh', email: 'hr@techa.vn', business: 'TechA Solutions JSC', status: 'ACTIVE', lastLogin: 'Hôm nay 08:45' },
  { name: 'Trần Hoàng Nam', email: 'careers@innovate.vn', business: 'InnovateTech VN', status: 'PENDING', lastLogin: 'Chưa kích hoạt' },
];

export const AdminCompanies: React.FC = () => {
  const [businesses, setBusinesses] = useState<BusinessRow[]>(BUSINESSES);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessRow | null>(null);
  const [detailTab, setDetailTab] = useState<'company' | 'hr'>('company');

  useEffect(() => {
    if (selectedBusiness) {
      setDetailTab('company');
    }
  }, [selectedBusiness]);

  const filtered = businesses.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCfg = {
    PENDING: { cls: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-500', label: 'Chờ duyệt' },
    ACTIVE: { cls: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-500', label: 'Hoạt động' },
    BLOCKED: { cls: 'bg-red-50 text-red-600 border-red-200', dot: 'bg-red-500', label: 'Bị khóa' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Quản lý Doanh nghiệp</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">Phê duyệt, khóa hoặc xem chi tiết thông tin doanh nghiệp đăng ký Career Site.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm doanh nghiệp, email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-sm font-medium text-slate-800 placeholder:text-slate-400 shadow-sm"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-sm font-semibold text-slate-700 shadow-sm"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="PENDING">Chờ duyệt</option>
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="BLOCKED">Bị khóa</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Doanh nghiệp</th>
                <th className="px-6 py-4">Email HR</th>
                <th className="px-6 py-4">Subdomain</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((b) => {
                const cfg = statusCfg[b.status];
                return (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={b.logo} alt={b.name} className="h-10 w-10 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <p className="text-sm font-extrabold text-slate-800">{b.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{b.email}</td>
                    <td className="px-6 py-4">
                      <code className="text-xs font-mono text-[#0052cc] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                        {b.status === 'ACTIVE' ? b.subdomain : '—'}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.cls}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedBusiness(b)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-bold"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Xem
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
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
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50"
              >
                Đóng
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
                <img src={selectedBusiness.logo} alt={selectedBusiness.name} className="h-16 w-16 rounded-2xl object-cover border border-slate-200 bg-white" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-extrabold text-slate-900">{selectedBusiness.name}</h2>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{selectedBusiness.industry} · {selectedBusiness.employees} nhân sự</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 border-b border-slate-200 bg-white px-2 mb-6">
                <button 
                  onClick={() => setDetailTab('company')}
                  className={`pb-3 pt-2 text-sm font-bold border-b-2 ${detailTab === 'company' ? 'border-[#0052cc] text-[#0052cc]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Thông tin Công ty
                </button>
                <button 
                  onClick={() => setDetailTab('hr')}
                  className={`pb-3 pt-2 text-sm font-bold border-b-2 ${detailTab === 'hr' ? 'border-[#0052cc] text-[#0052cc]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Đại diện HR
                </button>
              </div>

              {detailTab === 'company' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: ShieldAlert, label: 'Mã số thuế (MST)', value: selectedBusiness.taxCode || 'Chưa có' },
                    { icon: Building2, label: 'Loại hình DN', value: selectedBusiness.businessType || 'Chưa có' },
                    { icon: Mail, label: 'Email công ty', value: selectedBusiness.email },
                    { icon: Globe, label: 'Website', value: selectedBusiness.website },
                    { icon: Phone, label: 'Số điện thoại', value: selectedBusiness.phone || 'Chưa có' },
                    { icon: MapPin, label: 'Địa chỉ trụ sở', value: selectedBusiness.address || 'Chưa có' },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <item.icon className="mb-3 h-4 w-4 text-[#0052cc]" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
                      <p className="mt-1 text-xs font-bold text-slate-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {detailTab === 'hr' && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4 text-[#0052cc]" />
                    <p className="text-sm font-extrabold text-slate-800">Tài khoản Nhân sự (HR)</p>
                  </div>
                  {(() => {
                    const hr = hrAccounts.find(h => h.business === selectedBusiness.name) || { name: selectedBusiness.representative, email: selectedBusiness.email };
                    return (
                      <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl bg-slate-50">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {hr.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{hr.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{hr.email}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Briefcase, CheckCircle2, Clock, FileText, Search, UserRound } from 'lucide-react';

const APPLICATION_NOTIFICATIONS = [
  {
    id: 'APP-2026-0001',
    candidate: 'Lê Hoàng Phúc',
    email: 'phuc.le@gmail.com',
    job: 'Senior AI Engineer',
    submittedAt: '2026-08-17 09:20',
    source: 'techa.easytech.vn',
    cvMode: 'Yêu cầu CV',
    score: 87,
    status: 'Chưa xem',
  },
  {
    id: 'APP-2026-0002',
    candidate: 'Phạm Thu Hà',
    email: 'ha.pham@outlook.com',
    job: 'Backend Developer (Java)',
    submittedAt: '2026-08-17 09:06',
    source: 'techa.easytech.vn',
    cvMode: 'Yêu cầu CV',
    score: 92,
    status: 'Chưa xem',
  },
  {
    id: 'APP-2026-0003',
    candidate: 'Minh Quân',
    email: 'quan.minh@gmail.com',
    job: 'Thực tập sinh Marketing',
    submittedAt: '2026-08-17 08:15',
    source: 'techa.easytech.vn',
    cvMode: 'Không yêu cầu CV',
    score: null,
    status: 'Đã xem',
  },
];

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-slate-500">Thông báo</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Thông báo ứng tuyển</h1>
          <p className="text-sm font-medium text-slate-500">
            HR xem nhanh ai vừa nộp hồ sơ, nộp vào JD nào và hồ sơ đó đến từ Career Site nào.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/applications/list')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold shadow-md shadow-primary-500/10 cursor-pointer"
        >
          <FileText className="h-4 w-4" />
          Mở danh sách ứng viên
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Thông báo mới', value: '2', icon: Bell, color: 'text-primary-600 bg-primary-50 border-primary-100' },
          { label: 'CV cần AI scoring', value: '2', icon: FileText, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
          { label: 'JD không yêu cầu CV', value: '1', icon: Briefcase, color: 'text-amber-600 bg-amber-50 border-amber-100' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="premium-card bg-white p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">{item.value}</p>
              </div>
              <div className={`h-11 w-11 rounded-xl border flex items-center justify-center ${item.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="premium-card bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Luồng thông báo CV mới</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Candidate nộp form trên Career Site {'->'} hệ thống tạo Application {'->'} HR nhận notification.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Tìm ứng viên hoặc JD..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {APPLICATION_NOTIFICATIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate('/dashboard/applications/list')}
              className="w-full text-left px-6 py-5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-500 shrink-0">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-extrabold text-slate-800">{item.candidate}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.status === 'Chưa xem'
                          ? 'bg-primary-50 text-primary-600 border-primary-100'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mt-1">{item.email}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-bold text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        {item.job}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {item.submittedAt}
                      </span>
                      <span>{item.source}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:justify-end">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                    item.cvMode === 'Yêu cầu CV'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {item.cvMode}
                  </span>
                  {item.score ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      AI {item.score}%
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400">Chờ HR xem form</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

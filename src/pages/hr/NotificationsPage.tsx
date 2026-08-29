import React from 'react';
import { Bell, Check, Trash2, FileText, Settings, AlertCircle } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const NOTIFICATIONS = [
    {
      id: 'n1',
      candidate: 'Lê Hoàng Phúc',
      job: 'Senior AI Engineer',
      time: '5 phút trước',
      type: 'APPLICATION',
      isRead: false,
      details: 'AI Score: 87%',
    },
    {
      id: 'n2',
      candidate: 'Phạm Thu Hà',
      job: 'Backend Developer (Java)',
      time: '18 phút trước',
      type: 'APPLICATION',
      isRead: false,
      details: 'AI Score: 92%',
    },
    {
      id: 'n3',
      candidate: 'Hệ thống',
      job: '',
      time: '2 giờ trước',
      type: 'SYSTEM',
      isRead: true,
      details: 'Bảo trì hệ thống định kỳ vào 00:00 ngày mai.',
    },
    {
      id: 'n4',
      candidate: 'Minh Quân',
      job: 'Thực tập sinh Marketing',
      time: 'Hôm qua',
      type: 'APPLICATION',
      isRead: true,
      details: 'Không yêu cầu CV.',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Thông báo</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">Quản lý toàn bộ thông báo ứng tuyển và hệ thống.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Check className="h-4 w-4" />
            Đánh dấu tất cả đã đọc
          </button>
          <button className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        <button className="pb-3 text-sm font-bold text-primary-600 border-b-2 border-primary-600">
          Tất cả
        </button>
        <button className="pb-3 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
          Chưa đọc (2)
        </button>
        <button className="pb-3 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
          Ứng tuyển mới
        </button>
        <button className="pb-3 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
          Hệ thống
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
        {NOTIFICATIONS.map((item) => (
          <div key={item.id} className={`flex items-start gap-4 p-5 transition-colors hover:bg-slate-50 ${!item.isRead ? 'bg-blue-50/30' : ''}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
              item.type === 'APPLICATION' ? 'bg-blue-100 text-[#0052cc]' : 'bg-amber-100 text-amber-600'
            }`}>
              {item.type === 'APPLICATION' ? <FileText className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${!item.isRead ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'}`}>
                {item.type === 'APPLICATION' ? `${item.candidate} vừa ứng tuyển` : item.candidate}
              </p>
              {item.job && (
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Vị trí: <span className="text-slate-700">{item.job}</span>
                </p>
              )}
              <p className="text-xs font-semibold text-slate-500 mt-1">{item.details}</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-slate-400">{item.time}</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity">
              {!item.isRead && (
                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg tooltip-trigger relative" aria-label="Đánh dấu đã đọc">
                  <Check className="h-4 w-4" />
                </button>
              )}
              <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Xóa">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

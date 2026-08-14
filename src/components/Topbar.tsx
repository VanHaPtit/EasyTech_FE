import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <header className="h-[64px] border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-slate-900 hidden sm:block">HR Workspace</h2>
        <span className="bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:block">TechA JSC</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Dropdown */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[13px] font-bold text-slate-900 leading-tight">Nguyễn Minh Anh</span>
            <span className="text-[11px] text-slate-500 font-medium">HR</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden relative">
             <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, Settings, Rocket } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab: _currentTab, onTabChange }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { id: 'dashboard', href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { id: 'jobs', href: '/dashboard/jobs', label: 'Tin tuyển dụng', icon: Briefcase },
    { 
      id: 'applications',
      href: '/dashboard/applications/kanban', // Default to kanban
      label: 'Ứng viên', 
      icon: FileText,
      subItems: [
        { id: 'kanban', href: '/dashboard/applications/kanban', label: 'Kanban Pipeline' },
        { id: 'list', href: '/dashboard/applications/list', label: 'Danh sách' }
      ]
    },
    { id: 'settings', href: '/dashboard/settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white shrink-0">
          <Rocket className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold text-slate-900 leading-tight">VTT Careers</h1>
          <span className="text-xs text-slate-500 font-medium">EasyTech Platform</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.id === 'applications' ? '/dashboard/applications' : item.href);
            
          const Icon = item.icon;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          
          return (
            <div key={item.href} className="mb-2">
              <Link 
                to={item.href}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-[15px] ${
                  isActive && !hasSubItems
                    ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/20' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-[22px] h-[22px]" />
                <span>{item.label}</span>
              </Link>

              {/* Sub Menu */}
              {hasSubItems && isActive && (
                <div className="ml-[22px] mt-1 pl-4 border-l border-slate-200 flex flex-col gap-1">
                  {item.subItems?.map(sub => {
                     const isSubActive = pathname === sub.href;
                     return (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        onClick={() => onTabChange(sub.id)}
                        className={`px-3 py-2 rounded-lg text-[14px] transition-colors ${
                          isSubActive
                            ? 'bg-primary-50/80 text-primary-600 font-semibold'
                            : 'text-slate-500 hover:text-slate-900 font-medium'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 relative">
             <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-semibold text-slate-900 truncate">Nguyễn Minh Anh</p>
            <p className="text-[13px] text-slate-500 truncate">minhanh@techa.vn</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

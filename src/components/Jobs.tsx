import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const jobsData = [
    {
      title: 'DevOps Engineer',
      type: 'Full-time',
      location: 'TP. HCM',
      category: 'DevOps',
      status: 'Bản nháp', // Draft
      rounds: 0,
      candidates: 0,
    },
    {
      title: 'Data Analyst',
      type: 'Full-time',
      location: 'Remote',
      category: 'Data',
      status: 'Đang mở', // Open
      rounds: 2,
      candidates: 41,
    },
    {
      title: 'Backend Developer (Java)',
      type: 'Full-time',
      location: 'Hà Nội',
      category: 'Backend',
      status: 'Đang mở', // Open
      rounds: 3,
      candidates: 52,
    },
    {
      title: 'Product Designer',
      type: 'Full-time',
      location: 'TP. HCM',
      category: 'Thiết kế',
      status: 'Đang mở', // Open
      rounds: 4,
      candidates: 64,
    },
    {
      title: 'Senior AI Engineer',
      type: 'Full-time',
      location: 'TP. HCM (Hybrid)',
      category: 'AI / Machine Learning',
      status: 'Đang mở', // Open
      rounds: 3,
      candidates: 86,
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] space-y-8">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Dashboard</span>
            <span className="text-[10px]">&gt;</span>
            <span className="text-slate-500">Tin tuyển dụng</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Danh sách tin tuyển dụng</h1>
          <p className="text-sm font-medium text-slate-500">
            Quản lý toàn bộ vị trí tuyển dụng của TechA JSC
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm font-bold shadow-sm transition-all duration-200 cursor-pointer">
            <span>Xuất dữ liệu</span>
          </button>
          
          <button 
            onClick={() => navigate('/dashboard/jobs/create')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 text-sm font-bold shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 transition-all duration-200 cursor-pointer"
          >
            <span>Tạo tin tuyển dụng</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Tổng số vị trí */}
        <div className="premium-card bg-white p-6 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-slate-400">Tổng số vị trí</span>
              <p className="text-3xl font-extrabold text-slate-800 tracking-tight">24</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2">
            <span>+2</span>
          </div>
        </div>

        {/* Card 2: Vị trí đang mở */}
        <div className="premium-card bg-white p-6 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-slate-400">Vị trí đang mở</span>
              <p className="text-3xl font-extrabold text-slate-800 tracking-tight">12</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2">
            <span>Tăng 15%</span>
          </div>
        </div>

        {/* Card 3: Ứng viên mới */}
        <div className="premium-card bg-white p-6 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-slate-400">Ứng viên mới</span>
              <p className="text-3xl font-extrabold text-slate-800 tracking-tight">86</p>
            </div>
          </div>
          {/* Empty spacer to align elements */}
          <div className="mt-2 h-4"></div>
        </div>

        {/* Card 4: TG tuyển TB */}
        <div className="premium-card bg-white p-6 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-slate-400">TG tuyển TB</span>
              <p className="text-3xl font-extrabold text-slate-800 tracking-tight">21 ngày</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-primary-600 mt-2">
            <span>-2 ngày</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Tìm theo tiêu đề hoặc phòng ban..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm font-medium transition-colors"
          />
        </div>

        {/* Dropdown Selector */}
        <button className="w-full sm:w-auto inline-flex items-center justify-between gap-6 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer">
          <span>Mới nhất</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="premium-card bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider select-none">
                <th className="px-6 py-4">Tiêu đề</th>
                <th className="px-6 py-4">Phòng ban</th>
                <th className="px-6 py-4">Địa điểm</th>
                <th className="px-6 py-4">Danh mục</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-center">Số vòng</th>
                <th className="px-6 py-4 text-center">Ứng viên</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobsData.map((job, index) => {
                const isDraft = job.status === 'Bản nháp';
                return (
                  <tr 
                    key={index}
                    onClick={() => navigate('/dashboard/jobs/senior-ai-engineer')}
                    className="hover:bg-slate-50/80 transition-colors text-sm font-semibold text-slate-700 cursor-pointer"
                  >
                    {/* Job Title with Icon */}
                    <td className="px-6 py-4.5 flex items-center gap-3">
                      <span className="font-extrabold text-slate-800 hover:text-primary-500 cursor-pointer transition-colors">
                        {job.title}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4.5 text-slate-500 font-medium">{job.type}</td>

                    {/* Location */}
                    <td className="px-6 py-4.5 text-slate-500 font-medium">{job.location}</td>

                    {/* Category */}
                    <td className="px-6 py-4.5 text-slate-500 font-medium">{job.category}</td>

                    {/* Status Badge */}
                    <td className="px-6 py-4.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        isDraft 
                          ? 'bg-slate-100 text-slate-500 border-slate-200' 
                          : 'bg-emerald-50 text-emerald-500 border-emerald-100'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          isDraft ? 'bg-slate-400' : 'bg-emerald-500'
                        }`}></span>
                        {job.status}
                      </span>
                    </td>

                    {/* Rounds */}
                    <td className="px-6 py-4.5 text-center text-slate-600">{job.rounds}</td>

                    {/* Candidates */}
                    <td className="px-6 py-4.5 text-center text-slate-800 font-bold">{job.candidates}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 select-none">
          {/* Result Counts info */}
          <span className="text-xs font-semibold text-slate-400">
            Hiển thị <span className="text-slate-600 font-bold">1-5</span> trên <span className="text-slate-600 font-bold">6</span> kết quả
          </span>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Prev Page Button */}
            <button 
              disabled
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-300 bg-slate-50/50 cursor-not-allowed transition-all text-xs font-bold"
            >
              &lt;
            </button>

            {/* Page 1 Button (Active) */}
            <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-500/10 transition-all cursor-pointer">
              1
            </button>

            {/* Page 2 Button */}
            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all cursor-pointer">
              2
            </button>

            {/* Next Page Button */}
            <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer text-xs font-bold"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

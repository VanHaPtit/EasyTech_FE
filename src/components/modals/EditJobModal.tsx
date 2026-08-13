import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData: {
    title: string;
    description: string;
    salaryFrom: number;
    salaryTo: number;
    currency: string;
    location: string;
    workTime: string;
    experience: number;
  };
  onSave: (updatedData: any) => void;
}

export const EditJobModal: React.FC<EditJobModalProps> = ({ isOpen, onClose, jobData, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salaryFrom, setSalaryFrom] = useState(0);
  const [salaryTo, setSalaryTo] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [location, setLocation] = useState('');
  const [workTime, setWorkTime] = useState('Full-time');
  const [experience, setExperience] = useState(0);

  useEffect(() => {
    if (jobData) {
      setTitle(jobData.title);
      setDescription(jobData.description);
      setSalaryFrom(jobData.salaryFrom);
      setSalaryTo(jobData.salaryTo);
      setCurrency(jobData.currency);
      setLocation(jobData.location);
      setWorkTime(jobData.workTime);
      setExperience(jobData.experience);
    }
  }, [jobData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      salaryFrom,
      salaryTo,
      currency,
      location,
      workTime,
      experience
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-slate-800 uppercase tracking-wider">
            Chỉnh sửa tin tuyển dụng
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tiêu đề Job</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Địa điểm</label>
              <input 
                type="text" 
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>

            {/* Salary From */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mức lương từ</label>
              <input 
                type="number" 
                required
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>

            {/* Salary To */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mức lương đến</label>
              <input 
                type="number" 
                required
                value={salaryTo}
                onChange={(e) => setSalaryTo(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>

            {/* Currency */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Đơn vị tiền tệ</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              >
                <option value="USD">USD ($)</option>
                <option value="VND">VND (đ)</option>
              </select>
            </div>

            {/* Work Time */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Hình thức</label>
              <select
                value={workTime}
                onChange={(e) => setWorkTime(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Experience */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Kinh nghiệm (năm)</label>
              <input 
                type="number" 
                required
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Description (Markdown Textarea) */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mô tả công việc (Markdown)</label>
            <textarea
              required
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary-500 focus:bg-white resize-none transition-all leading-relaxed"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 select-none">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, Mail, Settings } from 'lucide-react';

interface RoundItem {
  id: string;
  name: string;
  passTemplateId: string;
  failTemplateId: string;
  testLink?: string;
}

export const RoundsConfig: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock template options matching the email templates we created in settings
  const emailTemplates = [
    { id: 'temp-1', label: 'Qua vòng CV Screening' },
    { id: 'temp-2', label: 'Cảm ơn ứng viên' },
    { id: 'temp-3', label: 'Qua vòng Online Test' },
    { id: 'temp-4', label: 'Không đạt Online Test' },
    { id: 'temp-5', label: 'Offer Letter' },
    { id: 'temp-6', label: 'Mời phỏng vấn' },
  ];

  // Default rounds configuration for Senior AI Engineer
  const [rounds, setRounds] = useState<RoundItem[]>([
    { id: '1', name: 'Sàng lọc hồ sơ (CV Screening)', passTemplateId: 'temp-1', failTemplateId: 'temp-2' },
    { id: '2', name: 'Đánh giá năng lực (Online Test)', passTemplateId: 'temp-3', failTemplateId: 'temp-4' },
    { id: '3', name: 'Phỏng vấn chuyên môn (Technical Interview)', passTemplateId: 'temp-6', failTemplateId: 'temp-2' },
  ]);

  const handleAddRound = () => {
    const newId = (rounds.length + 1).toString();
    setRounds((prev) => [
      ...prev,
      { id: newId, name: `Vòng mới ${newId}`, passTemplateId: 'temp-1', failTemplateId: 'temp-2' }
    ]);
  };

  const handleRemoveRound = (roundId: string) => {
    if (rounds.length <= 1) {
      alert("Cần tối thiểu 1 vòng tuyển dụng!");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xoá vòng tuyển dụng này?")) {
      setRounds((prev) => prev.filter((r) => r.id !== roundId));
    }
  };

  const handleRoundNameChange = (roundId: string, name: string) => {
    setRounds((prev) => prev.map((r) => r.id === roundId ? { ...r, name } : r));
  };

  const handleTemplateChange = (roundId: string, type: 'pass' | 'fail', templateId: string) => {
    setRounds((prev) => prev.map((r) => {
      if (r.id === roundId) {
        return type === 'pass' 
          ? { ...r, passTemplateId: templateId } 
          : { ...r, failTemplateId: templateId };
      }
      return r;
    }));
  };

  const handleTestLinkChange = (roundId: string, testLink: string) => {
    setRounds((prev) => prev.map((r) => r.id === roundId ? { ...r, testLink } : r));
  };

  const handleSaveConfig = () => {
    alert("Đã lưu cấu hình kịch bản vòng tuyển dụng thành công!");
    navigate(`/dashboard/jobs/${id}`);
  };

  return (
    <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] space-y-6">
      
      {/* Header breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate('/dashboard/jobs')}>Jobs</span>
            <span className="text-[10px]">&gt;</span>
            <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate(`/dashboard/jobs/${id}`)}>Chi tiết</span>
            <span className="text-[10px]">&gt;</span>
            <span className="text-slate-500">Cấu hình vòng</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Kịch bản vòng tuyển dụng</h1>
          <p className="text-xs font-semibold text-slate-400">
            Thiết lập kịch bản tự động hóa, cấu hình email gửi đi khi ứng viên chuyển tiếp hoặc trượt từng vòng.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddRound}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-800 transition-all shadow-sm cursor-pointer select-none"
          >
            <Plus className="h-4 w-4" />
            <span>Thêm vòng</span>
          </button>
          <button
            onClick={handleSaveConfig}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-all shadow-md shadow-primary-500/10 cursor-pointer select-none"
          >
            <Save className="h-4 w-4" />
            <span>Lưu cấu hình</span>
          </button>
        </div>
      </div>

      {/* Main stepper configuration list */}
      <div className="premium-card bg-white p-8 max-w-4xl mx-auto space-y-8 text-left">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 select-none">
          <Settings className="h-5 w-5 text-primary-500" />
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            Cấu hình Pipeline tuyển dụng
          </h3>
        </div>

        {/* Stepper Timeline Container */}
        <div className="space-y-8 relative pl-6">
          <div className="absolute top-2 bottom-2 left-[23px] w-0.5 bg-slate-200"></div>

          {rounds.map((round, index) => (
            <div key={round.id} className="flex gap-6 relative items-start">
              
              {/* Stepper circle index badge */}
              <div className="absolute -left-[37px] h-7 w-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-primary-500/25 select-none z-10">
                {index + 1}
              </div>

              {/* Round Detail Configuration Card */}
              <div className="flex-1 p-5 border border-slate-150 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all space-y-4">
                
                {/* Header row: Editable name & Delete */}
                <div className="flex justify-between items-center select-none">
                  <input 
                    type="text"
                    value={round.name}
                    onChange={(e) => handleRoundNameChange(round.id, e.target.value)}
                    placeholder="Nhập tên vòng..."
                    className="px-3 py-1.5 border-b border-transparent hover:border-slate-300 focus:border-primary-500 focus:outline-none bg-transparent text-sm font-extrabold text-slate-800 transition-all w-full max-w-md"
                  />
                  
                  <button 
                    onClick={() => handleRemoveRound(round.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Email template automation bindings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pass trigger template */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-emerald-500" />
                      Email khi ĐẠT vòng này
                    </label>
                    <select
                      value={round.passTemplateId}
                      onChange={(e) => handleTemplateChange(round.id, 'pass', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
                    >
                      {emailTemplates.map((temp) => (
                        <option key={temp.id} value={temp.id}>{temp.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fail trigger template */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-red-500" />
                      Email khi TRƯỢT vòng này
                    </label>
                    <select
                      value={round.failTemplateId}
                      onChange={(e) => handleTemplateChange(round.id, 'fail', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
                    >
                      {emailTemplates.map((temp) => (
                        <option key={temp.id} value={temp.id}>{temp.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Test Link (Optional) */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none flex items-center gap-1.5">
                    Link bài Test (Nếu có)
                  </label>
                  <input
                    type="url"
                    value={round.testLink || ''}
                    onChange={(e) => handleTestLinkChange(round.id, e.target.value)}
                    placeholder="https://example.com/test..."
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
                  />
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Timeline Bottom End */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between select-none">
          <button 
            onClick={handleAddRound}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Thêm vòng phỏng vấn</span>
          </button>

          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            Kịch bản tự động gửi email sẽ kích hoạt một-chạm
          </span>
        </div>

      </div>
    </div>
  );
};

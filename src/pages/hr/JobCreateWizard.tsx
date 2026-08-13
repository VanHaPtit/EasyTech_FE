import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Send, Save, Bot, User, Loader2 } from 'lucide-react';



export const JobCreateWizard: React.FC = () => {
  const navigate = useNavigate();

  // Form states (prefilled defaults according to specs)
  const [title, setTitle] = useState('Senior AI Engineer');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [salaryFrom, setSalaryFrom] = useState(140000);
  const [salaryTo, setSalaryTo] = useState(210000);
  const [currency, setCurrency] = useState('USD');
  const [workingType, setWorkingType] = useState('ONSITE');
  const [employmentType, setEmploymentType] = useState('FULL_TIME');
  const [experienceLevel, setExperienceLevel] = useState('MID_LEVEL');
  const [roundCount, setRoundCount] = useState(3);
  const [categoryName, setCategoryName] = useState('Technology');
  const [description, setDescription] = useState(
    `### Vị trí: Senior AI Engineer\n\n**Mô tả công việc:**\nChúng tôi đang tìm kiếm một Senior AI Engineer xuất sắc để dẫn dắt việc nghiên cứu và triển khai các mô hình ngôn ngữ lớn (LLM), tích hợp các kỹ thuật Vector Embedding và phát triển các kịch bản AI Agent thông minh.\n\n**Yêu cầu:**\n- Có trên 5 năm kinh nghiệm lập trình Python/C++.\n- Kinh nghiệm thực chiến với các Framework AI: PyTorch, TensorFlow.\n- Kinh nghiệm về Vector Database (Pinecone, Milvus).\n\n**Quyền lợi:**\n- Lương hấp dẫn: $140,000 - $210,000 / năm.\n- Bảo hiểm sức khỏe cao cấp.\n- Làm việc Hybrid linh hoạt.`
  );

  const [aiGenerating, setAiGenerating] = useState(false);

  const handleGenerateJD = () => {
    setAiGenerating(true);

    // Simulate AI generation stream
    setTimeout(() => {
      let mockDesc = `### Vị trí: ${title}\n\n**Mô tả công việc:**\n- Chịu trách nhiệm chính các công việc liên quan đến ${title}.\n- Phối hợp với các phòng ban để hoàn thành mục tiêu chung.\n- Báo cáo định kỳ cho quản lý trực tiếp.\n\n**Yêu cầu:**\n- Cấp độ yêu cầu: ${experienceLevel}.\n- Có kiến thức chuyên môn về lĩnh vực ${categoryName}.\n- Kỹ năng giao tiếp và làm việc nhóm tốt.\n\n**Quyền lợi:**\n- Mức lương cạnh tranh từ ${salaryFrom.toLocaleString()} - ${salaryTo.toLocaleString()} ${currency}.\n- Môi trường làm việc năng động, chuyên nghiệp.\n- Hình thức làm việc: ${employmentType} - ${workingType}\n- Địa điểm: ${location}`;

      setDescription(mockDesc);
      setAiGenerating(false);
    }, 1500);
  };

  const handleSaveDraft = () => {
    // Chuyển trực tiếp sang trang cấu hình vòng phỏng vấn & email
    navigate('/dashboard/jobs/new-job-123/rounds');
  };

  return (
    <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] space-y-6">
      {/* Breadcrumbs and Header actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate('/dashboard/jobs')}>Jobs</span>
            <span className="text-[10px]">&gt;</span>
            <span className="text-slate-500">Create</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Tạo vị trí mới với AI</h1>
          <p className="text-xs font-semibold text-slate-400">
            Nhập chi tiết công việc hoặc chat với AI Agent để soạn thảo mô tả công việc (JD) tự động
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={handleSaveDraft}
          className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-all shadow-md shadow-primary-500/10 cursor-pointer select-none"
        >
          <Save className="h-4 w-4" />
          <span>Lưu và tiếp tục cấu hình vòng PV</span>
        </button>
      </div>

      {/* 3-Panel Split Layout Grid (12-columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Panel 1: Details form (5/12 Columns) */}
        <div className="lg:col-span-5 premium-card bg-white p-6 space-y-5 text-left flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider select-none">
              Chi tiết công việc (Thông tin thô)
            </h3>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tiêu đề Job</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Danh mục</label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              >
                <option value="Technology">Công nghệ thông tin</option>
                <option value="Finance">Tài chính / Kế toán</option>
                <option value="Marketing">Marketing / Sales</option>
                <option value="HR">Nhân sự / Hành chính</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Địa điểm</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>

            {/* Salary Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Lương từ</label>
                <input 
                  type="number" 
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Lương đến</label>
                <input 
                  type="number" 
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Currency & Work Mode */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Đơn vị</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                >
                  <option value="USD">USD ($)</option>
                  <option value="VND">VND (đ)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nơi làm việc</label>
                <select
                  value={workingType}
                  onChange={(e) => setWorkingType(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                >
                  <option value="ONSITE">Onsite</option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Hình thức</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                >
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                </select>
              </div>
            </div>

            {/* Yoe & Rounds */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Cấp độ</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                >
                  <option value="INTERN">Intern</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="MID_LEVEL">Mid-level</option>
                  <option value="SENIOR">Senior</option>
                  <option value="LEAD">Lead</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Số vòng PV</label>
                <input 
                  type="number" 
                  value={roundCount}
                  onChange={(e) => setRoundCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={handleGenerateJD}
              disabled={aiGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-70"
            >
              {aiGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
              <span>{aiGenerating ? 'AI Đang sinh JD...' : 'Sinh JD tự động bằng AI'}</span>
            </button>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide select-none text-center">
              * Điền thông tin thô để AI tự động soạn thảo JD hoàn chỉnh.
            </div>
          </div>
        </div>



        {/* Panel 2: Live Preview (7/12 Columns) */}
        <div className="lg:col-span-7 premium-card bg-white p-6 flex flex-col h-[580px] justify-between">
          <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 select-none text-left">
              <Sparkles className="h-5 w-5 text-primary-500" />
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Live Preview</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Hiển thị Career Site trước khi đăng tuyển</p>
              </div>
            </div>

            {/* Live interactive markdown editable editor/preview */}
            <div className="flex-1 overflow-y-auto text-left space-y-4 pr-1 select-text">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary-500 focus:bg-white resize-none transition-all leading-relaxed"
                placeholder="Nội dung JD Markdown..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary-500 animate-ping"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tự động đồng bộ</span>
            </div>
            
            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold text-slate-600 hover:text-slate-800 transition-all cursor-pointer"
            >
              <span>Lưu và cấu hình vòng PV</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

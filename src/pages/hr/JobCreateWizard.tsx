import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';

export const JobCreateWizard: React.FC = () => {
  const navigate = useNavigate();

  // Form states (prefilled defaults according to specs)
  const [title, setTitle] = useState('Senior AI Engineer');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [salaryFrom, setSalaryFrom] = useState(140000);
  const [salaryTo, setSalaryTo] = useState(210000);
  const [currency, setCurrency] = useState('VND (đ)');
  const [workingType, setWorkingType] = useState('Remote');
  const [employmentType, setEmploymentType] = useState('Part-time');
  const [experienceYears, setExperienceYears] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [applyMode, setApplyMode] = useState<'REQUIRE_CV' | 'NO_CV'>('REQUIRE_CV');
  
  // Application Form Config
  const [showName, setShowName] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [categoryName, setCategoryName] = useState('Công nghệ thông tin');
  const [description, setDescription] = useState(
    `### Vị trí: Senior AI Engineer\n\n**Mô tả công việc:**\nChúng tôi đang tìm kiếm một Senior AI Engineer xuất sắc để dẫn dắt việc nghiên cứu và triển khai các mô hình ngôn ngữ lớn (LLM), tích hợp các kỹ thuật Vector Embedding và phát triển các kịch bản AI Agent thông minh.\n\n**Yêu cầu:**\n- Có trên 5 năm kinh nghiệm lập trình Python/C++.\n- Kinh nghiệm thực chiến với các Framework AI: PyTorch, TensorFlow.\n- Kinh nghiệm về Vector Database (Pinecone, Milvus).\n\n**Quyền lợi:**\n- Lương hấp dẫn: $140,000 - $210,000 / năm.\n- Bảo hiểm sức khỏe cao cấp.\n- Làm việc Hybrid linh hoạt.`
  );

  const [aiGenerating, setAiGenerating] = useState(false);

  const handleGenerateJD = () => {
    setAiGenerating(true);
    // Simulate AI generation stream
    setTimeout(() => {
      let mockDesc = `### Vị trí: ${title}\n\n**Mô tả công việc:**\n- Chịu trách nhiệm chính các công việc liên quan đến ${title}.\n- Phối hợp với các phòng ban để hoàn thành mục tiêu chung.\n- Báo cáo định kỳ cho quản lý trực tiếp.\n\n**Yêu cầu:**\n- Có kiến thức chuyên môn về lĩnh vực ${categoryName}.\n- Kỹ năng giao tiếp và làm việc nhóm tốt.\n- ${jobRequirements}\n\n**Quyền lợi:**\n- Mức lương cạnh tranh từ ${salaryFrom.toLocaleString()} - ${salaryTo.toLocaleString()} ${currency}.\n- Môi trường làm việc năng động, chuyên nghiệp.\n- Hình thức làm việc: ${employmentType} - ${workingType}\n- Địa điểm: ${location}`;
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
        </div>

        {/* Action button */}
        <button
          onClick={handleSaveDraft}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#0ea5e9] hover:bg-sky-600 text-white text-sm font-semibold transition-all shadow-sm cursor-pointer select-none"
        >
          <span>Lưu và tiếp tục</span>
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6">
          
          {/* Card: THÔNG TIN CÔNG VIỆC */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-left shadow-sm">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-5">
              Thông tin công việc
            </h3>

            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tiêu đề Job</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Danh mục</label>
                <select
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_12px_center] pr-8"
                >
                  <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                  <option value="Tài chính / Kế toán">Tài chính / Kế toán</option>
                  <option value="Marketing / Sales">Marketing / Sales</option>
                  <option value="Nhân sự / Hành chính">Nhân sự / Hành chính</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Địa điểm</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all"
                />
              </div>

              {/* Salary Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Lương từ</label>
                  <input 
                    type="number" 
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Lương đến</label>
                  <input 
                    type="number" 
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* YOE */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Số năm kinh nghiệm yêu cầu</label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_12px_center] pr-8"
                >
                  <option value="" disabled></option>
                  <option value="0-1">Dưới 1 năm</option>
                  <option value="1-3">1-3 năm</option>
                  <option value="3-5">3-5 năm</option>
                  <option value="5+">Trên 5 năm</option>
                </select>
              </div>

              {/* Currency, Work Mode, Employment Type Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Đơn vị</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-2 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_8px_center] pr-6"
                  >
                    <option value="VND (đ)">VND (đ)</option>
                    <option value="USD ($)">USD ($)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nơi làm việc</label>
                  <select
                    value={workingType}
                    onChange={(e) => setWorkingType(e.target.value)}
                    className="w-full px-2 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_8px_center] pr-6"
                  >
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Hình thức</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-2 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_8px_center] pr-6"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              {/* Requirement Textarea */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mô tả yêu cầu ứng viên</label>
                <textarea 
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                  placeholder="Nhập các yêu cầu chính cho vị trí này..."
                  className="w-full h-24 px-3 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-sky-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Card: CÁCH ỨNG VIÊN ỨNG TUYỂN */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-left shadow-sm">
             <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-5">
              Cách ứng viên ứng tuyển
            </h3>

            <div className="flex flex-col gap-3">
              {/* Option 1 */}
              <label 
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  applyMode === 'REQUIRE_CV' ? 'border-sky-500 bg-sky-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
                onClick={() => setApplyMode('REQUIRE_CV')}
              >
                <div className="mt-0.5">
                   {applyMode === 'REQUIRE_CV' ? (
                      <CheckCircle2 className="h-5 w-5 text-sky-500" />
                   ) : (
                      <Circle className="h-5 w-5 text-slate-300" />
                   )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Bắt buộc nộp CV</span>
                  <span className="text-xs text-slate-500">Ứng viên phải upload PDF/DOCX</span>
                </div>
              </label>

              {/* Option 2 */}
              <label 
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  applyMode === 'NO_CV' ? 'border-sky-500 bg-sky-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
                onClick={() => setApplyMode('NO_CV')}
              >
                <div className="mt-0.5">
                   {applyMode === 'NO_CV' ? (
                      <CheckCircle2 className="h-5 w-5 text-sky-500" />
                   ) : (
                      <Circle className="h-5 w-5 text-slate-300" />
                   )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Không yêu cầu CV</span>
                </div>
              </label>
            </div>
            
            {/* Form Configuration */}
            <div className="mt-6 pt-6 border-t border-slate-100">
               <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                 Cấu hình form ứng tuyển
               </h4>
               
               <div className="space-y-3">
                 {/* Name Toggle */}
                 <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                    <span className="text-sm font-semibold text-slate-700">Họ và tên</span>
                    <button 
                      onClick={() => setShowName(!showName)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${showName ? 'bg-sky-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${showName ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                 </div>
                 
                 {/* Phone Toggle */}
                 <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                    <span className="text-sm font-semibold text-slate-700">Số điện thoại</span>
                    <button 
                      onClick={() => setShowPhone(!showPhone)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${showPhone ? 'bg-sky-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${showPhone ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                 </div>
                 
                 {/* Email Toggle */}
                 <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                    <span className="text-sm font-semibold text-slate-700">Email</span>
                    <button 
                      onClick={() => setShowEmail(!showEmail)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${showEmail ? 'bg-sky-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${showEmail ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                 </div>
               </div>
            </div>

          </div>

          {/* Centered Generate Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleGenerateJD}
              disabled={aiGenerating}
              className="px-6 py-2.5 rounded-lg bg-[#1e293b] hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-70 min-w-[120px]"
            >
              {aiGenerating ? 'Đang sinh...' : 'Sinh JD'}
            </button>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6 h-[calc(100vh-140px)]">
          
          {/* Card: TRẠNG THÁI FORM ỨNG TUYỂN */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-left shadow-sm">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Trạng thái form ứng tuyển</p>
             <p className="text-sm font-bold text-slate-800 mb-1.5">
               {applyMode === 'REQUIRE_CV' ? 'Ứng viên phải nộp CV' : 'Ứng viên không cần nộp CV'}
             </p>
             <p className="text-xs text-slate-500">
               Hiển thị: {[
                 showName && 'Họ và tên',
                 showPhone && 'SĐT',
                 showEmail && 'Email'
               ].filter(Boolean).join(', ') || 'Không có thông tin'}
             </p>
          </div>

          {/* Markdown Preview Area */}
          <div className="bg-white border border-slate-200 rounded-xl flex-1 overflow-hidden shadow-sm flex flex-col p-2">
             <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-full p-4 text-sm text-slate-700 bg-transparent focus:outline-none resize-none leading-relaxed"
                placeholder="Nội dung JD Markdown..."
              />
          </div>

        </div>

      </div>
    </div>
  );
};


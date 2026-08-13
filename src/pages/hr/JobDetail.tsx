import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Edit3, 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Settings, 
  Users, 
  Globe, 
  CheckCircle
} from 'lucide-react';
import { EditJobModal } from '../../components/modals/EditJobModal';
import { PublishJobModal } from '../../components/modals/PublishJobModal';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock initial Job data
  const [job, setJob] = useState({
    title: 'Senior AI Engineer',
    location: 'San Francisco, CA (Hybrid)',
    salaryFrom: 140000,
    salaryTo: 210000,
    currency: 'USD',
    workTime: 'Full-time',
    experience: 5,
    roundCount: 3,
    status: 'INACTIVE', // INACTIVE = Bản nháp, ACTIVE = Đang mở, CLOSED = Đã đóng
    description: `### Vị trí: Senior AI Engineer\n\n**Mô tả công việc:**\nChúng tôi đang tìm kiếm một Senior AI Engineer xuất sắc để dẫn dắt việc nghiên cứu và triển khai các mô hình ngôn ngữ lớn (LLM), tích hợp các kỹ thuật Vector Embedding và phát triển các kịch bản AI Agent thông minh.\n\n**Yêu cầu:**\n- Có trên 5 năm kinh nghiệm lập trình Python/C++.\n- Kinh nghiệm thực chiến với các Framework AI: PyTorch, TensorFlow.\n- Kinh nghiệm về Vector Database (Pinecone, Milvus).\n\n**Quyền lợi:**\n- Lương hấp dẫn: $140,000 - $210,000 / năm.\n- Bảo hiểm sức khỏe cao cấp.\n- Làm việc Hybrid linh hoạt.`
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSaveJob = (updatedData: any) => {
    setJob((prev) => ({ ...prev, ...updatedData }));
    setEditModalOpen(false);
  };

  const handlePublishJob = () => {
    setJob((prev) => ({ ...prev, status: 'ACTIVE' }));
    setPublishModalOpen(false);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  return (
    <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] space-y-6 relative overflow-hidden">
      
      {/* Confetti simulation banner */}
      {showConfetti && (
        <div className="bg-emerald-500 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg animate-bounce select-none">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Chúc mừng! Tin tuyển dụng đã được xuất bản công khai lên Career Site thành công!</span>
          </div>
          <span className="text-xs font-extrabold px-2 py-1 rounded bg-white/20">CONFETTI 🎉</span>
        </div>
      )}

      {/* Header section with Breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate('/dashboard/jobs')}>Jobs</span>
            <span className="text-[10px]">&gt;</span>
            <span className="text-slate-500">Chi tiết</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{job.title}</h1>
            {job.status === 'INACTIVE' ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wider">
                Bản nháp
              </span>
            ) : job.status === 'ACTIVE' ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-primary-50 text-primary-500 border border-primary-100 uppercase tracking-wider">
                Đang mở
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-50 text-red-500 border border-red-100 uppercase tracking-wider">
                Đã đóng
              </span>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setEditModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-800 transition-all shadow-sm cursor-pointer select-none"
        >
          <Edit3 className="h-4 w-4" />
          <span>Chỉnh sửa</span>
        </button>
      </div>

      {/* Details layout: Left Column (2/3) + Right Column (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Quick Info Bar + Description (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 premium-card bg-white p-6 select-none">
            {/* Salary */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mức lương</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-primary-500" />
                {job.salaryFrom.toLocaleString()} - {job.salaryTo.toLocaleString()} {job.currency}
              </span>
            </div>

            {/* Location */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Địa điểm</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary-500" />
                {job.location}
              </span>
            </div>

            {/* Work mode */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Hình thức</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-primary-500" />
                {job.workTime}
              </span>
            </div>

            {/* Experience */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kinh nghiệm</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary-500" />
                {job.experience} năm
              </span>
            </div>
          </div>

          {/* Job Description (Renders text sections beautifully) */}
          <div className="premium-card bg-white p-8 space-y-4 text-left">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 select-none">
              Mô tả chi tiết công việc
            </h3>
            
            <div className="text-xs font-semibold text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap select-text">
              {job.description}
            </div>
          </div>
        </div>

        {/* Right Column: Widgets (1/3) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Widget 1: Publish Now */}
          {job.status === 'INACTIVE' && (
            <div className="premium-card bg-primary-500/5 border border-primary-500/10 p-6 space-y-4 text-left">
              <div className="space-y-1.5 select-none">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Đăng tuyển ngay</h3>
                <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                  Tin tuyển dụng hiện ở trạng thái **Bản nháp**. Xuất bản để thu hút hồ sơ ứng viên ngay lập tức.
                </p>
              </div>

              <button
                onClick={() => setPublishModalOpen(true)}
                className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-all shadow-md shadow-primary-500/15 cursor-pointer select-none flex items-center justify-center gap-1.5"
              >
                <Globe className="h-4.5 w-4.5" />
                <span>Publish Job</span>
              </button>
            </div>
          )}

          {/* Widget 2: Interview Rounds */}
          <div className="premium-card bg-white p-6 space-y-4 text-left">
            <div className="flex justify-between items-start select-none">
              <div className="space-y-1">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Vòng phỏng vấn</h3>
                <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                  Thiết lập kịch bản tự động hóa cho {job.roundCount} vòng đã cấu hình.
                </p>
              </div>
              <Settings className="h-5 w-5 text-slate-400" />
            </div>

            <button
              onClick={() => navigate(`/dashboard/jobs/${id}/rounds`)}
              className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all cursor-pointer select-none flex items-center justify-center gap-1.5"
            >
              <Settings className="h-4.5 w-4.5" />
              <span>Cấu hình vòng</span>
            </button>
          </div>

          {/* Widget 3: Applicants */}
          <div className="premium-card bg-white p-6 space-y-4 text-left">
            <div className="flex justify-between items-start select-none">
              <div className="space-y-1">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Ứng viên nộp hồ sơ</h3>
                <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                  Có **18 ứng viên** nộp hồ sơ ứng tuyển vị trí này.
                </p>
              </div>
              <Users className="h-5 w-5 text-slate-400" />
            </div>

            <button
              onClick={() => navigate('/dashboard/applications/kanban')}
              className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all cursor-pointer select-none flex items-center justify-center gap-1.5"
            >
              <Users className="h-4.5 w-4.5" />
              <span>Xem phễu ứng viên</span>
            </button>
          </div>
        </div>

      </div>

      {/* Edit Job Modal */}
      <EditJobModal 
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        jobData={job}
        onSave={handleSaveJob}
      />

      {/* Publish Confirmation Modal */}
      <PublishJobModal 
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onConfirm={handlePublishJob}
        jobTitle={job.title}
        location={job.location}
      />
    </div>
  );
};

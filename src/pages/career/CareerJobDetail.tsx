import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  ChevronRight,
  Users,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Building2,
  Globe,
  Phone,
} from 'lucide-react';

// Mock job data by slug
const JOB_MAP: Record<string, {
  title: string; location: string; workType: string;
  salaryFrom: number; salaryTo: number; currency: string;
  experience: number; category: string; applicants: number; postedAt: string;
  description: string; requirements: string[]; benefits: string[];
  rounds: { name: string; desc: string }[];
}> = {
  'senior-ai-engineer': {
    title: 'Senior AI Engineer',
    location: 'TP. Hồ Chí Minh (Hybrid)',
    workType: 'Full-time',
    salaryFrom: 50, salaryTo: 90, currency: 'triệu VND',
    experience: 5,
    category: 'Kỹ thuật / AI',
    applicants: 24,
    postedAt: '2026-08-01',
    description: `Bạn sẽ tham gia xây dựng và cải tiến các hệ thống AI cốt lõi tại TechA — từ pipeline RAG, vector search đến LLM fine-tuning và production deployment.\n\nĐây là cơ hội hiếm có để làm việc với các vấn đề AI thực tế, tác động trực tiếp đến hàng nghìn người dùng mỗi ngày.`,
    requirements: [
      '5+ năm kinh nghiệm phát triển AI/ML trong môi trường production',
      'Thành thạo Python, Pytorch/Tensorflow, LangChain/LlamaIndex',
      'Kinh nghiệm với Vector Databases (Qdrant, Pinecone, Weaviate)',
      'Hiểu biết về LLM, RAG, Prompt Engineering',
      'Kinh nghiệm deploy ML model lên cloud (AWS/GCP)',
      'Tiếng Anh đủ để đọc tài liệu kỹ thuật',
    ],
    benefits: [
      'Lương 50–90 triệu VND + review 2 lần/năm',
      'Thưởng 13th month + performance bonus',
      'Bảo hiểm sức khỏe cao cấp (PVI Health)',
      'Budget học hỏi 10 triệu/năm (khóa học, conference)',
      'Làm việc hybrid: 3 ngày office, 2 ngày remote',
      'Cơ phần tùy theo vị trí',
    ],
    rounds: [
      { name: 'CV Screening', desc: 'HR review hồ sơ trong 3 ngày làm việc' },
      { name: 'Technical Assessment', desc: 'Bài test kỹ thuật online (90 phút)' },
      { name: 'Technical Interview', desc: 'Phỏng vấn kỹ thuật với Engineering Lead (60 phút)' },
      { name: 'Offer & Negotiation', desc: 'Thảo luận offer và onboarding' },
    ],
  },
};

// Default job for unknown slugs
const DEFAULT_JOB = JOB_MAP['senior-ai-engineer'];

export const CareerJobDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const job = (slug && JOB_MAP[slug]) ? JOB_MAP[slug] : DEFAULT_JOB;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8">
        <Link to="/careers" className="hover:text-primary-500 transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Cơ hội nghề nghiệp
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-600">{job.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="premium-card bg-white p-8 space-y-5">
            <div>
              <span className="text-[10px] font-bold text-primary-500 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-full">
                {job.category}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">{job.title}</h1>

            {/* Quick Info Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: DollarSign, label: 'Mức lương', value: `${job.salaryFrom}–${job.salaryTo} ${job.currency}`, color: 'text-emerald-600' },
                { icon: MapPin, label: 'Địa điểm', value: job.location, color: 'text-slate-700' },
                { icon: Clock, label: 'Hình thức', value: job.workType, color: 'text-slate-700' },
                { icon: Briefcase, label: 'Kinh nghiệm', value: `${job.experience}+ năm`, color: 'text-slate-700' },
              ].map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className={`h-3.5 w-3.5 ${info.color}`} />
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{info.label}</p>
                    </div>
                    <p className={`text-xs font-extrabold ${info.color}`}>{info.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {job.applicants} ứng viên đã nộp
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Đăng ngày {job.postedAt}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="premium-card bg-white p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800">Mô tả công việc</h2>
            <div className="text-sm text-slate-600 font-semibold leading-relaxed whitespace-pre-line">{job.description}</div>
          </div>

          {/* Requirements */}
          <div className="premium-card bg-white p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800">Yêu cầu ứng viên</h2>
            <div className="space-y-3">
              {job.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed">{req}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="premium-card bg-white p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800">Quyền lợi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-slate-700">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Rounds */}
          <div className="premium-card bg-white p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800">Quy trình tuyển dụng</h2>
            <div className="space-y-3 relative pl-4">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200" />
              {job.rounds.map((r, i) => (
                <div key={i} className="relative flex items-start gap-4 pl-6">
                  <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-primary-500 border-2 border-white ring-2 ring-primary-200 z-10" />
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">Vòng {i + 1}: {r.name}</p>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* Apply CTA */}
          <div className="premium-card bg-white p-6 space-y-4 sticky top-20">
            <div className="text-center space-y-2">
              <h3 className="text-base font-extrabold text-slate-800">Quan tâm vị trí này?</h3>
              <p className="text-xs text-slate-400 font-semibold">Nộp hồ sơ ngay hôm nay, phản hồi trong 3 ngày làm việc.</p>
            </div>
            <Link
              to={`/careers/jobs/${slug || 'senior-ai-engineer'}/apply`}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm transition-all shadow-lg shadow-primary-500/20"
            >
              Ứng tuyển ngay
              <ChevronRight className="h-4 w-4" />
            </Link>
            <p className="text-[10px] text-center text-slate-400 font-semibold">
              🔒 Thông tin của bạn được bảo mật theo chính sách PDPA
            </p>
          </div>

          {/* Company Info */}
          <div className="premium-card bg-white p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800">Về TechA Solutions</h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">TechA Solutions JSC</p>
                <p className="text-xs text-slate-400 font-semibold">Công ty Cổ phần</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { icon: MapPin, text: 'TP. Hồ Chí Minh, Việt Nam' },
                { icon: Users, text: '120+ nhân viên' },
                { icon: Globe, text: 'www.techa.vn' },
                { icon: Phone, text: '+84 900 100 200' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
                    <Icon className="h-3.5 w-3.5 text-slate-400" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Share */}
          <div className="premium-card bg-white p-6 space-y-3">
            <h3 className="text-sm font-extrabold text-slate-800">Chia sẻ vị trí này</h3>
            <div className="flex gap-2">
              {['LinkedIn', 'Facebook', 'Copy Link'].map((s) => (
                <button key={s} className="flex-1 py-2 text-[10px] font-bold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-primary-500 hover:border-primary-200 transition-all cursor-pointer">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

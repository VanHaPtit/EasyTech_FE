import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Globe2,
  MapPin,
  Search,
  Send,
  Users,
  Zap
} from 'lucide-react';

const WHY_CHOOSE_US = [
  'Làm việc với các công nghệ AI mới nhất, từ LLM đến Vector Embedding trong môi trường thực tế.',
  'Mức lương cạnh tranh + equity + review 2 lần/năm + 13th month + bảo hiểm sức khỏe cao cấp.',
  'Budget học hỏi hàng năm, mentorship từ senior engineers, cơ hội làm việc với khách hàng quốc tế.'
];

const COMPANY = {
  name: 'TechA Solutions JSC',
  slug: 'techa',
  website: 'www.techa.vn',
  location: 'TP. Hồ Chí Minh, Việt Nam',
  size: '120+ nhân viên',
  founded: '2019',
  email: 'hr@techa.vn',
  services: ['AI Product Development', 'Data Platform', 'Cloud Engineering', 'Business Automation'],
  description:
    'TechA Solutions phát triển các sản phẩm AI ứng dụng, nền tảng dữ liệu và giải pháp tự động hóa cho doanh nghiệp. Career Site này được cấp phát riêng bởi EasyTech cho từng công ty đã được duyệt.',
  footer: {
    description: 'Chúng tôi xây dựng những sản phẩm AI/tech hàng đầu, tìm kiếm những tài năng đam mê đổi mới và công nghệ.',
    facebook: 'https://facebook.com/techa',
    linkedin: 'https://linkedin.com/company/techa',
    copyright: '© 2026 TechA Solutions JSC. All rights reserved.',
  }
};

const JOBS = [
  {
    slug: 'senior-ai-engineer',
    title: 'Senior AI Engineer',
    location: 'TP. Hồ Chí Minh (Hybrid)',
    type: 'Full-time',
    salary: '50-90 triệu VND',
    category: 'Kỹ thuật / AI',
    postedAt: '2026-08-17',
    requiresCv: true,
    tags: ['Python', 'LLM', 'Vector DB'],
  },
  {
    slug: 'backend-developer-java',
    title: 'Backend Developer (Java)',
    location: 'TP. Hồ Chí Minh',
    type: 'Full-time',
    salary: '30-55 triệu VND',
    category: 'Kỹ thuật / Backend',
    postedAt: '2026-08-15',
    requiresCv: true,
    tags: ['Java', 'Spring Boot', 'Microservices'],
  },
  {
    slug: 'marketing-intern',
    title: 'Thực tập sinh Marketing',
    location: 'Remote',
    type: 'Internship',
    salary: '3-5 triệu VND',
    category: 'Marketing',
    postedAt: '2026-08-14',
    requiresCv: false,
    tags: ['Content', 'Social Media', 'Canva'],
  },
];

export const CompanyCareerSitePage: React.FC = () => {
  const { companySlug } = useParams<{ companySlug: string }>();
  const [search, setSearch] = useState('');

  const filteredJobs = JOBS.filter((job) =>
    [job.title, job.location, job.category, ...job.tags]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to={`/company/${companySlug || COMPANY.slug}`} className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-500 flex items-center justify-center text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">{COMPANY.name}</p>
              <p className="text-[11px] font-semibold text-slate-400">Career Site by EasyTech</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-500">
            <a href="#company" className="hover:text-primary-600">Công ty</a>
            <a href="#jobs" className="hover:text-primary-600">Việc làm</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(71,177,222,0.28),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_35%)]" />
          <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-primary-100 text-xs font-bold mb-6">
                <Globe2 className="h-3.5 w-3.5" />
                {companySlug || COMPANY.slug}.easytech.vn
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Cơ hội nghề nghiệp tại {COMPANY.name}
              </h1>
              <p className="text-base md:text-lg text-slate-300 font-semibold leading-relaxed mt-6 max-w-2xl">
                {COMPANY.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {COMPANY.services.map((service) => (
                  <span key={service} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-950/20">
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Thông tin công ty</h2>
              <div className="grid grid-cols-2 gap-4 mt-5">
                {[
                  { label: 'Quy mô', value: COMPANY.size, icon: Users },
                  { label: 'Thành lập', value: COMPANY.founded, icon: Clock },
                  { label: 'Địa điểm', value: 'TP. HCM', icon: MapPin },
                  { label: 'Website', value: COMPANY.website, icon: Globe2 },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <Icon className="h-4 w-4 text-primary-500 mb-2" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-xs font-extrabold text-slate-800 mt-1">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="company" className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((text) => (
              <div key={text} className="premium-card bg-white p-6 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="jobs" className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Vị trí đang tuyển</h2>
              <p className="text-sm font-semibold text-slate-400 mt-1">
                {filteredJobs.length} JD đang public trên Career Site riêng của {COMPANY.name}.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm vị trí, kỹ năng..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <article key={job.slug} className="premium-card bg-white p-6 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-bold text-primary-600 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-full">
                    {job.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    job.requiresCv
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {job.requiresCv ? 'Cần CV' : 'Không cần CV'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 leading-snug">{job.title}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">Đăng ngày {job.postedAt}</p>
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-500">
                  <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-slate-400" />{job.location}</p>
                  <p className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5 text-slate-400" />{job.type}</p>
                  <p className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-slate-400" />{job.salary}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/careers/jobs/${job.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold transition-colors"
                >
                  {job.requiresCv ? 'Xem và nộp CV' : 'Xem và gửi thông tin'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>


      </main>

      <footer className="bg-slate-900 text-slate-400 mt-0">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-primary-500 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-extrabold text-white">{COMPANY.name}</p>
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                {COMPANY.footer.description}
              </p>
              <div className="flex gap-3">
                <a href={COMPANY.footer.facebook} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
                  <Globe2 className="h-4 w-4 text-slate-400 hover:text-white" />
                </a>
                <a href={COMPANY.footer.linkedin} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
                  <Users className="h-4 w-4 text-slate-400 hover:text-white" />
                </a>
                <a href={`mailto:${COMPANY.email}`} className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary-500 transition-colors cursor-pointer">
                  <Send className="h-4 w-4 text-slate-400 hover:text-white" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Liên kết</h4>
              <div className="space-y-2.5">
                <a href="#company" className="block text-xs font-semibold hover:text-primary-400 transition-colors">Về chúng tôi</a>
                <a href="#jobs" className="block text-xs font-semibold hover:text-primary-400 transition-colors">Vị trí đang tuyển</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Liên hệ</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                  <p className="text-xs font-semibold">{COMPANY.location}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe2 className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                  <p className="text-xs font-semibold">{COMPANY.website}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs font-semibold">{COMPANY.footer.copyright}</p>
            <p className="text-xs font-semibold text-slate-600">
              Tuyển dụng trực tuyến qua <span className="text-primary-500 font-bold">EasyTech Platform</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPin,
  Search,
  ArrowRight,
  Globe2,
  Users,
  Send,
  Zap,
  Briefcase,
  Clock,
  FileText,
  Building2,
  Calendar,
  User,
  LayoutGrid,
  Box
} from 'lucide-react';

const COMPANY = {
  name: 'TechA Solutions JSC',
  slug: 'techa',
  website: 'www.techa.vn',
  location: 'TP. Hồ Chí Minh, Việt Nam',
  size: '120+ nhân viên',
  founded: '2019',
  email: 'hr@techa.vn',
  slogan: 'Kiến tạo tương lai số thông qua trí tuệ nhân tạo',
  averageAge: '30',
  businessSectors: [
    'Hoạt động sản xuất phần mềm',
    'Hoạt động tư vấn công nghệ thông tin',
    'Hoạt động dịch vụ công nghệ thông tin khác',
    'Xử lý dữ liệu, cho thuê và các hoạt động liên quan'
  ],
  mainSector: [
    'Hoạt động sản xuất phần mềm'
  ],
  services: ['AI Product Development', 'Data Platform', 'Cloud Engineering', 'Business Automation'],
  description:
    'TechA Solutions phát triển các sản phẩm AI ứng dụng, nền tảng dữ liệu và giải pháp tự động hóa cho doanh nghiệp. Career Site này được cấp phát riêng bởi EasyTech cho từng công ty đã được duyệt.',
  fullDescription: [
    'TechA xác định mục tiêu chiến lược phát triển 5 năm lần thứ 3 (2022-2026) trở thành công ty công nghệ có vị trí vững chắc trong Top 3 tại Việt Nam và đạt quy mô thuộc Top 100 châu Á.',
    'Thành tựu của hai giai đoạn phát triển liền trước đã tạo nền tảng và xung lực toàn diện để TechA tự tin nối tiếp thành công trong chiến lược phát triển giai đoạn mới, qua đó tiếp tục góp phần thúc đẩy sự phát triển bền vững và thịnh vượng của đất nước và cộng đồng; tiếp tục gia tăng các giá trị mang đến cho khách hàng, đối tác và nhà đầu tư.',
    'Tầm nhìn chiến lược và nền tảng vững chắc Từ vị trí thứ 5, quy mô kinh tế Việt Nam sẽ vươn lên. Đi cùng với dự báo này, TechA xây dựng lộ trình rõ ràng hướng tới mục tiêu trở thành một tổ chức đa năng, dẫn đầu về năng lực triển khai, sáng tạo, đồng thời kiến tạo các giá trị mới thông qua các giải pháp công nghệ toàn diện, với sức mạnh tổng hợp của hệ sinh thái đa tầng và ứng dụng công nghệ tiên tiến.',
    'Sức mạnh và triển vọng của kinh tế đất nước với những dự báo khả quan trên đã tạo nền tảng quan trọng. Đòi hỏi xuyên suốt tại TechA trong hai giai đoạn phát triển vừa qua và bây giờ chuyển tiếp cho chiến lược phát triển 5 năm, chính là phải nỗ lực không ngừng trong tiên phong đổi mới, nâng tầm chất lượng dịch vụ vượt trội cho khách hàng và đối tác, đồng thời hoạt động hiệu quả, mang lại các giá trị thịnh vượng bền vững.',
    'Cụ thể hóa tầm nhìn bằng những giá trị, vươn tầm vị thế qua các giai đoạn phát triển, TechA xác định mục tiêu chiến lược 5 năm lần thứ 3 sẽ trở thành công ty có vị trí vững chắc trong khu vực và vươn tầm quốc tế.'
  ],
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
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    location: 'Hà Nội',
    type: 'Full-time',
    salary: '40-80 triệu VND',
    category: 'Kỹ thuật / Data',
    postedAt: '2026-08-18',
    requiresCv: true,
    tags: ['Machine Learning', 'SQL', 'PyTorch'],
  },
  {
    slug: 'frontend-developer-react',
    title: 'Frontend Developer (ReactJS)',
    location: 'Đà Nẵng',
    type: 'Full-time',
    salary: '25-45 triệu VND',
    category: 'Kỹ thuật / Frontend',
    postedAt: '2026-08-19',
    requiresCv: true,
    tags: ['React', 'TypeScript', 'TailwindCSS'],
  },
  {
    slug: 'product-manager',
    title: 'Product Manager',
    location: 'TP. Hồ Chí Minh',
    type: 'Full-time',
    salary: '60-100 triệu VND',
    category: 'Product',
    postedAt: '2026-08-20',
    requiresCv: true,
    tags: ['Agile', 'Scrum', 'Figma'],
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    location: 'Remote',
    type: 'Full-time',
    salary: '45-85 triệu VND',
    category: 'Kỹ thuật / DevOps',
    postedAt: '2026-08-21',
    requiresCv: true,
    tags: ['Docker', 'Kubernetes', 'AWS'],
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    location: 'TP. Hồ Chí Minh',
    type: 'Full-time',
    salary: '20-40 triệu VND',
    category: 'Design',
    postedAt: '2026-08-22',
    requiresCv: true,
    tags: ['Figma', 'Prototyping', 'User Research'],
  },
  {
    slug: 'business-analyst',
    title: 'Business Analyst (BA)',
    location: 'Hà Nội',
    type: 'Full-time',
    salary: '25-50 triệu VND',
    category: 'Business',
    postedAt: '2026-08-23',
    requiresCv: true,
    tags: ['BPMN', 'UML', 'SQL'],
  }
];

export const CompanyCareerSitePage: React.FC = () => {
  const { companySlug } = useParams<{ companySlug: string }>();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'about'>('overview');

  const filteredJobs = JOBS.filter((job) =>
    [job.title, job.location, job.category, ...job.tags]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* HEADER TABS */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to={`/company/${COMPANY.slug}`} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">{COMPANY.name}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`transition-colors py-5 border-b-2 ${activeTab === 'overview' ? 'text-primary-600 border-primary-600' : 'text-slate-500 border-transparent hover:text-primary-600'}`}
            >
              Tổng quan
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`transition-colors py-5 border-b-2 ${activeTab === 'jobs' ? 'text-primary-600 border-primary-600' : 'text-slate-500 border-transparent hover:text-primary-600'}`}
            >
              Tin tuyển dụng
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`transition-colors py-5 border-b-2 ${activeTab === 'about' ? 'text-primary-600 border-primary-600' : 'text-slate-500 border-transparent hover:text-primary-600'}`}
            >
              Giới thiệu công ty
            </button>
          </nav>
        </div>
      </header>

      {/* RENDER CONTENT BASED ON ACTIVE TAB */}
      
      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
          {/* BANNER SECTION */}
          <div className="bg-white pb-16 pt-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left info */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                  {COMPANY.name}
                </h1>
                <p className="text-lg md:text-xl text-slate-600 font-medium mb-8">
                  {COMPANY.slogan}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveTab('about')}
                    className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-full transition-colors flex items-center gap-2"
                  >
                    Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('jobs')}
                    className="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-bold rounded-full transition-colors"
                  >
                    Cơ hội việc làm
                  </button>
                </div>
              </div>
              {/* Right image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=1200&auto=format&fit=crop" 
                  alt="Company Event" 
                  className="w-full h-full object-cover"
                />
                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 cursor-pointer hover:bg-white transition-colors"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 cursor-pointer hover:bg-white transition-colors"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 cursor-pointer hover:bg-white transition-colors"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 cursor-pointer hover:bg-white transition-colors"></div>
                </div>
              </div>
            </div>
          </div>

          {/* JOBS SECTION */}
          <section className="max-w-6xl mx-auto px-6 py-16 bg-slate-50">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Vị trí mới nhất</h2>
                <p className="text-sm font-semibold text-slate-400 mt-1">
                  Khám phá các cơ hội nghề nghiệp mới nhất tại {COMPANY.name}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {JOBS.slice(0, 3).map((job) => (
                <article key={job.slug} className="premium-card bg-white p-7 space-y-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 ring-1 ring-slate-100 hover:ring-primary-100 group flex flex-col h-full rounded-2xl">
                  <div className="flex-1">
                    <h3 className="text-xl font-extrabold text-slate-800 leading-snug group-hover:text-primary-600 transition-colors">{job.title}</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Đăng ngày {job.postedAt}</p>
                  </div>

                  <div className="space-y-3 text-xs font-semibold text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-primary-500" />{job.location}</p>
                    <p className="flex items-center gap-2.5"><Briefcase className="h-4 w-4 text-primary-500" />{job.type}</p>
                    <p className="flex items-center gap-2.5"><FileText className="h-4 w-4 text-primary-500" />{job.salary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/company/${COMPANY.slug}/jobs/${job.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
                    >
                      {job.requiresCv ? 'Xem và nộp CV' : 'Xem và gửi thông tin'}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => setActiveTab('jobs')}
                className="inline-flex items-center gap-2 px-6 py-2 border border-slate-300 hover:border-primary-500 hover:text-primary-600 text-slate-600 text-sm font-bold rounded-full transition-colors"
              >
                Xem tất cả công việc <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* SHORT ABOUT SECTION */}
          <div className="bg-white py-16 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-8">Giới thiệu công ty</h2>
              <div className="text-slate-600 text-base leading-relaxed space-y-4 text-justify md:text-center mb-8">
                <p>
                  {COMPANY.description}
                </p>
                <p>
                  Với mục tiêu trở thành công ty hàng đầu trong lĩnh vực công nghệ, chúng tôi cam kết mang lại môi trường làm việc tốt nhất, chế độ đãi ngộ hấp dẫn và cơ hội phát triển sự nghiệp không giới hạn cho mọi thành viên.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('about')}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-primary-600 text-primary-600 hover:bg-primary-50 text-sm font-bold rounded-full transition-colors mb-12"
              >
                Tìm hiểu thêm về {COMPANY.name} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* 2. JOBS TAB */}
      {activeTab === 'jobs' && (
        <div className="bg-slate-50 py-16 min-h-screen">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8">Tất cả việc làm tại {COMPANY.name}</h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex-1 w-full">
                <label className="text-xs font-bold text-slate-500 mb-2 block uppercase tracking-wide">Tìm kiếm công việc</label>
                <div className="relative w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm vị trí, kỹ năng..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                  />
                </div>
              </div>
              <div className="text-slate-500 text-sm font-medium pb-3 hidden md:block">
                Tìm thấy <span className="font-bold text-primary-600">{filteredJobs.length}</span> kết quả
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                <article key={job.slug} className="premium-card bg-white p-7 space-y-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 ring-1 ring-slate-100 hover:ring-primary-100 group flex flex-col h-full rounded-2xl">
                  <div className="flex-1">
                    <h3 className="text-xl font-extrabold text-slate-800 leading-snug group-hover:text-primary-600 transition-colors">{job.title}</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Đăng ngày {job.postedAt}</p>
                  </div>

                  <div className="space-y-3 text-xs font-semibold text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-primary-500" />{job.location}</p>
                    <p className="flex items-center gap-2.5"><Briefcase className="h-4 w-4 text-primary-500" />{job.type}</p>
                    <p className="flex items-center gap-2.5"><FileText className="h-4 w-4 text-primary-500" />{job.salary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/company/${COMPANY.slug}/jobs/${job.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
                    >
                      {job.requiresCv ? 'Xem và nộp CV' : 'Xem và gửi thông tin'}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              )) : (
                <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200">
                  <p className="text-slate-500 font-medium">Không tìm thấy công việc nào phù hợp với từ khóa của bạn.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. ABOUT TAB (FULL DETAILED VIEW) */}
      {activeTab === 'about' && (
        <div className="bg-white py-16 min-h-screen border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-10">Giới thiệu công ty {COMPANY.name}</h1>
            
            {/* Info Card */}
            <div className="text-left mb-12 border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200">
                <div className="p-6 md:col-span-4 lg:col-span-3 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">Năm thành lập</span>
                </div>
                <div className="p-6 md:col-span-8 lg:col-span-9 flex items-center">
                  <span className="text-sm text-slate-600 font-medium">{COMPANY.founded}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200">
                <div className="p-6 md:col-span-4 lg:col-span-3 flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">Quy mô</span>
                </div>
                <div className="p-6 md:col-span-8 lg:col-span-9 flex items-center">
                  <span className="text-sm text-slate-600 font-medium">{COMPANY.size}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200">
                <div className="p-6 md:col-span-4 lg:col-span-3 flex items-center gap-3">
                  <User className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">Độ tuổi trung bình</span>
                </div>
                <div className="p-6 md:col-span-8 lg:col-span-9 flex items-center">
                  <span className="text-sm text-slate-600 font-medium">{COMPANY.averageAge}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200">
                <div className="p-6 md:col-span-4 lg:col-span-3 flex items-start gap-3">
                  <LayoutGrid className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-700">Ngành nghề kinh doanh</span>
                </div>
                <div className="p-6 md:col-span-8 lg:col-span-9">
                  <ul className="text-sm text-slate-600 space-y-3 font-medium">
                    {COMPANY.businessSectors.map((sector, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-slate-400">{idx + 1}.</span> {sector}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                <div className="p-6 md:col-span-4 lg:col-span-3 flex items-start gap-3">
                  <Box className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-700">Ngành nghề chính</span>
                </div>
                <div className="p-6 md:col-span-8 lg:col-span-9">
                  <ul className="text-sm text-slate-600 space-y-3 font-medium">
                    {COMPANY.mainSector.map((sector, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-slate-400">{idx + 1}.</span> {sector}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-6 text-justify md:text-left font-medium">
              {COMPANY.fullDescription.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
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
                <button onClick={() => setActiveTab('about')} className="block text-xs font-semibold hover:text-primary-400 transition-colors">Về chúng tôi</button>
                <button onClick={() => setActiveTab('jobs')} className="block text-xs font-semibold hover:text-primary-400 transition-colors">Vị trí đang tuyển</button>
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

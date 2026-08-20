import React, { useState } from 'react';
import {
  Download,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  MoreVertical,
  Star,
  CheckCircle2,
  Link,
  GitBranch,
  Globe,
  Settings2,
  Plus,
  Filter,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CandidateDrawer, type CandidateData } from './CandidateDrawer';
import { InterviewSchedulerModal } from './modals/InterviewSchedulerModal';
import { AISuggestionsModal } from './modals/AISuggestionsModal';

export interface ExtendedCandidateData extends CandidateData {
  skills: string[];
  extraSkills: number;
  experience: string;
  companies: string[];
  rating: number;
  ratingLabel: string;
  ratingProgress: number;
  priority: string;
  priorityColor: string;
  source: string;
  sourceIcon: 'website' | 'linkedin' | 'referral';
  location: string;
  lastUpdated: string;
  hasLinkedin: boolean;
  hasGithub: boolean;
  verified: boolean;
}

const EXTENDED_CANDIDATES: ExtendedCandidateData[] = [
  {
    id: 'c1',
    name: 'Lê Hoàng Phúc',
    email: 'phuc.le@gmail.com',
    phone: '0987 654 321',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Senior AI Engineer',
    location: 'TP. HCM',
    matchScore: 87,
    status: 'NEW',
    currentRound: 0,
    totalRounds: 3,
    submittedAt: '20/06/2025',
    roundHistory: [{ roundIndex: 0, roundName: 'CV Screening', result: 'PENDING' }],
    skills: ['Python', 'TensorFlow', 'NLP', 'AWS', 'SQL'],
    extraSkills: 3,
    experience: '4 năm',
    companies: ['FPT Software', 'VinAI'],
    rating: 4.5,
    ratingLabel: 'Phù hợp cao',
    ratingProgress: 90,
    priority: 'Ưu tiên cao',
    priorityColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    source: 'Website',
    sourceIcon: 'website',
    lastUpdated: '20/06/2025\n09:30',
    hasLinkedin: true,
    hasGithub: true,
    verified: true,
  },
  {
    id: 'c2',
    name: 'Phạm Thu Hà',
    email: 'ha.pham@outlook.com',
    phone: '0976 123 456',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Senior AI Engineer',
    location: 'Hà Nội',
    matchScore: 92,
    status: 'SCREENING',
    currentRound: 0,
    totalRounds: 3,
    submittedAt: '19/06/2025',
    roundHistory: [{ roundIndex: 0, roundName: 'CV Screening', result: 'PENDING' }],
    skills: ['Python', 'PyTorch', 'Computer Vision', 'Docker', 'SQL'],
    extraSkills: 2,
    experience: '5 năm',
    companies: ['VNG Corporation', 'Tiki'],
    rating: 4.3,
    ratingLabel: 'Phù hợp cao',
    ratingProgress: 86,
    priority: 'Ưu tiên cao',
    priorityColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    source: 'LinkedIn',
    sourceIcon: 'linkedin',
    lastUpdated: '19/06/2025\n16:45',
    hasLinkedin: true,
    hasGithub: false,
    verified: false,
  },
  {
    id: 'c3',
    name: 'Vũ Đức Bảo',
    email: 'bao.vu@techcorp.vn',
    phone: '0901 234 567',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Product Designer',
    location: 'TP. HCM',
    matchScore: 78,
    status: 'INTERVIEW',
    currentRound: 1,
    totalRounds: 4,
    submittedAt: '22/06/2025',
    roundHistory: [
      { roundIndex: 0, roundName: 'CV Screening', result: 'PASSED', date: '2026-07-31' },
      { roundIndex: 1, roundName: 'Online Test', result: 'PENDING' },
    ],
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research', 'Adobe XD'],
    extraSkills: 2,
    experience: '3 năm',
    companies: ['TopDev', 'Freelancer'],
    rating: 3.8,
    ratingLabel: 'Phù hợp trung bình',
    ratingProgress: 76,
    priority: 'Ưu tiên trung bình',
    priorityColor: 'text-amber-600 bg-amber-50 border-amber-100',
    source: 'Referral',
    sourceIcon: 'referral',
    lastUpdated: '18/06/2025\n11:20',
    hasLinkedin: false,
    hasGithub: true,
    verified: false,
  },
  {
    id: 'c4',
    name: 'Đặng Khánh Linh',
    email: 'linh.dang@dev.io',
    phone: '0932 345 678',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Backend Developer (Java)',
    location: 'Hà Nội',
    matchScore: 84,
    status: 'TEST',
    currentRound: 2,
    totalRounds: 3,
    submittedAt: '18/06/2025',
    roundHistory: [
      { roundIndex: 0, roundName: 'CV Screening', result: 'PASSED', date: '2026-07-29' },
      { roundIndex: 1, roundName: 'Coding Test', result: 'PASSED', date: '2026-07-31' },
      { roundIndex: 2, roundName: 'Phỏng vấn kỹ thuật', result: 'PENDING' },
    ],
    skills: ['Java', 'Spring Boot', 'REST API', 'MySQL', 'Kafka'],
    extraSkills: 2,
    experience: '3.5 năm',
    companies: ['FPT Software', 'KMS Technology'],
    rating: 4.1,
    ratingLabel: 'Phù hợp cao',
    ratingProgress: 82,
    priority: 'Ưu tiên cao',
    priorityColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    source: 'Website',
    sourceIcon: 'website',
    lastUpdated: '18/06/2025\n09:15',
    hasLinkedin: true,
    hasGithub: true,
    verified: false,
  },
  {
    id: 'c5',
    name: 'Nguyễn Anh Khoa',
    email: 'khoa.nguyen@talent.io',
    phone: '0912 345 678',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Senior AI Engineer',
    location: 'TP. HCM',
    matchScore: 91,
    status: 'NEW',
    currentRound: 3,
    totalRounds: 3,
    submittedAt: '17/06/2025',
    roundHistory: [
      { roundIndex: 0, roundName: 'CV Screening', result: 'PASSED', date: '2026-07-21' },
      { roundIndex: 1, roundName: 'Online Test', result: 'PASSED', date: '2026-07-24' },
      { roundIndex: 2, roundName: 'Phỏng vấn & Offer', result: 'PASSED', date: '2026-07-28' },
    ],
    skills: ['Python', 'AWS', 'MLOps', 'Docker', 'FastAPI'],
    extraSkills: 2,
    experience: '6 năm',
    companies: ['Shopee', 'MoMo'],
    rating: 4.7,
    ratingLabel: 'Phù hợp rất cao',
    ratingProgress: 94,
    priority: 'Ưu tiên cao',
    priorityColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    source: 'LinkedIn',
    sourceIcon: 'linkedin',
    lastUpdated: '17/06/2025\n14:22',
    hasLinkedin: true,
    hasGithub: true,
    verified: false,
  },
  {
    id: 'c6',
    name: 'Bùi Minh Tâm',
    email: 'tam.bui@work.vn',
    phone: '0899 876 543',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Product Designer',
    location: 'Đà Nẵng',
    matchScore: 58,
    status: 'REJECTED',
    currentRound: 1,
    totalRounds: 3,
    submittedAt: '16/06/2025',
    roundHistory: [
      { roundIndex: 0, roundName: 'CV Screening', result: 'PASSED', date: '2026-07-26' },
      { roundIndex: 1, roundName: 'Design Challenge', result: 'FAILED', date: '2026-07-30' },
    ],
    skills: ['Figma', 'UI/UX', 'Illustrator', 'Photoshop', 'User Flow'],
    extraSkills: 1,
    experience: '2 năm',
    companies: ['GMO-Z.com', 'Freelancer'],
    rating: 3.2,
    ratingLabel: 'Phù hợp trung bình',
    ratingProgress: 64,
    priority: 'Ưu tiên trung bình',
    priorityColor: 'text-amber-600 bg-amber-50 border-amber-100',
    source: 'Website',
    sourceIcon: 'website',
    lastUpdated: '16/06/2025\n10:10',
    hasLinkedin: true,
    hasGithub: true,
    verified: false,
  },
];

const STATUS_CONFIG: Record<string, { label: string; dot: string; textClass: string; actionText: string }> = {
  NEW: { label: 'Mới', dot: 'bg-emerald-500', textClass: 'text-emerald-500', actionText: 'Ứng tuyển' },
  SCREENING: { label: 'Sàng lọc', dot: 'bg-blue-500', textClass: 'text-blue-500', actionText: 'Cập nhật' },
  INTERVIEW: { label: 'Phỏng vấn', dot: 'bg-amber-500', textClass: 'text-amber-500', actionText: 'Lịch' },
  TEST: { label: 'Test Tech', dot: 'bg-purple-500', textClass: 'text-purple-500', actionText: 'Cập nhật' },
  REJECTED: { label: 'Từ chối', dot: 'bg-red-500', textClass: 'text-red-500', actionText: 'Cập nhật' },
};

const getSourceIcon = (source: string) => {
  if (source === 'website') return <Globe className="w-3.5 h-3.5 text-slate-500 mr-1.5" />;
  if (source === 'linkedin') return <Link className="w-3.5 h-3.5 text-[#0A66C2] mr-1.5" />;
  if (source === 'referral') return <Users className="w-3.5 h-3.5 text-slate-500 mr-1.5" />;
  return <Globe className="w-3.5 h-3.5 text-slate-500 mr-1.5" />;
};

export const CandidatesList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<ExtendedCandidateData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const openDrawer = (c: ExtendedCandidateData) => {
    setSelectedCandidate(c);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedCandidate(null), 300);
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(EXTENDED_CANDIDATES.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <>
      <div className="flex-1 p-8 bg-white min-h-[calc(100vh-4rem)] space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 select-none">
          <span>Dashboard</span>
          <span className="text-[10px]">&gt;</span>
          <span>Ứng viên</span>
          <span className="text-[10px]">&gt;</span>
          <span className="text-slate-600">Danh sách</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 select-none">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[26px] font-extrabold text-slate-900 tracking-tight">Danh sách ứng viên</h1>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                1.284 ứng viên
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              Quản lý và đánh giá ứng viên hiệu quả
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
              <Settings2 className="w-4 h-4 text-slate-500" />
              Tùy chỉnh cột
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
              <Download className="w-4 h-4 text-slate-500" />
              Xuất Excel
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer">
              <Plus className="w-4 h-4" />
              Thêm ứng viên
            </button>
          </div>
        </div>

        {/* Filters Box */}
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-col xl:flex-row items-center gap-4 select-none">
          <div className="relative w-full xl:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tên, email, SĐT, kỹ năng..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-medium text-slate-700 transition-colors placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap w-full">
            <div className="relative w-full lg:w-auto flex-1">
              <select className="w-full appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 text-sm font-medium text-slate-700 transition-colors cursor-pointer">
                <option>Vị trí ứng tuyển: Tất cả</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative w-full lg:w-auto flex-1">
              <select className="w-full appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 text-sm font-medium text-slate-700 transition-colors cursor-pointer">
                <option>Trạng thái: Tất cả</option>
                <option>Mới</option>
                <option>Sàng lọc</option>
                <option>Phỏng vấn</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative w-full lg:w-auto flex-1">
              <select className="w-full appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 text-sm font-medium text-slate-700 transition-colors cursor-pointer">
                <option>Kinh nghiệm: Tất cả</option>
                <option>Dưới 1 năm</option>
                <option>1 - 3 năm</option>
                <option>Trên 3 năm</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            
            <div className="flex items-center h-[42px] w-full lg:w-auto">
              <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-blue-100 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors cursor-pointer shrink-0 w-full lg:w-auto">
                <Filter className="w-4 h-4" />
                Bộ lọc nâng cao
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto border-t border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 uppercase tracking-wider select-none">
                <th className="px-4 py-4 w-12 text-center">
                   <input type="checkbox" onChange={toggleSelectAll} checked={selectedIds.length === EXTENDED_CANDIDATES.length && EXTENDED_CANDIDATES.length > 0} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </th>
                <th className="px-4 py-4">Ứng viên</th>
                <th className="px-4 py-4">Vị trí ứng tuyển</th>
                <th className="px-4 py-4 w-40">Kỹ năng nổi bật</th>
                <th className="px-4 py-4">Kinh nghiệm</th>
                <th className="px-4 py-4">Trạng thái tuyển dụng</th>
                <th className="px-4 py-4">Cập nhật gần nhất</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50 bg-white">
              {EXTENDED_CANDIDATES.map((c) => {
                const statusCfg = STATUS_CONFIG[c.status];
                const isSelected = selectedIds.includes(c.id);
                return (
                  <tr
                    key={c.id}
                    onClick={() => openDrawer(c)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-6 text-center" onClick={(e) => e.stopPropagation()}>
                       <input type="checkbox" checked={isSelected} onChange={(e) => toggleSelect(c.id, e as any)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    </td>
                    
                    {/* Candidate Info */}
                    <td className="px-4 py-6">
                      <div className="flex items-start gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="h-10 w-10 rounded-full object-cover shadow-sm shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-extrabold text-slate-900 hover:text-blue-600 transition-colors">
                              {c.name}
                            </p>
                            {c.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {c.hasLinkedin && (
                              <div className="w-5 h-5 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0A66C2]">
                                <Link className="w-3 h-3" />
                              </div>
                            )}
                            {c.hasGithub && (
                              <div className="w-5 h-5 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800">
                                <GitBranch className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Job Details */}
                    <td className="px-4 py-6">
                      <div className="text-sm font-bold text-slate-800 mb-1">{c.jobTitle}</div>
                      <div className="text-[11px] font-semibold text-slate-500 mb-2">{c.location}</div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${c.priorityColor}`}>
                        {c.priority}
                      </span>
                    </td>

                    {/* Skills */}
                    <td className="px-4 py-6">
                      <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                        {c.skills.slice(0, 4).map((skill, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600">
                            {skill}
                          </span>
                        ))}
                        {c.extraSkills > 0 && (
                          <span className="px-2 py-1 rounded bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600">
                            +{c.extraSkills}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Experience */}
                    <td className="px-4 py-6">
                      <div className="text-sm font-bold text-slate-800 mb-1">{c.experience}</div>
                      <div className="space-y-0.5">
                        {c.companies.map((comp, i) => (
                          <div key={i} className="text-[11px] font-semibold text-slate-500">{comp}</div>
                        ))}
                      </div>
                    </td>



                    {/* Status */}
                    <td className="px-4 py-6">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-bold mb-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                        <span className={statusCfg.textClass}>{statusCfg.label}</span>
                      </div>
                      <div className="text-[10px] font-semibold text-slate-500">
                        {statusCfg.actionText}: {c.submittedAt}
                      </div>
                    </td>



                    {/* Last Updated */}
                    <td className="px-4 py-6">
                      <div className="text-[11px] font-semibold text-slate-500 whitespace-pre-line">
                        {c.lastUpdated}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <CandidateDrawer
        isOpen={drawerOpen}
        candidate={selectedCandidate as unknown as CandidateData}
        onClose={closeDrawer}
        onSchedule={() => { setDrawerOpen(false); setScheduleModalOpen(true); }}
        onAISuggest={() => { setDrawerOpen(false); setAiModalOpen(true); }}
      />

      <InterviewSchedulerModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        candidateName={selectedCandidate?.name}
      />
      <AISuggestionsModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        candidateName={selectedCandidate?.name}
        matchScore={selectedCandidate?.matchScore}
      />
    </>
  );
};

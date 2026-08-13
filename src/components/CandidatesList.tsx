import React, { useState } from 'react';
import {
  Download,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CandidateDrawer, type CandidateData } from './CandidateDrawer';
import { InterviewSchedulerModal } from './modals/InterviewSchedulerModal';
import { AISuggestionsModal } from './modals/AISuggestionsModal';

const CANDIDATES: CandidateData[] = [
  {
    id: 'c1',
    name: 'LÃª HoÃ ng PhÃºc',
    email: 'phuc.le@gmail.com',
    phone: '0901 234 567',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Senior AI Engineer',
    matchScore: 87,
    status: 'NEW',
    currentRound: 0,
    totalRounds: 3,
    submittedAt: '2026-08-01',
    roundHistory: [{ roundIndex: 0, roundName: 'CV Screening', result: 'PENDING' }],
  },
  {
    id: 'c2',
    name: 'Pháº¡m Thu HÃ ',
    email: 'ha.pham@outlook.com',
    phone: '0912 345 678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Senior AI Engineer',
    matchScore: 92,
    status: 'NEW',
    currentRound: 0,
    totalRounds: 3,
    submittedAt: '2026-08-02',
    roundHistory: [{ roundIndex: 0, roundName: 'CV Screening', result: 'PENDING' }],
  },
  {
    id: 'c3',
    name: 'VÅ© Äá»©c Báº£o',
    email: 'bao.vu@techcorp.vn',
    phone: '0908 567 890',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Product Designer',
    matchScore: 78,
    status: 'IN_PROGRESS',
    currentRound: 1,
    totalRounds: 4,
    submittedAt: '2026-07-30',
    roundHistory: [
      { roundIndex: 0, roundName: 'CV Screening', result: 'PASSED', date: '2026-07-31' },
      { roundIndex: 1, roundName: 'Online Test', result: 'PENDING' },
    ],
  },
  {
    id: 'c4',
    name: 'Äáº·ng KhÃ¡nh Linh',
    email: 'linh.dang@dev.io',
    phone: '0945 678 901',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Backend Developer (Java)',
    matchScore: 84,
    status: 'IN_PROGRESS',
    currentRound: 2,
    totalRounds: 3,
    submittedAt: '2026-07-28',
    roundHistory: [
      { roundIndex: 0, roundName: 'CV Screening', result: 'PASSED', date: '2026-07-29' },
      { roundIndex: 1, roundName: 'Coding Test', result: 'PASSED', date: '2026-07-31' },
      { roundIndex: 2, roundName: 'Phá»ng váº¥n ká»¹ thuáº­t', result: 'PENDING' },
    ],
  },
  {
    id: 'c5',
    name: 'Nguyá»…n Anh Khoa',
    email: 'khoa.nguyen@talent.io',
    phone: '0988 111 222',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Senior AI Engineer',
    matchScore: 91,
    status: 'PASSED',
    currentRound: 3,
    totalRounds: 3,
    submittedAt: '2026-07-20',
    roundHistory: [
      { roundIndex: 0, roundName: 'CV Screening', result: 'PASSED', date: '2026-07-21' },
      { roundIndex: 1, roundName: 'Online Test', result: 'PASSED', date: '2026-07-24' },
      { roundIndex: 2, roundName: 'Phá»ng váº¥n & Offer', result: 'PASSED', date: '2026-07-28' },
    ],
  },
  {
    id: 'c6',
    name: 'BÃ¹i Minh TÃ¢m',
    email: 'tam.bui@work.vn',
    phone: '0966 333 444',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120',
    jobTitle: 'Product Designer',
    matchScore: 58,
    status: 'REJECTED',
    currentRound: 1,
    totalRounds: 3,
    submittedAt: '2026-07-25',
    roundHistory: [
      { roundIndex: 0, roundName: 'CV Screening', result: 'PASSED', date: '2026-07-26' },
      { roundIndex: 1, roundName: 'Design Challenge', result: 'FAILED', date: '2026-07-30' },
    ],
  },
];

const STATUS_CONFIG: Record<string, { label: string; cls: string; dot: string }> = {
  NEW: { label: 'Má»›i', cls: 'bg-blue-50 text-blue-600 border-blue-100', dot: 'bg-blue-500' },
  IN_PROGRESS: { label: 'Äang xá»­ lÃ½', cls: 'bg-amber-50 text-amber-600 border-amber-100', dot: 'bg-amber-500' },
  PASSED: { label: 'Äáº¡t', cls: 'bg-emerald-50 text-emerald-600 border-emerald-100', dot: 'bg-emerald-500' },
  REJECTED: { label: 'KhÃ´ng Ä‘áº¡t', cls: 'bg-red-50 text-red-500 border-red-100', dot: 'bg-red-500' },
};

export const CandidatesList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const openDrawer = (c: CandidateData) => {
    setSelectedCandidate(c);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedCandidate(null), 300);
  };

  const filtered = CANDIDATES.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.jobTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span>Dashboard</span>
              <span className="text-[10px]">&gt;</span>
              <span>á»¨ng viÃªn</span>
              <span className="text-[10px]">&gt;</span>
              <span className="text-slate-500">Danh sÃ¡ch</span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Danh sÃ¡ch á»©ng viÃªn</h1>
                <p className="text-sm font-medium text-slate-500 mt-0.5">
                  {filtered.length} á»©ng viÃªn phÃ¹ há»£p
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => navigate('/dashboard/applications/kanban')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Kanban
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-bold">
                <List className="h-3.5 w-3.5" />
                Danh sÃ¡ch
              </button>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm font-bold shadow-sm transition-all cursor-pointer">
              <Download className="h-4 w-4" />
              Xuáº¥t CSV
            </button>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 select-none">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="TÃ¬m theo tÃªn, email, vá»‹ trÃ­..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm font-medium transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <option value="all">Táº¥t cáº£ tráº¡ng thÃ¡i</option>
              <option value="NEW">Má»›i</option>
              <option value="IN_PROGRESS">Äang xá»­ lÃ½</option>
              <option value="PASSED">Äáº¡t</option>
              <option value="REJECTED">KhÃ´ng Ä‘áº¡t</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="premium-card bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider select-none">
                  <th className="px-6 py-4">á»¨ng viÃªn</th>
                  <th className="px-6 py-4">Vá»‹ trÃ­ á»©ng tuyá»ƒn</th>
                  <th className="px-6 py-4">Tráº¡ng thÃ¡i</th>
                  <th className="px-6 py-4">Tiáº¿n trÃ¬nh vÃ²ng</th>
                  <th className="px-6 py-4">AI Matching</th>
                  <th className="px-6 py-4">NgÃ y ná»™p</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((c) => {
                  const statusCfg = STATUS_CONFIG[c.status];
                  const isHighMatch = c.matchScore >= 85;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => openDrawer(c)}
                      className="hover:bg-primary-50/30 transition-colors cursor-pointer group"
                    >
                      {/* Avatar + Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="h-10 w-10 rounded-full object-cover border border-slate-100 shadow-sm"
                          />
                          <div>
                            <p className="text-sm font-extrabold text-slate-800 group-hover:text-primary-600 transition-colors">
                              {c.name}
                            </p>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">{c.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Job */}
                      <td className="px-6 py-4 text-sm text-slate-600 font-semibold">{c.jobTitle}</td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusCfg.cls}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`} />
                          {statusCfg.label}
                        </span>
                      </td>

                      {/* Round progress */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {Array.from({ length: c.totalRounds }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 w-5 rounded-full ${i < c.currentRound ? 'bg-primary-500' : 'bg-slate-200'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-slate-500">{c.currentRound}/{c.totalRounds}</span>
                        </div>
                      </td>

                      {/* Match Score */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          isHighMatch ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-primary-50 text-primary-600 border-primary-100'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${isHighMatch ? 'bg-emerald-500' : 'bg-primary-500'}`} />
                          {c.matchScore}% khá»›p
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-slate-400 font-medium">{c.submittedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-slate-400 font-semibold text-sm">KhÃ´ng tÃ¬m tháº¥y á»©ng viÃªn phÃ¹ há»£p</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer */}
      <CandidateDrawer
        isOpen={drawerOpen}
        candidate={selectedCandidate}
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


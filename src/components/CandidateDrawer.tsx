import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  Clock,
  BrainCircuit,
  FileText,
  Mic2,
  ListChecks,
  CheckCircle2,
  AlertCircle,
  XCircle,
  PlayCircle,
  PauseCircle,
  Zap,
  Search,
} from 'lucide-react';

export interface CandidateData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  jobTitle: string;
  matchScore: number;
  // Khớp với applications.status trong DB
  status: 'NEW' | 'IN_PROGRESS' | 'PASSED' | 'REJECTED' | 'HIRED';
  currentRound: number;
  totalRounds: number;
  submittedAt: string;
  cvUrl?: string;
  // Khớp với application_round_statuses.status trong DB
  roundHistory: {
    roundIndex: number;
    roundName: string;
    result: 'PASSED' | 'FAILED' | 'PENDING' | 'SKIPPED';
    date?: string;
  }[];
}

interface CandidateDrawerProps {
  isOpen: boolean;
  candidate: CandidateData | null;
  onClose: () => void;
  onPass?: (id: string) => void;
  onFail?: (id: string) => void;
  onInitiateFail?: (id: string) => void;
  onSchedule?: (id: string) => void;
  onAISuggest?: (id: string) => void;
}

export const CandidateDrawer: React.FC<CandidateDrawerProps> = ({
  isOpen,
  candidate,
  onClose,
  onPass,
  onFail,
  onInitiateFail,
  onSchedule,
  onAISuggest,
}) => {
  const [activeSection, setActiveSection] = useState<'info' | 'rounds' | 'ai'>('info');
  const [aiSubTab, setAiSubTab] = useState<'overview' | 'cv' | 'interview' | 'jd'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);

  if (!candidate) return null;

  const scoreColor =
    candidate.matchScore >= 85
      ? 'text-emerald-600'
      : candidate.matchScore >= 70
      ? 'text-amber-600'
      : 'text-red-500';

  const scoreBg =
    candidate.matchScore >= 85
      ? 'bg-emerald-50 border-emerald-100'
      : candidate.matchScore >= 70
      ? 'bg-amber-50 border-amber-100'
      : 'bg-red-50 border-red-100';

  const statusMap = {
    NEW: { label: 'Mới', cls: 'bg-blue-50 text-blue-600 border-blue-100' },
    IN_PROGRESS: { label: 'Đang xử lý', cls: 'bg-amber-50 text-amber-600 border-amber-100' },
    PASSED: { label: 'Đạt', cls: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    REJECTED: { label: 'Không đạt', cls: 'bg-red-50 text-red-500 border-red-100' },
    HIRED: { label: 'Đã tuyển', cls: 'bg-purple-50 text-purple-600 border-purple-100' },
  };

  const statusInfo = statusMap[candidate.status] ?? { label: candidate.status, cls: 'bg-slate-100 text-slate-500 border-slate-200' };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed right-0 top-0 h-full w-[900px] max-w-full bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="h-12 w-12 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-slate-800 leading-tight">{candidate.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-slate-400 font-semibold truncate max-w-[180px]">{candidate.jobTitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusInfo.cls}`}>
              {statusInfo.label}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* AI Score Banner */}
        <div className={`mx-6 mt-5 px-4 py-3 rounded-2xl border flex items-center justify-between ${scoreBg}`}>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Matching Score</p>
              <p className={`text-2xl font-extrabold leading-tight ${scoreColor}`}>
                {candidate.matchScore}%
              </p>
            </div>
          </div>
          {/* Score bar */}
          <div className="w-32">
            <div className="h-2 rounded-full bg-white/70 overflow-hidden border border-white">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  candidate.matchScore >= 85 ? 'bg-emerald-500' : candidate.matchScore >= 70 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${candidate.matchScore}%` }}
              />
            </div>
            <p className="text-[9px] font-semibold text-slate-400 mt-1 text-right">
              {candidate.matchScore >= 85 ? 'Phù hợp cao' : candidate.matchScore >= 70 ? 'Phù hợp vừa' : 'Cần xem xét'}
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-1 px-6 mt-5 border-b border-slate-100 shrink-0">
          {(['info', 'rounds', 'ai'] as const).map((sec) => {
            const labels = { info: 'Thông tin', rounds: 'Lịch sử vòng', ai: 'AI Gợi ý' };
            return (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  activeSection === sec
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                {labels[sec]}
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {activeSection === 'info' && (
            <>
              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thông tin liên hệ</h4>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold">Email</p>
                      <p className="text-sm font-bold text-slate-700 truncate">{candidate.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold">Số điện thoại</p>
                      <p className="text-sm font-bold text-slate-700">{candidate.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold">Ngày nộp hồ sơ</p>
                      <p className="text-sm font-bold text-slate-700">{candidate.submittedAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CV Download */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hồ sơ đính kèm</h4>
                <div className="flex items-center justify-between p-4 bg-primary-50 border border-primary-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary-500/10 border border-primary-200 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-500">CV</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">CV_{candidate.name.replace(/\s/g, '_')}.pdf</p>
                      <p className="text-[10px] text-slate-400 font-semibold">PDF · 2.4 MB</p>
                    </div>
                  </div>
                  <a
                    href={candidate.cvUrl || '#'}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tải xuống
                  </a>
                </div>
              </div>

              {/* Progress Rounds info */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tiến trình vòng</p>
                  <span className="text-xs font-extrabold text-slate-700">
                    {candidate.currentRound}/{candidate.totalRounds}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: candidate.totalRounds }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        i < candidate.currentRound
                          ? 'bg-primary-500'
                          : i === candidate.currentRound
                          ? 'bg-primary-200 animate-pulse'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mt-2">
                  Đang ở Vòng {candidate.currentRound + 1} / {candidate.totalRounds}
                </p>
              </div>
            </>
          )}

          {activeSection === 'rounds' && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lịch sử các vòng</h4>
              <div className="relative pl-4">
                {/* Vertical line */}
                <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200" />
                <div className="space-y-4">
                  {candidate.roundHistory.map((r, idx) => {
                    const isPending = r.result === 'PENDING';
                    const isPass = r.result === 'PASSED';
                    const isSkipped = r.result === 'SKIPPED';
                    return (
                      <div key={idx} className="relative flex items-start gap-4 pl-6">
                        {/* Dot */}
                        <div
                          className={`absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-white ring-2 z-10 ${
                            isPending ? 'bg-amber-400 ring-amber-200' : isPass ? 'bg-emerald-500 ring-emerald-200' : isSkipped ? 'bg-slate-400 ring-slate-200' : 'bg-red-500 ring-red-200'
                          }`}
                        />
                        <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                          isPending ? 'bg-amber-50 border-amber-100' : isPass ? 'bg-emerald-50 border-emerald-100' : isSkipped ? 'bg-slate-50 border-slate-200' : 'bg-red-50 border-red-100'
                        }`}>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-extrabold text-slate-800">{r.roundName}</p>
                            {isPending ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700">
                                <Clock className="h-2.5 w-2.5" />
                                Đang xử lý
                              </span>
                            ) : isPass ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700">
                                Đạt
                              </span>
                            ) : isSkipped ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-500">
                                Bỏ qua
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-100 text-red-700">
                                Không đạt
                              </span>
                            )}
                          </div>
                          {r.date && (
                            <p className="text-[10px] font-semibold text-slate-400 mt-1">{r.date}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="flex flex-col h-full bg-slate-50 -mx-6 -my-5 px-6 py-5">
              {/* Sub-tabs header */}
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
                {[
                  { id: 'overview', label: 'Tổng quan', icon: BrainCircuit },
                  { id: 'cv', label: 'Phân tích CV', icon: FileText },
                  { id: 'interview', label: 'Phỏng vấn', icon: Mic2 },
                  { id: 'jd', label: 'Đối chiếu JD', icon: ListChecks },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = aiSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAiSubTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                          : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* TAB CONTENT: Overview */}
              {aiSubTab === 'overview' && (
                <div className="space-y-6">
                  {/* Score & Radar Replacement (using Progress bars instead of actual Radar for simplicity, or just a grid of scores) */}
                  <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                       <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                         <Zap className="h-8 w-8 text-primary-600" />
                       </div>
                       <p className={`text-4xl font-extrabold ${scoreColor}`}>{candidate.matchScore}%</p>
                       <p className="text-xs text-slate-500 font-bold mt-1">Độ phù hợp tổng thể</p>
                       <span className={`mt-3 inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${
                         candidate.matchScore >= 85 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                       }`}>
                         {candidate.matchScore >= 85 ? 'Phù hợp cao' : 'Cần xem xét'}
                       </span>
                    </div>

                    <div className="col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <h4 className="text-sm font-extrabold text-slate-800">Chi tiết Năng lực</h4>
                      <div className="space-y-3">
                        {[
                          { label: 'Kỹ năng chuyên môn', score: 90 },
                          { label: 'Kinh nghiệm thực tế', score: 85 },
                          { label: 'Kỹ năng mềm & Giao tiếp', score: 75 },
                          { label: 'Phù hợp văn hóa', score: 80 },
                        ].map(skill => (
                          <div key={skill.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-slate-600">{skill.label}</span>
                              <span className="text-xs font-bold text-slate-800">{skill.score}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full bg-primary-500 rounded-full`} style={{ width: `${skill.score}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                      <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                        <CheckCircle2 className="h-4 w-4" /> Điểm mạnh nổi bật
                      </h4>
                      <ul className="space-y-2">
                        <li className="text-xs font-semibold text-slate-700 flex gap-2"><span className="text-emerald-500">•</span> Nắm vững kiến trúc Microservices và RESTful API.</li>
                        <li className="text-xs font-semibold text-slate-700 flex gap-2"><span className="text-emerald-500">•</span> Trả lời phỏng vấn tự tin, rành mạch.</li>
                        <li className="text-xs font-semibold text-slate-700 flex gap-2"><span className="text-emerald-500">•</span> Đã từng làm việc với hệ thống high-traffic.</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
                      <h4 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                        <AlertCircle className="h-4 w-4" /> Yếu tố cần cân nhắc
                      </h4>
                      <ul className="space-y-2">
                        <li className="text-xs font-semibold text-slate-700 flex gap-2"><span className="text-amber-500">•</span> Chưa có nhiều kinh nghiệm lead team quy mô &gt; 10 người.</li>
                        <li className="text-xs font-semibold text-slate-700 flex gap-2"><span className="text-amber-500">•</span> Tiếng Anh giao tiếp ở mức khá, đôi lúc vấp.</li>
                        <li className="text-xs font-semibold text-slate-700 flex gap-2"><span className="text-amber-500">•</span> Mức lương kỳ vọng hơi cao so với budget (+10%).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: Phân tích CV */}
              {aiSubTab === 'cv' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-full">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 mb-4">Học vấn & Chứng chỉ</h4>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-slate-300 group-[.is-active]:bg-primary-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                        <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-4 rounded-xl border border-slate-100 bg-slate-50">
                          <p className="text-xs font-bold text-slate-800">Cử nhân Công nghệ Thông tin</p>
                          <p className="text-[10px] font-semibold text-slate-500">Đại học Bách Khoa TP.HCM (2018 - 2022)</p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-1">GPA: 3.8/4.0</p>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-slate-300 group-[.is-active]:bg-primary-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                        <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-4 rounded-xl border border-slate-100 bg-slate-50">
                          <p className="text-xs font-bold text-slate-800">AWS Certified Solutions Architect</p>
                          <p className="text-[10px] font-semibold text-slate-500">Amazon Web Services (2023)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 mb-3">Kỹ năng trích xuất (Skills)</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Java', 'Spring Boot', 'ReactJS', 'AWS', 'Docker', 'Kubernetes', 'MySQL', 'Redis'].map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: Interview */}
              {aiSubTab === 'interview' && (
                <div className="flex gap-5 h-[500px]">
                  {/* Left: Player & Insights */}
                  <div className="w-1/3 flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <Mic2 className="h-6 w-6 text-slate-600" />
                      </div>
                      <p className="text-xs font-bold text-slate-800">Technical_Interview_T1.mp3</p>
                      <p className="text-[10px] font-semibold text-slate-400">45:20 • Recorded on Oct 12, 2026</p>
                      
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <button onClick={() => setIsPlaying(!isPlaying)} className="text-primary-600 hover:text-primary-700 cursor-pointer">
                          {isPlaying ? <PauseCircle className="h-10 w-10" /> : <PlayCircle className="h-10 w-10" />}
                        </button>
                      </div>
                      <div className="mt-4 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 w-1/3" />
                      </div>
                      <div className="flex justify-between mt-1 px-1">
                         <span className="text-[9px] text-slate-400">15:10</span>
                         <span className="text-[9px] text-slate-400">45:20</span>
                      </div>
                    </div>

                    <div className="bg-primary-50 p-4 rounded-2xl border border-primary-100 flex-1 overflow-y-auto">
                      <h4 className="text-xs font-bold text-primary-700 mb-3">AI Đánh giá Giao tiếp</h4>
                      <p className="text-xs text-primary-900 font-medium leading-relaxed mb-3">
                        Ứng viên trả lời rành mạch, tốc độ nói vừa phải (120 từ/phút). Cấu trúc câu hỏi tình huống bằng phương pháp STAR rất rõ ràng.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-slate-600">Sự tự tin</span>
                          <span className="text-emerald-600">Cao</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-slate-600">Sự chân thật</span>
                          <span className="text-emerald-600">Đáng tin cậy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Transcript */}
                  <div className="w-2/3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-extrabold text-slate-800">Transcript (Bóc băng AI)</h4>
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                        <input type="text" placeholder="Tìm từ khóa..." className="pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:border-primary-500 w-40" />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 font-bold text-[10px] flex items-center justify-center shrink-0">HR</div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold mb-0.5">14:05</p>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">Bạn có thể chia sẻ về một thử thách khó nhất bạn từng gặp khi thiết kế hệ thống Backend không?</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 font-bold text-[10px] flex items-center justify-center shrink-0">UV</div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold mb-0.5">14:20</p>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-amber-50 px-3 py-2 rounded-xl rounded-tl-none border border-amber-100">
                            Vâng, tại dự án trước, hệ thống gặp tình trạng bottleneck khi lượng request tăng đột biến lên <span className="bg-yellow-200 text-yellow-900 px-1 rounded font-bold cursor-help" title="Kinh nghiệm tối ưu hiệu năng">50,000 rps</span>. Lúc đó, giải pháp của em là implement <span className="bg-yellow-200 text-yellow-900 px-1 rounded font-bold cursor-help" title="Kỹ năng Redis">Redis Caching</span> ở tầng API Gateway và chia nhỏ một monolith service thành 3 <span className="bg-yellow-200 text-yellow-900 px-1 rounded font-bold cursor-help" title="Kiến trúc hệ thống">Microservices</span> chạy trên Kubernetes...
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 font-bold text-[10px] flex items-center justify-center shrink-0">HR</div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold mb-0.5">15:10</p>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">Tuyệt vời, vậy bạn xử lý vấn đề data consistency giữa các service đó như thế nào?</p>
                        </div>
                      </div>
                      {/* Active playing line */}
                      <div className="flex gap-3 relative">
                        <div className="absolute -left-2 top-2 h-2 w-2 rounded-full bg-primary-500 animate-ping" />
                        <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 font-bold text-[10px] flex items-center justify-center shrink-0">UV</div>
                        <div>
                          <p className="text-[9px] text-primary-500 font-bold mb-0.5">15:15</p>
                          <p className="text-xs text-slate-900 leading-relaxed font-bold bg-white px-3 py-2 rounded-xl rounded-tl-none border-2 border-primary-500 shadow-sm">
                            Em sử dụng pattern Saga kết hợp với Kafka để đảm bảo eventual consistency...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: JD Matching */}
              {aiSubTab === 'jd' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
                  <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800">Đối chiếu Yêu cầu Công việc (JD)</h4>
                      <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Kết hợp dữ liệu từ CV và Phỏng vấn</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left">
                      <thead className="bg-white sticky top-0 border-b border-slate-100 shadow-sm">
                        <tr>
                          <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase">Yêu cầu từ JD</th>
                          <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase">Bằng chứng (CV / PV)</th>
                          <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase w-28">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 text-xs font-bold text-slate-700">Kinh nghiệm 2+ năm Node.js / Java</td>
                          <td className="px-5 py-4 text-xs font-medium text-slate-600 leading-relaxed">
                            Có 3 năm kinh nghiệm làm Backend Developer tại FPT Software (Theo CV).
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold border border-emerald-100">
                              <CheckCircle2 className="h-3 w-3" /> Đạt
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 text-xs font-bold text-slate-700">Kiến trúc Microservices, AWS</td>
                          <td className="px-5 py-4 text-xs font-medium text-slate-600 leading-relaxed">
                            Có chứng chỉ AWS. Đã giải thích rất chi tiết về Microservices và scale hệ thống trong buổi phỏng vấn (14:20).
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold border border-emerald-100">
                              <CheckCircle2 className="h-3 w-3" /> Đạt
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 text-xs font-bold text-slate-700">Tiếng Anh giao tiếp tốt (Tương đương IELTS 6.0)</td>
                          <td className="px-5 py-4 text-xs font-medium text-slate-600 leading-relaxed">
                            CV ghi TOEIC 650. Tuy nhiên trong phỏng vấn kỹ năng nói Tiếng Anh có phần vấp, thiếu từ vựng chuyên ngành.
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded text-[10px] font-bold border border-amber-100">
                              <AlertCircle className="h-3 w-3" /> Cân nhắc
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 text-xs font-bold text-slate-700">Kinh nghiệm vận hành CI/CD pipelines</td>
                          <td className="px-5 py-4 text-xs font-medium text-slate-600 leading-relaxed">
                            Không tìm thấy keyword trong CV, và chưa đề cập trong nội dung phỏng vấn.
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-500 rounded text-[10px] font-bold border border-red-100">
                              <XCircle className="h-3 w-3" /> Thiếu
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 py-5 border-t border-slate-100 bg-white shrink-0 space-y-3">
          {/* Pass / Fail */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onPass?.(candidate.id)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
            >
              ĐẠT vòng này
            </button>
            <button
              onClick={() => onInitiateFail ? onInitiateFail(candidate.id) : onFail?.(candidate.id)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow-sm shadow-red-500/20 transition-all cursor-pointer active:scale-95"
            >
              TRƯỢT
            </button>
          </div>
          {/* Schedule / AI */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSchedule?.(candidate.id)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Đặt lịch PV
            </button>
            <button
              onClick={() => {
                setActiveSection('ai');
                onAISuggest?.(candidate.id);
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-primary-200 bg-primary-50 hover:bg-primary-100 text-primary-600 text-xs font-bold transition-all cursor-pointer"
            >
              AI Gợi ý
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  FileText,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  Download,
  Award,
  AlertCircle,
  Clock,
  Briefcase,
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
  onSchedule?: (id: string) => void;
  onAISuggest?: (id: string) => void;
}

export const CandidateDrawer: React.FC<CandidateDrawerProps> = ({
  isOpen,
  candidate,
  onClose,
  onPass,
  onFail,
  onSchedule,
  onAISuggest,
}) => {
  const [activeSection, setActiveSection] = useState<'info' | 'rounds' | 'ai'>('info');

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
        className={`fixed right-0 top-0 h-full w-[480px] max-w-full bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out ${
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
                <Briefcase className="h-3 w-3 text-slate-400" />
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
            <Sparkles className={`h-5 w-5 ${scoreColor}`} />
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
                      <FileText className="h-5 w-5 text-primary-500" />
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
                    <Download className="h-3.5 w-3.5" />
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
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                Đạt
                              </span>
                            ) : isSkipped ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-500">
                                Bỏ qua
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-100 text-red-700">
                                <XCircle className="h-2.5 w-2.5" />
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
            <div className="space-y-5">
              {/* Score card */}
              <div className="p-5 bg-gradient-to-br from-primary-50 to-amber-50 rounded-2xl border border-primary-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">AI Phân tích hồ sơ</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Vector Embedding Matching</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className={`text-5xl font-extrabold ${scoreColor}`}>{candidate.matchScore}%</p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Độ phù hợp với JD</p>
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5" />
                  Điểm mạnh
                </h4>
                {['Kinh nghiệm phù hợp với JD', 'Kỹ năng kỹ thuật tốt', 'CV rõ ràng, có dự án thực tế'].map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-slate-700">{s}</p>
                  </div>
                ))}
              </div>

              {/* Weaknesses */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Điểm cần xem xét
                </h4>
                {['Chưa có kinh nghiệm quản lý team', 'Thiếu chứng chỉ yêu cầu'].map((w, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-red-50 rounded-xl border border-red-100">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-slate-700">{w}</p>
                  </div>
                ))}
              </div>

              {/* Interview Questions */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  Câu hỏi phỏng vấn đề xuất
                </h4>
                {[
                  'Hãy mô tả dự án AI lớn nhất bạn từng tham gia?',
                  'Bạn xử lý vector database như thế nào khi scale?',
                  'Kinh nghiệm với LLM fine-tuning của bạn?',
                ].map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="h-5 w-5 rounded-lg bg-primary-100 text-primary-600 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-xs font-semibold text-slate-700 leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
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
              <CheckCircle2 className="h-4 w-4" />
              ĐẠT vòng này
            </button>
            <button
              onClick={() => onFail?.(candidate.id)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow-sm shadow-red-500/20 transition-all cursor-pointer active:scale-95"
            >
              <XCircle className="h-4 w-4" />
              TRƯỢT
            </button>
          </div>
          {/* Schedule / AI */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSchedule?.(candidate.id)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-slate-500" />
              Đặt lịch PV
            </button>
            <button
              onClick={() => {
                setActiveSection('ai');
                onAISuggest?.(candidate.id);
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-primary-200 bg-primary-50 hover:bg-primary-100 text-primary-600 text-xs font-bold transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              AI Gợi ý
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

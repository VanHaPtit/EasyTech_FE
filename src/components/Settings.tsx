import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Plus,
  Trash2,
  Edit3,
  X,
  Check,
  RefreshCw,
  Save
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
interface EmailTemplate {
  id: string;
  title: string;
  subject: string;
  tag: 'APPLICATION_RECEIVED' | 'PASS' | 'FAIL' | 'INTERVIEW_INVITE' | 'OFFER';
  type: 'APPLICATION_RECEIVED' | 'PASS' | 'FAIL' | 'INTERVIEW_INVITE' | 'OFFER';
}

// ─── Mock Data ────────────────────────────────────────────
const EMAIL_TEMPLATES: EmailTemplate[] = [
  { id: 't0', title: 'Xác nhận nộp đơn thành công', subject: 'Xác nhận ứng tuyển vị trí {{job_title}}', tag: 'APPLICATION_RECEIVED', type: 'APPLICATION_RECEIVED' },
  { id: 't1', title: 'Qua vòng CV Screening', subject: '{{candidate_name}} — Chúc mừng qua vòng CV Screening', tag: 'PASS', type: 'PASS' },
  { id: 't2', title: 'Mời phỏng vấn kỹ thuật', subject: 'Lời mời phỏng vấn — {{job_title}} tại {{company_name}}', tag: 'INTERVIEW_INVITE', type: 'INTERVIEW_INVITE' },
  { id: 't3', title: 'Không đạt vòng Online Test', subject: 'Kết quả vòng Test — {{candidate_name}}', tag: 'FAIL', type: 'FAIL' },
  { id: 't4', title: 'Offer Letter', subject: 'Thư mời nhận việc chính thức — {{candidate_name}}', tag: 'OFFER', type: 'OFFER' },
  { id: 't5', title: 'Cảm ơn ứng viên', subject: 'Cảm ơn {{candidate_name}} đã ứng tuyển', tag: 'FAIL', type: 'FAIL' },
  { id: 't6', title: 'Qua vòng Online Test', subject: 'Chúc mừng {{candidate_name}} qua vòng Test', tag: 'PASS', type: 'PASS' },
];

const EmailTemplateModal: React.FC<{
  template: EmailTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: EmailTemplate) => void;
}> = ({ template, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(template?.title || '');
  const [subject, setSubject] = useState(template?.subject || '');
  const [tag, setTag] = useState<EmailTemplate['tag']>(template?.tag || 'PASS');
  const [content, setContent] = useState(template ? 'Xin chào {{candidate_name}},\n\nChúng tôi vui mừng thông báo...' : '');

  // Reset state when template changes
  React.useEffect(() => {
    if (isOpen) {
      setTitle(template?.title || '');
      setSubject(template?.subject || '');
      setTag(template?.tag || 'PASS');
      setContent(template ? 'Xin chào {{candidate_name}},\n\nNội dung chi tiết email...' : '');
    }
  }, [template, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-800">{template ? 'Chỉnh sửa Email Template' : 'Tạo Email Template mới'}</h3>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tên mẫu nội bộ</label>
              <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none transition-colors" placeholder="VD: Thư mời phỏng vấn..." />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nhóm phân loại</label>
              <select value={tag} onChange={e => setTag(e.target.value as any)} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-700">
                <option value="APPLICATION_RECEIVED">Đã nhận hồ sơ</option>
                <option value="PASS">Pass (Đạt vòng)</option>
                <option value="FAIL">Fail (Trượt)</option>
                <option value="INTERVIEW_INVITE">Interview (Mời phỏng vấn)</option>
                <option value="OFFER">Offer (Đề nghị nhận việc)</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tiêu đề (Subject)</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-3 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none transition-colors" placeholder="VD: Kết quả phỏng vấn - {{candidate_name}}" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nội dung Email</label>
              <div className="flex gap-1.5 select-none">
                <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-primary-50 text-primary-600 rounded-md cursor-pointer hover:bg-primary-100 transition-colors" onClick={() => setContent(c => c + '{{candidate_name}}')}>+ {'{{candidate_name}}'}</span>
                <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-primary-50 text-primary-600 rounded-md cursor-pointer hover:bg-primary-100 transition-colors" onClick={() => setContent(c => c + '{{job_title}}')}>+ {'{{job_title}}'}</span>
                <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-primary-50 text-primary-600 rounded-md cursor-pointer hover:bg-primary-100 transition-colors" onClick={() => setContent(c => c + '{{interview_date}}')}>+ {'{{interview_date}}'}</span>
              </div>
            </div>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} className="w-full px-3 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none resize-none transition-colors" placeholder="Soạn nội dung email chi tiết ở đây..." />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
          <button onClick={onClose} className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">Hủy</button>
          <button onClick={() => {
            onSave({ 
              id: template?.id || `t${Date.now()}`, 
              title, 
              subject, 
              tag, 
              type: tag.toLowerCase() as any 
            });
            onClose();
          }} className="px-5 py-2.5 text-xs font-bold text-white bg-primary-500 rounded-xl hover:bg-primary-600 shadow-sm shadow-primary-500/20 transition-colors cursor-pointer flex items-center gap-2">
            <Save className="h-4 w-4" />
            Lưu Template
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Settings Component ──────────────────────────────
const TABS = [
  { id: 'general', label: 'Thông tin chung', icon: Building2 },
  { id: 'emails', label: 'Email Templates', icon: Mail },
];

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [companyName, setCompanyName] = useState('TechA JSC');
  const [phone, setPhone] = useState('+84 900 100 200');
  const [address, setAddress] = useState('Tầng 12, Tòa Lotus, 68 Nguyễn Huệ, Q.1, TP. HCM');
  const [website, setWebsite] = useState('www.techa.vn');
  // Email Template states
  const [emails, setEmails] = useState<EmailTemplate[]>(EMAIL_TEMPLATES);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<EmailTemplate | null>(null);

  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savedGeneral, setSavedGeneral] = useState(false);

  const handleSaveGeneral = () => {
    setSavingGeneral(true);
    setTimeout(() => { setSavingGeneral(false); setSavedGeneral(true); setTimeout(() => setSavedGeneral(false), 2000); }, 1000);
  };

  const tagBg = (tag: string) => {
    if (tag === 'APPLICATION_RECEIVED') return 'bg-blue-50 text-blue-600 border-blue-100';
    if (tag === 'PASS') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (tag === 'FAIL') return 'bg-red-50 text-red-500 border-red-100';
    if (tag === 'OFFER') return 'bg-purple-50 text-purple-600 border-purple-100';
    if (tag === 'INTERVIEW_INVITE') return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-slate-50 text-slate-600 border-slate-100';
  };

  return (
    <>
      <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)] space-y-8">
        {/* Page Header */}
        <div className="space-y-1 select-none text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Dashboard</span>
            <span className="text-[10px]">&gt;</span>
            <span className="text-slate-500">Cài đặt</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Cài đặt hệ thống</h1>
          <p className="text-sm font-medium text-slate-500">
            Quản lý thông tin công ty, AI providers, email templates và giám sát agent
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Tab Sidebar */}
          <div className="premium-card bg-white p-3 space-y-1 select-none">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer text-left ${
                    isActive ? 'bg-primary-500/10 text-primary-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary-500' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 premium-card bg-white overflow-hidden">
            {/* ── Tab: General ── */}
            {activeTab === 'general' && (
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 select-none">
                  <h3 className="text-lg font-bold text-slate-800">Thông tin công ty</h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Đang hoạt động
                  </span>
                </div>
                {/* Logo */}
                <div className="flex items-center gap-6">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120"
                    alt="Logo"
                    className="h-20 w-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                  />
                  <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors cursor-pointer select-none">
                    Đổi logo
                  </button>
                </div>

                <div className="space-y-5 max-w-2xl text-left">
                  {[
                    { label: 'Tên công ty', value: companyName, set: setCompanyName, type: 'text' },
                    { label: 'Số điện thoại', value: phone, set: setPhone, type: 'tel' },
                    { label: 'Địa chỉ', value: address, set: setAddress, type: 'text' },
                    { label: 'Website', value: website, set: setWebsite, type: 'url' },
                  ].map((f) => (
                    <div key={f.label} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{f.label}</label>
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm font-semibold text-slate-800 transition-colors"
                      />
                    </div>
                  ))}

                  {/* Subdomain (read-only) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subdomain (Career Site)</label>
                    <input
                      type="text"
                      value="techa.easytech.vn"
                      readOnly
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-400 cursor-not-allowed"
                    />
                    <p className="text-[10px] text-slate-400 font-semibold">Subdomain do Admin cấp phát, không thể thay đổi.</p>
                  </div>

                  <button
                    onClick={handleSaveGeneral}
                    disabled={savingGeneral}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold shadow-sm shadow-primary-500/20 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {savingGeneral ? <RefreshCw className="h-4 w-4 animate-spin" /> : savedGeneral ? <Check className="h-4 w-4" /> : null}
                    {savedGeneral ? 'Đã lưu!' : 'Cập nhật thông tin'}
                  </button>
                </div>
              </div>
            )}



            {/* ── Tab: Email Templates ── */}
            {activeTab === 'emails' && (
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 select-none">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Email Templates</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Hỗ trợ biến: {'{{candidate_name}}'}, {'{{job_title}}'}, {'{{interview_date}}'}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setCurrentEmail(null);
                      setEmailModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Tạo mẫu mới
                  </button>
                </div>

                <div className="space-y-3 text-left">
                  {emails.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-xl border flex items-center justify-center ${tagBg(t.tag).replace('text-', 'text-').replace('border-', 'border-')}`}>
                          <Mail className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-800">{t.title}</h4>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5 truncate max-w-[280px]">{t.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 select-none">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${tagBg(t.tag)}`}>{t.tag}</span>
                        <button 
                          onClick={() => {
                            setCurrentEmail(t);
                            setEmailModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-primary-500 hover:bg-primary-50 transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm("Bạn có chắc muốn xoá mẫu email này?")) {
                              setEmails(prev => prev.filter(e => e.id !== t.id));
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>

      {/* Modals */}
      <EmailTemplateModal 
        isOpen={emailModalOpen} 
        template={currentEmail} 
        onClose={() => setEmailModalOpen(false)} 
        onSave={(newTemp) => {
          if (currentEmail) {
            setEmails(prev => prev.map(e => e.id === newTemp.id ? newTemp : e));
          } else {
            setEmails(prev => [...prev, newTemp]);
          }
        }}
      />
    </>
  );
};

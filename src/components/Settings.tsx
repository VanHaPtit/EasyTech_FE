import React, { useState } from 'react';
import { CareerSiteSettings } from '../pages/hr/CareerSiteSettings';
import {
  Building2,
  Mail,
  Plus,
  Trash2,
  Edit3,
  X,
  Check,
  RefreshCw,
  Save,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Zap,
  DollarSign,
  Trophy,
  Heart,
  Star,
  Users,
  Briefcase,
  Globe2,
  GripVertical,
  Search,
  Eye,
  MoreVertical,
  Link as LinkIcon,
  ChevronDown,
  BookOpen
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


// ─── Main Settings Component ──────────────────────────────
const TABS = [
  { id: 'general', label: 'Thông tin chung', icon: Building2 },
  { id: 'emails', label: 'Email Templates', icon: Mail },
];

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [companyName, setCompanyName] = useState('TechA.JSC');
  const [employeeSize, setEmployeeSize] = useState('120+');
  const [founded, setFounded] = useState('2019');
  const [taxCode, setTaxCode] = useState('0312345678');
  const [industry, setIndustry] = useState('Công nghệ thông tin');
  const [slogan, setSlogan] = useState('Đổi mới để dẫn đầu');
  const [companyIntro, setCompanyIntro] = useState('Chúng tôi xây dựng tương lai bằng công nghệ và sự sáng tạo không ngừng nghỉ.');
  const [phone, setPhone] = useState('+84 910 100 260');
  const [website, setWebsite] = useState('www.techa.vn');
  
  const [province, setProvince] = useState('Hồ Chí Minh');
  const [ward, setWard] = useState('Phường Thủ Đức');
  const [address, setAddress] = useState('Tầng 12, Tòa Lotus, 68 Nguyễn Huệ, Q.1, TP. HCM');
  const [services, setServices] = useState('AI Product Development, Data Platform, Cloud Engineering');

  interface WhyJoinCard {
    id: string;
    text: string;
  }
  
  const [whyChooseUs, setWhyChooseUs] = useState<WhyJoinCard[]>([
    { id: 'wj1', text: 'Làm việc với các công nghệ AI mới nhất, từ LLM đến Vector Embedding trong môi trường thực tế.' },
    { id: 'wj2', text: 'Môi trường cạnh tranh - equity - review 2 lần/năm - 13th month - bảo hiểm sức khỏe cao cấp.' },
    { id: 'wj3', text: 'Budget học hỏi hàng năm, mentorship từ senior engineers, cơ hội làm việc với khách hàng quốc tế.' },
  ]);

  // Email Template states
  const [emails, setEmails] = useState<EmailTemplate[]>(EMAIL_TEMPLATES);
  const [currentEmail, setCurrentEmail] = useState<EmailTemplate>(EMAIL_TEMPLATES[0]);

  const updateCurrentEmail = (updates: Partial<EmailTemplate>) => {
    if (!currentEmail) return;
    const updated = { ...currentEmail, ...updates };
    setCurrentEmail(updated);
    setEmails(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savedGeneral, setSavedGeneral] = useState(false);

  const handleSaveGeneral = () => {
    setSavingGeneral(true);
    setTimeout(() => { setSavingGeneral(false); setSavedGeneral(true); setTimeout(() => setSavedGeneral(false), 2000); }, 1000);
  };

  const tagBg = (tag: string) => {
    if (tag === 'PASS') return 'bg-blue-50 text-blue-500 border-blue-200';
    if (tag === 'FAIL') return 'bg-red-50 text-red-500 border-red-200';
    return 'bg-slate-50 text-slate-500 border-slate-200';
  };

  const getStatusText = (tag: string) => {
    if (tag === 'PASS') return 'Pass (Đạt vòng)';
    if (tag === 'FAIL') return 'Fail (Trượt)';
    if (tag === 'INTERVIEW_INVITE') return 'Mời phỏng vấn';
    if (tag === 'OFFER') return 'Offer (Đề nghị nhận việc)';
    if (tag === 'APPLICATION_RECEIVED') return 'Đã nhận hồ sơ';
    return tag;
  };

  return (
    <>
      <div className="flex-1 p-8 bg-[#F8FAFC] min-h-[calc(100vh-4rem)]">
        <div className="max-w-[1400px] w-full mx-auto space-y-8">
          {/* Page Header */}
          <div className="space-y-1 select-none text-left">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span>Dashboard</span>
              <span className="text-[10px]">&gt;</span>
              <span className="text-slate-500">Cài đặt</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Cài đặt hệ thống</h1>
            <p className="text-sm font-medium text-slate-500">
              Quản lý thông tin công ty và cấu hình Career Site.
            </p>
          </div>

          {/* Layout */}
        <div className="flex flex-col gap-6">
          {/* Tab Header */}
          <div className="flex items-center gap-2 border-b border-slate-200">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-[13px] font-bold transition-all duration-200 cursor-pointer border-b-2 -mb-[1px] ${
                    isActive ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="w-full">
            {/* ── Tab: General ── */}
            {activeTab === 'general' && (
              <div className="flex flex-col gap-6 pt-2">
                <div className="border border-slate-100 rounded-2xl p-8 bg-white shadow-sm shadow-slate-100/50">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800">Thông tin công ty</h3>
                  <p className="text-sm text-slate-500 mb-8 mt-1">Cập nhật thông tin doanh nghiệp sẽ hiển thị trên Career Site.</p>
                  
                  {/* Logo */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 bg-[#e6f0f9] rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120"
                        alt="Logo"
                        className="h-14 w-14 rounded-lg object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 transition-colors w-max cursor-pointer">
                        Upload logo
                      </button>
                      <span className="text-[10px] font-medium text-slate-400 uppercase">PNG, JPG tối đa 2MB</span>
                    </div>
                  </div>

                  <div className="space-y-6 max-w-4xl text-left">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-600">Tên công ty <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-600">Quy mô nhân sự</label>
                        <div className="relative">
                          <select
                            value={employeeSize}
                            onChange={(e) => setEmployeeSize(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors appearance-none cursor-pointer"
                          >
                            <option value="120+">120+</option>
                            <option value="50-100">50-100</option>
                            <option value="1-50">1-50</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-600">Năm thành lập</label>
                        <input
                          type="text"
                          value={founded}
                          onChange={(e) => setFounded(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-600">Mã số thuế</label>
                        <input
                          type="text"
                          value={taxCode}
                          onChange={(e) => setTaxCode(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-600">Lĩnh vực hoạt động</label>
                        <input
                          type="text"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-slate-600">Slogan (câu công ty)</label>
                      <input
                        type="text"
                        value={slogan}
                        onChange={(e) => setSlogan(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                      />
                    </div>

                    {/* Row 4 */}
                    <div className="space-y-2">
                      <label className="text-[13px] font-semibold text-slate-600">Giới thiệu công ty (tối đa 200 ký tự)</label>
                      <textarea
                        value={companyIntro}
                        onChange={(e) => setCompanyIntro(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors resize-none"
                      />
                    </div>

                    {/* Row 5 */}
                    <div className="grid grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-600">Số điện thoại</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-600">Website (nếu có)</label>
                        <input
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Địa điểm công ty */}
                    <div className="pt-2 pb-6 border-b border-slate-100">
                      <h4 className="text-[15px] font-bold text-slate-800 mb-5">Địa điểm công ty</h4>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-slate-600">Tỉnh / Thành phố</label>
                            <div className="relative">
                              <select
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors appearance-none cursor-pointer"
                              >
                                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                              </select>
                              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-slate-600">Xã / Phường</label>
                            <div className="relative">
                              <select
                                value={ward}
                                onChange={(e) => setWard(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors appearance-none cursor-pointer"
                              >
                                <option value="Phường Thủ Đức">Phường Thủ Đức</option>
                                <option value="Phường Bến Nghé">Phường Bến Nghé</option>
                              </select>
                              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[13px] font-semibold text-slate-600">Địa chỉ cụ thể</label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[13px] font-semibold text-slate-600">Dịch vụ / Sản phẩm chính</label>
                          <input
                            type="text"
                            value={services}
                            onChange={(e) => setServices(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary-500 text-sm text-slate-800 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* LÝ DO CHỌN CÔNG TY */}
                    <div className="pt-2">
                      <div className="space-y-1 pb-4">
                        <h4 className="text-[15px] font-bold text-slate-800 mb-1">Lý do chọn công ty</h4>
                        <p className="text-[12px] text-slate-500">Các lý do nổi bật về văn hóa, cơ hội phát triển hiển thị trên Career Site.</p>
                      </div>
                      
                      <div className="space-y-3">
                        {whyChooseUs.map((card, index) => (
                          <div key={card.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors group">
                            <div className="text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-400">
                              <GripVertical className="h-4 w-4" />
                            </div>
                            
                            <input
                              type="text"
                              value={card.text}
                              onChange={(e) => {
                                const newCards = [...whyChooseUs];
                                newCards[index].text = e.target.value;
                                setWhyChooseUs(newCards);
                              }}
                              className="flex-1 bg-transparent text-[13px] text-slate-700 focus:outline-none focus:text-slate-900"
                            />
                            
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1.5 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 cursor-pointer">
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button 
                                onClick={() => setWhyChooseUs(prev => prev.filter(c => c.id !== card.id))}
                                className="p-1.5 text-red-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        <button 
                          onClick={() => {
                            setWhyChooseUs(prev => [
                              ...prev, 
                              { id: `wj${Date.now()}`, text: 'Lý do mới' }
                            ]);
                          }}
                          className="w-full py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-500 text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                          <span>+</span>
                          <span>Thêm lý do mới</span>
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 flex justify-end">
                      <button
                        onClick={handleSaveGeneral}
                        disabled={savingGeneral}
                        className="px-6 py-2.5 rounded-lg bg-[#2563eb] hover:bg-blue-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-blue-500/20"
                      >
                        {savingGeneral ? <RefreshCw className="h-4 w-4 animate-spin" /> : savedGeneral ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                        <span>Lưu thông tin</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-2xl bg-white shadow-sm shadow-slate-100/50">
                  <CareerSiteSettings />
                </div>
              </div>
            )}



            {/* ── Tab: Email Templates ── */}
            {activeTab === 'emails' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* ── Left Column: List ── */}
                <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm shadow-slate-100/50">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="text" placeholder="Tìm kiếm mẫu email..." className="w-full pl-9 pr-3 py-2 text-[13px] border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <button 
                      onClick={() => {
                        const newTemplate: EmailTemplate = {
                          id: `t${Date.now()}`,
                          title: 'Mẫu email mới',
                          subject: '',
                          tag: 'PASS',
                          type: 'PASS'
                        };
                        setEmails([newTemplate, ...emails]);
                        setCurrentEmail(newTemplate);
                      }}
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Tạo mẫu
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-[600px] pr-1">
                    {emails.map((t) => (
                      <div 
                        key={t.id} 
                        onClick={() => setCurrentEmail(t)}
                        className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${currentEmail?.id === t.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:border-slate-300'}`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
                          <div className={`h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center ${tagBg(t.tag).replace('text-', 'text-').replace('border-', 'border-')}`}>
                            <Mail className="h-4.5 w-4.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className={`text-[13px] font-bold truncate ${currentEmail?.id === t.id ? 'text-blue-900' : 'text-slate-800'}`}>{t.title}</h4>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">{getStatusText(t.tag)}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border shrink-0 uppercase ${tagBg(t.tag)}`}>{t.tag}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-slate-500">
                     <button className="p-1 hover:text-slate-800 cursor-pointer">&lt;</button>
                     <span className="text-xs font-bold">1 / 7</span>
                     <button className="p-1 hover:text-slate-800 cursor-pointer">&gt;</button>
                  </div>
                </div>

                {/* ── Right Column: Editor ── */}
                <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm shadow-slate-100/50 flex flex-col gap-6">
                  {currentEmail ? (
                    <>
                      {/* Header */}
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div className="flex-1 max-w-xl">
                          <input 
                            type="text" 
                            value={currentEmail.title}
                            onChange={(e) => updateCurrentEmail({ title: e.target.value })}
                            className="text-lg font-extrabold text-slate-800 bg-transparent border-none focus:outline-none w-full"
                            placeholder="Nhập tên mẫu email..."
                          />
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] font-semibold text-slate-500">
                            <span className={`px-1.5 py-0.5 rounded border uppercase text-[9px] ${tagBg(currentEmail.tag)}`}>{currentEmail.tag}</span>
                            <span>Đã gửi 25 lần</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>Cập nhật lần cuối: 12/05/2024 14:30</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer">
                            <Eye className="h-3.5 w-3.5" />
                            Xem trước
                          </button>
                          <button className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1.5 transition-colors cursor-pointer">
                            <Save className="h-3.5 w-3.5" />
                            Lưu thay đổi
                          </button>
                          <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="grid grid-cols-12 gap-8">
                         <div className="col-span-12 xl:col-span-8 flex flex-col gap-5">
                           
                           <div className="grid grid-cols-2 gap-5 text-left">
                             <div className="space-y-1.5">
                               <label className="text-[11px] font-bold text-slate-600">Loại Email / Trạng thái <span className="text-red-500">*</span></label>
                               <select 
                                 value={currentEmail.tag}
                                 onChange={(e) => updateCurrentEmail({ tag: e.target.value as any, type: e.target.value as any })}
                                 className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
                               >
                                 <option value="APPLICATION_RECEIVED">Đã nhận hồ sơ</option>
                                 <option value="PASS">Pass (Đạt vòng)</option>
                                 <option value="FAIL">Fail (Trượt)</option>
                                 <option value="INTERVIEW_INVITE">Interview (Mời phỏng vấn)</option>
                                 <option value="OFFER">Offer (Đề nghị nhận việc)</option>
                               </select>
                             </div>
                             <div className="space-y-1.5">
                               <label className="text-[11px] font-bold text-slate-600">Tiêu đề (Subject) <span className="text-red-500">*</span></label>
                               <input 
                                 type="text" 
                                 value={currentEmail.subject} 
                                 onChange={(e) => updateCurrentEmail({ subject: e.target.value })}
                                 className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500 transition-colors" 
                               />
                             </div>
                           </div>

                           <div className="space-y-1.5 text-left">
                             <label className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
                               Nội dung email <span className="text-red-500">*</span>
                             </label>
                             <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col focus-within:border-blue-500 transition-colors">
                               <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50 flex-wrap">
                                  <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 font-bold text-xs w-7 h-7 flex items-center justify-center cursor-pointer">B</button>
                                  <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 italic text-xs w-7 h-7 flex items-center justify-center cursor-pointer">I</button>
                                  <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 underline text-xs w-7 h-7 flex items-center justify-center cursor-pointer">U</button>
                                  <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 line-through text-xs w-7 h-7 flex items-center justify-center cursor-pointer">S</button>
                                  <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                  <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"><LinkIcon className="h-3.5 w-3.5" /></button>
                                  <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                  <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"><List className="h-3.5 w-3.5" /></button>
                                  <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"><ListOrdered className="h-3.5 w-3.5" /></button>
                                  <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                  <div className="ml-auto mt-1 sm:mt-0">
                                    <button className="px-2 py-1 rounded border border-slate-200 bg-white text-[11px] font-bold text-slate-600 flex items-center gap-1 hover:bg-slate-50 cursor-pointer shadow-sm">
                                      Chèn biến <ChevronDown className="h-3 w-3" />
                                    </button>
                                  </div>
                               </div>
                               <textarea 
                                 value={currentEmail.id === 't0' ? 'Xin chào {{candidate_name}},\n\nCảm ơn bạn đã quan tâm và ứng tuyển vào vị trí {{job_title}} tại {{company_name}}.\n\nChúng tôi đã nhận được hồ sơ của bạn và đội ngũ tuyển dụng sẽ xem xét kỹ lưỡng.\n\nChúng tôi sẽ liên hệ lại trong thời gian sớm nhất.\n\nTrân trọng,\n{{company_name}} Recruitment Team' : currentEmail.id === 't1' ? 'Xin chào {{candidate_name}},\n\nChúc mừng bạn đã vượt qua vòng sơ loại CV.\n\nHR sẽ gọi điện cho bạn sớm nhé.' : 'Nội dung...'}
                                 onChange={(e) => {}}
                                 rows={14} 
                                 className="w-full p-4 text-[13px] text-slate-700 bg-white focus:outline-none resize-none leading-relaxed" 
                               />
                             </div>
                           </div>
                         </div>
                         
                         {/* Variables Sidebar */}
                         <div className="col-span-12 xl:col-span-4">
                           <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left h-full">
                             <h4 className="text-[12px] font-bold text-slate-800">Biến động sử dụng</h4>
                             <p className="text-[10px] text-slate-500 mt-1 mb-4 leading-relaxed">Click để sao chép biến và dán vào nội dung email.</p>
                             
                             <div className="space-y-3">
                               <div className="bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm hover:border-blue-200 transition-colors cursor-pointer group">
                                 <div className="flex justify-between items-center">
                                   <code className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-[10px] font-bold group-hover:bg-blue-100 transition-colors">{'{' + '{candidate_name}' + '}'}</code>
                                 </div>
                                 <p className="text-[10px] text-slate-500 mt-1 font-medium">Tên đầy đủ của ứng viên</p>
                               </div>
                               <div className="bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm hover:border-blue-200 transition-colors cursor-pointer group">
                                 <code className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-[10px] font-bold group-hover:bg-blue-100 transition-colors">{'{' + '{job_title}' + '}'}</code>
                                 <p className="text-[10px] text-slate-500 mt-1 font-medium">Tên vị trí đang tuyển</p>
                               </div>
                               <div className="bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm hover:border-blue-200 transition-colors cursor-pointer group">
                                 <code className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-[10px] font-bold group-hover:bg-blue-100 transition-colors">{'{' + '{company_name}' + '}'}</code>
                                 <p className="text-[10px] text-slate-500 mt-1 font-medium">Tên công ty (TechA.JSC)</p>
                               </div>
                               <div className="bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm hover:border-blue-200 transition-colors cursor-pointer group">
                                 <code className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-[10px] font-bold group-hover:bg-blue-100 transition-colors">{'{' + '{interview_date}' + '}'}</code>
                                 <p className="text-[10px] text-slate-500 mt-1 font-medium">Ngày giờ phỏng vấn dự kiến</p>
                               </div>
                             </div>
                             
                             <button className="w-full mt-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm">
                               <BookOpen className="h-3.5 w-3.5" />
                               Xem danh sách 20+ biến
                             </button>
                           </div>
                         </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-20">
                      <Mail className="h-12 w-12 text-slate-200 mb-4" />
                      <p className="text-[13px] font-medium">Chọn một mẫu email để xem chi tiết</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      </div>


    </>
  );
};

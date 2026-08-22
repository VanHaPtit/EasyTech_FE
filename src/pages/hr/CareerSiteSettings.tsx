import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const CareerSiteSettings: React.FC = () => {
  const [aiDescription, setAiDescription] = useState('Biến mọi ý tưởng AI để hệ thống tự động vận hành dễ dàng hơn.');

  return (
    <div className="p-8 space-y-8 bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[17px] font-bold text-slate-800">Cấu hình Career Site</h3>
        </div>
      </div>

      <div className="space-y-4 max-w-3xl">
        <div className="space-y-1 pb-2">
          <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">MÔ TẢ CÔNG TY</h4>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col">
          {/* Toolbar mockup */}
          <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
            <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 font-bold text-xs w-7 h-7 flex items-center justify-center cursor-pointer">B</button>
            <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 italic text-xs w-7 h-7 flex items-center justify-center cursor-pointer">I</button>
            <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 underline text-xs w-7 h-7 flex items-center justify-center cursor-pointer">U</button>
            <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 line-through text-xs w-7 h-7 flex items-center justify-center cursor-pointer">S</button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <button className="p-1.5 rounded hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </button>
          </div>
          
          <div className="relative">
            <textarea 
              value={aiDescription} 
              onChange={(e) => setAiDescription(e.target.value)} 
              rows={8} 
              className="w-full p-4 text-[13px] text-slate-700 focus:outline-none resize-none" 
              placeholder="Nhập mô tả công ty..." 
            />
            <div className="absolute bottom-3 right-4 text-[10px] font-medium text-slate-400">
              {aiDescription.length}/1000 ký tự
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button 
            onClick={() => setAiDescription('TechA Solutions là công ty công nghệ tiên phong tại Việt Nam, tập trung vào việc phát triển các sản phẩm AI ứng dụng, xây dựng nền tảng dữ liệu lớn (Data Platform) và cung cấp các giải pháp tự động hóa toàn diện cho doanh nghiệp.\n\nChúng tôi tự hào mang đến môi trường làm việc sáng tạo, nơi các kỹ sư được trực tiếp tham gia vào các dự án thách thức, ứng dụng công nghệ hiện đại nhất như LLM và Vector Embedding để giải quyết các bài toán thực tế.')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#6d28d9] hover:bg-purple-700 text-white text-[13px] font-semibold transition-all cursor-pointer shadow-sm shadow-purple-500/20 px-6 shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            Tạo bằng AI
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, CheckCircle2, XCircle, ArrowRight, Briefcase, Calendar, TrendingUp, FileEdit, CalendarCheck, ClipboardCheck } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Use mock stats to match the layout since we don't have the API here immediately.
  const total = 1284;
  const pending = 312;
  const passed = 487;
  const failed = 485;

  return (
    <div className="flex-1 p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 max-w-[1440px] mx-auto">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">Tổng quan tuyển dụng</h2>
      </div>

      <div className="max-w-[1440px] mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-[14px] font-medium">Tổng số ứng viên</span>
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-bold text-slate-900">{total.toLocaleString('vi-VN')}</div>
              <div className="flex items-center text-emerald-500 text-xs font-semibold mt-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18% so với tháng trước
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-[14px] font-medium">Đang xử lý</span>
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-bold text-slate-900">{pending.toLocaleString('vi-VN')}</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${(pending/total)*100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-[14px] font-medium">Đạt</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-bold text-slate-900">{passed.toLocaleString('vi-VN')}</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(passed/total)*100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-[14px] font-medium">Không đạt</span>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-bold text-slate-900">{failed.toLocaleString('vi-VN')}</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(failed/total)*100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Chart & AI Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Xu hướng tuyển dụng</h3>
                <p className="text-slate-500 text-sm mt-1">Số lượng ứng tuyển 6 tháng gần nhất</p>
              </div>
              <div className="flex items-center text-emerald-500 text-sm font-semibold">
                <TrendingUp className="w-4 h-4 mr-1" />
                +18%
              </div>
            </div>
            
            {/* Mock Line Chart based on image */}
            <div className="h-48 relative w-full mt-4 flex items-end justify-between px-4 pb-6">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <polyline points="0,150 100,130 250,140 400,100 550,90 700,70" fill="none" stroke="var(--color-primary-500)" strokeWidth="2" />
              </svg>
              {[
                { label: 'T2', value: 142 },
                { label: 'T3', value: 198 },
                { label: 'T4', value: 176 },
                { label: 'T5', value: 240 },
                { label: 'T6', value: 289 },
                { label: 'T7', value: 339, active: true },
              ].map((pt, i) => (
                <div key={i} className="flex flex-col items-center z-10">
                  <div className={`w-3 h-3 rounded-full border-2 border-white mb-2 ${pt.active ? 'bg-primary-500 ring-4 ring-primary-100' : 'bg-primary-300'}`} style={{ transform: `translateY(${i%2===0 ? '0px' : '-20px'})` }}></div>
                  <span className={`text-xs font-semibold ${pt.active ? 'text-primary-500' : 'text-slate-400'}`}>{pt.label}</span>
                  <span className={`text-sm font-bold mt-1 ${pt.active ? 'text-primary-500' : 'text-slate-900'}`}>{pt.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Hoạt động AI Agent</h3>
            <p className="text-slate-500 text-sm mt-1 mb-6">Hiệu suất các agent</p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <FileEdit className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">JD Writer</div>
                      <div className="text-xs text-slate-500">128 tác vụ</div>
                    </div>
                  </div>
                  <span className="text-emerald-500 font-bold text-sm">94%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <CalendarCheck className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Interview Scheduler</div>
                      <div className="text-xs text-slate-500">96 tác vụ</div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <ClipboardCheck className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">CV Scoring</div>
                      <div className="text-xs text-slate-500">312 tác vụ</div>
                    </div>
                  </div>
                  <span className="text-emerald-500 font-bold text-sm">91%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Top Jobs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Tin tuyển dụng nổi bật</h3>
            <Link to="/dashboard/jobs" className="text-primary-500 text-sm font-semibold flex items-center hover:underline">
              Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Senior AI Engineer', loc: 'TP. HCM (Hybrid)', apps: 86, status: 'Đang mở', statusColor: 'emerald' },
              { title: 'Product Designer', loc: 'TP. HCM', apps: 64, status: 'Đang mở', statusColor: 'emerald' },
              { title: 'Backend Developer (Java)', loc: 'Hà Nội', apps: 112, status: 'Đang mở', statusColor: 'emerald' },
              { title: 'Data Analyst', loc: 'TP. HCM', apps: 45, status: 'Đang mở', statusColor: 'emerald' },
            ].map((job, idx) => (
              <div key={idx} className="border border-slate-100 rounded-xl p-4 flex flex-col hover:border-primary-200 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{job.title}</h4>
                      <p className="text-slate-500 text-sm">{job.loc}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-md bg-${job.statusColor}-50 text-${job.statusColor}-600 text-xs font-bold flex items-center gap-1`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-${job.statusColor}-500`}></div>
                    {job.status}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mt-2">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {job.apps} ứng viên</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Đang mở</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

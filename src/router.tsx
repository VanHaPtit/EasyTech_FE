import React from 'react';
import { createBrowserRouter, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Jobs } from './components/Jobs';
import { Kanban } from './components/Kanban';
import { CandidatesList } from './components/CandidatesList';
import { Settings } from './components/Settings';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { JobCreateWizard } from './pages/hr/JobCreateWizard';
import { JobDetail } from './pages/hr/JobDetail';
import { RoundsConfig } from './pages/hr/RoundsConfig';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminCompanies } from './pages/admin/AdminCompanies';
import { AdminJobCategories } from './pages/admin/AdminJobCategories';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs';
import { AdminUsers } from './pages/admin/AdminUsers';
import { NotificationsPage } from './pages/hr/NotificationsPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { CareerLayout } from './layouts/CareerLayout';
import { CareerHome } from './pages/career/CareerHome';
import { CompanyCareerSitePage } from './pages/career/CompanyCareerSitePage';
import { CareerJobDetail } from './pages/career/CareerJobDetail';
import { CareerApplyForm } from './pages/career/CareerApplyForm';
import { CandidateStatusPage } from './pages/career/CandidateStatusPage';
import { CandidateTrackPage } from './pages/career/CandidateTrackPage';
import { InterviewResponsePage } from './pages/career/InterviewResponsePage';

// ─── HR Dashboard Shell ───────────────────────────────────
const HRDashboardShell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let currentTab = 'dashboard';
  if (location.pathname.startsWith('/dashboard/jobs')) {
    currentTab = 'jobs';
  } else if (location.pathname.startsWith('/dashboard/applications/kanban')) {
    currentTab = 'kanban';
  } else if (location.pathname.startsWith('/dashboard/applications/list')) {
    currentTab = 'list';
  } else if (location.pathname.startsWith('/dashboard/career-site')) {
    currentTab = 'career-site';
  } else if (location.pathname.startsWith('/dashboard/settings')) {
    currentTab = 'settings';
  }

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'dashboard': navigate('/dashboard'); break;
      case 'jobs': navigate('/dashboard/jobs'); break;
      case 'kanban': navigate('/dashboard/applications/kanban'); break;
      case 'list': navigate('/dashboard/applications/list'); break;
      case 'career-site': navigate('/dashboard/career-site'); break;
      case 'settings': navigate('/dashboard/settings'); break;
      default: navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hidden lg:block">
        <Sidebar currentTab={currentTab} onTabChange={handleTabChange} />
      </div>

      <div className="flex min-h-screen flex-col lg:pl-64">
        <Topbar />
        <main className="flex-1 overflow-x-hidden p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ─── Router Config ────────────────────────────────────────
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },

  // ── HR Dashboard ──
  {
    path: '/dashboard',
    element: <HRDashboardShell />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'jobs/create', element: <JobCreateWizard /> },
      { path: 'jobs/:id', element: <JobDetail /> },
      { path: 'jobs/:id/rounds', element: <RoundsConfig /> },
      { path: 'applications/kanban', element: <Kanban /> },
      { path: 'applications/list', element: <CandidatesList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'notifications', element: <NotificationsPage /> },
    ],
  },

  // ── Admin ──
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <AdminOverview /> },
      { path: 'companies', element: <AdminCompanies /> },
      { path: 'categories', element: <AdminJobCategories /> },
      { path: 'logs', element: <AdminAuditLogs /> },
      { path: 'users', element: <AdminUsers /> },
    ],
  },

  // ── Career Site (Candidate) ──
  {
    path: '/careers',
    element: <CareerLayout />,
    children: [
      { path: '', element: <CareerHome /> },
      { path: 'applications/track', element: <CandidateTrackPage /> },
      { path: 'applications/status', element: <CandidateStatusPage /> },
      { path: 'interviews/respond', element: <InterviewResponsePage /> },
      { path: 'jobs/:slug', element: <CareerJobDetail /> },
      { path: 'jobs/:slug/apply', element: <CareerApplyForm /> },
    ],
  },

  {
    path: '/company/:companySlug',
    element: <CompanyCareerSitePage />,
  },

  // ── Catch-all ──
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

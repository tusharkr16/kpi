import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuthStore } from "@/store/auth-store";
import Login from "@/app/auth/pages/Login";
import AppLayout from "@/layout/AppLayout";

const DashboardOverview = lazy(() => import("@/app/dashboard/pages/DashboardOverview"));
const VCDashboard       = lazy(() => import("@/app/vc/VCDashboard"));
const ACSDashboard      = lazy(() => import("@/app/acs/ACSDashboard"));
const KpiList = lazy(() => import("@/app/kpi/pages/KpiList"));
const KpiDetail = lazy(() => import("@/app/kpi/pages/KpiDetail"));
const KpiSelectPage = lazy(() => import("@/app/kpi-engine/pages/KpiSelectPage"));
const KpiSubmitPage = lazy(() => import("@/app/kpi-engine/pages/KpiSubmitPage"));
const QueriesPage = lazy(() => import("@/app/queries/pages/QueriesPage"));
const DocumentsPage = lazy(() => import("@/app/documents/pages/DocumentsPage"));
const AnalyticsPage = lazy(() => import("@/app/analytics/pages/AnalyticsPage"));
const DeadlinesPage = lazy(() => import("@/app/deadlines/pages/DeadlinesPage"));
const SettingsPage = lazy(() => import("@/app/settings/pages/SettingsPage"));

const Loader = () => (
  <div className="flex-1 flex items-center justify-center min-h-screen">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppRoutes = () => {
  const { user } = useAuthStore();
  const isVC  = user?.role?.type === "vc";
  const isACS = user?.role?.type === "acs";

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={isVC ? <VCDashboard /> : isACS ? <ACSDashboard /> : <DashboardOverview />} />
          <Route path="kpis" element={<KpiList />} />
          <Route path="kpis/new" element={<KpiSelectPage />} />
          <Route path="kpis/submit/:code" element={<KpiSubmitPage />} />
          <Route path="kpis/:id" element={<KpiDetail />} />
          <Route path="queries" element={<QueriesPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="deadlines" element={<DeadlinesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

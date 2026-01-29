import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CitizenLayout } from './components/layout/CitizenLayout';
import { EnterpriseLayout } from './components/layout/EnterpriseLayout';
import { CollectorLayout } from './components/layout/CollectorLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { OTPVerificationPage } from './pages/auth/OTPVerificationPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { CitizenDashboardPage } from './pages/citizen/CitizenDashboardPage';
import { CreateWasteReportPage } from './pages/citizen/CreateWasteReportPage';
import { WasteReportsListPage } from './pages/citizen/WasteReportsListPage';
import { WasteReportDetailPage } from './pages/citizen/WasteReportDetailPage';
import { RewardsPage } from './pages/citizen/RewardsPage';
import { FeedbackPage } from './pages/citizen/FeedbackPage';
import { EnterpriseLoginPage } from './pages/enterprise/EnterpriseLoginPage';
import { EnterpriseForgotPasswordPage } from './pages/enterprise/EnterpriseForgotPasswordPage';
import { EnterpriseResetPasswordPage } from './pages/enterprise/EnterpriseResetPasswordPage';
import { EnterpriseDashboardPage } from './pages/enterprise/EnterpriseDashboardPage';
import { WasteRequestsPage } from './pages/enterprise/WasteRequestsPage';
import { TaskAssignmentPage } from './pages/enterprise/TaskAssignmentPage';
import { RealTimeTrackingPage } from './pages/enterprise/RealTimeTrackingPage';
import { AnalyticsReportsPage } from './pages/enterprise/AnalyticsReportsPage';
import { RewardRulesConfigPage } from './pages/enterprise/RewardRulesConfigPage';
import { CollectorLoginPage } from './pages/collector/CollectorLoginPage';
import { CollectorForgotPasswordPage } from './pages/collector/CollectorForgotPasswordPage';
import { CollectorResetPasswordPage } from './pages/collector/CollectorResetPasswordPage';
import { CollectorDashboardPage } from './pages/collector/CollectorDashboardPage';
import { AssignedTasksPage } from './pages/collector/AssignedTasksPage';
import { TaskDetailPage } from './pages/collector/TaskDetailPage';
import { WorkHistoryPage } from './pages/collector/WorkHistoryPage';
import { CollectorProfilePage } from './pages/collector/CollectorProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes (no layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Citizen Authenticated Routes (with CitizenLayout) */}
        <Route path="/" element={<CitizenLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<CitizenDashboardPage />} />
          <Route path="reports" element={<WasteReportsListPage />} />
          <Route path="reports/create" element={<CreateWasteReportPage />} />
          <Route path="reports/:id" element={<WasteReportDetailPage />} />
          <Route path="rewards" element={<RewardsPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route>

        {/* Enterprise Authentication Routes (no layout) */}
        <Route path="/enterprise/login" element={<EnterpriseLoginPage />} />
        <Route
          path="/enterprise/forgot-password"
          element={<EnterpriseForgotPasswordPage />}
        />
        <Route
          path="/enterprise/reset-password"
          element={<EnterpriseResetPasswordPage />}
        />

        {/* Enterprise Authenticated Routes (with EnterpriseLayout) */}
        <Route path="/enterprise" element={<EnterpriseLayout />}>
          <Route index element={<Navigate to="/enterprise/dashboard" replace />} />
          <Route path="dashboard" element={<EnterpriseDashboardPage />} />
          <Route path="waste-requests" element={<WasteRequestsPage />} />
          <Route path="task-assignment" element={<TaskAssignmentPage />} />
          <Route path="tracking" element={<RealTimeTrackingPage />} />
          <Route path="analytics" element={<AnalyticsReportsPage />} />
          <Route path="reward-rules" element={<RewardRulesConfigPage />} />
        </Route>

        {/* Collector Authentication Routes (no layout) */}
        <Route path="/collector/login" element={<CollectorLoginPage />} />
        <Route
          path="/collector/forgot-password"
          element={<CollectorForgotPasswordPage />}
        />
        <Route
          path="/collector/reset-password"
          element={<CollectorResetPasswordPage />}
        />

        {/* Collector Authenticated Routes (with CollectorLayout) */}
        <Route path="/collector" element={<CollectorLayout />}>
          <Route index element={<Navigate to="/collector/dashboard" replace />} />
          <Route path="dashboard" element={<CollectorDashboardPage />} />
          <Route path="tasks" element={<AssignedTasksPage />} />
          <Route path="tasks/:id" element={<TaskDetailPage />} />
          <Route path="history" element={<WorkHistoryPage />} />
          <Route path="profile" element={<CollectorProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

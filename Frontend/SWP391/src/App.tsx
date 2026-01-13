import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CitizenLayout } from './components/layout/CitizenLayout';
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

        {/* Authenticated Routes (with CitizenLayout) */}
        <Route path="/" element={<CitizenLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<CitizenDashboardPage />} />
          <Route path="reports" element={<WasteReportsListPage />} />
          <Route path="reports/create" element={<CreateWasteReportPage />} />
          <Route path="reports/:id" element={<WasteReportDetailPage />} />
          <Route path="rewards" element={<RewardsPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

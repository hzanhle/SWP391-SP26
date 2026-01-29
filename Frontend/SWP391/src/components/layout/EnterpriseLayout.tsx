import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

// Reuse simple SVG icon style to stay consistent with CitizenLayout
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 13h6V5H3v8zm12 6h6v-8h-6v8zM3 21h6v-4H3v4zm12-10h6V5h-6v6z"
    />
  </svg>
);

const RequestsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 8h10M7 12h6m-8 8h10a2 2 0 002-2V6a2 2 0 00-2-2H9l-4 4v10a2 2 0 002 2z"
    />
  </svg>
);

const TasksIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7 7h10M7 17h6"
    />
  </svg>
);

const TrackingIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
    />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 19h16M6 17V9m6 8V5m6 12v-7"
    />
  </svg>
);

const RewardsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 5h14l-1.5 9H6.5L5 5zm4 9v4l3-2 3 2v-4"
    />
  </svg>
);

const enterpriseUser = {
  name: 'GreenCycle Ops',
  email: 'operations@greencycle.example',
  avatar: undefined,
};

const enterpriseSidebarItems = [
  { path: '/enterprise/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/enterprise/waste-requests', label: 'Waste Requests', icon: <RequestsIcon /> },
  { path: '/enterprise/task-assignment', label: 'Task Assignment', icon: <TasksIcon /> },
  { path: '/enterprise/tracking', label: 'Tracking', icon: <TrackingIcon /> },
  { path: '/enterprise/analytics', label: 'Reports & Analytics', icon: <AnalyticsIcon /> },
  { path: '/enterprise/reward-rules', label: 'Reward Rules', icon: <RewardsIcon /> },
];

export const EnterpriseLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar items={enterpriseSidebarItems} />
      <div className="ml-64">
        <Header user={enterpriseUser} />
        <main className="pt-16 p-6">
          {/* Page transition matches CitizenLayout for consistency */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};


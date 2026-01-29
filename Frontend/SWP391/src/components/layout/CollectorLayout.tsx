import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

// Icons follow the same thin-stroke SVG style used across roles.
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z" />
  </svg>
);

const TasksIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 7h10M7 17h6" />
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const collectorUser = {
  name: 'Collector One',
  email: 'collector@platform.example',
  avatar: undefined,
};

const collectorSidebarItems = [
  { path: '/collector/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/collector/tasks', label: 'Assigned Tasks', icon: <TasksIcon /> },
  { path: '/collector/history', label: 'Work History', icon: <HistoryIcon /> },
  { path: '/collector/profile', label: 'Profile', icon: <ProfileIcon /> },
];

export const CollectorLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar items={collectorSidebarItems} />
      <div className="ml-64">
        <Header user={collectorUser} />
        <main className="pt-16 p-6">
          {/* Route transitions match Citizen/Enterprise: subtle fade + slight slide */}
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


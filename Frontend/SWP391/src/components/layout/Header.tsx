import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  user: User;
}

const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    // Citizen routes
    '/dashboard': 'Dashboard',
    '/reports/create': 'Create Report',
    '/reports': 'My Reports',
    '/rewards': 'Rewards',
    '/feedback': 'Feedback',
    // Enterprise routes
    '/enterprise/dashboard': 'Enterprise Dashboard',
    '/enterprise/waste-requests': 'Waste Requests',
    '/enterprise/task-assignment': 'Task Assignment',
    '/enterprise/tracking': 'Real-time Tracking',
    '/enterprise/analytics': 'Reports & Analytics',
    '/enterprise/reward-rules': 'Reward Rules',
    // Collector routes
    '/collector/dashboard': 'Collector Dashboard',
    '/collector/tasks': 'Assigned Tasks',
    '/collector/history': 'Work History',
    '/collector/profile': 'Profile',
  };

  // Citizen detail pages
  if (pathname.match(/^\/reports\/[^/]+$/)) {
    return 'Report Details';
  }

  // Collector task detail page
  if (pathname.match(/^\/collector\/tasks\/[^/]+$/)) {
    return 'Task Detail';
  }

  return routes[pathname] || 'Dashboard';
};

export const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-64 right-0 z-10 flex items-center justify-between px-6">
      {/* Left side - can add breadcrumbs or title */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{getPageTitle(location.pathname)}</h2>
      </div>

      {/* Right side - User menu */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <motion.svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};


import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, ReactNode } from 'react';
import Logo from '../../assets/Logo.png';

interface SidebarItem {
  path: string;
  label: string;
  icon: ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
}

export const Sidebar = ({ items }: SidebarProps) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = items.findIndex((item) => location.pathname.startsWith(item.path));
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname, items]);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <img
            src={Logo}
            alt="EcoCollect logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-xl text-gray-900">EcoCollect</span>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="relative">
          {/* Active indicator */}
          <motion.div
            className="absolute left-0 top-0 w-1 h-12 bg-primary-600 rounded-r-full"
            initial={false}
            animate={{
              y: activeIndex * 48,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          />

          <div className="space-y-1">
            {items.map((item, index) => {
              const isActive = location.pathname.startsWith(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium relative transition-colors ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <motion.div
                    animate={{
                      color: isActive ? '#16a34a' : '#374151',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>© 2024 EcoCollect</p>
          <p className="mt-1">Citizen Platform</p>
        </div>
      </div>
    </div>
  );
};


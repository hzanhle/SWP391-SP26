import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { LeafletMap } from '../../components/maps/LeafletMap';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    // Keep transition minimal; layout already handles route easing
    transition: { duration: 0.3 },
  },
};

const mockKpis = [
  { label: 'Incoming Requests', value: 32, color: 'bg-blue-500' },
  { label: 'Active Tasks', value: 14, color: 'bg-amber-500' },
  { label: 'Completed Collections (Today)', value: 21, color: 'bg-green-500' },
  { label: 'Service Level (7d)', value: '96%', color: 'bg-purple-500' },
];

const mockActivity = [
  {
    id: 'AR-1023',
    description: 'Request AR-1023 assigned to Team Alpha',
    time: '5 min ago',
  },
  {
    id: 'AR-1018',
    description: 'Collection completed in Central District',
    time: '24 min ago',
  },
  {
    id: 'AR-1012',
    description: 'High-priority hazardous waste accepted',
    time: '1 hr ago',
  },
];

// Enterprise dashboard reuses the same structure and motion as the citizen dashboard
export const EnterpriseDashboardPage = () => {
  const center = { lat: 10.8231, lng: 106.6297 };
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Enterprise Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Monitor incoming requests, active tasks, and collection performance.
        </p>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {mockKpis.map((kpi) => (
          <motion.div key={kpi.label} variants={itemVariants}>
            <Card hoverable className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                </div>
                <div
                  className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19V6m4 8V5m-8 9v-4"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Map of service areas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Service Areas & Active Collections
          </h2>
          <LeafletMap
            center={center}
            markers={[
              {
                id: 'zone-1',
                title: 'Active collection: Route 21',
                description: 'Team Alpha • ETA 18 min',
                lat: 10.8298,
                lng: 106.6356,
              },
              {
                id: 'zone-2',
                title: 'Active collection: Route 17',
                description: 'Completed',
                lat: 10.8168,
                lng: 106.6432,
              },
            ]}
          />
        </Card>
      </motion.div>

      {/* Recent activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {mockActivity.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-default transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
                <span className="text-xs font-mono text-gray-500">{item.id}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};


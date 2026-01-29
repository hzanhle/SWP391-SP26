import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LeafletMap } from '../../components/maps/LeafletMap';
import type { CollectorTaskStatus } from '../../types/collector';
import { collectorStatusLabel, collectorStatusToBadge } from '../../types/collector';

interface CollectorTask {
  id: string;
  wasteType: string;
  location: string;
  status: CollectorTaskStatus;
  scheduled: string;
}

const mockStats = {
  assigned: 6,
  inProgress: 2,
  completedToday: 4,
};

const mockTodayTasks: CollectorTask[] = [
  { id: 'TK-2301', wasteType: 'Mixed recyclables', location: 'Central Hub', status: 'on-the-way', scheduled: '09:30' },
  { id: 'TK-2302', wasteType: 'Organic waste', location: 'Market District', status: 'assigned', scheduled: '10:15' },
  { id: 'TK-2298', wasteType: 'Construction debris', location: 'Industrial Way', status: 'collected', scheduled: '08:10' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const CollectorDashboardPage = () => {
  const navigate = useNavigate();
  const center = { lat: 10.8231, lng: 106.6297 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Today&apos;s assignments and active routes.</p>
      </div>

      {/* Summary cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[
          { label: 'Assigned Tasks', value: mockStats.assigned, color: 'bg-blue-500' },
          { label: 'In Progress', value: mockStats.inProgress, color: 'bg-amber-500' },
          { label: 'Completed Today', value: mockStats.completedToday, color: 'bg-green-500' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card hoverable className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Map */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.3 }}>
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Task Locations</h2>
          <LeafletMap
            center={center}
            markers={[
              {
                id: 't1',
                title: 'TK-2301',
                description: 'On the way • Central Hub',
                lat: 10.8298,
                lng: 106.6356,
              },
              {
                id: 't2',
                title: 'TK-2302',
                description: 'Assigned • Market District',
                lat: 10.8168,
                lng: 106.6432,
              },
            ]}
          />
        </Card>
      </motion.div>

      {/* Today's tasks */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.3 }}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Tasks</h2>
            <button
              onClick={() => navigate('/collector/tasks')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {mockTodayTasks.map((task) => (
              <motion.div
                key={task.id}
                onClick={() => navigate(`/collector/tasks/${task.id}`)}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-mono text-gray-700">{task.id}</p>
                    <Badge
                      status={collectorStatusToBadge(task.status)}
                      label={collectorStatusLabel[task.status]}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-1">{task.wasteType}</p>
                  <p className="text-xs text-gray-500 mt-1">{task.location} • {task.scheduled}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};


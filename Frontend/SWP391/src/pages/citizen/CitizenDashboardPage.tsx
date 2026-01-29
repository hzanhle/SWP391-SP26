import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { WasteReport } from '../../types';
import { LeafletMap } from '../../components/maps/LeafletMap';

// Mock data
const mockStats = {
  totalReports: 12,
  completedReports: 8,
  pendingReports: 3,
  totalPoints: 450,
};

const mockRecentReports: WasteReport[] = [
  {
    id: '1',
    title: 'Illegal Dumping on Main Street',
    description: 'Large pile of construction waste',
    location: { address: '123 Main St', lat: 0, lng: 0 },
    status: 'completed',
    category: 'Construction Waste',
    images: [],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-11T15:00:00Z',
    reportedBy: 'user1',
  },
  {
    id: '2',
    title: 'Plastic Bottles in Park',
    description: 'Multiple plastic bottles scattered',
    location: { address: 'Central Park', lat: 0, lng: 0 },
    status: 'in-progress',
    category: 'Plastic',
    images: [],
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
    reportedBy: 'user1',
  },
  {
    id: '3',
    title: 'Abandoned Furniture',
    description: 'Old sofa left on sidewalk',
    location: { address: '456 Oak Ave', lat: 0, lng: 0 },
    status: 'pending',
    category: 'Furniture',
    images: [],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    reportedBy: 'user1',
  },
];

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
    // Keep transition minimal; page already eases in at layout level
    transition: { duration: 0.3 },
  },
};

export const CitizenDashboardPage = () => {
  const navigate = useNavigate();
  const cityCenter = { lat: 10.8231, lng: 106.6297 }; // HCMC as default demo center

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: 'Total Reports', value: mockStats.totalReports, color: 'bg-blue-500' },
          { label: 'Completed', value: mockStats.completedReports, color: 'bg-green-500' },
          { label: 'Pending', value: mockStats.pendingReports, color: 'bg-yellow-500' },
          { label: 'Total Points', value: mockStats.totalPoints, color: 'bg-purple-500' },
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Map Container - placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Locations</h2>
          <LeafletMap
            center={cityCenter}
            markers={[
              {
                id: 'r-1',
                title: 'Report: Main St',
                description: 'Construction waste',
                lat: 10.8231,
                lng: 106.6297,
              },
              {
                id: 'r-2',
                title: 'Report: Central Park',
                description: 'Plastic',
                lat: 10.8298,
                lng: 106.6356,
              },
            ]}
          />
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
            <button
              onClick={() => navigate('/reports')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockRecentReports.map((report) => (
              <motion.div
                key={report.id}
                onClick={() => navigate(`/reports/${report.id}`)}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <Badge status={report.status} />
                  </div>
                  <p className="text-sm text-gray-600">{report.location.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
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


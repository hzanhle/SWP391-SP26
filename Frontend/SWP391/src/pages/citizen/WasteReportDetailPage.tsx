import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { StatusTimelineItem } from '../../types';

// Mock data
const mockReport = {
  id: '1',
  title: 'Illegal Dumping on Main Street',
  description: 'Large pile of construction waste including broken concrete, metal pipes, and wood debris. The waste has been here for over a week and is blocking the sidewalk.',
  location: { address: '123 Main Street, Downtown District', lat: 0, lng: 0 },
  status: 'completed' as const,
  category: 'Construction Waste',
  images: [],
  createdAt: '2024-01-10T10:00:00Z',
  updatedAt: '2024-01-11T15:00:00Z',
  reportedBy: 'user1',
};

const mockTimeline: StatusTimelineItem[] = [
  {
    status: 'pending',
    date: '2024-01-10T10:00:00Z',
    description: 'Report submitted',
  },
  {
    status: 'in-progress',
    date: '2024-01-11T08:00:00Z',
    description: 'Report assigned to collection team',
  },
  {
    status: 'completed',
    date: '2024-01-11T15:00:00Z',
    description: 'Waste collected and area cleaned',
  },
];

export const WasteReportDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => navigate('/reports')}
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Reports
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{mockReport.title}</h1>
            <Badge status={mockReport.status} />
          </div>
          <p className="text-gray-600 mt-2">Report ID: {id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{mockReport.description}</p>
          </Card>

          {/* Images */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-sm">No images available</p>
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            <p className="text-gray-700 mb-4">{mockReport.location.address}</p>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map would go here</p>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{mockReport.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reported</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {new Date(mockReport.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {new Date(mockReport.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Status Timeline */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h2>
            <div className="space-y-4">
              {mockTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-6 pb-4 last:pb-0"
                >
                  {index < mockTimeline.length - 1 && (
                    <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200" />
                  )}
                  <div className="absolute left-0 top-1 w-4 h-4 bg-primary-600 rounded-full border-2 border-white" />
                  <div>
                    <Badge status={item.status} className="mb-2" />
                    <p className="text-sm font-medium text-gray-900">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};


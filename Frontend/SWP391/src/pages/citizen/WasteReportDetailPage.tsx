import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LeafletMap } from '../../components/maps/LeafletMap';
import { usePlatform } from '../../mock/usePlatform';

const toBadgeStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'accepted':
    case 'assigned':
      return 'in-progress';
    case 'collected':
      return 'completed';
    case 'rejected':
      return 'rejected';
    default:
      return 'pending';
  }
};

export const WasteReportDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = usePlatform();

  const report = state.reports.find((r) => r.id === id) ?? state.reports[0];
  if (!report) return null;

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
            <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
            <Badge status={toBadgeStatus(report.status)} label={report.status} />
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
            <p className="text-gray-700 leading-relaxed">{report.description}</p>
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
            <p className="text-gray-700 mb-4">{report.location.address}</p>
            <LeafletMap
              center={{ lat: report.location.lat, lng: report.location.lng }}
              markers={[
                {
                  id: 'report',
                  title: 'Reported location',
                  description: report.location.address,
                  lat: report.location.lat,
                  lng: report.location.lng,
                },
              ]}
            />
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
                <p className="text-sm font-medium text-gray-900 mt-1">{report.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reported</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {new Date(report.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Status Timeline */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h2>
            <div className="space-y-4">
              {[
                { status: 'pending', label: 'Report submitted' },
                ...(report.status !== 'pending' ? [{ status: 'accepted', label: 'Accepted by enterprise' }] : []),
                ...(report.status === 'assigned' || report.status === 'collected'
                  ? [{ status: 'assigned', label: 'Assigned to collector' }]
                  : []),
                ...(report.status === 'collected' ? [{ status: 'collected', label: 'Collected' }] : []),
                ...(report.status === 'rejected' ? [{ status: 'rejected', label: 'Rejected' }] : []),
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-6 pb-4 last:pb-0"
                >
                  {index < 4 && (
                    <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200" />
                  )}
                  <div className="absolute left-0 top-1 w-4 h-4 bg-primary-600 rounded-full border-2 border-white" />
                  <div>
                    <Badge status={toBadgeStatus(item.status)} label={item.status} className="mb-2" />
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(report.updatedAt).toLocaleDateString()}</p>
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


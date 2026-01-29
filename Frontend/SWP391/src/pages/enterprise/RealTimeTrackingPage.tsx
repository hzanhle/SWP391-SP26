import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LeafletMap } from '../../components/maps/LeafletMap';

interface TrackingItem {
  id: string;
  route: string;
  status: 'pending' | 'in-progress' | 'completed';
  eta: string;
}

const mockTracking: TrackingItem[] = [
  {
    id: 'ROUTE-21',
    route: 'North District Loop',
    status: 'in-progress',
    eta: '18 min',
  },
  {
    id: 'ROUTE-19',
    route: 'Harbor & Industrial Zone',
    status: 'pending',
    eta: 'Scheduled 11:30',
  },
  {
    id: 'ROUTE-17',
    route: 'Central Markets',
    status: 'completed',
    eta: 'Completed 09:15',
  },
];

// Real-time tracking screen: map + status list, matching layout language
export const RealTimeTrackingPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Real-time Tracking</h1>
          <p className="text-gray-600 mt-1">
            Monitor active collection routes and their status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map column */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Active Collection Map
          </h2>
          <LeafletMap
            center={{ lat: 10.8231, lng: 106.6297 }}
            zoom={12}
            markers={[
              {
                id: 'm1',
                title: 'ROUTE-21',
                description: 'On the way',
                lat: 10.8298,
                lng: 106.6356,
              },
              {
                id: 'm2',
                title: 'ROUTE-19',
                description: 'Assigned',
                lat: 10.8115,
                lng: 106.6202,
              },
              {
                id: 'm3',
                title: 'ROUTE-17',
                description: 'Collected',
                lat: 10.8168,
                lng: 106.6432,
              },
            ]}
            className="h-80"
          />
        </Card>

        {/* Status list column */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Route Status
          </h2>
          <div className="space-y-3">
            {mockTracking.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className="p-3 border border-gray-200 rounded-lg flex items-start justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.route}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.eta}</p>
                </div>
                <Badge status={item.status} />
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};


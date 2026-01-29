import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { usePlatform } from '../../mock/usePlatform';

const getPriorityBadgeClass = (priority: 'Low' | 'Medium' | 'High') => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800';
    case 'Medium':
      return 'bg-amber-100 text-amber-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
  }
};

// Enterprise waste requests page reuses the same table patterns as citizen list
export const WasteRequestsPage = () => {
  const { state, actions } = usePlatform();

  const requests = state.reports.filter((r) => r.status === 'pending');
  const mapStatusToBadgeStatus = (status: string) => {
    // For this page we only show pending requests, but keep safe mapping.
    if (status === 'rejected') return 'rejected';
    if (status === 'collected') return 'completed';
    if (status === 'accepted' || status === 'assigned') return 'in-progress';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Waste Requests</h1>
          <p className="text-gray-600 mt-1">
            Review and triage incoming citizen reports.
          </p>
        </div>
      </div>

      {/* Requests Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waste Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((req, index) => (
                <motion.tr
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {req.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {req.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {req.location.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(
                        'Medium',
                      )}`}
                    >
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={mapStatusToBadgeStatus(req.status)} label={req.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-3 py-1 text-xs"
                      onClick={() => actions.acceptReport(req.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="px-3 py-1 text-xs text-red-600 hover:text-red-700"
                      onClick={() => actions.rejectReport(req.id)}
                    >
                      Reject
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};


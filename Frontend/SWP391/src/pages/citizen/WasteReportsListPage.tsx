import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { usePlatform } from '../../mock/usePlatform';

const reportStatusFilters = ['all', 'pending', 'accepted', 'assigned', 'collected', 'rejected'] as const;

export const WasteReportsListPage = () => {
  const navigate = useNavigate();
  const { state } = usePlatform();
  const [filterStatus, setFilterStatus] = useState<(typeof reportStatusFilters)[number]>('all');

  const myReports = state.reports.filter((r) => r.citizenId === 'user1');
  const filteredReports =
    filterStatus === 'all' ? myReports : myReports.filter((r) => r.status === filterStatus);

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-600 mt-1">View and manage your waste reports</p>
        </div>
        <Button onClick={() => navigate('/reports/create')}>
          Create New Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-2">
          {reportStatusFilters.map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Reports Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/reports/${report.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {report.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.location.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={toBadgeStatus(report.status)} label={report.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/reports/${report.id}`);
                      }}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </button>
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


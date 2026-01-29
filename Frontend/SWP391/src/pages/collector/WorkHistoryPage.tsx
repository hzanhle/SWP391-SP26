import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

type TaskStatus = 'completed' | 'rejected' | 'pending' | 'in-progress';

interface HistoryItem {
  id: string;
  wasteType: string;
  location: string;
  status: TaskStatus;
  date: string;
}

const mockHistory: HistoryItem[] = [
  { id: 'TK-2298', wasteType: 'Construction debris', location: 'Industrial Way', status: 'completed', date: '2026-01-10' },
  { id: 'TK-2295', wasteType: 'Organic waste', location: 'Market District', status: 'completed', date: '2026-01-09' },
  { id: 'TK-2291', wasteType: 'Plastic bottles', location: 'Riverside Park', status: 'completed', date: '2026-01-08' },
];

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-40" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-56" /></td>
    <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded w-20" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24" /></td>
  </tr>
);

export const WorkHistoryPage = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');
  const [isLoading] = useState(false);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return mockHistory;
    return mockHistory.filter((h) => h.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Work History</h1>
        <p className="text-gray-600 mt-1">Review your completed tasks.</p>
      </div>

      <Card className="p-4">
        <div className="flex gap-2 items-center">
          {(['all', 'completed'] as const).map((s) => (
            <motion.button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === s ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {s === 'all' ? 'All' : 'Completed'}
            </motion.button>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : (
                filtered.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.wasteType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><Badge status={row.status === 'completed' ? 'completed' : 'pending'} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};


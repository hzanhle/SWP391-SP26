import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { usePlatform } from '../../mock/usePlatform';

// Task assignment uses subtle feedback when assigning collectors
export const TaskAssignmentPage = () => {
  const { state, actions } = usePlatform();
  const [selectedCollector, setSelectedCollector] = useState<string>('');

  const handleAssign = (id: string) => {
    if (!selectedCollector) return;
    actions.assignCollector(id, selectedCollector);
  };

  const collectors = state.collectors;
  const assignments = state.reports.filter((r) => r.status === 'accepted');
  const getCollectorById = (id?: string) => collectors.find((c) => c.id === id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Assignment</h1>
          <p className="text-gray-600 mt-1">
            Assign accepted requests to collection teams.
          </p>
        </div>
      </div>

      {/* Collector selection */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Assign to:</span>
          <select
            value={selectedCollector}
            onChange={(e) => setSelectedCollector(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select collector team</option>
            {collectors.map((collector) => (
              <option key={collector.id} value={collector.id}>
                {collector.name} ({collector.availability})
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Assignment table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waste Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map((req, index) => {
                const collector = getCollectorById(req.assignedCollectorId);
                return (
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
                      <Badge status="in-progress" label="accepted" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {collector ? (
                        <div className="flex items-center gap-2">
                          <span>{collector.name}</span>
                          <span className="text-xs text-gray-500">
                            ({collector.availability})
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500 italic">
                          Not assigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        type="button"
                        variant="outline"
                        className="px-3 py-1 text-xs"
                        onClick={() => handleAssign(req.id)}
                      >
                        Assign
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};


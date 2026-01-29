import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { CollectorTaskStatus } from '../../types/collector';
import { collectorStatusLabel, collectorStatusToBadge } from '../../types/collector';
import { usePlatform } from '../../mock/usePlatform';

interface AssignedTask {
  id: string;
  wasteType: string;
  location: string;
  status: CollectorTaskStatus;
}

export const AssignedTasksPage = () => {
  const navigate = useNavigate();
  const { state } = usePlatform();

  // Mock "logged-in" collector (single enterprise context)
  const collectorId = 'collector1';

  const tasks: AssignedTask[] = state.reports
    .filter((r) => r.status === 'assigned' && r.assignedCollectorId === collectorId)
    .map((r) => ({
      id: r.id,
      wasteType: r.category,
      location: r.location.address,
      status: r.collectorStatus ?? 'assigned',
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assigned Tasks</h1>
        <p className="text-gray-600 mt-1">View and manage your assigned tasks.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task ID
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task, index) => (
                <motion.tr
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/collector/tasks/${task.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.wasteType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      status={collectorStatusToBadge(task.status)}
                      label={collectorStatusLabel[task.status]}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/collector/tasks/${task.id}`);
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


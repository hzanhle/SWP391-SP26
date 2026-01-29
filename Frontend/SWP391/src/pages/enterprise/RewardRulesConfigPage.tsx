import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface RewardRule {
  id: string;
  name: string;
  description: string;
  points: number;
}

const mockRules: RewardRule[] = [
  {
    id: 'rule-1',
    name: 'Standard Report Completion',
    description: 'Points awarded per successfully collected citizen report.',
    points: 10,
  },
  {
    id: 'rule-2',
    name: 'High Priority Response',
    description: 'Additional points for resolving high-priority requests on time.',
    points: 20,
  },
  {
    id: 'rule-3',
    name: 'Area Coverage Bonus',
    description: 'Bonus points for covering all districts within the week.',
    points: 50,
  },
];

// Reward rules configuration uses hover elevation and micro-feedback on save
export const RewardRulesConfigPage = () => {
  const [rules, setRules] = useState<RewardRule[]>(mockRules);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const handleChangePoints = (id: string, value: number) => {
    setRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, points: value } : rule)),
    );
    setHasSaved(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    setHasSaved(false);

    // Mock save
    setTimeout(() => {
      setIsSaving(false);
      setHasSaved(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reward Rules</h1>
          <p className="text-gray-600 mt-1">
            Configure how points are calculated for collection teams.
          </p>
        </div>
        <Button type="button" onClick={handleSave} isLoading={isSaving}>
          Save Changes
        </Button>
      </div>

      {hasSaved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-lg px-4 py-3 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Reward rules updated successfully.</span>
        </motion.div>
      )}

      {/* Rule cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <Card hoverable className="p-6 h-full flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {rule.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 uppercase mb-1">
                  Points
                </label>
                <input
                  type="number"
                  min={0}
                  value={rule.points}
                  onChange={(e) =>
                    handleChangePoints(rule.id, Number(e.target.value || 0))
                  }
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


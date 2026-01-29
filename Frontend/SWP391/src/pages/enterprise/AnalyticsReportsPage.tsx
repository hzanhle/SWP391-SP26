import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// Placeholder chart skeleton component using Tailwind pulse animation
const ChartSkeleton = () => (
  <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
);

export const AnalyticsReportsPage = () => {
  const [isLoading] = useState(false);

  // Mock analytics data (enterprise single-tenant)
  const wasteByType = [
    { name: 'Organic', kg: 420 },
    { name: 'Recyclable', kg: 310 },
    { name: 'Hazardous', kg: 95 },
    { name: 'Other', kg: 140 },
  ];

  const byArea = [
    { name: 'North', kg: 280 },
    { name: 'Central', kg: 410 },
    { name: 'South', kg: 265 },
  ];

  const overTime = [
    { day: 'Mon', kg: 120 },
    { day: 'Tue', kg: 180 },
    { day: 'Wed', kg: 160 },
    { day: 'Thu', kg: 210 },
    { day: 'Fri', kg: 190 },
    { day: 'Sat', kg: 240 },
    { day: 'Sun', kg: 200 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">
            Analyze collected waste by type, area, and time period.
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 uppercase">
              Time Range
            </label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              defaultValue="7d"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 uppercase">
              Area
            </label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              defaultValue="all"
            >
              <option value="all">All districts</option>
              <option value="north">North</option>
              <option value="central">Central</option>
              <option value="south">South</option>
            </select>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-auto"
          >
            <Button type="button" variant="outline">
              Export Report
            </Button>
          </motion.div>
        </div>
      </Card>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Collected Waste by Type
          </h2>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="h-48 bg-gray-50 rounded-lg border border-gray-200">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteByType} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="kg" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Collections by Area
          </h2>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="h-48 bg-gray-50 rounded-lg border border-gray-200">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byArea} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="kg" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
        <Card className="p-6 flex flex-col gap-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Collections Over Time
          </h2>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="h-64 bg-gray-50 rounded-lg border border-gray-200">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overTime} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="kg"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#16a34a' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};


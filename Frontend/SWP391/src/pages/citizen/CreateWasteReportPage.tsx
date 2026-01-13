import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const CreateWasteReportPage = () => {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock submission
    setTimeout(() => {
      setIsLoading(false);
      navigate('/reports');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Waste Report</h1>
        <p className="text-gray-600 mt-1">Report a waste collection issue in your area</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Brief description of the issue"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Provide more details about the waste issue..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="plastic">Plastic</option>
                <option value="construction">Construction Waste</option>
                <option value="furniture">Furniture</option>
                <option value="hazardous">Hazardous Waste</option>
                <option value="organic">Organic Waste</option>
                <option value="other">Other</option>
              </select>
            </motion.div>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Input
              label="Address"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter the address or location"
            />
          </motion.div>
          <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map picker would go here</p>
          </div>
        </Card>

        {/* Photo Upload */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos</h2>
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            animate={{
              backgroundColor: isDragOver ? '#f0fdf4' : '#ffffff',
              borderColor: isDragOver ? '#22c55e' : '#e5e7eb',
            }}
            transition={{ duration: 0.2 }}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
          >
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-600 mb-2">
              Drag and drop photos here, or{' '}
              <span className="text-primary-600 font-medium">browse</span>
            </p>
            <p className="text-sm text-gray-500">Supports JPG, PNG up to 5MB</p>
          </motion.div>
        </Card>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-end"
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/reports')}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Submit Report
            </Button>
          </motion.div>
        </form>
    </div>
  );
};


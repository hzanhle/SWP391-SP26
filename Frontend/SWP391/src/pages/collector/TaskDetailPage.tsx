import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LeafletMap } from '../../components/maps/LeafletMap';
import type { CollectorTaskStatus } from '../../types/collector';
import { collectorStatusLabel, collectorStatusToBadge } from '../../types/collector';
import { usePlatform } from '../../mock/usePlatform';
import type { WasteCategory } from '../../mock/platformTypes';

const wasteCategoryOptions: { value: WasteCategory; label: string }[] = [
  { value: 'organic', label: 'Organic' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'construction', label: 'Construction' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'hazardous', label: 'Hazardous' },
  { value: 'other', label: 'Other' },
];

export const TaskDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, actions } = usePlatform();
  const report = state.reports.find((r) => r.id === id);
  const [status, setStatus] = useState<CollectorTaskStatus>(report?.collectorStatus ?? 'assigned');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmedCategory, setConfirmedCategory] = useState<WasteCategory>(report?.category ?? 'other');
  const [proofNote, setProofNote] = useState('');

  const task = useMemo(() => {
    if (!report) return null;
    return {
      id: report.id,
      wasteType: report.category,
      location: report.location.address,
      notes: report.description,
      status,
      lat: report.location.lat,
      lng: report.location.lng,
    };
  }, [report, status]);

  const nextAction = useMemo(() => {
    if (status === 'assigned') return { label: 'Start route (On the way)', next: 'on-the-way' as const };
    if (status === 'on-the-way') return { label: 'Mark as collected', next: 'collected' as const };
    return null;
  }, [status]);

  const handleAdvance = () => {
    if (!nextAction) return;
    setStatus(nextAction.next);
    if (id) actions.setCollectorStatus(id, nextAction.next);
    setShowConfirm(true);
    // subtle confirmation micro-feedback
    window.setTimeout(() => setShowConfirm(false), 1200);
  };

  const handleSubmitProof = () => {
    if (!id) return;
    actions.submitProof({
      reportId: id,
      collectorConfirmedCategory: confirmedCategory,
      proofNote,
      proofImages: [],
    });
    setShowConfirm(true);
    window.setTimeout(() => setShowConfirm(false), 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {!task ? (
        <div className="text-sm text-gray-600">Task not found.</div>
      ) : (
        <>
          <div>
        <button
          onClick={() => navigate('/collector/tasks')}
          className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Assigned Tasks
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Task {task.id}</h1>
          <Badge
            status={collectorStatusToBadge(task.status)}
            label={collectorStatusLabel[task.status]}
          />
        </div>
        <p className="text-gray-600 mt-1">{task.wasteType}</p>
          </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-lg px-4 py-3 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Status updated.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{task.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">{task.notes}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
            <LeafletMap
              center={{ lat: task.lat, lng: task.lng }}
              markers={[
                {
                  id: 'dest',
                  title: task.id,
                  description: task.location,
                  lat: task.lat,
                  lng: task.lng,
                },
              ]}
            />
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Proof</h2>
            <div
              className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors"
            >
              <p className="text-gray-600 mb-2">
                Drag and drop an image here, or <span className="text-primary-600 font-medium">browse</span>
              </p>
              <p className="text-sm text-gray-500">Optional: add a note before submitting proof.</p>
              <div className="mt-4">
                <div className="mb-3 text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm waste type
                  </label>
                  <select
                    value={confirmedCategory}
                    onChange={(e) => setConfirmedCategory(e.target.value as WasteCategory)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    {wasteCategoryOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Notes (optional)..."
                  value={proofNote}
                  onChange={(e) => setProofNote(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button type="button" variant="primary" onClick={handleSubmitProof}>
                  Submit Proof
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Actions</h2>
            <div className="space-y-3">
              {nextAction ? (
                <Button type="button" className="w-full" onClick={handleAdvance}>
                  {nextAction.label}
                </Button>
              ) : (
                <div className="text-sm text-gray-600">
                  This task is completed.
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/collector/tasks')}
              >
                Back to List
              </Button>
            </div>
          </Card>
        </div>
      </div>
        </>
      )}
    </div>
  );
};


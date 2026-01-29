export type CollectorTaskStatus = 'assigned' | 'on-the-way' | 'collected';

export const collectorStatusLabel: Record<CollectorTaskStatus, string> = {
  assigned: 'Assigned',
  'on-the-way': 'On the way',
  collected: 'Collected',
};

/**
 * Map collector-specific status to shared Badge style statuses.
 * This preserves the existing design language and colors.
 */
export const collectorStatusToBadge = (
  status: CollectorTaskStatus,
): 'pending' | 'in-progress' | 'completed' => {
  switch (status) {
    case 'assigned':
      return 'pending';
    case 'on-the-way':
      return 'in-progress';
    case 'collected':
      return 'completed';
  }
};


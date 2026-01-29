import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type BadgeStatus = 'pending' | 'in-progress' | 'completed' | 'rejected';

export interface BadgeProps extends HTMLMotionProps<'span'> {
  status: BadgeStatus;
  /**
   * Optional override label.
   * Useful when domain status names differ but we want to reuse the same style tokens.
   */
  label?: string;
}

const statusColors: Record<BadgeStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

// Badge uses a simple scale animation to highlight status transitions
export const Badge = ({ status, className = '', ...props }: BadgeProps) => {
  const { label, ...rest } = props;
  return (
    <motion.span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${statusColors[status]}
        ${className}
      `}
      initial={false}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {label ?? status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </motion.span>
  );
};




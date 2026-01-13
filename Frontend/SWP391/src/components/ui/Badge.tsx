import { motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export const Badge = ({ status, className = '', ...props }: BadgeProps) => {
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
      {...props}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </motion.span>
  );
};


import { motion } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export const Card = ({ 
  children, 
  className = '', 
  hoverable = false,
  ...props 
}: CardProps) => {
  return (
    <motion.div
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        ${hoverable ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={hoverable ? { y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};


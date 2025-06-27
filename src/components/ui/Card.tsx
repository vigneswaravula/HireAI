import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)' } : {}}
      className={`
        bg-white rounded-xl shadow-soft border border-gray-100
        transition-all duration-200
        ${paddingClasses[padding]}
        ${className}
      `.trim()}
    >
      {children}
    </motion.div>
  );
};

export default Card;
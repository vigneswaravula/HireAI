import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helper?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  helper,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <motion.input
          ref={ref}
          whileFocus={{ scale: 1.01 }}
          className={`
            w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}
            ${className}
          `.trim()}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error-600"
        >
          {error}
        </motion.p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
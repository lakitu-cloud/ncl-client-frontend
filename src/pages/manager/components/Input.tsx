// src/components/Input.tsx
import { forwardRef, memo } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
    />
  ))
);

Input.displayName = 'Input';
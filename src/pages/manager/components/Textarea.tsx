// src/components/Textarea.tsx
import { forwardRef, memo } from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', rows = 4, ...props }, ref) => (
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical transition-colors ${className}`}
        {...props}
      />
    )
  )
);

Textarea.displayName = 'Textarea';
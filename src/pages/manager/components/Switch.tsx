// src/components/ui/Switch.tsx
import * as React from 'react';
import { cn } from '../components/utils';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          "relative inline-flex items-center cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "w-12 h-7 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 transition-all",
            "peer-checked:bg-indigo-600",
            "after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all",
            "peer-checked:after:translate-x-5",
            "peer-disabled:cursor-not-allowed"
          )}
        />
      </label>
    );
  }
);

Switch.displayName = 'Switch';
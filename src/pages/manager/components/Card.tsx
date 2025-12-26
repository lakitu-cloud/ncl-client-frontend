// src/components/ui/Card.tsx
import { cn } from '../components/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-md border dark:border-gray-700 border-gray-200 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      {children}
    </div>
  );
};
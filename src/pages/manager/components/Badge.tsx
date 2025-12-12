
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { cn } from "../components/utils"

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-indigo-100 text-indigo-800",
        success: "bg-green-100 text-green-800",
        destructive: "bg-red-100 text-red-800",
        secondary: "bg-gray-100 text-gray-700",
        outline: "border border-gray-300 bg-transparent text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};
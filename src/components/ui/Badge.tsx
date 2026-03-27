import React from 'react';
import { cn } from './Button';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
  children?: React.ReactNode;
}

export function Badge({ className, variant = 'default', children }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        {
          'bg-slate-900 text-slate-50': variant === 'default',
          'bg-slate-100 text-slate-900': variant === 'secondary',
          'border border-slate-200 text-slate-950': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </div>
  );
}

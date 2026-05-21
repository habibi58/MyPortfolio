// Card Component
import React from 'react';
import { cn } from '../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
  glowBorder?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, glass = false, gradient = false, glowBorder = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group/card relative rounded-2xl p-6 transition-all duration-500',
          glass
            ? 'border border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-xl dark:border-white/[0.06] dark:bg-slate-800/50'
            : 'border border-slate-200/80 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-900/80',
          gradient &&
            'border-blue-100/50 bg-gradient-to-br from-blue-50/80 via-blue-50/50 to-blue-50/40 dark:border-slate-700/40 dark:from-slate-800/90 dark:via-slate-900/80 dark:to-blue-950/50',
          hover && 'hover:shadow-xl hover:shadow-blue-600/[0.08] hover:-translate-y-1.5 dark:hover:shadow-blue-500/[0.06]',
          glowBorder && 'gradient-border-animated',
          className
        )}
        {...props}
      >
        {/* Subtle gradient overlay on hover */}
        {hover && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 bg-gradient-to-br from-blue-600/[0.03] via-transparent to-blue-700/[0.03]" />
        )}
        <div className="relative z-[1]">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

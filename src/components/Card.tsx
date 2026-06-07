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
            ? 'border border-white/[0.15] bg-black/60 backdrop-blur-xl'
            : 'border border-slate-700/60 bg-slate-900/80 shadow-sm',
          gradient &&
            'border-slate-700/40 bg-gradient-to-br from-slate-800/90 via-slate-900/80 to-blue-950/50',
          hover && 'hover:shadow-xl hover:shadow-blue-500/[0.06] hover:-translate-y-1.5',
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

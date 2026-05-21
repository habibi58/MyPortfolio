// Button Component
import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden';

    const variants = {
      primary:
        'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 animate-gradient-shift bg-[length:200%_200%]',
      secondary:
        'bg-gradient-to-r from-slate-800 to-slate-700 text-white hover:shadow-lg hover:shadow-slate-800/30 hover:-translate-y-0.5 dark:from-slate-700 dark:to-slate-600 disabled:opacity-50',
      outline:
        'border-2 border-blue-600/50 text-blue-700 hover:bg-blue-600/10 hover:border-blue-600 hover:-translate-y-0.5 disabled:opacity-50 dark:border-blue-400/50 dark:text-blue-400 dark:hover:border-blue-400',
      ghost:
        'text-blue-700 hover:bg-blue-600/10 dark:text-blue-400 dark:hover:bg-blue-600/15 disabled:opacity-50',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

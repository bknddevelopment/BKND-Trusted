import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
  {
    variants: {
      variant: {
        verified: 'bg-success-50 text-success-700 border border-success-500',
        licensed: 'bg-brand-50 text-brand-700 border border-brand-600',
        featured: 'bg-featured-50 text-featured-600 border border-featured-400',
        premium: 'bg-gradient-to-r from-featured-400 to-featured-500 text-white shadow-md',
        default: 'bg-neutral-100 text-neutral-700 border border-neutral-300',
        success: 'bg-success-100 text-success-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <div
        className={badgeVariants({ variant, className })}
        ref={ref}
        {...props}
      >
        {icon && <span className="w-3 h-3">{icon}</span>}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };

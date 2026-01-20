'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:to-orange-700 text-white',
        primary: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:to-orange-700 text-white',
        secondary: 'border border-orange-500 text-orange-500 hover:bg-orange-500/10',
        outline: 'border border-orange-500 text-orange-500 hover:bg-orange-500/10',
        glass: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20',
        destructive: 'bg-red-500 hover:bg-red-600 text-white',
        ghost: 'hover:bg-white/10 text-white',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children: ReactNode;
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  isLoading,
  children,
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot className={cn(buttonVariants({ variant, size }), className)}>
        {children}
      </Slot>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      type={props.type}
      onClick={props.onClick}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
}

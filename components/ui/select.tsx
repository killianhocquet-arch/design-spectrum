'use client';

import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export function Select({
  className,
  label,
  options,
  error,
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random()}`;

  return (
    <div className="space-y-2 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-medium text-white uppercase block"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'w-full h-11 px-4 pr-10 rounded-lg bg-white/5 border border-white/20',
            'text-white text-sm appearance-none cursor-pointer',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
            'hover:bg-white/10',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value} className="bg-slate-900 text-white">
              {label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

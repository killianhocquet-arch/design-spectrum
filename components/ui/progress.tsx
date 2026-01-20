'use client';

interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'default' | 'orange' | 'green';
  size?: 'sm' | 'md' | 'lg';
}

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
}: ProgressProps) {
  const percentage = (value / max) * 100;

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    default: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className={`w-full ${sizeClasses[size]} bg-white/10 rounded-full overflow-hidden`}>
      <div
        className={`h-full bg-gradient-to-r ${colorClasses[variant]} rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

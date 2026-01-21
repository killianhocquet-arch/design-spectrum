'use client';

interface GaugeBarProps {
  label: string;
  value: number;
  color?: string;
}

export function GaugeBar({ label, value, color = 'from-app-orange' }: GaugeBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="text-xs font-semibold text-foreground">{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} to-transparent rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

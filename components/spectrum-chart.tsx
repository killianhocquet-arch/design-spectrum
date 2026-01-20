'use client';

import { motion } from 'framer-motion';
import { SpectrumData } from '@/lib/types';

interface SpectrumChartProps {
  data: SpectrumData;
}

export function SpectrumChart({ data }: SpectrumChartProps) {
  const axes = [
    { label: 'Conceptuel', key: 'conceptualThinking' },
    { label: 'Technique', key: 'technicalExecution' },
    { label: 'Couleur', key: 'colorTheory' },
    { label: 'Typo', key: 'typography' },
    { label: 'UX', key: 'userExperience' },
    { label: 'Innovation', key: 'innovation' },
  ];

  const maxValue = 100;
  const angleSlice = (Math.PI * 2) / axes.length;

  const points = axes.map((axis, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const value = (data[axis.key as keyof SpectrumData] || 0) / maxValue;
    return {
      x: Math.cos(angle) * (50 + value * 50),
      y: Math.sin(angle) * (50 + value * 50),
      label: axis.label,
      value: data[axis.key as keyof SpectrumData] || 0,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 p-6 space-y-4"
    >
      <h3 className="text-white font-semibold">Ton Spectre Créatif</h3>

      {/* SVG Chart */}
      <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
        {/* Background circles */}
        {[1, 2, 3, 4, 5].map((circle) => (
          <circle
            key={circle}
            cx="100"
            cy="100"
            r={circle * 20}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
        ))}

        {/* Axes lines */}
        {axes.map((_, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const x2 = Math.cos(angle) * 100 + 100;
          const y2 = Math.sin(angle) * 100 + 100;
          return (
            <line
              key={`axis-${i}`}
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={points.map((p) => `${p.x + 100},${p.y + 100}`).join(' ')}
          fill="rgba(245, 97, 23, 0.2)"
          stroke="rgba(245, 97, 23, 0.8)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={point.x + 100}
            cy={point.y + 100}
            r="4"
            fill="rgba(245, 97, 23, 1)"
            initial={{ r: 0 }}
            animate={{ r: 4 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
          />
        ))}

        {/* Labels */}
        {points.map((point, i) => {
          const labelRadius = 130;
          const angle = angleSlice * i - Math.PI / 2;
          const labelX = Math.cos(angle) * labelRadius;
          const labelY = Math.sin(angle) * labelRadius;
          return (
            <text
              key={`label-${i}`}
              x={labelX + 100}
              y={labelY + 100}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-white/60 font-medium"
            >
              {point.label}
            </text>
          );
        })}
      </svg>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {points.map((point) => (
          <div key={point.label} className="flex items-center justify-between p-2 bg-white/5 rounded">
            <span className="text-white/60">{point.label}</span>
            <span className="text-orange-400 font-semibold">{point.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

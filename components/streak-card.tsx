'use client';

import { motion } from 'framer-motion';

interface StreakCardProps {
  streak: number;
  lastDate?: Date;
}

export function StreakCard({ streak, lastDate }: StreakCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0 }}
      className="rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Streak</h3>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl"
        >
          🔥
        </motion.div>
      </div>

      <div className="space-y-2">
        <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
          {streak}
        </div>
        <p className="text-white/60 text-sm">jours consécutifs</p>
      </div>

      {lastDate && (
        <p className="text-xs text-white/40">
          Dernière visite: {lastDate.toLocaleDateString('fr-FR')}
        </p>
      )}

      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
        />
      </div>
    </motion.div>
  );
}

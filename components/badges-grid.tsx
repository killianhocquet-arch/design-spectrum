'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/lib/types';

interface BadgesGridProps {
  badges: Badge[];
  maxDisplay?: number;
}

export function BadgesGrid({ badges, maxDisplay = 12 }: BadgesGridProps) {
  const displayBadges = badges.slice(0, maxDisplay);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Badges</h3>
        <span className="text-xs text-white/60">
          {unlockedCount}/{badges.length}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {displayBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
            className="relative group"
          >
            <div
              className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl transition-all ${
                badge.unlocked
                  ? 'bg-orange-500/20 border border-orange-500/30'
                  : 'bg-white/5 border border-white/10 opacity-50'
              }`}
            >
              {badge.icon}
            </div>

            {!badge.unlocked && badge.progress !== undefined && (
              <div className="absolute inset-0 rounded-lg flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center">
                  <p className="text-xs text-white font-semibold">
                    {badge.progress}%
                  </p>
                </div>
              </div>
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {badge.name}
            </div>
          </motion.div>
        ))}
      </div>

      {badges.length > maxDisplay && (
        <p className="text-xs text-white/40 text-center">
          +{badges.length - maxDisplay} badges à découvrir
        </p>
      )}
    </motion.div>
  );
}

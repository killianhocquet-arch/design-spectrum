'use client';

import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface LevelCardProps {
  level: number;
  currentXP: number;
  maxXP: number;
  levelName?: string;
}

const levelNames = ['Novice', 'Apprenti', 'Compagnon', 'Maître', 'Légendaire'];

export function LevelCard({
  level,
  currentXP,
  maxXP,
  levelName,
}: LevelCardProps) {
  const progressPercent = (currentXP / maxXP) * 100;
  const displayName = levelName || levelNames[Math.min(level - 1, levelNames.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border border-border backdrop-blur-md bg-card p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold">Niveau</h3>
        <div className="text-2xl font-bold text-app-orange">{level}</div>
      </div>

      <div className="space-y-2">
        <p className="text-foreground text-sm">{displayName}</p>
        <Progress value={progressPercent} variant="orange" size="md" />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {currentXP.toLocaleString()} XP
        </span>
        <span className="text-muted-foreground">
          {maxXP.toLocaleString()} XP
        </span>
      </div>

      <div className="w-full h-20 bg-app-orange-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Prochaine étape</p>
          <p className="text-sm font-semibold text-app-orange">
            {maxXP - currentXP} XP restants
          </p>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StreakCard } from '@/components/streak-card';
import { SpectrumChart } from '@/components/spectrum-chart';
import { LevelCard } from '@/components/level-card';
import { BadgesGrid } from '@/components/badges-grid';
import { useAppData } from '@/lib/hooks';
import { UserStats, Badge } from '@/lib/types';

// Mock data pour les badges
const allBadges: Badge[] = [
  { id: '1', name: 'Premier Pas', icon: '👣', unlocked: true, unlockedAt: new Date() },
  { id: '2', name: 'Flamme 7j', icon: '🔥', unlocked: true, unlockedAt: new Date() },
  { id: '3', name: 'Coloriste', icon: '🎨', unlocked: true, unlockedAt: new Date() },
  { id: '4', name: 'Typographe', icon: '✍️', unlocked: true, unlockedAt: new Date() },
  { id: '5', name: 'Explorateur', icon: '🧭', unlocked: true, unlockedAt: new Date() },
  { id: '6', name: 'Innovateur', icon: '💡', unlocked: false, progress: 60 },
  { id: '7', name: 'Maître 30j', icon: '👑', unlocked: false, progress: 40 },
  { id: '8', name: 'Légende', icon: '⭐', unlocked: false, progress: 15 },
  { id: '9', name: 'Speedrun', icon: '⚡', unlocked: false, progress: 25 },
  { id: '10', name: 'Social', icon: '👥', unlocked: false, progress: 50 },
  { id: '11', name: 'Premium', icon: '💎', unlocked: false, progress: 0 },
  { id: '12', name: 'Mystère', icon: '❓', unlocked: false, progress: undefined },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function StatsPage() {
  const { appData, isLoaded } = useAppData();

  // Calculer les badges débloqués en fonction du XP
  const unlockedBadges = useMemo(() => {
    const xpThresholds: { [key: number]: number } = {
      1: 0,
      2: 50,
      3: 150,
      4: 350,
      5: 600,
    };

    return allBadges.map((badge, index) => {
      const threshold = xpThresholds[index + 1] || 1000;
      return {
        ...badge,
        unlocked: appData.totalXP >= threshold,
        progress: appData.totalXP >= threshold ? undefined : Math.floor((appData.totalXP / threshold) * 100),
      };
    });
  }, [appData.totalXP]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="animate-pulse">Chargement de tes stats...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full px-4 py-6 space-y-6 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome */}
      <motion.div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">Tes Statistiques</h1>
        <p className="text-white/60 text-sm">
          Level {appData.currentLevel} • {appData.totalXP} XP total
        </p>
      </motion.div>

      {/* Streak Card */}
      <StreakCard
        streak={appData.streak}
        lastDate={new Date()}
      />

      {/* Spectrum Chart */}
      <SpectrumChart
        data={{
          conceptualThinking: 85,
          technicalExecution: 72,
          colorTheory: 90,
          typography: 78,
          userExperience: 88,
          innovation: 65,
        }}
      />

      {/* Level Card */}
      <LevelCard
        level={appData.currentLevel}
        currentXP={appData.totalXP % 2000}
        maxXP={2000}
      />

      {/* Badges Grid */}
      <BadgesGrid badges={unlockedBadges} />

      {/* Footer spacer */}
      <div className="h-4" />
    </motion.div>
  );
}

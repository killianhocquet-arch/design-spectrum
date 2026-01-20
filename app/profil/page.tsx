'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProfileHeader } from '@/components/profile-header';
import { FavorisScroll } from '@/components/favoris-scroll';
import { CategoriesList } from '@/components/categories-list';
import { ProfileSettings } from '@/components/profile-settings';
import { useAppData } from '@/lib/hooks';
import { ContentItem } from '@/lib/types';

// Toutes les contenus disponibles (même que dans Feed)
const allContent: ContentItem[] = [
  {
    id: '1',
    title: 'Brutalism in Modern Web Design',
    source: 'Designer Weekly',
    category: 'Inspiration',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop',
    realGauge: 75,
    conceptualGauge: 85,
    isFavorite: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Color Psychology Guide',
    source: 'Design Academy',
    category: 'Learning',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop',
    realGauge: 60,
    conceptualGauge: 90,
    isFavorite: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Typography Trends 2026',
    source: 'Font Foundry',
    category: 'Trends',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop',
    realGauge: 80,
    conceptualGauge: 88,
    isFavorite: false,
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'UX Design Principles',
    source: 'UX Magazine',
    category: 'Learning',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop',
    realGauge: 70,
    conceptualGauge: 95,
    isFavorite: false,
    createdAt: new Date(),
  },
];

export default function ProfilPage() {
  const { appData, isLoaded } = useAppData();

  // Filtrer les favoris
  const favoriteItems = useMemo(() => {
    return allContent.filter((item) => appData.favorites.includes(item.id));
  }, [appData.favorites]);

  const userProfile = {
    name: appData.userProfile?.name || 'Designer',
    bio: appData.userProfile?.bio || 'Créative | Passionnée par les couleurs',
    avatar: undefined,
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="animate-pulse">Chargement de ton profil...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <ProfileHeader
        name={userProfile.name}
        bio={userProfile.bio}
        avatar={userProfile.avatar}
      />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Favoris */}
      <div className="py-6">
        <FavorisScroll items={favoriteItems} />
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Categories */}
      <div className="py-6">
        <CategoriesList
          categories={[
            'Design Graphique',
            'Typographie',
            'Couleur',
            'UX/UI',
            'Illustration',
            'Web Design',
          ]}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Settings */}
      <ProfileSettings />

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="px-4 py-6 space-y-3"
      >
        <h3 className="text-white font-semibold">Résumé</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-2xl font-bold text-orange-400">{appData.streak}</p>
            <p className="text-xs text-white/60">Jours</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-2xl font-bold text-orange-400">{appData.totalXP}</p>
            <p className="text-xs text-white/60">XP</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-2xl font-bold text-orange-400">{favoriteItems.length}</p>
            <p className="text-xs text-white/60">Favoris</p>
          </div>
        </div>
      </motion.div>

      {/* Footer spacer */}
      <div className="h-4" />
    </motion.div>
  );
}

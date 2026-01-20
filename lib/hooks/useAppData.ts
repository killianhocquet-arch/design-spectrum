'use client';

import { useLocalStorage } from './useLocalStorage';
import { ContentItem, UserProfile } from '@/lib/types';

// Types pour les données persistées
export interface AppData {
  favorites: string[]; // IDs des favoris
  streak: number;
  totalXP: number;
  currentLevel: number;
  userProfile?: {
    name: string;
    bio?: string;
  };
}

const defaultAppData: AppData = {
  favorites: [],
  streak: 0,
  totalXP: 0,
  currentLevel: 1,
};

/**
 * Hook principal pour gérer l'état global de l'app avec persistance
 */
export function useAppData() {
  const [appData, setAppData, isLoaded] = useLocalStorage<AppData>(
    'design-spectrum-app',
    defaultAppData
  );

  // Ajouter/retirer un favori
  const toggleFavorite = (contentId: string) => {
    setAppData((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(contentId)
        ? prev.favorites.filter((id) => id !== contentId)
        : [...prev.favorites, contentId],
    }));
  };

  // Ajouter XP
  const addXP = (amount: number) => {
    setAppData((prev) => {
      const newXP = prev.totalXP + amount;
      const newLevel = Math.floor(newXP / 2000) + 1;

      return {
        ...prev,
        totalXP: newXP,
        currentLevel: newLevel,
      };
    });
  };

  // Incrémenter le streak
  const incrementStreak = () => {
    setAppData((prev) => ({
      ...prev,
      streak: prev.streak + 1,
    }));
  };

  // Réinitialiser le streak
  const resetStreak = () => {
    setAppData((prev) => ({
      ...prev,
      streak: 0,
    }));
  };

  // Mettre à jour le profil
  const updateUserProfile = (profile: { name: string; bio?: string }) => {
    setAppData((prev) => ({
      ...prev,
      userProfile: profile,
    }));
  };

  // Vérifier si un contenu est en favori
  const isFavorite = (contentId: string) => appData.favorites.includes(contentId);

  return {
    appData,
    isLoaded,
    toggleFavorite,
    isFavorite,
    addXP,
    incrementStreak,
    resetStreak,
    updateUserProfile,
  };
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContentItem } from '@/lib/types';
import { FeedCard } from '@/components/feed-card';
import { useAppData, useFetchContent } from '@/lib/hooks';

export default function FeedPage() {
  const { appData, isLoaded, toggleFavorite, addXP } = useAppData();
  const { items: fetchedItems, isLoading, error, refetch } = useFetchContent({
    category: 'all',
    limit: 20,
  });
  const [items, setItems] = useState<ContentItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialiser les items avec les données Brightdata + favoris
  useEffect(() => {
    if (isLoaded && fetchedItems.length > 0) {
      const itemsWithFavorites = fetchedItems.map((item) => ({
        ...item,
        isFavorite: appData.favorites.includes(item.id),
      }));
      setItems(itemsWithFavorites);
    }
  }, [fetchedItems, appData.favorites, isLoaded]);

  const handleFavorite = (id: string) => {
    toggleFavorite(id);
    setItems(items.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
    addXP(10);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      addXP(5);
    }
  };

  if (!isLoaded || (isLoading && items.length === 0)) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-white gap-4">
        <div className="animate-pulse text-lg font-semibold">
          Chargement des contenus...
        </div>
        <div className="text-sm text-white/50">
          Récupération des tendances de design
        </div>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-white gap-4">
        <div className="text-red-400 font-semibold">Erreur</div>
        <p className="text-white/60 text-sm max-w-xs text-center">{error}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-medium hover:bg-orange-500/30 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-white/60 text-sm">Aucun contenu disponible</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-medium hover:bg-orange-500/30 transition-colors"
          >
            Rafraîchir
          </button>
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        key={currentItem.id}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <FeedCard
          content={currentItem}
          onFavorite={handleFavorite}
          onNext={handleNext}
          hasNext={currentIndex < items.length - 1}
        />
      </motion.div>

      {/* Loading indicator for next item */}
      {isLoading && currentIndex === items.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-white/50"
        >
          Chargement de plus de contenus...
        </motion.div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { ContentItem } from '@/lib/types';
import { FeedCard } from '@/components/feed-card';
import { useAppData, useFetchContent } from '@/lib/hooks';
import { X, ExternalLink } from 'lucide-react';

// Seuil de swipe en pixels
const SWIPE_THRESHOLD = 100;
// Vélocité minimale pour déclencher un swipe
const SWIPE_VELOCITY = 500;

export default function FeedPage() {
  const { appData, isLoaded, toggleFavorite, addXP } = useAppData();
  const { items: fetchedItems, isLoading, error, refetch } = useFetchContent({
    category: 'all',
    limit: 20,
  });
  const [items, setItems] = useState<ContentItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Motion values pour le drag
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const cardOpacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Overlays indicateurs de swipe
  const leftOverlayOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const leftTextOpacity = useTransform(x, [-150, -80, 0], [1, 0, 0]);
  const rightOverlayOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);
  const rightTextOpacity = useTransform(x, [0, 80, 150], [0, 0, 1]);

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
      setExitDirection('left');
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setExitDirection(null);
        x.set(0);
      }, 200);
      addXP(5);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setExitDirection('right');
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setExitDirection(null);
        x.set(0);
      }, 200);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;

    // Swipe vers la gauche = carte suivante
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY) {
      if (currentIndex < items.length - 1) {
        handleNext();
      } else {
        // Rebond si c'est la dernière carte
        x.set(0);
      }
    }
    // Swipe vers la droite = carte précédente
    else if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY) {
      if (currentIndex > 0) {
        handlePrevious();
      } else {
        // Rebond si c'est la première carte
        x.set(0);
      }
    }
    // Pas assez de mouvement, retour au centre
    else {
      x.set(0);
    }
  };

  const handleShowDetails = useCallback(() => {
    setShowDetails(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setShowDetails(false);
  }, []);

  if (!isLoaded || (isLoading && items.length === 0)) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-foreground gap-4">
        <div className="animate-pulse text-lg font-semibold">
          Chargement des contenus...
        </div>
        <div className="text-sm text-muted-foreground">
          Récupération des tendances de design
        </div>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-foreground gap-4">
        <div className="text-app-red font-semibold">Erreur</div>
        <p className="text-muted-foreground text-sm max-w-xs text-center">{error}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded-full bg-app-orange-muted text-app-orange border border-app-orange/30 text-sm font-medium hover:bg-app-orange/20 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-foreground">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Aucun contenu disponible</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 rounded-full bg-app-orange-muted text-app-orange border border-app-orange/30 text-sm font-medium hover:bg-app-orange/20 transition-colors"
          >
            Rafraîchir
          </button>
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  // Variants pour l'animation d'entrée/sortie
  const cardVariants = {
    enter: (direction: 'left' | 'right' | null) => ({
      x: direction === 'left' ? 300 : direction === 'right' ? -300 : 0,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: 'left' | 'right' | null) => ({
      x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Indicateur de position */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {items.slice(Math.max(0, currentIndex - 2), Math.min(items.length, currentIndex + 3)).map((item, i) => {
          const actualIndex = Math.max(0, currentIndex - 2) + i;
          return (
            <div
              key={item.id}
              className={`h-1 rounded-full transition-all duration-300 ${
                actualIndex === currentIndex
                  ? 'w-6 bg-app-orange'
                  : 'w-1.5 bg-muted'
              }`}
            />
          );
        })}
      </div>

      {/* Carte principale avec drag */}
      <motion.div
        key={currentItem.id}
        custom={exitDirection}
        variants={cardVariants}
        initial="enter"
        animate={exitDirection ? 'exit' : 'center'}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x, rotate, opacity: cardOpacity }}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
      >
        <FeedCard
          content={currentItem}
          onFavorite={handleFavorite}
          onNext={handleNext}
          hasNext={currentIndex < items.length - 1}
          onShowDetails={handleShowDetails}
        />

        {/* Overlay indicateur swipe gauche (suivant) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-app-orange/20 pointer-events-none flex items-center justify-end pr-8"
          style={{ opacity: leftOverlayOpacity }}
        >
          <motion.div
            className="text-app-orange font-bold text-xl"
            style={{ opacity: leftTextOpacity }}
          >
            SUIVANT →
          </motion.div>
        </motion.div>

        {/* Overlay indicateur swipe droite (précédent) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-transparent to-app-blue/20 pointer-events-none flex items-center justify-start pl-8"
          style={{ opacity: rightOverlayOpacity }}
        >
          <motion.div
            className="text-app-blue font-bold text-xl"
            style={{ opacity: rightTextOpacity }}
          >
            ← RETOUR
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicateur de navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground pointer-events-none">
        {currentIndex + 1} / {items.length}
      </div>

      {/* Loading indicator for next item */}
      {isLoading && currentIndex === items.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
        >
          Chargement de plus de contenus...
        </motion.div>
      )}

      {/* Panneau de détails */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col overflow-hidden"
          >
            {/* Header avec bouton fermer */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Détails</h2>
              <button
                onClick={handleCloseDetails}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X size={24} className="text-foreground" />
              </button>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              {/* Image miniature */}
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Titre et source */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-semibold text-app-orange">
                    {currentItem.category}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{currentItem.source}</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground leading-tight">
                  {currentItem.title}
                </h1>
              </div>

              {/* Description */}
              {currentItem.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {currentItem.description}
                </p>
              )}

              {/* Gauges détaillées */}
              <div className="space-y-4 py-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                  Analyse du contenu
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Réel / Pratique</span>
                      <span className="text-app-blue">{currentItem.realGauge}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${currentItem.realGauge}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-app-blue to-app-blue rounded-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Conceptuel / Théorique</span>
                      <span className="text-app-orange">{currentItem.conceptualGauge}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${currentItem.conceptualGauge}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-app-orange to-app-orange rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton vers la source */}
              {currentItem.sourceUrl && (
                <motion.a
                  href={currentItem.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-app-red hover:bg-app-red/80 rounded-xl text-white font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink size={20} />
                  Voir sur YouTube
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, MoreVertical, ExternalLink, ChevronUp } from 'lucide-react';
import { ContentItem } from '@/lib/types';
import { GaugeBar } from './gauge-bar';

interface FeedCardProps {
  content: ContentItem;
  onFavorite: (id: string) => void;
  onNext: () => void;
  hasNext: boolean;
  onShowDetails?: () => void;
  onShare?: () => void;
}

export function FeedCard({ content, onFavorite, onNext, hasNext, onShowDetails, onShare }: FeedCardProps) {
  const [isDoubleTap, setIsDoubleTap] = useState(false);

  const handleDoubleTap = () => {
    onFavorite(content.id);
    setIsDoubleTap(true);
    setTimeout(() => setIsDoubleTap(false), 600);
  };

  const handleOpenSource = () => {
    if (content.sourceUrl) {
      window.open(content.sourceUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: `Découvre ce design : ${content.title}`,
          url: content.sourceUrl || window.location.href,
        });
        onShare?.();
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      onShare?.();
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col bg-background select-none"
      onDoubleClick={handleDoubleTap}
    >
      {/* Image - 80% */}
      <div className="relative flex-1 overflow-hidden">
        <motion.img
          src={content.imageUrl}
          alt={content.title}
          className="w-full h-full object-cover"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Double-tap Heart Animation */}
        {isDoubleTap && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Heart size={80} className="fill-app-red text-app-red" />
          </motion.div>
        )}

        {/* Menu Top Right */}
        <button className="absolute top-4 right-4 p-2 bg-app-overlay/40 hover:bg-app-overlay/60 rounded-full backdrop-blur-sm transition-colors">
          <MoreVertical size={20} className="text-foreground" />
        </button>

        {/* Indicateur Scroll/Détails - en haut au centre */}
        {onShowDetails && (
          <motion.button
            onClick={onShowDetails}
            className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronUp size={24} />
            </motion.div>
            <span className="text-xs font-medium bg-app-overlay/40 px-2 py-1 rounded-full backdrop-blur-sm">
              Détails
            </span>
          </motion.button>
        )}
      </div>

      {/* Info Zone - 20% */}
      <div className="px-4 py-4 space-y-3">
        {/* Title & Category */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-app-orange">
              {content.category}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{content.source}</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground line-clamp-2">
            {content.title}
          </h2>
        </div>

        {/* Gauge Bars */}
        <div className="space-y-2">
          <GaugeBar
            label="Réel"
            value={content.realGauge}
            color="from-app-blue"
          />
          <GaugeBar
            label="Conceptuel"
            value={content.conceptualGauge}
            color="from-app-orange"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onFavorite(content.id)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Heart
              size={20}
              className={content.isFavorite ? 'fill-app-red text-app-red' : 'text-muted-foreground'}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Share2 size={20} className="text-muted-foreground" />
          </motion.button>

          {/* Bouton lien source (YouTube) */}
          {content.sourceUrl && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpenSource}
              className="p-2 rounded-full hover:bg-muted transition-colors flex items-center gap-1"
              title="Voir sur YouTube"
            >
              <ExternalLink size={20} className="text-muted-foreground" />
            </motion.button>
          )}

          {/* Indicateur de swipe */}
          {hasNext && (
            <div className="ml-auto flex items-center gap-2 text-muted-foreground text-xs">
              <span>Swipe pour continuer</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

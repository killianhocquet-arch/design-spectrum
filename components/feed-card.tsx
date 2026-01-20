'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, MoreVertical } from 'lucide-react';
import { ContentItem } from '@/lib/types';
import { GaugeBar } from './gauge-bar';

interface FeedCardProps {
  content: ContentItem;
  onFavorite: (id: string) => void;
  onNext: () => void;
  hasNext: boolean;
}

export function FeedCard({ content, onFavorite, onNext, hasNext }: FeedCardProps) {
  const [isDoubleTap, setIsDoubleTap] = useState(false);

  const handleDoubleTap = () => {
    onFavorite(content.id);
    setIsDoubleTap(true);
    setTimeout(() => setIsDoubleTap(false), 600);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col bg-black select-none"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Double-tap Heart Animation */}
        {isDoubleTap && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Heart size={80} className="fill-red-500 text-red-500" />
          </motion.div>
        )}

        {/* Menu Top Right */}
        <button className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm transition-colors">
          <MoreVertical size={20} className="text-white" />
        </button>
      </div>

      {/* Info Zone - 20% */}
      <div className="px-4 py-4 space-y-3">
        {/* Title & Category */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-orange-500">
              {content.category}
            </span>
            <span className="text-xs text-white/50">•</span>
            <span className="text-xs text-white/50">{content.source}</span>
          </div>
          <h2 className="text-lg font-semibold text-white line-clamp-2">
            {content.title}
          </h2>
        </div>

        {/* Gauge Bars */}
        <div className="space-y-2">
          <GaugeBar
            label="Réel"
            value={content.realGauge}
            color="from-blue-500"
          />
          <GaugeBar
            label="Conceptuel"
            value={content.conceptualGauge}
            color="from-orange-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onFavorite(content.id)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Heart
              size={20}
              className={content.isFavorite ? 'fill-red-500 text-red-500' : 'text-white/60'}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Share2 size={20} className="text-white/60" />
          </motion.button>

          {/* Indicateur de swipe */}
          {hasNext && (
            <div className="ml-auto flex items-center gap-2 text-white/40 text-xs">
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

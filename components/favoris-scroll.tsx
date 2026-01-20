'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ContentItem } from '@/lib/types';

interface FavorisScrollProps {
  items: ContentItem[];
}

export function FavorisScroll({ items }: FavorisScrollProps) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 p-6 text-center"
      >
        <Heart className="w-8 h-8 text-white/40 mx-auto mb-2" />
        <p className="text-white/60 text-sm">Aucun favori yet</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="space-y-3"
    >
      <h3 className="text-white font-semibold px-4">Mes Favoris ({items.length})</h3>

      <div className="flex gap-3 overflow-x-auto pb-2 px-4 snap-x snap-mandatory">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className="flex-shrink-0 w-32 snap-center"
          >
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart size={24} className="fill-red-500 text-red-500" />
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-white text-xs font-semibold line-clamp-2">
                  {item.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

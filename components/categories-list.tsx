'use client';

import { motion } from 'framer-motion';

interface CategoriesListProps {
  categories: string[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-3 px-4"
    >
      <h3 className="text-foreground font-semibold">Intérêts</h3>

      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            className="px-3 py-1 rounded-full bg-app-orange-muted text-app-orange border border-app-orange/30 text-xs font-medium hover:bg-app-orange/20 cursor-pointer transition-colors"
          >
            {category}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

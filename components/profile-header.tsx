'use client';

import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  name: string;
  bio?: string;
  avatar?: string;
}

export function ProfileHeader({ name, bio, avatar }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 py-6"
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-app-orange to-app-orange flex items-center justify-center text-primary-foreground text-2xl font-bold border-2 border-border overflow-hidden"
      >
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </motion.div>

      {/* Info */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{name}</h1>
        {bio && <p className="text-muted-foreground text-sm">{bio}</p>}
      </div>

      {/* Edit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-full bg-app-orange-muted text-app-orange border border-app-orange/30 text-sm font-medium hover:bg-app-orange/20 transition-colors"
      >
        Modifier
      </motion.button>
    </motion.div>
  );
}

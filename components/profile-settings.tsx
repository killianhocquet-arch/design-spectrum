'use client';

import { motion } from 'framer-motion';
import { LogOut, Settings, Bell, Lock } from 'lucide-react';

export function ProfileSettings() {
  const settings = [
    { icon: Bell, label: 'Notifications', value: true },
    { icon: Lock, label: 'Confidentialité', value: 'Public' },
    { icon: Settings, label: 'Paramètres', value: '' },
    { icon: LogOut, label: 'Déconnexion', value: '', danger: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="px-4 py-4 space-y-2"
    >
      <h3 className="text-white font-semibold mb-3">Paramètres</h3>

      {settings.map((setting, index) => {
        const Icon = setting.icon;
        return (
          <motion.button
            key={setting.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            whileHover={{ x: 4 }}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
              setting.danger
                ? 'border-red-500/20 hover:bg-red-500/10'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                size={20}
                className={setting.danger ? 'text-red-400' : 'text-white/60'}
              />
              <span className={setting.danger ? 'text-red-400' : 'text-white text-sm'}>
                {setting.label}
              </span>
            </div>
            {setting.value && (
              <span className="text-xs text-white/40">{setting.value}</span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

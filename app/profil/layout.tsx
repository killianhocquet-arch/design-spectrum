'use client';

import { ReactNode } from 'react';
import { BottomNav } from '@/components/bottom-nav';

export default function ProfilLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-app-gradient-start to-app-gradient-end">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-border backdrop-blur-md bg-app-overlay/50">
        <h1 className="text-foreground font-bold">Mon Profil</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

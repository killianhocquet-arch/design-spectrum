'use client';

import { ReactNode } from 'react';
import { BottomNav } from '@/components/bottom-nav';

export default function StatsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 to-black">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-white/10 backdrop-blur-md bg-black/50">
        <h1 className="text-white font-bold">Mes Stats</h1>
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

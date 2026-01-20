'use client';

import { ReactNode } from 'react';
import { BottomNav } from '@/components/bottom-nav';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 to-black">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-white/10 backdrop-blur-md bg-black/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">🔥</span>
          </div>
          <span className="text-white font-semibold">15</span>
        </div>
        <h1 className="text-white font-bold">Design Spectrum</h1>
        <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

'use client';

import { ReactNode } from 'react';
import { BottomNav } from '@/components/bottom-nav';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-app-gradient-start to-app-gradient-end">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-border backdrop-blur-md bg-app-overlay/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-app-orange to-app-orange flex items-center justify-center">
            <span className="font-bold text-sm">🔥</span>
          </div>
          <span className="text-foreground font-semibold">15</span>
        </div>
        <h1 className="text-foreground font-bold">Design Spectrum</h1>
        <button className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors" />
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

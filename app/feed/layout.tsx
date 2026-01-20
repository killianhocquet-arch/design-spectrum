'use client';

import { ReactNode } from 'react';
import { BottomNav } from '@/components/bottom-nav';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 to-black">
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

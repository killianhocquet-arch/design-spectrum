'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, BarChart3, User } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/feed', icon: Flame, label: 'Feed' },
    { href: '/stats', icon: BarChart3, label: 'Stats' },
    { href: '/profil', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="h-16 border-t border-border backdrop-blur-md bg-app-overlay/50 flex items-center justify-around px-4">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-app-orange' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

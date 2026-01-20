'use client';

import { ReactNode, createContext, useContext } from 'react';
import { useAppData } from '@/lib/hooks/useAppData';

type AppContextType = ReturnType<typeof useAppData>;

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const appData = useAppData();

  return (
    <AppContext.Provider value={appData}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

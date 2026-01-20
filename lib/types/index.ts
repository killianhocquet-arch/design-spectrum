// Design Spectrum Types

export interface ContentItem {
  id: string;
  title: string;
  source: string;
  category: string;
  imageUrl: string;
  sourceUrl?: string; // URL vers la vidéo YouTube ou source externe
  description?: string;
  realGauge: number; // 0-100
  conceptualGauge: number; // 0-100
  isFavorite: boolean;
  createdAt: Date;
}

export interface UserStats {
  streak: number;
  totalXP: number;
  currentLevel: number;
  badges: Badge[];
  spectrum: SpectrumData;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number; // 0-100 si pas encore débloqué
}

export interface SpectrumData {
  conceptualThinking: number;
  technicalExecution: number;
  colorTheory: number;
  typography: number;
  userExperience: number;
  innovation: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  favorites: ContentItem[];
  stats: UserStats;
  preferences?: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
  };
}

export interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export type GameificationLevel = 
  | 'Novice'
  | 'Apprenti'
  | 'Compagnon'
  | 'Maître'
  | 'Legendaire';

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

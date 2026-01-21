// XP Values
export const XP_VALUES = {
  DEEP_READ: 15,      // Clic externe
  STREAK_COMPLETE: 30, // Streak quotidien
  NEW_CATEGORY: 20,   // Explorer nouvelle sous-catégorie
  SPECTRUM_BALANCE: 50, // Équilibrer spectre
  SHARE_CONTENT: 10,  // Partager (1x/jour max)
}

// Niveaux
export const LEVELS = [
  { level: 0, title: 'Curieux', xpRequired: 0 },
  { level: 1, title: 'Explorateur', xpRequired: 100 },
  { level: 2, title: 'Veilleur', xpRequired: 300 },
  { level: 3, title: 'Connaisseur', xpRequired: 600 },
  { level: 4, title: 'Expert', xpRequired: 1000 },
  { level: 5, title: 'Maître', xpRequired: 1500 },
  { level: 6, title: 'Visionnaire', xpRequired: 2500 },
]

// Streak
export const STREAK_MINIMUM_VIEWS = 3
export const STREAK_BADGES = [7, 30, 90] // jours

// Feed
export const MAX_DAILY_CONTENT_FREE = 5
export const PRELOAD_CONTENT_COUNT = 10

// Catégories
export const DESIGN_CATEGORIES = [
  'UI', 'UX', 'Branding', 'Motion', 'Illustration',
  'Typography', '3D', 'Architecture', 'Produit', 'Print'
] as const

export type DesignCategory = typeof DESIGN_CATEGORIES[number]

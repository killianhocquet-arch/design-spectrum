# 💾 Persistance des Données - Design Spectrum

## Architecture

Les données sont persistées localement dans **localStorage** et organisées comme suit :

### Structure de Données (AppData)

```typescript
{
  favorites: string[];        // IDs des contenus favoris
  streak: number;             // Jours consécutifs
  totalXP: number;            // Total XP accumulé
  currentLevel: number;       // Niveau actuel
  userProfile?: {
    name: string;
    bio?: string;
  };
}
```

### Clé localStorage

```
design-spectrum-app
```

## Hooks Disponibles

### `useLocalStorage<T>(key: string, initialValue: T)`

Hook bas niveau pour persister n'importe quelle donnée.

```typescript
const [value, setValue, isLoaded] = useLocalStorage('my-key', defaultValue);

// Utilisation
setValue(newValue);                    // Met à jour et sauvegarde
setValue(prev => ({ ...prev, x: 1 })); // Syntaxe fonctionnelle
```

### `useAppData()`

Hook principal pour gérer l'état global de l'app.

```typescript
const {
  appData,           // Données actuelles
  isLoaded,          // Boolean: données chargées?
  toggleFavorite,    // (id: string) => void
  isFavorite,        // (id: string) => boolean
  addXP,             // (amount: number) => void
  incrementStreak,   // () => void
  resetStreak,       // () => void
  updateUserProfile, // (profile) => void
} = useAppData();
```

## Intégration dans les Pages

### Feed Page

- Les favoris sont chargés automatiquement depuis localStorage
- Ajouter un favori ajoute +10 XP
- Voir une carte ajoute +5 XP

```typescript
const { appData, isLoaded, toggleFavorite, addXP } = useAppData();

const handleFavorite = (id: string) => {
  toggleFavorite(id);  // Sauvegarde automatique
  addXP(10);           // Ajouter XP
};
```

### Stats Page

- Charge le streak, level, et XP depuis localStorage
- Badges débloqués automatiquement selon XP
- Données mises à jour en temps réel

### Profil Page

- Affiche les favoris sauvegardés
- Compte les statistiques cumulées
- Affiche résumé (jours, XP, favoris)

## Système de Gamification

### XP System
- **Voir une carte**: +5 XP
- **Aimer un contenu**: +10 XP
- Niveau augmente tous les 2000 XP

### Streak System
- Incrémenté à chaque visite quotidienne
- Réinitialisé si absent > 24h

### Badge System
- 12 badges débloqués par paliers XP
- Indicateur de progression pour badges verrouillés

## Réinitialiser les Données

Depuis la console du navigateur:

```javascript
// Effacer tout
localStorage.removeItem('design-spectrum-app');

// Voir les données actuelles
console.log(JSON.parse(localStorage.getItem('design-spectrum-app')));
```

## Performance & Optimisation

- ✅ Chargement asynchrone (non-blocking)
- ✅ Synchronisation en temps réel entre pages
- ✅ Debouncing automatique des écritures
- ✅ Gestion des erreurs (fallback sur defaults)
- ✅ TypeScript full support

## Futures Améliorations

- [ ] Cloud sync avec Supabase
- [ ] Backup automatique
- [ ] Export/Import des données
- [ ] Dark/Light mode persistence
- [ ] Offline mode complet

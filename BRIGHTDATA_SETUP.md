# 🌐 Intégration Brightdata - Design Spectrum

## Configuration Brightdata

### Étape 1: Créer un compte Brightdata
1. Allez sur https://brightdata.com
2. Créez un compte (gratuit avec crédits limités)
3. Accédez au dashboard

### Étape 2: Créer un Collector (Web Scraper)
1. Allez dans **Collectors** → **Web Scraper**
2. Configurez une nouvelle collection pour le design
3. Exemple de configuration:

```json
{
  "name": "Design Content Scraper",
  "urls": [
    "https://www.designinspiration.com",
    "https://www.awwwards.com",
    "https://www.dribbble.com"
  ],
  "fields": [
    "title",
    "description",
    "url",
    "image",
    "source",
    "date"
  ]
}
```

### Étape 3: Obtenir vos credentials
1. Allez dans **Account** → **API Management**
2. Copiez votre **API Key**
3. Notez votre **Collector ID**

### Étape 4: Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
BRIGHTDATA_API_KEY=your-api-key-here
BRIGHTDATA_COLLECTOR_ID=your-collector-id-here
```

## Architecture d'Intégration

### Flow de Données

```
Frontend (Feed Page)
    ↓
useFetchContent Hook
    ↓
API Route (/api/content)
    ↓
Brightdata Service
    ↓
Brightdata API
    ↓
Résultats Web Scraping
    ↓
Content Adapter (Conversion en ContentItem)
    ↓
Frontend (avec vraies données)
```

### Services Créés

#### 1. **brightdata.ts**
- `fetchFromBrightdata()` - Appel bas niveau à l'API
- `fetchDesignTrends()` - Tendances de design
- `fetchDesignInspiration()` - Contenus d'inspiration
- `fetchDesignLearning()` - Tutoriels et apprentissage

#### 2. **contentAdapter.ts**
- Conversion des résultats Brightdata en ContentItem
- Calcul automatique des gauges
- Gestion des métadonnées

#### 3. **useFetchContent Hook**
- Gestion du loading/error
- Caching automatique
- Refresh sur demande

#### 4. **API Route (/api/content)**
- Endpoint REST pour récupérer les contenus
- Support des filtres (category, limit)
- Gestion des erreurs

## Utilisation dans le Code

### Récupérer les contenus

```typescript
const { items, isLoading, error, refetch } = useFetchContent({
  category: 'trends',    // 'trends' | 'inspiration' | 'learning'
  limit: 20,
});

// Afficher les items
{items.map(item => (
  <ContentCard key={item.id} content={item} />
))}

// Rafraîchir les données
<button onClick={() => refetch()}>Rafraîchir</button>
```

### Appeler l'API directement

```typescript
// GET /api/content?category=trends&limit=20
const response = await fetch('/api/content?category=trends');
const data = await response.json();
```

## Système de Gauges Automatique

Les gauges sont calculées automatiquement selon les mots clés :

### Real Gauge (Technique/Implémentation)
- Keywords: html, css, javascript, react, development, code, etc.
- Range: 50-95%

### Conceptual Gauge (Théorie/Concept)
- Keywords: theory, design, ux, psychology, color, typography, etc.
- Range: 50-100%

## Limitations & Optimisations

### Current
- ⚠️ Requires Brightdata account with credits
- 🔄 Real-time scraping (peut être lent)
- 📦 Pas de caching côté serveur

### Future Improvements
- [ ] Caching avec Redis
- [ ] Background jobs pour scraping
- [ ] Batch processing
- [ ] Database integration (Supabase)
- [ ] Advanced filtering & search
- [ ] User preferences for content

## Troubleshooting

### API returns empty results
- Vérifiez votre `BRIGHTDATA_API_KEY`
- Vérifiez votre `BRIGHTDATA_COLLECTOR_ID`
- Vérifiez que votre collector est actif

### Images ne charge pas
- Les URLs d'images Brightdata peuvent être invalides
- Fallback sur images Unsplash

### Rate limiting
- Brightdata a des limites de requêtes selon votre plan
- Implémentez du caching pour réduire les appels

## Coûts Brightdata

- **Gratuit**: 1000 requests/mois
- **Pro**: À partir de $99/mois
- **Enterprise**: Sur demande

Pour commencer, le plan gratuit suffit pour tester !

## Liens Utiles

- [Brightdata Docs](https://brightdata.com/docs)
- [API Reference](https://brightdata.com/docs/api)
- [Collector Setup](https://brightdata.com/docs/web-scraper)
- [Pricing](https://brightdata.com/pricing)

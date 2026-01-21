# Configuration de l'environnement de Préprod sur Vercel

Ce guide vous aide à configurer un environnement de préprod sur Vercel pour tester la branche `preprod` sur votre téléphone.

## Configuration sur le Dashboard Vercel

### 1. Accéder aux paramètres du projet

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `design-spectrum`
3. Cliquez sur **Settings** (Paramètres)

### 2. Configurer la branche preprod

1. Dans le menu de gauche, cliquez sur **Git**
2. Dans la section **Production Branch**, assurez-vous que votre branche principale est configurée (généralement `main` ou `master`)
3. Dans la section **Deploy Hooks** ou **Branch Deployments**, activez les déploiements automatiques pour la branche `preprod`

### 3. Ajouter les variables d'environnement pour preprod

1. Dans le menu de gauche, cliquez sur **Environment Variables**
2. Pour chaque variable d'environnement, vous pouvez sélectionner les environnements où elle s'applique :
   - **Production** : pour la branche principale
   - **Preview** : pour les branches de preview (dont preprod)
   - **Development** : pour le développement local

#### Variables requises :

Ajoutez ces variables avec l'environnement **Preview** sélectionné :

```
NEXT_PUBLIC_SUPABASE_URL=your-preprod-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-preprod-supabase-key
BRIGHTDATA_API_KEY=your-brightdata-api-key
BRIGHTDATA_COLLECTOR_ID=your-brightdata-collector-id
```

> **Note** : Vous pouvez utiliser les mêmes valeurs que la production ou créer un projet Supabase séparé pour la préprod.

### 4. Configurer un domaine personnalisé pour preprod (Optionnel)

1. Allez dans **Settings** > **Domains**
2. Ajoutez un domaine custom pour votre environnement de preprod, par exemple :
   - `preprod.votre-domaine.com`
   - ou utilisez simplement le domaine Vercel généré : `design-spectrum-git-preprod-votre-username.vercel.app`

## Déclencher un déploiement

### Méthode 1 : Push sur la branche preprod

```bash
git checkout preprod
git pull origin preprod
# Faites vos modifications
git add .
git commit -m "feat: votre message"
git push origin preprod
```

Vercel déploiera automatiquement la branche preprod.

### Méthode 2 : Via le Dashboard Vercel

1. Allez sur le dashboard de votre projet
2. Cliquez sur **Deployments**
3. Trouvez un déploiement de la branche `preprod`
4. Cliquez sur les trois points (...) et sélectionnez **Redeploy**

## Accéder à votre environnement de preprod

Une fois déployé, vous recevrez une URL comme :
- `https://design-spectrum-git-preprod-votre-username.vercel.app`

Vous pouvez :
1. Ouvrir cette URL sur votre téléphone
2. Ajouter cette URL à l'écran d'accueil de votre téléphone pour un accès rapide
3. Utiliser un QR code pour y accéder facilement

## Workflow recommandé

1. **Développement** : Travaillez sur des branches feature
2. **Préprod** : Mergez vos features dans `preprod` pour les tester
3. **Production** : Une fois testé et validé sur preprod, mergez dans `main`

```bash
# Workflow typique
git checkout -b feature/ma-fonctionnalite
# ... développement ...
git commit -m "feat: ma fonctionnalité"

# Tester en preprod
git checkout preprod
git merge feature/ma-fonctionnalite
git push origin preprod

# Une fois validé, merger en production
git checkout main
git merge preprod
git push origin main
```

## Debugging

Si vos déploiements ne fonctionnent pas :

1. Vérifiez les logs de build sur Vercel Dashboard > Deployments > [Votre déploiement] > Build Logs
2. Assurez-vous que toutes les variables d'environnement sont configurées
3. Vérifiez que la branche preprod est bien configurée dans Git settings sur Vercel

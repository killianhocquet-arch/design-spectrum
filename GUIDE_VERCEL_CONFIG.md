# 🚀 Guide de Configuration Vercel - Environnement Preprod

Ce guide vous accompagne pas à pas pour configurer votre environnement de preprod sur Vercel.

## 📋 Prérequis

- [ ] Compte Vercel créé (https://vercel.com)
- [ ] Accès au repository GitHub `killianhocquet-arch/design-spectrum`
- [ ] Variables d'environnement Supabase et Brightdata disponibles

---

## Étape 1 : Importer le Projet sur Vercel

### 1.1 Connexion à Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **"Log In"** ou **"Sign Up"**
3. Connectez-vous avec GitHub

### 1.2 Importer le Repository

1. Sur le dashboard Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Cherchez `design-spectrum` dans la liste des repositories
3. Cliquez sur **"Import"**

### 1.3 Configuration Initiale

```
Project Name: design-spectrum
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**⚠️ NE PAS DÉPLOYER TOUT DE SUITE !** Cliquez sur **"Configure Project"** pour passer à l'étape suivante.

---

## Étape 2 : Configurer les Variables d'Environnement

### 2.1 Ajouter les Variables

Dans la section **"Environment Variables"**, ajoutez ces variables :

#### Pour tous les environnements (Production, Preview, Development) :

1. **NEXT_PUBLIC_SUPABASE_URL**
   ```
   Nom: NEXT_PUBLIC_SUPABASE_URL
   Value: [Votre URL Supabase - depuis https://app.supabase.com/project/_/settings/api]
   Environnements: ✓ Production ✓ Preview ✓ Development
   ```

2. **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY**
   ```
   Nom: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   Value: [Votre clé publique Supabase]
   Environnements: ✓ Production ✓ Preview ✓ Development
   ```

3. **BRIGHTDATA_API_KEY**
   ```
   Nom: BRIGHTDATA_API_KEY
   Value: [Votre clé API Brightdata]
   Environnements: ✓ Production ✓ Preview ✓ Development
   ```

4. **BRIGHTDATA_COLLECTOR_ID**
   ```
   Nom: BRIGHTDATA_COLLECTOR_ID
   Value: [Votre ID collecteur Brightdata]
   Environnements: ✓ Production ✓ Preview ✓ Development
   ```

### 2.2 Comment obtenir les valeurs ?

#### Supabase :
1. Allez sur https://app.supabase.com
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

#### Brightdata :
1. Allez sur https://brightdata.com/cp/api_management
2. Copiez votre clé API et ID collecteur

### 2.3 Valider et Déployer

1. Cliquez sur **"Deploy"**
2. Attendez la fin du déploiement (environ 2-5 minutes)
3. Votre site en production sera disponible !

---

## Étape 3 : Configurer la Branche Preprod

### 3.1 Accéder aux Paramètres Git

1. Sur le dashboard de votre projet, cliquez sur **"Settings"** (en haut)
2. Dans le menu de gauche, cliquez sur **"Git"**

### 3.2 Configuration de Production Branch

```
Production Branch: main  (ou master selon votre config)
```

**Important** : La branche preprod ne doit PAS être la branche de production !

### 3.3 Activer les Déploiements Automatiques

Dans la section **"Ignored Build Step"**, assurez-vous que c'est configuré sur :
```
Default: Automatically build all branches
```

Ou si vous voulez être plus spécifique, vous pouvez créer un script mais ce n'est pas nécessaire avec le `vercel.json` que nous avons créé.

### 3.4 Vérification

Le fichier `vercel.json` que nous avons créé contient :
```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "preprod": true
    }
  }
}
```

Cela indique à Vercel de déployer automatiquement les branches `main` et `preprod`.

---

## Étape 4 : Déclencher le Premier Déploiement Preprod

### 4.1 Via Git Push

```bash
# Si vous êtes déjà sur preprod
git checkout preprod
git pull origin preprod

# Faites un petit changement pour déclencher un déploiement
# (ou simplement push à nouveau)
git push origin preprod
```

### 4.2 Via le Dashboard Vercel

1. Allez sur votre projet sur Vercel
2. Cliquez sur **"Deployments"**
3. Vercel devrait automatiquement détecter la branche preprod et la déployer
4. Si ce n'est pas le cas, cliquez sur **"Redeploy"** sur un déploiement existant et sélectionnez la branche `preprod`

---

## Étape 5 : Trouver l'URL de Preprod

### 5.1 Trouver l'URL dans le Dashboard

1. Allez dans **"Deployments"**
2. Cherchez un déploiement avec le badge **"preprod"**
3. Cliquez dessus
4. L'URL sera affichée en haut, quelque chose comme :
   ```
   https://design-spectrum-git-preprod-[votre-username].vercel.app
   ```

### 5.2 URL de Production vs Preprod

- **Production** : `https://design-spectrum.vercel.app` (ou votre domaine custom)
- **Preprod** : `https://design-spectrum-git-preprod-[username].vercel.app`
- **Autres branches** : `https://design-spectrum-git-[branch-name]-[username].vercel.app`

---

## Étape 6 : Tester sur Mobile

### 6.1 Accéder depuis votre Téléphone

1. Ouvrez l'URL de preprod sur votre téléphone
2. Testez toutes les fonctionnalités

### 6.2 Ajouter à l'Écran d'Accueil

#### Sur iPhone (Safari) :
1. Ouvrez l'URL dans Safari
2. Appuyez sur le bouton de partage (carré avec flèche)
3. Sélectionnez **"Sur l'écran d'accueil"**
4. Nommez-le "Design Spectrum Preprod"

#### Sur Android (Chrome) :
1. Ouvrez l'URL dans Chrome
2. Appuyez sur les trois points (menu)
3. Sélectionnez **"Ajouter à l'écran d'accueil"**
4. Nommez-le "Design Spectrum Preprod"

### 6.3 Créer un QR Code (Optionnel)

Pour partager facilement l'URL :
1. Allez sur https://www.qr-code-generator.com/
2. Collez votre URL de preprod
3. Générez le QR code
4. Scannez-le avec votre téléphone

---

## Étape 7 : Workflow de Développement

### Workflow Recommandé

```bash
# 1. Créer une feature branch
git checkout -b feature/nouvelle-fonctionnalite
# ... développement ...
git add .
git commit -m "feat: ma nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite

# 2. Créer une PR vers preprod pour tester
# (via GitHub UI)

# 3. Une fois mergé dans preprod, tester sur mobile
git checkout preprod
git pull origin preprod
# → Vercel déploie automatiquement
# → Testez sur l'URL de preprod

# 4. Si tout est OK, merger preprod vers main
git checkout main
git pull origin main
git merge preprod
git push origin main
# → Déploiement en production
```

---

## 🔧 Dépannage

### Problème : Le déploiement ne se déclenche pas

**Solution** :
1. Vérifiez que le fichier `vercel.json` est bien présent à la racine
2. Dans Vercel Settings → Git, vérifiez que "Ignored Build Step" n'ignore pas votre branche
3. Faites un commit et push sur la branche preprod

### Problème : Variables d'environnement manquantes

**Solution** :
1. Allez dans Settings → Environment Variables
2. Vérifiez que **Preview** est bien coché pour toutes les variables
3. Après modification, redéployez : Deployments → [...] → Redeploy

### Problème : Erreur de build

**Solution** :
1. Cliquez sur le déploiement en erreur
2. Consultez les logs dans **"Building"**
3. Les erreurs communes :
   - Variables d'environnement manquantes
   - Erreurs TypeScript
   - Dépendances manquantes

### Problème : L'URL ne fonctionne pas sur mobile

**Solution** :
1. Vérifiez que le déploiement est en statut "Ready" (vert)
2. Essayez en navigation privée
3. Videz le cache de votre navigateur mobile

---

## 📱 Liens Rapides

- **Dashboard Vercel** : https://vercel.com/dashboard
- **Documentation Vercel** : https://vercel.com/docs
- **Support Vercel** : https://vercel.com/support
- **Supabase Dashboard** : https://app.supabase.com
- **Brightdata Dashboard** : https://brightdata.com/cp

---

## ✅ Checklist Finale

- [ ] Projet importé sur Vercel
- [ ] Variables d'environnement configurées (4 variables)
- [ ] Branche preprod déployée automatiquement
- [ ] URL de preprod accessible
- [ ] Test sur mobile réussi
- [ ] Workflow de développement compris

---

**Besoin d'aide ?** N'hésitez pas à demander ! 🚀

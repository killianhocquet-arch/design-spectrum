# ⚡ Vercel Preprod - Guide Rapide

## 🎯 Objectif
Avoir un environnement de test (preprod) accessible sur mobile pour tester avant la production.

---

## 🚀 Installation Rapide (5 minutes)

### 1️⃣ Importez sur Vercel
👉 **https://vercel.com/new**

1. Connectez-vous avec GitHub
2. Cherchez `design-spectrum`
3. Cliquez sur **Import**

### 2️⃣ Configurez les Variables d'Environnement

Avant de déployer, ajoutez ces 4 variables (cochez **Preview** pour l'environnement preprod) :

| Variable | Où la trouver |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | https://app.supabase.com → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | https://app.supabase.com → Settings → API → anon/public |
| `BRIGHTDATA_API_KEY` | https://brightdata.com/cp/api_management |
| `BRIGHTDATA_COLLECTOR_ID` | https://brightdata.com/cp/api_management |

### 3️⃣ Déployez
Cliquez sur **Deploy** et attendez ~2 minutes.

### 4️⃣ Poussez sur Preprod
```bash
git checkout preprod
git pull origin preprod
git push origin preprod
```

### 5️⃣ Trouvez l'URL
1. Allez sur votre projet Vercel
2. Cliquez sur **Deployments**
3. Cherchez le déploiement avec le badge `preprod`
4. L'URL sera du type : `https://design-spectrum-git-preprod-xxx.vercel.app`

---

## 📱 Accéder depuis Mobile

### Option 1 : URL directe
Ouvrez simplement l'URL dans le navigateur de votre téléphone

### Option 2 : Ajouter à l'écran d'accueil

**iPhone (Safari)** :
1. Ouvrez l'URL
2. Appuyez sur 🔗 (partager)
3. "Sur l'écran d'accueil"

**Android (Chrome)** :
1. Ouvrez l'URL
2. Menu ⋮
3. "Ajouter à l'écran d'accueil"

### Option 3 : QR Code
1. Allez sur https://www.qr-code-generator.com/
2. Collez votre URL preprod
3. Scannez avec votre téléphone

---

## 🔄 Workflow Quotidien

### Développer une nouvelle fonctionnalité

```bash
# 1. Créer une branche
git checkout -b feature/ma-fonctionnalite

# 2. Développer
# ... codez ...

# 3. Commit et push
git add .
git commit -m "feat: ma nouvelle fonctionnalité"
git push origin feature/ma-fonctionnalite
```

### Tester en preprod

```bash
# 4. Merger dans preprod (ou via PR sur GitHub)
git checkout preprod
git merge feature/ma-fonctionnalite
git push origin preprod

# 5. Vercel déploie automatiquement !
# → Attendez 1-2 minutes
# → Testez sur votre mobile via l'URL preprod
```

### Déployer en production

```bash
# 6. Si tout est OK, merger dans main
git checkout main
git merge preprod
git push origin main

# → Déployé en production !
```

---

## 🔧 Commandes Utiles

### Vérifier la configuration
```bash
./scripts/check-vercel-setup.sh
```

### Voir les branches
```bash
git branch -a
```

### Voir l'état actuel
```bash
git status
```

### Changer de branche
```bash
git checkout preprod
git checkout main
```

### Mettre à jour une branche
```bash
git pull origin preprod
```

---

## 🆘 Problèmes Courants

### Le déploiement ne se déclenche pas
```bash
# Vérifiez que vercel.json existe
ls -la vercel.json

# Faites un commit vide pour forcer le déploiement
git commit --allow-empty -m "chore: trigger deployment"
git push origin preprod
```

### Variables d'environnement manquantes
1. Allez sur Vercel → Settings → Environment Variables
2. Vérifiez que **Preview** est coché
3. Redéployez : Deployments → [...] → Redeploy

### Erreur de build
1. Cliquez sur le déploiement en erreur sur Vercel
2. Regardez les logs
3. Corrigez localement et re-push

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- **GUIDE_VERCEL_CONFIG.md** : Guide complet étape par étape
- **VERCEL_SETUP.md** : Documentation technique

---

## 🎯 Checklist

- [ ] Projet importé sur Vercel
- [ ] 4 variables d'environnement configurées
- [ ] Premier déploiement réussi
- [ ] Branche preprod déployée
- [ ] URL preprod testée sur mobile
- [ ] Ajoutée à l'écran d'accueil du téléphone

---

**C'est tout ! Votre environnement preprod est prêt ! 🎉**

Questions ? Consultez **GUIDE_VERCEL_CONFIG.md** pour plus de détails.

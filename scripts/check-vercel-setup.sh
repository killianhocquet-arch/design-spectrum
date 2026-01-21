#!/bin/bash

# Script de vérification de la configuration Vercel pour preprod
# Usage: ./scripts/check-vercel-setup.sh

echo "🔍 Vérification de la configuration Vercel pour preprod..."
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteur
checks_passed=0
checks_failed=0

# Fonction pour check
check_item() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} $2"
        if [ ! -z "$3" ]; then
            echo -e "  ${YELLOW}→${NC} $3"
        fi
        ((checks_failed++))
    fi
}

# 1. Vérifier que nous sommes dans un repo git
echo "📦 Vérification du repository..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    check_item 0 "Repository Git détecté"
else
    check_item 1 "Repository Git non détecté" "Initialisez un repo git avec 'git init'"
fi

# 2. Vérifier que la branche preprod existe
echo ""
echo "🌿 Vérification des branches..."
if git show-ref --verify --quiet refs/heads/preprod 2>/dev/null || git show-ref --verify --quiet refs/remotes/origin/preprod 2>/dev/null; then
    check_item 0 "Branche 'preprod' existe"
else
    check_item 1 "Branche 'preprod' n'existe pas" "Créez la branche avec 'git checkout -b preprod'"
fi

# 3. Vérifier vercel.json
echo ""
echo "⚙️  Vérification des fichiers de configuration..."
if [ -f "vercel.json" ]; then
    check_item 0 "Fichier vercel.json présent"

    # Vérifier le contenu
    if grep -q "preprod" vercel.json; then
        check_item 0 "Configuration preprod dans vercel.json"
    else
        check_item 1 "Configuration preprod manquante dans vercel.json" "Ajoutez 'preprod' dans deploymentEnabled"
    fi
else
    check_item 1 "Fichier vercel.json manquant" "Le fichier devrait être à la racine du projet"
fi

# 4. Vérifier package.json
if [ -f "package.json" ]; then
    check_item 0 "Fichier package.json présent"

    # Vérifier les scripts
    if grep -q '"build"' package.json; then
        check_item 0 "Script 'build' configuré"
    else
        check_item 1 "Script 'build' manquant" "Ajoutez un script build dans package.json"
    fi
else
    check_item 1 "Fichier package.json manquant"
fi

# 5. Vérifier .env.example
echo ""
echo "🔐 Vérification des variables d'environnement..."
if [ -f ".env.example" ]; then
    check_item 0 "Fichier .env.example présent"

    # Lister les variables attendues
    echo ""
    echo "Variables d'environnement requises :"
    echo "  • NEXT_PUBLIC_SUPABASE_URL"
    echo "  • NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    echo "  • BRIGHTDATA_API_KEY"
    echo "  • BRIGHTDATA_COLLECTOR_ID"
else
    check_item 1 "Fichier .env.example manquant"
fi

# 6. Vérifier la remote origin
echo ""
echo "🔗 Vérification de la remote Git..."
remote_url=$(git config --get remote.origin.url 2>/dev/null)
if [ ! -z "$remote_url" ]; then
    check_item 0 "Remote origin configurée"
    echo "   URL: $remote_url"
else
    check_item 1 "Remote origin non configurée" "Ajoutez la remote avec 'git remote add origin <url>'"
fi

# 7. Vérifier si on est à jour
echo ""
echo "🔄 Vérification des mises à jour..."
git fetch origin 2>/dev/null
LOCAL=$(git rev-parse @ 2>/dev/null)
REMOTE=$(git rev-parse @{u} 2>/dev/null)

if [ "$LOCAL" = "$REMOTE" ]; then
    check_item 0 "Branche à jour avec origin"
elif [ -z "$REMOTE" ]; then
    echo -e "${YELLOW}⚠${NC} Impossible de vérifier (pas de branche upstream)"
else
    check_item 1 "Branche pas à jour" "Faites 'git pull' pour mettre à jour"
fi

# Résumé
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Résumé:"
echo -e "   ${GREEN}Réussis: $checks_passed${NC}"
echo -e "   ${RED}Échoués: $checks_failed${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $checks_failed -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✨ Tout est prêt !${NC}"
    echo ""
    echo "Prochaines étapes :"
    echo "1. Importez le projet sur Vercel (https://vercel.com/new)"
    echo "2. Configurez les variables d'environnement"
    echo "3. Poussez sur la branche preprod : git push origin preprod"
    echo "4. Vercel déploiera automatiquement !"
    echo ""
    echo "📖 Consultez GUIDE_VERCEL_CONFIG.md pour les instructions détaillées"
else
    echo ""
    echo -e "${YELLOW}⚠️  Certaines vérifications ont échoué${NC}"
    echo "Corrigez les problèmes ci-dessus avant de continuer"
fi

echo ""

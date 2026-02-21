#!/bin/bash

echo "🚀 Initialisation du nouveau projet..."

# 1. Initialiser un nouveau Git local
git init

# 2. Installer les dépendances
npm install

# 3. Configurer Husky (les dossiers .husky ne passent pas bien par git archive)
npx husky install
npx husky add .husky/pre-commit "node .github/scripts/validate-commit.js"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "\\$1"'
echo "✅ Hooks Git installés."

# 4. Nettoyage du script de setup et du README si besoin (optionnel)
rm -f setup.sh
rm -f README.md

echo "✨ Terminé ! Ton usine logicielle est prête."
echo "👉 Prochaine étape : Modifie specs/purpose.md et appelle @architect."
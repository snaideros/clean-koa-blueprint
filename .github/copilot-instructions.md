# Directives Globales du Projet (2026)

## 📚 Références et Standards
- **Exemple de référence** : Pour toute structure de fichier, style de code ou pattern d'injection, réfère-toi EXCLUSIVEMENT à l'exemple dans `.github/reference-architecture/`.
- **Vérité métier** : La source de vérité pour la fonctionnalité en cours est `.github/purpose.md`.

## Stack Technique
- **Backend**: Node.js 24+ (ESM uniquement), Native Test Runner (`node:test`, `node:assert`).
- **Frontend**: Vue.js 3 (Composition API), Vuetify 3, Vitest, Pinia.
- **Architecture**: Clean Architecture stricte.

## Règles de Développement
1. **Zéro Dépendance Circulaire**: Les couches internes ne connaissent jamais les couches externes.
2. **Injection de Dépendances**: Aucune instanciation de service/repository à l'intérieur d'une classe. Tout passe par le constructeur.
3. **Types**: TypeScript strict. Utilisation de `zod` pour la validation aux frontières (API/Entités).
4. **Style**: Pas de commentaires évidents. Le code doit être auto-descriptif (Clean Code).

## Règles de Signature de Fonction
- **Named Parameters** : Toutes les fonctions acceptant plus de 1 argument DOIVENT utiliser un objet nommé (Options Object).
  * Exemple : `async createUser({ email, password, role }: CreateUserDTO)`
- **Destructuring** : Préfère le destructuring directement dans la signature pour la clarté.

## 🧱 Découplage HTTP
- **Principe** : Aucun contrôleur dans `adapters/http-controllers/` ne doit importer `express` ou `koa`.
- **Méthode** : Utilise le helper `createHttpHandler`. 
- **Signature** : Un contrôleur doit toujours être `async (req: HttpRequest): Promise<Result<T>>`.
- **Bénéfice** : Cela permet de tester les contrôleurs avec des objets JS simples, sans simuler de serveurs complexes.

## Gestion des Erreurs (Pattern Result)
- **Principe** : Ne jamais utiliser `throw` pour des erreurs métier (ex: "Utilisateur non trouvé", "Mot de passe invalide"). Utiliser uniquement `throw` pour des erreurs système imprévues (DB déconnectée, bug critique).
- **Implémentation** : Toutes les fonctions de la couche `Application` (Use Cases) et `Domain` doivent retourner un type `Result<T, E>`.
- **Structure du retour** : 
  * Succès : `{ success: true, data: ... }`
  * Échec : `{ success: false, error: ... }`
- **Typage des erreurs** : Préfère des objets d'erreur typés (ex: `{ code: 'USER_EXISTS', message: '...' }`) plutôt que des chaînes de caractères simples.

## Règles Git (Conventional Commits)
- **Langue** : Les messages de commit doivent être en anglais.
- **Structure** : `<type>(<scope>)[!]: <description>`
- **Types** :
  - `feat`: Nouvelle fonctionnalité (ex: un nouveau Use Case).
  - `fix`: Correction d'un bug.
  - `test`: Ajout ou modification de tests (Node native runner).
  - `refactor`: Modification de code qui ne change pas le comportement (rôle de @refactor).
  - `style`: Changement lié à Vuetify/CSS.
  - `docs`: Documentation dans `.github/docs/` ou JSDoc.
- **Description** : Doit être concise (50 caractères si possible, 80 max) et claire (ex: "feat(user): add createUser use case").
- **Breaking Change** : Ajouter `!` après le type si le commit introduit une rupture de contrat (ex: changement d'interface, suppression d'une API).
- **Scope** : Doit correspondre au dossier de la ressource (ex: `user`, `product`, `ui`).
- **Corps** : Explique brièvement le "Pourquoi" et non le "Comment" si le changement est complexe.

## 🛠 Setup & Qualité (Git Hooks)
- **Outils** : Husky + Commitlint + Script de validation personnalisé.
- **Maintenance** : Si tu ajoutes une dépendance, vérifie que le script `scripts/validate-commit.js` ne doit pas être mis à jour.
- **Consigne** : Ne propose jamais de commit qui ne passerait pas la validation de `npm test` (sauf mention "RED phase").
- **Installation** : En cas de nouveau setup, lance `npx husky install` et configure `.husky/pre-commit` pour appeler le script de validation.

## Règle de Cohérence Multi-Agents
- Un agent ne doit jamais modifier un fichier qui n'est pas dans son périmètre (ex: @tester ne modifie pas le code source, @developer ne modifie pas les interfaces).
- Si un agent détecte une erreur dans la phase précédente (ex: @tester voit une erreur de logique dans l'interface de l'architecte), il doit demander une correction à l'agent concerné avant de continuer.

## Règle des Exports
Chaque sous-dossier (entities, use-cases, adapters) DOIT posséder un fichier index.ts.
Les fichiers externes à la ressource ne doivent importer que via ces index pour respecter l'encapsulation.

## Workflow TDD
Interdiction d'écrire du code de production avant le test, sauf pour définir les interfaces (rôle de l'Architecte).
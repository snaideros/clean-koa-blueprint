# Vision du Projet & Workflow

## Objectif
Développer une application Fullstack JS robuste où la logique métier (Domain) est totalement isolée des détails techniques (Frameworks, DB).

## Le Cycle des 4 Agents (Quadrige)
1. **@architect** : Analyse le besoin et crée les contrats dans `src/domain/`.
2. **@tester** : Crée le test unitaire dans `tests/unit/` (doit échouer).
3. **@developer** : Implémente le code minimal dans `src/application/`.
4. **@refactor** : Optimise le code une fois que le test passe au vert.

## Conventions de Nommage
- Interfaces : `I[Name]Repository`
- Use Cases : `[Action][Entity]UseCase`
- Tests : `[entity].test.ts`
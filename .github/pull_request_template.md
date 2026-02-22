## 🎯 Purpose
## 🏗 Architectural Impact
- **Domain Layer**: (Entities, Interfaces, Domain Services)
- **Application Layer**: (Use Cases, DTOs)
- **Infrastructure Layer**: (HTTP Adapters, Repositories, Helpers)

## 🧪 TDD & Quality Checklist
- [ ] **RED Phase**: Unit tests were written first and failed as expected.
- [ ] **GREEN Phase**: Minimal production code implemented to pass tests.
- [ ] **REFACTOR Phase**: Code cleaned and optimized by @refactor (No logic change).
- [ ] **Standards**: All imports include the required `.js` extension.
- [ ] **Validation**: Boundary inputs are strictly validated using `zod`.
- [ ] **Result Pattern**: Business errors are returned via `Result` objects, not `throw`.

## 🚦 Verification Results
- [ ] `npm test` passed with 100% success rate.
- [ ] `npm run lint` (or type check) passed.
- [ ] Commit messages follow the Conventional Commits standard.

## 📝 Reviewer's Notes (@reviewer)
# Global Project Directives (2026)

## 🎯 1. Context & Source of Truth
- **Source of Truth**: The absolute reference for the current feature is `.github/purpose.md`. Read it before any action.
- **Reference Architecture**: Follow the patterns, file structures, and injection styles defined in `.github/reference-architecture/`.
- **Multi-Agent Flow**: 
    - Respect your specific role (Architect, Developer, Tester, Reviewer, Refactor).
    - Never modify files outside your scope.
    - If an error is found in a previous phase, stop and request a correction from the responsible agent.

## 🏗 2. Architecture & Tech Stack
- **Backend**: Node.js 24+ (Strict ESM), Native Test Runner (`node:test`, `node:assert`).
- **Frontend**: Vue.js 3 (Composition API), Vuetify 3, Vitest, Pinia.
- **Patterns**: Strict Clean Architecture (Vertical Slicing).
- **ESM Requirement**: All imports MUST include the `.js` extension, even when referencing `.ts` files (e.g., `import { Service } from './Service.js';`).
- **Async**: Top-Level Await is authorized and preferred for initialization.

## 🛠 3. Development Rules
1. **Dependency Injection**: No service/repo instantiation inside classes/functions. Inject everything via constructor or factory parameters.
2. **Circular Dependencies**: Zero tolerance. Inner layers (Domain) must never know about outer layers (Adapters).
3. **Types**: Strict TypeScript. Use `zod` for all boundary validations (API inputs, Entity creation).
4. **Signature Standard**: 
    - **Named Parameters**: Functions with >1 argument MUST use an options object.
    - **Destructuring**: Use destructuring directly in the function signature.
5. **Encapsulation**: Every sub-folder (`entities`, `use-cases`, `adapters`) MUST have an `index.ts`. External imports must only use these indices.

## 📡 4. HTTP & I/O Decoupling
- **Principle**: Controllers in `adapters/http-controllers/` must be framework-agnostic (no Koa/Express imports).
- **Mechanism**: Use the `createHttpHandler` shared helper.
- **Signature**: `async (req: HttpRequest): Promise<Result<T>>`.
- **Logic**: The controller maps the normalized `HttpRequest` to a Use Case and returns a `Result`.

## ⚠️ 5. Error Handling (Result Pattern)
- **Zero Throws**: Never use `throw` for business logic errors (e.g., "User not found").
- **System Errors**: Only use `throw` for unexpected system failures (DB down, critical bugs).
- **Implementation**: Domain/Application layers must return a `Result<T, E>` type.
- **Structure**: 
    - Success: `{ success: true, data: T }`
    - Failure: `{ success: false, error: { code: string, message: string } }`

## 🧪 6. Quality & TDD Workflow
- **TDD First**: No production code before tests, except for interface/contract definitions by the Architect.
- **Git Hooks**: Husky + Commitlint are active.
- **Validation**: Never propose a commit that fails `npm test` (except during the "RED phase" of TDD).
- **Commit Validation Script**: Refer to `.github/scripts/validate-commit.js`.

## 📝 7. Git & Commits (Conventional Commits)
When proposing a commit message, strictly follow this structure:
- **Language**: English only.
- **Header**: A single line (max 50 chars) summarizing the overall intent. Format: `<type>(<scope>)[!]: <description>`
- **Blank Line**: Mandatory.
- **Allowed Types**: 
    - `feat`: New feature/Use Case.
    - `fix`: Bug fix.
    - `test`: Tests (Node native).
    - `refactor`: Code change that neither fixes a bug nor adds a feature.
    - `style`: UI/Vuetify changes.
    - `docs`: Documentation updates.
- **Scope**: Folder name of the resource (e.g., `user`, `auth`).
- **Body**: Use bullet points for specific file changes or technical details.

**Example of expected output:**
feat(api): overhaul core architecture and error handling

* Implement API versioning in app.ts
* Decouple Koa from controllers in createHttpHandler
* Add dynamic resource loading in loadResources
* Update node engine requirements in package.json
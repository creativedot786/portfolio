# AI Engineering Rules

This project is actively developed using AI assistants (Claude, GPT, etc.). To ensure long-term maintainability, all AI agents must follow the strict constraints defined in the `.cursorrules` file located at the root of the repository.

**Key tenets:**
1. **Never Duplicate**: Always search the codebase for existing primitives before writing new ones.
2. **Follow the Design System**: Use design tokens via Tailwind. Never hardcode colors or spacing.
3. **Write Clean, Typed Code**: Strict TypeScript, no `any`, validate inputs with Zod.
4. **Architectural Consistency**: Ensure new files are placed in the correct feature or shared directory according to `ARCHITECTURE.md`.

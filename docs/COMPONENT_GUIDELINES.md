# Component Guidelines

## Engineering Standards

1. **Single Responsibility Principle (SRP)**
   - Components should do one thing well.
   - If a component handles complex state, data fetching, and large UI rendering, it should be split.

2. **Composition over Inheritance**
   - Use the `children` prop. Avoid massive configuration objects passed as props.
   - Build complex layouts by composing smaller, focused components.

3. **Strict TypeScript**
   - Define explicit prop types using interfaces or types.
   - Avoid `any`. Use `unknown` if truly generic, and validate with Zod.

4. **Size Constraints**
   - Aim for components under 300 lines of code.
   - If a component exceeds 500 lines, it MUST be refactored into smaller sub-components or custom hooks.

5. **Naming Conventions**
   - **Components**: PascalCase (e.g., `HeroSection.tsx`).
   - **Hooks**: camelCase starting with `use` (e.g., `useScrollPosition.ts`).
   - **Utilities**: camelCase (e.g., `formatDate.ts`).
   - **Types/Interfaces**: PascalCase (e.g., `CaseStudyData`).

6. **Accessibility by Default**
   - All interactive elements must be accessible via keyboard.
   - Use semantic HTML tags (`<button>`, `<a>`, `<nav>`).
   - Provide `aria-label` for icon-only buttons.

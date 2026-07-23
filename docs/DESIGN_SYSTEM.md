# Design System

This portfolio implements a token-based design system configured via Tailwind CSS v4 variables.

## Typography
- **Primary Font**: Inter Tight (loaded via `next/font/google`).
- **CSS Variable**: `--font-inter-tight`.
- **Hierarchy**: Use semantic HTML tags (`<h1>` to `<h6>`) styled via Tailwind utility classes (e.g., `text-4xl font-bold tracking-tight`).

## Colors
Colors are defined using CSS variables in `src/app/globals.css` and mapped to Tailwind utilities.

- **Background & Foreground**: `--background`, `--foreground`.
- **Brand Colors**: `--primary`, `--primary-foreground`.
- **Semantic Colors**:
  - `--destructive` for error states.
  - `--muted` for subtle backgrounds and secondary text.
  - `--accent` for highlighted interactive elements.
- **Dark Mode**: Configured via the `.dark` class in `globals.css` and managed by `next-themes`.

## Spacing & Layout
- Use Tailwind's default spacing scale (4px base).
- **Container**: Max width constrained layout (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Responsive Breakpoints**: Standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`). Never hardcode pixel widths.

## Component Primitives
- **Location**: `src/components/ui`
- **Origin**: Generated via `shadcn/ui`.
- **Usage**: Always compose these primitives. Never create one-off buttons, inputs, or cards. Use the variants defined in the components (e.g., `variant="outline"`).

## Motion
- Use `framer-motion` for complex interactions.
- Use Tailwind transition utilities (`transition-colors duration-200`) for simple hover/focus states.

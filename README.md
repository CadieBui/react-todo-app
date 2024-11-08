# Todo App

A modern Todo application built with React, TypeScript, and Vite.

## Project Structure

```
├── src/
│   ├── components/   # Reusable UI Components
│   ├── hooks/       # Custom React Hooks
│   ├── pages/       # Page Components
│   └── utils/       # Utility Functions & Helpers
├── cypress/
│   ├── e2e/        # End-to-End Tests
│   └── support/    # Test Helpers & Commands
└── public/         # Static Assets
```

## Prerequisites

- Node.js (v18.17.1 or higher)
- npm (v9.0.0 or higher)

## Quick Start

1. **Installation**

```bash
# Clone repository
git clone https://github.com/your-username/todo-app.git

# Install dependencies
npm install
```

2. **Development**

```bash
# Start development server
npm run dev
```

Access the app at `http://localhost:5173`

3. **Testing**

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

4. **Production**

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Testing:** Cypress
- **Linting:** ESLint
- **Styling:** Tailwind CSS

## ESLint Configuration

For production applications, enable type-aware lint rules:

1. Configure `parserOptions`:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

2. Update ESLint configuration:

```js
import react from "eslint-plugin-react";

export default tseslint.config({
  settings: {
    react: { version: "18.3" },
  },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

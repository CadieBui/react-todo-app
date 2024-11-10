# Todo App

A modern Todo application built with React, TypeScript, and Vite.
Url: https://cadie-react-todo-app.netlify.app/

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
├── dist/           # Production Build
├── .env            # Environment Variables
└── README.md       # This file
```

## Prerequisites

- Node.js (v18.17.1 or higher)
- npm (v9.0.0 or higher)

## Quick Start

1. **Installation**

```bash
# Clone repository
git clone https://github.com/your-username/react-todo-app.git

# Navigate to project directory
cd react-todo-app

# Install dependencies
npm install


```

2. **Environment Variables**

```bash
# Copy environment variables
cp .env.example .env
```

3. **Development**

```bash
# Start development server
npm run dev
```

Access the app at `http://localhost:5173`

4. **Testing**

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

5. **Production**

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

6. **Other**

```bash
# TypeScript check
npm run typecheck

# ESLint check
npm run lint
```

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Testing:** Cypress
- **Linting:** ESLint
- **Styling:** Tailwind CSS

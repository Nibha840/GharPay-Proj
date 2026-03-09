# Gharpayy Lead Management CRM

## Project overview

Gharpayy CRM is a focused lead management dashboard for PG / rental businesses. It helps you track leads, pipeline stages, property visits, and agent performance in a clean SaaS-style interface.

## Tech stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Local development

You will need a recent version of Node.js and npm installed (for example via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Move into the project
cd pg-lead-hub-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available on the port configured in `vite.config.ts` (by default `http://localhost:8080`).

## Building for production

```sh
npm run build
npm run preview
```

You can then deploy the generated `dist` folder to any static hosting provider that supports Vite/SPA deployments.

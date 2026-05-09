# codex-website-clone

React + Vite starter configured for GitHub Pages deployment.

## Local development

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

## GitHub Pages setup

1. In your GitHub repository settings, go to **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`; the workflow in `.github/workflows/deploy.yml` will build and deploy `dist/`.

> If you rename the repository, update `base` in `vite.config.js`.

# arsenakishev

Personal portfolio website built with React and Vite.

## Tech Stack

- **React 18** with React Router DOM for client-side routing
- **Vite 5** for bundling and development server
- **react-simple-maps** for map visualizations

## Local Development

```bash
# Install dependencies
npm install

# Start the development server (with hot module replacement)
npm run dev

# Lint the codebase
npm run lint
```

## Building for Production

```bash
# Create an optimized production build
npm run build
```

This outputs static files to the `dist/` directory. You can preview the production build locally with:

```bash
npm run preview
```

## Deployment

This project is a **static single-page application** (SPA). There is currently no automated deployment pipeline configured (no CI/CD workflows, no platform-specific config files).

### How to deploy

1. **Build** the project:
   ```bash
   npm run build
   ```
2. **Deploy** the contents of the `dist/` directory to any static hosting provider.

### Compatible hosting platforms

| Platform | Method |
|---|---|
| **Vercel** | Connect the repo and set the build command to `npm run build` and output directory to `dist` |
| **Netlify** | Connect the repo and set the build command to `npm run build` and publish directory to `dist` |
| **GitHub Pages** | Use the `gh-pages` package or a GitHub Actions workflow to publish the `dist` folder |
| **AWS S3 + CloudFront** | Upload `dist/` contents to an S3 bucket configured for static website hosting |
| **Any web server** | Serve the `dist/` folder with Nginx, Apache, or similar |

### SPA routing note

Because this app uses `BrowserRouter` (HTML5 history API), the hosting platform must be configured to redirect all requests to `index.html` so that client-side routing works correctly. For example:

- **Netlify**: Add a `public/_redirects` file with `/* /index.html 200`
- **Vercel**: Handled automatically for SPAs
- **Nginx**: Use `try_files $uri /index.html;`
- **Apache**: Use a `.htaccess` rewrite rule

# Abwriting

The website https://abwriting.net is served by a Cloudflare Worker (`wrangler.jsonc`, `worker/index.js`) from `site/`, an exact snapshot of the Hugo build Netlify published in 2021 (sources in `old_website/`). Deploy it with `npx wrangler deploy`.

The older Firebase version (`public/`, `firebase.json`) is kept for reference: https://abwriting-c3619.web.app

### Deployment

Deploy website:

```
make deploy
```

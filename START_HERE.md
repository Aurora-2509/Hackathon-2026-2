# Threadmatch — start here

This is the complete source snapshot of your website, including the trained outfit model, all 83 clothing images, database schema/migration, and API routes. Extract the ZIP and open the threadmatch folder in VS Code.

## Run on your Mac

Install Node.js 22.13 or newer. In the VS Code terminal, inside the extracted threadmatch folder:

```bash
npm install
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_right_randall_flagg.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file data/seed-clothing-images.sql
npm run dev
```

Open http://localhost:5173 in Chrome. Keep the terminal running. Apply the schema migration only once per new local database. The image seed is safe to repeat and retains existing records with the same IDs. The local database is separate from the hosted website's database. The seed uses local image paths so your images work locally.

The original pnpm lockfile is included. For installs pinned to it, use `pnpm install --frozen-lockfile` instead of `npm install` if you already have pnpm.

## Main files

- public/closet.html — page structure
- public/style.css — styling
- public/app.js — controls, catalog import, browsing, and recommendations
- public/catalog-images/ — 15 dresses, 26 shirts, 42 pants
- app/api/catalog/ — database browsing, imports, category totals, AI matches
- db/schema.ts and drizzle/ — database schema and migrations
- lib/ai/model.json — exported trained encoder, scaler, and neural weights
- lib/ai/inference.mjs — model inference
- lib/ai/metrics.json — original measured training/evaluation results
- lib/data/clothing-small-import.json — image records and source provenance
- data/seed-clothing-images.sql — local database seed

## What the AI does

The trained model compares item descriptions and original category labels. It samples up to 80 existing closet items per target category and returns the top matches. Scores are uncalibrated ranking signals. It does not recognize uploaded photos. Photos are visual references, and missing color/style labels are kept unknown.

The gated mvasil/polyvore-outfits data is not bundled. The 83 imported images come from alexeygrigorev/clothing-dataset-small, with source metadata and the repository license retained. More items can be imported through the page.

See README.md for framework and local database details, and lib/ai/README.md for the model integration.

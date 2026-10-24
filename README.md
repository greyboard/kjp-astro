# kjp-astro

Relaunch von kinder-jugendpsychiater.org auf Astro. Phase 1: Startseite, Kontakt, ADHS / ADS.
Konzept: `docs/konzept-relaunch-phase-1.md`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Ausgabe in dist/
npm run preview
```

`PUBLIC_DEMO_MODE` (siehe `.env.example`) ist standardmäßig aktiv: alle Seiten `noindex`, `robots.txt` sperrt alles.
Erst beim Go-Live auf `false` setzen. Praxisdaten zentral in `src/data/site.ts`.

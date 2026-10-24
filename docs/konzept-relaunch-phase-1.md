# Konzept: Relaunch kinder-jugendpsychiater.org auf Astro (Phase 1)

## Context

Die Praxis für Kinder- und Jugendpsychiatrie in Regensburg (Manfred Estrada Aguila, ehemals Manfred Wurstner, & Dr. Christina Islinger) läuft heute auf **TYPO3** (Apache, kein `robots.txt`, keine Sitemap, beide 404). Ziel ist ein Relaunch auf Astro, später gehostet auf dem bestehenden Cloudflare-Account des Nutzers. Repo `greyboard/kjp-astro` ist angelegt, aber leer (keine Commits).

Umfang dieses Konzepts: **Landingpage, Kontakt, eine Leistungsseite (ADHS / ADS)**. Die Leistungsseite dient als Vorlage für alle weiteren Diagnose- und Therapieseiten. Es werden **keine Accounts angelegt** (kein CF-, GitHub-, GHL- oder Tool-Account). Deploy erfolgt später durch den Nutzer bzw. mit seinem vorhandenen `wrangler`-Login.

## Ist-Befund (gemessen am 24.10.2026)

| Punkt | Befund | Bewertung |
|---|---|---|
| CMS | TYPO3 (`generator`-Meta), Assets unter `/fileadmin/` | 🟡 gelb, kein Export, Content wird gescraped |
| Host | `kinder-jugendpsychiater.org` → 301 → `https://www.` | 🟢 grün |
| robots.txt / Sitemap | beide 404 | 🔴 rot |
| Tracking | GTM `GTM-N3VF9483` auf allen Seiten | 🟡 gelb, bei Gesundheitsdaten heikel |
| Formulare | GHL-Formular `gWIs051AGGUfuDZYJcJk` („Kontaktformular“), GHL-Booking-Widget `akuipidboHSy7oZTDfX1` auf `/kontakt/erstsichtung` | 🟢 grün, werden übernommen |
| Name | Logo/Footer „Manfred Wurstner“, Title/Impressum „Manfred Estrada Aguila“ | 🔴 rot, uneinheitlich |
| Impressum | „§6 MStDV“ (falsch), Facharztbezeichnung fehlt je Arzt, Mail `m.wurstner@`, veralteter LG-Hamburg-Disclaimer | 🔴 rot, außerhalb Scope, aber vor Go-Live fixen |
| Startseite | ca. 1.100 Wörter, H1 „Willkommen auf dem Weg der Begegnung“ (kein Keyword), leeres H2, Tippfehler („Erststermin“, „Diagnosik“, „Sozialverhalten“ ohne n) | 🟡 gelb |
| ADHS-Seite | ca. 1.160 Wörter, fachlich stark, aber ICD-10/DSM-IV veraltet (aktuell ICD-11/DSM-5), keine FAQ, kein CTA | 🟡 gelb |
| Kontakt | nur 100 Wörter, Tabs Erstanmeldung / Rezept / Terminanfrage / Download, Stockfoto (pexels) | 🟡 gelb |
| Bilder | mehrere Pexels-Stockfotos, Slider-Bilder | 🟡 gelb |
| Fonts | „Great Vibes“ (Script) | Ersatz durch fontsource, lokal |

NAP (aus Bestand, belegt): Landshuter Straße 9, 93047 Regensburg · 0941 640 82 80 · Fax 0941 640 82 829 · info@kinder-jugendpsychiater.de · Praxis Mo bis Do 9 bis 17 Uhr, Fr 9 bis 16 Uhr · Telefon Mo bis Fr 9 bis 12 Uhr · seit 2004.

## Branding (Entscheidung: neuer Name + „ehemals“)

- Firmierung: **„Praxis Manfred Estrada Aguila (ehemals Manfred Wurstner) & Dr. Christina Islinger“**, Kurzform im Header „Estrada Aguila & Dr. Islinger“.
- Logo: Bildmarke (Kreise mit Augen) bleibt, Wortmarke wird als SVG mit neuem Namen neu gesetzt. Alter Name als `alternateName` im Schema und einmal sichtbar im Hero-Untertitel.
- **CI-Farben, aus Logo-PNG-Palette ausgelesen (belegt):**
  - Orange `#F07F12` (Primary, Buttons) · Amber `#FCC016` · Gelb `#F5E925` · Grün `#ACC90B`
  - Abgeleitet (Design-Entscheidung): Primary Dark `#C9650A`, Primary Light `#F59A44`, Background `#FFFCF6` (warmes Off-White), Surface `#FFFFFF`, Surface Alt `#F6F8EC` (grünlicher Hauch), Border `#E8E4DA`, Text `#2B2A26`, Text Muted `#6B675E`. Alles HEX, kein `oklch()`.
  - Orange auf Weiß erreicht kein AA für Fließtext: Orange nur für Flächen/Buttons mit dunklem Text oder für große Headlines, Links in Primary Dark.
- Typo (Design-Entscheidung, kein Font-Manual vorhanden): Headlines **Fraunces** (weich, warm, seriös), Text **Nunito Sans** (rund, passt zur Logo-Schrift). Beide via `@fontsource`, keine Google-Fonts-Requests.
- Bildsprache: die konzentrischen Logo-Kreise als wiederkehrendes Ornament (Section-Trenner, Hintergrund-Blobs), ruhige Weißräume, große Radien (24 px), Pill-Buttons. Stockfotos raus, echte Praxisfotos beim Kunden anfragen, bis dahin illustrative Kreis-Grafiken statt Pexels.

## Tech-Stack

- Astro (aktuelle Stable, Version beim Setup aus npm ermittelt), statischer Output
- Tailwind 4 über `@tailwindcss/vite`, Design-Tokens als CSS-Variablen in `src/styles/global.css`
- `@astrojs/sitemap`, eigenes `robots.txt`
- Bilder über `astro:assets` (WebP/AVIF), Fonts über fontsource
- Hosting: Cloudflare Pages (bzw. Workers Static Assets) im vorhandenen Account, Build `npm run build`, Output `dist/`. Keine Account-Anlage, Projekt wird später vom Nutzer verbunden
- Redirects in `public/_redirects`, Security-Header in `public/_headers`

## Projektstruktur

```
src/
  layouts/BaseLayout.astro      Head, SEO-Meta, JSON-LD, Header, Footer
  components/
    Header.astro  Footer.astro  Button.astro  SectionHeading.astro
    CircleOrnament.astro        Logo-Kreise als SVG-Deko
    ContactCard.astro           NAP + Zeiten, aus site-Config
    GhlForm.astro               2-Klick-Consent-Wrapper für GHL-Formular
    GhlBooking.astro            2-Klick-Consent-Wrapper für Booking-Widget
    Faq.astro                   Accordion + FAQPage-Schema
    CtaBand.astro  Breadcrumbs.astro
  data/site.ts                  NAP, Öffnungszeiten, Namen, GHL-IDs (eine Quelle)
  pages/
    index.astro
    kontakt.astro
    diagnose/adhs-ads.astro     URL bleibt identisch zur Alt-URL
    impressum.astro  datenschutzerklaerung.astro   (Pflicht, Inhalte vom Kunden)
    404.astro
public/ _redirects _headers robots.txt favicon.svg
```

## Seite 1: Landingpage `/`

Ziel: Eltern und Jugendliche sofort orientieren, Vertrauen aufbauen, zur Anmeldung führen.

- **Title:** „Kinder- und Jugendpsychiater Regensburg | Praxis Estrada Aguila & Dr. Islinger“
- **H1:** „Kinder- und Jugendpsychiatrie in Regensburg“, darunter der bestehende Claim „Willkommen auf dem Weg der Begegnung“ als Unterzeile (Tonalität bleibt)
1. **Hero:** H1, Kurztext, zwei CTAs („Ersttermin anfragen“ → `/kontakt#anmeldung`, „0941 640 82 80“ als `tel:`), Kreis-Ornament statt Slider. Kein Video, kein Karussell
2. **Für wen wir da sind:** drei Karten Eltern · Jugendliche („Du musst da nicht alleine durch“, eigener Einstieg) · Zuweiser (Kinderärzte, Schulen)
3. **Krankheitsbilder:** Raster der 10 Themen aus Bestand, ADHS verlinkt auf die neue Seite, übrige vorerst ohne Link bzw. auf Alt-URL (siehe Go-Live)
4. **Therapieangebote:** sechs Kacheln (Einzel-, Gruppen-, Familientherapie, Beratung, Elterngruppe, ärztliche Behandlung)
5. **So läuft es ab:** 4 Schritte Anmeldung → Ersttermin → Diagnostik → Therapieplan (Text aus „Ablauf Termine“, Tippfehler korrigiert)
6. **Kompetenz im Miteinander:** sozialpsychiatrisches Team seit 2004, Berufsgruppen, Netzwerk
7. **Aus der Praxis / Gedanken:** 3 Teaser (Fallbeispiele / Gedanken), deutlich gekürzt. Hinweis auf Anonymisierung (Berufsrecht, HWG)
8. **CTA-Band + Kontaktkarte:** NAP, Zeiten, Kartenlink (Google Maps nur als Link, kein Embed)

Schema: `MedicalClinic` + `Physician` (2x) mit `medicalSpecialty: Psychiatric, Pediatric`, `alternateName`, `openingHoursSpecification`, Geo mit Punkt-Dezimalen.

## Seite 2: Kontakt `/kontakt`

Ziel: alle Anliegen sauber trennen, Telefonlast senken.

- **H1:** „Kontakt und Anmeldung“
- **Kontaktkarte** oben: Telefon, Mail, Adresse, Praxis- und Telefonzeiten, Anfahrt (ÖPNV/Parken beim Kunden erfragen)
- **Anliegen-Wahl** (Anker-Tabs, ohne JS lauffähig):
  - `#anmeldung` Erstanmeldung: Ablauf + GHL-Formular `gWIs051AGGUfuDZYJcJk`
  - `#erstsichtung` Termin zur Erstsichtung: GHL-Booking `akuipidboHSy7oZTDfX1`
  - `#rezept` Rezept-Vorbestellung (nur Bestandspatienten): Formular, falls in GHL vorhanden, sonst Telefon/Mail-Hinweis
  - `#jugendliche` „Lass uns mal reden“: Kontaktformular für Jugendliche (Alt-URL `/kontakt/kontaktformular-kinder`), mit Elternhinweis aus Bestand
  - `#download` Unterlagen zum Ersttermin (PDFs aus `/fileadmin/` übernehmen, URLs beim Kunden bestätigen)
- **Notfallhinweis** gut sichtbar: in akuten Krisen 112, Kinder- und Jugendpsychiatrie-Notaufnahme (Klinik beim Kunden bestätigen), Nummer gegen Kummer 116 111
- Datenschutz: GHL-Embeds erst nach Klick laden (2-Klick-Consent), Hinweis „bitte keine ausführlichen Gesundheitsdaten ins Formular“

## Seite 3: Leistungsseite `/diagnose/adhs-ads` (Vorlage)

URL bleibt identisch, damit Bestandsrankings erhalten bleiben.

- **Title:** „ADHS bei Kindern und Jugendlichen: Diagnose und Therapie in Regensburg“
- **H1:** „ADHS und ADS bei Kindern und Jugendlichen“
- Breadcrumb Start › Diagnose › ADHS / ADS
1. **Kurzantwort-Box** (GEO/AEO): 3 bis 4 Sätze, was ADHS ist und wie die Praxis hilft
2. **Woran man ADHS erkennt:** Kernsymptome Unaufmerksamkeit, Hyperaktivität, Impulsivität als Liste, Bestandstext gestrafft, auf ICD-11/DSM-5 aktualisiert
3. **ADHS oder ADS?** kurzer Abschnitt (häufige Suchfrage)
4. **So läuft die Diagnostik bei uns:** Schritte aus „Ablauf Termine“, verlinkt auf Kontakt
5. **Behandlung:** multimodal, Elterntraining/Elterngruppe, Einzel- und Gruppentherapie, Medikation sachlich (Verweis auf Gedanken-Text „Fünf Milligramm“ bleibt)
6. **Aus der Praxis:** Teaser Fallbeispiel „Lukas, wenn Energie ihren Platz sucht“
7. **FAQ** (5 bis 7 Fragen, z. B. „Ab welchem Alter…“, „Brauche ich eine Überweisung?“, „Wie lange dauert die Diagnostik?“) mit `FAQPage`-Schema
8. **CTA-Band** Ersttermin anfragen
- Schema: `MedicalWebPage` + `MedicalCondition` (ADHS), `BreadcrumbList`
- Medizinische Inhalte vor Veröffentlichung von der Praxis fachlich freigeben lassen (E-E-A-T: Autor/Prüfer mit Facharzttitel und Datum „fachlich geprüft am“)

## Content-Vorgehen

1. Bestandstexte der drei Seiten scrapen und als Ausgangsbasis in `src/content/` bzw. direkt in die Seiten übernehmen (Tonalität der Praxis behalten, sie ist ein Alleinstellungsmerkmal)
2. **Begriffs-Audit** in einem einzigen DataForSEO-Request (Kostenregel: `kw.py volume --file keywords.txt`, vorher `--dry-run`): z. B. „kinder und jugendpsychiater regensburg“, „kinderpsychiater regensburg“, „adhs diagnose kind regensburg“, „adhs test kind“, „ads ohne hyperaktivität“, „kinderpsychologe regensburg“. Ergebnis steuert Title/H1 final; k.A. statt 0
3. Texte über `content-pipeline` (Editor + Humanizer + QA), kein Em-Dash, echte Umlaute
4. Keine Bewertungszahlen statisch einbauen

## Tracking und Datenschutz

- Psychiatrie-Praxis = besondere Kategorien nach Art. 9 DSGVO. Empfehlung: **GTM nicht 1:1 übernehmen**. Erst klären, welche Tags im Container laufen. Falls Messung nötig: Cloudflare Zaraz mit Consent, keine Tracking-Pixel auf Kontakt- und Diagnoseseiten
- Keine externen Fonts, kein Maps-Embed, GHL nur nach Klick
- Datenschutzerklärung muss GHL (LeadConnector) als Auftragsverarbeiter nennen. Inhalte vom Kunden bzw. Anwalt, nicht erfinden

## Go-Live-Hinweis (wichtig)

Die Altseite hat rund **45 interne URLs** (Diagnose 9, Therapie 6, Über uns 4, Fallbeispiele 8, Gedanken 3+, Kontakt-Unterseiten, Aktuelles). Mit nur drei neuen Seiten darf die Domain **nicht** umgestellt werden, sonst brechen alle anderen Rankings weg. Daher:

- Phase 1 läuft als Vorschau auf `*.pages.dev` mit `noindex` (über ENV-Flag `PUBLIC_DEMO_MODE`, beim Go-Live entfernen)
- Vor Go-Live: restliche Seiten nach der ADHS-Vorlage bauen **oder** vollständige Redirect-Map je Alt-URL (`bleibt` / `301` auf thematisch nächste Seite, nie pauschal `/`)
- Schon jetzt fest: `/`, `/kontakt`, `/diagnose/adhs-ads` bleiben · `/kontakt/erstsichtung` → `/kontakt#erstsichtung` · `/kontakt/kontaktformular-kinder` → `/kontakt#jugendliche` · fehlerhafter Relativlink `diagnose/kopfschmerzen/migraene` korrigieren
- GSC-Export (16 Monate) beim Kunden anfordern, damit die Map vollständig wird

## Offene Punkte beim Kunden

- Echte Fotos (Praxis, Team), Facharztbezeichnungen und Kurzvitae beider Ärzte
- Neue Wortmarke freigeben, neue Mailadresse statt `m.wurstner@`
- Impressum korrigieren (§ 18 Abs. 2 MStV statt „§6 MStDV“, Facharzttitel je Arzt, Kammer, KV), Datenschutztext
- Welche GHL-Formulare existieren (Erstanmeldung, Rezept, Jugendliche) und welche Download-PDFs aktuell sind
- Notfall-Klinik für den Krisenhinweis

## Umsetzungsschritte (nach Freigabe)

1. Astro + Tailwind 4 + sitemap im leeren Repo initialisieren, Tokens und Fonts anlegen
2. `data/site.ts`, BaseLayout, Header/Footer, Komponenten
3. Drei Seiten + Impressum/Datenschutz-Platzhalter (klar als Platzhalter markiert, `noindex`) + 404
4. Begriffs-Audit (ein Request), Texte finalisieren
5. `_redirects`, `_headers`, `robots.txt`
6. Commit auf Branch `relaunch-phase-1` (kein Push ohne Freigabe)

## Verifikation

- `npm run build` fehlerfrei, `npm run preview` und Sichtprüfung Desktop/Mobil (360 px, kein horizontales Scrollen)
- Lighthouse mobil: Performance ≥ 95, A11y 100, LCP < 2,5 s
- JSON-LD im Rich-Results-Test valide, Sitemap enthält genau die indexierbaren Seiten
- Netzwerk-Tab: keine Requests an Google Fonts/GTM/GHL vor Consent-Klick
- `grep -rc "—" src/` = 0, `grep -rniE 'TMG|Wurstner' src/` nur an gewollten Stellen („ehemals“, `alternateName`)
- Nach späterem Deploy: Skill `checking-astro-sites` und curl-Schleife über alle Alt-URLs

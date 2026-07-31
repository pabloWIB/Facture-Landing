# Facture-Landing

Landing page for an industrial services company, presenting four capabilities as a numbered sequence on one screen.

[![Live demo](https://img.shields.io/badge/demo-1234.wib.digital-2ea44f)](https://1234.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

Facture sells four things that are hard to explain together: laboratory work, engineering, production systems and 3D analysis. Listing them as service cards makes them look like four unrelated companies. This page numbers them 1 to 4 and runs them as a sequence, so the reader follows a process rather than picking from a menu.

Each step carries a label and its scope: **1 Laboratory** for discovery and industry solutions, **2 Engineering** for chemical, synthetic fibre and metal, **3 Lab Production** for racks and exhibition systems, **4 3D Projects** for analysis and product sketching. The numbering doubles as the navigation.

The page is static HTML and CSS with one small script for the mobile menu. There is no preprocessor, no package manager and no build step — the CSS in `assets/css/` is the source, edited directly.

## Features

- Four capabilities presented as a numbered sequence rather than a service grid.
- Header and mobile-menu links jump to the matching panel, which reveals its photograph via `:target` — so the navigation does the same thing with a click, a tap or a keyboard.
- Hovering a panel reveals the same photograph, under a gradient scrim that keeps white text above 4.5:1 whatever the image is doing.
- Mobile menu with scroll lock, `Escape` to close, close-on-link-click and focus returned to the toggle.
- Photography served as WebP: 244 KB for all five images, against 1.09 MB as JPEG.
- All icons are inline SVG using `currentColor`, so a single markup path covers both the light and dark states.

## Tech stack

| Layer | Technology | Version | Role in project |
|---|---|---|---|
| Markup | HTML5 | — | `index.html` and `404.html` |
| Styling | CSS3 | — | Three layers: `base.css`, `layout.css`, `components.css` |
| Design tokens | CSS custom properties | — | Colour, spacing, type and motion scales in `:root` |
| Scripting | JavaScript (vanilla) | ES2020 | 66 lines in `assets/js/main.js`, mobile menu only |
| Fonts | Inter, Tulpen One | — | Google Fonts, `preconnect` + `display=swap` |
| Images | WebP | — | Five photographs in `assets/img/content/` |

No runtime dependencies and no third-party JavaScript.

## Prerequisites

None. Open `index.html` in a browser, or serve the folder.

## Installation

```bash
git clone https://github.com/pabloWIB/Facture-Landing.git
cd Facture-Landing
npx serve .
```

Or open `index.html` directly. Both work: the script is a classic deferred script rather than an ES module, so there are no module imports to trip the `file://` origin rules, and there are no fetch calls.

## Usage

Edit the CSS in `assets/css/` directly — the three files load in order and are meant to be read in that order:

| File | Holds |
|---|---|
| `base.css` | Custom properties, reset, base typography |
| `layout.css` | Header, services grid, error page, footer |
| `components.css` | Brand, navigation, buttons, panels, mobile menu, utilities |

Design values live as custom properties in `base.css`. Changing the accent colour everywhere is one edit:

```css
:root {
  --color-accent: #dcff00;
}
```

Breakpoints are mobile-first `min-width` at 480, 768, 1024 and 1440 px. Panels stack in one column, go to two at 768 and to four at 1024.

## Project structure

```
.
├── index.html                    # The whole page
├── 404.html                      # Not-found page, links back to home
├── robots.txt                    # Allows everything except 404.html
├── sitemap.xml                   # One URL: the home page
├── assets/
│   ├── css/
│   │   ├── base.css              # Tokens, reset, base type
│   │   ├── layout.css            # Header, grid, error page, footer
│   │   └── components.css        # Brand, nav, buttons, panels, menu
│   ├── js/
│   │   └── main.js               # Mobile menu: toggle, scroll lock, Escape
│   └── img/
│       ├── content/              # One WebP per panel, plus the menu backdrop
│       └── logo/                 # favicon.png and project-icon.png
└── docs/
    ├── auditoria.md              # Pre-reorganisation audit
    └── cambios.md                # Change log, grouped by phase
```

## Deployment

Deployed on Vercel at [1234.wib.digital](https://1234.wib.digital). Static: upload the repository root as-is, no build command and no output directory. Vercel serves `404.html` for unmatched routes automatically, so no rewrite configuration is needed.

`robots.txt`, `sitemap.xml` and the canonical and Open Graph URLs all point at `https://1234.wib.digital/`. Change them together if the domain changes.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)

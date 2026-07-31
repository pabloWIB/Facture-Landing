# Auditoría técnica — FACTURE

Estado del proyecto **antes** de la reorganización.
Fecha de auditoría: 2026-07-30. Documento interno de trabajo.

---

## 1.1 Inventario de archivos

### HTML

| Archivo | `<title>` | `<h1>` | Propósito real |
|---|---|---|---|
| `index.html` | `Facture` | `FACTURE` | Única página del sitio. Landing de pantalla dividida en 4 paneles verticales (LABORATORY / ENGINEERING / LAB PRODUCTION / 3D PROJECTS). El `<h1>` es el logotipo, no el titular de la página. |

No existe ninguna otra página. No hay `404.html`.

### CSS

| Archivo | Peso | ¿Se carga? | Estado |
|---|---|---|---|
| `CSS/normalize.css` | 1,3 KB | Sí (`index.html:6`) | Normalize v8 minificado en una sola línea + añadidos propios (scrollbar rojo `#BD0003`, `img::selection`). Color huérfano: el rojo no aparece en ningún otro punto del diseño. |
| `CSS/styles.css` | 30,1 KB | Sí (`index.html:7`) | Compilado desde `styles.scss` por Prepros + Autoprefixer. Selectores generados de hasta ~8 000 caracteres. |
| `CSS/fonts.css` | 0,2 KB | Sí (`index.html:8`) | **Roto.** Ver 1.2. |
| `CSS/styles.scss` | 9,3 KB | No (fuente) | Fuente real del CSS. Anidamiento de hasta 7 niveles. |
| `CSS/prepros.config` | 15,6 KB | No | Configuración de la app Prepros. No es código del proyecto. |

### JavaScript

| Archivo | Peso | ¿Se carga? | Estado |
|---|---|---|---|
| `JS/script.js` | 0,6 KB | Sí (`index.html:11`) | 5 bloques `$(function(){…})` casi idénticos. Depende por completo de jQuery. Sin `defer`: bloquea el render. |

### Imágenes

| Archivo | Formato | Dimensiones | Peso | ¿Se usa? | Dónde |
|---|---|---|---|---|---|
| `IMG/icon.png` | PNG | 1024 × 1024 | **371 KB** | Sí | Favicon (`index.html:9`) |
| `IMG/layout.jpg` | JPEG | 498 × 746 | 209 KB | Sí | Fondo del menú móvil (`styles.css:33`) |
| `IMG/photo1.jpg` | JPEG | 450 × 668 | 221 KB | Sí | Fondo `:hover` panel 1 |
| `IMG/photo2.jpg` | JPEG | 450 × 668 | 210 KB | Sí | Fondo `:hover` panel 2 |
| `IMG/photo3.jpg` | JPEG | 450 × 668 | 220 KB | Sí | Fondo `:hover` panel 3 |
| `IMG/photo4.jpg` | JPEG | 450 × 668 | 211 KB | Sí | Fondo `:hover` panel 4 |
| `IMG/label.svg` | SVG | 48 × 48 | 250 B | Sí | Marca del logotipo |
| `IMG/burger.svg` | SVG | 48 × 48 | 174 B | Sí | Icono menú cerrado |
| `IMG/burgerOpen.svg` | SVG | 48 × 48 | 243 B | Sí | Icono menú abierto |
| `IMG/next-black.svg` | SVG | 48 × 48 | 171 B | Sí | Flecha CTA + flechas de panel |
| `IMG/next-white.svg` | SVG | 48 × 48 | 186 B | Sí | Flechas de panel (estado hover) |

Peso total de imágenes: **1,44 MB**. Ninguna imagen huérfana.

### Dependencias externas

| Dependencia | Origen | Uso real |
|---|---|---|
| jQuery 3.0.0-**beta1** slim | `cdnjs.cloudflare.com` | Solo `.hover()`, `.click()` y `.toggleClass()`. ~24 KB para tres funciones. Versión beta de 2016. |
| Tulpen One | `fonts.googleapis.com` vía `@import` | Números grandes de los paneles. Carga OK. |
| Inter | `fonts.googleapis.com` vía `@import` | **Nunca llega a cargarse.** Ver 1.2. |

### Archivos basura

Ninguno. No hay `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni duplicados con sufijo de versión.

---

## 1.2 Problemas detectados

### Críticos

| # | Problema | Evidencia |
|---|---|---|
| C1 | **`fonts.css` es CSS inválido y la fuente Inter nunca carga.** El archivo contiene declaraciones `font-family:` sueltas a nivel raíz, fuera de cualquier regla. El parser CSS las interpreta como el prelude de una regla cualificada, consume hasta EOF buscando `{`, y descarta todo lo que sigue — incluido el segundo `@import` (Inter). | `document.styleSheets` reporta **1 sola regla** en `fonts.css`. El log de red muestra petición a `family=Tulpen+One` y **ninguna** a Inter. Toda la interfaz cae al sans-serif del sistema. |
| C2 | **El README describe un proyecto que no existe.** Documenta 8 páginas HTML, 4 hojas CSS, 4 archivos JS, carpetas `assets/documents/`, `assets/downloads/` y un `LICENSE` — ninguno existe en el repo. La URL de clonado (`pabloWIB/1234.git`) tampoco es la real. | El repo real es `pabloWIB/Facture-Landing`. En disco solo hay 1 HTML, 3 CSS y 1 JS. |
| C3 | **Los 12 enlaces del sitio son `href="#"`.** Ni uno lleva a ningún destino. | `index.html:16-21` (menú móvil), `:32-35` (nav), `:39,42` (CTAs). |
| C4 | **Imagen rota en el README.** Enlace a un asset de GitHub del repo `pabloDYEL/ESTATICA-34`, que no es este proyecto. | `README.md:1` |

### Estructura y semántica

| # | Problema | Evidencia |
|---|---|---|
| E1 | Etiquetas semánticas invertidas: `<main>` contiene el menú móvil, `<nav>` contiene el contenido principal (los 4 paneles), y `<header>` aloja el `<h1>`. El contenido real de la página no está en `<main>`. | `index.html:15-22`, `:58-127` |
| E2 | Jerarquía de encabezados sin significado: `<h2>` contiene solo un dígito (`1`, `2`, `3`, `4`) y `<h3>` el texto descriptivo. El `<h1>` es la marca. | `index.html:29,61,64` |
| E3 | `<button>` sin acción: `LABORATORY`, `ENGINEERING`, `LAB PRODUCTION`, `3D PROJECTS` son botones que no hacen nada, ni tienen handler. | `index.html:62,79,96,113` |
| E4 | Flechas circulares (`.next`) con `cursor: pointer` que no son enlaces ni botones y no llevan a ningún sitio: falsa affordance. | `index.html:65-72` · `styles.css:363` |
| E5 | 9 `<div>` de envoltura sin clase ni rol, direccionados desde CSS por `:nth-child`. | `index.html:24-38` |
| E6 | Falta `<footer>`. La página termina en seco. | — |

### SEO

| # | Problema |
|---|---|
| S1 | Sin `<meta name="description">`. |
| S2 | `<title>` de 7 caracteres (`Facture`), muy por debajo del rango útil de 50-60. |
| S3 | Sin Open Graph (`og:title`, `og:description`, `og:url`, `og:type`, `og:image`). |
| S4 | Sin `<link rel="canonical">`. |
| S5 | No existen `robots.txt` ni `sitemap.xml`. |

### Accesibilidad

| # | Problema | Evidencia |
|---|---|---|
| A1 | **`a { all: unset }` elimina el foco visible de todos los enlaces.** No hay ningún `:focus` ni `:focus-visible` en todo el CSS. El sitio es inusable con teclado. | `styles.css:14-17` |
| A2 | El botón de menú es un `<div>` sin `role`, sin `aria-expanded`, sin `aria-controls` y sin acceso por teclado. | `index.html:48` |
| A3 | Área táctil del botón de menú: **30 × 30 px** (mínimo exigido 44 × 44). | Medido en 360 px. |
| A4 | `alt` genéricos y no descriptivos: `alt="Label"`, `alt="Next"` (×6), `alt="Burger"` (×2). | `index.html:27,45,50,53,67,70,…` |
| A5 | Ningún `<img>` tiene `width`/`height` → layout shift. | Los 11 `<img>`. |
| A6 | `h3 { font-weight: 100 }` a 14 px: trazo ultrafino, legibilidad pobre. | `styles.css:338-341` |
| A7 | El menú móvil no bloquea el scroll de fondo, no cierra con `Escape` y no cierra al pulsar un enlace. | Verificado: `body` queda en `overflow: visible` con el menú abierto. |
| A8 | Texto blanco sobre fotografías sin capa de contraste: el ratio depende de la zona de la imagen. | `styles.css:468-484` |

### CSS

| # | Problema | Evidencia |
|---|---|---|
| X1 | **Selectores de hasta ~8 000 caracteres** generados por anidamiento SCSS de 7 niveles combinado con listas de clases. Cuatro reglas superan los 2 000 caracteres. | `styles.css:342`, `:365`, `:381`, `:401` |
| X2 | Cero variables CSS. Colores, espaciados y tiempos repetidos literalmente por todo el archivo. | `#DCFF00`, `1.5px solid black`, `.5s` repetidos. |
| X3 | Duplicación casi íntegra del bloque `@media (max-width: 888px)` dentro de `@media (max-width: 550px)`: ~60 líneas repetidas. | `styles.css:505-591` vs `:592-693` |
| X4 | Media queries `max-width` (desktop-first) con breakpoints arbitrarios: 888 px y 550 px. | `styles.css:505,592` |
| X5 | Números mágicos: `margin-top: -15.7px`, `width: 49.7%`, `padding: 0.5px 65px`, `font-size: 13.5px`, `gap: 39px`, `border: 1.5px`. | Varios. |
| X6 | Cuatro pares de clases funcionalmente idénticas (`next`/`nextTwo`/`nextThree`/`nextFour` × `nextWhite`/`nextBlack`) que solo existen para diferenciar paneles. | `styles.css:404-467` |
| X7 | Coma sobrante al final de una lista de selectores en el SCSS (`.tabFour:hover h3,{`). | `styles.scss:333` |
| X8 | `font-size: 320px` fijo, sin reducción en móvil: cada panel mide ~1 000 px de alto en 360 px de ancho. | `styles.css:305` |
| X9 | Prefijos `-webkit-box` / `-ms-flexbox` inyectados por Autoprefixer para navegadores obsoletos: ~40 % del peso del archivo. | Todo `styles.css`. |

### JavaScript

| # | Problema | Evidencia |
|---|---|---|
| J1 | jQuery **3.0.0-beta1** (versión beta, 2016) cargada desde CDN solo para `.hover()`, `.click()` y `.toggleClass()`. | `index.html:10` |
| J2 | Cinco bloques `$(function(){…})` en lugar de uno. Cuatro son copia literal con el nombre de clase cambiado. | `script.js:1-27` |
| J3 | `e.preventDefault()` dentro de un handler de `hover`: no tiene efecto, `mouseenter`/`mouseleave` no son cancelables. | `script.js:3,10,17,24` |
| J4 | `<script>` sin `defer` en el `<head>`: bloquea el parseo del documento. | `index.html:11` |
| J5 | Sin comprobación de existencia de elementos antes de operar. | Todo `script.js` |

### Rendimiento

| # | Problema |
|---|---|
| P1 | `icon.png` pesa **371 KB a 1024 × 1024** usado como favicon. Es el **86 % del peso de la primera carga**. |
| P2 | Las 4 fotos pesan ~215 KB cada una a 450 × 668 px, y se estiran a pantalla completa como `background-size: cover`. Resolución insuficiente y peso excesivo a la vez. |
| P3 | Fuentes cargadas con `@import` dentro de CSS (encadena peticiones) en vez de `<link>` + `preconnect`. Sin `font-display` controlado desde el proyecto. |
| P4 | Tres peticiones CSS separadas donde caben menos. |

### Contenido de relleno heredado

| # | Problema |
|---|---|
| R1 | Enlaces «Home page», «About us», «Portafolio», «Download», «Solutions», «Get Started»: rótulos de plantilla sin destino ni contenido detrás. |
| R2 | «Portafolio» está escrito en castellano dentro de una página declarada `lang="en"`. |

### Enlaces, imágenes y recursos rotos

- Enlaces rotos a archivos inexistentes: **0** (todos son `#`, que no apunta a ningún archivo pero tampoco a uno que falte).
- Imágenes rotas (`src` sin archivo en disco): **0**.
- CSS/JS referenciados que no existen: **0**.
- Reglas CSS duplicadas: bloque completo de media query repetido (X3).
- HTML duplicado entre páginas: no aplica (una sola página).

### Credenciales

Revisado `index.html`, `styles.css`, `styles.scss`, `normalize.css`, `fonts.css`, `script.js` y `prepros.config`: **no hay credenciales, tokens ni API keys**.

---

## 1.4 Resumen

1. **Qué es**: una landing de una sola página para una marca industrial ficticia, «FACTURE», resuelta como pantalla dividida en cuatro paneles verticales numerados que revelan una fotografía al pasar el cursor. Es un ejercicio de maquetación e interacción, no un sitio con contenido de negocio.
2. **Cómo está**: el diseño funciona y tiene personalidad propia (amarillo ácido, tipografía condensada enorme, retícula de cuatro columnas), pero el código está en estado de borrador: HTML sin semántica, CSS compilado con selectores de 8 000 caracteres y JavaScript que arrastra jQuery beta para tres llamadas.
3. **Lo más grave**: el `README.md` documenta un proyecto entero que no existe — ocho páginas, cuatro hojas de estilo, carpetas de documentos y catálogos, y una URL de clonado equivocada. Cualquiera que lo lea antes de abrir el repo se encuentra otra cosa.
4. **Lo segundo más grave**: `fonts.css` es sintácticamente inválido y por eso Inter nunca se descarga; todo el sitio se está viendo con la tipografía por defecto del sistema, no con la que el diseño pide.
5. **Lo tercero**: `a { all: unset }` sin ninguna regla `:focus` deja el sitio sin indicador de foco, y los doce enlaces apuntan a `#`. No se puede navegar con teclado ni llegar a ningún sitio con ratón.

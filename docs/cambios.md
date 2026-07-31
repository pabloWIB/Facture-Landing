# Registro de cambios — FACTURE

Reorganización completa del proyecto, agrupada por fase.
Fecha: 2026-07-30. Estado de partida documentado en [`auditoria.md`](auditoria.md).

**Ningún comando de git fue ejecutado.** Todos los cambios son locales.

---

## Fase 1 — Auditoría

- Inventariados 1 HTML, 5 archivos CSS, 1 JS, 11 imágenes y 3 dependencias externas.
- Documentados 41 problemas en `docs/auditoria.md`, clasificados en críticos, estructura, SEO, accesibilidad, CSS, JS, rendimiento y contenido de relleno.
- Verificado que no había credenciales, archivos basura, imágenes huérfanas ni rutas rotas en disco.

## Fase 2 — Estructura

- Creado el árbol `assets/{css,js,img}`, `docs/`.
- `CSS/` → `assets/css/`, dividido en `base.css`, `layout.css` y `components.css`.
- `JS/script.js` → `assets/js/main.js`.
- `IMG/` → `assets/img/{content,logo}/`, con nombres semánticos en minúsculas:

  | Antes | Después |
  |---|---|
  | `IMG/photo1.jpg` | `assets/img/content/laboratory.webp` |
  | `IMG/photo2.jpg` | `assets/img/content/engineering.webp` |
  | `IMG/photo3.jpg` | `assets/img/content/lab-production.webp` |
  | `IMG/photo4.jpg` | `assets/img/content/3d-projects.webp` |
  | `IMG/layout.jpg` | `assets/img/content/menu-background.webp` |
  | `IMG/icon.png` | `assets/img/logo/project-icon.png` + `favicon.png` |
  | `IMG/label.svg`, `burger.svg`, `burgerOpen.svg`, `next-*.svg` | SVG en línea dentro del HTML |

- Actualizadas todas las rutas en HTML y CSS. Verificado que no queda ninguna referencia a `CSS/`, `IMG/` ni `JS/`.
- No se creó `assets/css/pages/` ni `assets/js/modules/`: con una sola página y 66 líneas de JS habrían quedado vacías o con un solo archivo.

## Fase 3 — Higiene

- Eliminados tras confirmar que ningún archivo los referencia:
  - `CSS/normalize.css` — normalize v8 minificado más añadidos huérfanos de otro proyecto (scrollbar `#BD0003`). Sustituido por un reset moderno dentro de `base.css`.
  - `CSS/styles.css` — 30 KB de CSS compilado con selectores de hasta 8 000 caracteres.
  - `CSS/styles.scss` — fuente Sass del anterior; el CSS pasa a escribirse a mano.
  - `CSS/fonts.css` — CSS inválido (ver fase 5).
  - `CSS/prepros.config` — 15,6 KB de configuración de una app de escritorio, no código del proyecto.
  - `JS/script.js` — reescrito como `assets/js/main.js`.
  - Los 6 SVG y los 5 JPEG/PNG originales, ya sustituidos.
- Creado `.gitignore` para stack estático: `node_modules/`, `.env*`, `*.log`, metadatos de sistema operativo, carpetas de editor y salidas de Prepros.
- Formato normalizado: indentación de 2 espacios (sin tabuladores), comillas dobles en HTML, punto y coma en JS, salto de línea final en todos los archivos. Verificado por script.
- **No se encontraron credenciales, tokens ni API keys** en ningún archivo, ni antes ni después.

## Fase 4 — Imágenes

- Las 5 fotografías convertidas a WebP con calidad 90 (`-strip`, `method=6`). Comprobadas visualmente contra los originales: sin degradación apreciable.

  | Archivo | Antes | Después |
  |---|---|---|
  | `laboratory` | 221 KB | 35,5 KB |
  | `engineering` | 210 KB | 63,2 KB |
  | `lab-production` | 220 KB | 39,0 KB |
  | `3d-projects` | 211 KB | 34,0 KB |
  | `menu-background` | 209 KB | 66,8 KB |
  | **Total** | **1 071 KB** | **238 KB** |

- No se conservan los JPEG: no se declara ningún fallback, y WebP tiene soporte universal en los navegadores objetivo.
- `icon.png` (1024 × 1024, 371 KB) reducido a `project-icon.png` (512 × 512, paleta de 64 colores, fondo blanco opaco, 16,8 KB) y `favicon.png` (32 × 32, 1,6 KB). El original pesaba el 86 % de la primera carga.
- No se redimensionaron las fotografías: a 450 × 668 ya están por debajo de su contenedor, y ampliarlas habría sido inventar píxeles.
- **No hay ningún elemento `<img>` en el sitio.** Las fotografías son fondos CSS y los iconos son SVG en línea, así que `width`/`height`/`loading`/`alt` no aplican. Los SVG decorativos llevan `aria-hidden="true"`; la única imagen expuesta a terceros (`og:image`) lleva `og:image:alt` descriptivo.

## Fase 5 — HTML, SEO y accesibilidad

**Semántica**

- Corregida la inversión de etiquetas: el contenido real pasa a `<main>`; el menú móvil, que ocupaba `<main>`, pasa a un `<nav>` propio; los cuatro paneles, que estaban en `<nav>`, pasan a `<article>` dentro de `<section>`.
- Añadido `<footer>`, que no existía.
- Jerarquía de encabezados reconstruida: un solo `<h1>` descriptivo (oculto visualmente, el diseño no tiene titular visible) y un `<h2>` por panel. Antes el `<h1>` era el logotipo y los `<h2>` contenían un dígito suelto.
- Los `<button>` que no hacían nada pasan a ser los `<h2>` de cada panel, con el mismo aspecto de píldora.
- Eliminados 9 `<div>` de envoltura sin función; el CSS ya no direcciona por `:nth-child`.

**Enlaces**

- Los 12 `href="#"` se sustituyen por destinos reales: 4 anclas internas a los paneles (× 2, cabecera y menú móvil) y el repositorio del proyecto.
- Eliminados «Home page», «About us», «Portafolio» y «Download»: no existía ninguna página detrás. «Portafolio» además estaba en castellano dentro de una página `lang="en"`.
- «Solutions» y «Get Started» eliminados por el mismo motivo; el CTA principal pasa a ser «View source», con destino real.

**SEO**

- `<title>` de 7 → 57 caracteres, único por página (50 en `404.html`).
- Añadida `<meta name="description">` única por página (155 y 156 caracteres).
- Añadidos Open Graph completos y `<link rel="canonical">`.
- Creados `robots.txt` y `sitemap.xml` con la URL real del sitio.
- Creado `404.html` con enlace de vuelta al inicio y `noindex`.

**Accesibilidad**

- Sustituido `a { all: unset }` (que eliminaba el foco de todo el sitio) por un `:focus-visible` de 3 px. La variable `--color-focus` se redefine por contexto —negro sobre la barra amarilla, amarillo sobre fondos oscuros— para que el anillo contraste siempre.
- El botón de menú pasa de `<div>` a `<button>` con `aria-expanded`, `aria-controls` y `aria-label` que cambia de estado.
- Área táctil del botón de menú: 30 × 30 → 44 × 44 px.
- Añadido enlace «Skip to services» visible al recibir foco.
- Eliminado `font-weight: 100` en texto de 14 px.
- Añadida capa de contraste sobre las fotografías (ver fase 6).
- El menú móvil recibe `inert` mientras está cerrado, con lo que sale del orden de tabulación y del árbol de accesibilidad.

## Fase 6 — CSS y sistema de diseño

- Extraídas a `:root` las variables de color, espaciado, tipografía, radios, bordes y transiciones. La paleta se deriva de la identidad que el sitio ya tenía —amarillo ácido `#dcff00`, negro y blanco—; no se inventó ninguna.
- Descartados dos colores huérfanos que no pertenecían al diseño: `#345665` (selección) y `#BD0003` (scrollbar).
- Escala de espaciado de 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 px. Eliminados los números mágicos `-15.7px`, `49.7%`, `0.5px 65px`, `13.5px` y `39px`.
- Dos familias tipográficas, las mismas de antes: Tulpen One para los números, Inter para la interfaz.
- **Longitud máxima de selector: 8 000 → 60 caracteres. Profundidad máxima: 7 → 2 niveles.** Verificado por script: 0 selectores de más de 3 niveles sobre 99.
- Eliminado el bloque de media query duplicado (~60 líneas repetidas entre 888 px y 550 px).
- Sin `!important` salvo los dos del bloque `prefers-reduced-motion`, donde es el uso estándar.
- Sin estilos en línea. Orden dentro de cada archivo: variables → reset → base → layout → componentes → utilidades → media queries.

## Fase 7 — Responsive

- Invertido a mobile-first: `max-width: 888px / 550px` → `min-width: 480 / 768 / 1024 / 1440`.
- Retícula: 1 columna → 2 en 768 px → 4 en 1024 px. Los separadores se dibujan con un `gap` de 1 px sobre fondo negro, así que funcionan en las tres disposiciones sin reglas de borde por caso.
- El número del panel pasa de `font-size: 320px` fijo a `clamp()` por breakpoint. Antes cada panel medía ~1 000 px de alto en un móvil de 360 px.
- Verificado sin scroll horizontal en 360, 480, 768, 1024 y 1440 px (`scrollWidth` ≤ `innerWidth`, sin elementos desbordando).
- Áreas táctiles: botón de menú 44 × 44 px, enlaces del menú móvil 62 px de alto.
- Menú móvil: abre, cierra, bloquea el scroll de fondo, se cierra al pulsar un enlace y con `Escape`, y devuelve el foco al botón. También se cierra solo al pasar a escritorio, que antes dejaba la página bloqueada.

## Fase 8 — UX / UI

- Un solo CTA principal por pantalla, con destino real.
- Estados completos en todo elemento interactivo: `default`, `hover`, `focus-visible` y `active`, con transiciones de 150–250 ms. No se añadió `:disabled` porque no hay ningún control deshabilitado en el sitio.
- Las anclas de navegación revelan la fotografía del panel mediante `:target`, de modo que los enlaces hacen algo visible también en escritorio, donde los cuatro paneles ya están a la vista.
- Ancho de línea limitado a 65 caracteres en los bloques de texto.
- Sin formularios: el proyecto no tenía ninguno y no se ha inventado. No hay ningún servicio al que conectarlo.

## Fase 9 — JavaScript

- **jQuery 3.0.0-beta1 eliminado.** Era la única dependencia externa y se usaba solo para `.hover()`, `.click()` y `.toggleClass()`.
- Los 5 bloques `$(function(){…})` casi idénticos se reducen a un único `main.js` en IIFE, sin variables globales y sin `var`.
- Se comprueba la existencia de los tres elementos necesarios antes de operar; si falta alguno, el script sale sin error (por eso `404.html` no lo carga).
- Eliminados los `e.preventDefault()` dentro de handlers de `hover`, que no tenían efecto: `mouseenter`/`mouseleave` no son cancelables.
- El realce de las flechas al pasar el cursor, que se hacía por JS, ahora es CSS puro (`:hover` sobre el panel).
- Consola limpia en las dos páginas, en `http://` y en `file://`.

## Fase 10 — Rendimiento

- **Primera carga: ~430 KB → ~261 KB** (más las dos fuentes). Objetivo de 1 MB cumplido con holgura; antes, al recorrer los cuatro paneles se superaba 1,3 MB.
- Eliminada la petición a jQuery desde CDN. Cero JavaScript de terceros.
- Eliminadas 5 peticiones de iconos SVG al pasarlos a línea.
- Fuentes: `@import` encadenado dentro de CSS → `<link>` con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`, y `display=swap`.
- El script se carga con `defer`; antes bloqueaba el parseo desde el `<head>`.
- Tres archivos CSS, igual que antes, pero divididos por función en vez de por accidente.

## Fase 11 — QA

Verificado uno por uno, con el sitio servido y abierto desde disco:

| Comprobación | Resultado |
|---|---|
| Cada enlace del menú y del pie lleva a un destino que existe | 9 anclas internas resueltas, 3 externas |
| Cada ruta de imagen corresponde a un archivo real | 7 rutas, todas presentes |
| Cada `<link>` y `<script>` apunta a un archivo que existe | 4 por página, todos 200 |
| Cero errores en consola | index y 404, en `http://` y `file://` |
| Sin scroll horizontal | 360 / 480 / 768 / 1024 / 1440 px |
| Menú móvil funciona en las dos direcciones | Botón, enlace, `Escape` y cambio de breakpoint |
| Formularios validan y responden | No aplica: no hay formularios |
| Sin «Lorem ipsum», «TODO» ni texto de plantilla | Búsqueda automática, 0 coincidencias |
| Ninguna imagen rota | 0 elementos `<img>`; los 5 fondos WebP cargan |
| `title` y `description` únicos por página | index y 404, distintos |
| `404.html` existe y enlaza al inicio | Sí |
| Sin credenciales en el código | Confirmado |

Contraste medido, no estimado: se comprobó el brillo real de las cuatro fotografías en la zona que ocupa el texto. Con la capa original de `0.35` el texto blanco se quedaba en **3,15:1** sobre las zonas más claras. Se subió el degradado a `0.55 → 0.75`, que garantiza **≥ 4,74:1 incluso sobre un píxel blanco puro**.

## Fase 12 — Documentación

- `README.md` actualizado. Se conserva la estructura y el tono del que ya había en el repositorio y se corrige todo lo que la reorganización dejó obsoleto: stack, prerrequisitos, comandos, árbol de archivos y notas de despliegue.
- Creado este `docs/cambios.md`.

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente desde disco y con servidor local. Funciona en ambos. Con `serve` se comprobaron las 15 rutas del sitio: todas responden 200.
- Nota de entorno, ajena al proyecto: en esta máquina `npx serve` falla con `MODULE_NOT_FOUND`. Quedan lanzadores obsoletos de `serve` (septiembre de 2024) en `%AppData%\npm` apuntando a un paquete ya desinstalado, y `npx` los encuentra en el `PATH` antes de descargar nada. Con una versión explícita (`npx serve@14.2.4 .`) funciona sin problema. No se ha tocado la instalación global de npm.
- El script se deja como script clásico y no como módulo ES precisamente para que `file://` siga funcionando; un `type="module"` habría fallado por las reglas de origen de `file:`.
- Sin rutas absolutas de la máquina. Todas las rutas internas son relativas y en minúsculas.
- **No se creó ningún archivo de configuración de hosting.** Vercel sirve `404.html` automáticamente en sitios estáticos y no hay build ni rewrites que declarar.
- No se ejecutó ningún despliegue.

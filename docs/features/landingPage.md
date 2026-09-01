# 🏠 Landing page — Documentación técnica

## Resumen

Página pública (`/landing`) que ve cualquier visitante **no logueado** en
`stocko.com` que llegue a ese link (campañas, redes, etc.). La raíz (`/`)
ya no es la landing: para un visitante no logueado no coincide con ninguna
ruta propia y cae en el catch-all de `AuthRoutes` (`path="*"`), que
redirige a `/login` — así que `/` sigue siendo, en la práctica, la entrada
directa a la app.

Objetivo: presentar Stocko y ofrecer dos caminos claros:

- **Iniciar sesión / crear kiosco** → versión web (`/login`, `/register`).
- **Descargar la app de escritorio** → sección de descarga con instaladores
  reales para Windows (`Stocko-Windows.exe`, NSIS) y Linux (`.deb`/
  `.AppImage`), descargados directo del último release de GitHub
  (`STOCKO_WINDOWS_DOWNLOAD_URL`, `STOCKO_LINUX_DEB_DOWNLOAD_URL`,
  `STOCKO_LINUX_APPIMAGE_DOWNLOAD_URL` en `src/config/constants.ts`). Cada
  nombre de asset se fija con `artifactName` en `electron-builder.yml` para
  que el link `releases/latest/download/<nombre>` nunca se rompa entre
  releases. macOS todavía no está publicado.

## Rutas

| Ruta        | Antes         | Ahora                              |
|-------------|---------------|-------------------------------------|
| `/`         | `LoginPage`   | sin match propio → redirige a `/login` (catch-all de `AuthRoutes`) |
| `/landing`  | (no existía)  | `LandingPage`                      |
| `/login`    | (no existía)  | `LoginPage`                        |

`src/router/AppRouter.tsx` monta `LandingRoutes()` junto a `AuthRoutes()`
cuando el usuario no está autenticado. `AuthRoutes` ya redirigía enlaces
internos (ej. `CheckEmailContent`) a `/login`, así que ese cambio también
corrige un link que antes no coincidía con ninguna ruta.

## Estructura

```
src/modules/landing/
  pages/LandingPage/
    LandingPage.tsx              → compone Navbar + Hero + Features + Download + Footer
    components/                  → un componente por responsabilidad (solo presentación)
  helpers/                       → datos puros (features, nav links, targets de descarga, accent color)
  routes/LandingRoutes.tsx

src/hooks/landing/
  useLandingNavigation.ts        → goToLogin / goToRegister / goToJoinKiosco
  useScrollToSection.ts          → scroll suave a secciones de la propia página

src/typings/landing/
  landingTypes.ts, landingComponentTypes.ts, landingEnums.ts
```

`LandingPage` fuerza `darkTheme` (vía `ThemeProvider` de `@emotion/react`)
independientemente del modo claro/oscuro elegido por el usuario, ya que es
una página de marca que no depende de preferencias de la app autenticada.
Todos los colores salen de `theme.custom` — no hay hex inventados.

### Fondos: hero con imagen, resto en blanco

`getLandingBackgroundPatterns.ts` expone dos helpers:

- `getHeroBackgroundImageSx(theme)` → fondo del Hero (imagen de marca
  `public/images/backgroundImages/background-landing.png`, `cover`).
- `getWhiteSectionBackgroundSx(theme)` → fondo `theme.palette.common.white`
  para Features y Download, marcando la transición de color violeta → blanco.

`LandingWaveDivider.tsx` dibuja el SVG decorativo (onda) reutilizado en
cada transición de color: al pie del Hero (hacia la primera feature) y al
pie de cada `LandingFeatureShowcaseBand.tsx` (hacia la feature siguiente,
o hacia el blanco de Download en la última). Recibe `fillColor` — nunca
hardcodea un color — así cada instancia se funde con la sección que sigue.
También recibe `variant` (número): `getLandingWavePath.ts` guarda varios
patrones de curva distintos y cicla entre ellos según el índice de la
band, para que las ondas no se repitan todas iguales a lo largo de la
página. La onda no es un `fill` plano: un `<clipPath>` la recorta con la
forma curva y, dentro, un `<rect>` con `feTurbulence` (mismos parámetros
que `getNoisyBackgroundSx`: `baseFrequency 0.85`, `numOctaves 3`,
`feColorMatrix saturate 0`, `mixBlendMode screen`) le suma la misma
textura noisy que usan las bands — un `background-image` CSS tileado no
se puede recortar a una forma curva, por eso el ruido se genera nativo
dentro del propio SVG. Los ids de `clipPath`/`filter` se generan con
`useId()` (sanitizado sin `:`) para que dos instancias en la misma página
no se pisen.

`LandingHeroPreviewImage.tsx` muestra, sobre un halo radial (`theme.palette.primary.main`
difuminado con `blur`), la captura del panel de Stocko
(`images/backgroundImages/Stocko_representation.png`) con la mascota de
Stocko superpuesta abajo a la izquierda (`LandingHeroMascotImage.tsx`,
`images/stocko_images/stocko-mascot.png`, puramente decorativa,
`aria-hidden`). Ambas imágenes son estáticas, sin animación.
`LandingHeroContent.tsx` ya no tiene badge ni subtítulo: el título va
seguido directo de `LandingHeroBenefits.tsx`, una lista de 4 beneficios
(ícono de check + texto) que trae `getLandingHeroBenefits.ts`.
`LandingHeroBadge.tsx` se eliminó por quedar sin uso.

### Bands de features: cada feature ocupa toda su sección con su color

`LandingFeaturesSection.tsx` ya no tiene un fondo propio: renderiza una
`LandingFeatureShowcaseBand.tsx` por feature, una detrás de otra, sin
espaciado entre ellas — cada band es full-bleed (ocupa todo el ancho, con
bastante padding vertical — `paddingBlock` 4.5em/7.5em — para dar aire
entre una feature y la siguiente) y usa
`getLandingFeatureBandBackgroundColor(theme, accent)` (en
`getLandingFeatureBandBackgroundColor.ts`) para teñir la base oscura común
(`#1f1c2c`) con el color de acento propio de esa feature, vía CSS
`color-mix()`, pasado como `backgroundColor` a `getNoisyBackgroundSx`. El
resultado: el color de cada feature ocupa todo el espacio disponible de su
sección (sin blanco de por medio) en vez de limitarse a una card.
`getLandingFeatureBandNextFillColor.ts` resuelve, para cada índice, el
color de la band siguiente (o el blanco de Download si es la última) que
recibe el `LandingWaveDivider` al pie de cada band.

`LandingFeatureShowcaseRow.tsx` es puro layout apilado (una columna, sin
fondo ni borde propios — el color vive en la band que lo envuelve) que
compone, de arriba a abajo:

1. `LandingFeatureShowcaseHeader.tsx` — badge + título + descripción + línea
   de ahorro, en una fila que alterna de lado según `reverse` en md+ y se
   apila en mobile. El badge (`LandingFeatureShowcaseBadge.tsx`, ej.
   "Proveedores") es el título de la sección: se muestra grande, en el color
   de acento de la feature y con opacidad baja, como un rótulo de fondo
   antes del título real. `LandingFeatureShowcaseSaves.tsx` sólo dibuja la
   línea "Te ahorra: …", con el ícono y el texto en `theme.palette.success.main`.
2. `LandingFeatureShowcaseMedia.tsx` — el video a todo el ancho del
   contenedor (ya no comparte fila con el texto), sin más decoración que
   `LandingFeatureShowcaseMediaWatermark.tsx` (el isotipo de Stocko, fijo
   abajo a la derecha del marco).
3. `LandingFeatureShowcaseItems.tsx` — grilla de 3 columnas (1 en mobile)
   de `LandingFeatureShowcaseItemCard.tsx` (ícono + label + detail); es el
   reemplazo del viejo listado de bullets. Cada `LandingFeatureShowcaseItem`
   (en `landingTypes.ts`) trae `items: LandingFeatureShowcaseGridItem[]`
   con `labelKey`/`detailKey` propios y un `savesKey` para la línea de
   ahorro del header. Igual que antes, si algún item trae `isClickable`
   (hoy sólo "Permisos por rol" de multiKiosco) se renderiza como botón
   accesible y dispara `RolesPermissionsDialog` — la lógica de abrir/cerrar
   ese diálogo sigue viviendo en `LandingFeatureShowcaseRow.tsx`.

### Download/Recursos: cards de sistema operativo + botón del hero

El CTA "Descargar" del Hero (`LandingHeroCtaButtons.tsx`) ya no es un
no-op: usa `useScrollToSection` para llevar al usuario a
`#landing-download` — la misma sección a la que apunta el link "Recursos"
del nav — porque ahí viven los botones reales de descarga por sistema
operativo.

`LandingDownloadOsCard.tsx` es la card por SO: fondo blanco
(`theme.palette.common.white`), badge cuadrado violeta con un ícono
genérico de app arriba a la izquierda, el logo del SO (`WindowsLogoIcon` /
`LinuxLogoIcon`) grande y pálido (`theme.custom.lightGray`) como decoración
de fondo arriba a la derecha, nombre + descripción del SO, un botón de
descarga (`variant="contained"` si `target.isPrimary`, si no
`variant="outlined"` — Windows es el target primario) y un triángulo
violeta ("flag") recortado en la esquina inferior izquierda vía
`border`. `getDesktopDownloadTargets.ts` agrega `descriptionKey` e
`isPrimary` a cada `DesktopDownloadTarget`.

`LandingDownloadTrustRow.tsx` + `getLandingDownloadTrustPoints.ts` arman
la fila de 3 puntos de confianza bajo las cards (seguro y confiable,
instalación rápida, actualizaciones automáticas), cada uno con ícono +
título + subtítulo.

`LandingDotGridDecoration.tsx` dibuja el patrón de puntos decorativo a los
costados de la sección (`radial-gradient` con `theme.palette.primary.main`
a baja opacidad, recortado con `mask-image` para que se desvanezca hacia
el centro) — puramente decorativo, `aria-hidden`, oculto en mobile.

## Pendiente / fuera de alcance

- Publicación real de instaladores por sistema operativo (hoy los 3
  botones de descarga apuntan a la misma página de releases).
- Sección de precios: se omitió a propósito para no inventar valores de
  negocio; si se define un modelo de precios, agregar `landing.pricing.*`
  en `src/i18n/locales/{es,en}.ts` y un nuevo item de nav.

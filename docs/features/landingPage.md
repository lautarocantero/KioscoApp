# 🏠 Landing page — Documentación técnica

## Resumen

Página pública (`/`) que ve cualquier visitante **no logueado** en `stocko.com`.
Antes, `/` renderizaba directamente `LoginPage`; ahora `/` es una landing de
producto y el login se movió a `/login`.

Objetivo: presentar Stocko y ofrecer dos caminos claros:

- **Iniciar sesión / crear kiosco** → versión web (`/login`, `/register`).
- **Descargar la app de escritorio** → sección de descarga con los 3
  instaladores (Windows/macOS/Linux), hoy apuntando a la página de
  releases de GitHub (`STOCKO_RELEASES_URL` en `src/config/constants.ts`)
  hasta que exista publicación automática de builds de Electron.

## Rutas

| Ruta      | Antes      | Ahora         |
|-----------|------------|---------------|
| `/`       | `LoginPage`| `LandingPage` |
| `/login`  | (no existía)| `LoginPage`  |

`src/router/AppRouter.tsx` monta `LandingRoutes()` junto a `AuthRoutes()`
cuando el usuario no está autenticado. `AuthRoutes` ya redirigía enlaces
internos (ej. `CheckEmailContent`) a `/login`, así que este cambio también
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

## Pendiente / fuera de alcance

- Publicación real de instaladores por sistema operativo (hoy los 3
  botones de descarga apuntan a la misma página de releases).
- Sección de precios: se omitió a propósito para no inventar valores de
  negocio; si se define un modelo de precios, agregar `landing.pricing.*`
  en `src/i18n/locales/{es,en}.ts` y un nuevo item de nav.

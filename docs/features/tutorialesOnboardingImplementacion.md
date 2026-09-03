# Sistema de tutoriales de onboarding — implementación

> Continúa el relevamiento de [`tutorialesOnboarding.md`](tutorialesOnboarding.md). Documenta el motor genérico y su aplicación a las 8 pantallas del relevamiento: `/select-kiosco`, `/shop`, `/products`, `/products/:id/presentations`, `/new-sell`, `/providers`, `/sellers`, `/receipts`.

## Diseño de referencia

El patrón visual viene de un mock de diseño entregado por el usuario (overlay oscuro + spotlight + dock con mascota y globo de texto abajo a la derecha, claro/oscuro, ES/EN). Todos sus colores (`--bg`, `--lbg`, `--cardBg`, `--font`, `--dw`, `--dg`, `--primary`, `--white`, `--errLight`) son 1:1 los tokens que ya existen en `src/theme/mainTheme.ts` — la implementación no inventó ningún color nuevo. La mascota no tiene nombre propio: el paso de bienvenida dice "¡Bienvenido a Stocko!" (referencia a la app), nunca "Hola, soy Stocko" (no se personifica a la mascota).

## Arquitectura

```
StokoApp.tsx
  └── TutorialProvider (context, engine)
        ├── AppRouther
        │     ├── KioscoRoutes (fuera de AppShell)
        │     │     └── KioscoSelectorPage → useAutoStartTutorial + KioscoSelectorHeaderBar → TutorialHelpButton (embebido)
        │     └── AppShell (sidebar)
        │           ├── TutorialHelpButton (genérico, autorresuelto por ruta)
        │           └── <rutas internas: Shop/Products/Presentations/NewSell/Providers/Sellers/Receipts → useAutoStartTutorial>
        └── TutorialOverlay (lazy, global, 1 sola instancia)
```

- **Estado**: `useTutorialEngine` (`src/hooks/tutorial/useTutorialEngine.ts`) — paso activo, running/finished, rect medido. Vive en Context (`TutorialContext`/`TutorialProvider`, mismo patrón que `ProductDialogContext`), no en Redux: es UI efímera de sesión, no dato de dominio.
- **Persistencia de "ya visto"**: `localStorage`, una key por tutorial (`TUTORIAL_SEEN_STORAGE_KEY_PREFIX` en `src/config/constants.ts` + `getTutorialSeenStorageKey`), mismo patrón que `ACTIVE_KIOSCO_STORAGE_KEY`.
- **Targets — tres formas, según qué renderiza el elemento**:
  1. **Ya tiene un `id` de DOM estable** (ej. atajos de teclado de `/new-sell`: `SELL_SEARCH_INPUT_ID`, `SELL_BARCODE_TOGGLE_ID`, `PRODUCTS_EXHIBITOR_ANCHOR_ID`, `CART_GENERATE_TICKET_BUTTON_ID` en `src/config/constants.ts`) → el step apunta directo a `'#ese-id'`, sin tocar ningún componente.
  2. **Es un botón "crear X" armado vía `DataTable`'s `newItem`** (`ProductsListPage`, `PresentationListPage`, `ProvidersListPage`, `SellersListPage`) → `DataTableNewItemConfig` (`src/typings/ui/dataTable.types.ts`) tiene un campo `targetId?: string`, que `DataTableToolbar.tsx` aplica como `data-tutorial-target` en el `Button` (nativo de MUI, si reenvía `data-*`). Alcanza con pasar `newItem={{ ..., targetId: "mi-id" }}` en la página.
  3. **Cualquier otro elemento propio de la página** (`Box`, `PrimaryButtonComponent`, etc., sin `id` ni paso por `DataTable`) → se envuelve con `<TutorialTarget targetId="...">` (`display:"contents"`, no afecta layout), necesario porque `PrimaryButtonComponent`/`OutlinedButtonComponent` no reenvían `data-*`. O, si el elemento ya es un `Box`/nativo (ej. la zona de drag&drop de `ReceiptUploadArea`), alcanza con agregarle `data-tutorial-target="..."` directo.
- **Presentación**: `TutorialOverlay`, montado una única vez y lazy en `StokoApp.tsx`. Lee todo de `useTutorialContext()`.
- **Trigger manual**: `TutorialHelpButton`, en dos modos — embebido (`tutorialId`/`steps` explícitos, usado en `KioscoSelectorHeaderBar` porque `/select-kiosco` no vive dentro de `AppShell`) o genérico (sin props, autorresuelto por ruta vía `useCurrentRouteTutorial` + `TUTORIAL_ROUTE_REGISTRY`, usado en `AppShell` junto a `NotificationsBell`).
- **Auto-inicio**: `useAutoStartTutorial(tutorialId, steps, ready)`, llamado directo en cada página tutorial-enabled. `ready` se ata al loader propio de la página cuando existe (`!isPageLoading`); si la página no tiene loader propio (`/new-sell`, `/receipts`), `ready` es simplemente `true` — el shell de esos dos casos monta siempre, ningún target del tutorial depende de un fetch.
- **Rutas dinámicas**: `useCurrentRouteTutorial` matchea con `matchPath` de `react-router-dom` (no comparación exacta de string), porque `/products/:product_id/presentations` es una ruta con parámetro — el registro (`TUTORIAL_ROUTE_REGISTRY`) usa la misma sintaxis `:param` que las rutas reales de la app.

## Cómo agregar el tutorial de una pantalla nueva

Usando `/shop` como referencia (`src/modules/shop/tutorial/shopTutorialSteps.ts`, `src/modules/shop/pages/Shop/ShopPage.tsx`, `src/modules/shop/components/ShopMascotPanel.tsx`):

1. **Definir los steps**: un archivo `src/modules/<dominio>/tutorial/<dominio>TutorialSteps.ts` — un array estático de `TutorialStep[]` si ningún paso depende de un dato runtime, o un hook `use<Dominio>TutorialSteps()` si sí (ej. `useSellersTutorialSteps`/`useShopTutorialSteps`, que filtran un paso según `isAdmin`). IDs de target descriptivos y namespaceados por pantalla (ej. `"products-create"`, no `"create"` a secas, para no chocar entre pantallas).
2. **Agregar el `TutorialIdEnum`**: nueva entrada en `src/typings/tutorial/enums.ts`.
3. **Marcar los targets reales**: la forma correcta depende del elemento — ver las 3 formas descriptas arriba. Si el elemento tiene su propio loading/skeleton independiente del gate de página (como pasa con los KPIs de `/shop`, o con el botón "Generar ticket" de `/new-sell` que no existe hasta que el carrito tiene algo), apuntar a un contenedor estable en vez de a un texto puntual, o aceptar que el step se muestre sin spotlight (el motor tolera targets ausentes: cae a scrim-only, no rompe).
4. **Textos i18n**: agregar el bloque `tutorial.<dominio>.steps.*` en `src/i18n/locales/es.ts` y `en.ts` (título + cuerpo por paso), usando la sección correspondiente de [`tutorialesOnboarding.md`](tutorialesOnboarding.md) como base de redacción. El paso de bienvenida nunca personifica a la mascota (no tiene nombre propio) — referenciar la app/pantalla, no "soy Stocko".
5. **Auto-inicio**: llamar `useAutoStartTutorial(TutorialIdEnum.X, steps, ready)` directo en el `.tsx` de la página, **antes** de cualquier `return` temprano de loader (reglas de hooks).
6. **Trigger manual**:
   - Si la pantalla vive dentro de `AppShell` (la mayoría): agregar una entrada a `TUTORIAL_ROUTE_REGISTRY` (`src/modules/shared/tutorial/tutorialRouteRegistry.ts`) — el ícono de ayuda de `AppShell` la recoge sola, sin tocar la pantalla.
   - Si vive fuera de `AppShell` (como `/select-kiosco`): agregar `<TutorialHelpButton tutorialId={...} steps={...} />` embebido en su header.
7. **Tests y docs**: test de los steps si tienen lógica condicional (ver `sellersTutorialSteps.test.tsx`), assertion de `data-tutorial-target` en el test del componente que los porta cuando aplica, y una entrada nueva en `docs/components/`/`docs/hooks/` si se crea algún archivo nuevo reutilizable.

## Estado por pantalla

| Pantalla | `TutorialIdEnum` | Steps | Targets |
|---|---|---|---|
| `/select-kiosco` | `SelectKiosco` | 3 | `EmptyStateCard`/`KioscoEmptyState` (`data-tutorial-target` directo) |
| `/shop` | `Shop` | 5–6 (admin-gated) | `TutorialTarget` sobre `ShopMascotPanel`/`ShopDailyHeroCard`/`ShopAttentionPanel` |
| `/products` | `Products` | 2 | `DataTable.newItem.targetId` |
| `/products/:id/presentations` | `Presentations` | 2 | `DataTable.newItem.targetId` (ruta dinámica, `matchPath`) |
| `/new-sell` | `NewSell` | 5 | `id`s estables ya existentes (atajos F2/F9) |
| `/providers` | `Providers` | 2 | `DataTable.newItem.targetId` |
| `/sellers` | `Sellers` | 1–2 (admin-gated) | `DataTable.newItem.targetId` |
| `/receipts` | `Receipts` | 2 | `data-tutorial-target` directo en la zona de drag&drop |

Las 8 pantallas del relevamiento están cubiertas. Cualquier pantalla nueva que se agregue a la app en el futuro sigue los 7 pasos de arriba.

## Ver también

- [tutorialesOnboarding.md](tutorialesOnboarding.md) — relevamiento original (dónde hace falta cada tutorial y qué debe enseñar).
- [TutorialOverlay](../components/TutorialOverlay.md), [TutorialTarget](../components/TutorialTarget.md), [TutorialHelpButton](../components/TutorialHelpButton.md), [DataTableToolbar](../components/DataTableToolbar.md)
- [useTutorialEngine](../hooks/tutorial/useTutorialEngine.md), [useAutoStartTutorial](../hooks/tutorial/useAutoStartTutorial.md), [useCurrentRouteTutorial](../hooks/tutorial/useCurrentRouteTutorial.md)

# KioscoSelectorPage — Documentación

## ¿Para qué sirve?

Pantalla `/select-kiosco`: el usuario logueado elige a qué kiosco entrar. Rediseño "2a" (grilla + buscador): header (saludo + conteo + título), buscador, grilla de kioscos (o estado vacío si no tiene ninguno), y barra inferior con marca/usuario/idioma/tema/logout. Puramente presentacional — toda la lógica (fetch, búsqueda, entrar a un kiosco) llega resuelta desde `useKioscoSelector`.

## Composición

```tsx
<KioscoSelectorPage>
  <KioscoSelectorHeaderBar />
  {/* saludo + conteo + título + subtítulo */}
  {!isEmpty && <SearchBar ... />}
  {isEmpty ? <KioscoEmptyState /> : <KioscoGrid ... />}
</KioscoSelectorPage>
```

- `KioscoSelectorHeaderBar` va primera, arriba de todo (marca, usuario, idioma, tema, logout).
- `isEmpty` (cero kioscos) reemplaza buscador + grilla por `KioscoEmptyState` — no tiene sentido buscar si no hay nada que buscar.
- `KioscoGrid` siempre renderiza `AddKioscoCard` primera, y muestra `KioscoNoResults` si la búsqueda no matchea nada.

## Hook

Toda la orquestación vive en `useKioscoSelector` (`src/hooks/kiosco/useKioscoSelector.ts`): fetch de kioscos, filtrado por búsqueda, flujo de "entrar a un kiosco".

También llama `useAutoStartTutorial(TutorialIdEnum.SelectKiosco, selectKioscoTutorialSteps, ready)`, con `ready = !isPageLoading && isEmpty` — el tutorial de "crear o unirme a un kiosco" solo tiene sentido (y solo tiene sus targets en el DOM) cuando se muestra `KioscoEmptyState`. Ver [tutorialesOnboardingImplementacion.md](../features/tutorialesOnboardingImplementacion.md).

## Piezas

- [AddKioscoCard](AddKioscoCard.md)
- [KioscoGrid](KioscoGrid.md)
- [KioscoCard](KioscoCard.md)
- [KioscoEmptyState](KioscoEmptyState.md)
- [KioscoNoResults](KioscoNoResults.md)
- [KioscoSelectorHeaderBar](KioscoSelectorHeaderBar.md)
- `SearchBar` (`src/modules/shared/components/SearchBar/SearchBar.tsx`) — reusado, no específico de kiosco.

## Ver también

- [docs/hooks/kiosco/useKioscoSelector.md](../hooks/kiosco/useKioscoSelector.md)
- [docs/features/multiKiosco.md](../features/multiKiosco.md)

## Tests

Cobertura por pieza: `useKioscoSelector.test.ts`, y los tests de cada componente listado arriba. La página en sí no tiene test propio (composición pura, sin lógica adicional).

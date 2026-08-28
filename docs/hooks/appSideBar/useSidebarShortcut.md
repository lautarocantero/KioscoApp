# `useSidebarShortcut`

Hook de React que registra el atajo global de teclado "V" → Vender.

## Para qué sirve

`Vender` es el único punto de entrada al catálogo (`/new-sell`) y debe poder activarse desde cualquier sección con la tecla `V`, salvo que el usuario esté escribiendo en un campo. Se usa desde `useAppSidebar`, así que el atajo queda activo mientras el sidebar está montado (siempre).

## Firma

```ts
useSidebarShortcut(onSell: () => void): void
```

## Comportamiento

- Escucha `keydown` en `window` mientras el componente que lo usa está montado.
- Dispara `onSell` con `v` o `V`, sin importar el estado de Bloq Mayús.
- Se ignora si hay `Ctrl`/`Cmd`/`Alt` presionado, o si el foco está en un `input`, `textarea`, `select` o un elemento `contentEditable`.
- Limpia el listener al desmontar.

## Ejemplo

```tsx
// hooks/useAppSidebar.ts
const handleSellClick = useCallback(() => navigate("/new-sell"), [navigate]);
useSidebarShortcut(handleSellClick);
```

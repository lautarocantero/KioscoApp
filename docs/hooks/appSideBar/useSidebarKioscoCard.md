# `useSidebarKioscoCard`

Hook de React que arma los datos de la tarjeta "Tienda activa" del panel del sidebar.

## Para qué sirve

Combina `useActiveKiosco` (kiosco activo) y `useKioscoSelector` (listado + selección de kiosco, mismo hook que usa `KioscoSelectorPage`) y le suma el estado local de "lista desplegada" que necesita `SidebarKioscoCard` para expandirse al tocarla. No duplica el fetch ni la lógica de selección — ambas ya existen.

## Firma

```ts
useSidebarKioscoCard(): {
  activeKiosco: KioscoWithStats | null;
  kioscos: KioscoWithStats[];
  loading: boolean;
  error: string | null;
  entering: string | null;
  isListOpen: boolean;
  toggleList: () => void;
  handleSelect: (kiosco: KioscoWithStats) => void;
}
```

## Ejemplo

```tsx
// components/SidebarKioscoCard.tsx
const { activeKiosco, kioscos, isListOpen, toggleList, handleSelect } = useSidebarKioscoCard();
```

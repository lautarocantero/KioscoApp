# AddKioscoCard — Documentación

## ¿Para qué sirve?

Primera tarjeta de la grilla de `/select-kiosco` (mockup "2a"): agrupa los dos caminos para sumar un kiosco — "Crear un nuevo kiosco" y "Unirme a un kiosco existente" — bajo un título común. Siempre se renderiza primera, sin importar cuántos kioscos tenga el usuario ni el resultado de la búsqueda.

Reutiliza `KioscoSelectorActionRow` sin cambios de lógica — antes vivía como dos filas sueltas al pie de la página, ahora vive dentro de esta tarjeta.

## Props (`AddKioscoCardProps`)

```ts
interface AddKioscoCardProps {
  onCreate: () => void;
  onJoin: () => void;
}
```

- No conoce rutas: quien la usa (`KioscoGrid` / `KioscoSelectorPage`) decide a dónde navega cada acción.

## Ejemplo de uso

```tsx
<AddKioscoCard
  onCreate={() => navigate("/create-kiosco")}
  onJoin={() => navigate("/join-kiosco")}
/>
```

## Ver también

- [KioscoSelectorActionRow](KioscoSelectorActionRow.md)
- [KioscoGrid](KioscoGrid.md)

## Tests

`src/modules/kiosco/test/components/AddKioscoCard.test.tsx`

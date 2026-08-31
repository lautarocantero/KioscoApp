# 🪝 `useHorizontalScrollArrows`

> Reemplaza la scrollbar nativa de una fila horizontal por flechas de navegación.

## 🎯 ¿Para qué sirve?

Da un `ref` para colgar en el contenedor con `overflow-x: auto`, y expone si hay contenido oculto a la izquierda/derecha (`canScrollLeft`/`canScrollRight`) más dos funciones para desplazarse un paso fijo (`scrollLeft`/`scrollRight`, 160px, `behavior: "smooth"`).

## 📦 Firma

```ts
useHorizontalScrollArrows(itemCount: number): {
  scrollRef: RefObject<HTMLDivElement | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}
```

`itemCount` fuerza el recálculo cuando la lista cambia (ej. categorías que llegan async y agrandan el `scrollWidth` del contenedor después del primer render).

## 💡 Ejemplo

```tsx
const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useHorizontalScrollArrows(list.length);

<Box sx={{ display: "flex" }}>
  {canScrollLeft && <IconButton onClick={scrollLeft}><ChevronLeftIcon /></IconButton>}
  <Box ref={scrollRef} sx={{ overflowX: "auto", "&::-webkit-scrollbar": { display: "none" } }}>...</Box>
  {canScrollRight && <IconButton onClick={scrollRight}><ChevronRightIcon /></IconButton>}
</Box>
```

## ✨ Notas

- Escucha `scroll` (en el contenedor) y `resize` (en `window`) para mantener `canScrollLeft`/`canScrollRight` al día — el consumidor solo tiene que ocultar la scrollbar nativa vía CSS (`scrollbarWidth`/`::-webkit-scrollbar`), el hook no lo hace por él.
- También convierte la rueda vertical del mouse en scroll horizontal mientras el cursor está sobre el contenedor (solo si hay overflow y el gesto es predominantemente vertical, para no pisar un trackpad que ya manda `deltaX`). El listener es nativo (`addEventListener` con `passive: false`), no un `onWheel` de JSX — React registra los `onWheel` como passive por default, así que `preventDefault()` ahí no frena el scroll de la página.

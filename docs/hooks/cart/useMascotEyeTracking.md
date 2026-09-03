# 🪝 `useMascotEyeTracking`

> Hace que los ojos de la mascota del carrito sigan al mouse dentro de un rango acotado.

## 🎯 ¿Para qué sirve?

Escucha `mousemove` a nivel de `window` y calcula, en base al centro del
contenedor referenciado (`containerRef`), un desplazamiento `{x, y}` clampeado
a un rango fijo (12px en X, 60% de eso en Y) para trasladar el `<g>` de los
ojos dentro de `CartMascotFace`. El listener se limpia al desmontar.

## 📦 Firma

```ts
useMascotEyeTracking(): {
  containerRef: RefObject<HTMLDivElement | null>;
  eyeOffset: { x: number; y: number };
}
```

- `containerRef`: se asigna al contenedor de la bolsa (el mismo elemento que
  recibe la animación de `useCartClearAnimation`); si todavía no está
  montado, el movimiento del mouse se ignora.

## 💡 Ejemplo

```tsx
const { containerRef, eyeOffset } = useMascotEyeTracking();

<Box ref={containerRef}>
  <CartMascotFace eyeOffset={eyeOffset} opacity={faceOpacity} />
</Box>
```

## Tests

- `src/hooks/cart/test/useMascotEyeTracking.test.ts`

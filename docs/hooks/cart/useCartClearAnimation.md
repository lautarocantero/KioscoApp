# 🪝 `useCartClearAnimation`

> Anima la "bolsa" del carrito al vaciarla: sale deslizándose y vuelve a entrar vacía.

## 🎯 ¿Para qué sirve?

Envuelve el vaciado real del carrito (`onClear`, típicamente `handleClearCart`
de `useCart`) con una animación de reemplazo: la bolsa se desliza hacia la
derecha y se desvanece (0.34s), recién ahí dispara `onClear`, y vuelve a
entrar vacía desde el mismo lado (0.42s). Ignora triggers repetidos mientras
la animación está en curso, y limpia los timeouts pendientes al desmontar.

## 📦 Firma

```ts
useCartClearAnimation(onClear: () => void): {
  bagStyle: { transform: string; opacity: number; transitionDuration: string };
  triggerClear: () => void;
}
```

## 💡 Ejemplo

```tsx
const { bagStyle, triggerClear } = useCartClearAnimation(handleClearCart);

<Box sx={{ ...bagStyle, transition: "transform, opacity" }}>
  {/* bolsa completa */}
</Box>

<CartHeaderComponent itemsCount={cart.length} onClearCart={triggerClear} />
```

## Tests

- `src/hooks/cart/test/useCartClearAnimation.test.ts`

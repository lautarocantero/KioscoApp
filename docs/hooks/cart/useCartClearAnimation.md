# 🪝 `useCartClearAnimation`

> Anima "la mano agarra la bolsa" al vaciar el carrito o al confirmar una venta.

## 🎯 ¿Para qué sirve?

Máquina de estados de 4 fases (`CartBagAnimationPhase`) que envuelve el
vaciado real del carrito con una animación: la mano aparece y las asas se
aprietan (`grab`, 380ms), la bolsa sale de cuadro junto con la mano
(`lift`, 520ms) — recién ahí dispara `onCleared` —, y la bolsa cae de
nuevo ya vacía (`back`, 500ms) antes de volver a `idle`. Ignora triggers
repetidos mientras la animación está en curso, y limpia los timeouts
pendientes al desmontar.

`onCleared` se pasa por invocación (no en el hook), así el mismo hook sirve
tanto para "Vaciar" (`onCleared = handleClearCart`) como para "Generar
ticket" (`onCleared` puede ser un no-op, porque el vaciado real ya lo hace
`generateTicket` vía Redux).

## 📦 Firma

```ts
useCartClearAnimation(): {
  phase: CartBagAnimationPhase;
  bagStyle: { transform: string; opacity: number; transitionDuration: string };
  handStyle: { transform: string; opacity: number };
  handlesStyle: { transform: string };
  runBagAnimation: (onCleared: () => void) => void;
}
```

## 💡 Ejemplo

```tsx
const { bagStyle, handStyle, handlesStyle, runBagAnimation } = useCartClearAnimation();

<Box sx={{ ...bagStyle, transition: `transform ${bagStyle.transitionDuration} cubic-bezier(.4,0,.2,1), opacity ${bagStyle.transitionDuration} ease` }}>
  <CartHandGrab style={handStyle} />
  <Box sx={{ transform: handlesStyle.transform, transition: "transform 0.3s ease" }}>
    <CartBagHandles />
  </Box>
  {/* bolsa completa */}
</Box>

<CartHeaderComponent itemsCount={cart.length} onClearCart={() => runBagAnimation(handleClearCart)} />
```

## Tests

- `src/hooks/cart/test/useCartClearAnimation.test.ts`

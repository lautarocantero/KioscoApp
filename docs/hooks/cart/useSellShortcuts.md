# 🪝 `useSellShortcuts`

> Atajos de teclado globales de `/new-sell`.

## 🎯 ¿Para qué sirve?

Registra un único listener de `keydown` en `document` mientras el componente que lo llama está montado:

- `/` — enfoca el buscador de presentaciones (`SELL_SEARCH_INPUT_ID`), salvo que ya se esté escribiendo en otro campo editable.
- `F2` — click programático sobre el toggle del lector de código de barras (`SELL_BARCODE_TOGGLE_ID`); el propio `useSellbarBarcode` ya enfoca el input al abrirse.
- `F9` — click programático sobre el botón "Generar ticket" (`CART_GENERATE_TICKET_BUTTON_ID`); no-op si está deshabilitado.

## 📦 Firma

```ts
useSellShortcuts(): void
```

No recibe parámetros ni retorna nada — apunta a sus targets por `id` de DOM (mismo patrón que `PRODUCTS_EXHIBITOR_ANCHOR_ID`/`goToCart`), así no hace falta pasar refs entre el header y el carrito.

## 💡 Ejemplo

```tsx
const NewSellPage = () => {
  useSellShortcuts();
  return (/* ... */);
};
```

## ✨ Notas

- Los ids target viven en `config/constants.ts` (`SELL_SEARCH_INPUT_ID`, `SELL_BARCODE_TOGGLE_ID`, `CART_GENERATE_TICKET_BUTTON_ID`).
- `F2` es un toggle (mismo click que el usuario haría a mano) — presionarlo dos veces cierra el input de nuevo.

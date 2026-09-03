# 🧩 `TutorialTarget`

> Wrapper presentacional que marca un elemento real como target de un paso de tutorial (`data-tutorial-target`), sin afectar su layout.

## 📦 Props

`TutorialTargetProps` (`src/typings/tutorial/props.ts`):

- `targetId: string` — debe coincidir con el `target` del [`TutorialStep`](../features/tutorialesOnboardingImplementacion.md) correspondiente (`'[data-tutorial-target="..."]'`).
- `children` — el elemento real a marcar.

## 🎯 ¿Para qué sirve?

`PrimaryButtonComponent`/`OutlinedButtonComponent` (los botones compartidos del proyecto) no reenvían props `data-*` al `<Button>` de MUI. En vez de tocar esos dos componentes — usados en decenas de lugares — se envuelve puntualmente el botón/elemento a resaltar con `TutorialTarget`, que solo agrega el atributo vía un `Box` con `display: "contents"` (no genera caja propia: no cambia el layout del padre, flex/grid tratan a los hijos como si el wrapper no existiera).

## 💡 Ejemplo

```tsx
// ShopMascotPanel.tsx
<TutorialTarget targetId="shop-new-sale">
  <PrimaryButtonComponent buttonText={t("shop.mascot.actions.newSale")} buttonOnClick={onNewSale} />
</TutorialTarget>
```

## Tests

Cubierto indirectamente por `src/modules/shop/test/components/ShopMascotPanel.test.tsx` y `src/modules/kiosco/test/components/KioscoEmptyState.test.tsx` (assertions de `data-tutorial-target` presente/ausente).

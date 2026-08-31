# 🧰 `sortCategoriesAlphabetically`

> Ordena categorías de presentación por su label ya traducido — no por el valor crudo del enum (`PresentationCategory`).

## 📦 Firma

```ts
sortCategoriesAlphabetically(
  categories: PresentationCategory[],
  getLabel: (category: PresentationCategory) => string
): PresentationCategory[]
```

No muta el array de entrada. Usa `localeCompare` con `sensitivity: "base"` (ignora mayúsculas/acentos al comparar).

## 💡 Ejemplo

```ts
sortCategoriesAlphabetically([PresentationCategory.Bakery, PresentationCategory.Dairy], (c) => t(`presentationCategory.${c}`));
// [Dairy, Bakery] — "Lácteos" antes que "Panadería"
```

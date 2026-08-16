# 🪝 `useCategoriesData`

> Hooks de React que devuelven los datos (value/subtitle) mostrados en cada tarjeta del menú de Categorías.

## 🎯 ¿Para qué sirve?

Expone tres hooks — `useCategoriesListLinkData`, `useCategoriesCreateLinkData`, `useCategoriesEditLinkData` — cada uno con el dato a mostrar en la tarjeta correspondiente de `CategoriesPage`. Hoy son valores fijos (`TODO: reemplazar por fetch real cuando el backend esté listo`), mismo patrón que `useAccountLinksData`.

## 📦 Firma

```ts
useCategoriesListLinkData(): LinkDataResult   // { value: "12", subtitle: "12 categorías registradas" }
useCategoriesCreateLinkData(): LinkDataResult // { subtitle: "Nueva categoría de productos" }
useCategoriesEditLinkData(): LinkDataResult   // { subtitle: "Modificá una categoría existente" }
```

## 💡 Ejemplo de uso

```ts
import { useCategoriesListLinkData } from "../../hooks/categories/useCategoriesData";

const { value, subtitle } = useCategoriesListLinkData();
```

En la práctica no se llaman directamente — `useLinksData.ts` las asocia a cada link por `url` (ver [docs/hooks/categories/useLinksData.md](./useLinksData.md)).

## Tests

`src/hooks/categories/test/useCategoriesData.test.ts`

# 🪝 `useCategoriesLinks`

> Hook de React que arma la lista de links del menú de Categorías, asociando a cada uno su hook de datos.

## 🎯 ¿Para qué sirve?

Toma `CategoriesNavLinks` (config estática en `src/config/Links.tsx`) y le agrega a cada entrada el hook (`useData`) que resuelve su value/subtitle dinámico, usando `useCategoriesData`. Es la fuente de links que consume `CategoriesPage`.

## 📦 Firma

```ts
useCategoriesLinks(): OptionLink[]
```

- No recibe parámetros.

## 💡 Ejemplo de uso

```ts
import { useCategoriesLinks } from "../../hooks/categories/useLinksData";

const links = useCategoriesLinks();
// cada link trae su propio `useData` para pedir el value/subtitle
```

## ⚙️ Cómo asocia cada hook

```ts
const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/categories-list": useCategoriesListLinkData,
  "/categories-create": useCategoriesCreateLinkData,
  "/categories-edit": useCategoriesEditLinkData,
};
```

Mismo patrón que `useAccountLinks` (ver [docs/hooks/account/useLinksData.md](../account/useLinksData.md)).

## Tests

`src/hooks/categories/test/useLinksData.test.ts`

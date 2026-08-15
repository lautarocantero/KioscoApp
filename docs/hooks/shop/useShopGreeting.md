# 🪝 `useShopGreeting`

> Hook de React que arma el saludo personalizado de `/shop` con el nombre real del usuario logueado.

## 🎯 ¿Para qué sirve?

Lee `name` del store de `auth` (mismo dato que ya usa `useSidebarUserData` para el sidebar) y arma el string de saludo (`"¡Hola, {name}! 👋"`). Si todavía no hay nombre cargado (login en curso, refresh), devuelve un saludo genérico en vez de dejar el título vacío.

## 📦 Firma

```ts
useShopGreeting(): { greeting: string; isLoading: boolean }
```

## 💡 Ejemplo

```tsx
// modules/shop/pages/Shop/ShopPage.tsx
import { useShopGreeting } from "../../../../hooks/shop/useShopGreeting";

const { greeting } = useShopGreeting();
// greeting: "¡Hola, Lautaro! 👋"
```

## ✨ Beneficios

- ✅ **Dato real**, no un saludo hardcodeado como tenía el viejo `HomePage`.
- 🔁 Mismo selector (`state.auth.name`) que ya usa el sidebar — no duplica lógica de autenticación.

# 🪝 `useLogout`

> Hook de React standalone para cerrar sesión: despacha el logout y navega a `/`.

## 🎯 ¿Para qué sirve?

Encapsula el flujo mínimo de logout (`dispatch(startLogout())` + `navigate("/")`) para pantallas que necesitan un botón de "Cerrar sesión" sin arrastrar el resto de la lógica de `useAppSidebar` (paneles, atajos, nav links). Usado por `KioscoSelectorHeaderBar`.

## 📦 Firma

```ts
useLogout(): UseLogoutReturn

interface UseLogoutReturn {
  handleLogout: () => Promise<void>;
}
```

- No recibe parámetros.
- `handleLogout` despacha `startLogout()` (limpia el estado de auth) y navega explícitamente a `/` — sin el `navigate`, el usuario queda en la URL protegida en la que estaba.

## 💡 Ejemplo

```tsx
const { handleLogout } = useLogout();

<button onClick={handleLogout}>Cerrar sesión</button>
```

## Tests

`src/hooks/auth/test/useLogout.test.ts`

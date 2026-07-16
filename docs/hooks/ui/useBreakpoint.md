# 🪝 `useBreakpoint`

> Hook de React para detectar el breakpoint activo del tema de Material UI.

## 🎯 ¿Para qué sirve?

Provee el breakpoint actual (`xs`, `sm`, `md`, `lg`, `xl`) para usar en componentes responsivos.

## 📦 Firma

```ts
useBreakpoint(): Breakpoint
```

- No recibe parámetros.
- Devuelve el breakpoint activo.

## 💡 Ejemplo

```tsx
import { useBreakpoint } from "../../hooks/ui/useBreakpoint";

function ResponsiveLabel() {
  const bp = useBreakpoint();

  return <p>Breakpoint actual: {bp}</p>;
}
```

## ✨ Beneficios

- 📱 **Facilita la UI responsiva**.
- 🔧 **Abstrae la lógica de `useMediaQuery`**.
- ✅ **Permite comportamiento condicional por tamaño**.

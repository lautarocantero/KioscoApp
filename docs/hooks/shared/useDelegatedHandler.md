# 🪝 `useDelegatedHandler`

> Hook de React para memorizar funciones con `useCallback`, evitando recrearlas en cada render.

## 🎯 ¿Para qué sirve?

Cuando pasas funciones como props a componentes hijos, React las recrea en cada render — aunque no cambien. Esto puede provocar renders innecesarios.

`useDelegatedHandler` resuelve esto envolviendo tu función en `useCallback` de forma simple y semántica.

## 📦 Firma

```ts
useDelegatedHandler(fn, deps): fn
```

- **`fn`** — la función que querés memorizar
- **`deps`** — dependencias; si cambian, la función se regenera
- Devuelve la misma función, pero memorizada (referencia estable)

## 💡 Ejemplo

```tsx
import React, { useState } from "react";
import { useDelegatedHandler } from "./useDelegatedHandler";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = useDelegatedHandler(() => {
    setCount((prev) => prev + 1);
  }, [setCount]);

  return (
    <div>
      <p>Valor: {count}</p>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}
```

## ✨ Beneficios

- ⚡ **Referencias estables** — evita renders innecesarios en hijos que reciben callbacks como props.
- 📖 **Más legible** — encapsula `useCallback` en un hook con nombre claro y semántico.
- ♻️ **Reutilizable** — mismo patrón para delegar funciones en cualquier componente.
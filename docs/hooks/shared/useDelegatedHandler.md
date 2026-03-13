# 📄 Documentación: `useDelegatedHandler`

## Descripción
`useDelegatedHandler` es un **custom hook de React** que permite **delegar funciones y memorizarlas** utilizando `useCallback`.  
Su propósito es evitar recreaciones innecesarias de funciones en cada renderizado, garantizando estabilidad en las referencias y mejorando el rendimiento de componentes que dependen de callbacks.

---

## Firma

```ts
function useDelegatedHandler<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
  deps: React.DependencyList
): (...args: Args) => Return
```

## Ejemplo de uso

```tsx
import React, { useState } from "react";
import { useDelegatedHandler } from "./useDelegatedHandler";

function Counter() {
  const [count, setCount] = useState(0);

  // Delegamos y memorizamos el handler
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

Beneficios ✨

Estabilidad de referencias: evita renders innecesarios en componentes hijos que reciben callbacks como props.

Legibilidad: encapsula la lógica de useCallback en un hook semántico.

Reutilización: facilita delegar funciones en múltiples componentes con un patrón consistente.

# 🪝 `useErrorParser`

> Hook de React para parsear errores de API y guardar un mensaje amigable en estado.

## 🎯 ¿Para qué sirve?

Convierte errores genéricos o de red en mensajes de error legibles y los mantiene en estado local, con la posibilidad de limpiarlos cuando ya no son necesarios.

## 📦 Firma

```ts
useErrorParser(defaultFallbackMessage?: string): UseErrorParserReturn
```

- **`defaultFallbackMessage`** — mensaje opcional que se usa si el error no puede parsearse.
- Devuelve el mensaje actual, una función para parsear errores y otra para limpiar el mensaje.

## 💡 Ejemplo

```tsx
import { useErrorParser } from "../../hooks/shared/useErrorParser";

function Form() {
  const { message, parseError, clearError } = useErrorParser("Algo salió mal");

  const submit = async () => {
    try {
      await saveData();
    } catch (error) {
      await parseError(error);
    }
  };

  return (
    <div>
      {message && <p className="error">{message}</p>}
      <button onClick={submit}>Enviar</button>
      <button onClick={clearError}>Borrar</button>
    </div>
  );
}
```

## ✨ Beneficios

- 🧠 **Centraliza el parseo de errores** de API.
- 🪄 **Convierte errores crudos en mensajes legibles**.
- 🧼 **Permite limpiar el estado** cuando ya no se necesita.
- 📦 **Facilita la reutilización** en múltiples formularios y componentes.

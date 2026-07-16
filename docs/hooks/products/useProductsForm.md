# 🪝 `useProductCreate` / `useProductEdit`

> Hooks de React para manejar los formularios de creación y edición de productos.

## 🎯 ¿Para qué sirve?

Agrupan la lógica de pasos, validación, envío y errores para crear o editar productos.

## 📦 Firma

```ts
useProductCreate(): UseProductsFormReturn
useProductEdit(): UseProductsEditFormReturn
```

- No reciben parámetros.
- Devuelven el estado del proceso, errores, pasos y handlers de navegación y submit.

## 💡 Ejemplo

```tsx
import { useProductCreate } from "../../hooks/products/useProductsForm";

function ProductCreatePage() {
  const { currentStep, totalSteps, handleNextStep, handleSubmit } = useProductCreate();

  return (
    <div>
      <p>Paso {currentStep + 1} de {totalSteps}</p>
      <button onClick={handleNextStep}>Siguiente</button>
      <button onClick={() => handleSubmit(formValues)}>Crear</button>
    </div>
  );
}
```

## ✨ Beneficios

- 📦 **Encapsula la lógica de formularios** en hooks reutilizables.
- 🧼 **Maneja los pasos y validaciones** por separado.
- 🧠 **Usa `useErrorParser` para mensajes consistentes**.
- ✅ **Reduce complejidad en la UI**.

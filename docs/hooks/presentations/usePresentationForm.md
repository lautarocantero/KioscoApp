# 🪝 `usePresentationCreate` / `usePresentationEdit`

> Hooks de React para manejar el flujo de creación y edición de presentaciones.

## 🎯 ¿Para qué sirve?

Agrupa la lógica de formulario por pasos, validaciones, submit y control de errores para crear o editar presentaciones.

## 📦 Firma

```ts
usePresentationCreate(): UsePresentationFormReturn
usePresentationEdit(): UsePresentationEditFormReturn
```

- No reciben parámetros.
- Devuelven el estado del proceso, errores, pasos y handlers para avanzar o enviar el formulario.

## 💡 Ejemplo

```tsx
import { usePresentationCreate } from "../../hooks/presentations/usePresentationForm";

function CreatePresentationPage() {
  const {
    currentStep,
    totalSteps,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    submitError,
  } = usePresentationCreate();

  return (
    <div>
      <p>Paso {currentStep + 1} de {totalSteps}</p>
      {submitError && <p>{submitError}</p>}
      <button onClick={handlePrevStep}>Volver</button>
      <button onClick={() => handleSubmit(formValues)}>Enviar</button>
    </div>
  );
}
```

## ✨ Beneficios

- 🔐 **Manejo completo de flujo** para creación y edición.
- 🧪 **Separación clara** entre pasos, validación y envío.
- 🧼 **Control de errores reutilizable** con `useErrorParser`.
- ♻️ **Permite reutilizar lógica en pantallas similares**.

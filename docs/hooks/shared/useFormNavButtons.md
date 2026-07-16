# 🪝 `useFormNavButtons`

> Hook de React para manejar la navegación entre pasos de formulario y la acción de retroceder.

## 🎯 ¿Para qué sirve?

Usa el contexto de navegación de formularios y React Router para controlar los botones "Siguiente" y "Volver" en formularios escalonados o editables.

## 📦 Firma

```ts
useFormNavButtons({ backPath, readOnly }: UseFormNavButtonsParams)
```

- **`backPath`** — ruta a la que se navega si se presiona "Volver" en el primer paso o cuando el formulario está en modo solo lectura.
- **`readOnly`** — si es `true`, evita navegar dentro del contexto y vuelve directamente a `backPath`.
- Devuelve información sobre el paso actual y los handlers para los botones.

## 💡 Ejemplo

```tsx
import { useFormNavButtons } from "../../hooks/shared/useFormNavButtons";

function FormActions({ backPath, readOnly }) {
  const { isFirstStep, isLastStep, handleNext, handleBack } = useFormNavButtons({ backPath, readOnly });

  return (
    <div>
      <button type="button" onClick={handleBack}>Volver</button>
      <button type="button" onClick={handleNext}>
        {isLastStep ? "Enviar" : "Siguiente"}
      </button>
    </div>
  );
}
```

## ✨ Beneficios

- 🔄 **Normaliza la navegación de formularios** con pasos.
- 📍 **Maneja el retroceso seguro** cuando el usuario está en modo lectura.
- 🧩 **Se integra con el contexto de formulario** para validar y enviar correctamente.
- ✅ **Reduce el código repetido** en botones de formulario.

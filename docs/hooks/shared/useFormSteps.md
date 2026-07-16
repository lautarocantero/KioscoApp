# 🪝 `useFormSteps`

> Hook de React para controlar el estado de pasos en formularios o tarjetas de contenido.

## 🎯 ¿Para qué sirve?

Gestión de pasos basada en una configuración de pasos, con funciones para avanzar, retroceder y saltar a un paso específico.

## 📦 Firma

```ts
useFormSteps(stepsConfig: StepConfig[])
```

- **`stepsConfig`** — arreglo de configuraciones con `title` y `content` para cada paso.
- Devuelve el estado actual del paso, funciones de navegación y banderas de inicio/fin.

## 💡 Ejemplo

```tsx
import { useFormSteps } from "../../hooks/shared/useFormSteps";

const steps = [
  { title: "Datos", content: <StepOne /> },
  { title: "Confirmar", content: <StepTwo /> },
];

function StepForm() {
  const { stepState, goToNext, goToPrev, isFirst, isLast } = useFormSteps(steps);

  return (
    <div>
      <h2>{stepState.title}</h2>
      <div>{stepState.content}</div>
      <button type="button" onClick={goToPrev} disabled={isFirst}>Anterior</button>
      <button type="button" onClick={goToNext}>{isLast ? "Finalizar" : "Siguiente"}</button>
    </div>
  );
}
```

## ✨ Beneficios

- 🚀 **Simplifica la lógica de pasos** en formularios y procesos.
- 📐 **Mantiene el estado de paso y contenido asociado**.
- 🔁 **Permite moverse hacia adelante, atrás o directamente a un paso**.
- 💡 **Hace el código más declarativo y fácil de mantener**.

# 🪝 `useSupplierForm`

> Hook de React para controlar el formulario de creación de proveedores.

## 🎯 ¿Para qué sirve?

Maneja el estado del formulario, validación, envío a la API y control de errores para crear proveedores.

## 📦 Firma

```ts
useSupplierForm(params: UseSupplierFormParams): UseSupplierFormReturn
```

- **`onClose`** — callback cuando se cierra el formulario.
- **`onSupplierCreated`** — callback cuando el proveedor se crea correctamente.
- Devuelve campos, estado de carga, error y handlers para cerrar y enviar.

## 💡 Ejemplo

```tsx
import { useSupplierForm } from "../../hooks/suppliers/useSupplierForm";

function SupplierForm({ onClose, onSupplierCreated }) {
  const {
    supplierName,
    supplierEmail,
    supplierPhone,
    isLoading,
    error,
    setSupplierName,
    setSupplierEmail,
    setSupplierPhone,
    handleClose,
    handleSubmit,
  } = useSupplierForm({ onClose, onSupplierCreated });

  return (
    <form>
      <input value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
      <button type="button" onClick={handleSubmit} disabled={isLoading}>Crear</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

## ✨ Beneficios

- 🧠 **Agrupa la lógica del formulario** en un solo hook.
- ✅ **Valida y envía datos** a la API.
- 🧼 **Resetea el formulario al cerrar**.
- 💬 **Expone errores para la UI**.

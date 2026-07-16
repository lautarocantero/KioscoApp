# 🪝 `useCartPresentationPicker`

> Hook de React para obtener las presentaciones del producto seleccionado en el flujo de ventas.

## 🎯 ¿Para qué sirve?

Carga las presentaciones del producto activo en el carrito y expone la selección actual junto con los datos de presentación.

## 📦 Firma

```ts
useCartPresentationPicker(): UseCartPresentationPickerReturn
```

- No recibe parámetros.
- Devuelve `productSelected` y `presentations`.

## 💡 Ejemplo

```tsx
import useCartPresentationPicker from "../../hooks/sells/useCartPresentationPicker";

function CartProductPresentation() {
  const { productSelected, presentations } = useCartPresentationPicker();

  if (!productSelected) return <p>No hay producto seleccionado</p>;

  return (
    <div>
      <h3>{productSelected.name}</h3>
      <select>
        {presentations.map((presentation) => (
          <option key={presentation._id} value={presentation._id}>{presentation.name}</option>
        ))}
      </select>
    </div>
  );
}
```

## ✨ Beneficios

- 🔁 **Carga las presentaciones del producto activo**.
- 🗂️ **Evita búsquedas innecesarias** al limitarse al producto actual.
- 🧠 **Mantiene la lógica de selección de presentaciones separada** de la UI.

# 🧩 `CartChipToggleGroup`

> Selector tipo "pill group" (radiogroup accesible) usado para forma de pago y estado del pago.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `options` | `{ value: string; label: string }[]` | Opciones a mostrar. |
| `value` | `string` | Valor seleccionado. |
| `onChange` | `(value: string) => void` | Handler al clickear una opción. |
| `ariaLabel` | `string` | Nombre accesible del grupo (`role="radiogroup"`). |

## 💡 Ejemplo

```tsx
<CartChipToggleGroup
  ariaLabel="Forma de pago"
  value={values.payment_method}
  onChange={(v) => setPaymentMethod(v as PaymentMethod)}
  options={[{ value: "cash", label: "Efectivo" }, { value: "debit", label: "Débito" }]}
/>
```

## ✨ Notas

`value`/`onChange` son `string` (no genéricos) para no acoplar el componente a un enum en particular — el caller castea al enum concreto (`PaymentMethod`, `SellStatusEnum`) en su propio `onChange`.

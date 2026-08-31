# 🧩 `CartSectionLabel`

> Título con ícono para una sección de la banda de totales del carrito (forma de pago, estado del pago).

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `icon` | `ReactNode` | Ícono a la izquierda del label. |
| `label` | `string` | Texto del título. |

## 💡 Ejemplo

```tsx
<CartSectionLabel icon={<CreditCardIcon fontSize="small" />} label="Forma de pago" />
```

## ✨ Notas

Compartido entre `CartPaymentMethod` y `CartPaymentStatus` para que ambas secciones tengan el mismo estilo de título.

# 🧩 `CartNoteInput`

> Input de nota opcional de la venta, en la banda de totales del carrito.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `note` | `string` | Valor actual. |
| `onNoteChange` | `(value: string) => void` | Handler del input, sin sanitizar (texto libre). |

## 💡 Ejemplo

```tsx
<CartNoteInput note={note} onNoteChange={handleNoteChange} />
```

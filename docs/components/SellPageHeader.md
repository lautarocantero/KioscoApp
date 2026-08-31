# 🧩 `SellPageHeader`

> Título de página de `/new-sell`: "Nueva venta" + contexto (kiosco · vendedor · fecha) + atajos de teclado.

## 🎯 Propósito

Componente de presentación puro. Se renderiza arriba de la barra de búsqueda en `CatalogHeader`.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `kioscoName` | `string` | Nombre del kiosco activo. |
| `sellerName` | `string` | Nombre del vendedor logueado. |
| `dateLabel` | `string` | Fecha/hora ya formateada. |

## 💡 Ejemplo

```tsx
<SellPageHeader kioscoName="Kiosco Belgrano 1420" sellerName="Lautaro C." dateLabel="Vie 28 · 18:40" />
```

## ✨ Notas

- Los atajos (`/`, `F2`, `F9`) son solo el hint visual — la lógica real vive en `useSellShortcuts`.
- Los hints se ocultan en pantallas `xs`/`sm` para no competir con la barra de búsqueda en mobile.

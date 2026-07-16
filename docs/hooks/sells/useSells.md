# 🪝 `useSells`

> Hook de React para obtener el resumen de ventas del día y exponerlo para la UI.

## 🎯 ¿Para qué sirve?

Carga el número de ventas de hoy y la fecha/hora de la última venta, manteniendo el estado de carga y error.

## 📦 Firma

```ts
useSells(): UseSellsResult
```

- No recibe parámetros.
- Devuelve `count`, `lastSaleAt`, `loading` y `error`.

## 💡 Ejemplo

```tsx
import { useSells } from "../../hooks/sells/useSells";

function TodaySalesSummary() {
  const { count, lastSaleAt, loading, error } = useSells();

  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p>Ventas hoy: {count ?? 0}</p>
      <p>Última venta: {lastSaleAt ?? "Sin ventas"}</p>
    </div>
  );
}
```

## ✨ Beneficios

- 📈 **Provee métricas clave de ventas diarias**.
- 🔄 **Maneja el estado de carga y errores** internamente.
- 🧹 **Funciona como un hook derivado para datos de UI**.

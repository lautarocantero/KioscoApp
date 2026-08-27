# 🪝 `useSellsContextBand`

> Hook de React que agrega, 100% client-side, los datos de la banda de contexto de `/sells` (KPIs del período, sparkline de 14 días, hechos y alerta de parciales) — sin disparar ningún fetch propio.

## 🎯 ¿Para qué sirve?

El handoff de diseño (opción 3a) pide una banda arriba de la tabla de ventas con: 4 KPIs del período elegido (con variación vs. período anterior), un sparkline de los últimos 14 días, tres "hechos" (medio de pago dominante, hora pico, vendedor del período) y una alerta de ventas parciales sin saldar.

No existe un endpoint `GET /sell/summary` en el backend, así que este hook toma el mismo listado de ventas que ya trae `useSellsListData` (la fuente que usa la tabla y `useShopSalesSummary`) y lo agrega en memoria con helpers puros — no dispara ningún request nuevo, por eso no expone su propio `loading`/`error` (esos ya los resuelve `useSellsListData`).

El plan de la cuenta se lee con `useMembershipStatus` (la misma fuente que gatea el reporte mensual). Mientras carga se asume el caso más restrictivo (Standard), para no mostrar por un instante opciones de período que un segundo después se deshabilitan.

## 📦 Firma

```ts
useSellsContextBand(sells: SellTicketType[], isAdmin: boolean): UseSellsContextBandReturn
```

- `sells`: listado **sin filtrar** por `SellFilterEnum` — la banda describe el período completo, no el filtro de estado de la tabla.
- `isAdmin`: rol del kiosco activo (`useIsActiveKioscoAdmin`).
- Devuelve `period`, `setPeriod`, `periodAvailability`, `periodRange`, `kpis`, `sparkline`, `sparklineBestDay`, `facts`, `partialsAlert`, `hasSellsInPeriod`.

## 🔒 Gating de plan y rol

Cambiar el período es exclusivo de admin (mismo criterio que `dashboard.changeRange` en `rolesPermissionsMatrix.ts` y `ShopSalesChart.canChangeRange`): `setPeriod` queda como no-op para no-admins, además del control deshabilitado en la UI (`periodAvailability[period].disabledReason === "admin"`).

El plan Standard no puede ver "meses anteriores" (misma regla que ya aplica al reporte mensual). Como "Hoy" y "Este mes" nunca salen del mes en curso, sólo "7 días"/"30 días" pueden quedar bloqueadas — y sólo cuando su rango, calculado contra la fecha de hoy, cruza efectivamente al mes anterior (ver `getSellsPeriodOptionAvailability`).

## 💡 Ejemplo

```tsx
const { sells, ...rest } = useSellsListData();
const isAdmin = useIsActiveKioscoAdmin();
const band = useSellsContextBand(sells, isAdmin);

<SellsContextBand {...band} loading={rest.loading} error={rest.error} />
```

## ✨ Beneficios

- 🔁 **No duplica fetch**: reusa `sells` ya traído por `useSellsListData`.
- 🧮 **Toda la agregación vive en helpers puros y testeados** (`aggregateSellsPeriodKpis`, `aggregateSellsPartialsAlert`, etc.), no en el hook ni en el `.tsx`.
- 🔒 **Gating consistente**: replica exactamente el patrón ya usado en `stadistics` (`getCompareAvailability`) en vez de inventar uno nuevo.

## 🧪 Tests

`src/hooks/sells/test/useSellsContextBand.test.ts`

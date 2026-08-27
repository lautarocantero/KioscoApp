# `getSellsPeriodOptionAvailability` — Documentación

## ¿Para qué sirve?

Resuelve, para cada opción del selector de período de la banda de contexto de `/sells` (`Hoy` / `7 días` / `30 días` / `Este mes`), si puede seleccionarse y por qué no si no puede. Mismo criterio que `getCompareAvailability` (stadistics): el rol manda primero — cambiar el período es admin-only, igual que `dashboard.changeRange` en `rolesPermissionsMatrix.ts` — y sólo si el rol lo permite se evalúa el plan.

El plan Standard no puede ver "meses anteriores" (misma regla que ya aplica al reporte mensual, `ShopMonthlyReportHeader.canChangeMonth`). Como "Hoy" y "Este mes" nunca salen del mes en curso, sólo "7 días"/"30 días" pueden quedar bloqueadas, y sólo cuando su rango realmente cruza al mes anterior según la fecha de hoy (p. ej. los primeros días del mes).

## Firma

```ts
getSellsPeriodOptionAvailability(args: { isAdmin: boolean; isDeluxe: boolean; now: Date }): SellsPeriodOptionsAvailability
// Record<SellsPeriodEnum, { canSelect: boolean; disabledReason: "plan" | "admin" | null }>
```

## Dónde se usa

`useSellsContextBand` → `SellsPeriodSelector.tsx` (tooltip `permissions.adminOnly` o `stadistics.monthlyReport.header.planOnly` según `disabledReason`).

## Tests

`src/modules/sells/test/helpers/getSellsPeriodOptionAvailability.test.ts`

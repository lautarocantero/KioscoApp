# `getRelativeTime` — Documentación

## ¿Para qué sirve?

Función pura que formatea un `createdAt` (ISO string) como tiempo relativo corto ("Recién" / "Hace 5 min" / "Hace 3 h" / "Hace 2 d"), vía `i18next`. Diff manual contra `Date.now()` — no suma el plugin `relativeTime` de `dayjs` (no está instalado en el repo) por una necesidad tan chica.

## Firma

```ts
getRelativeTime(createdAt: string, t: TFunction): string
```

- `< 1 min` → `notifications.time.justNow`
- `< 1 h` → `notifications.time.minutesAgo` (`{{count}}`)
- `< 1 día` → `notifications.time.hoursAgo` (`{{count}}`)
- `>= 1 día` → `notifications.time.daysAgo` (`{{count}}`)

## Dónde se usa

- `NotificationListItem.tsx` (dropdown de la campana)
- `notificationColumns.tsx` (columna "message" de `/notifications`)

## Tests

`src/modules/notifications/test/helpers/getRelativeTime.test.ts`

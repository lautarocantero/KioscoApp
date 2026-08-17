# NotificationsBell — Documentación

## 1. ¿Para qué sirve?

Campana de notificaciones de la app: una venta registrada, o una presentación que quedó por debajo de su punto de reposición tras una venta. Vive arriba a la derecha del dashboard, en el `Box` que `AppShell.tsx` tenía reservado ("Reservado para la futura campana de notificaciones", ver [docs/components/SettingsModal.md](./SettingsModal.md) §5) desde que el switch de tema se movió a Ajustes.

Al hacer click abre un dropdown con dos secciones, cada una con su propio scroll:

- **Importante** — solo ventas (`type: "sale"`).
- **Más notificaciones** — solo stock bajo (`type: "low_stock"`).

Un botón "Ver todas las notificaciones" al pie navega a `/notifications`, la tabla completa con filtros.

**¿Dónde se usa?**
- `src/modules/shared/layout/AppShell.tsx`

## 2. Arquitectura

```
NotificationsBell                          (IconButton + Badge, siempre montado)
└── NotificationsDropdown                  (lazy + Suspense, Popover anclado a la campana)
    ├── header: título + "Marcar todas como leídas"
    ├── NotificationsDropdownSection (Importante)
    │   └── NotificationListItem × N
    ├── NotificationsDropdownSection (Más notificaciones)
    │   └── NotificationListItem × N
    └── footer: "Ver todas las notificaciones" → navega a /notifications

NotificationsPage                          (/notifications)
├── NotificationsPageHeader                (ícono + título + subtítulo)
├── NotificationsPageActions               (Marcar todas leídas / Eliminar todas)
├── NotificationsFilterTabs                (Todas / Alertas / Novedades, con contador)
├── DataTable<NotificationEntity>          (mismo componente que el resto de los listados)
│   └── notificationColumns.tsx            (message / status / actions)
└── ConfirmDialog                          (confirmación de "borrar todas")
```

Archivos:

| Archivo | Responsabilidad |
|---|---|
| `modules/shared/components/NotificationsBell/NotificationsBell.tsx` | Ícono + badge, monta el dropdown lazy |
| `modules/shared/components/NotificationsBell/NotificationsDropdown.tsx` | `Popover` con header/secciones/footer |
| `modules/shared/components/NotificationsBell/NotificationsDropdownSection.tsx` | Una sección: título + lista scrolleable + vacío |
| `modules/shared/components/NotificationsBell/NotificationListItem.tsx` | Una fila del dropdown (ícono, mensaje, tiempo, ojo) |
| `modules/notifications/pages/NotificationsPage/NotificationsPage.tsx` | Página `/notifications` |
| `modules/notifications/pages/NotificationsPage/components/NotificationsPageHeader.tsx` | Ícono + título + subtítulo |
| `modules/notifications/pages/NotificationsPage/components/NotificationsPageActions.tsx` | Botones de header (marcar todas / eliminar todas) |
| `modules/notifications/pages/NotificationsPage/components/NotificationsFilterTabs.tsx` | Tabs Todas/Alertas/Novedades con contador |
| `modules/notifications/pages/NotificationsPage/components/notificationColumns.tsx` | Columnas de la tabla |
| `modules/notifications/helpers/getNotificationMessage.ts` | Título/subtítulo del mensaje (compartido bell + tabla) |
| `modules/notifications/helpers/getRelativeTime.ts` | "Hace 5 min" (compartido bell + tabla) |
| `modules/notifications/helpers/groupNotificationsByFilter.ts` / `getNotificationFilterCounts.ts` | Filtro y contadores de los tabs |
| `modules/notifications/api/notificationApi.ts` | Requests a `${API_URL}/notification` |
| `hooks/notifications/useNotificationsData.ts` | Fetch + polling (compartido bell + página) |
| `hooks/notifications/useNotificationsBell.ts` | Estado del popover + acciones rápidas |
| `hooks/notifications/useNotificationsPage.ts` | Filtro, columnas, diálogos de borrado |
| `store/notification/{notificationSlice,notificationThunks}.ts` | Estado global + llamadas al back |
| `typings/notifications/{notificationTypes,notificationComponentTypes,notificationEnums}.ts` | Tipos |

## 3. Props

`NotificationsBell` no recibe props (se auto-orquesta con `useNotificationsBell`). Ver `@typings/notifications/notificationComponentTypes` para el resto de los componentes.

## 4. Ejemplo de uso

```tsx
// AppShell.tsx
<Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
  <NotificationsBell />
</Box>
```

## 5. Detalles de implementación

- **Acción del ojo**: se reutiliza `RowActionsCell` (`modules/shared/components/DataTable/RowActionsCell.tsx`, el único componente de acciones de fila del repo) agregándole `onToggleRead`/`isRead`/`toggleReadLabel` opcionales, en vez de crear un componente de acciones paralelo. En el dropdown, el mismo ícono se resuelve directo en `NotificationListItem` (no usa `DataTable`).
- **Estado no leído/leído**: es de un solo sentido (`"not-read-yet" → "readed"`) porque el backend solo expone `mark-as-read` (`$addToSet`, idempotente) — no existe "volver a no leída". El ojo abierto marca como leída; una vez leída queda con ojo cerrado.
- **Colores**: siempre `theme.custom.*`/`theme.palette.*`, nunca hex — `accents.gold` para stock bajo, `accents.green`/`palette.success` para ventas, mismo patrón que `getSeverityColor` en `ShopLowStockList.tsx`.
- **Carga diferida**: `NotificationsDropdown` se importa con `React.lazy` + `Suspense`, montado solo mientras el popover está abierto — mismo patrón que `SettingsModal`. `NotificationsBell` en sí no es lazy (es chico y siempre visible).
- **Polling**: `useNotificationsData` re-consulta cada 45s mientras esté montada (campana o página). Además, `useCart.ts` dispara un fetch inmediato después de una venta exitosa para que quien vendió vea su propia notificación sin esperar al polling.
- **i18n**: toda la sección usa `react-i18next` (namespace `notifications.*` en `src/i18n/locales/{es,en}.ts`), incluidos los mensajes interpolados (`{{productName}}`, `{{sellerName}}`, etc.).
- **Tema claro/oscuro**: no hay lógica de tema propia — todo llega vía `theme.custom`/`theme.palette`, así que sigue automáticamente el `ThemeProvider` global.
- **Accesibilidad**: `Popover` con `aria-labelledby`; cada sección es un `<section aria-label>`; el botón del ojo lleva `aria-label` traducido; los tabs de filtro usan `role="tablist"`/`role="tab"`/`aria-selected`.
- **Contrato con el backend**: ver [docs/features/notifications.md](../features/notifications.md) para el detalle completo de los endpoints y de cómo/cuándo se crean las notificaciones.

## 6. Tests

- `src/hooks/notifications/test/useNotificationsData.test.ts`
- `src/hooks/notifications/test/useNotificationsBell.test.ts`
- `src/hooks/notifications/test/useNotificationsPage.test.ts`
- `src/modules/notifications/test/helpers/getNotificationMessage.test.ts`
- `src/modules/notifications/test/helpers/getRelativeTime.test.ts`
- `src/modules/notifications/test/helpers/groupNotificationsByFilter.test.ts`
- `src/modules/notifications/test/helpers/getNotificationFilterCounts.test.ts`
- `src/modules/notifications/test/NotificationsPage/notificationColumns.test.tsx`
- `src/modules/shared/test/NotificationsBell/NotificationListItem.test.tsx`

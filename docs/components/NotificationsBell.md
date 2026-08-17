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
| `modules/shared/components/NotificationsBell/NotificationListItem.tsx` | Tarjeta de una notificación (ícono, mensaje, tiempo, ojo, flecha de detalle) |
| `modules/notifications/pages/NotificationsPage/NotificationsPage.tsx` | Página `/notifications` |
| `modules/notifications/pages/NotificationsPage/components/NotificationsPageHeader.tsx` | Ícono + título + subtítulo |
| `modules/notifications/pages/NotificationsPage/components/NotificationsPageActions.tsx` | Botones de header (marcar todas / eliminar todas) |
| `modules/notifications/pages/NotificationsPage/components/NotificationsFilterTabs.tsx` | Tabs Todas/Alertas/Novedades con contador |
| `modules/notifications/pages/NotificationsPage/components/notificationColumns.tsx` | Columnas de la tabla |
| `modules/notifications/helpers/getNotificationMessage.ts` | Título/subtítulo del mensaje (compartido bell + tabla) |
| `modules/notifications/helpers/getRelativeTime.ts` | "Hace 5 min" (compartido bell + tabla) |
| `modules/notifications/helpers/groupNotificationsByFilter.ts` / `getNotificationFilterCounts.ts` | Filtro y contadores de los tabs |
| `modules/notifications/helpers/getNotificationDetailRoute.ts` | Ruta de detalle (venta o presentación) de la flecha "Ver detalle" |
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

- **Tarjeta por notificación**: cada `NotificationListItem` es su propio contenedor con borde de color (según `type`, atenuado cuando está leída), separado del resto por margen — no una fila corrida como una lista plana. El acento de color y el fondo tenue solo aparecen mientras está `not-read-yet`.
- **Toggle de lectura bidireccional**: clickear en cualquier parte de la tarjeta (o el botón de ojo) invierte el estado actual (`not-read-yet` ↔ `readed`), vía `setNotificationReadStatusThunk`. La tarjeta es un `Box role="button"` con soporte de teclado (Enter/Espacio); los botones de acción hacen `stopPropagation` para no togglear dos veces.
- **Acciones, abajo a la derecha**: ojo (marcar leída/no leída) y flecha (ir al detalle de la venta o la presentación, `getNotificationDetailRoute`) quedan alineados a la derecha, debajo de todo el texto — no arriba, para no competir con el título. Ambas se reutilizan en la tabla de `/notifications` vía `RowActionsCell` (`onToggleRead`/`isRead`/`toggleReadLabel` y `onGoToDetail`/`goToDetailLabel` opcionales), el único componente de acciones de fila del repo — en vez de crear uno paralelo.
- **Colores**: siempre `theme.custom.*`/`theme.palette.*`, nunca hex — `accents.gold` para stock bajo, `accents.green`/`palette.success` para ventas, mismo patrón que `getSeverityColor` en `ShopLowStockList.tsx`.
- **"Marcar todas como leídas"**: solo se muestra si `unreadCount > 0` (no tiene sentido ofrecerlo si no hay nada para marcar). Ese texto y "Ver todas las notificaciones" usan `theme.typography.caption.fontSize` (la más chica del theme) — son acciones secundarias, no deben competir visualmente con el contenido.
- **Carga diferida**: `NotificationsDropdown` se importa con `React.lazy` + `Suspense`, montado solo mientras el popover está abierto — mismo patrón que `SettingsModal`. `NotificationsBell` en sí no es lazy (es chico y siempre visible).
- **Polling**: `useNotificationsData` re-consulta cada 45s mientras esté montada (campana o página). Además, `useCart.ts` dispara un fetch inmediato después de una venta exitosa para que quien vendió vea su propia notificación sin esperar al polling.
- **i18n**: toda la sección usa `react-i18next` (namespace `notifications.*` en `src/i18n/locales/{es,en}.ts`), incluidos los mensajes interpolados (`{{productName}}`, `{{sellerName}}`, etc.).
- **Tema claro/oscuro**: no hay lógica de tema propia — todo llega vía `theme.custom`/`theme.palette`, así que sigue automáticamente el `ThemeProvider` global.
- **Accesibilidad**: `Popover` con `aria-labelledby`; cada sección es un `<section aria-label>`; la tarjeta lleva `aria-label` con el mensaje + estado, foco visible (`:focus-visible`) y manejo de teclado; los botones de ojo/flecha llevan `aria-label` traducido; los tabs de filtro usan `role="tablist"`/`role="tab"`/`aria-selected`.
- **Contrato con el backend**: ver [docs/features/notifications.md](../features/notifications.md) para el detalle completo de los endpoints y de cómo/cuándo se crean las notificaciones.

## 6. Tests

- `src/hooks/notifications/test/useNotificationsData.test.ts`
- `src/hooks/notifications/test/useNotificationsBell.test.ts`
- `src/hooks/notifications/test/useNotificationsPage.test.ts`
- `src/modules/notifications/test/helpers/getNotificationMessage.test.ts`
- `src/modules/notifications/test/helpers/getRelativeTime.test.ts`
- `src/modules/notifications/test/helpers/groupNotificationsByFilter.test.ts`
- `src/modules/notifications/test/helpers/getNotificationFilterCounts.test.ts`
- `src/modules/notifications/test/helpers/getNotificationDetailRoute.test.ts`
- `src/modules/notifications/test/NotificationsPage/notificationColumns.test.tsx`
- `src/modules/shared/test/NotificationsBell/NotificationListItem.test.tsx`

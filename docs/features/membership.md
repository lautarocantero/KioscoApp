# 💳 Membresías (planes de kiosco) — Documentación técnica

## Índice

1. [Resumen](#resumen)
2. [Tiers](#tiers)
3. [Flujo completo](#flujo-completo)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [Decisiones de diseño](#decisiones-de-diseño)
7. [Pendientes / fuera de alcance](#pendientes--fuera-de-alcance)
8. [Archivos tocados (referencia rápida)](#archivos-tocados-referencia-rápida)

---

## Resumen

Cada kiosco tiene un tier de suscripción (`plan`) elegible desde
Configuración → Membresía. Subir de tier es un pago mensual recurrente
procesado por Mercado Pago (Checkout de Suscripciones / Preapproval); el
resultado del pago (vía webhook) es lo único que actualiza el plan real del
kiosco — el frontend nunca marca un plan como pagado por su cuenta.

Este es el mockeo inicial del feature: la UI y el cobro son reales y
funcionales, pero **no hay enforcement** de los límites de cada tier
(vendedores, productos, kioscos) en el resto de la app todavía.

## Tiers

| Tier | Precio | Destacado |
|------|--------|-----------|
| Stocko Standard | $49.900/mes | — |
| Stocko Deluxe | $64.900/mes | ✅ "Más elegido" |

El precio/moneda vive en el backend (`src/config/membershipPlans.ts`, única
fuente de verdad del monto que se cobra). Las ventajas mostradas en cada
card son copy de marketing mockeado en el frontend
(`src/config/membershipPlans.ts` + `membership.features.*` en
`src/i18n/locales/{es,en}.ts`), inventado a partir de funcionalidad real de
la app (multi-kiosco, vendedores, reportes, boleta de reposición,
notificaciones).

Todo kiosco nuevo o existente arranca en `stocko` / `active` — no hay pago
retroactivo exigido a los kioscos que ya existían antes de este feature.

## Flujo completo

1. Admin del kiosco entra a **Configuración → Membresía** (ícono de
   ajustes en el sidebar → categoría nueva). La sección solo muestra una
   fila: nombre del tier actual a la izquierda + botón "Cambiar plan" a la
   derecha (mismo layout que "Contraseña y seguridad" en Cuenta).
2. Click en "Cambiar plan" navega a `/membership/plans` (página completa,
   no modal — el modal de Ajustes se cierra solo al navegar, ver
   [Decisiones de diseño](#decisiones-de-diseño)). Ahí sí se ve el resumen
   del plan actual + las 2 cards de tier ("Elegí tu plan").
3. Click en "Elegir <tier>" navega a `/membership/checkout/:plan`.
4. En el checkout: resumen del plan/precio + selector de método de pago —
   **Mercado Pago** (redirect) o **Tarjeta de crédito** (sin salir de la
   app); transferencia sigue mostrada como "Próximamente", deshabilitada.
5. **Mercado Pago**: "Pagar con Mercado Pago" llama `POST /membership/checkout
   { plan, payment_method: 'redirect' }`, que crea una `preapproval`
   (suscripción recurrente mensual) en Mercado Pago y devuelve `init_point`.
   El frontend redirige ahí (`window.location.href`, sale de la SPA). El
   usuario completa el pago en el checkout hospedado, que lo redirige de
   vuelta a `/membership/checkout/result`.
6. **Tarjeta de crédito**: al elegir esta opción se monta el **Card Payment
   Brick** de Mercado Pago (`@mercadopago/sdk-react`) — la tarjeta se
   tokeniza en los campos iframe del propio Brick, el número/CVV nunca
   pasan por nuestro frontend ni backend. Al hacer submit, el frontend llama
   `POST /membership/checkout { plan, payment_method: 'card', card_token_id
   }` (el token del Brick) y navega directo a `/membership/checkout/result`
   — sin redirect.
7. Mercado Pago notifica `POST /membership/webhook` (async, puede tardar) —
   el backend relee la preapproval y recién ahí actualiza
   `Kiosco.plan`/`plan_status`. La página de resultado permite refrescar el
   estado manualmente mientras tanto. Esto es igual para ambos métodos de
   pago: ni siquiera con tarjeta (donde Mercado Pago suele autorizar al
   toque) el frontend asume que el pago quedó aprobado por su cuenta — el
   webhook firmado sigue siendo la única fuente de verdad.

## Backend

Ver [`KioscoAppBackEnd/docs/Membership.md`](../../../KioscoAppBackEnd/docs/Membership.md)
para el detalle de endpoints, setup de credenciales de Mercado Pago y el
mapeo `external_reference` → kiosco/plan.

Resumen: `Kiosco` gana `plan`, `plan_status`, `mp_preapproval_id`
(`src/schemas/kioscoSchema.ts`, `src/typings/kiosco`). Nuevo módulo
`membership` (`models/membershipModel.ts`, `services/mercadoPagoService.ts`,
`controllers/membership.controller.ts`, `routes/membership.routes.ts`) que
no toca nada de `KioscoModel` existente.

⚠️ Los kioscos creados **antes** de este feature no tienen `plan`/
`plan_status` en Mongo (el `default` de Mongoose solo aplica a documentos
nuevos) — `GET /membership/status` rompe la validación Zod del frontend si
no se corre primero `npm run migrate:membership-plans` (backfillea
`stocko`/`active` en los kioscos viejos; idempotente, ya corrida contra la
base real al mergear este feature).

## Frontend

```
src/typings/membership/
  membershipEnums.ts            → KioscoPlanEnum, KioscoPlanStatusEnum (espejo del back)
  membershipTypes.ts            → tipos de API + hooks
  membershipComponentTypes.ts   → props de componentes

src/config/membershipPlans.ts   → claves de traducción de features por tier, tier popular, orden de las cards

src/modules/membership/
  api/membershipApi.ts          → GET /plans, GET /status, POST /checkout (respuestas validadas con Zod)
  schema/membershipApiSchema.ts → esquemas Zod de esas respuestas + del payload del Card Payment Brick
  helpers/                      → funciones puras (merge plan+features, parseo de :plan, formateo de precio)
  components/
    MembershipPlanCard.tsx, MembershipPlanCardSkeleton.tsx, MembershipCurrentPlanSummary.tsx
    PaymentMethodRow.tsx     → fila seleccionable del selector de método de pago
    CardPaymentBrick.tsx     → wrapper presentacional del Card Payment Brick (@mercadopago/sdk-react)
  pages/
    MembershipPlansPage.tsx        → /membership/plans ("Elegí tu plan" + las 2 cards)
    MembershipCheckoutPage.tsx     → /membership/checkout/:plan
    MembershipCheckoutResultPage.tsx → /membership/checkout/result
  routes/MembershipRoutes.tsx

src/hooks/membership/
  useMembershipPlans.ts, useMembershipStatus.ts, useMembershipCheckoutPlan.ts
  useMembershipCheckout.ts     → startCheckoutRedirect / startCheckoutWithCard
  useMembershipCheckoutPage.ts → orquesta selección de método de pago + ambos flujos de pago
  useMercadoPagoSdk.ts         → inicializa el SDK de MP (initMercadoPago) una sola vez

src/config/mercadoPago.ts → VITE_MP_PUBLIC_KEY (public key, segura de exponer client-side)

src/modules/shared/components/SettingsModal/sections/
  MembershipSection.tsx  → solo la fila plan actual + botón "Cambiar plan" (navega a /membership/plans)
```

`SettingsCategoryEnum.Membership` / `SettingsSectionEnum.MembershipPlan` se
suman a `src/config/SettingsCategories.tsx`, mismo patrón que `MyShop`.
Las cards de tier NO viven en el modal de Ajustes — solo la fila resumen,
igual que `AccountPasswordSection` solo muestra un campo + botón "Editar"
(el formulario en sí vive en un diálogo aparte).

## Decisiones de diseño

- **`KioscoPlanEnum` vs `KioscoMembership`**: `KioscoMembership` (back)
  ya existía y es la relación usuario↔kiosco (rol de vendedor/admin) — no
  tiene nada que ver con esto. Para no pisar el nombre, el tier de
  suscripción vive en `KioscoPlanEnum`/`KioscoPlanStatusEnum`.
- **El modal de Ajustes se cierra al navegar**: vive montado por encima de
  toda la app sin desmontarse (`isSettingsOpen && <SettingsModal/>` en
  `AppSidebar`). Elegir un plan navega a una ruta nueva, así que
  `useCloseSettingsModalOnNavigate` (hook nuevo, en
  `SettingsModal/hooks/`) cierra el diálogo si la ruta cambia mientras
  está abierto — evita que quede flotando sobre el checkout.
- **Precio con moneda fija (ARS), no con la moneda configurada del
  kiosco**: Mercado Pago cobra en la moneda real de la cuenta, no en la
  que el kiosco eligió para mostrar sus ventas (`MyShopCurrencySection`).
  `formatMembershipPrice` pasa `currency_id` del back como override a
  `formatCurrency` en vez de usar `getConfiguredCurrency()`.
- **Preapproval (suscripción) en vez de Preference (pago único)**: los
  precios son "/mes" — la API de suscripciones de Mercado Pago (cobro
  recurrente automático) es la que corresponde, no un pago único que
  habría que volver a cobrar manualmente cada mes.
- **Tarjeta de crédito = Card Payment Brick de Mercado Pago, no un
  procesador nuevo**: en vez de sumar Stripe o similar, se reutiliza toda
  la infraestructura de MP que ya existía (cuenta, webhook, servicio,
  validación de firma). La `preapproval` soporta autorizarse directo con
  `card_token_id` (sin redirect) — el Card Payment Brick tokeniza la
  tarjeta en campos iframe propios de MP, así que el PAN/CVV nunca tocan
  nuestro frontend ni backend (alcance PCI-DSS SAQ A). Solo se usa el
  `token` del submit del Brick; `installments`/`payment_method_id` que
  también trae ese payload no aplican a una suscripción mensual.

## Rediseño de `/membership/plans` (hero + toggle semestral)

`MembershipPlansPage` tiene un hero (`MembershipCurrentPlanHero`, con la
mascota de Stocko y fondo con textura ruidosa vía `getNoisyBackgroundSx`,
la misma que usa `NoisyCard`) en vez de la caja de texto plano anterior, y
un toggle "Mensual / 6 meses" (`BillingPeriodToggle`) arriba de las cards
de tier.

⚠️ **El período semestral es solo una previsualización de precio en el
frontend** — `GET /membership/plans` sigue devolviendo un único precio
mensual, no hay campo de período de facturación en el back todavía. Elegir
"6 meses" en el toggle solo recalcula localmente el precio que se muestra
en las cards (`computeMembershipPlanPricing`, -15% definido en
`MEMBERSHIP_SEMIANNUAL_DISCOUNT_RATE`); al hacer click en "Elegir <tier>"
el checkout (`POST /membership/checkout`) sigue cobrando el precio mensual
real sin importar qué período esté seleccionado. Si en el futuro se agrega
soporte real de facturación semestral en el backend, hay que propagar el
período elegido hasta `useMembershipCheckout`/`createMembershipCheckoutRequest`
— hoy no se propaga a propósito.

Piezas nuevas: `MembershipBillingPeriodEnum` (typings/membership/membershipEnums.ts,
no es espejo del back), `useMembershipBillingPeriod.ts` (estado del
toggle), `computeMembershipPlanPricing.ts` (helper puro del cálculo),
`MembershipCurrentPlanHero.tsx` y `BillingPeriodToggle.tsx`. El "Importe
mensual" del hero se deriva cruzando `status.plan` con `plans` en
`useMembershipPlansPage` (`currentPlanDefinition`); el "Medio de pago" se
muestra fijo como "Mercado Pago" porque es el único procesador integrado.

## Pendientes / fuera de alcance

- **Enforcement real de los límites de cada tier** (bloquear un 3er
  vendedor en Stocko, etc.) — no implementado a propósito, es el
  siguiente paso natural una vez validado el mockeo + cobro.
- **Downgrade/cancelación manual** desde la UI (hoy solo se puede subir de
  plan; cancelar una suscripción activa solo se refleja si Mercado Pago
  la cancela y notifica el webhook).
- Credenciales reales de Mercado Pago (`MP_ACCESS_TOKEN`,
  `MP_WEBHOOK_SECRET` en el backend, `VITE_MP_PUBLIC_KEY` en el frontend)
  quedan pendientes de configurar — sin ellas ningún checkout (redirect o
  tarjeta) se puede probar end-to-end.
- **Facturación semestral real**: el toggle "6 meses" de `/membership/plans`
  es solo preview de precio en el frontend (ver sección de arriba) — falta
  backend que soporte períodos de facturación para que el checkout cobre
  realmente cada 6 meses.

## Archivos tocados (referencia rápida)

Frontend: `src/typings/membership/*`, `src/typings/kiosco/kioscoTypes.ts`,
`src/typings/settings/settingsEnums.ts`, `src/config/SettingsCategories.tsx`,
`src/config/membershipPlans.ts`, `src/modules/membership/*`,
`src/hooks/membership/*`, `src/modules/shared/components/SettingsModal/*`,
`src/router/AppRouter.tsx`, `src/i18n/locales/{es,en}.ts`.

Backend: `src/typings/membership/*`, `src/typings/kiosco/index.d.ts`,
`src/schemas/kioscoSchema.ts`, `src/config/membershipPlans.ts`,
`src/models/membershipModel.ts`, `src/services/mercadoPagoService.ts`,
`src/controllers/membership.controller.ts`,
`src/routes/membership.routes.ts`, `src/index.ts`, `src/config.ts`.

### Pago con tarjeta de crédito (`feature/implement-card-payment`)

Frontend: `@mercadopago/sdk-react` (nueva dependencia), `src/config/mercadoPago.ts`,
`src/typings/membership/{membershipEnums,membershipTypes,membershipComponentTypes}.ts`,
`src/modules/membership/schema/membershipApiSchema.ts`,
`src/modules/membership/api/membershipApi.ts`,
`src/modules/membership/components/{PaymentMethodRow,CardPaymentBrick}.tsx`,
`src/hooks/membership/{useMembershipCheckout,useMembershipCheckoutPage,useMercadoPagoSdk}.ts`,
`src/modules/membership/pages/MembershipCheckoutPage.tsx`,
`src/i18n/locales/{es,en}.ts`.

Backend: `src/typings/membership/{enums,index.d.ts}`,
`src/services/mercadoPagoService.ts`, `src/models/membershipModel.ts`,
`src/controllers/membership.controller.ts`, `docs/Membership.md`.

### Rediseño de planes: hero + toggle semestral (`feature/update-plans-design`)

Frontend (sin cambios de backend): `src/typings/membership/{membershipEnums,
membershipTypes,membershipComponentTypes}.ts`, `src/config/membershipPlans.ts`,
`src/modules/membership/helpers/computeMembershipPlanPricing.ts`,
`src/hooks/membership/{useMembershipBillingPeriod,useMembershipPlansPage}.ts`,
`src/modules/membership/components/{MembershipCurrentPlanHero,BillingPeriodToggle,
MembershipPlanCard,MembershipPlanCardSkeleton}.tsx` (se borra
`MembershipCurrentPlanSummary.tsx`, reemplazado por el hero),
`src/modules/membership/pages/MembershipPlansPage.tsx`, `src/i18n/locales/{es,en}.ts`.

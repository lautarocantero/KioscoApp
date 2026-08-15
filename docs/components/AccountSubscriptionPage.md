# AccountSubscriptionPage — Documentación

## ⚠️ Estado: placeholder / en construcción

Este componente **todavía no implementa funcionalidad real**. Es un cartel de "en construcción" para la ruta `/account-subscription`; no muestra datos de plan ni permite cambiarlo. Este documento describe únicamente lo que existe hoy.

## ¿Para qué sirve?

Ocupar el lugar de la futura página de gestión de suscripción mientras esa funcionalidad no está desarrollada, para que la ruta `/account-subscription` no rompa la navegación.

## Props

Ninguna.

## Ejemplo de uso

```tsx
// src/modules/account/AccountRoutes.tsx
<Route path="/account-subscription" element={<AccountSubscriptionPage />} />
```

## Qué renderiza hoy

```tsx
<main>
  <p>AccountSubscriptionPage</p>
</main>
```

Un texto fijo dentro de un `<main>` (landmark de accesibilidad agregado para que la página tenga una región principal identificable, ya que este stub no pasa por `AppLayout`).

## Pendiente

Según los comentarios del propio archivo fuente (`src/modules/account/pages/AccountSubscriptionPage.tsx`), a futuro debería mostrar información del plan actual, opciones de cambio de plan y botones de actualizar/cancelar, conectado al schema `UserSubscription`. Ninguna de esas piezas existe todavía.

## Tests

`src/modules/account/test/AccountSubscriptionPage.test.tsx` — smoke test que confirma que el componente renderiza sin errores.

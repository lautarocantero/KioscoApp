# AccountEditPage — Documentación

## ⚠️ Estado: placeholder / en construcción

Este componente **todavía no implementa funcionalidad real**. Es un cartel de "en construcción" para la ruta `/account-edit`; no tiene formulario, no valida datos y no llama a ningún servicio. Este documento describe únicamente lo que existe hoy — no una especificación de lo que debería hacer, ya que esa funcionalidad aún no fue definida.

## ¿Para qué sirve?

Ocupar el lugar de la futura página de edición de cuenta (nombre, correo, contraseña) mientras esa funcionalidad no está desarrollada, para que la ruta `/account-edit` no rompa la navegación.

## Props

Ninguna.

## Ejemplo de uso

```tsx
// src/modules/account/AccountRoutes.tsx
<Route path="/account-edit" element={<AccountEditPage />} />
```

## Qué renderiza hoy

```tsx
<main>
  <p>AccountEditPage</p>
</main>
```

Un texto fijo dentro de un `<main>` (landmark de accesibilidad agregado para que la página tenga una región principal identificable, ya que este stub no pasa por `AppLayout`).

## Pendiente

Según los comentarios del propio archivo fuente (`src/modules/account/pages/AccountEditPage.tsx`), a futuro debería incluir: formulario básico (nombre, correo, contraseña) y botones de guardar/cancelar, conectado al schema `User`. Ninguna de esas piezas existe todavía.

## Tests

`src/modules/account/test/AccountEditPage.test.tsx` — smoke test que confirma que el componente renderiza sin errores.

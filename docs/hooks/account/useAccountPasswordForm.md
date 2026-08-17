# 🪝 `useAccountPasswordForm`

> Hook de React (Formik + Yup) para la sección "Contraseña y seguridad" del modal de Ajustes.

## 🎯 ¿Para qué sirve?

Maneja el formulario de cambio de contraseña de la cuenta actualmente
logueada (`currentPassword` / `newPassword` / `repeatNewPassword`), y el
estado de apertura/cierre del diálogo donde vive ese formulario
(`AccountPasswordDialog`).

## ⚠️ Detalle importante: no duplica lógica, reutiliza dos endpoints existentes

No existe (todavía) un endpoint de backend para "cambiar contraseña estando
logueado, verificando la actual". En vez de inventar uno, o de mostrar un
campo "Contraseña actual" que no se valida contra nada, el hook encadena
dos llamadas que ya existían:

1. **Verifica la contraseña actual** con `authLoginRequest` (`POST
   /auth/login`), llamado **directo** — no a través del thunk
   `startLoginWithEmailPassword`, porque ese thunk hace `dispatch(logout())`
   si el login falla (pensado para la pantalla de login, donde una
   contraseña incorrecta *debe* dejar al usuario deslogueado). Acá el
   usuario ya está logueado; si escribe mal su contraseña actual, el
   comportamiento correcto es mostrar un error en el campo, **no** patearlo
   de la app.
2. **Aplica la nueva contraseña** reutilizando el flujo de recuperación
   existente: `startRequestPasswordReset({ email })` (con el email del
   propio usuario autenticado, no pedido por formulario) para obtener un
   token, y `startResetPassword({ token, newPassword, repeatNewPassword })`
   para aplicarla. Mismo schema de validación (`accountPasswordFormSchema`,
   que extiende las mismas reglas que `resetPasswordFormSchema`).

## 📦 Firma

```ts
useAccountPasswordForm(): {
  formik: FormikProps<AccountPasswordFormValues>;
  isSubmitting: boolean;
  errorMessage: string | null;
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}
```

- No recibe parámetros.
- En éxito: cierra el diálogo, limpia el formulario (`resetForm`) y
  muestra un `SnackBar` de confirmación.
- En error (contraseña actual incorrecta, token, o reset): expone el
  mensaje en `errorMessage` y **deja el diálogo abierto** (no toca el
  `errorMessage` global de `state.auth`, porque el usuario ya está
  logueado).

## 💡 Ejemplo

```tsx
// AccountPasswordSection.tsx (fila "Contraseña" + botón "Editar")
const { formik, isSubmitting, errorMessage, isDialogOpen, openDialog, closeDialog } = useAccountPasswordForm();

<Button onClick={openDialog}>Editar</Button>
<AccountPasswordDialog open={isDialogOpen} onClose={closeDialog} formik={formik} isSubmitting={isSubmitting} errorMessage={errorMessage} />
```

El hook se llama **una sola vez**, en `AccountPasswordSection`; el diálogo
(`AccountPasswordDialog`) es puramente presentacional y recibe todo por
props — así ambos comparten el mismo estado sin duplicar la llamada al hook.

## Tests

`src/hooks/account/test/useAccountPasswordForm.test.ts`

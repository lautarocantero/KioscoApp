# 🪝 `useRegisterForm`

> Hook de React para manejar el envío del formulario de registro: sanitiza los datos, dispara el thunk de registro, expone estado de carga/error y navega a `/login` tras un registro exitoso.

## 🎯 ¿Para qué sirve?

Centraliza la lógica de submit del registro (sanitización de `username`/`email`, dispatch al store, `isSubmitting`, `registeredUserId`, redirección) para que `RegisterForm` solo se ocupe de renderizar el formulario con Formik.

## 📦 Firma

```ts
useRegisterForm(): UseRegisterFormReturn
```

- No recibe parámetros.
- Devuelve `errorMessage`, `isSubmitting`, `registeredUserId`, `handleSubmit` y `handleGoToLogin`.

```ts
interface UseRegisterFormReturn {
    errorMessage: string | null;
    isSubmitting: boolean;
    registeredUserId: string | null;
    handleSubmit: (values: AuthRegisterFormValues) => Promise<void>;
    handleGoToLogin: () => void;
}
```

## 💡 Ejemplo

```tsx
import { useFormik } from "formik";
import { useRegisterForm } from "../../hooks/auth/useAuthForm";
import { getRegisterInitialValues, registerFormSchema } from "../../modules/auth/schema/AuthFormSchema";

function RegisterForm() {
  const { errorMessage, isSubmitting, handleSubmit, handleGoToLogin } = useRegisterForm();

  const { handleSubmit: formikSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getRegisterInitialValues(),
    onSubmit: handleSubmit,
    validationSchema: registerFormSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <form onSubmit={formikSubmit}>
      {/* inputs de username / email / password / repeatPassword */}
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit" disabled={isSubmitting}>Registrarse</button>
      <button type="button" onClick={handleGoToLogin}>Inicia sesión</button>
    </form>
  );
}
```

## ✨ Beneficios

- 🧼 **Sanitiza antes de enviar**: `username` y `email` pasan por `sanitizeRegisterValues`, dejando `password`/`repeatPassword` intactos para no alterar la contraseña real del usuario.
- 🔐 **Dispatch centralizado**: el componente nunca llama a `startRegister` directamente.
- 🚦 **`isSubmitting` explícito** para deshabilitar el botón mientras el registro está en curso.
- 🧭 **Navegación desacoplada de la UI**: redirige a `/login` tras un registro exitoso.
- 🆔 **`registeredUserId` disponible** para casos futuros donde se quiera mostrar un estado intermedio de "cuenta creada" antes de redirigir (equivalente a `createdPresentation` en el flujo de productos).
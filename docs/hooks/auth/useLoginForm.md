# 🪝 `useLoginForm`

> Hook de React para manejar el envío del formulario de login: dispara el thunk de autenticación, expone el estado de carga/error y navega tras un login exitoso.

## 🎯 ¿Para qué sirve?

Centraliza la lógica de submit del login (dispatch al store, limpieza de error previo, `isSubmitting`, redirección a `/home`) para que `LoginForm` solo se ocupe de renderizar el formulario con Formik.

## 📦 Firma

```ts
useLoginForm(): UseLoginFormReturn
```

- No recibe parámetros.
- Devuelve `errorMessage`, `isSubmitting`, `handleSubmit`, `handleGoToRegister` y `handleGoToForgotPassword`.

```ts
interface UseLoginFormReturn {
    errorMessage: string | null;
    isSubmitting: boolean;
    handleSubmit: (values: AuthLoginFormValues) => Promise<void>;
    handleGoToRegister: () => void;
    handleGoToForgotPassword: () => void;
}
```

## 💡 Ejemplo

```tsx
import { useFormik } from "formik";
import { useLoginForm } from "../../hooks/auth/useAuthForm";
import { getLoginInitialValues, loginFormSchema } from "../../modules/auth/schema/AuthFormSchema";

function LoginForm() {
  const { errorMessage, isSubmitting, handleSubmit, handleGoToRegister } = useLoginForm();

  const { handleSubmit: formikSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getLoginInitialValues(),
    onSubmit: handleSubmit,
    validationSchema: loginFormSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <form onSubmit={formikSubmit}>
      {/* inputs de email / password */}
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit" disabled={isSubmitting}>Iniciar sesión</button>
      <button type="button" onClick={handleGoToRegister}>Crear cuenta</button>
    </form>
  );
}
```

## ✨ Beneficios

- 🔐 **Dispatch centralizado**: el componente nunca llama a `startLoginWithEmailPassword` directamente.
- 🧹 **Limpia el error de auth al montar**, para no arrastrar mensajes de un intento anterior (por ejemplo, al volver de crear cuenta).
- 🚦 **`isSubmitting` explícito** para deshabilitar el botón mientras el login está en curso.
- 🧭 **Navegación desacoplada de la UI**: redirige a `/shop` tras un login exitoso sin que `LoginForm` conozca `useNavigate`.
- ⚠️ **`handleGoToRegister` navega a `/login?mode=register`, no a `/register`**: login y registro son la misma página/ruta (`LoginPage`, ver [`useAuthPageMode`](./useAuthPageMode.md)), así que cambiar de modo solo actualiza el query param en vez de montar una ruta nueva — esto evita que [`AuthBrandPanel`](../../components/AuthBrandPanel.md) (y su video de intro) se remonte al alternar entre login y registro.
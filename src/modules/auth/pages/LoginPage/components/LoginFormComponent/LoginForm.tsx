
// # Componente: LoginForm  

// ## Descripción 📦
// Formulario de inicio de sesión con validación y animación.  
// Renderiza inputs, botones y manejo de errores dentro de un `Box` con animación de entrada.  

// ## Funciones 🔧
// - `LoginForm`: componente principal que controla el flujo de login.  
//   - Recibe `showForm` desde `LoginFormType`; si es `false`, retorna `null`.  
//   - Usa `useFormik` para manejar estado, valores y validación del formulario.  
//   - `onSubmit`: despacha `startLoginWithEmailPassword` con email y contraseña.  
//   - Renderiza `LoginFormInputs` para campos, `ApiErrorsHandler` para errores y `LoginFormButtons` para acciones.  
//   - Incluye un `Link` a la ruta `/login` con texto "¿Olvidaste tu contraseña?".  

// ## Notas técnicas 💽
// - Validación con `Yup`: email requerido y válido, contraseña requerida.  
// - Animación: `animate__bounceInRight` de `animate.css`.  
// - Usa `useDispatch` y `useSelector` de Redux para manejar estado de autenticación.  
//-----------------------------------------------------------------------------//


import { Box, Link, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoginFormInputs from "./LoginFormInputs";
import LoginFormButtons from "./LoginFormButtons";
import "animate.css";
import { startLoginWithEmailPassword } from "../../../../../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../../store/auth/authSlice";
import type { LoginFormType } from "../../../../../../typings/auth/authComponentTypes";
import type { AuthLoginRequestPayload } from "../../../../../../typings/auth/authTypes";
import ApiErrorsHandler from "../../../../../shared/components/ErrorHandler/ErrorFormHandler";


const getInitialValues = () => ({
  email: "",
  password: "",
});

const getValidationSchema = () =>
  Yup.lazy(() =>
    Yup.object().shape({
      email: Yup.string()
        .email("Ingresa un E-mail")
        .required("Campo requerido")
        .trim(),
      password: Yup.string().required("Campo requerido"),
    })
  );

  
const LoginForm = ({ showForm }: LoginFormType): React.ReactNode | null => {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((state: RootState) => state);
  const { errorMessage } = auth;

  const onSubmit = async (data: AuthLoginRequestPayload) => {
    const {email, password} = data;
    dispatch(startLoginWithEmailPassword({email,password}));
  }

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: getInitialValues(),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidationSchema(),
  });

  if (!showForm) return null;

  return (
    <Box
      component="form"
      role="form"
      onSubmit={handleSubmit}
      sx={{
        width: {xs: "90%"},
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto"
      }}
      className="animate__animated animate__bounceInRight"
    >
      <LoginFormInputs
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
      />
      <ApiErrorsHandler error={errorMessage}/>
      <Link
        component={LinkReactRouter}
        to={"/login"}
        sx={{
          alignSelf: "center",
          mt: "1em",
          textDecoration: "none",
          textAlign: "center",
          display: "block",
          color: (theme: Theme) => theme?.custom?.fontColor,
          fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
          backgroundColor: (theme: Theme) => theme?.custom?.background,
          borderRadius: "1em",
          width: "90%",
          justifySelf: 'center',
        }}
      >
        ¿Olvidaste tu contraseña?
      </Link>
      <LoginFormButtons errors={errors} />
    </Box>
  );
};

export default LoginForm;

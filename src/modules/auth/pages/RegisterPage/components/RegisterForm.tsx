
// # Componente: RegisterForm  

// ## Descripción 📦
// Formulario de registro de usuario con validación, sanitización y manejo de errores.  
// Renderiza inputs, botones y un enlace de navegación dentro de un `Box`.  

// ## Funciones 🔧
// - `RegisterForm`: componente principal que controla el flujo de registro.  
//   - Usa `useFormik` para manejar estado, valores y validación del formulario.  
//   - `onSubmit`: sanitiza los datos y despacha `startRegister` vía Redux.  
//   - Renderiza `RegisterFormInputs` para campos, `ApiErrorsHandler` para errores y `RegisterFormButtons` para acciones.  
//   - Incluye un `Link` a la ruta `/login` con texto "¿Ya tienes cuenta? Inicia Sesión".  
// - `sanitizeInput`: función auxiliar que limpia entradas y reemplaza caracteres sospechosos.  
// - `getInitialValues`: define valores iniciales del formulario.  
// - `getValidationSchema`: esquema de validación con `Yup` (username, email, password, repeatPassword).  

// ## Notas técnicas 💽
// - Validación estricta: email válido, contraseñas coincidentes.  
// - Manejo de errores centralizado con `handleError` y `ApiErrorsHandler`.  
// - Estilos dinámicos con `Theme` para color y tipografía.  
//-----------------------------------------------------------------------------//


import { Box, Link, type Theme } from "@mui/material";
import RegisterFormInputs from "./RegisterFormInputs";
import RegisterFormButtons from "./RegisterFormButtons";
import { Link as LinkReactRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { AuthRegisterRequestPayload } from "../../../../../typings/auth/authTypes";
import { handleError } from "../../../../../store/shared/handlerStoreError";
import ApiErrorsHandler from "../../../../shared/components/ErrorHandler/ErrorFormHandler";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../store/auth/authSlice";
import { startRegister } from "../../../../../store/auth/thunks";


const sanitizeInput = (input: string, label: string): string => {
  if (typeof input !== 'string') {
    console.warn(`🤖 [${label}] no es texto. Se forzó a string.`);
    input = String(input);
  }

  const sanitized = input.replace(/[^a-zA-Z0-9 @._-]/g, '?');

  if (sanitized !== input) {
    console.warn(`⚠️ [${label}] contenía caracteres sospechosos. Se reemplazaron con "?"`);
    console.warn(`🎭 Original: "${input}"`);
    console.warn(`🧼 Sanitizado: "${sanitized}"`);
  }

  return sanitized;
};

const getInitialValues = () => ({
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const getValidationSchema = () =>
  Yup.lazy(() =>
    Yup.object().shape({
      username: Yup.string().required("Campo requerido").trim(),
      email: Yup.string()
        .email("Ingresa un E-mail")
        .required("Campo requerido")
        .trim(),
      password: Yup.string().required("Campo requerido"),
      repeatPassword: 
        Yup.string()
          .required("Campo requerido")
          .oneOf([Yup.ref("password")], "No coinciden las contraseñas")
    })
  );

  const onSubmit = async (data: AuthRegisterRequestPayload, dispatch: AppDispatch): Promise<void> => {
    try {
      const sanitizedData = {
        username: sanitizeInput(data.username, 'Username'),
        email: sanitizeInput(data.email, 'Email'),
        password: data.password,         // ✅ sin sanitizar
        repeatPassword: data.repeatPassword, // ✅ sin sanitizar
      };
    
      dispatch(startRegister({sanitizedData}));
    } catch (error: unknown) { 
      handleError(error);
    }
  };

const RegisterForm = (): React.ReactNode => {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((state: RootState) => state);
  const { errorMessage } = auth;

  const { errors, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (values) => onSubmit(values, dispatch),
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidationSchema(),
  });

  return (
    <Box
      component={"form"}
      role="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: { xs: "12em", sm: "90%" },
        height: "100%",
      }}
    >
      <RegisterFormInputs
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
      />
      <ApiErrorsHandler error={errorMessage}/>
      <RegisterFormButtons errors={errors} />
      <Link
        component={LinkReactRouter}
        to={"/login"}
        sx={{
          mt: "1em",
          textDecoration: "none",
          textAlign: "center",
          display: "block",
          color: (theme: Theme ) => theme?.custom?.translucidFontColor,
          fontSize: (theme: Theme ) => theme?.typography?.body2.fontSize,
          borderRadius: "1em",
          width: "100%",
        }}
      >
        ¿Ya tienes cuenta? Inicia Sesión
      </Link>
    </Box>
  );
};

export default RegisterForm;

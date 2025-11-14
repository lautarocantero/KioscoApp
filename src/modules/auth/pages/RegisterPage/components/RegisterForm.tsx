import { Box, Link, type Theme } from "@mui/material";
import RegisterFormInputs from "./RegisterFormInputs";
import RegisterFormButtons from "./RegisterFormButtons";
import { Link as LinkReactRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUserRequest } from '/home/lau/Documentos/github/KioscoApp/FrontEnd/src/modules/auth/api/authApi.ts';
import type { AuthRegisterData } from "../../../../../typings/auth/authTypes";

// 🎭 Sanitizador expresivo
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
      repeatPassword: Yup.string().required("Campo requerido"),
    })
  );

// 🧼 Sanitización antes de enviar
const onSubmit = async (data: AuthRegisterData) => {
  try {
    const sanitizedData = {
      username: sanitizeInput(data.username, 'Username'),
      email: sanitizeInput(data.email, 'Email'),
      password: sanitizeInput(data.password, 'Password'),
      repeatPassword: sanitizeInput(data.repeatPassword, 'RepeatPassword'),
    };

    await registerUserRequest(sanitizedData as AuthRegisterData);
    return;
  } catch (error) {
    console.error('Error al registrar:', error);
  }
};

const RegisterForm = (): React.ReactNode => {
  const { errors, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: getInitialValues(),
    onSubmit,
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
        maxWidth: { xs: "12em", sm: "100%" },
        height: "100%",
      }}
    >
      <RegisterFormInputs
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
      />
      <RegisterFormButtons errors={errors} />
      <Link
        component={LinkReactRouter}
        to={"/login"}
        sx={{
          mt: "1em",
          textDecoration: "none",
          textAlign: "center",
          display: "block",
          color: (theme: Theme ) => theme?.custom?.fontColorTransparent,
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

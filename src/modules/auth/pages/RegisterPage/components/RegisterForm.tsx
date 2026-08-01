import { Box, Checkbox, FormControlLabel, Link, Typography, type Theme } from "@mui/material";
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

    dispatch(startRegister({ sanitizedData }));
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
        width: { xs: "90%" },
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <RegisterFormInputs
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
      />

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            sx={{
              color: (theme: Theme) => theme?.custom?.darkGray,
              "&.Mui-checked": {
                color: (theme: Theme) => theme?.palette?.primary?.main,
              },
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
              color: (theme: Theme) => theme?.custom?.fontColor,
            }}
          >
            Acepto los{" "}
            <Link
              component={LinkReactRouter}
              to={"/terms"}
              sx={{
                color: (theme: Theme) => theme?.palette?.primary?.main,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              términos y condiciones
            </Link>
          </Typography>
        }
        sx={{ mt: "0.8em", alignSelf: "flex-start" }}
      />

      <ApiErrorsHandler error={errorMessage} />

      <RegisterFormButtons errors={errors} />

      <Box sx={{ textAlign: "center", mt: "1em" }}>
        <Typography
          component="span"
          sx={{
            color: (theme: Theme) => theme?.custom?.translucidFontColor,
            fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
          }}
        >
          ¿Ya tienes cuenta?{" "}
        </Typography>
        <Link
          component={LinkReactRouter}
          to={"/login"}
          sx={{
            color: (theme: Theme) => theme?.palette?.primary?.main,
            fontWeight: 600,
            fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
            textDecoration: "none",
          }}
        >
          Inicia Sesión
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
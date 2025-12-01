import { Box, Link, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoginFormInputs from "./LoginFormInputs";
import LoginFormButtons from "./LoginFormButtons";
import "animate.css";
import { startLoginWithEmailPassword } from "../../../../../../store/auth/thunks";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../../../store/auth/authSlice";
import type { LoginFormType } from "../../../../../../typings/auth/authComponentTypes";
import type { AuthLoginRequestPayload } from "../../../../../../typings/auth/authTypes";


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

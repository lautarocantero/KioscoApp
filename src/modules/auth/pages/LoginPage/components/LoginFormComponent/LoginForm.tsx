import { Box, Link, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoginFormInputs from "./LoginFormInputs";
import LoginFormButtons from "./LoginFormButtons";
import "animate.css";
import { startLoginWithEmailPassword } from "../../../../../../store/auth/thunks";
import { useDispatch } from "react-redux";
import type { AuthLoginData, LoginFormInterface } from "../../../../../../typings/auth/authTypes";
import type { AppDispatch } from "../../../../../../store/auth/authSlice";


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

  
const LoginForm = ({ showForm }: LoginFormInterface): React.ReactNode | null => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: AuthLoginData) => {
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
        width: "100%",
        maxWidth: "12em",
        height: "100%",
        boxSizing: "border-box",
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
          mt: "1em",
          textDecoration: "none",
          textAlign: "center",
          display: "block",
          color: (theme: Theme) => theme?.custom?.fontColor,
          fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
          backgroundColor: (theme: Theme) => theme?.custom?.background,
          borderRadius: "1em",
          width: "100%",
        }}
      >
        ¿Olvidaste tu contraseña?
      </Link>
      <LoginFormButtons errors={errors} />
    </Box>
  );
};

export default LoginForm;

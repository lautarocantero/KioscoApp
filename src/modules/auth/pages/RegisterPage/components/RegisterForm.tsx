import { Box, Link } from "@mui/material";
import RegisterFormInputs from "./RegisterFormInputs";
import RegisterFormButtons from "./RegisterFormButtons";
import { Link as LinkReactRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const getInitialValues = () => ({
  user: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const getValidationSchema = () =>
  Yup.lazy(() =>
    Yup.object().shape({
      user: Yup.string().required("Campo requerido").trim(),
      email: Yup.string()
        .email("Ingresa un E-mail")
        .required("Campo requerido")
        .trim(),
      password: Yup.string().required("Campo requerido"),
      repeatPassword: Yup.string().required("Campo requerido"),
    })
  );

const RegisterForm = () => {
  const { errors, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (data) => {},
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
          color: (theme) => theme?.custom?.fontColorTransparent,
          fontSize: (theme) => theme?.typography?.body2.fontSize,
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

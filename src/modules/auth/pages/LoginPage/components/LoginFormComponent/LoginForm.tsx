import { Box, Checkbox, FormControlLabel, Grid, Link, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoginFormInputs from "./LoginFormInputs";
import LoginFormButtons from "./LoginFormButtons";
import "animate.css";
import { startLoginWithEmailPassword } from "../../../../../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../../store/auth/authSlice";
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

  
const LoginForm = (): React.ReactNode | null => {
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
    >
      <LoginFormInputs
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
      />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "90%", mt: "0.8em" }}
      >
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
          label="Recordarme"
          sx={{
            color: (theme: Theme) => theme?.custom?.fontColor,
            "& .MuiTypography-root": {
              fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
            },
          }}
        />
        <Link
          component={LinkReactRouter}
          to={"/login"}
          sx={{
            textDecoration: "none",
            color: (theme: Theme) => theme?.palette?.primary?.main,
            fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
            fontWeight: 500,
          }}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </Grid>

      <ApiErrorsHandler error={errorMessage}/>
      <LoginFormButtons errors={errors} />

    </Box>
  );
};

export default LoginForm;

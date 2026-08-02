import { Box, Checkbox, FormControlLabel, Grid, Link, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import { useFormik } from "formik";
import "animate.css";
import LoginFormInputs from "./LoginFormInputs";
import LoginFormButtons from "./LoginFormButtons";
import ApiErrorsHandler from "../../../../../shared/components/ErrorHandler/ErrorFormHandler";
import { useLoginForm } from "../../../../../../hooks/auth/useAuthForm";
import { getLoginInitialValues, loginFormSchema } from "../../../../schema/authFormSchema";

const LoginForm = (): React.ReactNode => {
    const { errorMessage, isSubmitting, handleSubmit, handleGoToRegister } = useLoginForm();

    const { handleSubmit: formikSubmit, values, setFieldValue, errors } = useFormik({
        initialValues: getLoginInitialValues(),
        onSubmit: handleSubmit,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: loginFormSchema,
    });

    return (
        <Box
            component="form"
            role="form"
            onSubmit={formikSubmit}
            sx={{
                width: { xs: "90%" },
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
            }}
        >
            <LoginFormInputs values={values} setFieldValue={setFieldValue} errors={errors} />

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
                                "&.Mui-checked": { color: (theme: Theme) => theme?.palette?.primary?.main },
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

            <ApiErrorsHandler error={errorMessage} />
            <LoginFormButtons errors={errors} isSubmitting={isSubmitting} onGoToRegister={handleGoToRegister} />
        </Box>
    );
};

export default LoginForm;
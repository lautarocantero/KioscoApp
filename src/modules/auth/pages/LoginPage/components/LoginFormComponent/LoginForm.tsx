import { Box, Checkbox, FormControlLabel, Link, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import "animate.css";
import LoginFormInputs from "./LoginFormInputs";
import LoginFormButtons from "./LoginFormButtons";
import ApiErrorsHandler from "../../../../../shared/components/ErrorHandler/ErrorFormHandler";
import { useLoginForm } from "../../../../../../hooks/auth/useAuthForm";
import type { ReactNode } from "react";

const LoginForm = (): ReactNode => {
    const { formik, errorMessage, isSubmitting, handleGoToRegister } = useLoginForm();
    const { handleSubmit: formikSubmit, values, setFieldValue, errors } = formik;

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

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: { xs: "flex-start", sm: "space-between" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 1, sm: 0 },
                    width: "90%",
                    mt: "0.8em",
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={values.rememberMe}
                            onChange={(e) => setFieldValue("rememberMe", e.target.checked)}
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
                    to={"/forgot-password"}
                    sx={{
                        textDecoration: "none",
                        color: (theme: Theme) => theme?.palette?.primary?.main,
                        fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
                        fontWeight: 500,
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </Box>

            <ApiErrorsHandler error={errorMessage} />
            <LoginFormButtons errors={errors} isSubmitting={isSubmitting} onGoToRegister={handleGoToRegister} />
        </Box>
    );
};

export default LoginForm;
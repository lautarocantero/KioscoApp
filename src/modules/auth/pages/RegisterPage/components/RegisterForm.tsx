import { Box, Checkbox, FormControlLabel, Link, Typography, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import { useFormik } from "formik";
import RegisterFormInputs from "./RegisterFormInputs";
import RegisterFormButtons from "./RegisterFormButtons";
import ApiErrorsHandler from "../../../../shared/components/ErrorHandler/ErrorFormHandler";
import { useRegisterForm } from "../../../../../hooks/auth/useAuthForm";
import { getRegisterInitialValues, registerFormSchema } from "../../../schema/authFormSchema";

const RegisterForm = (): React.ReactNode => {
    const { errorMessage, isSubmitting, handleSubmit, handleGoToLogin } = useRegisterForm();

    const { errors, values, handleSubmit: formikSubmit, setFieldValue } = useFormik({
        initialValues: getRegisterInitialValues(),
        onSubmit: handleSubmit,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: registerFormSchema,
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
                margin: "auto",
            }}
        >
            <RegisterFormInputs values={values} setFieldValue={setFieldValue} errors={errors} />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={values.acceptedTerms}
                        onChange={(e) => setFieldValue("acceptedTerms", e.target.checked)}
                        sx={{
                            color: (theme: Theme) => theme?.custom?.darkGray,
                            "&.Mui-checked": { color: (theme: Theme) => theme?.palette?.primary?.main },
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
                            to="/terms"
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

            <RegisterFormButtons
                errors={errors}
                isSubmitting={isSubmitting}
                onGoToLogin={handleGoToLogin}
                disabled={!values.acceptedTerms}
            />
        </Box>
    );
};

export default RegisterForm;
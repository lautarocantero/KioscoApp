import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, type FormikProps } from "formik";
import type {
    AuthForgotPasswordFormValues,
    AuthLoginFormValues,
    AuthRegisterFormValues,
    AuthResetPasswordFormValues,
    UseForgotPasswordFormReturn,
    UseLoginFormReturn,
    UseRegisterFormReturn,
    UseResetPasswordFormReturn,
} from "@typings/auth/authTypes";
import type { AppDispatch, RootState } from "../../store/auth/authSlice";
import { clearAuthError } from "../../store/auth/authSlice";
import { startLoginWithEmailPassword, startRegister, startRequestPasswordReset, startResetPassword } from "../../store/auth/authThunks";
import { sanitizeRegisterValues } from "../../modules/auth/helpers/sanitizeAuthInput";
import { ResetPasswordStatusEnum } from "@typings/auth/authEnums";
import { forgotPasswordFormSchema, getForgotPasswordInitialValues, getLoginInitialValues, getRegisterInitialValues, getResetPasswordInitialValues, loginFormSchema, registerFormSchema, resetPasswordFormSchema } from "../../modules/auth/schema/authFormSchema";

/*══════════════════════════════════════════════╗
║ 🪝 useLoginForm                                ║
╚══════════════════════════════════════════════*/
export function useLoginForm(): UseLoginFormReturn {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { errorMessage } = useSelector((state: RootState) => state.auth);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(clearAuthError());
        // Solo se ejecuta al montar el formulario, no en cada submit.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (values: AuthLoginFormValues) => {
        // Limpiamos cualquier error previo ANTES de intentar, así el usuario
        // no ve un mensaje viejo mientras se procesa el nuevo intento.
        dispatch(clearAuthError());
        setIsSubmitting(true);

        try {
            const user = await dispatch(startLoginWithEmailPassword(values));
            if (user) {
                navigate("/home");
            }
            // Si `user` viene undefined, el thunk ya se encargó de despachar
            // `logout({ errorMessage })`, así que el Redux state ya trae el mensaje
            // y ApiErrorsHandler lo va a mostrar. No hace falta hacer nada más acá.
        } catch (error: unknown) {
            // Red de seguridad: pase lo que pase adentro del thunk (incluso si
            // relanza el error), NUNCA debe quedar como una promesa rechazada
            // sin atrapar. Eso es lo que estaba disparando el overlay de error
            // de Vite y se sentía como si la página se recargara.
            console.error("Login failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik: FormikProps<AuthLoginFormValues> = useFormik({
        initialValues: getLoginInitialValues(),
        onSubmit,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: loginFormSchema,
    });

    const handleGoToRegister = () => navigate("/register");
    const handleGoToForgotPassword = () => navigate("/forgot-password");

    return {
        formik,
        errorMessage,
        isSubmitting,
        handleGoToRegister,
        handleGoToForgotPassword,
    };
}

/*══════════════════════════════════════════════╗
║ 🪝 useRegisterForm                             ║
╚══════════════════════════════════════════════*/
export function useRegisterForm(): UseRegisterFormReturn {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { errorMessage } = useSelector((state: RootState) => state.auth);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registeredUserId, setRegisteredUserId] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(REGISTER_SUCCESS_REDIRECT_SECONDS);

    useEffect(() => {
        dispatch(clearAuthError());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Countdown + redirect: arranca solo cuando isSuccess pasa a true.
    // Se limpia solo (clearInterval en el return) si el componente se
    // desmonta antes de que termine, para no navegar sobre un form ya destruido.
    useEffect(() => {
        if (!isSuccess) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    navigate("/login");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    const onSubmit = async (values: AuthRegisterFormValues) => {
        dispatch(clearAuthError());
        setIsSubmitting(true);
        try {
            const sanitizedData = {
                ...sanitizeRegisterValues(values),
                profilePhoto: values.profilePhoto,
            };

            const _id = await dispatch(startRegister({ sanitizedData }));

            if (_id) {
                setRegisteredUserId(_id);
                // TODO(email-verification): cuando se pague Resend, en vez de
                // isSuccess+redirect a /login, volver a navigate("/check-email").
                setIsSuccess(true);
            }
        } catch (error: unknown) {
            console.error("Register failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik: FormikProps<AuthRegisterFormValues> = useFormik({
        initialValues: getRegisterInitialValues(),
        onSubmit,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: registerFormSchema,
    });

    const handleGoToLogin = () => navigate("/login");

    return {
        formik,
        errorMessage,
        isSubmitting,
        registeredUserId,
        isSuccess,
        secondsLeft,
        handleGoToLogin,
    };
}

const REGISTER_SUCCESS_REDIRECT_SECONDS = 3;

/*══════════════════════════════════════════════╗
║ 🪝 useVerifyEmailForm                          ║
╠══════════════════════════════════════════════╣
║ ⏸️ DESHABILITADO temporalmente: Resend en modo ║
║ free solo entrega mails a la misma dirección   ║
║ registrada, así que la verificación por email  ║
║ trunca todo el flujo de registro. Reactivar    ║
║ cuando se pague el plan de Resend.             ║
╚══════════════════════════════════════════════*/
// export function useVerifyEmailForm(): UseVerifyEmailFormReturn {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();

//     const [status, setStatus] = useState<VerifyEmailStatusEnum>(VerifyEmailStatusEnum.Verifying);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);

//     useEffect(() => {
//         const token = searchParams.get("token");

//         if (!token) {
//             setStatus(VerifyEmailStatusEnum.Error);
//             setErrorMessage("Falta el token de verificación en el link");
//             return;
//         }

//         const verify = async () => {
//             const success = await dispatch(startVerifyEmail({ token }));
//             setStatus(success ? VerifyEmailStatusEnum.Success : VerifyEmailStatusEnum.Error);
//             if (!success) setErrorMessage("El link expiró o no es válido. Solicitá uno nuevo.");
//         };

//         verify();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const handleGoToLogin = () => navigate("/login");
//     const handleGoToRegister = () => navigate("/register");

//     return { status, errorMessage, handleGoToLogin, handleGoToRegister };
// }

/*══════════════════════════════════════════════╗
║ 🪝 useForgotPasswordForm                       ║
╚══════════════════════════════════════════════*/
export function useForgotPasswordForm(): UseForgotPasswordFormReturn {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (values: AuthForgotPasswordFormValues) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        const result = await dispatch(startRequestPasswordReset(values));

        if (result.success) {
            setIsSent(true);
        } else {
            // Esto solo pasa ante un fallo real (red, servidor caído): "el email
            // no existe" el backend lo responde siempre como éxito, a propósito.
            setErrorMessage(result.errorMessage);
        }

        setIsSubmitting(false);
    };

    const formik: FormikProps<AuthForgotPasswordFormValues> = useFormik({
        initialValues: getForgotPasswordInitialValues(),
        onSubmit,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: forgotPasswordFormSchema,
    });

    const handleGoToLogin = () => navigate("/login");

    return { formik, isSubmitting, isSent, errorMessage, handleGoToLogin };
}

/*══════════════════════════════════════════════╗
║ 🪝 useResetPasswordForm                        ║
╚══════════════════════════════════════════════*/
export function useResetPasswordForm(): UseResetPasswordFormReturn {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<ResetPasswordStatusEnum>(ResetPasswordStatusEnum.Idle);
    const [errorMessage, setErrorMessage] = useState<string | null>(
        token ? null : "Falta el token de restablecimiento en el link"
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (values: AuthResetPasswordFormValues) => {
        if (!token) return;

        setIsSubmitting(true);

        const result = await dispatch(startResetPassword({ token, ...values }));

        if (result.success) {
            setStatus(ResetPasswordStatusEnum.Success);
            setErrorMessage(null);
        } else {
            setStatus(ResetPasswordStatusEnum.Error);
            setErrorMessage(result.errorMessage);
        }

        setIsSubmitting(false);
    };

    const formik: FormikProps<AuthResetPasswordFormValues> = useFormik({
        initialValues: getResetPasswordInitialValues(),
        onSubmit,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: resetPasswordFormSchema,
    });

    const handleGoToLogin = () => navigate("/login");
    const handleGoToForgotPassword = () => navigate("/forgot-password");

    return {
        formik,
        status,
        errorMessage,
        isSubmitting,
        hasToken: Boolean(token),
        handleGoToLogin,
        handleGoToForgotPassword,
    };
}
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, type FormikProps } from "formik";
import type {
    AuthLoginFormValues,
    AuthRegisterFormValues,
    UseLoginFormReturn,
    UseRegisterFormReturn,
    UseVerifyEmailFormReturn,
} from "@typings/auth/authTypes";
import type { AppDispatch, RootState } from "../../store/auth/authSlice";
import { clearAuthError } from "../../store/auth/authSlice";
import { startLoginWithEmailPassword, startRegister, startVerifyEmail } from "../../store/auth/authThunks";
import { sanitizeRegisterValues } from "../../modules/auth/helpers/sanitizeAuthInput";
import { VerifyEmailStatusEnum } from "@typings/auth/authEnums";
import { getLoginInitialValues, loginFormSchema } from "../../modules/auth/schema/authFormSchema";

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

    useEffect(() => {
        dispatch(clearAuthError());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (values: AuthRegisterFormValues) => {
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
                navigate("/check-email");
            }
        } catch (error: unknown) {
            console.error("Register failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoToLogin = () => navigate("/login");

    return {
        errorMessage,
        isSubmitting,
        registeredUserId,
        handleSubmit,
        handleGoToLogin,
    };
}

/*══════════════════════════════════════════════╗
║ 🪝 useVerifyEmailForm                          ║
╚══════════════════════════════════════════════*/
export function useVerifyEmailForm(): UseVerifyEmailFormReturn {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [status, setStatus] = useState<VerifyEmailStatusEnum>(VerifyEmailStatusEnum.Verifying);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setStatus(VerifyEmailStatusEnum.Error);
            setErrorMessage("Falta el token de verificación en el link");
            return;
        }

        const verify = async () => {
            const success = await dispatch(startVerifyEmail({ token }));
            setStatus(success ? VerifyEmailStatusEnum.Success : VerifyEmailStatusEnum.Error);
            if (!success) setErrorMessage("El link expiró o no es válido. Solicitá uno nuevo.");
        };

        verify();
        // Se ejecuta una única vez al montar: el token no cambia dentro de esta pantalla.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGoToLogin = () => navigate("/login");
    const handleGoToRegister = () => navigate("/register");

    return { status, errorMessage, handleGoToLogin, handleGoToRegister };
}
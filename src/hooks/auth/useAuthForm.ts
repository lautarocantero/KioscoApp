import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type {
    AuthLoginFormValues,
    AuthRegisterFormValues,
    UseLoginFormReturn,
    UseRegisterFormReturn,
} from "@typings/auth/authTypes";
import type { AppDispatch, RootState } from "../../store/auth/authSlice";
import { clearAuthError } from "../../store/auth/authSlice";
import { startLoginWithEmailPassword, startRegister } from "../../store/auth/authThunks";
import { sanitizeRegisterValues } from "../../modules/auth/helpers/sanitizeAuthInput";

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
    }, [dispatch]);

    const handleSubmit = async (values: AuthLoginFormValues) => {
        const { email, password } = values;
        setIsSubmitting(true);
        try {
            const user = await dispatch(startLoginWithEmailPassword({ email, password }));
            if (user) navigate("/");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoToRegister = () => navigate("/register");
    const handleGoToForgotPassword = () => navigate("/forgot-password");

    return {
        errorMessage,
        isSubmitting,
        handleSubmit,
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
    }, [dispatch]);

    const handleSubmit = async (values: AuthRegisterFormValues) => {
        setIsSubmitting(true);
        try {
            const sanitizedData = {
                ...sanitizeRegisterValues(values),
                profilePhoto: values.profilePhoto,
            };

            const _id = await dispatch(startRegister({ sanitizedData }));

            if (_id) {
                setRegisteredUserId(_id);
                navigate("/login");
            }
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
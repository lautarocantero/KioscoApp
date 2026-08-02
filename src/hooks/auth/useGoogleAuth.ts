// hooks/useGoogleAuth.ts
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import type { UseGoogleAuthReturn } from "@typings/auth/authTypes";
import type { AppDispatch } from "../../store/auth/authSlice";
import { startGoogleLogin } from "../../store/auth/authThunks";


export const useGoogleAuth = (): UseGoogleAuthReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            setError(null);

            const user = await dispatch(
                startGoogleLogin({ accessToken: tokenResponse.access_token })
            );

            if (!user) {
                setError("No se pudo iniciar sesión con Google");
            }

            setIsLoading(false);
        },
        onError: () => {
            setError("No se pudo iniciar sesión con Google");
            setIsLoading(false);
        },
    });

    return { handleGoogleSignIn, isLoading, error };
};
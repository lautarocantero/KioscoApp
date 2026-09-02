// components/common/GoogleAuthButton/GoogleAuthButton.tsx
import { Button, CircularProgress, FormHelperText, type Theme } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import type { GoogleAuthButtonProps } from "@typings/ui/buttons.types";
import { useGoogleAuth } from "../../../../hooks/auth/useGoogleAuth";


export const GoogleAuthButton = ({ label = "Google" }: GoogleAuthButtonProps) => {
    const { handleGoogleSignIn, isLoading, error } = useGoogleAuth();

    return (
        <>
            <Button
                fullWidth
                type="button"
                onClick={() => handleGoogleSignIn()}
                disabled={isLoading}
                sx={{
                    backgroundColor: (theme: Theme) => theme?.custom?.background,
                    border: (theme: Theme) => `1px solid ${theme?.custom?.darkGray}`,
                    "&:hover": {
                        borderColor: (theme: Theme) => theme?.palette?.primary?.main,
                        backgroundColor: (theme: Theme) => theme?.custom?.lightGray,
                    },
                    borderRadius: "0.4em",
                    color: (theme: Theme) => theme?.custom?.fontColor,
                    fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: 1,
                }}
                role="button"
                startIcon={isLoading ? undefined : <GoogleIcon />}
            >
                {isLoading ? <CircularProgress size={20} /> : label}
            </Button>
            {error && <FormHelperText error>{error}</FormHelperText>}
        </>
    );
};
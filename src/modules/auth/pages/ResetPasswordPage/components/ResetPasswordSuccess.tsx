import { Box, Typography, type Theme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import type { ReactNode } from "react";
import { ResetPasswordStatusEnum } from "@typings/auth/authEnums";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";
import type { ResetPasswordSuccessInterface } from "@typings/auth/authComponentTypes";


const ResetPasswordSuccess = ({status, handleGoToLogin}: ResetPasswordSuccessInterface): ReactNode => {

    if (status === ResetPasswordStatusEnum.Error) return null;
    if (status === ResetPasswordStatusEnum.Idle) return null;
  

    return (
        <Box
            sx={{
                width: { xs: "90%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                margin: "auto",
                textAlign: "center",
            }}
        >
            <CheckCircle sx={{ fontSize: 48, color: (theme: Theme) => theme?.palette?.success?.main }} />
            <Typography sx={{ color: (theme: Theme) => theme?.custom?.fontColor }}>
                Tu contraseña fue actualizada con éxito.
            </Typography>
            <PrimaryButtonComponent
                buttonText="Iniciar sesión"
                buttonOnClick={handleGoToLogin}
                buttonWidth={{ xs: "100%", md: "100%" }}
                buttonType="button"
                buttonColor="default"
                padding={1}
            />
        </Box>
    );
};

export default ResetPasswordSuccess;
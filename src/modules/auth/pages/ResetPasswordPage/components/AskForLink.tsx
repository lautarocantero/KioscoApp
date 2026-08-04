import { Box, Typography, type Theme } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import type { ReactNode } from "react";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";
import type { AskForLinkInterface } from "@typings/auth/authComponentTypes";


const AskForLink = ({ hasToken,errorMessage,handleGoToForgotPassword }: AskForLinkInterface ): ReactNode => {

    if(hasToken) return null;

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
            <ErrorOutline sx={{ fontSize: 48, color: (theme: Theme) => theme?.palette?.error?.main }} />
            <Typography sx={{ color: (theme: Theme) => theme?.palette?.error?.main }}>
                {errorMessage}
            </Typography>
            <PrimaryButtonComponent
                buttonText="Pedir un link nuevo"
                buttonOnClick={handleGoToForgotPassword}
                buttonWidth={{ xs: "100%", md: "100%" }}
                buttonType="button"
                buttonColor="default"
                padding={1}
            />
        </Box>
    );
};

export default AskForLink;
import PrimaryButton from "../../../../../shared/components/Buttons/PrimaryButtonComponent";
import { Box, Divider, Link, Typography, type Theme } from "@mui/material";
import type { LoginFormButtonsInterface } from "../../../../../../typings/auth/authComponentTypes";
import { GoogleAuthButton } from "../../../../../shared/components/Buttons/GoogleButton";
import type { ReactNode } from "react";


const LoginFormButtons = ({
  errors,
  isSubmitting,
  onGoToRegister,
}: LoginFormButtonsInterface): ReactNode => {


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        margin: "1.5em 0em 0em",
        width: "90%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <PrimaryButton
          buttonText="Iniciar sesión"
          buttonOnClick={() => {}}
          buttonWidth={{ xs: "100%", md: '100%' }}
          buttonType="submit"
          buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
          padding={1}
          disabled={isSubmitting}
        />
      </Box>

      <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1.5, my: 1 }}>
        <Divider sx={{ flex: 1, borderColor: (theme: Theme) => theme?.custom?.darkGray }} />
        <Typography
          sx={{
            color: (theme: Theme) => theme?.custom?.translucidFontColor,
            fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
            whiteSpace: "nowrap",
          }}
        >
          o continúa con
        </Typography>
        <Divider sx={{ flex: 1, borderColor: (theme: Theme) => theme?.custom?.darkGray }} />
      </Box>

      <Box sx={{ width: "100%" }}>
        <GoogleAuthButton label="Iniciar sesión con Google" />
      </Box>

      <Box
        sx={(theme: Theme) => ({
          width: "100%",
          textAlign: "center",
          mt: 2,
          pt: 2,
          borderTop: `1px solid ${theme?.custom?.darkGray}`,
        })}
      >
        <Typography
          component="span"
          sx={{
            color: (theme: Theme) => theme?.custom?.translucidFontColor,
            fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
          }}
        >
          ¿No tienes cuenta?{" "}
        </Typography>
        <Link
          component="button"
          type="button"
          onClick={onGoToRegister}
          sx={{
            color: (theme: Theme) => theme?.palette?.primary?.main,
            fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Crear cuenta
        </Link>
      </Box>
    </Box>
  );
};

export default LoginFormButtons;

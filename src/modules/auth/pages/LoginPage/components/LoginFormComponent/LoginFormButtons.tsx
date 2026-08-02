import PrimaryButton from "../../../../../shared/components/Buttons/PrimaryButtonComponent";
import { Button, Divider, Grid, Link, Typography, type Theme } from "@mui/material";
import type { LoginFormButtonsInterface } from "../../../../../../typings/auth/authComponentTypes";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.9 5.1 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.5-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.7 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.9 5.1 29.7 3 24 3 16.3 3 9.6 7.4 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 45c5.6 0 10.7-2.1 14.5-5.6l-6.7-5.5C29.6 35.5 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.5 40.6 16.2 45 24 45z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.9l6.7 5.5C41.4 36 44 30.5 44 24c0-1.4-.1-2.5-.4-3.5z"/>
  </svg>
);

const LoginFormButtons = ({
  errors,
  isSubmitting,
  onGoToRegister,
}: LoginFormButtonsInterface): React.ReactNode => {

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      spacing={2}
      alignItems={"center"}
      sx={{ margin: "1.5em 0em 0em", width: "90%" }}
    >
      <Grid component={"div"} display={"flex"} justifyContent={'center'} width={"100%"}>
        <PrimaryButton
          buttonText="Iniciar sesión"
          buttonOnClick={() => {}}
          buttonWidth={{ xs: "100%", md: '100%' }}
          buttonType="submit"
          buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
          padding={1}
          disabled={isSubmitting}
        />
      </Grid>

      <Grid component={"div"} width={"100%"} sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 1 }}>
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
      </Grid>

      <Grid component={"div"} width={"100%"}>
        <Button
          fullWidth
          sx={{
            backgroundColor: (theme: Theme) => theme?.custom?.lightBackground,
            borderRadius: "0.8em",
            color: (theme: Theme) => theme?.custom?.fontColor,
            fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
            textTransform: "none",
            fontWeight: 600,
            padding: 1,
          }}
          role="button"
          startIcon={<GoogleIcon />}
        >
          Google
        </Button>
      </Grid>

      <Grid component={"div"} width={"100%"} sx={{ textAlign: "center", mt: 1 }}>
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
      </Grid>
    </Grid>
  );
};

export default LoginFormButtons;
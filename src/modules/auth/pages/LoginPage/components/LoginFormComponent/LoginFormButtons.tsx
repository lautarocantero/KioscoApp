import PrimaryButton from "../../../../../shared/components/Buttons/PrimaryButtonComponent";
import { Button, Divider, Grid, Link, Typography, type Theme } from "@mui/material";
import type { LoginFormButtonsInterface } from "../../../../../../typings/auth/authComponentTypes";
import { GoogleIcon } from "../../../../../shared/components/GoogleIcon/GoogleIcon";


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
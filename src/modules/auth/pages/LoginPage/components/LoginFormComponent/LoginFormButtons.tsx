import PrimaryButton from "../../../../../shared/components/PrimaryButton";
import EmptyButton from "../../../../../shared/components/EmptyButton";
import { Button, Grid, Typography, type Theme } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { LoginFormButtonsInterface } from "../../../../../../typings/auth/authComponentTypes";

const LoginFormButtons = ({ errors }: LoginFormButtonsInterface): React.ReactNode => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ mt: 2 }}
      alignItems={"center"}
    >
      <Grid component={"div"} width={"100%"}>
        <PrimaryButton
          buttonText="Continuar"
          buttonOnClick={() => {}}
          buttonWidth="100%"
          buttonType="submit"
          buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
        />
      </Grid>
      <Grid component={"div"}>
        <Typography
          sx={{
            color: (theme: Theme) => theme?.custom?.fontColor,
            fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
            textAlign: "center",
            margin: 2,
          }}
        >
          Conectar con
        </Typography>
      </Grid>
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <Grid component={"div"}>
          <Button
            sx={{
              backgroundColor: (theme: Theme) => theme?.palette?.error?.main,
              borderRadius: "35px",
              color: (theme: Theme) => theme?.custom?.white,
              fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
              textTransform: "none",
              fontWeight: "bold",
            }}
            role="button"
          >
            <Google
              sx={{
                fontSize: (theme: Theme) => theme?.typography?.body1?.fontSize,
                mr: 1,
              }}
            />
            Google
          </Button>
        </Grid>
      </Grid>
      <Grid component={"div"} width={"100%"}>
        <EmptyButton
          buttonText="Crear cuenta"
          buttonOnClick={() => {
            navigate("/register");
          }}
          buttonWidth="100%"
        />
      </Grid>
    </Grid>
  );
};

export default LoginFormButtons;

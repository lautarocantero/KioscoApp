import PrimaryButton from "../../../../../shared/components/Buttons/PrimaryButtonComponent";
import { Button, Grid, Typography, type Theme } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { LoginFormButtonsInterface } from "../../../../../../typings/auth/authComponentTypes";
import EmptyButton from "../../../../../shared/components/Buttons/EmptyButton";

const LoginFormButtons = ({ errors }: LoginFormButtonsInterface): React.ReactNode => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      spacing={2}
      alignItems={"center"}
      sx={{
        margin: "2em 0em 0em"
      }}
    >
      <Grid 
        component={"div"} 
        display={"flex"}
        justifyContent={'center'}
        width={"100%"}
      >
        <PrimaryButton
          buttonText="Continuar"
          buttonOnClick={() => {}}
          buttonWidth={{ xs: "15em", md: '100%'}}
          buttonType="submit"
          buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
          padding={0.3}
        />
      </Grid>
      <Grid component={"div"}>
        <Typography
          sx={{
            color: (theme: Theme) => theme?.custom?.fontColor,
            fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
            textAlign: "center",
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
              padding: 0.4 ,
            }}
            role="button"
          >
            <Google
              sx={{
                fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
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

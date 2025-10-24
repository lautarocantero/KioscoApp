import { Grid } from "@mui/material";
import LinksComponent from "../../../../../shared/components/LinksComponent";

const availableLinks = [
  {
    label: "Inicio de sesión",
    to: "/login",
    underline: "underline",
  },
  {
    label: "Registro",
    to: "/register",
    underline: "none",
  },
];

const LoginAppBarLinks = () => {
  return (
    <Grid
      component={"div"}
      display={{ xs: "none", md: "flex" }}
      flexDirection={"row"}
      gap={2}
      sx={{
        color: (theme) => theme?.custom?.fontColor,
      }}
    >
      <LinksComponent linksToShow={availableLinks} />
    </Grid>
  );
};

export default LoginAppBarLinks;

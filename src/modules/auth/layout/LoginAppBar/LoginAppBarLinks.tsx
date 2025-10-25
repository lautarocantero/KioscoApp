import { Grid } from "@mui/material";
import LinksComponent from "../../../shared/components/LinksComponent";
import { useLocation } from "react-router-dom";

const getAvailableLinks = (pathname: string) => [
  {
    label: "Inicio de sesión",
    to: "/login",
    underline: {
      xs: "none" as const,
      md: pathname === "/login" ? ("underline" as const) : ("none" as const),
    },
  },
  {
    label: "Registro",
    to: "/register",
    underline: {
      xs: "none" as const,
      md: pathname === "/register" ? ("underline" as const) : ("none" as const),
    },
  },
];

const LoginAppBarLinks = () => {
  const location = useLocation();

  return (
    <Grid
      component="div"
      display={{ xs: "none", md: "flex" }}
      flexDirection="row"
      gap={2}
      sx={{
        color: (theme) => theme?.custom?.fontColor,
      }}
    >
      <LinksComponent linksToShow={getAvailableLinks(location.pathname)} />
    </Grid>
  );
};

export default LoginAppBarLinks;

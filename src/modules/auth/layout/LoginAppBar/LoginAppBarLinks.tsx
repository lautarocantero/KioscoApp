
import { Grid, type Theme } from "@mui/material";
import LinksComponent from "../../../shared/components/Links/LinksComponent";
import { useLocation } from "react-router-dom";
import { Breakpoint, UnderlineVariant } from "../../../../typings/ui/ui";
import type { LinkInterface } from "@typings/ui/appbar.types";

const getAvailableLinks = (pathname: string) : LinkInterface[] => [
  {
    label: "Inicio de sesión",
    to: "/login",
    underline: {
      [Breakpoint.Xs]: UnderlineVariant.None,
      [Breakpoint.Md]: pathname === "/login"
        ? UnderlineVariant.Underline
        : UnderlineVariant.None,
    },
  },
  {
    label: "Registro",
    to: "/register",
    underline: {
      [Breakpoint.Xs]: UnderlineVariant.None,
      [Breakpoint.Md]: pathname === "/register"
        ? UnderlineVariant.Underline
        : UnderlineVariant.None,
    },
  },
];

const LoginAppBarLinks = (): React.ReactNode => {
  const location = useLocation();

  return (
    <Grid
      component="div"
      display={{ xs: "none", md: "flex" }}
      flexDirection="row"
      gap={2}
      sx={{
        color: (theme: Theme) => theme?.custom?.fontColor,
      }}
    >
      <LinksComponent linksToShow={getAvailableLinks(location.pathname)} />
    </Grid>
  );
};

export default LoginAppBarLinks;

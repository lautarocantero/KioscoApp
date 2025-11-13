import { CircularProgress, Typography, Grid, type Theme } from "@mui/material";

const LoginLoader = (): React.ReactNode => {
  return (
    <Grid
      container
      rowSpacing={15}
      sx={(theme: Theme) => ({
        display: { xs: "flex", md: "flex" },
        flexDirection: { md: "column" },
        alignItems: { xs: "center" },
        width: { xs: "100%", sm: "90%", md: "80%" },
        justifyContent: "center",
        margin: "auto",
        padding: "3em 0",
        borderRadius: { xs: "0", md: "1em" },
        color: theme?.custom?.fontColor,
        backgroundColor: {
          xs: "transparent",
          md: theme.custom?.backgroundDark || "rgba(0,0,0,0.6)", // Fallback opcional
        },
      })}
    >
      <Typography
        variant="h2"
        sx={(theme: Theme) => ({
          fontSize: theme?.typography?.h2?.fontSize,
        })}
      >
        Bienvenido a Kiosco!
      </Typography>
      <Typography>La mejor forma de gestionar tu local minorista</Typography>
      <CircularProgress />
    </Grid>
  );
};

export default LoginLoader;

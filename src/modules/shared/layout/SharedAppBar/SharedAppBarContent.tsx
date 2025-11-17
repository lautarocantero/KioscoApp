import { Grid, Typography, type Theme } from "@mui/material";
import LightMode from "../../components/LightMode";
import { useContext } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";

const SharedAppBarContent = (): React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
      sx={(theme: Theme) => ({
        color: theme.custom?.white,
        justifyContent: "space-between",
      })}
    >
      <Typography 
        sx={(theme: Theme) => ({ 
          fontSize: theme?.typography?.h4,
          color: `${appTheme ? "#333333" : "#eff0f8"}`,
        })}>
        Kiosco
      </Typography>
      <LightMode />
    </Grid>
  );
};

export default SharedAppBarContent;

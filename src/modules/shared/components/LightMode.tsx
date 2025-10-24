import { Brightness4, ModeNight } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import { Grid } from "@mui/material";

const LightMode = () => {
  const { appTheme, setAppTheme } = useContext(ThemeContext);

  return (
    <Grid
      container
      display={"flex"}
      alignItems={"center"}
      aria-label="cambiar modo de tema"
      sx={(theme) => ({
        backgroundColor: theme?.custom?.blackTranslucid || "rgba(0,0,0,0.6)",
        padding: "0.2em 0.5em",
        borderRadius: "1em",
        gap: 1,
        cursor: "pointer",
      })}
      onClick={() => setAppTheme((prev: boolean) => !prev)}
    >
      <Brightness4
        sx={{
          color: (theme) =>
            appTheme ? theme?.custom?.white : theme?.custom?.blackTranslucid,
        }}
      />
      <ModeNight
        sx={{
          color: (theme) =>
            !appTheme ? theme?.custom?.white : theme?.custom?.blackTranslucid,
        }}
      />
    </Grid>
  );
};

export default LightMode;

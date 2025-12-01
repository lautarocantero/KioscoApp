import { Brightness4, ModeNight } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";
import { Grid, type Theme } from "@mui/material";

const LightMode = () => {
  const { appTheme, setAppTheme } = useContext(ThemeContext);

  return (
    <Grid
      container
      display={"flex"}
      alignItems={"center"}
      aria-label="cambiar modo de tema"
      sx={(theme: Theme) => ({
        backgroundColor: theme?.custom?.blackTranslucid || "rgba(0,0,0,0.6)",
        borderRadius: "1em",
        cursor: "pointer",
        gap: 1,
        height: 'auto',
        padding: "0.2em 0.5em",
      })}
      onClick={() => {
        setAppTheme((prev: boolean) => !prev);
        localStorage.setItem("appTheme", JSON.stringify(!appTheme));
      }}
    >
      <Brightness4
        sx={(theme: Theme) =>({
          color: appTheme ? theme?.custom?.white : theme?.custom?.blackTranslucid,
          height: '0.8em',
        })}
      />
      <ModeNight
        sx={(theme: Theme) =>({
          color: !appTheme ? theme?.custom?.white : theme?.custom?.blackTranslucid,
          height: '0.8em',
        })}
      />
    </Grid>
  );
};

export default LightMode;

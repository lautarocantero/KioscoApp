import { Brightness4, ModeNight } from "@mui/icons-material";
import { Box, type Theme } from "@mui/material";
import { useThemeModeOption } from "@hooks/ui/useThemeModeOption";
import { ThemeModeEnum } from "@typings/settings/settingsEnums";

const LightMode = () => {
  const { mode, setMode } = useThemeModeOption();
  const appTheme = mode === ThemeModeEnum.Light;

  return (
    <Box
      component="button"
      type="button"
      role="switch"
      aria-checked={appTheme}
      aria-label="cambiar modo de tema"
      onClick={() => setMode(appTheme ? ThemeModeEnum.Dark : ThemeModeEnum.Light)}
      sx={(theme: Theme) => ({
        height: "36px",
        width: "36px",
        padding: 0,
        border: `1px solid ${theme?.custom?.darkGray}`,
        borderRadius: "0.4em",
        backgroundColor: theme?.custom?.background,
        color: theme?.custom?.darkWhite,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          borderColor: theme?.palette?.primary?.main,
          color: theme?.palette?.primary?.main,
        },
      })}
    >
      {appTheme ? (
        <ModeNight sx={{ fontSize: "1.2rem" }} />
      ) : (
        <Brightness4 sx={{ fontSize: "1.2rem" }} />
      )}
    </Box>
  );
};

export default LightMode;

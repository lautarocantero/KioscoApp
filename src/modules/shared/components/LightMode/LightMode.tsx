import { Brightness4, ModeNight } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";
import { Box, type Theme } from "@mui/material";

const THUMB_SIZE = 22;
const GAP = 4;
const PADDING = 3;

const LightMode = () => {
  const { appTheme, setAppTheme } = useContext(ThemeContext);

  return (
    <Box
      role="switch"
      aria-checked={appTheme}
      aria-label="cambiar modo de tema"
      onClick={() => {
        setAppTheme((prev: boolean) => !prev);
        localStorage.setItem("appTheme", JSON.stringify(!appTheme));
      }}
      sx={(theme: Theme) => ({
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: `${GAP}px`,
        width: "fit-content",
        backgroundColor: theme?.custom?.translucidFontColor,
        borderRadius: "0.4em",
        cursor: "pointer",
        padding: `${PADDING}px`,
        boxSizing: "border-box",
      })}
    >
      {/* Thumb deslizante */}
      <Box
        sx={(theme: Theme) => ({
          position: "absolute",
          top: PADDING,
          left: PADDING,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: "0.3em",
          backgroundColor: theme?.custom?.background,
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.15)",
          transform: appTheme
            ? "translateX(0)"
            : `translateX(${THUMB_SIZE + GAP}px)`,
          transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        })}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Brightness4
          sx={(theme: Theme) => ({
            fontSize: "1.1em",
            color: appTheme ? theme?.palette?.primary?.main : theme?.custom?.blackTranslucid,
          })}
        />
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModeNight
          sx={(theme: Theme) => ({
            fontSize: "1em",
            color: !appTheme ? theme?.palette?.primary?.main : theme?.custom?.blackTranslucid,
          })}
        />
      </Box>
    </Box>
  );
};

export default LightMode;
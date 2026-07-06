import { Box, Typography, type Theme } from "@mui/material";
import type { OptionsHeaderInterface } from "../../../../typings/ui/uiModules";
import { useLocation } from "react-router-dom";

const OptionsHeader = ({ isOptions, title, icon, appTheme }: OptionsHeaderInterface): React.ReactNode => {

  const { pathname } = useLocation(); 
  const isHome = pathname === "/home";
  
  if (!isOptions) return <></>;

  return (
    <Box
      sx={(theme: Theme) => ({
        width: "100%",
        borderBottom: `0.5px solid ${
          !appTheme ? "rgba(255,255,255,0.1)" : theme.custom?.blackTranslucid
        }`,
      })}
    >
      {isHome && (
        <Typography
          variant="body2"
          sx={(theme: Theme) => ({
            color: theme.custom?.fontColor,
            mb: 0.5,
            display: "block",
            fontWeight: 400,
          })}
        >
          ¡Hola! 👋
        </Typography>
      )}
      <Typography
        variant="h2"
        sx={(theme: Theme) => ({
          fontSize: {
            xs: theme.typography?.h5.fontSize,
            sm: theme.typography?.h4.fontSize,
            md: theme.typography?.h2.fontSize,
          },
          fontWeight: 500,
          color: !appTheme ? theme.custom?.white : theme.custom?.whiteDark,
        })}
      >
        {icon && (
          <Box component="span" sx={(theme) => ({ mr: 1, verticalAlign: "middle", color: theme?.palette?.primary?.main  })}>
            {icon}
          </Box>
        )}
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={(theme: Theme) => ({
          color: !appTheme
            ? theme.custom?.translucidWhite
            : theme.custom?.whiteDarkTransparent,
          mt: 0.5,
          display: "block",
        })}
      >
        Seleccioná una opción para continuar
      </Typography>
    </Box>
  );
};

export default OptionsHeader;
import { Box, Typography, type Theme } from "@mui/material";
import type { OptionsHeaderInterface } from "@typings/ui/layout.types";
import { useContext, type ReactNode } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";

const OptionsHeader = ({ isOptions, title, icon, greetings }: OptionsHeaderInterface): ReactNode => {
  const { appTheme: isDarkMode } = useContext(ThemeContext);
  
  if (!isOptions) return null;

  return (
    <Box
      component={"header"}
      sx={(theme: Theme) => ({
        width: "100%",
        borderBottom: `0.5px solid ${
          theme.custom?.darkGray
        }`,
      })}
    >
      {greetings && (
        <Typography
          variant="body2"
          sx={(theme: Theme) => ({
            color: theme.custom?.fontColor,
            mb: 0.5,
            display: "block",
            fontWeight: 400,
          })}
        >
          {greetings}
        </Typography>
      )}
      <Typography
        variant="h2"
        component="h1"
        sx={(theme: Theme) => ({
          fontSize: {
            xs: theme.typography?.h5.fontSize,
            sm: theme.typography?.h4.fontSize,
            md: theme.typography?.h2.fontSize,
          },
          fontWeight: 500,
          color: !isDarkMode ? theme.custom?.white : theme.custom?.darkWhite,
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
          color: !isDarkMode
            ? theme.custom?.translucidWhite
            : theme.custom?.darkWhite,
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
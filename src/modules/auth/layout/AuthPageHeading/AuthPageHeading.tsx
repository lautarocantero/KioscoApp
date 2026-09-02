import { Box, Typography, type Theme } from "@mui/material";
import type { AuthPageHeadingProps } from "@typings/auth/authComponentTypes";

const AuthPageHeading = ({ eyebrow, title }: AuthPageHeadingProps): React.ReactNode => (
  <Box component="header" sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
    <Typography
      component="span"
      sx={(theme: Theme) => ({
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: theme.palette.primary.main,
      })}
    >
      {eyebrow}
    </Typography>

    <Typography
      component="h1"
      sx={(theme: Theme) => ({
        mt: "0.5em",
        fontWeight: 700,
        fontSize: { xs: theme.typography.h3.fontSize, md: "2.125rem" },
        letterSpacing: "-0.02em",
        color: theme.custom?.fontColor,
      })}
    >
      {title}
    </Typography>

    <Box
      sx={(theme: Theme) => ({
        height: "2px",
        width: "100%",
        mt: { xs: 2, md: 3 },
        backgroundColor: theme.custom?.fontColor,
      })}
    />
  </Box>
);

export default AuthPageHeading;

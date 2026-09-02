import { Box, type Theme } from "@mui/material";
import LightMode from "../../../shared/components/LightMode/LightMode";
import AuthCompactBrand from "../AuthCompactBrand/AuthCompactBrand";

const LoginAppBarContent = (): React.ReactNode => {
  return (
    <Box
      sx={(theme: Theme) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        color: theme.custom?.white,
        justifyContent: { xs: "space-between", md: "flex-end" },
      })}
    >
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <AuthCompactBrand />
      </Box>
      <LightMode />
    </Box>
  );
};

export default LoginAppBarContent;

import { Box } from "@mui/material";
import type { Theme } from "@mui/material";
import type { SidebarLogoProps } from "@typings/ui/uiModules";

const SidebarLogo = ({ dark, onClick }: SidebarLogoProps) => (
  <Box
    onClick={onClick}
    sx={(theme: Theme) => ({
      cursor: "pointer",
      backgroundColor: dark ? theme.custom?.whiteTranslucid : theme.custom?.blackTranslucid,
      borderRadius: "0.2em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
      ml: "14px",
      mb: 1,
      flexShrink: 0,
    })}
  >
    <svg width="32" height="32" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 24 Q9 45 26 46 Q43 45 42 24 Z" fill="white" opacity="0.95" />
      <path d="M16 24 L15 11 Q15 7 19 7 L19 12 Q17.5 12 17.5 14 L17.5 24 Z" fill="white" opacity="0.95" />
      <path d="M36 24 L37 11 Q37 7 33 7 L33 12 Q34.5 12 34.5 14 L34.5 24 Z" fill="white" opacity="0.95" />
      <path d="M19 24 L19 16 Q19 13 22 13 L30 13 Q33 13 33 16 L33 24 Z" fill="white" opacity="0.3" />
      <rect x="10" y="22.5" width="32" height="3.5" rx="1.5" fill="white" opacity="0.3" />
    </svg>
  </Box>
);

export default SidebarLogo;
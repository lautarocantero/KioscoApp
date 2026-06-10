import { Box } from "@mui/material";
import type { Theme } from "@mui/material";
import type { SidebarSubLinkProps } from "@typings/ui/uiModules";


const SidebarSubLink = ({ subLink, dark, isActive, onClick }: SidebarSubLinkProps) => (
  <Box
    onClick={() => onClick(subLink.url)}
    sx={(theme: Theme) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      height: "30px",
      px: "12px",
      borderRadius: "6px",
      mx: "4px",
      cursor: "pointer",
      fontSize: "12px",
      whiteSpace: "nowrap",
      color: isActive
        ? dark ? theme.custom?.fontColor        : theme.custom?.backgroundDark
        : dark ? theme.custom?.fontColorTransparent : theme.custom?.fontColorDarkTransparent,
      fontWeight: isActive ? 500 : 400,
      transition: "background 0.12s, color 0.12s",
      "&:hover": {
        backgroundColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        color: dark ? theme.custom?.fontColor : theme.custom?.fontColorDark,
      },
    })}
  >
    <Box
      component="span"
      sx={{
        width: "4px", height: "4px",
        borderRadius: "50%",
        backgroundColor: "currentColor",
        flexShrink: 0,
        opacity: 0.6,
      }}
    />
    {subLink.label}
  </Box>
);

export default SidebarSubLink;
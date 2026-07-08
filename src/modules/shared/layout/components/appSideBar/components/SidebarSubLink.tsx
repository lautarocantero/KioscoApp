import { Box } from "@mui/material";
import type { Theme } from "@mui/material";
import type { SidebarSubLinkProps } from "@typings/ui/sidebar.types";


const SidebarSubLink = ({ subLink, isActive, onClick }: SidebarSubLinkProps) => {
  const {url, label } = subLink;

  return (
    <Box
      onClick={() => onClick(url)}
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
        color: isActive ? theme.custom.white : theme.custom?.translucidWhite,
        fontWeight: isActive ? 500 : 400,
        transition: "background 0.12s, color 0.12s",
        "&:hover": {
          backgroundColor: theme.custom.darkGray,
          color: theme.custom?.white,
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
      {label}
    </Box>
)}

export default SidebarSubLink;
import { Box } from "@mui/material";
import type { Theme } from "@mui/material";
import SidebarSubLink from "./SidebarSubLink";
import type { SidebarSubGroupProps } from "@typings/ui/uiModules";


const SidebarSubGroup = ({ group, dark, isHovered, isSubLinkActive, onNavigate }: SidebarSubGroupProps) => (
  <Box>
    <Box
      sx={(theme: Theme) => ({
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: dark ? theme.custom?.translucidWhite : theme.custom?.whiteDarkTransparent,
        px: "12px",
        pt: "8px",
        pb: "2px",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.15s 0.05s",
        whiteSpace: "nowrap",
      })}
    >
      {group.groupLabel}
    </Box>

    {group.links.map((subLink) => (
      <SidebarSubLink
        key={subLink.url}
        subLink={subLink}
        dark={dark}
        isActive={isSubLinkActive(subLink.url)}
        onClick={onNavigate}
      />
    ))}
  </Box>
);

export default SidebarSubGroup;
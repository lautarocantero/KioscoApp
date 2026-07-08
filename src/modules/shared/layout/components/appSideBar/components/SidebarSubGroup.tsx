import { Box } from "@mui/material";
import type { Theme } from "@mui/material";
import SidebarSubLink from "./SidebarSubLink";
import type { SidebarSubGroupProps } from "@typings/ui/sidebar.types";


const SidebarSubGroup = ({ group, isHovered, isSubLinkActive, onNavigate }: SidebarSubGroupProps) => {
  const { groupLabel, links} = group;

  return (
  <Box>
    <Box
      sx={(theme: Theme) => ({
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color:  theme.custom?.white,
        px: "12px",
        pt: "8px",
        pb: "2px",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.15s 0.05s",
        whiteSpace: "nowrap",
      })}
    >
      {groupLabel}
    </Box>

    {links.map((subLink) => (
      <SidebarSubLink
        key={subLink.url}
        subLink={subLink}
        isActive={isSubLinkActive(subLink.url)}
        onClick={onNavigate}
      />
    ))}
  </Box>
);}

export default SidebarSubGroup;
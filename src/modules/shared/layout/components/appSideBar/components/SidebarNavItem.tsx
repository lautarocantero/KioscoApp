import { alpha, Box, Tooltip } from "@mui/material";
import type { Theme } from "@mui/material";
import type { SidebarNavItemProps } from "@typings/ui/sidebar.types";
import SidebarExpandMore from "./SidebarExpandMore";
import SidebarExpandedList from "./SidebarExpandedList";

const SidebarNavItem = ({
  link,
  isHovered,
  isActive,
  isOpen,
  hasSubGroups,
  subGroups,
  onRowClick,
  isSubLinkActive,
  onNavigate,
}: SidebarNavItemProps) => {
  const {icon, description} = link;

  return (
  <Box sx={{ width: "100%", borderRadius: "8px", overflow: "hidden", minWidth: 0 }}>
    <Tooltip title={!isHovered ? description : ""} placement="right">
      <Box
        onClick={() => onRowClick(link)}
        sx={(theme: Theme) => ({
          display: "flex",
          alignItems: "center",
          gap: "10px",
          height: "36px",
          px: "6px",
          borderRadius: "8px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          width: isHovered ? "100%" : "36px",
          transition: "background-color 0.15s, color 0.15s, width 0.22s cubic-bezier(.4,0,.2,1), backdrop-filter 0.15s",
          color: theme.custom.fontColor,
          backgroundColor: isActive
            ? isHovered
              ? theme.palette?.primary?.light : theme.custom?.blackTranslucid
              : alpha(theme.palette?.primary?.main, 0.30),
          backdropFilter: isActive && !isHovered ? "blur(8px)" : "none",
          border: isActive && !isHovered
            ? `1px solid ${theme.custom.lightGray}`
            : "1px solid transparent",

          "&:hover": {
            backgroundColor: theme.palette?.primary?.light,
            color: theme.custom.darkWhite,
            backdropFilter: "none",
          },
        })}
      >
        <Box sx={(theme: Theme) => ({ 
          color: theme.custom.white,
          fontSize: "1.1rem",
          flexShrink: 0,
          width: "24px",
          display: "flex",
          justifyContent: "center" 
        })}>
          {icon}
        </Box>

        <Box
          sx={(theme: Theme) => ({
            color: theme.custom.white,
            flex: 1,
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.15s 0.05s",
            overflow: "hidden",
          })}
        >
          {description}
        </Box>

        <SidebarExpandMore isHovered={isHovered} isOpen={isOpen} hasSubGroups={hasSubGroups} />

      </Box>
    </Tooltip>

    <SidebarExpandedList
      hasSubGroups={hasSubGroups}
      isOpen={isOpen}
      isHovered={isHovered}
      subGroups={subGroups}
      isSubLinkActive={isSubLinkActive}
      onNavigate={onNavigate}
    />

  </Box>
)};

export default SidebarNavItem;
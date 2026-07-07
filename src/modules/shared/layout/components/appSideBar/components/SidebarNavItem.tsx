import { alpha, Box, Collapse, Tooltip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Theme } from "@mui/material";
import SidebarSubGroup from "./SidebarSubGroup";
import type { SidebarNavItemProps } from "@typings/ui/sidebar.types";

const SidebarNavItem = ({
  link,
  dark,
  isHovered,
  isActive,
  isOpen,
  hasSubGroups,
  subGroups,
  onRowClick,
  isSubLinkActive,
  onNavigate,
}: SidebarNavItemProps) => (
  <Box sx={{ width: "100%", borderRadius: "8px", overflow: "hidden", minWidth: 0 }}>
    <Tooltip title={!isHovered ? link.description : ""} placement="right">
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
          color: isActive
            ? dark ? theme.custom?.white : theme.custom?.darkBackground
            : dark ? theme.custom?.translucidWhite : theme.custom?.darkWhite,

          backgroundColor: isActive
            ? isHovered
              ? dark ? theme.palette?.primary?.main : theme.custom?.blackTranslucid // expandido: color sólido igual que antes
              : dark ? alpha(theme.palette?.primary?.main, 0.30) : "rgba(0, 0, 0, 0.12)" // contraído: glass semi-transparente
            : "transparent",
          backdropFilter: isActive && !isHovered ? "blur(8px)" : "none",
          border: isActive && !isHovered
            ? `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}`
            : "1px solid transparent",

          "&:hover": {
            backgroundColor: dark ? theme.palette?.primary?.main : theme.custom?.blackTranslucid,
            color: dark ? theme.custom?.white : theme.custom?.darkWhite,
            backdropFilter: "none",
          },
        })}
      >
        <Box sx={{ fontSize: "1.1rem", flexShrink: 0, width: "24px", display: "flex", justifyContent: "center" }}>
          {link.icon}
        </Box>

        <Box
          sx={{
            flex: 1,
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.15s 0.05s",
            overflow: "hidden",
          }}
        >
          {link.description}
        </Box>

        {hasSubGroups && (
          <Box
            sx={{
              ml: "auto",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.15s, transform 0.2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ExpandMoreIcon sx={{ fontSize: "1rem" }} />
          </Box>
        )}
      </Box>
    </Tooltip>

    {hasSubGroups && (
      <Collapse in={isOpen && isHovered} timeout={220}>
        <Box sx={{ backgroundColor: "rgba(0,0,0,0.15)", borderRadius: "0 0 8px 8px", pb: "6px" }}>
          {subGroups.map((group) => (
            <SidebarSubGroup
              key={group.groupLabel}
              group={group}
              dark={dark}
              isHovered={isHovered}
              isSubLinkActive={isSubLinkActive}
              onNavigate={onNavigate}
            />
          ))}
        </Box>
      </Collapse>
    )}
  </Box>
);

export default SidebarNavItem;
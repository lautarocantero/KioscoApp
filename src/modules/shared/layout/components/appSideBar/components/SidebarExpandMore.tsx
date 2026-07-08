import { Box, type Theme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { SidebarExpandMoreProps } from "@typings/ui/sidebar.types";


const SidebarExpandMore = ({
  isHovered,
  isOpen,
  hasSubGroups,
}: SidebarExpandMoreProps) => {

  return (
    <>
        {hasSubGroups && (
          <Box
            sx={(theme: Theme) => ({
              color: theme?.custom?.white,
              ml: "auto",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.15s, transform 0.2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              display: "flex",
              alignItems: "center",
            })}
          >
            <ExpandMoreIcon sx={{ fontSize: "1rem" }} />
          </Box>
        )}
  </>
)};

export default SidebarExpandMore;
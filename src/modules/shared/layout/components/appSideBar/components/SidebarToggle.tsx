import type { Theme } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import type { SidebarToggleProps } from "@typings/ui/sidebar.types";


const SidebarToggleComponent = ({isExpanded, toggleSidebar}: SidebarToggleProps ) => {

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: isExpanded ? "flex-end" : "center", px: isExpanded ? "10px" : 0 }}>
        <IconButton
            onClick={toggleSidebar}
            size="small"
            sx={(theme: Theme) => ({
                color: theme.custom?.white,
                transition: "transform 0.22s cubic-bezier(.4,0,.2,1)",
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            })}
        >
        <LastPageIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
    </Box>
  );
};

export default SidebarToggleComponent;
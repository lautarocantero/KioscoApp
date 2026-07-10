import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { SidebarToggleButtonMobileProps } from "@typings/ui/sidebar.types";

const SidebarToggleButtonMobile = ({ onOpen }: SidebarToggleButtonMobileProps): React.ReactNode => (
    <IconButton
        onClick={onOpen}
        aria-label="Abrir menú"
        sx={(theme) => ({
            display: { xs: "flex", sm: "none" },
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 1300,
            backgroundColor: theme.custom.darkGray,
            color: theme.custom.white,
            "&:hover": { backgroundColor: theme.palette.primary.main },
        })}
    >
        <MenuIcon fontSize="small" />
    </IconButton>
);

export default SidebarToggleButtonMobile;
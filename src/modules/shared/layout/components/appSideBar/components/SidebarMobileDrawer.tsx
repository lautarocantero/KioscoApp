import type { Theme } from "@mui/material";
import { Box, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SidebarLogout from "./SidebarLogout";
import SidebarLinksList from "./SidebarLinksList";
import SidebarUserData from "./SidebarUserData/SidebarUserData";
import { EXPANDED_WIDTH } from "../../../../../../config/constants";
import { getNoisyBackgroundSx } from "../../../../../../modules/shared/components/NoisyBackground/NoisyBackground";
import type { SidebarMobileDrawerProps } from "@typings/ui/sidebar.types";

const SidebarMobileDrawer = ({
    open,
    onClose,
    navLinks,
    handleNavClick,
    handleLogout,
    getLinkMeta,
    isSubLinkActive,
    navigate,
}: SidebarMobileDrawerProps): React.ReactNode => (
    <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", sm: "none" } }}
        PaperProps={{
            sx: (theme: Theme) => ({
                width: Math.min(Number(EXPANDED_WIDTH), 280),
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                py: 2.5,
                gap: 1,
                ...getNoisyBackgroundSx({ theme, backgroundColor: theme.palette.primary.main }),
            }),
        }}
    >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", px: 1.5 }}>
            <IconButton onClick={onClose} aria-label="Cerrar menú" sx={(theme) => ({ color: theme.custom.white })}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Box>

        <SidebarLinksList
            isExpanded
            navLinks={navLinks}
            handleNavClick={(...args) => {
                handleNavClick(...args);
                onClose();
            }}
            getLinkMeta={getLinkMeta}
            isSubLinkActive={isSubLinkActive}
            navigate={navigate}
        />

        <SidebarUserData isExpanded />

        <SidebarLogout isHovered onLogout={handleLogout} />
    </Drawer>
);

export default SidebarMobileDrawer;
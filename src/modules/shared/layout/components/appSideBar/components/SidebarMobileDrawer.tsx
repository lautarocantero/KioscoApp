import type { Theme } from "@mui/material";
import { Box, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getNoisyBackgroundSx } from "../../../../../../modules/shared/components/NoisyBackground/NoisyBackground";
import { SIDEBAR_PANEL_WIDTH } from "../../../../../../config/constants";
import { useSidebarUserData } from "../hooks/useSidebarUserData";
import SidebarKioscoCard from "./SidebarKioscoCard";
import SidebarUserMenu from "./SidebarUserMenu";
import SidebarMobileNavRow from "./SidebarMobileNavRow";
import type { SidebarMobileDrawerProps } from "@typings/ui/sidebar.types";

// El riel + panel flotante no tienen sentido en una pantalla angosta —
// en mobile el drawer sigue siendo una única columna con todo el
// contenido en línea (ver "Pendiente de definir" en Sidebar Stocko.md).
// Vender vive además como FAB fuera del drawer (ver Appsidebar.tsx).
const SidebarMobileDrawer = ({
    open,
    onClose,
    navLinks,
    isLinkActive,
    handleNavClick,
    handleLogout,
    onOpenSettings,
    onSellClick,
    isSellActive,
}: SidebarMobileDrawerProps): React.ReactNode => {
    const { userData, isLoading } = useSidebarUserData();

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: "block", sm: "none" } }}
            PaperProps={{
                sx: (theme: Theme) => ({
                    width: Math.min(Number.parseInt(SIDEBAR_PANEL_WIDTH, 10), 280),
                    display: "flex",
                    flexDirection: "column",
                    ...getNoisyBackgroundSx({ theme, backgroundColor: theme.palette.primary.main }),
                }),
            }}
        >
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", px: 1.5, pt: 1.5 }}>
                <IconButton onClick={onClose} aria-label="Cerrar menú" sx={(theme) => ({ color: theme.custom.white })}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <Box component="ul" sx={{ listStyle: "none", m: 0, px: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                <Box component="li">
                    <SidebarMobileNavRow icon={<AddShoppingCartIcon />} label="Vender" isActive={isSellActive} onClick={onSellClick} />
                </Box>

                {navLinks.map((link) => (
                    <Box component="li" key={link.url}>
                        <SidebarMobileNavRow
                            icon={link.icon}
                            label={link.description}
                            isActive={isLinkActive(link)}
                            onClick={() => handleNavClick(link)}
                        />
                    </Box>
                ))}
            </Box>

            <Box sx={{ flex: 1 }} />

            <SidebarKioscoCard />

            {!isLoading && userData && (
                <SidebarUserMenu userData={userData} onOpenSettings={onOpenSettings} onLogout={handleLogout} />
            )}
        </Drawer>
    );
};

export default SidebarMobileDrawer;

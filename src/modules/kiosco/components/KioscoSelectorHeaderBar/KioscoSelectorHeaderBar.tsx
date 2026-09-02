import { Avatar, Box, Stack, Typography, type Theme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../store/auth/authSlice";
import { confirmColorEnum } from "@typings/ui/uiEnums";
import { useLogout } from "../../../../hooks/auth/useLogout";
import { useSidebarLogoutConfirm } from "../../../shared/layout/components/appSideBar/hooks/useSidebarLogoutConfirm";
import ConfirmDialog from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import LightMode from "../../../shared/components/LightMode/LightMode";
import LanguageToggle from "../../../shared/components/LanguageToggle/LanguageToggle";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";

// Barra superior de /select-kiosco: marca + usuario + idioma + tema +
// logout, mismos elementos que el header del landing pero arriba de todo
// (no al pie, a diferencia del mockup "2a" original). Se resuelve sola (lee
// auth directo del store, mismo patrón que ya usaba KioscoSelectorPage para
// `name`) para no bajar props desde la página.
const KioscoSelectorHeaderBar = (): React.ReactNode => {
    const { t } = useTranslation();
    const { name, email, profilePhoto } = useSelector((state: RootState) => state.auth);
    const { handleLogout } = useLogout();
    const { isOpen, requestLogout, cancelLogout, confirmLogout } = useSidebarLogoutConfirm(handleLogout);

    return (
        <Box
            component="header"
            sx={(theme: Theme) => ({
                mb: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                p: 2,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: theme.custom.darkGray,
                backgroundColor: theme.custom.lightBackground,
            })}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <Box
                    component="img"
                    src={getPublicAssetUrl("images/logo/StockoLogo.png")}
                    alt="Stocko"
                    sx={{ width: 32, height: 32, objectFit: "contain" }}
                />
                <Typography sx={(theme: Theme) => ({ fontWeight: 700, color: theme.custom.fontColor })}>
                    Stocko
                </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                <Stack direction="row" spacing={1.25} alignItems="center">
                    <Avatar src={profilePhoto ?? undefined} alt={name} sx={{ width: 32, height: 32, fontSize: 13 }}>
                        {!profilePhoto && name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" sx={(theme: Theme) => ({ fontWeight: 600, color: theme.custom.fontColor })} noWrap>
                            {name}
                        </Typography>
                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })} noWrap>
                            {email}
                        </Typography>
                    </Box>
                </Stack>

                <LanguageToggle />
                <LightMode />

                <Box
                    component="button"
                    type="button"
                    onClick={requestLogout}
                    sx={(theme: Theme) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        height: "36px",
                        padding: "0 14px",
                        border: "none",
                        borderRadius: "0.4em",
                        backgroundColor: theme.custom.errorLight,
                        color: theme.custom.white,
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        "&:hover": { opacity: 0.9 },
                    })}
                >
                    <LogoutIcon sx={{ fontSize: "1.05rem" }} />
                    {t("kiosco.selector.header.logout")}
                </Box>
            </Stack>

            <ConfirmDialog
                open={isOpen}
                title={t("kiosco.selector.header.logoutConfirmTitle")}
                description={t("kiosco.selector.header.logoutConfirmDescription")}
                confirmLabel={t("kiosco.selector.header.logoutConfirmCta")}
                cancelLabel={t("kiosco.selector.header.cancel")}
                confirmColor={confirmColorEnum.Primary}
                icon={<LogoutIcon sx={{ fontSize: "1.6rem" }} />}
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
            />
        </Box>
    );
};

export default KioscoSelectorHeaderBar;

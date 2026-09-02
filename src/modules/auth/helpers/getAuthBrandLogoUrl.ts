import type { PaletteMode } from "@mui/material";
import { getPublicAssetUrl } from "../../shared/helpers/getPublicAssetUrl";

// El PNG "transparent" está afinado para fondo claro y el "transparent-2"
// para fondo oscuro (el círculo detrás de la bolsa cambia de tono para no
// perderse contra el violeta de cada theme).
export const getAuthBrandLogoUrl = (mode: PaletteMode): string => {
    if (mode === "dark") return getPublicAssetUrl("images/logo/StockoLogoPrem-transparent-2.png");
    return getPublicAssetUrl("images/logo/StockoLogoPrem-transparent.png");
};

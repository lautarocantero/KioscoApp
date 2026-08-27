import type { Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SellsKpiVariationTone } from "../../../helpers/formatSellsKpiVariation";

// Mismo criterio de color que SELL_STATUS_CONFIG (sellStatusConfig.tsx):
// un mapeo de tono -> estilo, no una decisión de negocio — el tono ya vino
// resuelto desde formatSellsKpiVariation.
export const getSellsKpiChipSx = (theme: Theme, tone: SellsKpiVariationTone) => {
    if (tone === "positive") {
        return { bgcolor: alpha(theme.palette.secondary.main, 0.14), color: theme.palette.secondary.main };
    }
    if (tone === "attention") {
        return { bgcolor: alpha(theme.custom.accents.gold, 0.18), color: theme.custom.accents.gold };
    }
    return { bgcolor: alpha(theme.custom.white, 0.08), color: theme.custom.darkWhite };
};

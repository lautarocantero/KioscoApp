import { Box, Button, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { alpha } from "@mui/material/styles";
import type { SellsPartialsAlertBarProps } from "@typings/sells/props";
import { formatCurrency } from "../../../../cart/helpers/formatCurrency";

// Renderizado condicional permitido en el .tsx (regla 5, excepción): el
// cálculo de si hay parciales ya vino resuelto en alert.count.
const SellsPartialsAlertBar = ({ alert, onViewPartials }: SellsPartialsAlertBarProps): React.ReactNode => {
    const { t } = useTranslation();

    if (alert.count === 0) return null;

    const daysLabel = t("sells.contextBand.partialsAlert.daysLabel", { count: alert.oldestDebtDays ?? 0 });

    return (
        <Box
            role="status"
            sx={(theme: Theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1.75,
                padding: "12px 20px",
                borderRadius: "12px",
                bgcolor: alpha(theme.custom.accents.gold, 0.1),
                border: `1px solid ${alpha(theme.custom.accents.gold, 0.28)}`,
            })}
        >
            <WarningAmberIcon sx={(theme: Theme) => ({ fontSize: 20, color: theme.custom.accents.gold, flexShrink: 0 })} />

            <Typography sx={{ fontSize: "0.875rem", flex: 1 }}>
                {t("sells.contextBand.partialsAlert.prefix", { count: alert.count })}{" "}
                <Typography component="span" sx={{ fontWeight: 700 }}>
                    {formatCurrency(alert.totalAmount)}
                </Typography>{" "}
                {t("sells.contextBand.partialsAlert.suffix", { days: daysLabel })}
            </Typography>

            <Button
                onClick={onViewPartials}
                sx={(theme: Theme) => ({
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    bgcolor: alpha(theme.custom.accents.gold, 0.18),
                    color: theme.custom.accents.gold,
                    borderRadius: "0.4em",
                    px: 1.75,
                    textTransform: "none",
                    "&:hover": { bgcolor: alpha(theme.custom.accents.gold, 0.28) },
                    "&:focus-visible": { outline: `2px solid ${theme.custom.accents.gold}`, outlineOffset: "2px" },
                })}
            >
                {t("sells.contextBand.partialsAlert.viewButton")}
            </Button>
        </Box>
    );
};

export default SellsPartialsAlertBar;

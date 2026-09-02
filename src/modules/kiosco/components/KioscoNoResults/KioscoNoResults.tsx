import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";

// Se muestra dentro de la grilla cuando hay una búsqueda activa sin
// coincidencias (KioscoGrid.noResults) — la tarjeta "Sumar un kiosco" sigue
// visible aparte, esto solo reemplaza el listado de kioscos.
const KioscoNoResults = (): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box
            role="status"
            sx={(theme: Theme) => ({
                gridColumn: "1 / -1",
                border: "1px solid",
                borderColor: theme.custom.darkGray,
                borderRadius: "12px",
                p: 3,
            })}
        >
            <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                {t("kiosco.selector.noResults")}
            </Typography>
        </Box>
    );
};

export default KioscoNoResults;

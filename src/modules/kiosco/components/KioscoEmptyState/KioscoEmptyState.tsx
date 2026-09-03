import { Box, type Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";

// Reemplaza buscador + grilla enteros cuando el usuario todavía no tiene
// ningún kiosco (isEmpty real, no relacionado a la búsqueda). Mismo patrón
// que EmptyProduct/EmptySeller/etc: navigate() llamado directo acá, es el
// precedente ya aceptado en el proyecto para estos wrappers de EmptyStateCard.
const KioscoEmptyState = (): React.ReactNode => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <EmptyStateCard
            imageSrc={getPublicAssetUrl("images/stocko_images/stocko-mascot.png")}
            imageAlt={t("kiosco.selector.empty.title")}
            title={t("kiosco.selector.empty.title")}
            description={
                <>
                    {t("kiosco.selector.empty.body")}
                    <br />
                    <Box
                        component="span"
                        role="button"
                        tabIndex={0}
                        data-tutorial-target="kiosco-join"
                        onClick={() => navigate("/join-kiosco")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") navigate("/join-kiosco");
                        }}
                        sx={(theme: Theme) => ({
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            cursor: "pointer",
                            textDecoration: "underline",
                        })}
                    >
                        {t("kiosco.selector.empty.joinLink")}
                    </Box>
                </>
            }
            button={{
                buttonText: t("kiosco.selector.empty.createCta"),
                onButtonClick: () => navigate("/create-kiosco"),
                targetId: "kiosco-create",
            }}
        />
    );
};

export default KioscoEmptyState;

import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopMascotPanelProps } from "@typings/shop/shopComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import { getPublicAssetUrl } from "../../shared/helpers/getPublicAssetUrl";
import NoisyCard from "../../shared/components/Cards/NoisyCard";
import PrimaryButtonComponent from "../../shared/components/Buttons/PrimaryButtonComponent";
import OutlinedButtonComponent from "../../shared/components/Buttons/OutlinedButtonComponent";
import TutorialTarget from "../../shared/components/Tutorial/TutorialTarget";

const MASCOT_IMAGE_HAPPY_URL = getPublicAssetUrl("images/logo/Stocko-mascotCircle-happy.png");
const MASCOT_IMAGE_SAD_URL = getPublicAssetUrl("images/logo/Stocko-mascotCircle-sad.png");

const ShopMascotPanel = ({
    kioscoName,
    isAdmin,
    kpis,
    hasSellsToday,
    criticalStockCount,
    partialsAlert,
    onNewSale,
    onEnterStock,
    onViewStatistics,
}: ShopMascotPanelProps): React.ReactNode => {
    const { t } = useTranslation();

    const hasAttention = criticalStockCount > 0 || partialsAlert.count > 0;
    const roleKey = isAdmin ? "owner" : "seller";
    const headline = hasSellsToday
        ? t(`shop.mascot.${roleKey}.headline`, {
              amount: formatCurrency(kpis.sales.value),
              tickets: kpis.ticketsCount.value,
              kioscoName,
          })
        : t("shop.mascot.headlineEmpty");

    const subline = hasAttention
        ? t("shop.mascot.subline.attention", {
              stock: criticalStockCount,
              debtCount: partialsAlert.count,
              debtAmount: formatCurrency(partialsAlert.totalAmount),
          })
        : t("shop.mascot.subline.ok");

    return (
        <NoisyCard sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1 }}>
            <Box
                component="img"
                src={hasSellsToday ? MASCOT_IMAGE_HAPPY_URL : MASCOT_IMAGE_SAD_URL}
                alt={t("shop.mascot.imageAlt")}
                sx={{ width: 132, height: 132, objectFit: "contain" }}
            />

            <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, lineHeight: 1.45 }}>{headline}</Typography>
            <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                {subline}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", mt: 2 }}>
                <TutorialTarget targetId="shop-new-sale">
                    <PrimaryButtonComponent
                        buttonText={t("shop.mascot.actions.newSale")}
                        buttonOnClick={onNewSale}
                        marginTop="0"
                        buttonWidth="100%"
                    />
                </TutorialTarget>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <TutorialTarget targetId="shop-enter-stock">
                        <OutlinedButtonComponent
                            buttonText={t("shop.mascot.actions.enterStock")}
                            buttonOnClick={onEnterStock}
                            buttonWidth="100%"
                        />
                    </TutorialTarget>
                    {isAdmin && (
                        <TutorialTarget targetId="shop-view-statistics">
                            <OutlinedButtonComponent
                                buttonText={t("shop.mascot.actions.viewStatistics")}
                                buttonOnClick={onViewStatistics}
                                buttonWidth="100%"
                            />
                        </TutorialTarget>
                    )}
                </Box>
            </Box>
        </NoisyCard>
    );
};

export default ShopMascotPanel;

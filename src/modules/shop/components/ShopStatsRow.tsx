import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopStatsRowProps } from "@typings/shop/shopComponentTypes";
import LinkCard from "../../shared/components/OptionsItems/LinkCard/LinkCard";

const ShopStatsRow = ({ links }: ShopStatsRowProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box
            component="nav"
            aria-label={t("shop.statsRow.ariaLabel")}
            role="list"
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
                gap: 2,
            }}
        >
            {links.map((link) => (
                <LinkCard key={link.url} link={link} />
            ))}
        </Box>
    );
};

export default ShopStatsRow;

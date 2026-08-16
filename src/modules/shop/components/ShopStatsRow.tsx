import { Box } from "@mui/material";
import type { ShopStatsRowProps } from "@typings/shop/shopComponentTypes";
import LinkCard from "../../shared/components/OptionsItems/LinkCard/LinkCard";

const ShopStatsRow = ({ links }: ShopStatsRowProps): React.ReactNode => (
    <Box
        component="nav"
        aria-label="Resumen por sección"
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

export default ShopStatsRow;

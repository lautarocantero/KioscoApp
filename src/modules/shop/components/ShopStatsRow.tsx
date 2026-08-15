import { Grid } from "@mui/material";
import type { ShopStatsRowProps } from "@typings/shop/shopComponentTypes";
import LinkCard from "../../shared/components/OptionsItems/LinkCard/LinkCard";

const ShopStatsRow = ({ links }: ShopStatsRowProps): React.ReactNode => (
    <Grid container spacing={2} component="nav" aria-label="Resumen por sección" role="list">
        {links.map((link) => (
            <Grid key={link.url} size={{ xs: 12, sm: 6, md: 3 }}>
                <LinkCard link={link} />
            </Grid>
        ))}
    </Grid>
);

export default ShopStatsRow;

import { Grid, useTheme } from "@mui/material";
import PresentationDetailHeaderSection from "./PresentationDetailHeaderSection";
import PresentationDetailField from "./PresentationDetailField";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { BadgeColorEnum } from "@typings/ui/uiEnums";
import type { GroupStockProps } from "@typings/presentation/presentationComponentTypes";


const GroupStock = ({ minStock, stock, hasSufficientStock }: GroupStockProps): React.ReactNode => {
    const theme = useTheme();

    return (
        <NoisyCard sx={{ p: 2.5 }}>
            <PresentationDetailHeaderSection
                icon={<BarChartOutlinedIcon fontSize="small" />}
                title="Inventario"
                color={theme.custom.accents.green}
            />
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <PresentationDetailField
                        icon={<ArrowCircleDownOutlinedIcon fontSize="small" />}
                        iconColor={theme.custom.accents.green}
                        label="Stock mínimo"
                        value={minStock}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <PresentationDetailField
                        icon={<TrendingUpOutlinedIcon fontSize="small" />}
                        iconColor={theme.custom.accents.green}
                        label="Stock actual"
                        value={stock}
                        badge={{
                            label: hasSufficientStock ? "Stock OK" : "Stock bajo",
                            color: hasSufficientStock ? BadgeColorEnum.Success : BadgeColorEnum.Error,
                        }}
                    />
                </Grid>
            </Grid>
        </NoisyCard>
    );
};

export default GroupStock;

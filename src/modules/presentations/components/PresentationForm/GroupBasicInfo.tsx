import { Box, Grid, useTheme } from "@mui/material";
import PresentationDetailHeaderSection from "./PresentationDetailHeaderSection";
import PresentationDetailField from "./PresentationDetailField";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import type { GroupBasicInfoProps } from "@typings/presentation/presentationComponentTypes";


const GroupBasicInfo = ({
    sku,
    modelType,
    modelSize,
    imageUrl,
}: GroupBasicInfoProps): React.ReactNode => {
    const theme = useTheme();

    return (
        <NoisyCard sx={{ p: 2.5 }}>
            <PresentationDetailHeaderSection
                icon={<InfoOutlinedIcon fontSize="small" />}
                title="Información básica"
                color={theme.custom.accents.violet}
            />
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <PresentationDetailField
                        icon={<QrCode2OutlinedIcon fontSize="small" />}
                        iconColor={theme.custom.accents.violet}
                        label="SKU"
                        value={sku}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <PresentationDetailField
                        icon={<CategoryOutlinedIcon fontSize="small" />}
                        iconColor={theme.custom.accents.violet}
                        label="Tipo de modelo"
                        value={modelType}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <PresentationDetailField
                        icon={<StraightenOutlinedIcon fontSize="small" />}
                        iconColor={theme.custom.accents.violet}
                        label="Tamaño / Presentación"
                        value={modelSize}
                    />
                </Grid>
            </Grid>

            {imageUrl && (
                <Box
                    component="img"
                    src={imageUrl}
                    alt="Imagen de envase"
                    sx={{
                        mt: 2.5,
                        width: 160,
                        height: 160,
                        objectFit: "contain",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        p: 1,
                    }}
                />
            )}
        </NoisyCard>
    );
};

export default GroupBasicInfo;

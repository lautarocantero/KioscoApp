import { Box, Grid, Typography, Chip } from "@mui/material";
import { Formik } from "formik";
import { usePresentationEdit } from "../../../../../hooks/presentation/usePresentationForm";
import { getPresentationDetailInitialValues } from "../../../schema/PresentationFormSchema";
import LoadingSpinnerComponent from "../../../../shared/components/LoadingSpinner";
import FormCard from "../../../../shared/components/FormCard/FormCard";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useParams } from "react-router-dom";

// ── Sub-componentes de presentación ──────────────────────────────────

interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
    color: string;
}

const SectionHeader = ({ icon, title, color }: SectionHeaderProps): React.ReactNode => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Box sx={{ color, display: "flex", alignItems: "center" }}>{icon}</Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color }}>
            {title}
        </Typography>
    </Box>
);

interface DetailFieldProps {
    icon: React.ReactNode;
    iconColor: string;
    label: string;
    value: React.ReactNode;
    badge?: { label: string; color: "success" | "error" | "warning" };
}

const DetailField = ({ icon, iconColor, label, value, badge }: DetailFieldProps): React.ReactNode => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            p: 1.75,
            borderRadius: "12px",
            border: "0.5px solid",
            borderColor: "rgba(255,255,255,0.08)",
            bgcolor: "rgba(255,255,255,0.02)",
            height: "100%",
        }}
    >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: `${iconColor}22`,
                    color: iconColor,
                }}
            >
                {icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.2 }}>
                    {label}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {value}
                </Typography>
            </Box>
        </Box>

        {badge && (
            <Chip
                label={badge.label}
                size="small"
                color={badge.color}
                variant="outlined"
                sx={{ fontWeight: 600, flexShrink: 0 }}
            />
        )}
    </Box>
);

// ── Componente principal ──────────────────────────────────────────────

const PresentationDetailFormComponent = (): React.ReactNode => {
    const { product_id } = useParams<{ product_id: string }>();
    const {
        editingVariant: variant,
        isLoadingEntity,
        submitError,
    } = usePresentationEdit();

    if (isLoadingEntity) return <LoadingSpinnerComponent />;

    // Guardar hasta tener el variant para que initialValues no sea vacío
    if (!variant) return (
        <Box sx={{ color: "white", p: 4 }}>
            <pre>isLoadingEntity: {String(isLoadingEntity)}</pre>
            <pre>variant: {JSON.stringify(variant, null, 2)}</pre>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "auto", p: 2, pt: 0, width: "100%" }}>
            <FormCard
                readOnly
                backPath={`/products/${product_id}/presentations`}
                submitError={submitError}
                header={{
                    title: "Detalles del producto",
                    subtitle: "Información completa del producto (solo lectura)",
                    icon: <Inventory2OutlinedIcon />,
                }}
            >
                <Formik
                    initialValues={getPresentationDetailInitialValues(variant)}
                    onSubmit={() => {}}
                    validateOnBlur={false}
                    validateOnChange={false}
                    enableReinitialize
                >
                    {({ values }) => {
                        const stockOk = Number(values.stock) > Number(values.min_stock);
                        const isVigente = values.expiration_date
                            ? new Date(values.expiration_date) > new Date()
                            : true;

                        return (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                {/* ── Información básica ──────────────────────── */}
                                <NoisyCard sx={{ p: 2.5 }}>
                                    <SectionHeader
                                        icon={<InfoOutlinedIcon fontSize="small" />}
                                        title="Información básica"
                                        color="#A78BFA"
                                    />
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <DetailField
                                                icon={<QrCode2OutlinedIcon fontSize="small" />}
                                                iconColor="#8B5CF6"
                                                label="SKU"
                                                value={values.sku}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <DetailField
                                                icon={<CategoryOutlinedIcon fontSize="small" />}
                                                iconColor="#8B5CF6"
                                                label="Tipo de modelo"
                                                value={values.model_type}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <DetailField
                                                icon={<StraightenOutlinedIcon fontSize="small" />}
                                                iconColor="#8B5CF6"
                                                label="Tamaño / Presentación"
                                                value={values.model_size}
                                            />
                                        </Grid>
                                    </Grid>

                                    {values.image_url && (
                                        <Box
                                            component="img"
                                            src={values.image_url}
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

                                {/* ── Inventario ───────────────────────────────── */}
                                <NoisyCard sx={{ p: 2.5 }}>
                                    <SectionHeader
                                        icon={<BarChartOutlinedIcon fontSize="small" />}
                                        title="Inventario"
                                        color="#4ADE80"
                                    />
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <DetailField
                                                icon={<ArrowCircleDownOutlinedIcon fontSize="small" />}
                                                iconColor="#4ADE80"
                                                label="Stock mínimo"
                                                value={values.min_stock}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <DetailField
                                                icon={<TrendingUpOutlinedIcon fontSize="small" />}
                                                iconColor="#4ADE80"
                                                label="Stock actual"
                                                value={values.stock}
                                                badge={{
                                                    label: stockOk ? "Stock OK" : "Stock bajo",
                                                    color: stockOk ? "success" : "error",
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </NoisyCard>

                                {/* ── Información comercial ───────────────────── */}
                                <NoisyCard sx={{ p: 2.5 }}>
                                    <SectionHeader
                                        icon={<LocalOfferOutlinedIcon fontSize="small" />}
                                        title="Información comercial"
                                        color="#C084FC"
                                    />
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <DetailField
                                                icon={<AttachMoneyOutlinedIcon fontSize="small" />}
                                                iconColor="#8B5CF6"
                                                label="Precio"
                                                value={`$ ${values.price}`}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <DetailField
                                                icon={<CalendarMonthOutlinedIcon fontSize="small" />}
                                                iconColor="#8B5CF6"
                                                label="Fecha de vencimiento"
                                                value={
                                                    values.expiration_date
                                                        ? new Date(values.expiration_date).toLocaleDateString("en-US")
                                                        : "-"
                                                }
                                                badge={{
                                                    label: isVigente ? "Vigente" : "Vencido",
                                                    color: isVigente ? "success" : "error",
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </NoisyCard>
                            </Box>
                        );
                    }}
                </Formik>
            </FormCard>
        </Box>
    );
};

export default PresentationDetailFormComponent;
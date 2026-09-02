import { Box, Stack, Typography, type Theme } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useTranslation } from "react-i18next";
import type { AddKioscoCardProps } from "@typings/kiosco/kioscoComponentTypes";
import KioscoSelectorActionRow from "../KioscoSelectorActionRow/KioscoSelectorActionRow";

// Primera tarjeta de la grilla de /select-kiosco, siempre presente (mockup
// "2a"): agrupa los dos caminos para sumar un kiosco (KioscoSelectorActionRow
// reusado tal cual, solo reubicado) bajo un único título.
const AddKioscoCard = ({ onCreate, onJoin }: AddKioscoCardProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box
            component="article"
            sx={(theme: Theme) => ({
                border: "1.5px dashed",
                borderColor: theme.custom.darkGray,
                borderRadius: "16px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
            })}
        >
            <Stack spacing={0.5}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {t("kiosco.selector.addCard.title")}
                </Typography>
            </Stack>

            <Stack spacing={1.5} sx={{ flex: 1, justifyContent: "center" }}>
                <KioscoSelectorActionRow
                    icon={<AddCircleOutlineOutlinedIcon />}
                    title={t("kiosco.selector.createRow.title")}
                    subtitle={t("kiosco.selector.createRow.subtitle")}
                    accent="lightMain"
                    endIcon={<ChevronRightOutlinedIcon />}
                    onClick={onCreate}
                />
                <KioscoSelectorActionRow
                    icon={<PersonAddAltOutlinedIcon />}
                    title={t("kiosco.selector.joinRow.title")}
                    subtitle={t("kiosco.selector.joinRow.subtitle")}
                    accent="lightSecondary"
                    endIcon={<ChevronRightOutlinedIcon />}
                    onClick={onJoin}
                />
            </Stack>
        </Box>
    );
};

export default AddKioscoCard;

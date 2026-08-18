import { Box, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "react-i18next";

interface SellEditedProps {
    handleSeeDetail: () => void;
    handleBackToSells: () => void;
}

const SellEdited = ({ handleSeeDetail, handleBackToSells }: SellEditedProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 4, textAlign: "center" }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 56 }} />
            <Typography variant="h6">{t("sells.edit.edited.title")}</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="outlined" onClick={handleBackToSells}>{t("sells.edit.edited.backToSells")}</Button>
                <Button variant="contained" onClick={handleSeeDetail}>{t("sells.edit.edited.viewDetail")}</Button>
            </Box>
        </Box>
    );
};

export default SellEdited;
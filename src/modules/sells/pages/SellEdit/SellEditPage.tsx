// pages/SellEdit/SellEditPage.tsx
import { Box } from "@mui/material";
import AppLayout from "../../../shared/layout/AppLayout";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import SellForm from "../../components/SellForm/SellForm";

const SellEditPage = (): React.ReactNode => {
    return (
        <AppLayout fullWidth noCenter noPadding>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1, px: { xs: 1, sm: 2 } }}>
                <Box sx={{ width: { xs: "100%", sm: "80%", md: 700 } }}>
                    <SellForm mode={FormModeComplexEnum.Edit} />
                </Box>
            </Box>
        </AppLayout>
    );
};

export default SellEditPage;
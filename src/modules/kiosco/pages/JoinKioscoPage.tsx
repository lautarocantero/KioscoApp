import { Box, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import { useJoinKioscoAccess } from "../../../hooks/kiosco/useJoinKioscoAccess";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import LoadingScreen from "../../shared/components/LoadingScreen/LoadingScreen";
import JoinKioscoForm from "../components/JoinKioscoForm/JoinKioscoForm";

const JoinKioscoPage = (): ReactNode => {
    const { isChecking } = useJoinKioscoAccess();
    const isPageLoading = useInitialPageLoading(isChecking);

    if (isPageLoading) return <LoadingScreen />;

    return (
        <Box
            component="main"
            sx={(theme: Theme) => ({
                minHeight: "100vh",
                width: "100%",
                backgroundColor: theme.custom.background,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
            })}
        >
            <Box sx={{ width: "100%", maxWidth: 480 }}>
                <JoinKioscoForm />
            </Box>
        </Box>
    );
};

export default JoinKioscoPage;

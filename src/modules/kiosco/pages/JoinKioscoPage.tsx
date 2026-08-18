import { Box, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import { useJoinKioscoAccess } from "../../../hooks/kiosco/useJoinKioscoAccess";
import LoadingSpinnerComponent from "../../shared/components/LoadingSpinner";
import JoinKioscoForm from "../components/JoinKioscoForm/JoinKioscoForm";

const JoinKioscoPage = (): ReactNode => {
    const { isChecking } = useJoinKioscoAccess();

    if (isChecking) return <LoadingSpinnerComponent />;

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

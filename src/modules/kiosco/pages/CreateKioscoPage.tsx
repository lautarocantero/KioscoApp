import { Box, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import CreateKioscoForm from "../components/CreateKioscoForm/CreateKioscoForm";

const CreateKioscoPage = (): ReactNode => {
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
                <CreateKioscoForm />
            </Box>
        </Box>
    );
};

export default CreateKioscoPage;

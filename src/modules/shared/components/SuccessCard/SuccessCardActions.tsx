import { Box, Button, type Theme } from "@mui/material";
import type { SuccessCardAction } from "./SuccessCard";

interface SuccessCardActionsProps {
    actions: SuccessCardAction[];
}

const SuccessCardActions = ({ actions }: SuccessCardActionsProps): React.ReactNode => (
    <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column" }, px: 3, py: 2.5, width: "50%", margin: "0 auto" }}>
        {actions.map(({ label, onClick, variant }) =>
            variant === "contained" ? (
                <Button
                    key={label}
                    fullWidth
                    variant="contained"
                    onClick={onClick}
                    sx={{ textTransform: "none", fontWeight: 600, backgroundColor: "#0386EE", "&:hover": { backgroundColor: "#0270c4" } }}
                >
                    {label}
                </Button>
            ) : (
                <Button
                    key={label}
                    fullWidth
                    variant="outlined"
                    onClick={onClick}
                    sx={(theme: Theme) => ({
                        textTransform: "none", fontWeight: 600,
                        borderColor: theme?.custom?.fontColorTransparent,
                        color: theme?.custom?.black,
                        "&:hover": { borderColor: "rgba(255,255,255,0.4)" },
                    })}
                >
                    {label}
                </Button>
            )
        )}
    </Box>
);

export default SuccessCardActions;

import type { Theme } from "@mui/material";

export const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": {
        color: theme.palette.text.secondary,
        fontSize: "0.82rem",
        letterSpacing: "0.04em",
    },
    "& .MuiOutlinedInput-root": {
        color: theme.palette.text.primary,
        "& input": { color: theme.palette.text.primary },
        "& textarea": { color: theme.palette.text.primary },
        "& fieldset": { borderColor: theme.palette.divider },
        "&:hover fieldset": { borderColor: theme.palette.text.secondary },
        "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
        fontSize: "0.88rem",
    },
    "& .MuiFormHelperText-root": { 
        fontSize: "0.72rem",
        color: theme.palette.text.secondary,
    },
});
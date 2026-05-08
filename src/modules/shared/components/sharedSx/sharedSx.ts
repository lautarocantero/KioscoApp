import type { Theme } from "@mui/material";

export const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": {
        color: theme?.custom?.fontColorTransparent,
        fontSize: "0.82rem",
        letterSpacing: "0.04em",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&:hover fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        "&.Mui-focused fieldset": { borderColor: theme?.custom?.fontColorTransparent },
        fontSize: "0.88rem",
    },
    "& .MuiFormHelperText-root": { fontSize: "0.72rem" },
});
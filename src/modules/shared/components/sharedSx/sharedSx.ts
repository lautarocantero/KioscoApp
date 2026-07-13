import type { Theme } from "@mui/material";

/** Tokens de tipografía reutilizados por los distintos estilos de campo */
const fontSize = {
    label: "0.75rem",
    input: "0.88rem",
    filterInput: "0.8rem",
    helperText: "0.72rem",
    inputLetterSpacing: "0.04em",
};

/** Genera el borde/outline estándar de un campo, con color y radio configurables */
const outlinedBorderSx = (theme: Theme, borderColor: string, radius: string) => ({
    "& .MuiOutlinedInput-root": { borderRadius: radius },
    "& .MuiOutlinedInput-notchedOutline": { borderColor },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor, borderWidth: "1px" },
});

export const sharedSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": {
        color: theme.palette.text.secondary,
        fontSize: fontSize.label,
        letterSpacing: fontSize.inputLetterSpacing,
    },
    "& .MuiOutlinedInput-root": {
        color: theme.palette.text.primary,
        "& input": { color: theme.palette.text.primary },
        "& textarea": { color: theme.palette.text.primary },
        "& fieldset": { borderColor: theme.palette.divider },
        "&:hover fieldset": { borderColor: theme.palette.text.secondary },
        "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
        fontSize: fontSize.input,
    },
    "& .MuiFormHelperText-root": {
        fontSize: fontSize.helperText,
        color: theme.palette.text.secondary,
    },
});

export const fieldLabelSx = {
    fontSize: fontSize.label,
    color: "text.secondary",
    mb: 0.5,
    fontWeight: 500,
};

export const filterInputSx = (theme: Theme) => ({
    fontSize: fontSize.filterInput,
    color: theme.custom.fontColor,
    borderRadius: "10px",
    minWidth: 200,
    ...outlinedBorderSx(theme, theme.custom.darkGray, "10px"),
});

export const datePickerInputSx = (theme: Theme) => ({
    borderRadius: "20px",
    "& .MuiPickersInputBase-sectionsContainer": {
        fontSize: fontSize.filterInput,
    },
    ...outlinedBorderSx(theme, theme.custom.darkGray, "20px"),
    "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${theme.custom.darkGray}`,
        borderRadius: "20px",
    },
    "& fieldset": {
        border: `1px solid ${theme.custom.darkGray} !important`,
        borderRadius: "20px",
    },
});
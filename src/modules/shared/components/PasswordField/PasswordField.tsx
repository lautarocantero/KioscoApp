// shared/components/PasswordField/PasswordField.tsx
import { TextField, InputAdornment, IconButton, type Theme } from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { sharedSx } from "../sharedSx/sharedSx";
import type { PasswordFieldProps } from "@typings/auth/authComponentTypes";



const PasswordField = ({
    name,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    ariaLabel,
}: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={({ target }) => onChange(target.value)}
            error={error}
            helperText={helperText}
            variant="outlined"
            sx={sharedSx}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock
                                sx={{
                                    color: (theme: Theme) =>
                                        error ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                                }}
                            />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                {showPassword ? (
                                    <VisibilityOff
                                        sx={{
                                            color: (theme: Theme) =>
                                                error ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                                        }}
                                    />
                                ) : (
                                    <Visibility
                                        sx={{
                                            color: (theme: Theme) =>
                                                error ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                                        }}
                                    />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
                htmlInput: {
                    "aria-label": ariaLabel,
                },
                formHelperText: {
                    sx: { textAlign: "right" },
                },
            }}
        />
    );
};

export default PasswordField;
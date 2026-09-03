import { Box, Chip, Radio, Typography, type Theme } from "@mui/material";
import type { KeyboardEvent } from "react";
import type { PaymentMethodRowProps } from "@typings/membership/membershipComponentTypes";

const PaymentMethodRow = ({ icon, label, description, badge, selected = false, disabled = false, onSelect }: PaymentMethodRowProps): React.ReactNode => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        if (disabled) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onSelect();
    };

    return (
        <Box
            role="radio"
            aria-checked={selected}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? undefined : onSelect}
            onKeyDown={handleKeyDown}
            sx={(theme: Theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid",
                borderColor: selected ? theme.custom.darkMain : theme.custom.darkGray,
                borderRadius: "10px",
                padding: 1.5,
                opacity: disabled ? 0.55 : 1,
                cursor: disabled ? "default" : "pointer",
            })}
        >
            <Radio checked={selected} disabled={disabled} size="small" />
            <Box sx={(theme: Theme) => ({ color: theme.custom.darkMain, display: "flex" })}>{icon}</Box>
            <Box sx={{ flex: 1 }}>
                <Typography sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 600 })}>{label}</Typography>
                {description && (
                    <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                        {description}
                    </Typography>
                )}
            </Box>
            {badge && <Chip label={badge} size="small" variant="outlined" />}
        </Box>
    );
};

export default PaymentMethodRow;

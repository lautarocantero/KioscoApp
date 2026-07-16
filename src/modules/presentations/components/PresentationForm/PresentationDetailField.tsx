import { Box, Typography, Chip } from "@mui/material";
import type { DetailFieldProps } from "@typings/presentation/presentationComponentTypes";
import type { ReactNode } from "react";

const PresentationDetailField = ({ icon, iconColor, label, value, badge }: DetailFieldProps): ReactNode => {
    
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                p: 1.75,
                borderRadius: "12px",
                border: "0.5px solid",
                borderColor: theme.custom.darkGray,
                bgcolor: theme.custom.darkGray,
                height: "100%",
            })}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        minWidth: 36,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: `${iconColor}22`,
                        color: iconColor,
                    }}
                >
                    {icon}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.2 }}>
                        {label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {value}
                    </Typography>
                </Box>
            </Box>

            {badge && (
                <Chip
                    label={badge.label}
                    size="small"
                    color={badge.color}
                    variant="outlined"
                    sx={{ fontWeight: 600, flexShrink: 0 }}
                />
            )}
        </Box>
    )};

export default PresentationDetailField;

import { Box, Typography, useTheme, type Theme } from "@mui/material";
import type { FormCardHeaderProps } from "@typings/shared/reactComponents";

const getDefaultIcon = (color: string) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill={color} />
        <rect x="9" y="2" width="5" height="5" rx="1.5" fill={color} opacity="0.6" />
        <rect x="9" y="8" width="5" height="6" rx="1.5" fill={color} opacity="0.6" />
        <rect x="2" y="9" width="6" height="5" rx="1.5" fill={color} opacity="0.6" />
    </svg>
);

const FormHeader = ({
    title,
    subtitle,
    icon,
    isMultiStep = false,
    stepsLabels = [],
    currentStep = 0,
}: FormCardHeaderProps): React.ReactNode => {
    const theme = useTheme();

    const progress = stepsLabels.length > 0
        ? Math.round(((currentStep + 1) / stepsLabels.length) * 100)
        : 0;

    return (
        <Box sx={{
            display: "flex", flexDirection: "column",
            px: 3, py: 2,
        }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={(theme: Theme) => ({
                        width: 34, height: 34, borderRadius: "8px",
                        background: theme.custom?.darkBackground,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    })}>
                        {icon ?? getDefaultIcon(theme.palette?.primary?.main)}
                    </Box>
                    <Box>
                        <Typography sx={(theme: Theme) => ({
                            fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.3,
                            color: theme?.custom?.fontColor,
                        })}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography sx={(theme: Theme) => ({
                                fontSize: "0.75rem", color: theme.custom?.translucidWhite, mt: "2px",
                            })}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {isMultiStep && stepsLabels.length > 0 && (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                        <Box sx={{ position: "relative", width: 36, height: 36 }}>
                            <svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
                                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                                <circle
                                    cx="18" cy="18" r="15"
                                    fill="none"
                                    stroke={theme.palette?.primary?.main}
                                    strokeWidth="2"
                                    strokeDasharray={2 * Math.PI * 15}
                                    strokeDashoffset={2 * Math.PI * 15 * (1 - (currentStep + 1) / stepsLabels.length)}
                                    strokeLinecap="round"
                                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                                />
                            </svg>
                            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: theme.palette?.primary?.main }}>
                                    {progress}%
                                </Typography>
                            </Box>
                        </Box>
                        <Typography sx={(theme: Theme) => ({
                            fontSize: "0.6rem", color: theme.custom?.translucidWhite, mt: "2px",
                        })}>
                            Completado
                        </Typography>
                    </Box>
                )}
            </Box>

            {isMultiStep && stepsLabels.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                    {stepsLabels.map((label, index) => (
                        <Box key={label} sx={{ display: "flex", alignItems: "center", flex: index < stepsLabels.length - 1 ? 1 : "0 0 auto" }}>
                            <Box sx={{
                                width: 28, height: 28, borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                                bgcolor: index <= currentStep ? theme.custom?.darkSecondary : "rgba(255,255,255,0.08)",
                                outline: `1px solid ${index <= currentStep ? theme.palette?.primary?.main : "rgba(255,255,255,0.15)"}`,
                                outlineOffset: "2px",
                            }}>
                                <Typography sx={{
                                    fontSize: "0.7rem", fontWeight: 700,
                                    color: index <= currentStep ? "#fff" : "rgba(255,255,255,0.5)",
                                }}>
                                    {index + 1}
                                </Typography>
                            </Box>
                            <Typography sx={{
                                fontSize: "0.72rem", ml: 1, whiteSpace: "nowrap",
                                color: index === currentStep ? theme.palette?.primary?.main : "rgba(255,255,255,0.45)",
                                fontWeight: index === currentStep ? 500 : 400,
                            }}>
                                {label}
                            </Typography>
                            {index < stepsLabels.length - 1 && (
                                <Box sx={{
                                    flex: 1, height: "1px", mx: 1,
                                    bgcolor: index < currentStep ? theme.palette?.primary?.main : "rgba(255,255,255,0.12)",
                                }} />
                            )}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default FormHeader;
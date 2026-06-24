import { Box, Typography, type Theme } from "@mui/material";

export interface FormHeaderProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    isMultiStep?: boolean;
    stepsLabels?: string[];
    currentStep?: number;
}

const defaultIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5.5" height="7" rx="1.5" fill="#0386EE" opacity="0.9" />
        <rect x="9" y="7" width="5" height="5" rx="1.5" fill="#0386EE" opacity="0.5" />
        <rect x="9" y="2" width="5" height="4" rx="1.5" fill="#0386EE" opacity="0.7" />
        <rect x="2" y="10.5" width="5.5" height="3.5" rx="1.5" fill="#0386EE" opacity="0.4" />
    </svg>
);

const FormHeader = ({
    title,
    subtitle,
    icon,
    isMultiStep = false,
    stepsLabels = [],
    currentStep = 0,
}: FormHeaderProps): React.ReactNode => {
    const progress = stepsLabels.length > 0
        ? Math.round(((currentStep + 1) / stepsLabels.length) * 100)
        : 0;

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", gap: 1.5,
            px: 3, py: 2,
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={(theme: Theme) => ({
                        width: 34, height: 34, borderRadius: "8px",
                        background: theme.custom?.white,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    })}>
                        {icon ?? defaultIcon}
                    </Box>
                    <Box>
                        <Typography sx={(theme: Theme) => ({
                            fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.3,
                            color: isMultiStep ? "#0386EE" : (theme.custom?.white ?? "rgba(255,255,255,0.88)"),
                        })}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography sx={(theme: Theme) => ({
                                fontSize: "0.75rem", color: theme.custom?.fontColorTransparent, mt: "2px",
                            })}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {isMultiStep && stepsLabels.length > 0 && (
                    <Box sx={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
                        <svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
                            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            <circle
                                cx="18" cy="18" r="15"
                                fill="none"
                                stroke="#0386EE"
                                strokeWidth="2"
                                strokeDasharray={2 * Math.PI * 15}
                                strokeDashoffset={2 * Math.PI * 15 * (1 - (currentStep + 1) / stepsLabels.length)}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 0.5s ease" }}
                            />
                        </svg>
                        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#0386EE" }}>
                                {progress}%
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>

            {isMultiStep && stepsLabels.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {stepsLabels.map((label, index) => (
                        <Box key={label} sx={{ display: "flex", alignItems: "center", flex: index < stepsLabels.length - 1 ? 1 : "0 0 auto" }}>
                            <Box sx={{
                                width: 22, height: 22, borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                                bgcolor: index <= currentStep ? "#0386EE" : "rgba(255,255,255,0.08)",
                                border: index <= currentStep ? "none" : "1px solid rgba(255,255,255,0.15)",
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
                                color: index === currentStep ? "#0386EE" : "rgba(255,255,255,0.45)",
                                fontWeight: index === currentStep ? 500 : 400,
                            }}>
                                {label}
                            </Typography>
                            {index < stepsLabels.length - 1 && (
                                <Box sx={{
                                    flex: 1, height: "1px", mx: 1,
                                    bgcolor: index < currentStep ? "#0386EE" : "rgba(255,255,255,0.12)",
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
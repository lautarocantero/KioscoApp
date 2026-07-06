import CheckIcon from "@mui/icons-material/Check";
import { Box, Typography } from "@mui/material";

export interface TimelineStepConfig {
    icon:  React.ReactNode;
    label: string;
}

export interface CreationTimelineProps {
    /** Paso anterior, ya completado — ícono neutro a la izquierda */
    previousStep: TimelineStepConfig;
    /** Paso siguiente, pendiente — ícono neutro a la derecha */
    nextStep: TimelineStepConfig;
    maxWidth?: number | string;
}

const Timeline = ({ previousStep, nextStep, maxWidth = 520 }: CreationTimelineProps): React.ReactNode => (
    <Box sx={{ width: "100%", maxWidth, display: "grid", gridTemplateColumns: "80px 1fr 80px", alignItems: "start", mb: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
            <Box sx={theme => ({ width: 58, height: 58, borderRadius: "50%", border: `0.1em solid ${theme.custom.posAccent}`, backgroundColor: `${theme.custom.fontColorDark}15`, display: "flex", alignItems: "center", justifyContent: "center", color: theme.custom.posAccent })}>
                {previousStep.icon}
            </Box>
            <Typography variant="caption" sx={{ textAlign: "center" }}>{previousStep.label}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "29px" }}>
            <Box sx={theme => ({ flex: 1, height: 3, borderRadius: "999px", backgroundColor: theme.palette.success.main })} />
            <Box sx={theme => ({ width: 58, height: 58, mx: 1, borderRadius: "50%", backgroundColor: theme.palette.success.main, color: theme.custom.white, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 18px ${theme.palette.success.main}40` })}>
                <CheckIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box sx={theme => ({ flex: 1, height: 2, backgroundImage: `repeating-linear-gradient(to right, ${theme.custom.posPlaceholder}, ${theme.custom.fontColorDark}40 6px, transparent 6px, transparent 12px)` })} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
            <Box sx={theme => ({ width: 58, height: 58, borderRadius: "50%", border: `0.2em dotted ${theme.custom.posPlaceholder}`, backgroundColor: `${theme.custom.fontColorDark}15`, display: "flex", alignItems: "center", justifyContent: "center", color: theme.custom.fontColorDark })}>
                {nextStep.icon}
            </Box>
            <Typography variant="caption" sx={{ textAlign: "center" }}>{nextStep.label}</Typography>
        </Box>
    </Box>
);

export default Timeline;
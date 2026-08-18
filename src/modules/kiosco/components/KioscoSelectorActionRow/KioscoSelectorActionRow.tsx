import { Box, ButtonBase, Stack, Typography, type Theme } from "@mui/material";
import type { KioscoSelectorActionRowProps } from "@typings/kiosco/kioscoComponentTypes";

const KioscoSelectorActionRow = ({
    icon,
    endIcon,
    title,
    subtitle,
    accent,
    onClick,
}: KioscoSelectorActionRowProps): React.ReactNode => (
    <ButtonBase
        onClick={onClick}
        sx={(theme: Theme) => ({
            border: "0.5px solid",
            borderColor: theme.custom.darkGray,
            borderRadius: "16px",
            p: 2.5,
            width: "100%",
            justifyContent: "space-between",
            textAlign: "left",
            transition: "transform 0.2s ease, border-color 0.2s ease",
            "&:hover": {
                transform: "scale(1.02)",
                borderColor: theme.custom[accent],
            },
        })}
    >
        <Stack direction="row" spacing={2} alignItems="center">
            <Box
                sx={(theme: Theme) => ({
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.custom[accent],
                    border: "1.5px dashed",
                    borderColor: theme.custom[accent],
                    flexShrink: 0,
                })}
            >
                {icon}
            </Box>
            <Box>
                <Typography sx={(theme: Theme) => ({ fontWeight: 500, color: theme.custom[accent] })}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {subtitle}
                </Typography>
            </Box>
        </Stack>
        <Box sx={(theme: Theme) => ({ color: theme.custom[accent] })}>{endIcon}</Box>
    </ButtonBase>
);

export default KioscoSelectorActionRow;

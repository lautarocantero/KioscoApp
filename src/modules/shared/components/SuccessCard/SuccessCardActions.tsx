import { alpha, Box, Button, Divider, Typography, type Theme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import type { SuccessCardActionsProps } from "@typings/ui/successCard.types";

const SuccessCardActions = ({ actions }: SuccessCardActionsProps): React.ReactNode => {
    const containedActions = actions.filter((action) => action.variant === "contained");
    const otherActions = actions.filter((action) => action.variant !== "contained");

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 3, pb: 4, pt: 1 }}>
            {containedActions.length > 0 && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    {containedActions.map(({ label, onClick }) => (
                        <Button
                            key={label}
                            onClick={onClick}
                            sx={(theme: Theme) => ({
                                textTransform: "none",
                                fontWeight: 700,
                                px: 4,
                                py: 1.3,
                                borderRadius: "12px",
                                fontSize: "1rem",
                                color: theme.custom.white,
                                background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                                "&:hover": {
                                    background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 100%)`,
                                },
                            })}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>
            )}

            {otherActions.length > 0 && (
                <Box>
                    <Typography
                        variant="caption"
                        component="p"
                        sx={(theme: Theme) => ({
                            color: theme.custom.translucidFontColor,
                            fontWeight: 500,
                            mb: 1,
                            px: 0.5,
                        })}
                    >
                        Otras acciones
                    </Typography>

                    <Box
                        component="ul"
                        role="list"
                        sx={(theme: Theme) => ({
                            listStyle: "none",
                            m: 0,
                            p: 0,
                            border: `1px solid ${alpha(theme.custom.white, 0.08)}`,
                            borderRadius: "14px",
                            overflow: "hidden",
                        })}
                    >
                        {otherActions.map(({ label, onClick, icon }, index) => (
                            <Box component="li" role="listitem" key={label}>
                                <Button
                                    onClick={onClick}
                                    fullWidth
                                    disableRipple={false}
                                    sx={(theme: Theme) => ({
                                        justifyContent: "space-between",
                                        textTransform: "none",
                                        fontWeight: 500,
                                        fontSize: "0.95rem",
                                        color: theme.custom.white,
                                        px: 2,
                                        py: 1.75,
                                        borderRadius: 0,
                                        "&:hover": {
                                            backgroundColor: alpha(theme.custom.white, 0.04),
                                        },
                                    })}
                                    startIcon={
                                        <Box
                                            sx={(theme: Theme) => ({
                                                display: "flex",
                                                color: theme.palette.secondary.main,
                                                mr: 0.5,
                                            })}
                                        >
                                            {icon ?? <CategoryOutlinedIcon fontSize="small" />}
                                        </Box>
                                    }
                                    endIcon={
                                        <ChevronRightIcon
                                            sx={(theme: Theme) => ({
                                                fontSize: "1.1rem",
                                                color: alpha(theme.custom.white, 0.4),
                                            })}
                                        />
                                    }
                                >
                                    <Box component="span" sx={{ flexGrow: 1, textAlign: "left" }}>
                                        {label}
                                    </Box>
                                </Button>
                                {index < otherActions.length - 1 && (
                                    <Divider
                                        sx={(theme: Theme) => ({
                                            borderColor: alpha(theme.custom.white, 0.08),
                                        })}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default SuccessCardActions;
import { Box, Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter } from 'react-router-dom';
import type { LinkCardProps } from '../../../../../typings/ui/uiModules';

const LinkCard = ({ link, accent, appTheme }: LinkCardProps): React.ReactNode => {
    return (
        <Link
            component={LinkReactRouter}
            to={link.url}
            sx={(t: Theme) => ({
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                mb: 1.5,
                minHeight: "110px",
                borderRadius: "14px",
                overflow: "hidden",
                textDecoration: "none",
                backgroundColor: t.custom.white,
                border: `0.5px solid ${
                    !appTheme ? t.custom.whiteTranslucid : t.custom.blackTranslucid
                }`,
                boxShadow: `
                    0 1px 3px rgba(0, 0, 0, 0.06),
                    4px 8px 16px rgba(0, 0, 0, 0.10),
                    8px 16px 28px rgba(0, 0, 0, 0.08)
                `,
                cursor: "pointer",
                transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease, background-color 0.15s",
                "&:hover": {
                    boxShadow: `
                        0 2px 4px rgba(0, 0, 0, 0.08),
                        6px 12px 20px rgba(0, 0, 0, 0.14),
                        12px 24px 36px rgba(0, 0, 0, 0.12)
                    `,
                    transform: "translateY(-4px) translateX(-2px)",
                    backgroundColor: !appTheme
                        ? t.custom.whiteTranslucid
                        : t.custom.backgroundLigth,
                },
            })}
        >
            {/* Acento lateral */}
            <Box
                sx={(t: Theme) => ({
                    width: "64px",
                    flexShrink: 0,
                    backgroundColor: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.7rem",
                    color: t.custom.white,
                })}
            >
                {link.icon}
            </Box>

            {/* Contenido de texto */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "4px",
                    flex: 1,
                    p: "16px 16px",
                }}
            >
                <Box
                    sx={(t: Theme) => ({
                        fontSize: "0.78rem",
                        fontWeight: 400,
                        color: t.custom.fontColorDark,
                        lineHeight: 1.3,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                    })}
                >
                    {link.description}
                </Box>

                {link.value && (
                    <Box sx={{ fontSize: "1.6rem", fontWeight: 600, color: accent, lineHeight: 1.1 }}>
                        {link.value}
                    </Box>
                )}

                <Box
                    sx={(t: Theme) => ({
                        fontSize: "0.70rem",
                        color: t.custom.fontColorDark,
                        lineHeight: 1.4,
                        mt: link.value ? "2px" : 0,
                    })}
                >
                    {link.subtitle ?? "Ver sección →"}
                </Box>
            </Box>
        </Link>
    );
};

export default LinkCard;
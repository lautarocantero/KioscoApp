import { Box, Skeleton, type Theme } from '@mui/material';
import type { LinkCardContentProps } from '@typings/ui/layout.types';
import type { ReactNode } from 'react';


const LinkCardContent = ({ link }: LinkCardContentProps): ReactNode => {

    const { description, value, secondaryValue, subtitle, isLoading } = link;

    return (
    <Box
        sx={(theme: Theme) => ({
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "3px",
            flex: 1,
            px: 2,
            py: 1.5,
            "& .link-card-sparkline-line": {
                stroke: theme.palette.primary.main,
            },
        })}
    >
        <Box
            className="link-card-description"
            sx={(theme) => ({
                fontSize: "0.72rem",
                fontWeight: 600,
                color: theme.palette.primary.light,
                lineHeight: 1.2,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                transition: "color 0.15s",
            })}
        >
            {description}
        </Box>

        <Box
            sx={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.5em",
                flexWrap: "wrap",
            }}
        >
            <Box
                className="link-card-value"
                aria-hidden={!isLoading && !value}
                sx={(t: Theme) => ({
                    fontSize: t.typography.h6.fontSize,
                    fontWeight: 700,
                    color: t.custom.darkWhite,
                    lineHeight: 1.1,
                    visibility: isLoading || value ? "visible" : "hidden",
                    transition: "color 0.15s",
                })}
            >
                {isLoading ? (
                    <Skeleton
                        variant="text"
                        width={40}
                        height={32}
                        sx={(t: Theme) => ({ bgcolor: t.custom.darkGray })}
                    />
                ) : (
                    value ?? "0"
                )}
            </Box>

            {!isLoading && secondaryValue && (
                <Box
                    className="link-card-value"
                    sx={(t: Theme) => ({
                        fontSize: t.typography.h6.fontSize,
                        fontWeight: 800,
                        color: t.palette.secondary.light,
                        opacity: 0.7,
                        lineHeight: 1.1,
                        transition: "color 0.15s",
                    })}
                >
                    - {secondaryValue}
                </Box>
            )}
        </Box>

        <Box
            className="link-card-subtitle"
            sx={(t: Theme) => ({
                fontSize: "0.72rem",
                color: t.custom.darkWhite,
                lineHeight: 1.4,
                mt: "1px",
                transition: "color 0.15s",
            })}
        >
            {subtitle ?? (
                <>
                    Ver sección <Box component="span" aria-hidden="true">→</Box>
                </>
            )}
        </Box>
    </Box>
);}

export default LinkCardContent;
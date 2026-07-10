import { Box, Skeleton, type Theme } from '@mui/material';
import type { LinkCardContentProps } from '@typings/ui/layout.types';


const LinkCardContent = ({ link }: LinkCardContentProps): React.ReactNode => {

    const { description, value, subtitle, loading } = link;

    return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "3px",
            flex: 1,
            px: 2,
            py: 1.5,
        }}
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
            className="link-card-value"
            aria-hidden={!loading && !value}
            sx={(t: Theme) => ({
                fontSize: "1.8rem",
                fontWeight: 700,
                color: t.custom.darkWhite,
                lineHeight: 1.1,
                visibility: loading || value ? "visible" : "hidden",
                transition: "color 0.15s",
            })}
        >
            {loading ? (
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
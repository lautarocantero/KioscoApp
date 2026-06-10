import { Box, type Theme } from '@mui/material';
import type { OptionLink } from '../../../../../typings/ui/uiModules';

interface LinkCardContentProps {
    link: OptionLink;
    accent: string;
    appTheme: boolean;
}

const LinkCardContent = ({ link, accent, appTheme}: LinkCardContentProps): React.ReactNode => (
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
            sx={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: accent,
                lineHeight: 1.2,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
            }}
        >
            {link.description}
        </Box>

        {link.value && (
            <Box sx={(t: Theme) => ({
                fontSize: "1.8rem",
                fontWeight: 700,
                color: appTheme ? t.custom.fontColorDark : t.custom.white,
                lineHeight: 1.1,
            })}>
                {link.value}
            </Box>
        )}

        <Box sx={(t: Theme) => ({
            fontSize: "0.72rem",
            color: appTheme ? t.custom.fontColorDark : t.custom.white,
            lineHeight: 1.4,
            mt: "1px",
        })}>
            {link.subtitle ?? "Ver sección →"}
        </Box>
    </Box>
);

export default LinkCardContent;

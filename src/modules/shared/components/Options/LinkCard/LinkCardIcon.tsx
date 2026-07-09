import { Box } from '@mui/material';
import type { LinkCardIconProps } from '@typings/ui/layout.types';


const LinkCardIcon = ({ icon }: LinkCardIconProps): React.ReactNode => (
    <Box
        sx={{
            width: "72px",
            minWidth: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch",
            pl: 1.5,
        }}
    >
        <Box
            className="link-card-icon-box"
            sx={(theme) => ({
                width: "68px",
                height: "68px",
                borderRadius: "12px",
                backgroundColor: theme.palette.primary.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                color: theme.custom.white,
                flexShrink: 0,
                transition: "background-color 0.15s, color 0.15s",
            })}
        >
            {icon}
        </Box>
    </Box>
);

export default LinkCardIcon;
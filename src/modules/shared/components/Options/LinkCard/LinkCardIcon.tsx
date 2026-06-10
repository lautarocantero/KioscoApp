import { Box } from '@mui/material';

interface LinkCardIconProps {
    icon: React.ReactNode;
    accent: string;
}

// LinkCardIcon.tsx
const LinkCardIcon = ({ icon, accent }: LinkCardIconProps): React.ReactNode => (
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
            sx={{
                width: "68px",
                height: "68px",
                borderRadius: "12px",
                backgroundColor: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                color: "#fff",
                flexShrink: 0,
            }}
        >
            {icon}
        </Box>
    </Box>
);

export default LinkCardIcon;

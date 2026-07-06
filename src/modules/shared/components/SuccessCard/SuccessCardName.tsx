import { alpha, Box, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

interface SuccessCardNameProps {
    name: string;
}

const SuccessCardName = ({ name }: SuccessCardNameProps): React.ReactNode => (
    <Box 
        sx={theme => ({ 
            px: 4, 
            py: 2, 
            borderRadius: "0.5em", 
            border: `0.1em solid ${theme.custom.posAccent}`, 
            mb: 3, 
            display: "flex", 
            alignItems: "center", 
            gap: 1, 
            backgroundColor: alpha(theme.custom.posBackground, 0.3),
            width: "15em",
            maxWidth: "15em",
            minWidth: "15em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        })
    }>
        <CategoryIcon />
        <Typography sx={theme => ({ color: theme.custom.white, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "20ch" })}>
            {name}
        </Typography>
    </Box>
);

export default SuccessCardName;

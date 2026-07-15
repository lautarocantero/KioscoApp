import { alpha, Box, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import type { SuccessCardNameProps } from "@typings/ui/successCard.types";


const SuccessCardName = ({ name }: SuccessCardNameProps): React.ReactNode => (
    <Box 
        sx={theme => ({ 
            px: 4, 
            py: 2, 
            borderRadius: "0.5em", 
            border: `0.1em solid ${theme.palette.primary.light}`, 
            mb: 3, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            gap: 1, 
            backgroundColor: alpha(theme.custom.darkBackground, 0.3),
            width: "15em",
            maxWidth: "15em",
            minWidth: "15em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        })
    }>
        <CategoryIcon />
        <Typography sx={theme => ({ color: theme.custom.fontColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "20ch" })}>
            {name}
        </Typography>
    </Box>
);

export default SuccessCardName;
